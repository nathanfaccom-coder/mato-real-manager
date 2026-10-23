// Coordinates are measured along the pitch; equality is onside.
export function offsideAtPass(receiver, ball, defenders, direction) {
  const ordered = defenders.map((p) => p.x * direction).sort((a, b) => b - a);
  const line = ordered[1] ?? (direction > 0 ? 100 : 0);
  const forward = receiver.x * direction;
  return {
    offside:
      forward > 50 * direction &&
      forward > ball[0] * direction + 0.01 &&
      forward > line + 0.01,
    line: line * direction,
  };
}
export function lanePressure(from, to, defenders) {
  const dx = to.x - from.x,
    dy = to.y - from.y,
    length = dx * dx + dy * dy;
  return defenders.reduce((risk, p) => {
    const u = length ? ((p.x - from.x) * dx + (p.y - from.y) * dy) / length : 0;
    if (u <= 0 || u >= 1) return risk;
    const d = Math.hypot(p.x - from.x - u * dx, p.y - from.y - u * dy);
    return risk + Math.max(0, 5 - d) / 5;
  }, 0);
}
export function assignNumbers(players, assignments = {}) {
  const used = new Set();
  const valid = (n) =>
    Number.isInteger(Number(n)) && Number(n) >= 1 && Number(n) <= 99;
  // Reserve every assigned number before filling unassigned players.
  for (const p of players)
    if (valid(assignments[p.id])) {
      const n = Number(assignments[p.id]);
      if (used.has(n))
        throw Error(
          "Existem números de camisa repetidos. Peça ao técnico para corrigir.",
        );
      used.add(n);
    }
  return players.map((p) => {
    let n = valid(assignments[p.id]) ? Number(assignments[p.id]) : 1;
    if (!valid(assignments[p.id])) {
      while (used.has(n)) n++;
      used.add(n);
    }
    return { ...p, pixelAppearance: { ...p.pixelAppearance, number: n } };
  });
}
