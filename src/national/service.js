import {
  assertNation,
  eligible,
  validateSquad,
  validateLineup,
  roundRobin,
  standings,
} from "./rules.js";
import { nationName, nationalityOf } from "./catalog.js";
import { generateAttributes } from "../game/generateAttributes.js";
const admin = (user) => {
  if (user?.type !== "ADMIN")
    throw Error("Apenas o ADM pode realizar esta operação.");
};
const ref = (db, col, id) => db.collection(col).doc(id);
const data = (s) => (s.exists ? s.data() : {});
const manager = (user, team) => {
  if (
    user?.type !== "ADMIN" &&
    (user?.type !== "COACH" || team.coachId !== user.data.id)
  )
    throw Error("Você não é o técnico desta seleção.");
};
const row = (s) => ({ ...data(s), id: s.id });
export async function appointCoach(db, user, nationId, coachId) {
  admin(user);
  assertNation(nationId);
  return db.runTransaction(async (tx) => {
    const teamRef = ref(db, "nationalTeams", nationId),
      team = data(await tx.get(teamRef));
    const nextRef = coachId ? ref(db, "users", coachId) : null,
      next = nextRef ? await tx.get(nextRef) : null;
    const oldRef = team.coachId ? ref(db, "users", team.coachId) : null,
      old = oldRef ? await tx.get(oldRef) : null;
    if (
      coachId &&
      (!next.exists ||
        next.data().type !== "COACH" ||
        ["PENDING", "BLOCKED"].includes(next.data().status))
    )
      throw Error("Escolha um técnico ativo.");
    if (
      coachId &&
      next.data().nationalTeamId &&
      next.data().nationalTeamId !== nationId
    )
      throw Error(
        "Este técnico já comanda outra seleção. Remova a nomeação anterior primeiro.",
      );
    if (
      old?.exists &&
      oldRef.id !== coachId &&
      old.data().nationalTeamId === nationId
    )
      tx.update(oldRef, { nationalTeamId: null });
    if (nextRef) tx.update(nextRef, { nationalTeamId: nationId });
    tx.set(teamRef, {
      ...team,
      coachId: coachId || null,
      squadIds: team.squadIds || [],
      updatedAt: Date.now(),
    });
  });
}
export async function saveSquad(db, user, nationId, ids) {
  assertNation(nationId);
  if (ids.length > 23 || new Set(ids).size !== ids.length)
    throw Error("Limite de 23 convocados distintos.");
  return db.runTransaction(async (tx) => {
    const teamRef = ref(db, "nationalTeams", nationId),
      team = data(await tx.get(teamRef));
    manager(user, team);
    const all = [...new Set([...(team.squadIds || []), ...ids])];
    const snaps = await Promise.all(
      all.map((id) => tx.get(ref(db, "players", id))),
    );
    const players = snaps.filter((s) => s.exists).map(row);
    validateSquad(nationId, ids, players);
    for (const p of players) {
      if (ids.includes(p.id))
        tx.update(ref(db, "players", p.id), { nationalTeamId: nationId });
      else if (p.nationalTeamId === nationId)
        tx.update(ref(db, "players", p.id), { nationalTeamId: null });
    }
    tx.set(teamRef, {
      ...team,
      squadIds: ids,
      lineup: (team.lineup || []).map((id) => (ids.includes(id) ? id : "")),
      updatedAt: Date.now(),
    });
    tx.set(db.collection("news").doc(), {
      text: `🌍 CONVOCAÇÃO — ${nationName(nationId)} divulgou sua lista de ${ids.length} jogadores.`,
      type: "normal",
      date: Date.now(),
    });
  });
}
export async function saveLineup(db, user, nationId, formation, lineup) {
  return db.runTransaction(async (tx) => {
    const r = ref(db, "nationalTeams", nationId),
      team = data(await tx.get(r));
    manager(user, team);
    const players = (
      await Promise.all(
        [...new Set(lineup.filter(Boolean))].map((id) =>
          tx.get(ref(db, "players", id)),
        ),
      )
    )
      .filter((s) => s.exists)
      .map(row);
    validateSquad(
      nationId,
      team.squadIds || [],
      (
        await Promise.all(
          (team.squadIds || []).map((id) => tx.get(ref(db, "players", id))),
        )
      )
        .filter((s) => s.exists)
        .map(row),
    );
    validateLineup(formation, lineup, team.squadIds || [], players);
    tx.set(r, { ...team, formation, lineup, updatedAt: Date.now() });
  });
}
export async function setNationality(db, user, playerId, nationId) {
  admin(user);
  assertNation(nationId);
  return db.runTransaction(async (tx) => {
    const r = ref(db, "players", playerId),
      s = await tx.get(r);
    if (!s.exists) throw Error("Jogador não encontrado.");
    const p = s.data();
    if (
      p.nationalTeamId ||
      (p.nationalStats?.caps || 0) > 0 ||
      p.nationalTrophies?.length
    )
      throw Error(
        "Nacionalidade bloqueada após representar uma seleção. Desconvoque antes de corrigir um cadastro sem partidas.",
      );
    tx.update(r, { nationality: nationId });
  });
}
export async function generateReserves(db, user, nationId) {
  admin(user);
  assertNation(nationId);
  // A fixed set per nation prevents a double click from creating duplicate squads.
  const positions = [
    "GOL",
    "GOL",
    "GOL",
    "LD",
    "LD",
    "LE",
    "LE",
    "ZAG",
    "ZAG",
    "ZAG",
    "ZAG",
    "VOL",
    "VOL",
    "MC",
    "MC",
    "MEI",
    "MEI",
    "PTD",
    "PTD",
    "PTE",
    "PTE",
    "ATA",
    "ATA",
  ];
  return db.runTransaction(async (tx) => {
    const marker = ref(db, "nationalTeams", nationId),
      team = data(await tx.get(marker));
    if (team.reservesGenerated)
      throw Error("Os NPCs de apoio desta seleção já foram gerados.");
    positions.forEach((position, i) =>
      tx.set(ref(db, "players", `national_${nationId}_${i}`), {
        name: `${nationName(nationId)} • Reserva ${i + 1}`,
        nationality: nationId,
        isNPC: true,
        position,
        teamId: "FREE",
        status: "NAO_A_VENDA",
        overall: 45,
        attributes: generateAttributes(position, 45),
        energy: 100,
        balance: 0,
        fame: 0,
        salary: 1500,
        value: 40000,
        contract: 0,
        stats: {},
        nationalStats: { caps: 0, goals: 0, assists: 0 },
        nationalTrophies: [],
      }),
    );
    tx.set(marker, { ...team, reservesGenerated: true });
  });
}
function dateKey(value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value))
    return value.slice(0, 10);
  if (typeof value === "number")
    return new Date(value).toISOString().slice(0, 10);
  return "";
}
async function createSchedule(db, user, games, competition) {
  admin(user);
  const clubMatches = await db.collection("matches").get();
  for (const game of games) {
    assertNation(game.homeId);
    assertNation(game.awayId);
    if (game.homeId === game.awayId)
      throw Error("Escolha duas seleções diferentes.");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(game.date) ||
      Number.isNaN(Date.parse(game.date))
    )
      throw Error("Data inválida.");
    if (
      clubMatches.docs.some(
        (s) =>
          dateKey(s.data().date) === game.date &&
          s.data().status !== "CANCELLED",
      )
    )
      throw Error(
        `Já existe uma partida de clube em ${game.date}. Escolha outra data.`,
      );
  }
  const compRef = competition
    ? db.collection("nationalCompetitions").doc()
    : null;
  const matchRefs = games.map(() => db.collection("nationalMatches").doc());
  return db.runTransaction(async (tx) => {
    const dates = [...new Set(games.map((g) => g.date))];
    const windows = await Promise.all(
      dates.map((d) => tx.get(ref(db, "nationalWindows", d))),
    );
    const occupied = new Map(
      dates.map((d, i) => [d, new Set(data(windows[i]).teams || [])]),
    );
    for (const g of games) {
      const used = occupied.get(g.date);
      if (used.has(g.homeId) || used.has(g.awayId))
        throw Error("Uma seleção já tem partida nessa data.");
      used.add(g.homeId);
      used.add(g.awayId);
    }
    dates.forEach((d) =>
      tx.set(ref(db, "nationalWindows", d), { teams: [...occupied.get(d)] }),
    );
    games.forEach((g, i) =>
      tx.set(matchRefs[i], {
        ...g,
        status: "PENDING",
        competitionId: compRef?.id || null,
        competitionName: competition?.name || "Amistoso",
        stage: competition ? "GROUP" : "FRIENDLY",
        createdAt: Date.now(),
      }),
    );
    if (compRef)
      tx.set(compRef, {
        ...competition,
        date: games[0].date,
        matchIds: matchRefs.map((r) => r.id),
        status: "ACTIVE",
        createdAt: Date.now(),
      });
    return compRef?.id || matchRefs[0].id;
  });
}
export const scheduleFriendly = (db, user, homeId, awayId, date) =>
  createSchedule(db, user, [{ homeId, awayId, date }], null);
