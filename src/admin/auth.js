import { firebase, db } from "../services/firebase.js";
import "firebase/compat/auth";
import { OWNER_UID, isMainAdmin, validatePermissions } from "./permissions.js";
export const adminAuth = firebase.auth();
const profile = (uid) => db.collection("adminProfiles").doc(uid);
const asAdmin = (uid, data) => ({ type: "ADMIN", data: { ...data, id: uid } });
export async function loginAdministrator(login, password) {
  const email = login.trim().includes("@")
    ? login.trim()
    : `${login.trim().toLowerCase()}@subadmins.matoreal.invalid`;
  await adminAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const { user } = await adminAuth.signInWithEmailAndPassword(email, password);
  if (user.uid === OWNER_UID)
    return asAdmin(user.uid, {
      name: "FEDERAÇÃO (ADM PRINCIPAL)",
      permissions: [],
    });
  try {
    const snap = await profile(user.uid).get();
    if (!snap.exists || snap.data().active !== true)
      throw Error(
        "Este acesso administrativo foi removido ou não foi autorizado.",
      );
    return asAdmin(user.uid, {
      name: snap.data().name,
      permissions: validatePermissions(snap.data().permissions),
    });
  } catch (error) {
    await adminAuth.signOut();
    throw error;
  }
}
export function observeAdmin(user, onChange, onRemoved) {
  if (isMainAdmin(user)) return () => {};
  return profile(user.data.id).onSnapshot((snap) => {
    if (!snap.exists || snap.data().active !== true) return onRemoved();
    try {
      onChange(
        asAdmin(snap.id, {
          name: snap.data().name,
          permissions: validatePermissions(snap.data().permissions),
        }),
      );
    } catch {
      onRemoved();
    }
  }, onRemoved);
}
async function requireOwner() {
  if (adminAuth.currentUser?.uid !== OWNER_UID)
    throw Error("Somente o ADM principal pode gerenciar acessos.");
}
// Separate app prevents signing the owner out when registering an auxiliary.
async function isolatedApp() {
  return firebase.initializeApp(
    firebase.app().options,
    `subadmin-${crypto.randomUUID()}`,
  );
}
export async function checkAdminRules() {
  await requireOwner();
  const app = await isolatedApp();
  try {
    try {
      await app
        .firestore()
        .collection("adminProfiles")
        .doc("__access_probe__")
        .get({ source: "server" });
    } catch (e) {
      if (e.code === "permission-denied") return true;
      throw e;
    }
    throw Error(
      "Antes de cadastrar subADMs, publique as regras de proteção de adminProfiles fornecidas com esta atualização. Seu banco ainda permite acesso público a esses perfis.",
    );
  } finally {
    await app.delete();
  }
}
export async function createSubAdmin({ name, login, password, permissions }) {
  await checkAdminRules();
  name = name.trim();
  login = login.trim().toLowerCase();
  if (name.length < 2 || name.length > 80)
    throw Error("Nome deve ter entre 2 e 80 caracteres.");
  if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(login))
    throw Error(
      "Login: de 3 a 32 letras, números, pontos, traços ou sublinhados.",
    );
  if (password.length < 12 || password.length > 128)
    throw Error("Use uma senha de 12 a 128 caracteres.");
  permissions = validatePermissions(permissions);
  const app = await isolatedApp();
  let created;
  try {
    await app.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    const result = await app
      .auth()
      .createUserWithEmailAndPassword(
        `${login}@subadmins.matoreal.invalid`,
        password,
      );
    created = result.user;
    await profile(created.uid).set({
      name,
      login,
      permissions,
      active: true,
      createdAt: Date.now(),
    });
    return created.uid;
  } catch (e) {
    if (created) await created.delete().catch(() => {});
    throw e;
  } finally {
    await app
      .auth()
      .signOut()
      .catch(() => {});
    await app.delete();
  }
}
export async function updateSubAdmin(uid, permissions) {
  await requireOwner();
  if (uid === OWNER_UID)
    throw Error("O ADM principal não pode ser alterado aqui.");
  await profile(uid).update({ permissions: validatePermissions(permissions) });
}
export async function removeSubAdmin(uid) {
  await requireOwner();
  if (uid === OWNER_UID) throw Error("O ADM principal não pode ser excluído.");
  await profile(uid).delete();
  // Free client SDK cannot delete somebody else's Auth identity. Removing the
  // authorization document revokes their panel access; Auth cleanup is manual.
}
