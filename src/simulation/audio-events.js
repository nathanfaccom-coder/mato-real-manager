export function audibleEvents(events, from, to) {
  if (to < from || to - from > 4) return [];
  return events.filter(
    (e) =>
      e.t > from &&
      e.t <= to &&
      ["kickoff", "halftime", "fulltime", "foul", "offside"].includes(e.type),
  );
}
