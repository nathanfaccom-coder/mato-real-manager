// Only aliased by the test Vite config. Never included in production builds.
const store = structuredClone(window.__TEST_DATA__ || {});
const subscriptions = new Set();
const metrics = (window.__FIREBASE_METRICS__ = {
  starts: [],
  active: [],
  writes: [],
});
let sequence = 0;
const clone = (value) => structuredClone(value);
const fields = {
  increment: (value) => ({ __op: "increment", value }),
  delete: () => ({ __op: "delete" }),
  arrayUnion: (...value) => ({ __op: "union", value }),
  arrayRemove: (...value) => ({ __op: "remove", value }),
};
function apply(path, values, replace = false) {
  const parts = path.split("/");
  const id = parts.pop();
  const coll = parts.join("/");
  store[coll] ??= {};
  if (values === null) delete store[coll][id];
  else {
    const next = replace ? {} : { ...store[coll][id] };
    for (const [key, value] of Object.entries(values)) {
      if (value?.__op === "increment")
        next[key] = (Number(next[key]) || 0) + value.value;
      else if (value?.__op === "delete") delete next[key];
      else if (value?.__op === "union")
        next[key] = [...new Set([...(next[key] || []), ...value.value])];
      else if (value?.__op === "remove")
        next[key] = (next[key] || []).filter((x) => !value.value.includes(x));
      else next[key] = clone(value);
    }
    store[coll][id] = next;
  }
  metrics.writes.push(path);
}
function notify() {
  for (const sub of [...subscriptions]) sub.emit();
}
class Document {
  constructor(path) {
    this.path = path;
    this.id = path.split("/").at(-1);
  }
  snapshot() {
    const parts = this.path.split("/");
    const id = parts.pop();
    const value = store[parts.join("/")]?.[id];
    return {
      id,
      ref: this,
      exists: value !== undefined,
      data: () => clone(value),
      metadata: { fromCache: false },
    };
  }
  get() {
    return Promise.resolve(this.snapshot());
  }
  collection(name) {
    return new Query(this.path + "/" + name);
  }
  update(data) {
    apply(this.path, data);
    notify();
    return Promise.resolve();
  }
  set(data, options) {
    apply(this.path, data, !options?.merge);
    notify();
    return Promise.resolve();
  }
  delete() {
    apply(this.path, null);
    notify();
    return Promise.resolve();
  }
  onSnapshot(options, callback) {
    return listen(this, typeof options === "function" ? options : callback);
  }
}
class Query {
  constructor(path, options = {}) {
    this.path = path;
    this.options = options;
  }
  doc(id) {
    return new Document(this.path + "/" + (id || "generated" + ++sequence));
  }
  where(field, op, value) {
    return new Query(this.path, {
      ...this.options,
      where: [...(this.options.where || []), [field, op, value]],
    });
  }
  orderBy(field, dir = "asc") {
    return new Query(this.path, { ...this.options, order: [field, dir] });
  }
  limit(n) {
    return new Query(this.path, { ...this.options, limit: n });
  }
  startAfter(doc) {
    return new Query(this.path, { ...this.options, after: doc.id });
  }
  snapshot() {
    let docs = Object.keys(store[this.path] || {}).map((id) =>
      this.doc(id).snapshot(),
    );
    for (const [field, op, value] of this.options.where || [])
      docs = docs.filter((d) =>
        op === "in"
          ? value.includes(d.data()[field])
          : d.data()[field] === value,
      );
    if (this.options.order) {
      const [field, dir] = this.options.order;
      docs = docs.filter((d) => d.data()[field] !== undefined);
      docs.sort(
        (a, b) =>
          (a.data()[field] > b.data()[field]
            ? 1
            : a.data()[field] < b.data()[field]
              ? -1
              : 0) * (dir === "desc" ? -1 : 1) || a.id.localeCompare(b.id),
      );
    }
    if (this.options.after)
      docs = docs.slice(docs.findIndex((d) => d.id === this.options.after) + 1);
    if (this.options.limit) docs = docs.slice(0, this.options.limit);
    return {
      docs,
      empty: !docs.length,
      size: docs.length,
      metadata: { fromCache: false },
      docChanges: () => docs.map((doc) => ({ type: "added", doc })),
    };
  }
  onSnapshot(options, callback) {
    return listen(this, typeof options === "function" ? options : callback);
  }
  get() {
    return Promise.resolve(this.snapshot());
  }
  add(data) {
    const doc = this.doc();
    return doc.set(data).then(() => doc);
  }
}
function listen(query, callback) {
  const key = JSON.stringify([query.path, query.options]);
  metrics.starts.push(key);
  metrics.active.push(key);
  let last = null;
  const sub = {
    emit() {
      const snap = query.snapshot();
      const serialized = JSON.stringify(
        snap.docs ? snap.docs.map((d) => [d.id, d.data()]) : snap.data(),
      );
      if (serialized === last) return;
      last = serialized;
      queueMicrotask(() => {
        if (subscriptions.has(sub)) callback(snap);
      });
    },
  };
  subscriptions.add(sub);
  sub.emit();
  return () => {
    subscriptions.delete(sub);
    metrics.active.splice(metrics.active.indexOf(key), 1);
  };
}
function batch() {
  const ops = [];
  const b = {
    set: (r, v) => {
      ops.push([r.path, v, true]);
      return b;
    },
    update: (r, v) => {
      ops.push([r.path, v, false]);
      return b;
    },
    delete: (r) => {
      ops.push([r.path, null]);
      return b;
    },
    commit: async () => {
      ops.forEach((args) => apply(...args));
      notify();
    },
  };
  return b;
}
let transactions = Promise.resolve();
const db = {
  collection: (name) => new Query(name),
  batch,
  enablePersistence: () => Promise.resolve(),
  enableMultiTabIndexedDbPersistence: () => Promise.resolve(),
  runTransaction: (fn) => {
    const run = transactions.then(async () => {
      const b = batch();
      const result = await fn({ ...b, get: (r) => r.get() });
      await b.commit();
      return result;
    });
    transactions = run.catch(() => {});
    return run;
  },
};
const firestore = () => db;
firestore.FieldValue = fields;
const firebase = {
  apps: [],
  initializeApp() {
    this.apps.push({});
  },
  firestore,
};
window.__MOCK_DB__ = {
  data: store,
  update: (path, data) => {
    apply(path, data);
    notify();
  },
};
window.firebase = firebase;
export default firebase;
const OWNER = "NEXLYzsJfLPsTxzp3LKHKwaPhEZ2";
const authAccounts = window.__AUTH_ACCOUNTS__ || {
  "owner@example.test": { uid: OWNER, password: "test-owner-password" },
};
function makeAuth() {
  return {
    currentUser: null,
    async setPersistence() {},
    async signInWithEmailAndPassword(email, password) {
      const account = authAccounts[email];
      if (!account || account.password !== password)
        throw Object.assign(Error("Invalid credentials"), {
          code: "auth/invalid-credential",
        });
      this.currentUser = { uid: account.uid, email };
      return { user: this.currentUser };
    },
    async createUserWithEmailAndPassword(email, password) {
      if (authAccounts[email])
        throw Object.assign(Error("Duplicate"), {
          code: "auth/email-already-in-use",
        });
      const uid = `admin-created-${++sequence}`;
      authAccounts[email] = { uid, password };
      this.currentUser = {
        uid,
        email,
        async delete() {
          delete authAccounts[email];
        },
      };
      return { user: this.currentUser };
    },
    async signOut() {
      this.currentUser = null;
    },
  };
}
const primaryAuth = makeAuth();
firebase.auth = () => primaryAuth;
firebase.auth.Auth = { Persistence: { SESSION: "session", NONE: "none" } };
firebase.app = () => ({ options: {} });
firebase.initializeApp = (_, name) => {
  if (!name) return;
  const auth = makeAuth();
  return {
    auth: () => auth,
    firestore: () => ({
      collection: () => ({
        doc: () => ({
          get: async () => {
            if (window.__ADMIN_RULES_OPEN__) return { exists: false };
            throw Object.assign(Error("denied"), { code: "permission-denied" });
          },
        }),
      }),
    }),
    delete: async () => {},
  };
};
