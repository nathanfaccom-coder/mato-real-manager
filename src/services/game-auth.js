import { adminAuth } from "../admin/auth.js";
import { db } from "./firebase.js";
import { createTrustedSession } from "./trusted-session.js";

// Build-time rollout only. Never enable via a public Firestore document or URL.
export const secureGameLogin =
  import.meta.env.VITE_SECURE_GAME_LOGIN === "true";
const endpoint = import.meta.env.VITE_MATCH_API_URL || "";
const allowedEndpoint =
  "https://pyqmrzpgjepazitrjwpc.supabase.co/functions/v1/match-api";
function client() {
  if (!secureGameLogin || endpoint !== allowedEndpoint)
    throw Error("Login seguro ainda não configurado.");
  return createTrustedSession({ auth: adminAuth, db, endpoint });
}
export function loginGameAccount(email, password) {
  return client().login(email, password);
}
export function resolveGameAccountSession(identity) {
  return client().resolve(identity);
}
export function initialAuthUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = adminAuth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
