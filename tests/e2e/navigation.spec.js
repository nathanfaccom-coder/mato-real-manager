import { test, expect } from "@playwright/test";
import { fixture } from "../fixtures/data.js";
async function setup(page, user = null, screen = "HOME") {
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.addInitScript(
    ({ fixture, user, screen }) => {
      window.__TEST_DATA__ = fixture;
      if (!sessionStorage.getItem("seeded")) {
        localStorage.clear();
        if (user) localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("savedScreen", screen);
        sessionStorage.setItem("seeded", "1");
      }
    },
    { fixture, user, screen },
  );
  await page.goto("/app.html");
}
test("ADM can leave selections; reload preserves destination after password entry", async ({
  page,
}) => {
  page.on("dialog", (d) => d.accept("0102"));
  await setup(page);
  const login = () =>
    page.getByRole("button", { name: "ADMIN", exact: true }).click();
  const open = () =>
    page
      .getByRole("button", { name: "🌍 SELEÇÕES — GERENCIAR TÉCNICOS" })
      .click();
  await login();
  await open();
  await page.getByRole("button", { name: "VOLTAR AO PAINEL ADM" }).click();
  await expect(
    page.getByRole("button", { name: "🌍 SELEÇÕES — GERENCIAR TÉCNICOS" }),
  ).toBeVisible();
  await open();
  await page.getByLabel("Seleção", { exact: true }).selectOption("BR");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "ADMIN", exact: true }),
  ).toBeVisible();
  await login();
  await expect(page.getByTestId("national-teams")).toBeVisible();
  await expect(page.getByLabel("Seleção", { exact: true })).toHaveValue("BR");
});
test("player reload keeps page and selection; explicit logout clears session", async ({
  page,
}) => {
  await setup(page, { type: "PLAYER", data: { id: "p1" } }, "PLAYER_DASH");
  await page
    .locator(".bottom-nav .nav-item")
    .filter({ hasText: "SELEÇÕES" })
    .click();
  await page.getByLabel("Seleção", { exact: true }).selectOption("AR");
  await page.reload();
  await expect(page.getByTestId("national-teams")).toBeVisible();
  await expect(page.getByLabel("Seleção", { exact: true })).toHaveValue("AR");
  await page.getByRole("button", { name: "VOLTAR AO MEU PAINEL" }).click();
  await expect(page.getByTestId("national-teams")).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".header")).toContainText("Jogador Teste");
  await expect(page.locator(".bottom-nav .nav-item.active")).toContainText(
    "INÍCIO",
  );
  page.on("dialog", (d) => d.accept());
  await page.locator(".fa-sign-out-alt").dispatchEvent("click");
  await expect(page.locator(".version-badge")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("user"))).toBeNull();
  await page.reload();
  await expect(page.locator(".version-badge")).toBeVisible();
});
test("invalid saved route falls back to player dashboard", async ({ page }) => {
  await setup(page, { type: "PLAYER", data: { id: "p1" } }, "ADMIN_TEAM");
  await expect(page.locator(".bottom-nav .nav-item.active")).toContainText(
    "INÍCIO",
  );
  await expect(page.locator(".header")).toContainText("Jogador Teste");
});
