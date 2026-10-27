// Auth-only operations on an isolated Firebase app. No game profile writes,
// claims, bindings or legacy passwords are read by this module.
export function createIdentityAccess({ createApp }) {
  const emailValue = (value) => {
    const email = typeof value === "string" ? value.trim() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      throw Error("Informe um e-mail válido.");
    return email;
  };
  async function isolated(operation) {
    const app = await createApp();
    try {
      const auth = app.auth();
      await auth.setPersistence("none");
      auth.languageCode = "pt-BR";
      return await operation(auth);
    } finally {
      try {
        await app.auth().signOut();
      } finally {
        await app.delete();
      }
    }
  }
  async function register(email, password) {
    email = emailValue(email);
    if (
      typeof password !== "string" ||
      password.length < 12 ||
      password.length > 128
    )
      throw Error("Use uma senha de 12 a 128 caracteres.");
    return isolated(async (auth) => {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      // If mail delivery fails, preserve the created identity for resend/recovery.
      let emailSent = true;
      try {
        await user.sendEmailVerification();
      } catch {
        emailSent = false;
      }
      return { uid: user.uid, verified: false, emailSent };
    });
  }
  async function verify(email, password) {
    email = emailValue(email);
    return isolated(async (auth) => {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      await user.reload();
      if (user.emailVerified)
        return { uid: user.uid, verified: true, emailSent: false };
      await user.sendEmailVerification();
      return { uid: user.uid, verified: false, emailSent: true };
    });
  }
  async function recover(email) {
    email = emailValue(email);
    await isolated(async (auth) => {
      try {
        await auth.sendPasswordResetEmail(email);
      } catch (error) {
        if (error.code !== "auth/user-not-found") throw error;
      }
    });
    // Same UI result for absent and existing accounts.
    return "Se houver uma conta para esse e-mail, você receberá as instruções para redefinir a senha.";
  }
  return { register, verify, recover };
}
export function identityErrorMessage(error) {
  if (error?.code === "auth/email-already-in-use")
    return "Não foi possível criar esse acesso. Se você já se cadastrou, use confirmar e-mail ou recuperar senha.";
  if (error?.code === "auth/too-many-requests")
    return "Muitas tentativas. Aguarde um pouco antes de tentar novamente.";
  if (error?.code === "auth/weak-password")
    return "Escolha uma senha mais forte, com pelo menos 12 caracteres.";
  if (error?.code === "auth/invalid-email") return "Informe um e-mail válido.";
  return "Não foi possível concluir. Confira os dados e sua conexão e tente novamente.";
}
