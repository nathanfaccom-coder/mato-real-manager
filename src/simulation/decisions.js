// The decision uses skill and shot quality; open goals must not become another pass.
export function shootingChance(
  ball,
  keeper,
  direction,
  pressure = 0,
  overall = 60,
  shot = 60,
  passChain = 0,
) {
  const distance = direction > 0 ? 100 - ball[0] : ball[0],
    lateral = Math.abs(ball[1] - 32);
  const quality = Math.max(0, Math.min(1, (overall * 0.4 + shot * 0.6) / 100));
  const openGoal = (ball[0] - keeper.x) * direction > 1 && lateral < 12;
  if (distance < 17 && openGoal) return 1;
  if (lateral > 20 || distance > 38) return 0;
  if (distance < 13 && lateral < 10) return pressure < 1.5 ? 1 : 0.75;
  if (distance < 20 && lateral < 14)
    return (
      Math.min(0.95, 0.55 + quality * 0.3 + Math.min(passChain, 4) * 0.04) /
      (1 + pressure * 0.15)
    );
  if (distance < 28 && lateral < 16)
    return (
      Math.min(0.85, 0.16 + quality * 0.26 + Math.min(passChain, 4) * 0.08) /
      (1 + pressure * 0.3)
    );
  if (distance <= 38 && lateral < 18)
    return (0.04 + quality * quality * 0.26) / (1 + pressure * 0.45);
  return 0;
}
export function boundaryRestart(point, lastTouchSide, attackingDirection) {
  if (point[1] < 0 || point[1] > 64)
    return {
      type: "throwin",
      side: 1 - lastTouchSide,
      at: [Math.max(2, Math.min(98, point[0])), point[1] < 0 ? 0 : 64],
    };
  const end = point[0] <= 0 ? 0 : 100;
  const ownEnd = attackingDirection > 0 ? 0 : 100;
  return end === ownEnd
    ? {
        type: "corner",
        side: 1 - lastTouchSide,
        at: [end, point[1] < 32 ? 0 : 64],
      }
    : {
        type: "goalkick",
        side: 1 - lastTouchSide,
        at: [end === 0 ? 5 : 95, 32],
      };
}
