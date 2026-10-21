function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonical(value[key])]),
    );
  return value;
}

// Keep existing game calculations, but reject them if their inputs changed before
// committing. Transaction retries never reapply a consumed item or stale balance.
export function guardedBatch(db, guards) {
  const writes = [];
  const batch = {
    update(ref, data) {
      writes.push(["update", ref, data]);
      return batch;
    },
    set(ref, data, options) {
      writes.push(["set", ref, data, options]);
      return batch;
    },
    delete(ref) {
      writes.push(["delete", ref]);
      return batch;
    },
    commit() {
      return db.runTransaction(async (transaction) => {
        const snapshots = await Promise.all(
          guards.map((guard) => transaction.get(guard.ref)),
        );
        guards.forEach((guard, index) => {
          const snap = snapshots[index];
          if (!snap.exists)
            throw new Error(
              "Este registro já foi alterado ou removido. Atualize e tente novamente.",
            );
          const current = snap.data();
          for (const [key, expected] of Object.entries(guard.expected || {})) {
            if (
              JSON.stringify(canonical(current[key])) !==
              JSON.stringify(canonical(expected))
            ) {
              throw new Error(
                "Os dados mudaram durante a operação. Confira os valores e tente novamente.",
              );
            }
          }
        });
        for (const [method, ref, data, options] of writes) {
          if (method === "delete") transaction.delete(ref);
          else if (method === "set" && options)
            transaction.set(ref, data, options);
          else transaction[method](ref, data);
        }
      });
    },
  };
  return batch;
}

export function guardedUpdate(db, ref, expected, data) {
  return guardedBatch(db, [{ ref, expected }]).update(ref, data).commit();
}
