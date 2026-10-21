export function memoryDB(seed = {}) {
  const values = new Map(Object.entries(structuredClone(seed)));
  let serial = Promise.resolve(),
    counter = 0;
  const snap = (r) => ({
    id: r.id,
    ref: r,
    exists: values.has(r.path),
    data: () => structuredClone(values.get(r.path)),
  });
  const document = (path) => ({
    path,
    id: path.split("/").at(-1),
    get: async () => snap(document(path)),
  });
  const db = {
    values,
    collection: (name) => ({
      doc: (id) => document(name + "/" + (id || "new" + ++counter)),
      get: async () => ({
        docs: [...values.keys()]
          .filter((k) => k.startsWith(name + "/"))
          .map((k) => snap(document(k))),
      }),
    }),
    runTransaction(fn) {
      const run = serial.then(async () => {
        let wrote = false;
        const writes = [];
        const result = await fn({
          get: async (r) => {
            if (wrote) throw Error("Read after write");
            return snap(r);
          },
          set: (r, v) => {
            wrote = true;
            writes.push(["set", r, v]);
          },
          update: (r, v) => {
            wrote = true;
            writes.push(["update", r, v]);
          },
          delete: (r) => {
            wrote = true;
            writes.push(["delete", r]);
          },
        });
        for (const [op, r] of writes)
          if (op === "update" && !values.has(r.path))
            throw Error("Missing document");
        for (const [op, r, v] of writes) {
          if (op === "delete") values.delete(r.path);
          else
            values.set(
              r.path,
              structuredClone(
                op === "set" ? v : { ...values.get(r.path), ...v },
              ),
            );
        }
        return result;
      });
      serial = run.catch(() => {});
      return run;
    },
  };
  return db;
}
