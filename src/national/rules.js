import { NATION_BY_ID, nationalityOf } from "./catalog.js";
import { FORMATIONS } from "../game/FORMATIONS.js";
export const MAX_SQUAD = 23;
export function assertNation(id) {
  if (!NATION_BY_ID[id]) throw Error("Seleção inválida.");
}
export function eligible(player, id) {
  return (
    nationalityOf(player) === id &&
    !["PENDING", "BLOCKED"].includes(player.status)
  );
}
export function validateSquad(id, ids, players) {
  assertNation(id);
  if (
    !Array.isArray(ids) ||
    ids.length > MAX_SQUAD ||
    new Set(ids).size !== ids.length
  )
    throw Error("Convoque até 23 jogadores, sem repetidos.");
  if (ids.some((pid) => !players.some((p) => p.id === pid && eligible(p, id))))
    throw Error("Jogador indisponível ou de outra nacionalidade.");
}
export function validateLineup(formation, lineup, squad, players) {
  if (!FORMATIONS[formation]) throw Error("Formação inválida.");
  if (
    lineup.length !== 11 ||
    new Set(lineup).size !== 11 ||
    lineup.some((id) => !id || !squad.includes(id))
  )
    throw Error("Selecione 11 titulares distintos da convocação.");
  const selected = lineup.map((id) => players.find((p) => p.id === id));
  if (
    selected.some(
      (p) => !p || (p.recoveryLeft || 0) > 0 || (p.energy ?? 100) < 25,
    )
  )
    throw Error(
      "Titular lesionado, indisponível ou com menos de 25 de energia.",
    );
  if (
    selected[0].position !== "GOL" ||
    selected.slice(1).some((p) => p.position === "GOL")
  )
    throw Error(
      "Escale um goleiro na primeira posição e dez jogadores de linha.",
    );
}
export function roundRobin(ids, startDate) {
  if (ids.length < 2 || ids.length > 16 || new Set(ids).size !== ids.length)
    throw Error("Escolha de 2 a 16 seleções distintas.");
  ids.forEach(assertNation);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(startDate) ||
    Number.isNaN(Date.parse(startDate))
  )
    throw Error("Escolha uma data válida.");
  const ring = [...ids];
  if (ring.length % 2) ring.push(null);
  const games = [];
  for (let round = 0; round < ring.length - 1; round++) {
    const date = new Date(startDate + "T12:00:00Z");
    date.setUTCDate(date.getUTCDate() + round * 7);
    for (let i = 0; i < ring.length / 2; i++) {
      const a = ring[i],
        b = ring[ring.length - 1 - i];
      if (a && b)
        games.push({
          homeId: round % 2 ? b : a,
          awayId: round % 2 ? a : b,
          date: date.toISOString().slice(0, 10),
          round: round + 1,
        });
    }
    ring.splice(1, 0, ring.pop());
  }
  return games;
}
export function standings(ids, matches) {
  const rows = new Map(
    ids.map((id) => [id, { id, pts: 0, played: 0, wins: 0, gf: 0, ga: 0 }]),
  );
  for (const m of matches.filter(
    (m) => m.status === "FINISHED" && m.stage !== "FINAL",
  )) {
    const h = rows.get(m.homeId),
      a = rows.get(m.awayId);
    if (!h || !a) continue;
    h.played++;
    a.played++;
    h.gf += m.homeScore;
    h.ga += m.awayScore;
    a.gf += m.awayScore;
    a.ga += m.homeScore;
    if (m.homeScore === m.awayScore) {
      h.pts++;
      a.pts++;
    } else {
      const w = m.homeScore > m.awayScore ? h : a;
      w.pts += 3;
      w.wins++;
    }
  }
  return [...rows.values()].sort(
    (a, b) =>
      b.pts - a.pts ||
      b.wins - a.wins ||
      b.gf - b.ga - (a.gf - a.ga) ||
      b.gf - a.gf ||
      a.id.localeCompare(b.id),
  );
}
