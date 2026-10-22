import test from "node:test";
import assert from "node:assert/strict";
import { OWNER_UID, requireAccess } from "../../server/admin/policy.js";
import { createAdminService } from "../../server/admin/service.js";
function fixture() {
  const accounts = new Map([
    [OWNER_UID, { uid: OWNER_UID, disabled: false }],
    ["player", { uid: "player" }],
  ]);
  let serial = 0;
  const auth = {
    async getUser(uid) {
      if (!accounts.has(uid))
        throw Object.assign(new Error(), { code: "auth/user-not-found" });
      return structuredClone(accounts.get(uid));
    },
    async createUser(data) {
      if ([...accounts.values()].some((u) => u.email === data.email))
        throw new Error("duplicate");
      const uid = `sub${++serial}`;
      accounts.set(uid, { uid, ...data });
      return this.getUser(uid);
    },
    async setCustomUserClaims(uid, claims) {
      accounts.get(uid).customClaims = structuredClone(claims);
    },
    async updateUser(uid, data) {
      Object.assign(accounts.get(uid), data);
    },
    async revokeRefreshTokens() {},
    async deleteUser(uid) {
      accounts.delete(uid);
    },
    async listUsers() {
      return { users: [...accounts.values()] };
    },
  };
  return { accounts, auth, service: createAdminService(auth) };
}
const input = {
  name: "Auxiliar",
  login: "auxiliar",
  password: "test-only-password",
  permissions: ["nationalTeams"],
};
test("only verified owner can create/list admins; unknown permissions and escalation fail", async () => {
  const { service } = fixture();
  for (const uid of [null, "player", "missing"]) {
    await assert.rejects(service.create(uid, input));
    await assert.rejects(service.list(uid));
  }
  await assert.rejects(
    service.create(OWNER_UID, { ...input, permissions: ["reset"] }),
  );
  const sub = await service.create(OWNER_UID, input);
  await assert.rejects(service.create(sub.uid, input));
  await assert.rejects(
    service.update(sub.uid, { uid: sub.uid, permissions: ["finance"] }),
  );
  assert.equal(JSON.stringify(sub).includes(input.password), false);
  assert.equal((await service.list(OWNER_UID)).accounts.length, 1);
});
test("changing permissions takes effect for existing sessions on next server action", async () => {
  const { service, auth } = fixture();
  const sub = await service.create(OWNER_UID, input);
  await requireAccess(auth, sub.uid, "nationalTeams");
  await assert.rejects(requireAccess(auth, sub.uid, "finance"));
  await service.update(OWNER_UID, { uid: sub.uid, permissions: ["finance"] });
  await assert.rejects(requireAccess(auth, sub.uid, "nationalTeams"));
  await requireAccess(auth, sub.uid, "finance");
});
test("deletion revokes an existing session and owner cannot be deleted", async () => {
  const { service, auth } = fixture();
  const sub = await service.create(OWNER_UID, input);
  await assert.rejects(service.remove(sub.uid, sub.uid));
  await assert.rejects(service.remove(OWNER_UID, OWNER_UID));
  await service.remove(OWNER_UID, sub.uid);
  await assert.rejects(requireAccess(auth, sub.uid, "nationalTeams"));
});
test("failed claim setup never leaves an enabled account", async () => {
  const { service, auth, accounts } = fixture();
  auth.setCustomUserClaims = async () => {
    throw new Error("unavailable");
  };
  auth.deleteUser = async () => {
    throw new Error("cleanup unavailable");
  };
  await assert.rejects(service.create(OWNER_UID, input));
  assert.equal(accounts.get("sub1").disabled, true);
});
test("failed deletion still disables access; unrelated players are untouched", async () => {
  const { service, auth, accounts } = fixture();
  await assert.rejects(service.remove(OWNER_UID, "player"));
  const sub = await service.create(OWNER_UID, input);
  auth.deleteUser = async () => {
    throw new Error("unavailable");
  };
  await assert.rejects(service.remove(OWNER_UID, sub.uid));
  await assert.rejects(requireAccess(auth, sub.uid, "nationalTeams"));
  assert.equal(accounts.has("player"), true);
});
