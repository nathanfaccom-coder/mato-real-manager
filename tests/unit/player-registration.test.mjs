import test from "node:test";
import assert from "node:assert/strict";
import { memoryDB } from "../helpers/memory-db.mjs";
import {
  submitPlayerApplication,
  readPlayerApplication,
  decidePlayerApplication,
} from "../../server/player-registration.js";
import { OWNER_UID } from "../../src/admin/permissions.js";
const auth = {
  getUser: async () => ({
    email: "confirmed@example.test",
    emailVerified: true,
    disabled: false,
  }),
};
const input = {
  name: "Novo Atleta",
  nationality: "MTR",
  position: "ATA",
  instagram: "@athlete.test",
  expectedRevision: 0,
};
const options = { now: 1000, newId: () => "new-player" };
const decision = {
  uid: "u",
  approve: true,
  expectedRevision: 1,
  reason: "Cadastro conferido",
};
function fixture() {
  return memoryDB({
    "serverConfig/accountMigration": { enabled: true, schemaVersion: 1 },
    "serverConfig/playerRegistration": { enabled: true, schemaVersion: 1 },
  });
}

test("registration requires verified non-admin identity, both gates and no existing binding", async () => {
  for (const identity of [
    { emailVerified: false },
    { email: "x@y.test", emailVerified: true, disabled: true },
  ])
    await assert.rejects(
      submitPlayerApplication(
        fixture(),
        { getUser: async () => identity },
        "u",
        input,
        options,
      ),
    );
  for (const key of [
    "serverConfig/accountMigration",
    "serverConfig/playerRegistration",
  ]) {
    const db = fixture();
    db.values.delete(key);
    await assert.rejects(
      submitPlayerApplication(db, auth, "u", input, options),
    );
  }
  for (const path of ["adminProfiles/u", "authAccounts/u"]) {
    const db = fixture();
    db.values.set(path, { active: false });
    await assert.rejects(
      submitPlayerApplication(db, auth, "u", input, options),
    );
  }
  await assert.rejects(
    submitPlayerApplication(fixture(), auth, OWNER_UID, input, options),
  );
});
test("forged financial, progression, authority and invalid profile inputs are rejected without writes", async () => {
  for (const patch of [
    { balance: 999 },
    { attributes: { shot: 99 } },
    { pendingXP: 999 },
    { uid: "other" },
    { status: "ACTIVE" },
    { nationality: "__proto__" },
    { position: ["ATA"] },
    { instagram: "https://instagram.com/u" },
    { pixelAppearance: { owner: "other" } },
    { name: "x" },
    { expectedRevision: -1 },
  ]) {
    const db = fixture();
    await assert.rejects(
      submitPlayerApplication(db, auth, "u", { ...input, ...patch }, options),
    );
    assert.equal(db.values.size, 2);
  }
});
test("pending submission is private and idempotent; client reads only own application", async () => {
  const db = fixture();
  await Promise.all([
    submitPlayerApplication(db, auth, "u", input, options),
    submitPlayerApplication(db, auth, "u", input, options),
  ]);
  assert.equal(db.values.get("playerApplications/u").revision, 1);
  assert.equal(db.values.has("players/new-player"), false);
  assert.equal(db.values.has("authAccounts/u"), false);
  assert.equal(
    [...db.values.keys()].filter((p) => p.startsWith("playerApplicationAudit/"))
      .length,
    1,
  );
  assert.equal(
    (await readPlayerApplication(db, auth, "u", {})).application.profile
      .instagram,
    "athlete.test",
  );
  assert.equal(
    (await readPlayerApplication(db, auth, "other", {})).application,
    null,
  );
  await assert.rejects(readPlayerApplication(db, auth, "other", { uid: "u" }));
  await assert.rejects(
    readPlayerApplication(
      db,
      auth,
      "other",
      { uid: "u" },
      { administrator: true },
    ),
  );
});
test("approval atomically derives stats and economy, creates player and reserves verified identity", async () => {
  for (const position of ["ATA", "GOL"]) {
    const db = fixture();
    await submitPlayerApplication(
      db,
      auth,
      "u",
      { ...input, position },
      options,
    );
    const result = await decidePlayerApplication(
      db,
      auth,
      OWNER_UID,
      decision,
      { now: 2000 },
    );
    assert.equal(result.status, "APPROVED");
    const player = db.values.get("players/new-player");
    assert.equal(player.overall, position === "GOL" ? 60 : 45);
    assert.equal(player.balance, 0);
    assert.equal(player.pendingXP, 0);
    assert.equal(player.energy, 100);
    assert.equal(player.teamId, "FREE");
    assert.equal(player.status, "ACTIVE");
    assert.equal(player.instagram, undefined);
    assert.equal(player.password, undefined);
    assert.equal(player.email, undefined);
    assert.equal(player.uid, undefined);
    assert.ok(
      Object.values(player.attributes).every(
        (n) => Number.isInteger(n) && n >= 1 && n <= 99,
      ),
    );
    assert.equal(db.values.get("authAccounts/u").entityId, "new-player");
    assert.equal(
      db.values.get("accountEntityOwners/players_new-player").uid,
      "u",
    );
    assert.equal(
      db.values.get("accountBindingAudit/u_1").action,
      "APPROVE_APPLICATION",
    );
  }
});
test("concurrent approval and repeated decision create one profile and one binding audit", async () => {
  const db = fixture();
  await submitPlayerApplication(db, auth, "u", input, options);
  const results = await Promise.all([
    decidePlayerApplication(db, auth, OWNER_UID, decision),
    decidePlayerApplication(db, auth, OWNER_UID, decision),
  ]);
  assert.equal(results.filter((r) => r.duplicate).length, 1);
  assert.equal(
    [...db.values.keys()].filter((k) => k.startsWith("players/")).length,
    1,
  );
  assert.equal(
    [...db.values.keys()].filter((k) => k.startsWith("accountBindingAudit/"))
      .length,
    1,
  );
  await assert.rejects(
    decidePlayerApplication(db, auth, OWNER_UID, {
      ...decision,
      reason: "Outra decisão",
    }),
  );
});
test("rejection supports revision-checked corrected resubmission but cannot create or grant anything", async () => {
  const db = fixture();
  await submitPlayerApplication(db, auth, "u", input, options);
  await decidePlayerApplication(db, auth, OWNER_UID, {
    ...decision,
    approve: false,
  });
  assert.equal(db.values.has("players/new-player"), false);
  assert.equal(db.values.has("authAccounts/u"), false);
  await assert.rejects(
    submitPlayerApplication(
      db,
      auth,
      "u",
      { ...input, name: "Corrigido" },
      options,
    ),
  );
  const result = await submitPlayerApplication(
    db,
    auth,
    "u",
    { ...input, name: "Corrigido", expectedRevision: 2 },
    options,
  );
  assert.equal(result.revision, 3);
  await assert.rejects(decidePlayerApplication(db, auth, OWNER_UID, decision));
});
test("approval rejects changed ownership, disabled Auth and non-owner without partial writes", async () => {
  for (const conflict of [
    "players/new-player",
    "authAccounts/u",
    "accountEntityOwners/players_new-player",
    "adminProfiles/u",
  ]) {
    const db = fixture();
    await submitPlayerApplication(db, auth, "u", input, options);
    db.values.set(conflict, { test: true });
    const before = structuredClone([...db.values]);
    await assert.rejects(
      decidePlayerApplication(db, auth, OWNER_UID, decision),
    );
    assert.deepEqual([...db.values], before);
  }
  const db = fixture();
  await submitPlayerApplication(db, auth, "u", input, options);
  await assert.rejects(decidePlayerApplication(db, auth, "press", decision));
  await assert.rejects(
    decidePlayerApplication(
      db,
      { getUser: async () => ({ disabled: true }) },
      OWNER_UID,
      decision,
    ),
  );
  assert.equal(db.values.get("playerApplications/u").status, "PENDING");
});

test('retry comparison does not depend on Firestore map key order',async()=>{
 const db=fixture();await submitPlayerApplication(db,auth,'u',input,options);
 const row=db.values.get('playerApplications/u');
 row.profile=Object.fromEntries(Object.entries(row.profile).reverse());
 row.profile.pixelAppearance=Object.fromEntries(Object.entries(row.profile.pixelAppearance).reverse());
 assert.equal((await submitPlayerApplication(db,auth,'u',input,options)).duplicate,true);
 assert.equal(row.revision,1);
});
