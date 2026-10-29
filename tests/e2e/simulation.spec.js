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
  await page.addInitScript(() => {
    window.__audio = { whistles: 0, crowd: 0 };
    const Native = window.AudioContext;
    window.AudioContext = class extends Native {
      createOscillator() {
        const n = super.createOscillator(),
          start = n.start.bind(n);
        n.start = (...args) => {
          window.__audio.whistles++;
          return start(...args);
        };
        return n;
      }
      createBufferSource() {
        const n = super.createBufferSource(),
          start = n.start.bind(n);
        n.start = (...args) => {
          window.__audio.crowd++;
          return start(...args);
        };
        return n;
      }
    };
  });
  await owner(page);
  await page.evaluate(() => {
    crypto.getRandomValues = (a) => {
      a.fill(1);
      return a;
    };
  });
  await page.getByLabel("Mandante", { exact: true }).selectOption("t1");
  await page.getByLabel("Visitante", { exact: true }).selectOption("t2");
  await page.getByRole("button", { name: "PRÉVIA LOCAL" }).click();
  await expect(
    page.getByLabel("Transmissão completa da partida em pixel art"),
  ).toBeVisible();
  await expect(page.getByTestId("on-field-count")).toContainText("11 × 11");
  await expect(
    page.getByRole("button", { name: "SOM: LIGADO", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect
    .poll(() => page.evaluate(() => window.__audio.whistles))
    .toBeGreaterThanOrEqual(2);
  expect(await page.evaluate(() => window.__audio.crowd)).toBe(1);
  const foulTime = await page.evaluate(async () => {
    const { makeSnapshot, simulateMatch } = await import(
      "/src/simulation/engine.js"
    );
    const d = window.__TEST_DATA__;
    return simulateMatch(
      makeSnapshot(
        { ...d.teams.t1, id: "t1" },
        { ...d.teams.t2, id: "t2" },
        Object.entries(d.players).map(([id, p]) => ({ ...p, id })),
        1,
      ),
    ).events.find((e) => e.type === "foul").t;
  });
  await page.getByRole("button", { name: "PAUSAR", exact: true }).click();
  await page
    .getByLabel("Momento da partida", { exact: true })
    .fill(String(foulTime - 1));
  const beforeFoul = await page.evaluate(() => window.__audio.whistles);
  await page.getByRole("button", { name: "CONTINUAR", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.__audio.whistles))
    .toBeGreaterThan(beforeFoul);

  await page.getByRole("button", { name: "SOM: LIGADO", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "ATIVAR SOM", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByTestId("on-field-count")).toContainText(
    "Campo inteiro",
  );
  await page.getByLabel("Velocidade do replay").selectOption("0.5");
  await page.getByRole("button", { name: "PAUSAR", exact: true }).click();
  await page.getByLabel("Momento da partida", { exact: true }).fill("1200");
  await expect(page.getByTestId("match-clock")).toHaveText("20:00");
  await page.getByRole("button", { name: "ESTATÍSTICAS AO VIVO" }).click();
  await expect(page.getByTestId("live-statistics")).toBeVisible();
  await expect(page.getByTestId("match-clock-stats")).toHaveText("20:00");
  await expect(page.getByTestId("broadcast-score-stats")).toHaveText(
    await page.getByTestId("broadcast-score").innerText(),
  );
  await expect(page.getByTestId("corner-count")).toBeVisible();
  await page.getByRole("button", { name: "JOGO AO VIVO" }).click();
  await expect(page.getByTestId("live-statistics")).toHaveCount(0);
  await expect(page.getByTestId("on-field-count")).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath("pixel-match-mobile.png"),
    fullPage: true,
  });
  await page.getByLabel("Momento da partida", { exact: true }).fill("5400");
  await expect(
    page.getByTestId("player-ratings").getByText("Notas de 0 a 10, referentes apenas a este amistoso.", {
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page
      .getByTestId("player-ratings")
      .locator("strong[aria-label]")
      .count(),
  ).toBeGreaterThanOrEqual(22);
  const ratingBoxes = await page
    .getByTestId("player-ratings")
    .locator("strong[aria-label]")
    .evaluateAll((nodes) =>
      nodes.map((n) => ({
        left: n.getBoundingClientRect().left,
        right: n.getBoundingClientRect().right,
      })),
    );
  expect(ratingBoxes.every((b) => b.left >= 0 && b.right <= 390)).toBe(true);
  expect(await page.evaluate(() => window.__FIREBASE_METRICS__.writes)).toEqual(
    [],
  );
  const corner = page.getByRole("button", { name: /REVER ESCANTEIO/ }).first();
  await expect(corner).toBeVisible();
  await corner.click();
  await expect(page.getByTestId("corner-banner")).toContainText("ESCANTEIO");
  await page.screenshot({
    path: test.info().outputPath("corner-mobile.png"),
    fullPage: true,
  });
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
  await expect(page.getByLabel("Número preferido")).toHaveCount(0);
  await page.screenshot({
    path: test.info().outputPath("editor-mobile.png"),
    fullPage: true,
  });
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

test("coach assigns unique shirt numbers and player cannot edit number", async ({
  page,
}) => {
  await setup(page, { type: "COACH", data: { id: "staff0" } });
  await page
    .getByRole("button", { name: "NÚMEROS DAS CAMISAS", exact: true })
    .click();
  const form = page.getByTestId("coach-numbers");
  await form.getByLabel("Número de Jogador Teste", { exact: true }).fill("88");
  await form.getByRole("button", { name: "SALVAR NUMERAÇÃO" }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Numeração salva pelo técnico.",
  );
  expect(
    await page.evaluate(() => window.__MOCK_DB__.data.teams.t1.shirtNumbers.p1),
  ).toBe(88);
  const inputs = form.locator("input");
  await inputs.nth(1).fill("88");
  await form.getByRole("button", { name: "SALVAR NUMERAÇÃO" }).click();
  await expect(form.getByRole("status")).toContainText("sem repetição");
});

test("bottom navigation standardizes selections and opens watch-only replays", async ({
  page,
}) => {
  await setup(page, { type: "PLAYER", data: { id: "p1" } });
  const selections = page
    .locator(".bottom-nav .nav-item")
    .filter({ hasText: "SELEÇÕES" });
  await expect(selections.locator("i")).toHaveClass(/fa-globe-americas/);
  await page.evaluate(async () => {
    const { makeSnapshot } = await import("/src/simulation/engine.js");
    const d = window.__TEST_DATA__;
    window.__MOCK_DB__.data.friendlyBroadcasts = {
      replay: {
        snapshot: makeSnapshot(
          { ...d.teams.t1, id: "t1" },
          { ...d.teams.t2, id: "t2" },
          Object.entries(d.players).map(([id, p]) => ({ ...p, id })),
          1,
        ),
        startedAt: Date.now() - 1800001,
        durationMs: 1800000,
      },
    };
  });
  await page
    .getByRole("button", { name: "Assistir jogos", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Assistir jogos", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "PRÉVIA LOCAL", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: /Clube Teste × Clube Rival.*REVER PARTIDA/ })
    .click();
  await expect(
    page.getByLabel("Transmissão completa da partida em pixel art"),
  ).toBeVisible();
  await expect(page.locator(".bottom-nav .nav-item.active")).toContainText(
    "ASSISTIR",
  );
  await page.screenshot({
    path: test.info().outputPath("watch-mobile.png"),
    fullPage: true,
  });
});
