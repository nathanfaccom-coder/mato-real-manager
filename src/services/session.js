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
