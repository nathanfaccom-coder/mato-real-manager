const NORMAL_HALF_MS = 15 * 60 * 1000;
const GAME_SECONDS_PER_WALL_SECOND = 3;
export const HALFTIME_MS = 16000;
export const FULLTIME_PRESENTATION_MS = 10000;

export function addedTimeForSeed(seed) {
  let value = seed >>> 0;
  const next = () => {
    value = (Math.imul(value ^ (value >>> 16), 0x45d9f3b) + 0x27100001) >>> 0;
    return value % 11;
  };
  return [next(), next()];
}

export function matchDurationSeconds(match) {
  return match?.durationSeconds || 5400;
}

export function timelineDurationMs(match) {
  if (!match?.snapshot?.addedTime) return 1800000;
  const [first = 0, second = 0] = match.snapshot.addedTime;
  return NORMAL_HALF_MS * 2 + (first + second) * 60000 / GAME_SECONDS_PER_WALL_SECOND + HALFTIME_MS + FULLTIME_PRESENTATION_MS;
}

export function timeAtElapsed(match, elapsedMs) {
  if (!match?.snapshot?.addedTime) {
    const time = Math.min(5400, Math.max(0, elapsedMs * GAME_SECONDS_PER_WALL_SECOND / 1000));
    return { time, stage: "playing", halftimeElapsed: 0 };
  }
  const [addedFirst = 0, addedSecond = 0] = match.snapshot.addedTime;
  const firstExtraMs = addedFirst * 20000;
  const secondExtraMs = addedSecond * 20000;
  const firstHalfTicks = 2700 + addedFirst * 60;
  const secondHalfStart = firstHalfTicks;
  const secondNormalEnd = secondHalfStart + 2700;
  let elapsed = Math.max(0, elapsedMs);
  if (elapsed < NORMAL_HALF_MS)
    return { time: elapsed * 3 / 1000, stage: "playing", halftimeElapsed: 0 };
  elapsed -= NORMAL_HALF_MS;
  if (elapsed < firstExtraMs)
    return { time: 2700 + elapsed * 3 / 1000, stage: "first-stoppage", halftimeElapsed: 0 };
  elapsed -= firstExtraMs;
  if (elapsed < HALFTIME_MS)
    return { time: firstHalfTicks, stage: elapsed < HALFTIME_MS / 2 ? "halftime-exit" : "halftime-entry", halftimeElapsed: elapsed, stageElapsedMs: elapsed < HALFTIME_MS / 2 ? elapsed : elapsed - HALFTIME_MS / 2 };
  elapsed -= HALFTIME_MS;
  if (elapsed < NORMAL_HALF_MS)
    return { time: secondHalfStart + elapsed * 3 / 1000, stage: "playing", halftimeElapsed: 0 };
  elapsed -= NORMAL_HALF_MS;
  if (elapsed < secondExtraMs)
    return { time: secondNormalEnd + elapsed * 3 / 1000, stage: "second-stoppage", halftimeElapsed: 0 };
  elapsed -= secondExtraMs;
  return {
    time: matchDurationSeconds(match),
    stage: elapsed < FULLTIME_PRESENTATION_MS ? "fulltime-exit" : "ended",
    halftimeElapsed: 0,
    stageElapsedMs: elapsed,
  };
}

export function elapsedAtTime(match, time) {
  if (!match?.snapshot?.addedTime) return Math.max(0, time) * 1000 / GAME_SECONDS_PER_WALL_SECOND;
  const [addedFirst = 0, addedSecond = 0] = match.snapshot.addedTime;
  const firstExtraMs = addedFirst * 20000;
  const secondExtraMs = addedSecond * 20000;
  const firstHalfTicks = 2700 + addedFirst * 60;
  const secondHalfStart = firstHalfTicks;
  const secondNormalEnd = secondHalfStart + 2700;
  if (time < 2700) return time * 1000 / 3;
  if (time <= firstHalfTicks) return NORMAL_HALF_MS + (time - 2700) * 1000 / 3;
  if (time < secondHalfStart + 2700)
    return NORMAL_HALF_MS + firstExtraMs + HALFTIME_MS + (time - secondHalfStart) * 1000 / 3;
  if (time <= secondNormalEnd)
    return NORMAL_HALF_MS + firstExtraMs + HALFTIME_MS + NORMAL_HALF_MS + (time - secondNormalEnd) * 1000 / 3;
  return NORMAL_HALF_MS + firstExtraMs + HALFTIME_MS + NORMAL_HALF_MS + secondExtraMs;
}

export function formatMatchClock(time, match, stage) {
  if (stage === "halftime-exit" || stage === "halftime-entry") return "INTERVALO";
  if (stage === "fulltime-exit" || stage === "ended") return "FIM";
  if (!match?.snapshot?.addedTime) {
    const seconds = Math.floor(time);
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }
  const [addedFirst = 0] = match.snapshot.addedTime;
  const firstHalfTicks = 2700 + addedFirst * 60;
  const secondHalfStart = firstHalfTicks;
  const secondNormalEnd = secondHalfStart + 2700;
  const seconds = Math.floor(time);
  if (seconds === secondHalfStart && stage === "playing") return "45:00";
  if (seconds <= 2700) return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  if (seconds <= firstHalfTicks)
    return `45+${Math.max(1, Math.ceil((seconds - 2700) / 60))}′`;
  if (seconds < secondNormalEnd) {
    const second = seconds - secondHalfStart + 2700;
    return `${String(Math.floor(second / 60)).padStart(2, "0")}:${String(second % 60).padStart(2, "0")}`;
  }
  if (seconds === secondNormalEnd) return "90:00";
  return `90+${Math.max(1, Math.ceil((seconds - secondNormalEnd) / 60))}′`;
}
