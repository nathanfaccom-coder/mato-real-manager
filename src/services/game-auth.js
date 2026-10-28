import { adminAuth } from "../admin/auth.js";
import { db, firebase } from "./firebase.js";
import { createTrustedSession } from "./trusted-session.js";
import {
  createIdentityAccess,
  recoverCurrentIdentityPassword,
} from "./identity-access.js";
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
export const reviewPlayerApplication = (input) =>
  bindingClient().application(input);
export const decidePlayerApplication = (input) => bindingClient().decide(input);
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
async function applicationRequest(email, password, route, payload) {
  requireConfigured();
  return identityAccess.withVerifiedIdentity(email, password, async (token) => {
    const response = await fetch(`${endpoint}/${route}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "omit",
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok)
      throw Error(
        "Não foi possível processar a inscrição. Confira a confirmação do e-mail e consulte a situação atual.",
      );
    return response.json();
  });
}
export const submitNewPlayer = (email, password, profile) =>
  applicationRequest(email, password, "player-apply", profile);
export const consultNewPlayer = (email, password) =>
  applicationRequest(email, password, "player-application", {});
export function requestOwnPasswordReset() {
  requireConfigured();
  return recoverCurrentIdentityPassword(adminAuth, identityAccess.recover);
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
