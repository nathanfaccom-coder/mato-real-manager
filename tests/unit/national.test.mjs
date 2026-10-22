import test from "node:test";
import assert from "node:assert/strict";
import { memoryDB } from "../helpers/memory-db.mjs";
import { NATIONS } from "../../src/national/catalog.js";
import { roundRobin, validateLineup } from "../../src/national/rules.js";
import {
  appointCoach,
  saveSquad,
  saveLineup,
  setNationality,
  generateReserves,
  scheduleFriendly,
  createCup,
  createFinal,
  finishMatch,
} from "../../src/national/service.js";
const adm = { type: "ADMIN", data: { id: "NEXLYzsJfLPsTxzp3LKHKwaPhEZ2" } },
  coach = { type: "COACH", data: { id: "c" } };
const make = () =>
  memoryDB({
    "users/c": { type: "COACH", status: "ACTIVE", teamId: "club" },
    "users/c2": { type: "COACH", status: "ACTIVE" },
    "users/d": { type: "DOCTOR", status: "ACTIVE" },
  });
test("catalog has 211 FIFA associations plus Mato Real, without duplicates", () => {
  assert.equal(NATIONS.length, 212);
  assert.equal(new Set(NATIONS.map((n) => n.id)).size, 212);
  for (const [c, total] of Object.entries({
    AFC: 46,
    CAF: 54,
    CONCACAF: 35,
    CONMEBOL: 10,
    OFC: 11,
    UEFA: 55,
  }))
    assert.equal(NATIONS.filter((n) => n.confederation === c).length, total);
  for (const id of ["MTR", "BR", "ENG", "SCO", "WAL", "NIR", "XK", "GI"])
    assert.ok(NATIONS.some((n) => n.id === id));
});
test("only admins appoint active coaches, never doctors", async () => {
  const db = make();
  await assert.rejects(appointCoach(db, coach, "BR", "c"), /ADM/);
  await assert.rejects(appointCoach(db, adm, "BR", "d"), /ativo/);
  assert.equal(db.values.has("nationalTeams/BR"), false);
});
test("concurrent appointments give a coach at most one national team and preserve club job", async () => {
  const db = make();
  const results = await Promise.allSettled([
    appointCoach(db, adm, "BR", "c"),
    appointCoach(db, adm, "MTR", "c"),
  ]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(db.values.get("users/c").teamId, "club");
});
test("replacing and removing coach releases the previous assignment", async () => {
  const db = make();
  await appointCoach(db, adm, "BR", "c");
  await appointCoach(db, adm, "BR", "c2");
  assert.equal(db.values.get("users/c").nationalTeamId, null);
  await appointCoach(db, adm, "BR", null);
  assert.equal(db.values.get("users/c2").nationalTeamId, null);
});
test("coach cannot manage another nation and foreign players cannot be called", async () => {
  const db = make();
  db.values.set("players/p", { nationality: "BR", status: "ACTIVE" });
  await assert.rejects(saveSquad(db, coach, "BR", ["p"]), /técnico/);
  await appointCoach(db, adm, "MTR", "c");
  await assert.rejects(saveSquad(db, coach, "MTR", ["p"]), /nacionalidade/);
  assert.equal(db.values.get("players/p").nationalTeamId, undefined);
});
test("squad limits and duplicates are rejected", async () => {
  const db = make();
  await assert.rejects(saveSquad(db, adm, "BR", ["p", "p"]), /23/);
  await assert.rejects(
    saveSquad(
      db,
      adm,
      "BR",
      Array.from({ length: 24 }, (_, i) => String(i)),
    ),
    /23/,
  );
});
test("callup and removal preserve contract, salary and club", async () => {
  const db = make();
  db.values.set("players/p", {
    nationality: "BR",
    status: "ACTIVE",
    teamId: "club",
    salary: 1234,
    contract: 5,
  });
  await saveSquad(db, adm, "BR", ["p"]);
  assert.equal(db.values.get("players/p").nationalTeamId, "BR");
  await saveSquad(db, adm, "BR", []);
  assert.deepEqual(db.values.get("players/p"), {
    nationality: "BR",
    status: "ACTIVE",
    teamId: "club",
    salary: 1234,
    contract: 5,
    nationalTeamId: null,
  });
});
test("nationality is locked after callup or international appearance", async () => {
  const db = make();
  db.values.set("players/p", { nationality: "BR", nationalStats: { caps: 1 } });
  await assert.rejects(setNationality(db, adm, "p", "MTR"), /bloqueada/);
});
test("NPC generation is explicit and cannot duplicate across concurrent clicks", async () => {
  const db = make();
  assert.equal(
    [...db.values.keys()].filter((k) => k.startsWith("players/")).length,
    0,
  );
  const r = await Promise.allSettled([
    generateReserves(db, adm, "BR"),
    generateReserves(db, adm, "BR"),
  ]);
  assert.equal(r.filter((x) => x.status === "fulfilled").length, 1);
  assert.equal(
    [...db.values.keys()].filter((k) => k.startsWith("players/")).length,
    23,
  );
});
async function matchDB() {
  const db = make();
  for (const nation of ["BR", "MTR"]) {
    await generateReserves(db, adm, nation);
    const ids = [0, 3, 7, 8, 5, 11, 13, 15, 17, 21, 19].map(
      (i) => `national_${nation}_${i}`,
    );
    await saveSquad(db, adm, nation, ids);
    await saveLineup(db, adm, nation, "4-3-3 OFENSIVO", ids);
  }
  return db;
}
test("lineup rejects duplicates, injuries and no goalkeeper", () => {
  const players = Array.from({ length: 11 }, (_, i) => ({
    id: String(i),
    position: i === 0 ? "GOL" : "ATA",
    energy: 100,
  }));
  const ids = players.map((p) => p.id);
  assert.throws(
    () =>
      validateLineup(
        "4-3-3 OFENSIVO",
        ids.map(() => ids[0]),
        ids,
        players,
      ),
    /distintos/,
  );
  players[1].recoveryLeft = 2;
  assert.throws(
    () => validateLineup("4-3-3 OFENSIVO", ids, ids, players),
    /lesionado/,
  );
  players[1].recoveryLeft = 0;
  players[0].position = "ATA";
  assert.throws(
    () => validateLineup("4-3-3 OFENSIVO", ids, ids, players),
    /goleiro/,
  );
});
test("schedule rejects duplicate date for a national team and club dates", async () => {
  const db = make();
  db.values.set("matches/club", { date: "2027-01-01", status: "PENDING" });
  await assert.rejects(
    scheduleFriendly(db, adm, "BR", "MTR", "2027-01-01"),
    /clube/,
  );
  await scheduleFriendly(db, adm, "BR", "MTR", "2027-01-02");
  await assert.rejects(
    scheduleFriendly(db, adm, "BR", "AR", "2027-01-02"),
    /já tem/,
  );
});
test("round robin covers each pairing once and only one game per team per date", () => {
  const games = roundRobin(["BR", "MTR", "AR", "PT", "FR"], "2027-01-01");
  assert.equal(games.length, 10);
  assert.equal(
    new Set(games.map((g) => [g.homeId, g.awayId].sort().join("-"))).size,
    10,
  );
  for (const date of new Set(games.map((g) => g.date))) {
    const ids = games
      .filter((g) => g.date === date)
      .flatMap((g) => [g.homeId, g.awayId]);
    assert.equal(new Set(ids).size, ids.length);
  }
});
test("match commits once with separate national stats, club stats untouched", async () => {
  const db = await matchDB();
  const id = await scheduleFriendly(db, adm, "BR", "MTR", "2027-01-01");
  const pid = "national_BR_21";
  const p = db.values.get("players/" + pid);
  p.stats = { goals: 9 };
  const r = await Promise.allSettled([
    finishMatch(db, adm, id, 1, 0, { [pid]: { goals: 1 } }),
    finishMatch(db, adm, id, 1, 0, { [pid]: { goals: 1 } }),
  ]);
  assert.equal(r.filter((x) => x.status === "fulfilled").length, 1);
  const after = db.values.get("players/" + pid);
  assert.equal(after.stats.goals, 9);
  assert.equal(after.nationalStats.goals, 1);
  assert.equal(after.nationalStats.caps, 1);
  assert.equal(after.energy, 75);
  assert.equal(after.salary, p.salary);
  assert.equal(after.teamId, p.teamId);
});
test("invalid individual scoring aborts every write", async () => {
  const db = await matchDB();
  const id = await scheduleFriendly(db, adm, "BR", "MTR", "2027-01-01");
  await assert.rejects(
    finishMatch(db, adm, id, 0, 0, { national_BR_21: { goals: 1 } }),
    /placar/,
  );
  assert.equal(db.values.get("players/national_BR_21").energy, 100);
  assert.equal(db.values.get("nationalMatches/" + id).status, "PENDING");
});
test("cup final waits for completed group and awards international trophy once", async () => {
  const db = await matchDB();
  await saveSquad(db, adm, "BR", [
    ...db.values.get("nationalTeams/BR").squadIds,
    "national_BR_1",
  ]);
  const id = await createCup(
    db,
    adm,
    "Copa Teste",
    ["BR", "MTR"],
    "2027-01-01",
  );
  await assert.rejects(createFinal(db, adm, id, "2027-01-02"), /Conclua/);
  const game = db.values.get("nationalCompetitions/" + id).matchIds[0];
  await finishMatch(db, adm, game, 1, 0);
  await createFinal(db, adm, id, "2027-01-02");
  await assert.rejects(createFinal(db, adm, id, "2027-01-03"), /já foi/);
  const final = db.values.get("nationalCompetitions/" + id).finalId;
  await assert.rejects(finishMatch(db, adm, final, 0, 0), /pênaltis/);
  await finishMatch(db, adm, final, 0, 0, {}, "BR");
  assert.equal(db.values.get("nationalCompetitions/" + id).winnerId, "BR");
  assert.equal(
    db.values.get("players/national_BR_21").nationalTrophies.length,
    1,
  );
  assert.equal(
    db.values.get("players/national_MTR_21").nationalTrophies.length,
    0,
  );
  assert.equal(
    db.values.get("players/national_BR_1").nationalTrophies.length,
    1,
  );
  assert.equal(db.values.get("players/national_BR_1").nationalStats.caps, 0);
  assert.equal(db.values.get("players/national_BR_1").energy, 100);
});
