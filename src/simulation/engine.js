import { matchKits, shirtNumbers } from "./kits.js";
import { FORMATIONS } from "../game/FORMATIONS.js";
import { FORMATION_COORDINATES } from "../game/FORMATION_COORDINATES.js";
import { appearance } from "./appearance.js";
export const ENGINE_VERSION = 1;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const numeric = (v, f = 60) => (Number.isFinite(Number(v)) ? Number(v) : f);
export const available = (p) =>
  !["PENDING", "BLOCKED"].includes(p.status) &&
  (p.recoveryLeft || 0) <= 0 &&
  (p.energy ?? 100) >= 25;
export function selectTeam(team, players, selected) {
  if (!team) throw Error("Escolha os dois clubes.");
  const pool = players.filter((p) => p.teamId === team.id && available(p));
  const formation = FORMATIONS[team.tactics?.formation]
    ? team.tactics.formation
    : "4-3-3 OFENSIVO";
  const used = new Set();
  const lineup = FORMATIONS[formation].map((role, i) => {
    const wanted = selected ? selected[i] : team.tactics?.lineup?.[i];
    const valid = (p) =>
      p &&
      !used.has(p.id) &&
      (i === 0 ? p.position === "GOL" : p.position !== "GOL");
    let p = pool.find((p) => p.id === wanted && valid(p));
    if (selected && !p)
      throw Error(
        "Escale 11 atletas disponíveis, sem repetidos, com um goleiro na primeira posição.",
      );
    if (!p)
      p = pool
        .filter(valid)
        .sort(
          (a, b) =>
            Number(b.position === role) - Number(a.position === role) ||
            numeric(b.overall) - numeric(a.overall) ||
            a.id.localeCompare(b.id),
        )[0];
    if (!p)
      throw Error(
        `${team.name}: é necessário um goleiro e dez jogadores de linha disponíveis (energia mínima 25).`,
      );
    used.add(p.id);
    const attrs = {};
    for (const key of [
      "shot",
      "attack",
      "gk",
      "defense",
      "shortPass",
      "speed",
      "stamina",
      "aggression",
      "dribble",
    ])
      attrs[key] = clamp(
        numeric(p.attributes?.[key], numeric(p.overall)),
        1,
        99,
      );
    // Whitelist only match data: no passwords, balance, face uploads or private fields.
    return {
      id: p.id,
      name: String(p.name || "Jogador").slice(0, 80),
      position: p.position,
      role,
      overall: clamp(numeric(p.overall), 1, 99),
      energy: clamp(numeric(p.energy, 100), 25, 100),
      attributes: attrs,
      pixelAppearance: appearance(p.pixelAppearance),
      anchor: {
        x: (100 - parseFloat(FORMATION_COORDINATES[formation][i].t)) / 100,
        y: parseFloat(FORMATION_COORDINATES[formation][i].l) / 100,
      },
    };
  });
  return {
    id: team.id,
    name: String(team.name).slice(0, 80),
    formation,
    lineup: shirtNumbers(lineup),
  };
}
export function makeSnapshot(home, away, players, seed, lineups) {
  if (!home || !away || home.id === away.id)
    throw Error("Selecione dois clubes diferentes.");
  return {
    version: ENGINE_VERSION,
    seed: Number(seed) >>> 0,
    kits: matchKits(home, away),
    home: selectTeam(home, players, lineups?.[0]),
    away: selectTeam(away, players, lineups?.[1]),
  };
}
function random(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function simulateMatch(snapshot) {
  if (snapshot.version !== ENGINE_VERSION)
    throw Error("Este replay pertence a outra versão do simulador.");
  if (snapshot.home.lineup.length !== 11 || snapshot.away.lineup.length !== 11)
    throw Error("Escalação incompleta.");
  const rand = random(snapshot.seed),
    teams = [snapshot.home, snapshot.away];
  const people = teams.flatMap((team, side) =>
    team.lineup.map((p, slot) => ({ ...p, side, slot })),
  );
  if (new Set(people.map((p) => p.id)).size !== 22)
    throw Error("Jogadores repetidos.");
  const stats = people.map(() => ({
    goals: 0,
    assists: 0,
    shots: 0,
    saves: 0,
    passes: 0,
    completed: 0,
    tackles: 0,
    yellow: 0,
    red: 0,
  }));
  const score = [0, 0],
    possession = [0, 0],
    events = [],
    frames = [];
  let positions = [],
    ball = [50, 32],
    owner = 9,
    flight = null,
    cooldown = 0,
    stop = 0,
    lastPass = null,
    period = 0,
    pendingKickoff = null;
  const direction = (side) => (side === period ? 1 : -1);
  const active = (i) => !stats[i].red;
  const skill = (i, k, t) =>
    people[i].attributes[k] *
    (0.75 + (0.25 * people[i].energy) / 100) *
    (1 - (t / 5400) * (1 - people[i].attributes.stamina / 100) * 0.22);
  const event = (t, type, side, actor, text, extra = {}) =>
    events.push({ t, type, side, actor, text, ...extra });
  function restart(t, side, half = false) {
    positions = people.map((p, i) => ({
      x: direction(p.side) > 0 ? p.anchor.x * 82 + 4 : 96 - p.anchor.x * 82,
      y: 5 + p.anchor.y * 54,
    }));
    owner = people.findIndex(
      (p, i) => p.side === side && p.slot > 7 && active(i),
    );
    if (owner < 0) owner = side * 11;
    positions[owner] = { x: 50, y: 32 };
    ball = [50, 32];
    flight = null;
    lastPass = null;
    cooldown = t + 5;
    stop = t + (half ? 6 : 8);
  }
  function send(t, to, target, type, outcome = null) {
    const from = [...ball],
      distance = Math.hypot(to[0] - from[0], to[1] - from[1]);
    flight = {
      from,
      to,
      target,
      type,
      outcome,
      actor: owner,
      side: people[owner].side,
      start: t,
      end: t + Math.max(1, Math.ceil(distance / (type === "shot" ? 22 : 13))),
    };
    owner = -1;
  }
  restart(0, 0, true);
  event(0, "kickoff", 0, null, "Bola rolando! Primeiro tempo.");
  function record(t) {
    frames.push({
      t,
      ball: [...ball],
      positions: positions.map((p, i) => [p.x, p.y, active(i) ? 1 : 0]),
      score: [...score],
      owner,
      period,
    });
  }
  record(0);
  for (let t = 1; t <= 5400; t++) {
    if (t === 2700) {
      period = 1;
      restart(t, 1, true);
      event(
        t,
        "halftime",
        null,
        null,
        "Intervalo. As equipes trocam de lado para o segundo tempo.",
      );
    }
    if (pendingKickoff !== null && t > stop) {
      restart(t, pendingKickoff);
      pendingKickoff = null;
    }
    const side = owner >= 0 ? people[owner].side : (flight?.side ?? 0);
    if (t > stop) possession[side]++;
    if (t > stop) {
      // Every second is simulated; all 22 athletes move continuously, including off-ball support.
      const rivals = people
        .map((p, i) => i)
        .filter(
          (i) => people[i].side !== side && people[i].slot !== 0 && active(i),
        );
      const chaser = rivals.sort(
        (a, b) =>
          Math.hypot(positions[a].x - ball[0], positions[a].y - ball[1]) -
          Math.hypot(positions[b].x - ball[0], positions[b].y - ball[1]),
      )[0];
      positions = positions.map((p, i) => {
        if (!active(i)) return p;
        const who = people[i],
          dir = direction(who.side);
        let x = dir > 0 ? 4 + who.anchor.x * 82 : 96 - who.anchor.x * 82,
          y = 5 + who.anchor.y * 54;
        if (who.slot === 0) {
          x = dir > 0 ? 5 : 95;
          y = clamp(32 + (ball[1] - 32) * 0.2, 25, 39);
        } else {
          x += clamp((ball[0] - 50) * 0.32, -12, 12);
          y += Math.sin(t * 0.07 + i * 2) * 3 + (ball[1] - 32) * 0.12;
          if (i === owner) {
            x = p.x + dir * 7;
            y = clamp(p.y + (32 - p.y) * 0.09 + Math.sin(t * 0.21) * 2, 4, 60);
          }
          if (i === chaser) {
            x = ball[0];
            y = ball[1];
          }
          if (flight?.target === i) {
            x = flight.to[0];
            y = flight.to[1];
          }
        }
        x = clamp(x, 2, 98);
        y = clamp(y, 2, 62);
        const distance = Math.hypot(x - p.x, y - p.y),
          speed = 1.4 + skill(i, "speed", t) / 40,
          ratio = Math.min(1, speed / (distance || 1));
        return { x: p.x + (x - p.x) * ratio, y: p.y + (y - p.y) * ratio };
      });
      if (flight) {
        const f = flight,
          u = clamp((t - f.start) / (f.end - f.start), 0, 1);
        ball = [
          f.from[0] + (f.to[0] - f.from[0]) * u,
          f.from[1] + (f.to[1] - f.from[1]) * u,
        ];
        if (t >= f.end) {
          flight = null;
          if (f.type === "shot") {
            if (f.outcome === "goal") {
              score[f.side]++;
              stats[f.actor].goals++;
              const assist =
                lastPass &&
                lastPass.to === f.actor &&
                t - lastPass.t < 18 &&
                people[lastPass.from].side === f.side
                  ? lastPass.from
                  : null;
              if (assist !== null) stats[assist].assists++;
              event(
                t,
                "goal",
                f.side,
                f.actor,
                `GOL! ${people[f.actor].name} marca para ${teams[f.side].name}.`,
                { assist },
              );
              pendingKickoff = 1 - f.side;
              stop = t + 6;
              owner = -1;
            } else {
              owner = (1 - f.side) * 11;
              if (f.outcome === "save") {
                stats[owner].saves++;
                event(
                  t,
                  "save",
                  1 - f.side,
                  owner,
                  `${people[owner].name} defende o chute!`,
                );
              } else
                event(
                  t,
                  "miss",
                  f.side,
                  f.actor,
                  `${people[f.actor].name} finaliza para fora.`,
                );
              ball = [positions[owner].x, positions[owner].y];
              cooldown = t + 4;
              stop = t + 3;
              lastPass = null;
            }
          } else {
            owner = f.target;
            if (f.type === "pass") {
              stats[f.actor].completed++;
              lastPass = { from: f.actor, to: owner, t };
            } else {
              lastPass = null;
              event(
                t,
                "interception",
                people[owner].side,
                owner,
                `${people[owner].name} intercepta o passe.`,
              );
            }
            ball = [positions[owner].x, positions[owner].y];
            cooldown = t + 3 + Math.floor(rand() * 4);
          }
        }
      } else if (owner >= 0) {
        ball = [positions[owner].x, positions[owner].y];
        const rival = chaser;
        if (
          people[owner].slot !== 0 &&
          rival !== undefined &&
          Math.hypot(
            positions[rival].x - ball[0],
            positions[rival].y - ball[1],
          ) < 3 &&
          rand() < 0.14
        ) {
          if (rand() < 0.15) {
            event(
              t,
              "foul",
              people[rival].side,
              rival,
              `Falta de ${people[rival].name}.`,
            );
            if (rand() < 0.3) {
              stats[rival].yellow++;
              if (stats[rival].yellow === 2) {
                stats[rival].red = 1;
                event(
                  t,
                  "red",
                  people[rival].side,
                  rival,
                  `${people[rival].name} recebe o segundo amarelo e é expulso.`,
                );
              } else
                event(
                  t,
                  "yellow",
                  people[rival].side,
                  rival,
                  `Cartão amarelo para ${people[rival].name}.`,
                );
            }
            stop = t + 5;
            cooldown = t + 6;
          } else if (
            rand() <
            clamp(
              0.5 +
                (skill(rival, "defense", t) - skill(owner, "dribble", t)) / 160,
              0.15,
              0.85,
            )
          ) {
            stats[rival].tackles++;
            owner = rival;
            lastPass = null;
            cooldown = t + 2;
            event(
              t,
              "tackle",
              people[rival].side,
              rival,
              `${people[rival].name} recupera a bola.`,
            );
          }
        }
        if (t >= cooldown && t > stop) {
          const actor = owner,
            s = people[actor].side,
            dir = direction(s),
            distance = dir > 0 ? 100 - ball[0] : ball[0];
          if (
            people[actor].slot !== 0 &&
            distance < 27 &&
            Math.abs(ball[1] - 32) < 21 &&
            rand() < 0.06
          ) {
            stats[actor].shots++;
            const keeper = (1 - s) * 11;
            const onTarget =
              rand() <
              clamp(
                0.38 + skill(actor, "shot", t) / 230 - distance / 180,
                0.2,
                0.8,
              );
            const goal =
              onTarget &&
              rand() <
                clamp(
                  0.2 +
                    (skill(actor, "shot", t) - skill(keeper, "gk", t)) / 180 +
                    (15 - distance) / 200,
                  0.06,
                  0.68,
                );
            const outcome = goal ? "goal" : onTarget ? "save" : "miss";
            event(t, "shot", s, actor, `${people[actor].name} chuta!`);
            send(
              t,
              [
                dir > 0 ? 100 : 0,
                goal ? 29 + rand() * 6 : onTarget ? 32 : rand() < 0.5 ? 23 : 41,
              ],
              keeper,
              "shot",
              outcome,
            );
          } else {
            const mates = people
              .map((p, i) => i)
              .filter(
                (i) =>
                  i !== actor &&
                  people[i].side === s &&
                  people[i].slot > 0 &&
                  active(i) &&
                  Math.hypot(
                    positions[i].x - ball[0],
                    positions[i].y - ball[1],
                  ) < 40,
              );
            if (mates.length && rand() < 0.83) {
              const ranked = mates
                .map((i) => ({
                  i,
                  w: rand() * 20 + dir * (positions[i].x - ball[0]) * 0.45,
                }))
                .sort((a, b) => b.w - a.w);
              const target = ranked[0].i;
              stats[actor].passes++;
              if (
                rand() <
                clamp(0.62 + skill(actor, "shortPass", t) / 290, 0.6, 0.95)
              )
                send(
                  t,
                  [positions[target].x, positions[target].y],
                  target,
                  "pass",
                );
              else {
                const interceptor = rival ?? target;
                send(
                  t,
                  [positions[interceptor].x, positions[interceptor].y],
                  interceptor,
                  "intercept",
                );
                lastPass = null;
              }
            } else cooldown = t + 3;
          }
        }
      }
    }
    record(t);
  }
  event(
    5400,
    "fulltime",
    null,
    null,
    `Fim de jogo: ${teams[0].name} ${score[0]} × ${score[1]} ${teams[1].name}.`,
  );
  const ratings = stats.map((s, i) =>
    clamp(
      6 +
        s.goals * 0.85 +
        s.assists * 0.45 +
        s.saves * 0.12 +
        s.tackles * 0.06 +
        s.completed * 0.006 -
        (s.passes - s.completed) * 0.025 -
        s.yellow * 0.25 -
        s.red * 0.8 -
        (people[i].slot === 0 ? score[1 - people[i].side] * 0.15 : 0),
      3,
      10,
    ).toFixed(1),
  );
  return {
    frames,
    events,
    stats,
    ratings,
    people,
    score,
    possession,
    snapshot,
  };
}
export function frameAt(match, time) {
  const a = clamp(time, 0, 5400),
    index = Math.floor(a);
  return {
    a: match.frames[index],
    b: match.frames[Math.min(5400, index + 1)],
    mix: a - index,
  };
}
export function highlights(match) {
  return match.events.filter((e) =>
    ["goal", "yellow", "red", "halftime", "fulltime"].includes(e.type),
  );
}
