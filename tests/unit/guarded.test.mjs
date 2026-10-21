import test from "node:test";
import assert from "node:assert/strict";
import { guardedBatch } from "../../src/services/guardedWrites.js";
import { trimChat } from "../../src/services/chat.js";
function fake(data) {
  const writes = [];
  return {
    writes,
    runTransaction: (fn) =>
      fn({
        get: async (ref) => ({ exists: ref in data, data: () => data[ref] }),
        update: (...args) => writes.push(args),
        delete: (ref) => writes.push([ref]),
        set: (...args) => writes.push(args),
      }),
  };
}
test("stale balances reject the entire operation before writing", async () => {
  const db = fake({ buyer: { balance: 10 }, item: {} });
  const batch = guardedBatch(db, [
    { ref: "buyer", expected: { balance: 100 } },
    { ref: "item" },
  ]);
  batch.update("buyer", { balance: 0 }).delete("item");
  await assert.rejects(batch.commit(), /mudaram/);
  assert.deepEqual(db.writes, []);
});
test("already consumed item cannot apply effects again", async () => {
  const db = fake({ buyer: { energy: 10 } });
  const batch = guardedBatch(db, [{ ref: "item" }]).update("buyer", {
    energy: 100,
  });
  await assert.rejects(batch.commit(), /removido/);
  assert.deepEqual(db.writes, []);
});
test("nested field guards ignore object key order", async () => {
  const db = fake({ buyer: { loan: { amount: 10, weeks: 2 } } });
  await guardedBatch(db, [
    { ref: "buyer", expected: { loan: { weeks: 2, amount: 10 } } },
  ])
    .update("buyer", { balance: 0 })
    .commit();
  assert.equal(db.writes.length, 1);
});
test("chat keeps newest sixty and uses document cursor for same-date messages", async () => {
  const docs = Array.from({ length: 72 }, (_, i) => ({
    id: String(i),
    ref: String(i),
  }));
  const deleted = [];
  const query = (after = 0, limit = Infinity) => ({
    orderBy: () => query(after, limit),
    limit: (n) => query(after, n),
    startAfter: (doc) => query(docs.indexOf(doc) + 1, limit),
    get: async () => ({
      docs: docs.slice(after, after + limit),
      empty: after >= docs.length,
    }),
  });
  await trimChat(query(), {
    batch: () => ({
      delete: (ref) => deleted.push(ref),
      commit: async () => {},
    }),
  });
  assert.deepEqual(
    deleted,
    docs.slice(60).map((doc) => doc.ref),
  );
});
