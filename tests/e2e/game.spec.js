import { test, expect } from "@playwright/test";
import { fixture } from "../fixtures/data.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const account = (type, id) => ({
  type,
  data: {
    id,
    ...fixture[
      {
        USER: "teams",
        PLAYER: "players",
        COMPANY: "companies",
        COACH: "users",
        DOCTOR: "users",
        SCOUT: "users",
        ASSISTANT: "users",
        PRESS: "newspapers",
        PRESS_WORKER: "journalists",
      }[type]
    ][id],
  },
});
async function prepare(page, user = null, screen = "HOME") {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).hostname === "127.0.0.1"
      ? route.continue()
      : route.abort(),
  );
  await page.addInitScript(
    ({ fixture, user, screen }) => {
      window.__TEST_DATA__ = fixture;
      localStorage.clear();
      if (user) localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("savedScreen", screen);
    },
    { fixture, user, screen },
  );
}
async function ready(page) {
  await expect(page.locator("#root")).not.toBeEmpty();
  await expect(page.getByText("Carregando...", { exact: true })).toHaveCount(0);
  await page.waitForTimeout(350);
}
const cases = [
  ["login", null, "HOME"],
  ["time", account("USER", "t1"), "HOME"],
  ["jogador", account("PLAYER", "p1"), "PLAYER_DASH"],
  ["empresa", account("COMPANY", "c1"), "COMPANY_DASH"],
  ["imprensa", account("PRESS", "paper1"), "PRESS_DASH"],
  ["jornalista", account("PRESS_WORKER", "j1"), "PRESS_DASH"],
  ["tecnico", account("COACH", "staff0"), "COACH_DASH"],
  ["medico", account("DOCTOR", "staff1"), "DOCTOR_DASH"],
  ["olheiro", account("SCOUT", "staff2"), "SCOUT_DASH"],
  ["auxiliar", account("ASSISTANT", "staff3"), "ASSISTANT_DASH"],
  ...[
    "MATCHES",
    "MARKET",
    "SHOPPING",
    "RANKING",
    "SOCIAL",
    "NEWS",
    "OFFERS",
    "PUBLIC_SERVICES",
    "SPONSORSHIPS",
  ].map((screen) => [screen, account("USER", "t1"), screen]),
];
for (const [name, user, screen] of cases)
  test(`visual and runtime: ${name}`, async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: "http://127.0.0.1:4174",
      viewport: { width: 390, height: 844 },
      locale: "pt-BR",
      timezoneId: "America/Sao_Paulo",
    });
    const old = await context.newPage();
    await prepare(old, user, screen);
    const oldErrors = [];
    old.on("pageerror", (e) => oldErrors.push(e.message));
    await old.goto("/tests/.baseline/index.html");
    await ready(old);
    await old
      .locator(".version-badge")
      .evaluateAll((nodes) =>
        nodes.forEach((n) => (n.textContent = "VERSÃO (comparação visual)")),
      );
    const before = PNG.sync.read(
      await old.screenshot({ animations: "disabled" }),
    );
    const page = await context.newPage();
    await prepare(page, user, screen);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/app.html");
    await ready(page);
    expect(errors).toEqual([]);
    await expect(
      page.getByText("Ocorreu um erro!", { exact: true }),
    ).toHaveCount(0);
    await page
      .locator(".version-badge")
      .evaluateAll((nodes) =>
        nodes.forEach((n) => (n.textContent = "VERSÃO (comparação visual)")),
      );
    await page.addStyleTag({
      content: ".pixel-feature, .national-career { display: none !important; }",
    });
    const after = PNG.sync.read(
      await page.screenshot({ animations: "disabled" }),
    );
    const diff = new PNG({ width: before.width, height: before.height });
    const changed = pixelmatch(
      before.data,
      after.data,
      diff.data,
      before.width,
      before.height,
      { threshold: 0.15 },
    );
    const ratio = changed / (before.width * before.height);
    if (ratio > 0.01) {
      await test.info().attach("before", {
        body: PNG.sync.write(before),
        contentType: "image/png",
      });
      await test.info().attach("after", {
        body: PNG.sync.write(after),
        contentType: "image/png",
      });
      await test.info().attach("diff", {
        body: PNG.sync.write(diff),
        contentType: "image/png",
      });
    }
    expect(oldErrors).toEqual([]);
    expect(ratio, `${name}: ${(ratio * 100).toFixed(2)}% changed`).toBeLessThan(
      0.01,
    );
    await context.close();
  });
test("login has 7 listeners and navigation adds and removes only relevant subscriptions", async ({
  page,
}) => {
  await prepare(page);
  await page.goto("/app.html");
  await ready(page);
  expect(
    await page.evaluate(() => window.__FIREBASE_METRICS__.active.length),
  ).toBe(7);
  await page.getByText("VISITANTE", { exact: false }).click();
  await ready(page);
  await page.locator(".nav-item").filter({ hasText: "SOCIAL" }).click();
  await ready(page);
  expect(
    await page.evaluate(() =>
      window.__FIREBASE_METRICS__.active.some((x) => x.includes("posts")),
    ),
  ).toBe(true);
  await page.locator(".nav-item").filter({ hasText: "RANK" }).click();
  await ready(page);
  expect(
    await page.evaluate(() =>
      window.__FIREBASE_METRICS__.active.some((x) => x.includes("posts")),
    ),
  ).toBe(false);
});
test("unrelated database updates do not remount the settings form", async ({
  page,
}) => {
  await prepare(page, account("USER", "t1"));
  await page.goto("/app.html");
  await ready(page);
  await page.locator(".fa-cog").dispatchEvent("click");
  await expect(
    page.getByText("Configurações do Time", { exact: true }),
  ).toBeVisible();
  const input = page.locator(".modal-overlay").locator("input").first();
  await input.fill("Nome em edição");
  await page.evaluate(() =>
    window.__MOCK_DB__.update("news/n2", {
      text: "Nova notícia",
      date: 2000,
      type: "normal",
    }),
  );
  await expect(input).toHaveValue("Nome em edição");
});
test("corrupt session does not crash the game", async ({ page }) => {
  await prepare(page);
  await page.addInitScript(() => localStorage.setItem("user", "{broken"));
  await page.goto("/app.html");
  await ready(page);
  await expect(page.locator(".login-wrapper")).toBeVisible();
});
test("shop purchase delivers item, charges once and keeps a minimal session", async ({
  page,
}) => {
  await prepare(page, account("PLAYER", "p1"), "SHOPPING");
  await page.goto("/app.html");
  await ready(page);
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByText("Loja Teste", { exact: true }).click();
  await page.getByText("Boné Teste", { exact: true }).click();
  await page
    .getByRole("button", { name: "🛒 COMPRAR AGORA", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => window.__MOCK_DB__.data.players.p1.balance))
    .toBe(9900);
  expect(
    await page.evaluate(() => window.__MOCK_DB__.data.products.item1.stock),
  ).toBe(1);
  expect(
    await page.evaluate(
      () => Object.values(window.__MOCK_DB__.data.sales).length,
    ),
  ).toBe(1);
  await expect
    .poll(() => page.evaluate(() => window.__MOCK_DB__.data.players.p1.fame))
    .toBe(200);
  const stored = await page.evaluate(() => localStorage.getItem("user"));
  expect(JSON.parse(stored)).toEqual({ type: "PLAYER", data: { id: "p1" } });
});
