import React, { useState } from "react";
import { isMainAdmin } from "./permissions.js";
import {
  reviewAccountBinding,
  bindAccountIdentity,
  changeAccountBinding,
  reauthenticateBindingOwner,
} from "../services/game-auth.js";

const types = {
  TEAM: "Time",
  PLAYER: "Jogador",
  COMPANY: "Empresa",
  PRESS: "Jornal",
  PRESS_WORKER: "Jornalista",
  COACH: "Técnico",
  DOCTOR: "Médico",
  SCOUT: "Olheiro",
  ASSISTANT: "Auxiliar",
};
export function AccountBindingManager({
  user,
  teams = [],
  players = [],
  companies = [],
  papers = [],
  journalists = [],
  coaches = [],
}) {
  const [uid, setUid] = useState(""),
    [type, setType] = useState("TEAM"),
    [entityId, setEntityId] = useState("");
  const [review, setReview] = useState(null),
    [reason, setReason] = useState(""),
    [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  if (!isMainAdmin(user)) return null;
  const lists = {
    TEAM: teams,
    PLAYER: players,
    COMPANY: companies,
    PRESS: papers,
    PRESS_WORKER: journalists,
  };
  const candidates = (
    lists[type] || coaches.filter((p) => p.type === type)
  ).filter((p) => p.status === "ACTIVE" && !p.isBot);
  const invalidate = () => {
    setReview(null);
    setReason("");
    setMessage("");
    setError("");
  };
  async function run(operation) {
    if (busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await operation();
    } catch (e) {
      setReview(null);
      setError(
        e.code?.startsWith("auth/")
          ? "Não foi possível confirmar a senha do ADM."
          : e.message,
      );
    } finally {
      setPassword("");
      setBusy(false);
    }
  }
  async function inspect(target) {
    setReview(null);
    setReason("");
    const result = await reviewAccountBinding(target);
    setReview(result);
  }
  const sameBinding =
    review?.binding &&
    review.profile?.type === review.binding.type &&
    review.profile?.entityId === review.binding.entityId;
  return (
    <section className="card" aria-label="Vínculos de acesso">
      <h3>Vincular acesso a um perfil</h3>
      <p>
        Confira o e-mail com o responsável pelo perfil. O identificador sozinho
        não comprova quem é o dono. A senha antiga do jogo não deve ser usada
        como prova.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(async () => {
            await reauthenticateBindingOwner(password);
            setReview(null);
            setMessage(
              "Identidade do ADM confirmada. Consulte o vínculo para continuar.",
            );
          });
        }}
      >
        <fieldset
          disabled={busy}
          style={{ border: 0, padding: 0, minWidth: 0 }}
        >
          <label>
            Sua senha de ADM
            <input
              className="input-field"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-ghost" type="submit">
            CONFIRMAR MINHA IDENTIDADE
          </button>
        </fieldset>
      </form>
      <fieldset disabled={busy} style={{ border: 0, padding: 0, minWidth: 0 }}>
        <label>
          Identificador do acesso (UID)
          <input
            className="input-field"
            value={uid}
            maxLength={128}
            onChange={(e) => {
              setUid(e.target.value.trim());
              invalidate();
            }}
          />
        </label>
        <button
          className="btn btn-blue"
          disabled={!uid}
          onClick={() => run(() => inspect({ uid }))}
        >
          CONSULTAR VÍNCULO ATUAL
        </button>
        <label>
          Tipo de perfil
          <select
            className="input-field"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setEntityId("");
              invalidate();
            }}
          >
            {Object.entries(types).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Perfil existente
          <select
            className="input-field"
            value={entityId}
            onChange={(e) => {
              setEntityId(e.target.value);
              invalidate();
            }}
          >
            <option value="">Selecione o perfil</option>
            {candidates.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.id}
              </option>
            ))}
          </select>
        </label>
        <button
          className="btn btn-blue"
          disabled={!uid || !entityId}
          onClick={() => run(() => inspect({ uid, type, entityId }))}
        >
          CONFERIR NOVO VÍNCULO
        </button>
        {review && (
          <div style={{ overflowWrap: "anywhere" }}>
            <p>
              E-mail do acesso: <strong>{review.email || "Sem e-mail"}</strong>{" "}
              — {review.emailVerified ? "confirmado" : "não confirmado"}
              {review.disabled ? " / acesso desativado" : ""}
            </p>
            <p>
              Perfil consultado:{" "}
              <strong>{review.profile?.name || "Nenhum"}</strong>
              {review.profile &&
                ` (${types[review.profile.type]} / ${review.profile.entityId})`}
            </p>
            {review.binding && (
              <p>
                Vínculo atual: {types[review.binding.type]} /{" "}
                {review.binding.entityId} —{" "}
                {review.binding.active ? "ativo" : "desativado"} — revisão{" "}
                {review.binding.revision}.
              </p>
            )}
            {review.canBind ? (
              <button
                className="btn btn-green"
                onClick={() =>
                  run(async () => {
                    await bindAccountIdentity({
                      uid: review.uid,
                      type: review.profile.type,
                      entityId: review.profile.entityId,
                    });
                    setReview(null);
                    setMessage(
                      "Vínculo registrado. Consulte novamente para conferir.",
                    );
                  })
                }
              >
                CONFIRMAR VÍNCULO COM ESTE PERFIL
              </button>
            ) : (
              !review.binding && (
                <p>
                  Este vínculo não pode ser criado. Confira confirmação do
                  e-mail, situação do perfil e se já existe outro responsável.
                </p>
              )
            )}
            {sameBinding && (
              <>
                <label>
                  Motivo da alteração
                  <textarea
                    className="input-field"
                    minLength={3}
                    maxLength={500}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </label>
                <button
                  className="btn btn-ghost"
                  disabled={
                    reason.trim().length < 3 ||
                    (!review.binding.active &&
                      (!review.emailVerified ||
                        review.disabled ||
                        !review.profile.eligible ||
                        !review.profile.available))
                  }
                  onClick={() =>
                    run(async () => {
                      await changeAccountBinding({
                        uid: review.uid,
                        active: !review.binding.active,
                        expectedRevision: review.binding.revision,
                        reason: reason.trim(),
                      });
                      setReview(null);
                      setReason("");
                      setMessage(
                        "Situação do vínculo atualizada. Consulte novamente para conferir.",
                      );
                    })
                  }
                >
                  {review.binding.active
                    ? "DESATIVAR VÍNCULO"
                    : "REATIVAR VÍNCULO"}
                </button>
                <p>
                  Desativar bloqueia o acesso, mas mantém o perfil reservado
                  para essa identidade.
                </p>
              </>
            )}
          </div>
        )}
      </fieldset>
      {busy && <p role="status">Processando…</p>}
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
