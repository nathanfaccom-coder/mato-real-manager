import test from "node:test";
import assert from "node:assert/strict";
import { makeSnapshot, simulateMatch } from "../../src/simulation/engine.js";
import { simulateMatch as v2 } from "../../src/simulation/engine-v2.js";
import {
  shootingChance,
  boundaryRestart,
} from "../../src/simulation/decisions.js";
import { audibleEvents } from "../../src/simulation/audio-events.js";
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
const ps = ["h", "a"].flatMap((teamId) =>
  Array.from({ length: 22 }, (_, i) => ({
    id: teamId + i,
    name: teamId + i,
    teamId,
    position: roles[i % 11],
    overall: 60,
  })),
);
const snapshot = () =>
  makeSnapshot({ id: "h", name: "H" }, { id: "a", name: "A" }, ps, 1);
test("open goal is an immediate shooting decision in either direction; bad angles are not", () => {
  assert.equal(shootingChance([94, 32], { x: 88, y: 30 }, 1), 1);
  assert.equal(shootingChance([6, 32], { x: 12, y: 30 }, -1), 1);
  assert.equal(shootingChance([90, 2], { x: 95, y: 32 }, 1), 0);
  assert.ok(
    shootingChance([85, 32], { x: 95, y: 32 }, 1, 0) >
      shootingChance([85, 32], { x: 95, y: 32 }, 1, 3),
  );
});
test("restarts award the other team and distinguish own goal line from attacking end", () => {
  assert.deepEqual(boundaryRestart([40, 65], 0, 1), {
    type: "throwin",
    side: 1,
    at: [40, 64],
  });
  assert.equal(boundaryRestart([0, 27], 0, 1).type, "corner");
  assert.equal(boundaryRestart([100, 27], 0, 1).type, "goalkick");
  assert.equal(boundaryRestart([100, 27], 1, -1).type, "corner");
  assert.equal(boundaryRestart([0, 27], 1, -1).type, "goalkick");
});
test("full game awards and takes all three restarts after stationary pauses", () => {
  const m = simulateMatch(snapshot());
  for (const type of ["throwin", "corner", "goalkick"]) {
    const es = m.events.filter((e) => e.type === type);
    assert.ok(es.length > 0, type);
    for (const e of es) {
      assert.equal(e.side, 1 - e.lastTouchSide);
      assert.deepEqual(m.frames[e.t].ball, e.at);
      const next = m.events.find((n) => n.t > e.t);
      if (next?.type === "restart") {
        assert.equal(next.side, e.side);
        assert.ok(next.t >= e.t + 15);
        assert.deepEqual(m.frames[e.t + 5].ball, e.at);
        assert.notEqual(m.events.find((n) => n.t > next.t)?.type, "offside");
      }
    }
  }
});
test("version 2 snapshots preserve recorded results and movement", () => {
  const s = snapshot();
  s.version = 2;
  assert.deepEqual(simulateMatch(s), v2(s));
});
test("whistle only follows new nearby events, not seeks or backwards playback", () => {
  const es = [
    { t: 0, type: "kickoff" },
    { t: 10, type: "foul" },
    { t: 11, type: "yellow" },
  ];
  assert.equal(audibleEvents(es, 9, 11).length, 1);
  assert.equal(audibleEvents(es, 0, 20).length, 0);
  assert.equal(audibleEvents(es, 11, 0).length, 0);
  assert.equal(audibleEvents(es, 10, 10).length, 0);
});
