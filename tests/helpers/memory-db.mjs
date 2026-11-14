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
  const filtered=(name,filters=[],count=Infinity)=>({query:{name,filters,count},where:(field,op,value)=>filtered(name,[...filters,{field,op,value}],count),limit:n=>filtered(name,filters,n)});
  const db = {
    values,
    collection: (name) => ({
      orderBy: (field,direction) => ({limit:count=>({query:{name,field,direction,count}})}),
      where: (field,op,value) => filtered(name,[{field,op,value}]),
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
            if(r.query){
              if(r.query.filters){
                const {name,filters,count}=r.query;
                if(filters.some(f=>!['==','in'].includes(f.op)))throw Error('Unsupported query');
                return {docs:[...values.keys()].filter(k=>k.startsWith(name+'/')&&k.split('/').length===2&&filters.every(f=>f.op==='=='?values.get(k)[f.field]===f.value:f.value.includes(values.get(k)[f.field]))).slice(0,count).map(k=>snap(document(k)))};
              }
              const {name,field,op,value,direction,count}=r.query;
              if(direction)return {docs:[...values.keys()].filter(k=>k.startsWith(name+'/')&&k.split('/').length===2).sort((a,b)=>(values.get(a)[field]-values.get(b)[field])*(direction==='desc'?-1:1)).slice(0,count).map(k=>snap(document(k)))};
              if(op!=='in')throw Error('Unsupported query');
              return {docs:[...values.keys()].filter(k=>k.startsWith(name+'/')&&value.includes(values.get(k)[field])).map(k=>snap(document(k)))};
            }
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
