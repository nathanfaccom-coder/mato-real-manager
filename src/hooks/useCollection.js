import { useEffect } from "react";
import { db } from "../services/firebase.js";
import { snapshotRows } from "../services/subscriptions.js";

export function useCollection(
  name,
  setRows,
  enabled = true,
  orderField = null,
  max = null,
  staffOnly = false,
) {
  useEffect(() => {
    if (!enabled) return;
    let query = db.collection(name);
    if (staffOnly)
      query = query.where("type", "in", [
        "COACH",
        "DOCTOR",
        "SCOUT",
        "ASSISTANT",
      ]);
    if (orderField) query = query.orderBy(orderField, "desc");
    if (max) query = query.limit(max);
    let rows = [];
    return query.onSnapshot(
      (snapshot) => {
        rows = snapshotRows(snapshot, rows);
        setRows(rows);
      },
      (error) =>
        console.error(`Não foi possível atualizar ${name}:`, error.code),
    );
  }, [name, setRows, enabled, orderField, max, staffOnly]);
}
