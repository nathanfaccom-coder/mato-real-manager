import { test, expect } from "@playwright/test";
import { fixture } from "../fixtures/data.js";
function seed() {
  const data = structuredClone(fixture);
  data.nationalTeams = {};
  data.nationalMatches = {};
  data.nationalCompetitions = {};
  data.nationalWindows = {};
  for (const nation of ["BR", "MTR"]) {
    const ids = Array.from({ length: 11 }, (_, i) => `${nation}_${i}`);
    ids.forEach(
      (id, i) =>
        (data.players[id] = {
          name: `${nation} Atleta ${i}`,
          nationality: nation,
          nationalTeamId: nation,
          position: i === 0 ? "GOL" : "ATA",
          teamId: "t1",
          overall: 50,
          energy: 100,
          salary: 1500,
          contract: 3,
          balance: 100,
          stats: { goals: 8 },
          status: "NAO_A_VENDA",
        }),
    );
    data.nationalTeams[nation] = {
      squadIds: ids,
      lineup: ids,
      formation: "4-3-3 OFENSIVO",
    };
  }
  return data;
}
async function open(
  page,
  { type = null, id = null, screen = "HOME", data = seed() } = {},
) {
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.addInitScript(
    ({ data, type, id, screen }) => {
      window.__TEST_DATA__ = data;
      localStorage.clear();
      if (type)
        localStorage.setItem("user", JSON.stringify({ type, data: { id } }));
      localStorage.setItem("savedScreen", screen);
    },
    { data, type, id, screen },
  );
  await page.goto("/app.html");
}
async function admin(page) {
  page.on("dialog", (dialog) => dialog.accept("0102"));
  await open(page);
  await expect(page.locator(".version-badge")).toHaveText(
    "VERSÃO 2.5.2 — MATO REAL TV",
  );
  await page.getByRole("button", { name: "ADMIN", exact: true }).click();
  await page
    .getByLabel("E-mail do principal ou login do subADM")
    .fill("owner@example.test");
  await page.getByLabel("Senha administrativa").fill("test-owner-password");
  await page.getByRole("button", { name: "ENTRAR NO PAINEL" }).click();
  await page
    .getByRole("button", { name: "🌍 SELEÇÕES — GERENCIAR TÉCNICOS" })
    .click();
  await expect(page.getByText("Gestão ADM", { exact: true })).toBeVisible();
}
test("ADM appoints, replaces and removes coach while club job is preserved", async ({
  page,
}) => {
  await admin(page);
  await expect(
    page.getByLabel("Seleção", { exact: true }).locator("option"),
  ).toHaveCount(212);
  await page
    .getByLabel("Técnico da seleção", { exact: true })
    .selectOption("staff0");
  await page
    .getByRole("button", { name: "SALVAR TÉCNICO", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("Nomeação atualizada.");
  expect(
    await page.evaluate(
      () => window.__MOCK_DB__.data.users.staff0.nationalTeamId,
    ),
  ).toBe("MTR");
  expect(
    await page.evaluate(() => window.__MOCK_DB__.data.users.staff0.teamId),
  ).toBe("t1");
  await page.getByLabel("Seleção", { exact: true }).selectOption("BR");
  await page
    .getByLabel("Técnico da seleção", { exact: true })
    .selectOption("staff0");
  await page
    .getByRole("button", { name: "SALVAR TÉCNICO", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "já comanda outra seleção",
  );
  await page.getByLabel("Seleção", { exact: true }).selectOption("MTR");
  await page
    .getByRole("button", { name: "REMOVER TÉCNICO", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("Técnico removido.");
  expect(
    await page.evaluate(
      () => window.__MOCK_DB__.data.users.staff0.nationalTeamId,
    ),
  ).toBe(null);
});
test("coach can publish national squad and lineup without moving players from clubs", async ({
  page,
}) => {
  const data = seed();
  data.users.staff0.nationalTeamId = "BR";
  data.nationalTeams.BR.coachId = "staff0";
  await open(page, {
    type: "COACH",
    id: "staff0",
    screen: "NATIONAL_TEAMS",
    data,
  });
  await expect(
    page.getByRole("button", { name: "SALVAR ESCALAÇÃO", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Gestão ADM", { exact: true })).toHaveCount(0);
  await page
    .getByRole("button", { name: "PUBLICAR CONVOCAÇÃO (11/23)", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("Convocação publicada.");
  await page
    .getByRole("button", { name: "SALVAR ESCALAÇÃO", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("Escalação salva.");
  expect(
    await page.evaluate(() => window.__MOCK_DB__.data.players.BR_0.teamId),
  ).toBe("t1");
  await page.getByLabel("Seleção", { exact: true }).selectOption("MTR");
  await expect(
    page.getByRole("button", { name: "SALVAR ESCALAÇÃO", exact: true }),
  ).toHaveCount(0);
});
test("ADM schedules a friendly and records national match stats without changing club stats", async ({
  page,
}) => {
  await admin(page);
  await page
    .getByText("Organizar partidas e copas (ADM)", { exact: true })
    .click();
  await page
    .getByLabel("Data das seleções", { exact: true })
    .fill("2027-01-01");
  await page
    .getByRole("button", { name: "AGENDAR AMISTOSO", exact: true })
    .click();
  await expect(
    page.getByText("Amistoso agendado.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "LANÇAR SÚMULA", exact: true })
    .click();
  await page.getByLabel("Gols MTR", { exact: true }).fill("1");
  await page.getByLabel("MTR_1 goals", { exact: true }).fill("1");
  await page
    .getByRole("button", { name: "CONFIRMAR SÚMULA", exact: true })
    .click();
  await expect(
    page.getByText("Súmula registrada. Estatísticas da seleção atualizadas.", {
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => window.__MOCK_DB__.data.players.MTR_1.nationalStats,
    ),
  ).toEqual({ caps: 1, goals: 1, assists: 0 });
  expect(
    await page.evaluate(
      () => window.__MOCK_DB__.data.players.MTR_1.stats.goals,
    ),
  ).toBe(8);
  expect(
    await page.evaluate(() => window.__MOCK_DB__.data.players.MTR_1.energy),
  ).toBe(75);
  await expect(
    page.getByRole("button", { name: "LANÇAR SÚMULA", exact: true }),
  ).toHaveCount(0);
});
test("cup creation appears in competition selector and standings", async ({
  page,
}) => {
  await admin(page);
  await page
    .getByText("Organizar partidas e copas (ADM)", { exact: true })
    .click();
  await page
    .getByLabel("Data das seleções", { exact: true })
    .fill("2027-01-01");
  await page
    .getByRole("button", { name: "CRIAR COPA (2)", exact: true })
    .click();
  await expect(page.getByText("Copa criada.", { exact: true })).toBeVisible();
  await page
    .getByLabel("Competição de seleções", { exact: true })
    .selectOption({ label: "Copa das Seleções" });
  await expect(page.locator("table tbody tr")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "GERAR FINAL", exact: true }),
  ).toBeVisible();
});
test("players see nationality, callup and international history in their profile", async ({
  page,
}) => {
  const data = seed();
  data.players.p1.nationality = "BR";
  data.players.p1.nationalTeamId = "BR";
  data.players.p1.nationalStats = { caps: 3, goals: 2, assists: 1 };
  await open(page, { type: "PLAYER", id: "p1", screen: "PLAYER_DASH", data });
  await expect(page.locator(".national-career")).toContainText(
    "Convocado para Brasil",
  );
  await expect(page.locator(".national-career")).toContainText(
    "3 jogos • 2 gols • 1 assistências",
  );
});
test("new player registration offers all nationalities", async ({ page }) => {
  await open(page);
  await page.getByText("JOGADOR", { exact: true }).click();
  await expect(
    page.getByLabel("Nacionalidade", { exact: true }).locator("option"),
  ).toHaveCount(212);
  await page.getByLabel("Nacionalidade", { exact: true }).selectOption("BR");
  await expect(page.getByLabel("Nacionalidade", { exact: true })).toHaveValue(
    "BR",
  );
  await page.evaluate(() =>
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "lastRegistration",
        JSON.stringify(
          Object.values(window.__MOCK_DB__.data.players).find(
            (p) => p.name === "Atleta Nacional",
          ) || null,
        ),
      );
    }),
  );
  page.on("dialog", (d) => d.accept());
  await page
    .getByPlaceholder("Nome no Jogo (Ex: João Silva)")
    .fill("Atleta Nacional");
  await page.getByPlaceholder(/Instagram/).fill("@teste");
  await page.getByPlaceholder("Crie uma Senha de Acesso").fill("123456");
  await page
    .getByRole("button", { name: "ENVIAR INSCRIÇÃO", exact: true })
    .click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(sessionStorage.getItem("lastRegistration") || "null")
            ?.nationality,
      ),
    )
    .toBe("BR");
});
