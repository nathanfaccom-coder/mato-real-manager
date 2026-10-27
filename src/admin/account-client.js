import { OWNER_UID } from "./permissions.js";

export function createAccountAdminClient({
  auth,
  endpoint,
  fetchImpl = fetch,
}) {
  async function request(route, payload) {
    const identity = auth.currentUser;
    if (identity?.uid !== OWNER_UID)
      throw Error("Somente o ADM principal pode gerenciar vínculos.");
    const token = await identity.getIdToken(true);
    if (auth.currentUser !== identity)
      throw Error("A sessão mudou. Entre novamente.");
    const response = await fetchImpl(`${endpoint}/${route}`, {
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
    if (response.status === 401)
      throw Error("Confirme novamente sua senha de ADM para continuar.");
    if (!response.ok)
      throw Error(
        "Não foi possível aplicar o pedido. Consulte novamente o vínculo e confira a autorização.",
      );
    const result = await response.json();
    if (auth.currentUser !== identity)
      throw Error("A sessão mudou. Consulte novamente antes de continuar.");
    return result;
  }
  return {
    review: ({ uid, type, entityId }) =>
      request("account-review", {
        uid,
        ...(type && entityId ? { type, entityId } : {}),
      }),
    bind: ({ uid, type, entityId }) =>
      request("account-bind", { uid, type, entityId }),
    state: ({ uid, active, expectedRevision, reason }) =>
      request("account-state", { uid, active, expectedRevision, reason }),
  };
}
