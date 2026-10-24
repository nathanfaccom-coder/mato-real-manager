// Field coordinates are mirrored by direction; keep decisions independent of team side.
export function shootingChance(ball, keeper, direction, pressure = 0) {
  const distance = direction > 0 ? 100 - ball[0] : ball[0];
  const central = Math.abs(ball[1] - 32);
  const openGoal = (ball[0] - keeper.x) * direction > 1 && central < 12;
  if (distance < 17 && central < 12 && openGoal) return 1;
  if (distance < 12 && central < 10) return 0.35;
  if (distance < 20 && central < 15) return pressure < 2 ? 0.14 : 0.07;
  if (distance < 27 && central < 16) return 0.025;
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
