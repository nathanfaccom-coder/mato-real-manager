import { test, expect } from "@playwright/test";
import { fixture } from "../fixtures/data.js";
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
const data = structuredClone(fixture);
for (const [s, teamId] of ["t1", "t2"].entries())
  for (let i = 0; i < 11; i++)
    data.players[`sim${s}-${i}`] = {
      id: `sim${s}-${i}`,
      name: `Atleta ${s}-${i}`,
      teamId,
      position: roles[i],
      overall: 70,
      energy: 100,
      pixelAppearance: {
        style: "afro",
        skin: "#805034",
        hair: "#171717",
        number: i + 1,
      },
    };
async function setup(page, user = null) {
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.addInitScript(
    ({ data, user }) => {
      window.__TEST_DATA__ = data;
      localStorage.clear();
      if (user) localStorage.setItem("user", JSON.stringify(user));
    },
    { data, user },
  );
  await page.goto("/app.html");
}
async function owner(page) {
  await setup(page);
  await page.getByRole("button", { name: "ADMIN", exact: true }).click();
  await page
    .getByLabel("E-mail do principal ou login do subADM")
    .fill("owner@example.test");
  await page.getByLabel("Senha administrativa").fill("test-owner-password");
  await page.getByRole("button", { name: "ENTRAR NO PAINEL" }).click();
  await page
    .getByRole("button", { name: "📺 MATO REAL TV — AMISTOSOS" })
    .click();
}
test("full broadcast renders, replays end and shares only isolated friendly data", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await owner(page);
  await page.getByLabel("Mandante", { exact: true }).selectOption("t1");
  await page.getByLabel("Visitante", { exact: true }).selectOption("t2");
  await page.getByRole("button", { name: "PRÉVIA LOCAL" }).click();
  await expect(
    page.getByLabel("Transmissão completa da partida em pixel art"),
  ).toBeVisible();
  await expect(page.getByTestId("on-field-count")).toContainText("11 × 11");
  await expect(page.getByTestId("on-field-count")).toContainText("Campo inteiro");
  await page.getByLabel("Velocidade do replay").selectOption("0.5");
  await page.getByRole("button", { name: "PAUSAR", exact: true }).click();
  await page.getByLabel("Momento da partida", { exact: true }).fill("1200");
  await expect(page.getByTestId("match-clock")).toHaveText("20:00");
  await page.screenshot({
    path: test.info().outputPath("pixel-match-mobile.png"),
    fullPage: true,
  });
  await page.getByLabel("Momento da partida", { exact: true }).fill("5400");
  await expect(
    page.getByText("Notas experimentais, sem efeito no overall.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.getByTestId("player-ratings").locator("strong[aria-label]")).toHaveCount(22);
  const ratingBoxes = await page.getByTestId("player-ratings").locator("strong[aria-label]").evaluateAll(nodes => nodes.map(n => ({left:n.getBoundingClientRect().left,right:n.getBoundingClientRect().right})));
  expect(ratingBoxes.every(b => b.left >= 0 && b.right <= 390)).toBe(true);
  expect(await page.evaluate(() => window.__FIREBASE_METRICS__.writes)).toEqual(
    [],
  );
  await page.getByText("Preparar amistoso", { exact: true }).click();
  await page.getByRole("button", { name: "TRANSMITIR AMISTOSO" }).click();
  await expect(
    page.getByRole("button", { name: "PAUSAR", exact: true }),
  ).toBeDisabled();
  const stored = await page.evaluate(
    () => Object.values(window.__MOCK_DB__.data.friendlyBroadcasts)[0],
  );
  expect(stored.durationMs).toBe(1800000);
  expect(stored.snapshot.home.lineup).toHaveLength(11);
  expect(stored.snapshot.away.lineup).toHaveLength(11);
  expect(JSON.stringify(stored)).not.toContain("password");
  expect(
    await page.evaluate(() =>
      window.__FIREBASE_METRICS__.writes.every((p) =>
        p.startsWith("friendlyBroadcasts/"),
      ),
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("club saves three kits and player saves personal appearance", async ({
  page,
}) => {
  await setup(page, { type: "USER", data: { id: "t1" } });
  await page.getByRole("button", { name: "UNIFORMES", exact: true }).click();
  await page.getByLabel("Camisa", { exact: true }).fill("#123456");
  await page.getByRole("button", { name: "FORA", exact: true }).click();
  await page.getByLabel("Camisa", { exact: true }).fill("#abcdef");
  await page.getByRole("button", { name: "GOLEIRO", exact: true }).click();
  await page.getByLabel("Camisa", { exact: true }).fill("#fedcba");
  await page.getByRole("button", { name: "SALVAR UNIFORMES" }).click();
  await expect(page.getByRole("status")).toContainText("três uniformes");
  const kits = await page.evaluate(() => window.__MOCK_DB__.data.teams.t1.kits);
  expect(kits.home.shirt).toBe("#123456");
  expect(kits.away.shirt).toBe("#abcdef");
  expect(kits.goalkeeper.shirt).toBe("#fedcba");
});
test("player editor uses club kit and persists appearance without changing attributes", async ({
  page,
}) => {
  await setup(page, { type: "PLAYER", data: { id: "p1" } });
  await page.getByRole("button", { name: "PERSONAGEM", exact: true }).click();
  await page.getByLabel("Cabelo", { exact: true }).selectOption("ponytail");
  await page.getByLabel("Barba", { exact: true }).selectOption("full");
  await page.getByRole("button", { name: "SALVAR APARÊNCIA" }).click();
  await expect(page.getByRole("status")).toContainText("Aparência salva");
  const p = await page.evaluate(() => window.__MOCK_DB__.data.players.p1);
  expect(p.pixelAppearance.style).toBe("ponytail");
  expect(p.pixelAppearance.beard).toBe("full");
  expect(p.overall).toBe(60);
  await page
    .getByRole("button", { name: "📺 MATO REAL TV — AMISTOSOS" })
    .click();
  await expect(
    page.getByRole("button", { name: "TRANSMITIR AMISTOSO" }),
  ).toHaveCount(0);
});
