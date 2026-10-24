import test from "node:test";
import assert from "node:assert/strict";
import { makeSnapshot, simulateMatch } from "../../src/simulation/engine.js";
import { simulateMatch as v3 } from "../../src/simulation/engine-v3.js";
import { shootingChance } from "../../src/simulation/decisions.js";
const roles = [
  "GOL",
  "LD",
  "ZAG",
  "ZAG",
  "LE",
  "VOL",
  "MC",
  "MEI",
  "PTD",
  "ATA",
  "PTE",
];
const roster = (highSide = null) =>
  ["h", "a"].flatMap((teamId, side) =>
    Array.from({ length: 22 }, (_, i) => ({
      id: teamId + i,
      name: teamId + i,
      teamId,
      position: roles[i % 11],
      overall: highSide === null ? 60 : side === highSide ? 85 : 45,
      attributes: Object.fromEntries(
        [
          "shot",
          "attack",
          "gk",
          "defense",
          "shortPass",
          "speed",
          "stamina",
          "aggression",
          "dribble",
        ].map((k) => [k, 60]),
      ),
    })),
  );
const snapshot = (seed, players) =>
  makeSnapshot({ id: "h", name: "H" }, { id: "a", name: "A" }, players, seed);
test("clear close chances prefer shooting and long shots depend on quality, pressure and passing history", () => {
  assert.equal(shootingChance([90, 32], { x: 95, y: 32 }, 1), 1);
  assert.equal(shootingChance([10, 32], { x: 5, y: 32 }, -1), 1);
  assert.ok(
    shootingChance([68, 32], { x: 95, y: 32 }, 1, 0, 85, 85) >
      shootingChance([68, 32], { x: 95, y: 32 }, 1, 0, 45, 45),
  );
  assert.ok(shootingChance([68, 32], { x: 95, y: 32 }, 1) > 0);
  assert.equal(shootingChance([55, 32], { x: 95, y: 32 }, 1), 0);
  assert.ok(
    shootingChance([75, 32], { x: 95, y: 32 }, 1, 0, 60, 60, 4) >
      shootingChance([75, 32], { x: 95, y: 32 }, 1, 0, 60, 60, 0),
  );
});
test("v3 snapshot retains exact results and frames", () => {
  const s = snapshot(7, roster());
  s.version = 3;
  assert.deepEqual(simulateMatch(s), v3(s));
});
test("matched trials show overall contributes even when specific attributes are equal; shots include long range", () => {
  let highGoals = 0,
    lowGoals = 0,
    longShots = 0;
  for (let seed = 1; seed <= 12; seed++) {
    const side = seed % 2,
      m = simulateMatch(snapshot(seed, roster(side)));
    highGoals += m.score[side];
    lowGoals += m.score[1 - side];
    longShots += m.events.filter(
      (e) => e.type === "shot" && e.longRange,
    ).length;
    for (const t of [0, 1])
      assert.equal(
        m.score[t],
        m.events.filter((e) => e.type === "goal" && e.side === t).length,
      );
  }
  assert.ok(highGoals > lowGoals, `${highGoals} vs ${lowGoals}`);
  assert.ok(longShots > 12);
});
