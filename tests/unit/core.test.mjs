import test from "node:test";
import assert from "node:assert/strict";
import {
  subscriptionPlan,
  snapshotRows,
} from "../../src/services/subscriptions.js";
import {
  readSession,
  saveSession,
  clearSession,
} from "../../src/services/session.js";
import { purchaseProduct } from "../../src/services/purchases.js";
const storage = () => {
  const data = new Map();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  };
};
test("legacy session migrates without persisting passwords or trusting admin role", () => {
  const s = storage();
  s.setItem(
    "user",
    JSON.stringify({
      type: "PLAYER",
      data: { id: "p", password: "secret", balance: 100 },
    }),
  );
  assert.deepEqual(readSession(s), { type: "PLAYER", data: { id: "p" } });
  saveSession({ type: "PLAYER", data: { id: "p", password: "secret" } }, s);
  assert.ok(!s.getItem("user").includes("secret"));
  s.setItem("user", "{broken");
  assert.equal(readSession(s), null);
  s.setItem("user", JSON.stringify({ type: "ADMIN", data: { id: "admin" } }));
  assert.equal(readSession(s), null);
  s.setItem("another-app", "keep");
  clearSession(s);
  assert.equal(s.getItem("another-app"), "keep");
});
test("storage failures do not break login", () => {
  const s = {
    getItem() {
      throw Error();
    },
    setItem() {
      throw Error();
    },
    removeItem() {
      throw Error();
    },
  };
  assert.equal(readSession(s), null);
  assert.doesNotThrow(() =>
    saveSession({ type: "PLAYER", data: { id: "p" } }, s),
  );
});
test("login does not subscribe to unrelated game systems", () => {
  assert.equal(Object.values(subscriptionPlan()).filter(Boolean).length, 0);
});
test("needed systems activate per role and screen", () => {
  assert.equal(subscriptionPlan("USER", "HOME").products, false);
  assert.equal(subscriptionPlan("USER", "SHOPPING").products, true);
  assert.equal(subscriptionPlan("USER", "SOCIAL").posts, true);
  assert.equal(subscriptionPlan("USER", "HOME").posts, false);
  assert.equal(subscriptionPlan("ADMIN", "HOME").financeRequests, true);
  assert.equal(subscriptionPlan("USER", "HOME", "TOURN_MANAGER").awards, true);
});
test("unchanged Firestore rows preserve references and ids cannot be overwritten", () => {
  const row = { id: "a", name: "A" };
  const snap = {
    docs: [{ id: "a", data: () => ({ id: "fake", name: "A" }) }],
    docChanges: () => [],
  };
  const prev = [row];
  assert.equal(snapshotRows(snap, prev), prev);
  snap.docChanges = () => [{ doc: { id: "a" } }];
  assert.deepEqual(snapshotRows(snap, prev), [{ id: "a", name: "A" }]);
});
function database({
  stock = 1,
  balance = 100,
  price = 60,
  giftCount = 0,
} = {}) {
  const data = new Map(
    Object.entries({
      "players/p": {
        name: "Player",
        balance,
        giftTracker: { date: new Date().toDateString(), count: giftCount },
      },
      "players/receiver": { name: "Receiver", balance: 0, fame: 0 },
      "companies/c": { name: "Store", status: "ACTIVE", balance: 0 },
      "products/item": {
        companyId: "c",
        name: "Item",
        price,
        stock,
        cat: "LUXO",
        power: 2,
      },
    }),
  );
  let id = 0,
    queue = Promise.resolve();
  const ref = (path) => ({ path, id: path.split("/").at(-1) });
  const db = {
    data,
    collection: (name) => ({
      doc: (idValue) => ref(name + "/" + (idValue || "generated" + ++id)),
    }),
    runTransaction(fn) {
      const run = queue.then(async () => {
        const writes = [];
        const result = await fn({
          get: async (r) => ({
            exists: data.has(r.path),
            data: () => structuredClone(data.get(r.path)),
          }),
          update: (r, v) => writes.push([r, v]),
          set: (r, v) => writes.push([r, v, true]),
        });
        for (const [r, v, replace] of writes) {
          const current = replace ? {} : { ...data.get(r.path) };
          for (const [key, val] of Object.entries(v))
            current[key] =
              val && val.op === "increment"
                ? (Number(current[key]) || 0) + val.value
                : val;
          data.set(r.path, current);
        }
        return result;
      });
      queue = run.catch(() => {});
      return run;
    },
  };
  return db;
}
const fv = { increment: (value) => ({ op: "increment", value }) };
const buy = (db) =>
  purchaseProduct(db, fv, {
    user: { type: "PLAYER", data: { id: "p" } },
    productId: "item",
    sellerId: "c",
    expectedPrice: 60,
  });
test("two concurrent purchases cannot oversell the last item", async () => {
  const db = database();
  const results = await Promise.allSettled([buy(db), buy(db)]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(db.data.get("products/item").stock, 0);
  assert.equal(db.data.get("players/p").balance, 40);
  assert.equal(
    [...db.data.keys()].filter((k) => k.startsWith("sales/")).length,
    1,
  );
});
test("fresh insufficient balance rejects without partial writes", async () => {
  const db = database({ balance: 10 });
  await assert.rejects(buy(db), /Saldo insuficiente/);
  assert.equal(db.data.get("products/item").stock, 1);
  assert.equal(db.data.get("companies/c").balance, 0);
});
test("changed price asks user to confirm again", async () => {
  const db = database({ price: 70 });
  await assert.rejects(buy(db), /preço mudou/);
});
test("invalid prices and visitors are rejected", async () => {
  await assert.rejects(buy(database({ price: -10 })), /inválido/);
  await assert.rejects(
    purchaseProduct(database(), fv, {
      user: { type: "VISITOR", data: { id: "visitor" } },
    }),
    /Entre em uma conta/,
  );
});
test("gift cap is rechecked in the transaction", async () => {
  const db = database({ giftCount: 7 });
  await assert.rejects(
    purchaseProduct(db, fv, {
      user: { type: "PLAYER", data: { id: "p" } },
      productId: "item",
      sellerId: "c",
      giftTarget: { id: "receiver" },
      expectedPrice: 60,
    }),
    /7 presentes/,
  );
  assert.equal(db.data.get("products/item").stock, 1);
});
test("gift delivery, fame, payment and news commit together", async () => {
  const db = database();
  await purchaseProduct(db, fv, {
    user: { type: "PLAYER", data: { id: "p" } },
    productId: "item",
    sellerId: "c",
    giftTarget: { id: "receiver" },
    expectedPrice: 60,
  });
  assert.equal(db.data.get("players/receiver").fame, 200);
  assert.equal(db.data.get("companies/c").balance, 60);
  assert.equal(db.data.get("players/p").giftTracker.count, 1);
  assert.equal(
    [...db.data.keys()].filter((k) => k.startsWith("news/")).length,
    1,
  );
});
