import test from "node:test";
import assert from "node:assert/strict";
import {
  offsideAtPass,
  lanePressure,
  assignNumbers,
} from "../../src/simulation/rules.js";
import { makeSnapshot, simulateMatch } from "../../src/simulation/engine.js";
import { simulateMatch as legacy } from "../../src/simulation/engine-v1.js";
import { actorPresentation } from "../../src/simulation/presentation.js";
const home = { id: "h", name: "Home" },
  away = { id: "a", name: "Away" };
const players = ["h", "a"].flatMap((side) =>
  Array.from({ length: 22 }, (_, i) => ({
    id: side + i,
    teamId: side,
    name: side + i,
    position:
      i % 11 === 0
        ? "GOL"
        : ["LD", "ZAG", "ZAG", "LE", "VOL", "VOL", "MEI", "PTD", "PTE", "ATA"][
            (i - 1) % 11
          ] || "ATA",
    overall: 60,
    energy: 100,
  })),
);
test("offside uses second-last opponent, ball, halfway line and equality in both directions", () => {
  const defenders = [{ x: 95 }, { x: 70 }, { x: 60 }];
  assert.equal(offsideAtPass({ x: 75 }, [65, 30], defenders, 1).offside, true);
  assert.equal(offsideAtPass({ x: 70 }, [65, 30], defenders, 1).offside, false);
  assert.equal(offsideAtPass({ x: 75 }, [80, 30], defenders, 1).offside, false);
  assert.equal(
    offsideAtPass({ x: 45 }, [30, 30], [{ x: 40 }, { x: 35 }], 1).offside,
    false,
  );
  const mirrored = defenders.map((p) => ({ x: 100 - p.x }));
  assert.equal(offsideAtPass({ x: 25 }, [35, 30], mirrored, -1).offside, true);
  assert.equal(offsideAtPass({ x: 30 }, [35, 30], mirrored, -1).offside, false);
});
test("passing intelligence penalizes defenders blocking a passing lane", () => {
  assert.ok(
    lanePressure({ x: 10, y: 10 }, { x: 30, y: 10 }, [{ x: 20, y: 11 }]) >
      lanePressure({ x: 10, y: 10 }, { x: 30, y: 10 }, [{ x: 20, y: 30 }]),
  );
});
test("coach numbers override personal choices and reserve assigned numbers", () => {
  const ps = [
    { id: "one", pixelAppearance: { number: 20 } },
    { id: "two", pixelAppearance: { number: 20 } },
  ];
  const n = assignNumbers(ps, { two: 1 });
  assert.equal(n[1].pixelAppearance.number, 1);
  assert.equal(n[0].pixelAppearance.number, 2);
  assert.throws(() => assignNumbers(ps, { one: 8, two: 8 }), /repetidos/);
});
test("legacy snapshot keeps exactly the same replay", () => {
  const snap = makeSnapshot(home, away, players, 42);
  snap.version = 1;
  delete snap.home.bench;
  delete snap.away.bench;
  assert.deepEqual(simulateMatch(snap), legacy(snap));
});
test("reserves replace only their team and players never return after leaving", () => {
  const snap = makeSnapshot(home, away, players, 19),
    before = JSON.stringify(snap);
  const m = simulateMatch(snap);
  assert.equal(JSON.stringify(snap), before);
  assert.equal(m.frames[0].positions.filter((p) => p[2]).length, 22);
  assert.ok(m.events.some((e) => e.type === "substitution"));
  const subs = m.events.filter((e) => e.type === "substitution");
  for (const e of subs) {
    assert.equal(m.people[e.actor].side, m.people[e.incoming].side);
    assert.equal(m.frames[e.t].positions[e.actor][2], 0);
    assert.equal(m.frames[e.t].positions[e.incoming][2], 1);
    assert.ok(m.stats[e.incoming].seconds > 0);
  }
  for (const side of [0, 1])
    assert.ok(subs.filter((e) => e.side === side).length <= 5);
  for (const f of m.frames)
    for (const side of [0, 1])
      assert.ok(
        f.positions.filter((p, i) => p[2] && m.people[i].side === side)
          .length <= 11,
      );
  for (const e of m.events.filter((e) =>
    ["red", "injury", "substitution"].includes(e.type),
  ))
    assert.ok(m.frames.slice(e.t).every((f) => !f.positions[e.actor][2]));
  const again = simulateMatch(snap);
  assert.deepEqual(m.events, again.events);
  assert.deepEqual(m.frames, again.frames);
});
test("departure and entry visuals follow recorded events without changing match positions", () => {
  const m = {
    people: [{ side: 0 }, { side: 0 }],
    events: [
      { t: 100, type: "substitution", actor: 0, incoming: 1, at: [30, 20] },
    ],
  };
  const frame = {
    period: 0,
    positions: [
      [30, 20, 0],
      [30, 20, 1],
    ],
  };
  assert.equal(actorPresentation(m, frame, 0, 101).visible, true);
  assert.equal(actorPresentation(m, frame, 0, 125).visible, false);
  assert.ok(actorPresentation(m, frame, 1, 101).y > 20);
  assert.deepEqual(frame.positions, [
    [30, 20, 0],
    [30, 20, 1],
  ]);
});
