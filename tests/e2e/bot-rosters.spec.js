import { test, expect } from "@playwright/test";
import { fixture } from "../fixtures/data.js";
test("ADM fills a squad, preserves humans, avoids duplicates and bots cannot log in", async ({
  page,
}) => {
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.addInitScript((data) => {
    window.__TEST_DATA__ = data;
    localStorage.clear();
  }, fixture);
  await page.goto("/app.html");
  await page.getByRole("button", { name: "ADMIN", exact: true }).click();
  await page
    .getByLabel("E-mail do principal ou login do subADM")
    .fill("owner@example.test");
  await page.getByLabel("Senha administrativa").fill("test-owner-password");
  await page.getByRole("button", { name: "ENTRAR NO PAINEL" }).click();
  await page
    .getByRole("button", { name: "Times / Elenco", exact: true })
    .click();
  const before = await page.evaluate(() =>
    structuredClone(window.__MOCK_DB__.data.players),
  );
  await page.getByLabel("Time para preencher").selectOption("t1");
  page.on("dialog", (d) => d.accept());
  await page
    .getByRole("button", { name: "🤖 PREENCHER COM BOTS", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "bots criados. 1 time(s)",
  );
  const after = await page.evaluate(() =>
    structuredClone(window.__MOCK_DB__.data.players),
  );
  for (const [id, p] of Object.entries(before)) expect(after[id]).toEqual(p);
  const roster = Object.values(after).filter((p) => p.teamId === "t1");
  expect(roster).toHaveLength(22);
  expect(roster.some((p) => p.isBot && p.position === "GOL")).toBeTruthy();
  await expect(
    page.getByRole("button", { name: "🤖 PREENCHER COM BOTS", exact: true }),
  ).toBeDisabled();
  const again = await page.evaluate(async () => {
    const { fillTeamWithBots } = await import("/src/admin/botRosters.js");
    return fillTeamWithBots(
      window.firebase.firestore(),
      { type: "ADMIN", data: { id: "NEXLYzsJfLPsTxzp3LKHKwaPhEZ2" } },
      "t1",
    );
  });
  expect(again).toBe(0);
  // Two ADMs filling the same club must serialize and re-read the roster.
  const simultaneous = await page.evaluate(async () => {
    const { fillTeamWithBots } = await import("/src/admin/botRosters.js");
    const user = {
      type: "ADMIN",
      data: { id: "NEXLYzsJfLPsTxzp3LKHKwaPhEZ2" },
    };
    const results = await Promise.all([
      fillTeamWithBots(window.firebase.firestore(), user, "t2"),
      fillTeamWithBots(window.firebase.firestore(), user, "t2"),
    ]);
    return {
      results,
      count: Object.values(window.__MOCK_DB__.data.players).filter(
        (p) => p.teamId === "t2",
      ).length,
    };
  });
  expect(simultaneous.count).toBe(22);
  expect(simultaneous.results).toContain(0);
  const bot = Object.entries(after).find(([, p]) => p.isBot);
  expect(bot[1]).not.toHaveProperty("password");
  const signedIn = await page.evaluate(async ([id, bot]) => {
    const { createAccountsActions } = await import("/src/actions/accounts.js");
    let signedIn = false;
    const noop = () => {};
    const account = createAccountsActions(
      {
        setLoading: noop,
        teams: [],
        players: [{ ...bot, id, password: "test" }],
        companies: [],
        coaches: [],
        papers: [],
        journalists: [],
        setUser: () => {
          signedIn = true;
        },
        setScreen: noop,
      },
      {},
    );
    await account.login(id, "test", "PLAYER");
    await account.login(bot.name, "test", "AUTO");
    return signedIn;
  }, bot);
  expect(signedIn).toBe(false);
});
