import { ACCOUNT_COLLECTION } from "./session.js";

export class SessionRejected extends Error {}

// Dependencies are injected so token, network and identity races can be tested.
// No localStorage hint, requested role or legacy password authorizes this path.
export function createTrustedSession({
  auth,
  db,
  endpoint,
  fetchImpl = fetch,
}) {
  async function resolve(identity) {
    if (!identity) return null;
    const uid = identity.uid;
    const token = await identity.getIdToken();
    const response = await fetchImpl(`${endpoint}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "{}",
      credentials: "omit",
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    if ([400, 401, 403].includes(response.status))
      throw new SessionRejected(
        "Acesso não autorizado. Confira o vínculo da sua conta com a Federação.",
      );
    if (!response.ok)
      throw Error("Não foi possível confirmar sua conta. Tente novamente.");
    const account = await response.json();
    if (
      !account ||
      typeof account.type !== "string" ||
      !Object.hasOwn(ACCOUNT_COLLECTION, account.type) ||
      typeof account.entityId !== "string" ||
      !account.entityId ||
      account.entityId.includes("/") ||
      !Number.isSafeInteger(account.revision) ||
      account.revision < 1
    )
      throw new SessionRejected("Resposta de sessão inválida.");
    const doc = await db
      .collection(ACCOUNT_COLLECTION[account.type])
      .doc(account.entityId)
      .get({ source: "server" });
    if (!doc.exists || doc.data().status !== "ACTIVE")
      throw new SessionRejected("Perfil indisponível.");
    if (auth.currentUser?.uid !== uid)
      throw new SessionRejected("A conta mudou. Entre novamente.");
    const { password, ...data } = doc.data();
    return { type: account.type, data: { ...data, id: account.entityId } };
  }
  async function login(email, password) {
    try {
      await auth.setPersistence("session");
      const credential = await auth.signInWithEmailAndPassword(
        email.trim(),
        password,
      );
      return await resolve(credential.user);
    } catch (error) {
      await auth.signOut().catch(() => {});
      throw error;
    }
  }
  return { resolve, login };
}
