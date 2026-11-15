import test from "node:test";
import assert from "node:assert/strict";
import { createIdentityAccess,recoverCurrentIdentityPassword } from "../../src/services/identity-access.js";
function fixture({
  verified = false,
  sendError = null,
  resetError = null,
  signInError = null,
  signOutError = null,
} = {}) {
  const calls = [];
  const user = {
    uid: "new-identity",
    getIdToken:async force=>{calls.push(["token",force]);return "id-token";},
    emailVerified: verified,
    reload: async () => calls.push(["reload"]),
    sendEmailVerification: async () => {
      calls.push(["verify"]);
      if (sendError) throw sendError;
    },
  };
  const auth = {
    setPersistence: async (value) => calls.push(["persistence", value]),
    createUserWithEmailAndPassword: async (...args) => {
      calls.push(["create", ...args]);
      return { user };
    },
    signInWithEmailAndPassword: async (...args) => {
      calls.push(["signin", ...args]);
      if (signInError) throw signInError;
      return { user };
    },
    sendPasswordResetEmail: async (email) => {
      calls.push(["reset", email]);
      if (resetError) throw resetError;
    },
    signOut: async () => {
      calls.push(["signout"]);
      if (signOutError) throw signOutError;
    },
  };
  const app = {
    auth: () => auth,
    delete: async () => calls.push(["deleteApp"]),
  };
  const service = createIdentityAccess({
    createApp: async () => {
      calls.push(["isolatedApp"]);
      return app;
    },
  });
  return { calls, auth, service };
}
test("registration uses isolated nonpersistent Auth, sends verification and never claims a game profile", async () => {
  const f = fixture();
  assert.deepEqual(
    await f.service.register(" user@example.test ", "strong-password"),
    { uid: "new-identity", verified: false, emailSent: true },
  );
  assert.deepEqual(f.calls, [
    ["isolatedApp"],
    ["persistence", "none"],
    ["create", "user@example.test", "strong-password"],
    ["verify"],
    ["signout"],
    ["deleteApp"],
  ]);
  assert.equal(f.auth.languageCode, "pt-BR");
});
test("failed verification email keeps identity recoverable rather than deleting it", async () => {
  const f = fixture({ sendError: Error("network") });
  assert.deepEqual(
    await f.service.register("user@example.test", "strong-password"),
    { uid: "new-identity", verified: false, emailSent: false },
  );
  assert.deepEqual(f.calls.slice(-2), [["signout"], ["deleteApp"]]);
});
test("resend authenticates and reloads verification status; verified address does not send again", async () => {
  for (const verified of [false, true]) {
    const f = fixture({ verified });
    assert.deepEqual(await f.service.verify("user@example.test", "secret"), {
      uid: "new-identity",
      verified,
      emailSent: !verified,
    });
    assert.equal(
      f.calls.some((c) => c[0] === "reload"),
      true,
    );
    assert.equal(
      f.calls.some((c) => c[0] === "verify"),
      !verified,
    );
  }
});
test("recovery response does not reveal whether email exists, but network failure remains an error", async () => {
  const a = fixture(),
    b = fixture({ resetError: { code: "auth/user-not-found" } }),
    c = fixture({ resetError: { code: "auth/network-request-failed" } });
  assert.equal(
    await a.service.recover("user@example.test"),
    await b.service.recover("user@example.test"),
  );
  await assert.rejects(c.service.recover("user@example.test"));
  assert.deepEqual(c.calls.slice(-2), [["signout"], ["deleteApp"]]);
});
test("bad credentials and failed signout still dispose isolated app", async () => {
  for (const options of [
    { signInError: Error("wrong password") },
    { signOutError: Error("signout failed") },
  ]) {
    const f = fixture(options);
    await assert.rejects(f.service.verify("user@example.test", "secret"));
    assert.deepEqual(f.calls.at(-1), ["deleteApp"]);
  }
});
test("invalid registration input causes no Auth side effects", async () => {
  const f = fixture();
  for (const [email, password] of [
    ["bad", "strong-password"],
    ["a@b.test", "short"],
    ["a@b.test", "x".repeat(129)],
  ])
    await assert.rejects(f.service.register(email, password));
  assert.equal(f.calls.length, 0);
});

test('profile password recovery uses current Auth email only and never a selected game profile',async()=>{
 const calls=[];const auth={currentUser:{uid:'verified',email:'owner@example.test'}};
 assert.equal(await recoverCurrentIdentityPassword(auth,async email=>{calls.push(email);return 'sent';}), 'sent');
 assert.deepEqual(calls,['owner@example.test']);
});
test('signed-out or email-less profile cannot request current-account recovery',()=>{
 let calls=0;
 for(const currentUser of [null,{uid:'u'}])assert.throws(()=>recoverCurrentIdentityPassword({currentUser},()=>calls++));
 assert.equal(calls,0);
});

test('application authentication passes only a fresh token to the operation and cleans up',async()=>{
 const f=fixture({verified:true});let received;
 const result=await f.service.withVerifiedIdentity('user@example.test','secret',async token=>{received=token;return {status:'PENDING'};});
 assert.equal(received,'id-token');assert.equal(result.status,'PENDING');assert.ok(f.calls.some(c=>c[0]==='token'&&c[1]===true));assert.deepEqual(f.calls.slice(-2),[['signout'],['deleteApp']]);
});
test('unverified identity cannot invoke registration operation',async()=>{
 const f=fixture();let called=false;await assert.rejects(f.service.withVerifiedIdentity('user@example.test','secret',async()=>{called=true;}));
 assert.equal(called,false);assert.deepEqual(f.calls.slice(-2),[['signout'],['deleteApp']]);
});