export function createCup(db, user, name, ids, date) {
  if (!name.trim()) throw Error("Dê um nome à copa.");
  return createSchedule(db, user, roundRobin(ids, date), {
    name: name.trim().slice(0, 80),
    teamIds: ids,
  });
}
export async function createFinal(db, user, competitionId, date) {
  admin(user);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)))
    throw Error("Data inválida.");
  const club = await db.collection("matches").get();
  if (
    club.docs.some(
      (s) => dateKey(s.data().date) === date && s.data().status !== "CANCELLED",
    )
  )
    throw Error("Data ocupada por jogo de clube.");
  const finalRef = db.collection("nationalMatches").doc();
  return db.runTransaction(async (tx) => {
    const cr = ref(db, "nationalCompetitions", competitionId),
      cs = await tx.get(cr);
    if (!cs.exists) throw Error("Copa não encontrada.");
    const c = cs.data();
    if (c.finalId) throw Error("A final já foi criada.");
    const games = (
      await Promise.all(
        c.matchIds.map((id) => tx.get(ref(db, "nationalMatches", id))),
      )
    ).map(row);
    if (games.some((g) => g.status !== "FINISHED"))
      throw Error("Conclua todos os jogos da fase de pontos.");
    if (games.some((g) => g.date >= date))
      throw Error("A final precisa ocorrer depois da fase de pontos.");
    const [h, a] = standings(c.teamIds, games);
    const wr = ref(db, "nationalWindows", date),
      w = data(await tx.get(wr));
    if ((w.teams || []).some((id) => [h.id, a.id].includes(id)))
      throw Error("Finalista já tem jogo nessa data.");
    tx.set(wr, { teams: [...(w.teams || []), h.id, a.id] });
    tx.set(finalRef, {
      homeId: h.id,
      awayId: a.id,
      date,
      status: "PENDING",
      competitionId,
      competitionName: c.name,
      stage: "FINAL",
    });
    tx.update(cr, { finalId: finalRef.id });
  });
}
export async function finishMatch(
  db,
  user,
  matchId,
  homeScore,
  awayScore,
  stats = {},
  penaltyWinner = null,
) {
  admin(user);
  if (
    ![homeScore, awayScore].every(
      (n) => Number.isInteger(n) && n >= 0 && n <= 99,
    )
  )
    throw Error("Placar inválido (0 a 99).");
  return db.runTransaction(async (tx) => {
    const mr = ref(db, "nationalMatches", matchId),
      ms = await tx.get(mr);
    if (!ms.exists || ms.data().status !== "PENDING")
      throw Error("Esta partida já foi encerrada ou removida.");
    const m = ms.data();
    const ts = await Promise.all(
      [m.homeId, m.awayId].map((id) => tx.get(ref(db, "nationalTeams", id))),
    );
    const teams = ts.map(data);
    const ids = teams.flatMap((t) => t.lineup || []);
    if (new Set(ids).size !== 22)
      throw Error("As duas seleções precisam salvar 11 titulares diferentes.");
    const ps = await Promise.all(
      ids.map((id) => tx.get(ref(db, "players", id))),
    );
    const players = ps.filter((s) => s.exists).map(row);
    teams.forEach((t, i) => {
      const nid = [m.homeId, m.awayId][i];
      validateSquad(nid, t.lineup || [], players);
      validateLineup(t.formation, t.lineup, t.squadIds || [], players);
    });
    for (const [id, s] of Object.entries(stats)) {
      if (
        !ids.includes(id) ||
        ![s.goals || 0, s.assists || 0].every(
          (n) => Number.isInteger(n) && n >= 0 && n <= 99,
        )
      )
        throw Error("Estatísticas inválidas.");
    }
    teams.forEach((t, i) => {
      const goals = t.lineup.reduce((v, id) => v + (stats[id]?.goals || 0), 0);
      const assists = t.lineup.reduce(
        (v, id) => v + (stats[id]?.assists || 0),
        0,
      );
      if (goals > [homeScore, awayScore][i] || assists > goals)
        throw Error(
          "Gols/assistências individuais não correspondem ao placar.",
        );
    });
    const winner =
      homeScore === awayScore
        ? penaltyWinner
        : homeScore > awayScore
          ? m.homeId
          : m.awayId;
    if (m.stage === "FINAL" && ![m.homeId, m.awayId].includes(winner))
      throw Error("Informe o vencedor dos pênaltis para a final empatada.");
    const compRef =
      m.stage === "FINAL"
        ? ref(db, "nationalCompetitions", m.competitionId)
        : null;
    const comp = compRef ? data(await tx.get(compRef)) : null;
    const trophy = comp
      ? {
          competitionId: m.competitionId,
          name: comp.name,
          nationId: winner,
          date: m.date,
        }
      : null;
    const benchIds = trophy
      ? (teams[[m.homeId, m.awayId].indexOf(winner)].squadIds || []).filter(
          (id) => !ids.includes(id),
        )
      : [];
    const bench = (
      await Promise.all(benchIds.map((id) => tx.get(ref(db, "players", id))))
    )
      .filter((s) => s.exists)
      .map(row);
    for (const p of players) {
      const s = p.nationalStats || {};
      const extra = stats[p.id] || {};
      const update = {
        energy: Math.max(0, (p.energy ?? 100) - 25),
        nationalStats: {
          ...s,
          caps: (s.caps || 0) + 1,
          goals: (s.goals || 0) + (extra.goals || 0),
          assists: (s.assists || 0) + (extra.assists || 0),
        },
      };
      if (trophy && nationalityOf(p) === winner)
        update.nationalTrophies = [...(p.nationalTrophies || []), trophy];
      tx.update(ref(db, "players", p.id), update);
    }
    for (const p of bench) {
      if (eligible(p, winner))
        tx.update(ref(db, "players", p.id), {
          nationalTrophies: [...(p.nationalTrophies || []), trophy],
        });
    }
    tx.update(mr, {
      status: "FINISHED",
      homeScore,
      awayScore,
      stats,
      lineups: teams.map((t) => t.lineup),
      winnerId: winner || null,
      finishedAt: Date.now(),
    });
    if (compRef) tx.update(compRef, { status: "FINISHED", winnerId: winner });
    tx.set(db.collection("news").doc(), {
      text: `🌍 ${m.competitionName}: ${nationName(m.homeId)} ${homeScore} × ${awayScore} ${nationName(m.awayId)}${trophy ? ` — Campeã: ${nationName(winner)}!` : ""}`,
      type: "normal",
      date: Date.now(),
    });
  });
}
