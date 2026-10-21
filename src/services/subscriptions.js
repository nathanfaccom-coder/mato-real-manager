// Reuse unchanged document objects so unrelated changes do not reset forms/profile state.
export function snapshotRows(snapshot, previous = []) {
  const changed = new Set(snapshot.docChanges().map((change) => change.doc.id));
  const old = new Map(previous.map((row) => [row.id, row]));
  const next = snapshot.docs.map((doc) =>
    !changed.has(doc.id) && old.has(doc.id)
      ? old.get(doc.id)
      : { ...doc.data(), id: doc.id },
  );
  return next.length === previous.length &&
    next.every((row, i) => row === previous[i])
    ? previous
    : next;
}

export function subscriptionPlan(type, screen, modalType) {
  const admin = type === "ADMIN";
  const loggedIn = Boolean(type);
  return {
    financeRequests: admin,
    products: admin || type === "COMPANY" || screen === "SHOPPING",
    sponsorships: admin || type === "USER" || type === "COMPANY",
    awards: admin || ["AWARDS_MANAGER", "TOURN_MANAGER"].includes(modalType),
    tournaments:
      admin ||
      screen === "MATCHES" ||
      ["TOURN_MANAGER", "MATCH_MANAGER"].includes(modalType),
    hallOfFame: screen === "RANKING",
    matches:
      admin ||
      screen === "MATCHES" ||
      ["MATCH_MANAGER", "MATCH_PERFORMANCE"].includes(modalType),
    posts: screen === "SOCIAL",
    news: loggedIn,
    calendar: loggedIn,
  };
}
