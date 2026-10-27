import test from "node:test";
import assert from "node:assert/strict";
import { createAccountAdminClient } from "../../src/admin/account-client.js";
import { OWNER_UID } from "../../src/admin/permissions.js";
function fixture({ uid = OWNER_UID, status = 200 } = {}) {
  const calls = [];
  const auth = {
    currentUser: {
      uid,
      getIdToken: async (force) => {
        calls.push(["token", force]);
        return "verified";
      },
    },
  };
  const fetchImpl = async (url, options) => {
    calls.push(["request", url, options]);
    return { status, ok: status === 200, json: async () => ({ ok: true }) };
  };
  return {
    auth,
    calls,
    fetchImpl,
    client: createAccountAdminClient({
      auth,
      endpoint: "https://example.test/api",
      fetchImpl,
    }),
  };
}
test("owner client sends fresh token and allowlisted payload, never client permissions", async () => {
  const f = fixture();
  await f.client.bind({
    uid: "target",
    type: "TEAM",
    entityId: "h",
    permissions: ["owner"],
    password: "secret",
  });
  assert.deepEqual(f.calls[0], ["token", true]);
  const [, url, options] = f.calls[1];
  assert.equal(url, "https://example.test/api/account-bind");
  assert.equal(options.headers.Authorization, "Bearer verified");
  assert.equal(options.redirect, "error");
  assert.deepEqual(JSON.parse(options.body), {
    uid: "target",
    type: "TEAM",
    entityId: "h",
  });
});
test("non-owner and account switch cannot issue owner requests", async () => {
  const f = fixture({ uid: "subadmin" });
  await assert.rejects(f.client.review({ uid: "u" }));
  assert.equal(f.calls.length, 0);
  const g = fixture();
  g.auth.currentUser.getIdToken = async () => {
    g.auth.currentUser = { uid: "other" };
    return "token";
  };
  await assert.rejects(g.client.review({ uid: "u" }));
  assert.equal(g.calls.length, 0);
});
test("stale owner auth asks reauthentication and server failure never returns success", async () => {
  await assert.rejects(
    fixture({ status: 401 }).client.review({ uid: "u" }),
    /senha de ADM/,
  );
  for (const status of [400, 403, 503])
    await assert.rejects(
      fixture({ status }).client.state({
        uid: "u",
        active: false,
        expectedRevision: 3,
        reason: "Revoked",
      }),
    );
});
test("revision and reason are preserved; switched identity discards late response", async () => {
  const f = fixture();
  await f.client.state({
    uid: "u",
    active: false,
    expectedRevision: 3,
    reason: "Revoked",
    revision: 99,
  });
  assert.deepEqual(JSON.parse(f.calls[1][2].body), {
    uid: "u",
    active: false,
    expectedRevision: 3,
    reason: "Revoked",
  });
  const g = fixture();
  const client = createAccountAdminClient({
    auth: g.auth,
    endpoint: "https://example.test",
    fetchImpl: async (...args) => {
      g.auth.currentUser = null;
      return g.fetchImpl(...args);
    },
  });
  await assert.rejects(client.review({ uid: "u" }));
});
