export function actorPresentation(match, frame, i, time) {
  const player = match.people[i],
    position = frame.positions[i];
  const recent = match.events.filter((e) => e.t <= time && time - e.t < 30);
  const exit = recent.findLast(
    (e) => e.actor === i && ["red", "injury", "substitution"].includes(e.type),
  );
  const entry = recent.findLast(
    (e) => e.type === "substitution" && e.incoming === i,
  );
  const contact = recent.findLast(
    (e) =>
      (e.actor === i || e.victim === i) &&
      [
        "tackle",
        "foul",
        "shot",
        "save",
        "injury",
        "restart",
        "freekick-pass",
        "freekick-shot",
      ].includes(e.type) &&
      time - e.t < 5,
  );
  let x = position[0],
    y = position[1],
    visible = Boolean(position[2]),
    action = "run";
  if (exit && !position[2]) {
    const delay = exit.type === "injury" || exit.injury ? 7 : 0;
    const u = Math.max(0, Math.min(1, (time - exit.t - delay) / 18));
    x = (exit.at?.[0] ?? x) * (1 - u) + 50 * u;
    y = (exit.at?.[1] ?? y) * (1 - u) + 66 * u;
    visible = u < 1;
    action =
      time - exit.t < delay
        ? "injury"
        : exit.type === "injury" || exit.injury
          ? "limp"
          : "walk";
  } else if (entry && time - entry.t < 18) {
    const u = (time - entry.t) / 18;
    x = 50 * (1 - u) + x * u;
    y = 66 * (1 - u) + y * u;
    action = "walk";
  } else if (contact)
    action =
      contact.type === "shot" ||
      contact.type === "restart" ||
      contact.type === "freekick-pass" ||
      contact.type === "freekick-shot"
        ? "kick"
        : contact.type === "save"
          ? "save"
        : contact.victim === i
          ? "injury"
          : "tackle";
  const throwin = match.events.findLast(
    (e) => e.type === "throwin" && e.actor === i && e.t <= time,
  );
  const release = throwin && match.events.find(
    (e) => e.type === "restart" && e.restartType === "throwin" && e.actor === i && e.t >= throwin.t && e.t <= time,
  );
  if (throwin && position[2]) {
    if (!release) action = "throwin";
    else if (time - release.t < 2) action = "throwin-release";
  }
  return {
    x,
    y,
    visible,
    action,
    facing: player.side === frame.period ? 1 : -1,
  };
}
