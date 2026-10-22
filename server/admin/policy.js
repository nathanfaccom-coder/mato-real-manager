// UID is an identifier, not a password. Callers must be verified by Firebase Auth.
export const OWNER_UID = "NEXLYzsJfLPsTxzp3LKHKwaPhEZ2";
export const PERMISSIONS = Object.freeze({
  teams: "Gerenciar times",
  players: "Gerenciar jogadores",
  finance: "Gerenciar finanças",
  competitions: "Gerenciar campeonatos e partidas",
  nationalTeams: "Gerenciar seleções",
  press: "Gerenciar imprensa e notícias",
  companies: "Gerenciar empresas",
  staff: "Gerenciar comissão técnica",
  calendar: "Gerenciar calendário",
});
export class AccessError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
export function validatePermissions(value) {
  if (
    !Array.isArray(value) ||
    value.some((p) => !Object.hasOwn(PERMISSIONS, p))
  )
    throw new AccessError("invalid-argument", "Permissão inválida.");
  return [...new Set(value)].sort();
}
export async function requireAccess(auth, verifiedUid, permission = null) {
  if (!verifiedUid)
    throw new AccessError("unauthenticated", "Entre na sua conta.");
  // Consult Auth on every privileged call: stale tokens cannot retain deleted permissions.
  let account;
  try {
    account = await auth.getUser(verifiedUid);
  } catch (e) {
    if (e.code === "auth/user-not-found")
      throw new AccessError("permission-denied", "Acesso removido.");
    throw e;
  }
  if (account.disabled)
    throw new AccessError("permission-denied", "Conta desativada.");
  if (account.uid === OWNER_UID) return account;
  const claims = account.customClaims;
  if (
    !permission ||
    !Object.hasOwn(PERMISSIONS, permission) ||
    claims?.matoRole !== "subadmin" ||
    !Array.isArray(claims.matoPermissions) ||
    !claims.matoPermissions.includes(permission)
  )
    throw new AccessError(
      "permission-denied",
      "Você não tem permissão para esta ação.",
    );
  return account;
}
