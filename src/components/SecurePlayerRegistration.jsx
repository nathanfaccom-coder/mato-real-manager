import React, { useState } from "react";
import { submitNewPlayer, consultNewPlayer } from "../services/game-auth.js";
import { NationalitySelect } from "../national/NationalitySelect.jsx";
import { AppearanceEditor } from "../simulation/Editors.jsx";
import { POS } from "../game/POS.js";
export function SecurePlayerRegistration() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [result, setResult] = useState(null);
  const [profile, setProfile] = useState({
      name: "",
      instagram: "",
      nationality: "MTR",
      position: "ATA",
      pixelAppearance: {},
    }),
    [revision, setRevision] = useState(0);
  const labels = {
    PENDING: "Em análise pela Federação",
    APPROVED: "Aprovado — entre com seu e-mail e senha",
    REJECTED: "Recusado — confira o motivo e corrija antes de reenviar",
  };
  async function run(consult) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (consult) {
        const response = await consultNewPlayer(email, password);
        setResult(response.application);
        setRevision(response.application?.revision || 0);
        if (response.application?.profile)
          setProfile(response.application.profile);
        if (!response.application)
          setError("Nenhuma inscrição encontrada para esse acesso.");
      } else {
        const response = await submitNewPlayer(email, password, {
          ...profile,
          expectedRevision: revision,
        });
        setResult(response);
        setRevision(response.revision);
      }
    } catch (e) {
      setError(
        e.code?.startsWith("auth/")
          ? "Confira o e-mail e a senha do seu acesso."
          : e.message,
      );
    } finally {
      setPassword("");
      setBusy(false);
    }
  }
  return (
    <section className="card">
      <h2>Inscrever novo jogador</h2>
      <p>
        Primeiro prepare seu acesso e confirme o e-mail na aba Entrar. Se você
        já tem um perfil, peça o vínculo à Federação em vez de criar outro.
      </p>
      <p>
        Overall inicial: 45 para linha e 60 para goleiro. A inscrição depende de
        aprovação e não permite escolher saldo ou atributos.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(false);
        }}
      >
        <fieldset
          disabled={busy}
          style={{ border: 0, padding: 0, minWidth: 0 }}
        >
          <label>
            E-mail confirmado
            <input
              className="input-field"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setResult(null);
                setRevision(0);
              }}
            />
          </label>
          <label>
            Senha do acesso
            <input
              className="input-field"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="btn btn-ghost"
            type="button"
            disabled={!email || !password}
            onClick={() => run(true)}
          >
            CONSULTAR MINHA INSCRIÇÃO
          </button>
          <label>
            Nome no jogo
            <input
              className="input-field"
              required
              minLength={2}
              maxLength={80}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </label>
          <label>
            Usuário do Instagram para verificação
            <input
              className="input-field"
              required
              maxLength={31}
              pattern="@?[A-Za-z0-9._]{1,30}"
              value={profile.instagram}
              onChange={(e) =>
                setProfile({ ...profile, instagram: e.target.value })
              }
            />
          </label>
          <NationalitySelect
            value={profile.nationality}
            onChange={(nationality) => setProfile({ ...profile, nationality })}
          />
          <label>
            Posição
            <select
              className="input-field"
              value={profile.position}
              onChange={(e) =>
                setProfile({ ...profile, position: e.target.value })
              }
            >
              {POS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </label>
          <details>
            <summary>Personalizar personagem</summary>
            <AppearanceEditor
              player={{ pixelAppearance: profile.pixelAppearance }}
              onChange={(pixelAppearance) =>
                setProfile({ ...profile, pixelAppearance })
              }
            />
          </details>
          <button
            className="btn btn-green"
            disabled={result && result.status !== "REJECTED"}
            type="submit"
          >
            {busy ? "AGUARDE…" : "ENVIAR PARA ANÁLISE"}
          </button>
        </fieldset>
      </form>
      {error && <p role="alert">{error}</p>}
      {result && (
        <div role="status" style={{ overflowWrap: "anywhere" }}>
          <p>{labels[result.status]}</p>
          <p>
            Identificador para a Federação: <code>{result.uid}</code>
          </p>
          {result.reason && <p>Motivo: {result.reason}</p>}
        </div>
      )}
    </section>
  );
}
