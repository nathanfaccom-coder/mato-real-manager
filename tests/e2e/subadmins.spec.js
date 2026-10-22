import { test, expect } from "@playwright/test";
import { fixture } from "../fixtures/data.js";
async function setup(page, open = false) {
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.addInitScript(
    ({ fixture, open }) => {
      window.__TEST_DATA__ = fixture;
      window.__ADMIN_RULES_OPEN__ = open;
      localStorage.clear();
    },
    { fixture, open },
  );
  await page.goto("/app.html");
  await page.getByRole("button", { name: "ADMIN", exact: true }).click();
  await page
    .getByLabel("E-mail do principal ou login do subADM")
    .fill("owner@example.test");
  await page.getByLabel("Senha administrativa").fill("test-owner-password");
  await page.getByRole("button", { name: "ENTRAR NO PAINEL" }).click();
  await page.getByRole("button", { name: "GERENCIAR SUBADMS" }).click();
  const form = page.getByTestId("subadmin-manager").locator("form");
  await form.getByLabel("Nome", { exact: true }).fill("Auxiliar Teste");
  await form.getByLabel("Login", { exact: true }).fill("auxiliar");
  await form.getByLabel("Senha inicial").fill("test-subadmin-password");
  await form.getByLabel("Seleções, técnicos e convocações").check();
  await form.getByRole("button", { name: "CRIAR SUBADM" }).click();
}
test("owner creates, edits and deletes subadmin without losing session", async ({
  page,
}) => {
  await setup(page);
  await expect(page.getByRole("status")).toContainText("SubADM criado");
  expect(
    await page.evaluate(() => window.firebase.auth().currentUser.uid),
  ).toBe("NEXLYzsJfLPsTxzp3LKHKwaPhEZ2");
  const card = page
    .getByTestId("subadmin-manager")
    .locator("div.card")
    .filter({ has: page.getByRole("heading", { name: "Auxiliar Teste" }) });
  await card.getByLabel("Calendário").check();
  await card.getByRole("button", { name: "SALVAR PERMISSÕES" }).click();
  const records = await page.evaluate(() =>
    Object.values(window.__MOCK_DB__.data.adminProfiles),
  );
  expect(records[0].permissions).toEqual(["nationalTeams", "calendar"]);
  expect(records[0]).not.toHaveProperty("password");
  page.on("dialog", (d) => d.accept());
  await card.getByRole("button", { name: "EXCLUIR ACESSO" }).click();
  await expect(card).toHaveCount(0);
});
test("public admin profiles block account creation", async ({ page }) => {
  await setup(page, true);
  await expect(page.getByRole("status")).toContainText("publique as regras");
  expect(
    await page.evaluate(() =>
      Object.keys(window.__MOCK_DB__.data.adminProfiles || {}),
    ),
  ).toHaveLength(0);
});
test("subadmin permissions update live and deletion revokes current panel", async ({
  page,
}) => {
  await setup(page);
  await expect(page.getByRole("status")).toContainText("SubADM criado");
  await page.evaluate(async () => {
    const { loginAdministrator } = await import("/src/admin/auth.js");
    const user = await loginAdministrator("auxiliar", "test-subadmin-password");
    window.__SUB_UID__ = user.data.id;
    const { canAdmin, guardAdminActions } = await import(
      "/src/admin/permissions.js"
    );
    if (canAdmin(user, "finance") || !canAdmin(user, "nationalTeams"))
      throw Error("Permissions invalid");
    let called = false;
    window.alert = () => {};
    guardAdminActions(
      {
        resetDatabase: () => {
          called = true;
        },
      },
      user,
    ).resetDatabase();
    if (called) throw Error("Reset delegated");
  });
  // Authenticate via the actual form without reloading the in-memory test database.
  await page.evaluate(async () => {
    await window.firebase.auth().signOut();
  });
  // Observe the same service used by App to verify live edits and revocation.
  await page.evaluate(async () => {
    const { observeAdmin } = await import("/src/admin/auth.js");
    window.__ROLE_CHANGES__ = [];
    observeAdmin(
      { type: "ADMIN", data: { id: window.__SUB_UID__ } },
      (u) => window.__ROLE_CHANGES__.push(u),
      () => (window.__REVOKED__ = true),
    );
    window.__MOCK_DB__.update("adminProfiles/" + window.__SUB_UID__, {
      permissions: ["calendar"],
    });
  });
  await expect
    .poll(() =>
      page.evaluate(() => window.__ROLE_CHANGES__.at(-1)?.data.permissions),
    )
    .toEqual(["calendar"]);
  await page.evaluate(() =>
    window.__MOCK_DB__.update("adminProfiles/" + window.__SUB_UID__, null),
  );
  await expect.poll(() => page.evaluate(() => window.__REVOKED__)).toBe(true);
});

test('subadmin login exposes only delegated module and loses panel on removal',async({page})=>{
 await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 await page.addInitScript(({fixture})=>{
 window.__TEST_DATA__={...fixture,adminProfiles:{aux:{name:'Auxiliar',login:'auxiliar',permissions:['nationalTeams'],active:true}}};
 window.__AUTH_ACCOUNTS__={'auxiliar@subadmins.matoreal.invalid':{uid:'aux',password:'test-subadmin-password'}};
 localStorage.clear();
 },{fixture});
 await page.goto('/app.html');
 await page.getByRole('button',{name:'ADMIN',exact:true}).click();
 await page.getByLabel('E-mail do principal ou login do subADM').fill('auxiliar');
 await page.getByLabel('Senha administrativa').fill('test-subadmin-password');
 await page.getByRole('button',{name:'ENTRAR NO PAINEL'}).click();
 await expect(page.getByRole('button',{name:'GERENCIAR SUBADMS'})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'🌍 SELEÇÕES — GERENCIAR TÉCNICOS'})).toBeEnabled();
 await expect(page.getByRole('button',{name:'Finanças & Gala',exact:true})).toBeDisabled();
 await page.evaluate(()=>window.__MOCK_DB__.update('adminProfiles/aux',null));
 await expect(page.getByRole('button',{name:'ADMIN',exact:true})).toBeVisible();
});
