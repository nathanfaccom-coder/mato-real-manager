import test from "node:test";
import assert from "node:assert/strict";
import {
  createTrustedSession,
  SessionRejected,
} from "../../src/services/trusted-session.js";

function fixture({
  status = 200,
  result = { type: "USER", entityId: "h", revision: 1 },
} = {}) {
  const calls = [];
  const identity = {
    uid: "verified-uid",
    getIdToken: async () => "verified-token",
  };
  const auth = {
    currentUser: identity,
    setPersistence: async (mode) => calls.push(["persistence", mode]),
    signInWithEmailAndPassword: async (email, password) => {
      calls.push(["login", email, password]);
      return { user: identity };
    },
    signOut: async () => {
      calls.push(["signOut"]);
      auth.currentUser = null;
    },
  };
  const db = {
    collection: (name) => ({
      doc: (id) => ({
        get: async (options) => {
          calls.push(["profile", name, id, options]);
          return {
            exists: true,
            data: () => ({
              name: "Club",
              status: "ACTIVE",
              password: "legacy-secret",
            }),
          };
        },
      }),
    }),
  };
  const fetchImpl = async (url, options) => {
    calls.push(["fetch", url, options]);
    return { status, ok: status === 200, json: async () => result };
  };
  return {
    calls,
    auth,
    identity,
    db,
    client: createTrustedSession({
      auth,
      db,
      endpoint: "https://example.test/api",
      fetchImpl,
    }),
    fetchImpl,
  };
}

test("trusted login sends credentials only to Auth and server resolves own profile with no legacy password", async () => {
  const f = fixture();
  const user = await f.client.login(" user@example.test ", "new-secret");
  assert.deepEqual(user, {
    type: "USER",
    data: { id: "h", name: "Club", status: "ACTIVE" },
  });
  assert.deepEqual(f.calls[0], ["persistence", "session"]);
  assert.deepEqual(f.calls[1], ["login", "user@example.test", "new-secret"]);
  const [, url, options] = f.calls.find((c) => c[0] === "fetch");
  assert.equal(url, "https://example.test/api/session");
  assert.equal(options.body, "{}");
  assert.equal(options.headers.Authorization, "Bearer verified-token");
  assert.equal(options.redirect, "error");
  assert.equal(JSON.stringify(options).includes("new-secret"), false);
  assert.deepEqual(f.calls.at(-1), [
    "profile",
    "teams",
    "h",
    { source: "server" },
  ]);
});
test("no Firebase identity means no network/profile read regardless of browser hints", async () => {
  const f = fixture();
  assert.equal(await f.client.resolve(null), null);
  assert.equal(f.calls.length, 0);
});
test("denied/revoked binding never reads legacy profile and failed login signs out", async () => {
  for (const status of [400, 401, 403]) {
    const f = fixture({ status });
    await assert.rejects(
      f.client.login("user@example.test", "secret"),
      SessionRejected,
    );
    assert.equal(
      f.calls.some((c) => c[0] === "profile"),
      false,
    );
    assert.equal(f.auth.currentUser, null);
  }
});
test("offline or disabled backend never falls back to legacy credentials", async () => {
  const f = fixture({ status: 503 });
  await assert.rejects(f.client.login("u", "p"));
  assert.equal(
    f.calls.some((c) => c[0] === "profile"),
    false,
  );
  assert.equal(f.auth.currentUser, null);
});
test("invalid server role, path or revision never selects a document", async () => {
  for (const result of [
    { type: "ADMIN", entityId: "h", revision: 1 },
    { type: "__proto__", entityId: "h", revision: 1 },
    { type: "USER", entityId: "other/path", revision: 1 },
    { type: "USER", entityId: "h", revision: 0 },
  ]) {
    const f = fixture({ result });
    await assert.rejects(f.client.resolve(f.identity), SessionRejected);
    assert.equal(
      f.calls.some((c) => c[0] === "profile"),
      false,
    );
  }
});
test("logout/account switch while server responds cannot restore old identity", async () => {
  const f = fixture();
  const client = createTrustedSession({
    auth: f.auth,
    db: f.db,
    endpoint: "https://example.test/api",
    fetchImpl: async (...args) => {
      f.auth.currentUser = { uid: "other" };
      return f.fetchImpl(...args);
    },
  });
  await assert.rejects(client.resolve(f.identity), SessionRejected);
});
