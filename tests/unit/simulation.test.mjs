import test from "node:test";
import assert from "node:assert/strict";
import {
  makeSnapshot,
  simulateMatch,
  selectTeam,
  frameAt,
} from "../../src/simulation/engine.js";
import { appearance } from "../../src/simulation/appearance.js";
import { matchKits } from "../../src/simulation/kits.js";
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
const players = [0, 1].flatMap((s) =>
  roles.map((position, i) => ({
    id: `${s}-${i}`,
    teamId: String(s),
    position,
    overall: 60,
    name: `P${s}${i}`,
    password: "must-not-be-exported",
    pixelAppearance: { style: "afro", number: 10 },
  })),
);
const home = { id: "0", name: "Home" },
  away = { id: "1", name: "Away" };
test("complete match is deterministic, immutable and all statistics follow its events", () => {
  const snapshot = makeSnapshot(home, away, players, 143);
  const before = JSON.stringify(snapshot);
  const a = simulateMatch(snapshot),
    b = simulateMatch(snapshot);
  assert.deepEqual(a.events, b.events);
  assert.deepEqual(a.frames, b.frames);
  assert.equal(JSON.stringify(snapshot), before);
  const expectedDuration = 5400 + snapshot.addedTime.reduce((sum, minutes) => sum + minutes * 60, 0);
  assert.equal(a.durationSeconds, expectedDuration);
  assert.equal(a.frames.length, expectedDuration + 1);
  assert.equal(a.frames[0].t, 0);
  assert.equal(a.frames.at(-1).t, expectedDuration);
  for (const side of [0, 1])
    assert.equal(
      a.score[side],
      a.events.filter((e) => e.type === "goal" && e.side === side).length,
    );
  for (let i = 0; i < 22; i++) {
    assert.equal(
      a.stats[i].goals,
      a.events.filter((e) => e.type === "goal" && e.actor === i).length,
    );
    assert.ok(a.stats[i].completed <= a.stats[i].passes);
  }
  for (const f of a.frames) {
    assert.equal(f.positions.length, 22);
    for (const [x, y] of f.positions) {
      assert.ok(Number.isFinite(x) && x >= 0 && x <= 100);
      assert.ok(Number.isFinite(y) && y >= 0 && y <= 64);
    }
  }
  assert.deepEqual(frameAt(a, 9999).a, a.frames.at(-1));
});
test("saved match excludes credentials and freezes appearances, kits and unique numbers", () => {
  const p = structuredClone(players),
    snapshot = makeSnapshot(home, away, p, 1);
  assert.ok(!JSON.stringify(snapshot).includes("must-not-be-exported"));
  assert.equal(
    new Set(snapshot.home.lineup.map((p) => p.pixelAppearance.number)).size,
    11,
  );
  p[0].pixelAppearance.style = "bald";
  assert.equal(snapshot.home.lineup[0].pixelAppearance.style, "afro");
  assert.equal(snapshot.kits.home.shirt, "#16ac78");
});
test("lineup rejects duplicate teams, insufficient players and injured goalkeeper", () => {
  assert.throws(() => makeSnapshot(home, home, players, 1));
  assert.throws(() => selectTeam(home, []));
  const p = structuredClone(players);
  p[0].recoveryLeft = 2;
  assert.throws(() => selectTeam(home, p));
  assert.throws(() => selectTeam(home, players, Array(11).fill("0-0")));
});
test("appearance is bounded and kit collision changes only match copy", () => {
  assert.equal(
    appearance({ number: Infinity, skin: "url(bad)" }).skin,
    "#f5d0ac",
  );
  const team = {
    kits: {
      home: { shirt: "#ffffff" },
      away: { shirt: "#ffffff" },
      goalkeeper: { shirt: "#ffffff" },
    },
  };
  const before = JSON.stringify(team);
  const k = matchKits(team, team);
  assert.notEqual(k.home.shirt, k.away.shirt);
  assert.notEqual(k.homeGK.shirt, k.home.shirt);
  assert.notEqual(k.awayGK.shirt, k.homeGK.shirt);
  assert.equal(JSON.stringify(team), before);
});
