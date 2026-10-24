import { simulateMatch as simulateV7 } from "./engine-v7.js";
import { POSTURES, validCommand } from "./live-tactics.js";
import { simulateMatch as simulateV3 } from "./engine-v3.js";
import { simulateMatch as simulateV4 } from "./engine-v4.js";
import { simulateMatch as simulateV2 } from "./engine-v2.js";
import { shootingChance, boundaryRestart } from "./decisions.js";
import { simulateMatch as simulateLegacy } from "./engine-v1.js";
import { offsideAtPass, lanePressure, assignNumbers } from "./rules.js";
import { matchKits, shirtNumbers } from "./kits.js";
import { FORMATIONS } from "../game/FORMATIONS.js";
import { FORMATION_COORDINATES } from "../game/FORMATION_COORDINATES.js";
import { appearance } from "./appearance.js";
import { addedTimeForSeed, matchDurationSeconds } from "./timeline.js";
import { simulateMatch as simulateV5 } from "./engine-v5.js";
import { simulateMatch as simulateV6 } from "./engine-v6.js";
export const ENGINE_VERSION = 8;
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
  const bench = pool
    .filter((p) => !used.has(p.id))
    .sort(
      (a, b) =>
        Number(b.position === "GOL") - Number(a.position === "GOL") ||
        numeric(b.overall) - numeric(a.overall) ||
        a.id.localeCompare(b.id),
    )
    .slice(0, 9)
    .map((p) => {
      const attributes = Object.fromEntries(
        Object.keys(lineup[0].attributes).map((k) => [
          k,
          clamp(numeric(p.attributes?.[k], numeric(p.overall)), 1, 99),
        ]),
      );
      return {
        id: p.id,
        name: String(p.name || "Jogador").slice(0, 80),
        position: p.position,
        role: p.position,
        overall: clamp(numeric(p.overall), 1, 99),
        energy: clamp(numeric(p.energy, 100), 25, 100),
        attributes,
        pixelAppearance: appearance(p.pixelAppearance),
        anchor: { x: 0.5, y: 0.5 },
      };
    });
  const numbered = assignNumbers([...lineup, ...bench], team.shirtNumbers);
  return {
    id: team.id,
    name: String(team.name).slice(0, 80),
    formation,
    lineup: numbered.slice(0, 11),
    bench: numbered.slice(11),
  };
}
export function makeSnapshot(home, away, players, seed, lineups) {
  if (!home || !away || home.id === away.id)
    throw Error("Selecione dois clubes diferentes.");
  return {
    version: ENGINE_VERSION,
    seed: Number(seed) >>> 0,
    addedTime: addedTimeForSeed(seed),
    kickoffSide: (Number(seed) >>> 1) & 1,
    penaltiesOnDraw: false,
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
  if (snapshot.version === 1) return simulateLegacy(snapshot);
  if (snapshot.version === 2) return simulateV2(snapshot);
  if (snapshot.version === 3) return simulateV3(snapshot);
  if (snapshot.version === 4) return simulateV4(snapshot);
  if (snapshot.version === 5) return simulateV5(snapshot);
  if (snapshot.version === 6) return simulateV6(snapshot);
  if (snapshot.version === 7) return simulateV7(snapshot);
  if (snapshot.version !== ENGINE_VERSION)
    throw Error("Este replay pertence a outra versão do simulador.");
  if (snapshot.home.lineup.length !== 11 || snapshot.away.lineup.length !== 11)
    throw Error("Escalação incompleta.");
  const rand = random(snapshot.seed),
    teams = [snapshot.home, snapshot.away];
  const addedTime = snapshot.addedTime || [0, 0];
  const kickoffSide = snapshot.kickoffSide === 1 ? 1 : 0;
  const halftimeAt = 2700 + addedTime[0] * 60;
  const durationSeconds = halftimeAt + 2700 + addedTime[1] * 60;
  const people = teams.flatMap((team, side) =>
    team.lineup.map((p, slot) => ({ ...p, side, slot })),
  );
  teams.forEach((team, side) =>
    (team.bench || []).forEach((p) =>
      people.push({
        ...p,
        side,
        slot: p.position === "GOL" ? 0 : 9,
        reserve: true,
      }),
    ),
  );
  if (new Set(people.map((p) => p.id)).size !== people.length)
    throw Error("Jogadores repetidos.");
  const stats = people.map(() => ({
    seconds: 0,
    injured: false,
    substituted: false,
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
  let chainSide = -1,
    passChain = 0;
  let positions = [],
    ball = [50, 32],
    owner = 9,
    flight = null,
    cooldown = 0,
    stop = 0,
    lastPass = null,
    period = 0,
    pendingKickoff = null,
    pendingRestart = null,
    pendingFreeKick = null,
    pendingPenalty = null;
  const commands = (snapshot.commands || []).filter(validCommand).slice().sort((a,b) => a.at-b.at || a.id.localeCompare(b.id));
  const appliedCommands = new Set();
  const postures = ['neutral', 'neutral'];
  const formations = teams.map(team => team.formation);
  function applyTactics(t) {
    for (const c of commands) {
      if (c.kind !== 'tactics' || c.at > t || appliedCommands.has(c.id)) continue;
      appliedCommands.add(c.id);
      formations[c.side] = c.formation;
      postures[c.side] = c.posture;
      people.forEach((p,i) => {
        if (p.side !== c.side || !active(i)) return;
        const coordinate = FORMATION_COORDINATES[c.formation][p.slot];
        p.anchor = { x: (100 - parseFloat(coordinate.t))/100, y: parseFloat(coordinate.l)/100 };
        p.role = FORMATIONS[c.formation][p.slot];
      });
      event(t, 'tactics-applied', c.side, null, `${teams[c.side].name}: ${c.formation} • ${POSTURES[c.posture].label}.`, { commandId: c.id, formation: c.formation, posture: c.posture });
    }
  }
  const direction = (side) => (side === period ? 1 : -1);
  const entered = people.map((p) => !p.reserve);
  const substitutions = [0, 0];
  const windows = [3600, 4200, 4800];
  const active = (i) =>
    entered[i] && !stats[i].red && !stats[i].injured && !stats[i].substituted;
  const keeperFor = (side) =>
    people.findIndex((p, i) => p.side === side && p.slot === 0 && active(i));
  const skill = (i, k, t) =>
    (people[i].attributes[k] * 0.35 + people[i].overall * 0.65) *
    (0.75 + (0.25 * people[i].energy) / 100) *
    (1 -
      (Math.max(0, t - (people[i].enteredAt || 0)) / durationSeconds) *
        (1 - people[i].attributes.stamina / 100) *
        0.22);
  const event = (t, type, side, actor, text, extra = {}) =>
    events.push({
      t,
      type,
      side,
      actor,
      text,
      ...(actor !== null && positions[actor]
        ? { at: [positions[actor].x, positions[actor].y] }
        : {}),
      ...extra,
    });
  function substitute(t, out, injury = false) {
    const side = people[out].side;
    if (substitutions[side] >= 5) return false;
    const candidates = people
      .map((p, i) => i)
      .filter(
        (i) =>
          people[i].side === side &&
          !entered[i] &&
          (people[i].position === "GOL") === (people[out].slot === 0),
      );
    candidates.sort(
      (a, b) =>
        Number(people[b].position === people[out].position) -
          Number(people[a].position === people[out].position) ||
        people[b].overall - people[a].overall,
    );
    const incoming = candidates[0];
    if (incoming === undefined) return false;
    stats[out].substituted = true;
    entered[incoming] = true;
    substitutions[side]++;
    people[incoming] = {
      ...people[incoming],
      slot: people[out].slot,
      anchor: { ...people[out].anchor },
      enteredAt: t,
    };
    positions[incoming] = { ...positions[out] };
    if (owner === out) owner = incoming;
    if (flight?.target === out) flight.target = incoming;
    lastPass = null;
    event(
      t,
      "substitution",
      side,
      out,
      `Substituição: sai ${people[out].name}, entra ${people[incoming].name}.`,
      { incoming, injury },
    );
    stop = Math.max(stop, t + 18);
    cooldown = stop + 3;
    return true;
  }
  function restart(t, side, half = false) {
    pendingRestart = null;
    pendingFreeKick = null;
    pendingPenalty = null;
    positions = people.map((p, i) => ({
      x: direction(p.side) > 0 ? p.anchor.x * 42 + 4 : 96 - p.anchor.x * 42,
      y: 5 + p.anchor.y * 54,
    }));
    owner = people.findIndex(
      (p, i) => p.side === side && p.slot > 7 && active(i),
    );
    if (owner < 0) owner = keeperFor(side);
    positions[owner] = { x: 50, y: 32 };
    ball = [50, 32];
    flight = null;
    lastPass = null;
    cooldown = t + 5;
    stop = t + (half ? 6 : 8);
  }
  function setPieceTaker(side, point, t, skillKey = "shortPass") {
    const candidates = people
      .map((p, i) => i)
      .filter((i) => people[i].side === side && people[i].slot !== 0 && active(i))
      .sort((a, b) => skill(b, skillKey, t) - skill(a, skillKey, t));
    return candidates[0] ?? keeperFor(side);
  }
  function freeKick(t, side, point) {
    const at = [clamp(point[0], 2, 98), clamp(point[1], 2, 62)];
    const goalDistance = direction(side) > 0 ? 100 - at[0] : at[0];
    const directShotArea = goalDistance <= 34 && Math.abs(at[1] - 32) <= 18;
    const taker = setPieceTaker(
      side,
      at,
      t,
      directShotArea ? "shot" : "shortPass",
    );
    owner = taker;
    ball = at;
    flight = null;
    pendingRestart = null;
    pendingFreeKick = { side, taker, at };
    stop = t + 12;
    cooldown = stop;
    lastPass = null;
    event(t, "freekick", side, taker, `Tiro livre para ${teams[side].name}.`, { at });
  }
  function penalty(t, side, defendingSide, point, fouler) {
    const taker = people
      .map((p, i) => i)
      .filter((i) => people[i].side === side && people[i].slot !== 0 && active(i))
      .sort((a, b) => skill(b, "shot", t) - skill(a, "shot", t))[0];
    if (taker === undefined) return freeKick(t, side, point);
    const attackDirection = direction(side);
    const at = [attackDirection > 0 ? 88 : 12, 32];
    const keeper = keeperFor(defendingSide);
    positions[taker] = { x: at[0], y: at[1] };
    positions[keeper] = { x: attackDirection > 0 ? 98 : 2, y: 32 };
    owner = taker;
    ball = at;
    flight = null;
    pendingRestart = null;
    pendingFreeKick = null;
    pendingPenalty = { side, defendingSide, taker, keeper, at, fouler, awardedAt: t };
    stop = t + 30;
    cooldown = stop;
    lastPass = null;
    event(
      t,
      "penalty",
      side,
      taker,
      `Pênalti para ${teams[side].name}. ${people[taker].name} vai cobrar.`,
      { at, fouler, keeper, deadline: stop },
    );
  }
  function awardRestart(t, point, lastTouchSide) {
    applyTactics(t);
    const r = boundaryRestart(point, lastTouchSide, direction(lastTouchSide));
    const candidates = people
      .map((p, i) => i)
      .filter(
        (i) =>
          active(i) &&
          people[i].side === r.side &&
          (r.type === "goalkick" ? people[i].slot === 0 : people[i].slot !== 0),
      );
    owner = candidates.sort(
      (a, b) =>
        Math.hypot(positions[a].x - r.at[0], positions[a].y - r.at[1]) -
        Math.hypot(positions[b].x - r.at[0], positions[b].y - r.at[1]),
    )[0];
    positions[owner] = { x: r.at[0], y: r.at[1] };
    ball = [...r.at];
    flight = null;
    lastPass = null;
    stop = t + 15;
    cooldown = stop;
    pendingRestart = { ...r, taker: owner };
    event(
      t,
      r.type,
      r.side,
      owner,
      `${r.type === "throwin" ? "Lateral" : r.type === "corner" ? "Escanteio" : "Tiro de meta"} para ${teams[r.side].name}.`,
      { at: r.at, lastTouchSide },
    );
  }
  function send(t, to, target, type, outcome = null, fromOverride = null) {
    const from = fromOverride ? [...fromOverride] : [...ball],
      distance = Math.hypot(to[0] - from[0], to[1] - from[1]);
    flight = {
      from,
      to,
      target,
      type,
      outcome,
      offside:
        type === "pass"
          ? offsideAtPass(
              positions[target],
              ball,
              people.flatMap((p, i) =>
                p.side !== people[owner].side && active(i)
                  ? [positions[i]]
                  : [],
              ),
              direction(people[owner].side),
            )
          : null,
      actor: owner,
      side: people[owner].side,
      start: t,
      end:
        t +
        (type === "out"
          ? Math.max(2, Math.ceil(distance / 3))
          : Math.max(1, Math.ceil(distance / (type === "shot" ? 22 : 13)))),
    };
    owner = -1;
  }
  restart(0, kickoffSide, true);
  pendingKickoff = kickoffSide;
  event(
    0,
    "kickoff",
    kickoffSide,
    null,
    `${teams[kickoffSide].name} começa com a bola após o sorteio.`,
  );
  function record(t) {
    frames.push({
      t,
      ball: [...ball],
      positions: positions.map((p, i) => [p.x, p.y, active(i) ? 1 : 0]),
      score: [...score],
      owner,
      period,
      formations: [...formations],
      postures: [...postures],
    });
  }
  record(0);
  for (let t = 1; t <= durationSeconds; t++) {
    if (t === halftimeAt) {
      period = 1;
      restart(t, 1 - kickoffSide, true);
      pendingKickoff = 1 - kickoffSide;
      event(
        t,
        "halftime",
        null,
        null,
        "Intervalo. As equipes trocam de lado para o segundo tempo.",
      );
    }
    // Three automatic tactical windows; injured players can also be replaced (max five).
    if (
      windows.length &&
      t >= windows[0] &&
      !flight &&
      pendingKickoff === null &&
      !pendingRestart && !pendingFreeKick && !pendingPenalty
    ) {
      windows.shift();
      for (const side of [0, 1]) {
        const candidates = people
          .map((p, i) => i)
          .filter(
            (i) => people[i].side === side && people[i].slot !== 0 && active(i),
          );
        candidates.sort(
          (a, b) =>
            stats[b].seconds * (110 - people[b].attributes.stamina) -
            stats[a].seconds * (110 - people[a].attributes.stamina),
        );
        if (candidates.length) substitute(t, candidates[0]);
      }
    }
    people.forEach((p, i) => {
      if (active(i)) stats[i].seconds++;
    });
    if (pendingKickoff !== null && t > stop) {
      const sideToKick = pendingKickoff;
      if (owner < 0 || people[owner].side !== sideToKick)
        restart(t, sideToKick, true);
      const taker = owner;
      const directionOfKick = direction(sideToKick);
      const target = people
        .map((p, i) => i)
        .filter(
          (i) =>
            active(i) &&
            i !== taker &&
            people[i].side === sideToKick &&
            people[i].slot !== 0,
        )
        .sort(
          (a, b) =>
            directionOfKick * (positions[a].x - 50) -
            directionOfKick * (positions[b].x - 50) ||
            Math.abs(positions[a].y - 32) - Math.abs(positions[b].y - 32),
        )[0];
      if (target !== undefined) {
        stats[taker].passes++;
        event(
          t,
          "kickoff-pass",
          sideToKick,
          taker,
          `${people[taker].name} toca para ${people[target].name} na saída de bola.`,
          { target },
        );
        send(t, [positions[target].x, positions[target].y], target, "pass");
      }
      pendingKickoff = null;
      stop = t - 1;
      cooldown = t;
    }
    if (pendingPenalty && t > stop) {
      const eligible = commands.filter(c => c.kind === 'penalty' && c.side === pendingPenalty.side && c.penaltyAt === pendingPenalty.awardedAt && c.at > pendingPenalty.awardedAt && c.at <= stop);
      const choice = eligible.at(-1);
      const selected = choice ? people.findIndex((p,i) => p.id === choice.playerId && p.side === choice.side && active(i)) : -1;
      if (selected >= 0) {
        owner = selected;
        pendingPenalty.taker = selected;
        positions[selected] = {x: pendingPenalty.at[0], y:pendingPenalty.at[1]};
      }

      const kick = pendingPenalty,
        attack = skill(kick.taker, "shot", t),
        keeperSkill = skill(kick.keeper, "gk", t),
        goalChance = clamp(0.77 + (attack - keeperSkill) / 250, 0.55, 0.91),
        outcome = rand() < goalChance ? "goal" : rand() < 0.82 ? "save" : "miss",
        goalX = direction(kick.side) > 0 ? 100 : 0,
        targetY = outcome === "goal" ? 30 + rand() * 4 : outcome === "save" ? 32 : rand() < 0.5 ? 25 : 39;
      stats[kick.taker].shots++;
      event(
        t,
        "penalty-kick",
        kick.side,
        kick.taker,
        `${people[kick.taker].name} cobra o pênalti.`,
        { outcome, keeper: kick.keeper, fouler: kick.fouler },
      );
      send(t, [goalX, targetY], kick.keeper, "shot", outcome);
      pendingPenalty = null;
      stop = t - 1;
      cooldown = t;
    }
    if (pendingFreeKick) {
      const { taker, at } = pendingFreeKick;
      const p = positions[taker];
      const distance = Math.hypot(at[0] - p.x, at[1] - p.y);
      const step = Math.min(1, 2.2 / (distance || 1));
      positions[taker] = { x: p.x + (at[0] - p.x) * step, y: p.y + (at[1] - p.y) * step };
      ball = [...at];
      if (distance > 0.1) stop = Math.max(stop, t + 2);
    }
    if (pendingFreeKick && t > stop) {
      const kick = pendingFreeKick,
        goalDistance = direction(kick.side) > 0 ? 100 - kick.at[0] : kick.at[0],
        keeper = keeperFor(1 - kick.side),
        shotQuality = shootingChance(
          kick.at,
          positions[keeper],
          direction(kick.side),
          0,
          people[kick.taker].overall,
          skill(kick.taker, "shot", t),
          0,
        ),
        directShot =
          goalDistance <= 34 &&
          Math.abs(kick.at[1] - 32) <= 18 &&
          shotQuality >= 0.3 &&
          rand() < clamp(0.45 + skill(kick.taker, "shot", t) / 250, 0.45, 0.82);
      if (directShot) {
        const onTarget = rand() < clamp(0.42 + skill(kick.taker, "shot", t) / 220, 0.45, 0.9);
        const goal =
          onTarget &&
          rand() <
            clamp(
              0.055 + (skill(kick.taker, "shot", t) - skill(keeper, "gk", t)) / 190,
              0.025,
              0.58,
            );
        const woodwork = onTarget && !goal && rand() < 0.1;
        const outcome = goal
          ? "goal"
          : woodwork
            ? rand() < 0.62
              ? "post"
              : "crossbar"
            : onTarget
              ? "save"
              : "miss";
        const targetY =
          outcome === "post"
            ? rand() < 0.5
              ? 27
              : 37
            : outcome === "crossbar"
              ? 32
              : outcome === "goal"
                ? 29 + rand() * 6
                : outcome === "save"
                  ? 32
                  : rand() < 0.5
                    ? 23
                    : 41;
        stats[kick.taker].shots++;
        event(
          t,
          "freekick-shot",
          kick.side,
          kick.taker,
          `${people[kick.taker].name} bate direto para o gol na cobrança da falta!`,
          { outcome, keeper },
        );
        send(
          t,
          [direction(kick.side) > 0 ? 100 : 0, targetY],
          keeper,
          "shot",
          outcome,
        );
      } else {
        const target = people
          .map((p, i) => i)
          .filter(
            (i) =>
              i !== kick.taker &&
              people[i].side === kick.side &&
              people[i].slot !== 0 &&
              active(i),
          )
          .sort(
            (a, b) =>
              Math.hypot(positions[a].x - kick.at[0], positions[a].y - kick.at[1]) -
              Math.hypot(positions[b].x - kick.at[0], positions[b].y - kick.at[1]),
          )[0];
        if (target !== undefined) {
          stats[kick.taker].passes++;
          event(
            t,
            "freekick-pass",
            kick.side,
            kick.taker,
            `${people[kick.taker].name} toca a bola na cobrança da falta.`,
            { target },
          );
          send(t, [positions[target].x, positions[target].y], target, "pass");
        }
      }
      pendingFreeKick = null;
      stop = t - 1;
      cooldown = t;
    }
    if (pendingRestart && t > stop) {
      const r = pendingRestart;
      const target = people
        .map((p, i) => i)
        .filter(
          (i) =>
            active(i) &&
            i !== owner &&
            people[i].side === r.side &&
            people[i].slot !== 0,
        )
        .sort((a, b) => {
          const desired =
            r.type === "corner"
              ? [direction(r.side) > 0 ? 88 : 12, 32]
              : [ball[0], 32];
          return (
            Math.hypot(
              positions[a].x - desired[0],
              positions[a].y - desired[1],
            ) -
            Math.hypot(positions[b].x - desired[0], positions[b].y - desired[1])
          );
        })[0];
      stats[owner].passes++;
      event(
        t,
        "restart",
        r.side,
        owner,
        `${people[owner].name} cobra ${r.type === "throwin" ? "o lateral" : r.type === "corner" ? "o escanteio" : "o tiro de meta"}.`,
        { restartType: r.type },
      );
      const releasePoint = r.type === "throwin"
        ? [ball[0], clamp(ball[1] - 4.5, 1, 63)]
        : null;
      send(t, [positions[target].x, positions[target].y], target, "pass", null, releasePoint);
      // Direct throw-ins, corners and goal kicks are exempt from offside.
      flight.offside = null;
      pendingRestart = null;
    }
    const side = owner >= 0 ? people[owner].side : (flight?.side ?? 0);
    if (owner >= 0 && chainSide !== side) {
      chainSide = side;
      passChain = 0;
    }
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
          const ownGoal = dir > 0 ? 0 : 100;
          const danger =
            who.side !== side &&
            Math.abs(ball[0] - ownGoal) < 18 &&
            Math.abs(ball[1] - 32) < 16;
          x = danger
            ? ownGoal + dir * Math.min(11, Math.abs(ball[0] - ownGoal) * 0.55)
            : dir > 0
              ? 5
              : 95;
          y = clamp(32 + (ball[1] - 32) * (danger ? 0.6 : 0.2), 25, 39);
        } else {
          x += clamp((ball[0] - 50) * 0.32, -12, 12) + dir * POSTURES[postures[who.side]].shift;
          y += Math.sin(t * 0.07 + i * 2) * 3 + (ball[1] - 32) * 0.12;
          if (i === owner) {
            x = dir > 0 ? Math.min(96, p.x + 7 + POSTURES[postures[who.side]].shift / 4) : Math.max(4, p.x - 7 - POSTURES[postures[who.side]].shift / 4);
            y = clamp(p.y + (32 - p.y) * 0.09 + Math.sin(t * 0.21) * 2, 4, 60);
          }
          if (who.side === side && i !== owner && who.slot > 0) {
            const opponents = people.flatMap((p, j) =>
              p.side !== side && active(j) ? [positions[j]] : [],
            );
            const line = offsideAtPass(p, ball, opponents, dir).line;
            // Hold the line, spread into passing lanes; occasional mistiming remains possible.
            const burstLimit = clamp(0.92 - Math.max(0, 65 - who.overall) / 200, 0.55, 0.92);
            const burst = who.slot > 7 && Math.sin(t * 0.09 + i) > burstLimit ? 4 : -1.5;
            if (dir > 0)
              x = Math.min(x + Math.max(0, burst), Math.max(50, line + burst));
            else
              x = Math.max(x - Math.max(0, burst), Math.min(50, line - burst));
            const nearest = opponents.reduce(
              (best, q) =>
                Math.hypot(q.x - p.x, q.y - p.y) <
                Math.hypot(best.x - p.x, best.y - p.y)
                  ? q
                  : best,
              { x: -999, y: -999 },
            );
            if (Math.hypot(nearest.x - p.x, nearest.y - p.y) < 6)
              y += p.y > nearest.y ? 4 : -4;
          }
          if (who.side !== side && i !== chaser) {
            // Cover goal-side lanes instead of abandoning the area to chase the ball.
            x = x * 0.55 + (ball[0] + dir * -7) * 0.45;
            y = y * 0.75 + ball[1] * 0.25;
          }
          if (i === chaser) {
            x = ball[0] + direction(side) * 2;
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
          if (f.type === "out") {
            awardRestart(t, f.to, f.side);
          } else if (f.type === "shot") {
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
            } else if (["post", "crossbar"].includes(f.outcome)) {
              const reboundAt = [
                clamp(f.to[0] + (direction(f.side) > 0 ? -5 : 5), 3, 97),
                clamp(f.to[1] + (rand() < 0.5 ? -7 : 7), 18, 46),
              ];
              event(
                t,
                "woodwork",
                f.side,
                f.actor,
                `${people[f.actor].name} acerta ${f.outcome === "post" ? "a trave" : "o travessão"}! A bola volta para o campo.`,
                { kind: f.outcome, at: f.to },
              );
              const reboundTarget = people
                .map((p, i) => i)
                .filter((i) => active(i) && people[i].slot !== 0)
                .sort(
                  (a, b) =>
                    Math.hypot(positions[a].x - reboundAt[0], positions[a].y - reboundAt[1]) -
                    Math.hypot(positions[b].x - reboundAt[0], positions[b].y - reboundAt[1]),
                )[0];
              owner = f.actor;
              send(t, reboundAt, reboundTarget, "rebound", null, f.to);
              stop = t - 1;
              cooldown = t;
            } else {
              owner = keeperFor(1 - f.side);
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
              if (f.outcome === "save" && rand() < 0.3) {
                positions[owner] = { x: f.to[0], y: f.to[1] };
                ball = [...f.to];
                send(
                  t,
                  [f.to[0] + (direction(f.side) > 0 ? 6 : -6), f.to[1]],
                  owner,
                  "out",
                  null,
                  f.to,
                );
                stop = t - 1;
                cooldown = t;
              } else if (f.outcome === "save") {
                ball = [positions[owner].x, positions[owner].y];
                cooldown = t + 13;
                stop = t + 12;
                lastPass = null;
              }
              if (f.outcome === "miss") {
                awardRestart(t, f.to, f.side);
                record(t);
                continue;
              }
            }
          } else if (f.type === "rebound") {
            owner = f.target;
            ball = [positions[owner].x, positions[owner].y];
            event(
              t,
              "rebound-control",
              people[owner].side,
              owner,
              `${people[owner].name} disputa e fica com o rebote.`,
            );
            cooldown = t + 2;
            lastPass = null;
          } else {
            if (f.type === "pass" && f.offside?.offside) {
              const at = [positions[f.target].x, positions[f.target].y];
              event(
                t,
                "offside",
                f.side,
                f.target,
                `Impedimento de ${people[f.target].name}. Tiro livre indireto.`,
                { line: f.offside.line, at },
              );
              owner = people
                .map((p, i) => i)
                .filter((i) => people[i].side !== f.side && active(i))
                .sort(
                  (a, b) =>
                    Math.hypot(positions[a].x - at[0], positions[a].y - at[1]) -
                    Math.hypot(positions[b].x - at[0], positions[b].y - at[1]),
                )[0];
              positions[owner] = { x: at[0], y: at[1] };
              ball = at;
              stop = t + 12;
              cooldown = t + 15;
              lastPass = null;
              record(t);
              continue;
            }
            owner = f.target;
            if (f.type === "pass") {
              stats[f.actor].completed++;
              passChain++;
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
          rand() < 0.14 * POSTURES[postures[people[rival].side]].pressure
        ) {
          if (rand() < POSTURES[postures[people[rival].side]].pressure * clamp(0.045 + people[rival].attributes.aggression / 1800 + Math.max(0, 65 - people[rival].overall) / 700, 0.035, 0.16)) {
            const foulPoint = [...ball];
            const victimSide = people[owner].side;
            event(
              t,
              "foul",
              people[rival].side,
              rival,
              `Falta de ${people[rival].name}.`,
              { victim: owner },
            );
            if (rand() < 0.035) {
              const injured = owner;
              stats[injured].injured = true;
              event(
                t,
                "injury",
                people[injured].side,
                injured,
                `${people[injured].name} se machuca e deixa o campo.`,
              );
              if (!substitute(t, injured, true)) {
                owner = people.findIndex(
                  (p, i) => p.side === people[injured].side && active(i),
                );
                ball = [positions[owner].x, positions[owner].y];
              }
            }
            if (rand() < 0.25) {
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
            const ownBox = direction(people[rival].side) > 0 ? foulPoint[0] <= 16.5 : foulPoint[0] >= 83.5;
            if (ownBox && foulPoint[1] >= 11 && foulPoint[1] <= 53)
              penalty(t, victimSide, people[rival].side, foulPoint, rival);
            else freeKick(t, victimSide, foulPoint);
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
        const ownerSide = people[owner].side;
        const clearGoal =
          people[owner].slot !== 0 &&
          shootingChance(
            ball,
            positions[keeperFor(1 - ownerSide)],
            direction(ownerSide),
          ) === 1;
        if ((t >= cooldown || clearGoal) && t > stop) {
          const actor = owner,
            s = people[actor].side,
            dir = direction(s),
            distance = dir > 0 ? 100 - ball[0] : ball[0];
          if (
            people[actor].slot !== 0 &&
            rand() <
              POSTURES[postures[s]].shot * shootingChance(
                ball,
                positions[keeperFor(1 - s)],
                dir,
                lanePressure(
                  { x: ball[0], y: ball[1] },
                  { x: dir > 0 ? 100 : 0, y: 32 },
                  rivals.map((i) => positions[i]),
                ),
                people[actor].overall,
                skill(actor, "shot", t),
                passChain,
              )
          ) {
            stats[actor].shots++;
            passChain = 0;
            const keeper = keeperFor(1 - s);
            const openGoal =
              (ball[0] - positions[keeper].x) * dir > 1 &&
              Math.abs(ball[1] - 32) < 12;
            const onTarget =
              rand() <
              clamp(
                0.48 +
                  skill(actor, "shot", t) / 230 -
                  distance / 180 +
                  (openGoal ? 0.3 : 0),
                0.2,
                0.97,
              );
            const goal =
              onTarget &&
              rand() <
                clamp(
                  (openGoal ? 0.84 : 0.075) +
                    (skill(actor, "shot", t) - skill(keeper, "gk", t)) / 180 +
                    (12 - distance) / 250,
                  0.025,
                  0.97,
                );
            const woodwork = onTarget && !goal && rand() < 0.075;
            const outcome = goal
              ? "goal"
              : woodwork
                ? rand() < 0.62
                  ? "post"
                  : "crossbar"
                : onTarget
                  ? "save"
                  : "miss";
            event(
              t,
              "shot",
              s,
              actor,
              `${people[actor].name} ${distance >= 23 ? "arrisca de longe" : "finaliza"}!`,
                { distance, longRange: distance >= 23, outcome },
            );
            send(
              t,
              [
                dir > 0 ? 100 : 0,
                outcome === "post"
                  ? rand() < 0.5
                    ? 27
                    : 37
                  : outcome === "crossbar"
                    ? 32
                    : goal
                      ? 29 + rand() * 6
                      : onTarget
                        ? 32
                        : rand() < 0.5
                          ? 23
                          : 41,
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
                  w:
                    rand() * (14 - people[actor].overall / 10) +
                    dir * (positions[i].x - ball[0]) * 0.45 +
                    (distance < 30 && lastPass?.from === i ? -12 : 0) -
                    lanePressure(
                      { x: ball[0], y: ball[1] },
                      positions[i],
                      rivals.map((j) => positions[j]),
                    ) *
                      14 -
                    (offsideAtPass(
                      positions[i],
                      ball,
                      rivals
                        .map((j) => positions[j])
                        .concat([positions[keeperFor(1 - s)]]),
                      dir,
                    ).offside
                      ? 12 + people[actor].overall / 4
                      : 0) +
                    Math.min(
                      8,
                      ...rivals.map((j) =>
                        Math.hypot(
                          positions[j].x - positions[i].x,
                          positions[j].y - positions[i].y,
                        ),
                      ),
                    ),
                }))
                .sort((a, b) => b.w - a.w);
              const target = ranked[0].i;
              stats[actor].passes++;
              if (
                rand() <
                clamp(
                  0.48 +
                    skill(actor, "shortPass", t) / 200 -
                    lanePressure(
                      { x: ball[0], y: ball[1] },
                      positions[target],
                      rivals.map((i) => positions[i]),
                    ) *
                      0.07,
                  0.4,
                  0.96,
                )
              )
                send(
                  t,
                  [positions[target].x, positions[target].y],
                  target,
                  "pass",
                );
              else {
                if (rand() < 0.28) {
                  send(
                    t,
                    [positions[target].x, positions[target].y < 32 ? -1 : 65],
                    target,
                    "out",
                  );
                  lastPass = null;
                  record(t);
                  continue;
                }
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
    durationSeconds,
    "fulltime",
    null,
    null,
    `Fim de jogo: ${teams[0].name} ${score[0]} × ${score[1]} ${teams[1].name}.`,
  );
  let penaltyShootout = null;
  if (snapshot.penaltiesOnDraw && score[0] === score[1]) {
    const shootoutScore = [0, 0], kicks = [];
    const shooters = [0, 1].map((side) => people.map((p, i) => i)
      .filter((i) => people[i].side === side && people[i].slot !== 0 && active(i))
      .sort((a, b) => skill(b, "shot", durationSeconds) - skill(a, "shot", durationSeconds)));
    const keepers = [keeperFor(0), keeperFor(1)];
    for (let n = 0; n < 30; n++) {
      const side = n % 2 === 0 ? kickoffSide : 1 - kickoffSide;
      const sequence = Math.floor(n / 2);
      const kicker = shooters[side][sequence % shooters[side].length];
      const keeper = keepers[1 - side];
      const chance = clamp(0.73 + (skill(kicker, "shot", durationSeconds) - skill(keeper, "gk", durationSeconds)) / 220, 0.48, 0.93);
      const outcome = rand() < chance ? "goal" : "save";
      if (outcome === "goal") shootoutScore[side]++;
      const kick = { round: Math.floor(n / 2) + 1, side, kicker, keeper, outcome, score: [...shootoutScore] };
      kicks.push(kick);
      event(durationSeconds, "penalty-shootout-kick", side, kicker, `${people[kicker].name}: ${outcome === "goal" ? "gol" : "defendido"} nos pênaltis.`, kick);
      if (n < 10) {
        const remainingA = Math.max(0, 5 - Math.ceil((n + 1) / 2));
        const remainingB = Math.max(0, 5 - Math.floor((n + 1) / 2));
        if (shootoutScore[0] > shootoutScore[1] + remainingA || shootoutScore[1] > shootoutScore[0] + remainingB) break;
      } else if (n % 2 === 1 && shootoutScore[0] !== shootoutScore[1]) break;
    }
    penaltyShootout = { score: shootoutScore, winner: shootoutScore[0] === shootoutScore[1] ? null : shootoutScore[0] > shootoutScore[1] ? 0 : 1, kicks };
    event(durationSeconds, "penalty-shootout", penaltyShootout.winner, null, `Pênaltis: ${teams[0].name} ${shootoutScore[0]} × ${shootoutScore[1]} ${teams[1].name}.`, penaltyShootout);
  }
  const ratings = stats.map((s, i) =>
    s.seconds === 0
      ? "—"
      : clamp(
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
    durationSeconds,
    events,
    stats,
    ratings,
    people,
    score,
    possession,
    snapshot,
    penaltyShootout,
  };
}
export function frameAt(match, time) {
  const last = matchDurationSeconds(match),
    a = clamp(time, 0, last),
    index = Math.floor(a);
  return {
    a: match.frames[index],
    b: match.frames[Math.min(last, index + 1)],
    mix: a - index,
  };
}
export function highlights(match) {
  return match.events.filter((e) =>
    [
      "corner",
      "goal",
      "freekick",
      "woodwork",
      "penalty-shootout",
      "yellow",
      "red",
      "offside",
      "injury",
      "substitution",
      "halftime",
      "fulltime",
    ].includes(e.type),
  );
}
