import test from "node:test";
import assert from "node:assert/strict";
import {
  planBotRoster,
  makeBot,
  fillTeamWithBots,
} from "../../src/admin/botRosters.js";

test("empty squad gets balanced starters and reserves", () => {
  const roles = planBotRoster("a", []);
  assert.equal(roles.length, 22);
  assert.equal(roles.filter((p) => p === "GOL").length, 2);
  for (const role of ["LD", "LE", "ZAG", "VOL", "MEI", "PTD", "PTE", "ATA"])
    assert.ok(roles.includes(role));
});
test("fill respects existing humans, bots, other teams and full squads", () => {
  const players = [
    { teamId: "a", position: "GOL" },
    { teamId: "a", position: "GOL", isBot: true },
    { teamId: "b", position: "ATA" },
  ];
  const before = structuredClone(players);
  assert.equal(planBotRoster("a", players).length, 20);
  assert.ok(!planBotRoster("a", players).includes("GOL"));
  assert.deepEqual(players, before);
  assert.deepEqual(
    planBotRoster(
      "a",
      Array.from({ length: 24 }, () => ({ teamId: "a", position: "ATA" })),
    ),
    [],
  );
});
test("bots have playable attributes and appearance, no credentials and modest salary", () => {
  const bot = makeBot("a", "GOL", 1, () => 0.5);
  assert.equal(bot.isBot, true);
  assert.equal(bot.teamId, "a");
  assert.equal(bot.overall, 45);
  assert.equal(bot.salary, 500);
  assert.equal(bot.energy, 100);
  assert.equal(bot.pixelAppearance.number, 1);
  assert.ok(bot.name.endsWith("[BOT]"));
  assert.ok(Object.values(bot.attributes).every((x) => x >= 1 && x <= 99));
  assert.ok(!Object.hasOwn(bot, "password"));
});
test("unauthorized fill is rejected before database access", async () => {
  for (const user of [
    null,
    { type: "PLAYER" },
    { type: "ADMIN", data: { id: "sub", permissions: ["finance"] } },
  ]) {
    await assert.rejects(fillTeamWithBots({}, user, "a"), /permissão/);
  }
});
