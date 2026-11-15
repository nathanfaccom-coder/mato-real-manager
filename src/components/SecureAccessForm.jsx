import React, { useState } from "react";
import {
  registerGameIdentity,
  verifyGameEmail,
  recoverGamePassword,
} from "../services/game-auth.js";
import { identityErrorMessage } from "../services/identity-access.js";

export function SecureAccessForm({ onLogin }) {
  const [mode, setMode] = useState("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uid, setUid] = useState("");
  const labels = {
    LOGIN: "Entrar",
    CREATE: "Preparar meu acesso",
    VERIFY: "Confirmar e-mail",
    RESET: "Recuperar senha",
  };
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setMessage("");
    setError("");
    setUid("");
    if (mode === "CREATE" && password !== confirm) {
      setError("As senhas precisam ser iguais.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "LOGIN") await onLogin(email, password);
      else if (mode === "RESET") setMessage(await recoverGamePassword(email));
      else {
        const result =
          mode === "CREATE"
            ? await registerGameIdentity(email, password)
            : await verifyGameEmail(email, password);
        setUid(result.uid);
        setMessage(
          result.verified
            ? "E-mail confirmado. Solicite à Federação o vínculo com seu perfil existente."
            : result.emailSent
              ? "Confira seu e-mail e abra o link de confirmação. Depois solicite o vínculo à Federação."
              : "Seu acesso foi criado, mas não foi possível enviar a confirmação. Use “Confirmar e-mail” para tentar novamente.",
        );
      }
    } catch (err) {
      setError(identityErrorMessage(err));
    } finally {
      setPassword("");
      setConfirm("");
      setBusy(false);
    }
  }
  return (
    <section className="card" aria-label="Acesso por e-mail">
      <h2>{labels[mode]}</h2>
      <p>
        Use seu e-mail pessoal. Preparar o acesso não cria um time ou jogador e
        não transfere um perfil: o vínculo depende da Federação.
      </p>
      <form onSubmit={submit}>
        <fieldset
          disabled={busy}
          style={{ border: 0, padding: 0, minWidth: 0 }}
        >
          <label>
            E-mail
            <input
              className="input-field"
              type="email"
              autoComplete="username"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {mode !== "RESET" && (
            <label>
              Senha
              <input
                className="input-field"
                type="password"
                autoComplete={
                  mode === "CREATE" ? "new-password" : "current-password"
                }
                required
                minLength={mode === "CREATE" ? 12 : undefined}
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          )}
          {mode === "CREATE" && (
            <>
              <p>Use uma senha de 12 a 128 caracteres.</p>
              <label>
                Repita a senha
                <input
                  className="input-field"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={12}
                  maxLength={128}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            </>
          )}
          <button className="btn btn-green" type="submit">
            {busy ? "AGUARDE…" : labels[mode].toUpperCase()}
          </button>
        </fieldset>
      </form>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {uid && (
        <p>
          Identificador para a Federação:{" "}
          <code style={{ overflowWrap: "anywhere" }}>{uid}</code>. Envie somente
          esse identificador; nunca sua senha.
        </p>
      )}
      <nav
        aria-label="Opções de acesso"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}
      >
        {Object.entries(labels)
          .filter(([key]) => key !== mode)
          .map(([key, label]) => (
            <button
              className="btn btn-ghost"
              style={{ width: "auto" }}
              disabled={busy}
              key={key}
              type="button"
              onClick={() => {
                setMode(key);
                setPassword("");
                setConfirm("");
                setError("");
                setMessage("");
                setUid("");
              }}
            >
              {label}
            </button>
          ))}
      </nav>
    </section>
  );
}
