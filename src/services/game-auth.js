import { adminAuth } from "../admin/auth.js";
import { db, firebase } from "./firebase.js";
import { createTrustedSession } from "./trusted-session.js";
import { createIdentityAccess } from "./identity-access.js";
import { createAccountAdminClient } from "../admin/account-client.js";
import { OWNER_UID } from "../admin/permissions.js";

// Build-time rollout only. Never enable via a public Firestore document or URL.
export const secureGameLogin =
  import.meta.env.VITE_SECURE_GAME_LOGIN === "true";
const endpoint = import.meta.env.VITE_MATCH_API_URL || "";
const allowedEndpoint =
  "https://pyqmrzpgjepazitrjwpc.supabase.co/functions/v1/match-api";
function requireConfigured() {
  if (!secureGameLogin || endpoint !== allowedEndpoint)
    throw Error("Login seguro ainda não configurado.");
}
function client() {
  requireConfigured();
  return createTrustedSession({ auth: adminAuth, db, endpoint });
}
function bindingClient() {
  requireConfigured();
  return createAccountAdminClient({ auth: adminAuth, endpoint });
}
export const reviewAccountBinding = (input) => bindingClient().review(input);
export const bindAccountIdentity = (input) => bindingClient().bind(input);
export const changeAccountBinding = (input) => bindingClient().state(input);
export async function reauthenticateBindingOwner(password) {
  requireConfigured();
  const identity = adminAuth.currentUser;
  if (identity?.uid !== OWNER_UID || !identity.email)
    throw Error("Entre como ADM principal.");
  await identity.reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(identity.email, password),
  );
  await identity.getIdToken(true);
}
const identityAccess = createIdentityAccess({
  createApp: async () => {
    requireConfigured();
    return firebase.initializeApp(
      firebase.app().options,
      `game-access-${crypto.randomUUID()}`,
    );
  },
});
export const registerGameIdentity = (email, password) =>
  identityAccess.register(email, password);
export const verifyGameEmail = (email, password) =>
  identityAccess.verify(email, password);
export const recoverGamePassword = (email) => identityAccess.recover(email);
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
