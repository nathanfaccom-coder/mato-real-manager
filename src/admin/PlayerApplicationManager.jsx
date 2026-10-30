import React, { useState } from "react";
import { isMainAdmin } from "./permissions.js";
import {
  reviewPlayerApplication,
  decidePlayerApplication,
} from "../services/game-auth.js";
export function PlayerApplicationManager({ user }) {
  const [uid, setUid] = useState(""),
    [application, setApplication] = useState(null),
    [reason, setReason] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  if (!isMainAdmin(user)) return null;
  async function run(task) {
    if (busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await task();
    } catch (e) {
      setApplication(null);
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function decide(approve) {
    await decidePlayerApplication({
      uid: application.uid,
      approve,
      expectedRevision: application.revision,
      reason,
    });
    setApplication(null);
    setReason("");
    setMessage("Decisão registrada. Consulte novamente para conferir.");
  }
  return (
    <section className="card" aria-label="Análise de novos jogadores">
      <h3>Inscrições de jogadores</h3>
      <p>
        Confirme sua identidade de ADM no formulário acima. Consulte o
        identificador recebido do candidato e confira os dados antes de decidir.
      </p>
      <fieldset disabled={busy} style={{ border: 0, padding: 0, minWidth: 0 }}>
        <label>
          Identificador do candidato
          <input
            className="input-field"
            maxLength={128}
            value={uid}
            onChange={(e) => {
              setUid(e.target.value.trim());
              setApplication(null);
              setReason("");
              setMessage("");
            }}
          />
        </label>
        <button
          className="btn btn-blue"
          disabled={!uid}
          onClick={() =>
            run(async () => {
              setApplication(null);
              const data = await reviewPlayerApplication({ uid });
              setApplication(data.application);
              if (!data.application)
                setMessage("Nenhuma inscrição encontrada.");
            })
          }
        >
          CONSULTAR INSCRIÇÃO
        </button>
        {application && (
          <div style={{ overflowWrap: "anywhere" }}>
            <p>
              <strong>{application.profile.name}</strong> —{" "}
              {application.profile.position} — {application.profile.nationality}
            </p>
            <p>Instagram para conferência: @{application.profile.instagram}</p>
            <p>
              Situação: {application.status} — revisão {application.revision}.
            </p>
            {application.reason && (
              <p>Motivo registrado: {application.reason}</p>
            )}
            {application.status === "PENDING" && (
              <>
                <label>
                  Motivo da decisão
                  <textarea
                    className="input-field"
                    maxLength={500}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </label>
                <p>
                  Aprovar cria o jogador e vincula o acesso em uma única
                  operação. O saldo inicial é zero; atributos seguem a posição.
                </p>
                <button
                  className="btn btn-green"
                  disabled={reason.trim().length < 3}
                  onClick={() => run(() => decide(true))}
                >
                  APROVAR E CRIAR JOGADOR
                </button>
                <button
                  className="btn btn-ghost"
                  disabled={reason.trim().length < 3}
                  onClick={() => run(() => decide(false))}
                >
                  RECUSAR INSCRIÇÃO
                </button>
              </>
            )}
          </div>
        )}
      </fieldset>
      {busy && <p role="status">Processando…</p>}
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
    </section>
  );
}
