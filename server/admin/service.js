import {
  OWNER_UID,
  AccessError,
  requireAccess,
  validatePermissions,
} from "./policy.js";
const invalid = (message) => {
  throw new AccessError("invalid-argument", message);
};
const publicAccount = (user) => ({
  uid: user.uid,
  name: user.displayName || "",
  login: user.email?.split("@")[0] || "",
  permissions: user.customClaims?.matoPermissions || [],
  disabled: user.disabled,
});
export function createAdminService(auth) {
  async function target(uid) {
    if (typeof uid !== "string" || !uid || uid === OWNER_UID)
      invalid("O ADM principal não pode ser alterado por esta função.");
    const user = await auth.getUser(uid);
    if (user.customClaims?.matoRole !== "subadmin")
      invalid("Esta conta não é um subADM.");
    return user;
  }
  return {
    async create(verifiedUid, input) {
      await requireAccess(auth, verifiedUid);
      const name = typeof input?.name === "string" ? input.name.trim() : "";
      const login =
        typeof input?.login === "string"
          ? input.login.trim().toLowerCase()
          : "";
      if (name.length < 2 || name.length > 80)
        invalid("Nome deve ter entre 2 e 80 caracteres.");
      if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(login))
        invalid(
          "Login deve ter de 3 a 32 letras, números, pontos, traços ou sublinhados.",
        );
      if (
        typeof input.password !== "string" ||
        input.password.length < 12 ||
        input.password.length > 128
      )
        invalid("Use uma senha de 12 a 128 caracteres.");
      const permissions = validatePermissions(input.permissions);
      // Create disabled; do not expose an account until its claims are committed.
      const user = await auth.createUser({
        email: `${login}@subadmins.matoreal.invalid`,
        password: input.password,
        displayName: name,
        disabled: true,
      });
      try {
        await auth.setCustomUserClaims(user.uid, {
          matoRole: "subadmin",
          matoPermissions: permissions,
        });
        await auth.updateUser(user.uid, { disabled: false });
      } catch (e) {
        // Failed cleanup leaves the account disabled, never privileged and enabled.
        await auth.deleteUser(user.uid).catch(() => {});
        throw e;
      }
      return { uid: user.uid, name, login, permissions, disabled: false };
    },
    async list(verifiedUid, pageToken) {
      await requireAccess(auth, verifiedUid);
      if (pageToken != null && typeof pageToken !== "string")
        invalid("Página inválida.");
      const page = await auth.listUsers(1000, pageToken || undefined);
      return {
        accounts: page.users
          .filter(
            (u) =>
              u.uid !== OWNER_UID && u.customClaims?.matoRole === "subadmin",
          )
          .map(publicAccount),
        nextPageToken: page.pageToken || null,
      };
    },
    async update(verifiedUid, input) {
      await requireAccess(auth, verifiedUid);
      const user = await target(input?.uid);
      const permissions = validatePermissions(input.permissions);
      await auth.setCustomUserClaims(user.uid, {
        ...user.customClaims,
        matoRole: "subadmin",
        matoPermissions: permissions,
      });
      await auth.revokeRefreshTokens(user.uid);
      return { uid: user.uid, permissions };
    },
    async remove(verifiedUid, uid) {
      await requireAccess(auth, verifiedUid);
      const user = await target(uid);
      // Disable before deletion; a deletion failure cannot leave usable access.
      await auth.updateUser(user.uid, { disabled: true });
      await auth.revokeRefreshTokens(user.uid);
      await auth.deleteUser(user.uid);
      return { uid: user.uid, removed: true };
    },
  };
}
