const TYPES = new Set([
  "USER",
  "PLAYER",
  "COMPANY",
  "PRESS",
  "PRESS_WORKER",
  "COACH",
  "DOCTOR",
  "SCOUT",
  "ASSISTANT",
]);
export function readSession(storage = localStorage) {
  try {
    const value = JSON.parse(storage.getItem("user") || "null");
    if (!value || !TYPES.has(value.type) || typeof value.data?.id !== "string")
      return null;
    return { type: value.type, data: { id: value.data.id } };
  } catch {
    return null;
  }
}
export function saveSession(user, storage = localStorage) {
  // This is a legacy session hint, NOT proof of authentication. Never persist passwords.
  try {
    if (TYPES.has(user?.type) && user.data?.id) {
      storage.setItem(
        "user",
        JSON.stringify({ type: user.type, data: { id: user.data.id } }),
      );
    } else storage.removeItem("user");
  } catch {
    /* Private mode/full storage must not prevent playing. */
  }
}
export function clearSession(storage = localStorage) {
  try {
    const keys = Array.from({ length: storage.length || 0 }, (_, i) =>
      storage.key(i),
    );
    for (const key of keys)
      if (key?.startsWith("navigation:")) storage.removeItem(key);
  } catch {
    /* Storage may be disabled. */
  }
  for (const key of ["user", "savedScreen", "lastRead"]) {
    try {
      storage.removeItem(key);
    } catch {
      /* Storage may be disabled. */
    }
  }
}
export function readPreference(key, storage = localStorage) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}
export function savePreference(key, value, storage = localStorage) {
  try {
    storage.setItem(key, value);
  } catch {
    /* Optional preference. */
  }
}
export const ACCOUNT_COLLECTION = {
  USER: "teams",
  PLAYER: "players",
  COMPANY: "companies",
  PRESS: "newspapers",
  PRESS_WORKER: "journalists",
  COACH: "users",
  DOCTOR: "users",
  SCOUT: "users",
  ASSISTANT: "users",
};

// Only restore routes that can render for this account; never restore modal state.
export function homeScreen(type) {
  return (
    {
      PLAYER: "PLAYER_DASH",
      COACH: "COACH_DASH",
      DOCTOR: "DOCTOR_DASH",
      SCOUT: "SCOUT_DASH",
      ASSISTANT: "ASSISTANT_DASH",
      COMPANY: "COMPANY_DASH",
      PRESS: "PRESS_DASH",
      PRESS_WORKER: "PRESS_DASH",
      VISITOR: "RANKING",
    }[type] || "HOME"
  );
}
export function restoreScreen(type, saved) {
  const shared = [
    "BROADCAST",
    "WATCH_GAMES",
    "NATIONAL_TEAMS",
    "MATCHES",
    "MARKET",
    "SHOPPING",
    "RANKING",
    "NEWS",
    "SOCIAL",
    "OFFERS",
    "PUBLIC_SERVICES",
  ];
  if (shared.includes(saved) || saved === homeScreen(type)) return saved;
  if (saved === "SPONSORSHIPS" && type === "USER") return saved;
  if (saved === "COMPANY_HOME" && type === "COMPANY") return saved;
  return homeScreen(type);
}
export function navigationKey(user, field) {
  return `navigation:${user.type}:${user.data.id}:${field}`;
}
export function readNavigation(user, field, fallback = null) {
  return readPreference(navigationKey(user, field)) ?? fallback;
}
export function saveNavigation(user, field, value) {
  savePreference(navigationKey(user, field), value);
}
