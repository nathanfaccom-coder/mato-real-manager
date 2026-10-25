import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";
import { getSalaryLimits } from "../game/getSalaryLimits.js";
import { PlayerCard } from "./PlayerCard.jsx";
import { fmt } from "../game/fmt.js";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";

export const OfferForm = ({ target, myPlayers, onSend, setModal, user }) => {
  const old = target.oldOffer || {};
  const isCounter = !!old.id;
  const isPlayerActing =
    user?.type === "PLAYER" ||
    ["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(user?.type);
  const clubsHaveAgreed = old?.sellerAccepted === true;
  const isUrgentRenewal = old?.type === "RENOVACAO_URGENTE";

  // Identifica se é Comissão Técnica ou Jogador
  const isStaff = ["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(
    target.type,
  );

  const isFreeAgent = target.teamId === "FREE" || !target.teamId;
  const isMyPlayer = user?.type === "USER" && user.data.id === target.teamId;

  // Esconde a Parte 1 (Clubes) se for Staff, Agente Livre ou seu próprio funcionário
  const shouldHidePart1 =
    isPlayerActing ||
    clubsHaveAgreed ||
    isUrgentRenewal ||
    isFreeAgent ||
    isMyPlayer ||
    isStaff;

  const maxLoanAllowed = parseInt(target.contract) || 1;

  // Se for Staff, os limites são abertos. Se for jogador, usa a tabela de Overall.
  const limits = isStaff
    ? { minSal: 1000, maxSal: 9999999 }
    : getSalaryLimits(target.overall);

  const [t, setT] = useState(old.type || (isMyPlayer ? "RENOVACAO" : "COMPRA"));
  const [v, setV] = useState(old.value || "");
  const [sal, setSal] = useState(
    old.meta?.newSalary || target.salary || limits.minSal,
  );
  const [con, setCon] = useState(old.offerContract || "1");
  const [role, setRole] = useState(
    old.meta?.role || (isStaff ? "STAFF" : "ROTACAO"),
  );
  const [hasBuyOption, setHasBuyOption] = useState(
    old.meta?.hasBuyOption || false,
  );

  const [meta, setMeta] = useState(
    old.meta || {
      sellOn: 0,
      installments: 1,
      signingBonus: 0,
      loanDuration: 1,
      salarySplit: 100,
      buyOpt: 0,
    },
  );
  const [swaps, setSwaps] = useState(old.swapPlayerIds || []);

  const toggleSwap = (id) => {
    if (swaps.length >= 3 && !swaps.includes(id))
      return alert("Máximo de 3 jogadores!");
    setSwaps((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const isPreContract = t === "PRE_CONTRATO";

  return (
    <div className="modal-bg">
      <div className="modal-content" style={{ maxWidth: "500px" }}>
        <h3 style={{ color: "var(--primary)" }}>
          {isUrgentRenewal
            ? "🚨 Renovação Obrigatória"
            : isPreContract
              ? "📝 Pré-Contrato"
              : isCounter
                ? "Responder Proposta"
                : `Negociar ${target.name}`}
        </h3>
        <PlayerCard
          player={target}
          teamName={isFreeAgent ? "Agente Livre" : target.teamId}
        />
        {/* --- PAINEL DE REFERÊNCIA DE VALORES --- */}
        {!isPreContract && !isUrgentRenewal && !isStaff && (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              border: "1px solid #444",
              fontSize: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span style={{ color: "#aaa" }}>Valor de Mercado (OVR):</span>
              <b style={{ color: "#00E676" }}>
                {fmt(getRecommendedPrice(target.overall, target.position))}
              </b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#aaa" }}>
                Valor Estipulado pelo Clube:
              </span>
              <b style={{ color: "#fff" }}>{fmt(target.value)}</b>
            </div>
          </div>
        )}

        {/* AVISO DE PRÉ-CONTRATO */}
        {isPreContract && (
          <div
            style={{
              background: "rgba(41, 121, 255, 0.2)",
              padding: 10,
              borderRadius: 8,
              border: "1px solid var(--secondary)",
              marginBottom: 15,
              fontSize: 12,
              color: "#fff",
            }}
          >
            ℹ️ <b>ASSINATURA LIVRE:</b> O jogador tem menos de 6 meses de
            contrato protegido.
            <br />
            Ele virá <b>de graça</b> para o seu time apenas no início da{" "}
            <b>próxima temporada</b>.
          </div>
        )}

        {/* 1. ACORDO ENTRE CLUBES (FINANCEIRO) */}
        {/* Se for pré-contrato, esconde essa parte pois não tem taxa */}
        {!shouldHidePart1 && !isPreContract ? (
          <div
            style={{
              borderBottom: "1px solid #444",
              paddingBottom: 15,
              marginBottom: 15,
            }}
          >
            <label
              style={{ fontSize: "11px", color: "gold", fontWeight: "bold" }}
            >
              1. ACORDO ENTRE CLUBES (FINANCEIRO)
            </label>
            <div style={{ display: "flex", gap: 5, margin: "10px 0" }}>
              {["COMPRA", "EMPRESTIMO", "TROCA"].map((x) => (
                <button
                  key={x}
                  className={`btn ${t === x ? "btn-green" : "btn-ghost"}`}
                  onClick={() => setT(x)}
                  style={{ flex: 1 }}
                >
                  {x}
                </button>
              ))}
            </div>

            <label>
              {t === "EMPRESTIMO"
                ? "Taxa de Empréstimo (₣)"
                : "Taxa de Transferência (₣)"}
            </label>
            <MoneyInput
              className="input-field"

              value={v}
              onChange={(e) => setV(e.target.value)}
            />

            {t === "EMPRESTIMO" && (
              <div
                className="card"
                style={{ background: "#222", padding: "10px", marginTop: 10 }}
              >
                <label style={{ fontSize: "11px" }}>
                  Duração (Máx: {maxLoanAllowed} Temp.)
                </label>
                <input
                  className="input-field"
                  type="number"
                  min="1"
                  max={maxLoanAllowed}
                  value={meta.loanDuration}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setMeta({
                      ...meta,
                      loanDuration:
                        val > maxLoanAllowed ? maxLoanAllowed : val || 1,
                    });
                  }}
                />

                <div
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <label style={{ fontSize: "11px" }}>Opção de Compra?</label>
                  <button
                    className={`btn ${hasBuyOption ? "btn-green" : "btn-ghost"}`}
                    style={{ width: "60px", padding: "5px", marginBottom: 0 }}
                    onClick={() => setHasBuyOption(true)}
                  >
                    SIM
                  </button>
                  <button
                    className={`btn ${!hasBuyOption ? "btn-red" : "btn-ghost"}`}
                    style={{ width: "60px", padding: "5px", marginBottom: 0 }}
                    onClick={() => {
                      setHasBuyOption(false);
                      setMeta({ ...meta, buyOpt: 0 });
                    }}
                  >
                    NÃO
                  </button>
                </div>

                {hasBuyOption && (
                  <div>
                    <label style={{ fontSize: "11px" }}>
                      Valor da Opção (₣)
                    </label>
                    <MoneyInput
                      className="input-field"

                      value={meta.buyOpt}
                      onChange={(e) =>
                        setMeta({ ...meta, buyOpt: parseFloat(e.target.value) })
                      }
                    />
                  </div>
                )}

                <label
                  style={{ marginTop: 10, display: "block", fontSize: "11px" }}
                >
                  Divisão Salarial (Comprador paga: {meta.salarySplit}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={meta.salarySplit}
                  onChange={(e) =>
                    setMeta({ ...meta, salarySplit: parseInt(e.target.value) })
                  }
                  style={{ width: "100%", accentColor: "var(--primary)" }}
                />
              </div>
            )}

            {t === "TROCA" && (
              <div
                className="card"
                style={{ background: "#222", padding: "10px", marginTop: 10 }}
              >
                <small style={{ display: "block", marginBottom: 10 }}>
                  Selecionar jogadores (Máx 3):
                </small>
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  {(myPlayers || []).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => toggleSwap(p.id)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        cursor: "pointer",
                        background: swaps.includes(p.id)
                          ? "var(--primary)"
                          : "#333",
                        color: swaps.includes(p.id) ? "#000" : "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{p.name}</span>
                      <b>OV: {p.overall}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {t === "COMPRA" && (
              <div
                className="card"
                style={{ background: "#222", padding: "10px", marginTop: 10 }}
              >
                <small>
                  📦 PARCELAMENTO: <b>{meta.installments}x</b>
                </small>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={meta.installments}
                  onChange={(e) =>
                    setMeta({ ...meta, installments: parseInt(e.target.value) })
                  }
                  style={{ width: "100%" }}
                />
                <hr style={{ borderColor: "#444", margin: "10px 0" }} />
                <small>
                  📈 REVENDA FUTURA:{" "}
                  <b style={{ color: "gold" }}>{meta.sellOn}%</b>
                </small>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={meta.sellOn}
                  onChange={(e) =>
                    setMeta({ ...meta, sellOn: parseInt(e.target.value) })
                  }
                  style={{ width: "100%", accentColor: "gold" }}
                />
              </div>
            )}
          </div>
        ) : !isPreContract ? (
          /* VISÃO BLOQUEADA (Normal) */
          <div
            style={{
              background: "rgba(0,230,118,0.05)",
              padding: 12,
              borderRadius: 8,
              marginBottom: 15,
              fontSize: 11,
              border: "1px solid var(--primary)",
            }}
          >
            <b style={{ color: "gold", display: "block", marginBottom: 5 }}>
              <i className="fas fa-lock"></i> ACORDO SELADO:
            </b>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 5,
                color: "#ccc",
              }}
            >
              <span>
                Tipo: <b>{isUrgentRenewal ? "RENOVAÇÃO" : t}</b>
              </span>
              {!isUrgentRenewal && (
                <span>
                  Valor: <b>{fmt(v)}</b>
                </span>
              )}
              {t === "EMPRESTIMO" && (
                <span>
                  Duração: <b>{meta.loanDuration} Temp.</b>
                </span>
              )}
              {t === "COMPRA" && meta.sellOn > 0 && (
                <span style={{ color: "gold" }}>
                  Revenda: <b>{meta.sellOn}%</b>
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* 2. TERMOS PESSOAIS (JOGADOR x COMPRADOR) */}
        <div>
          <label
            style={{ fontSize: "11px", color: "cyan", fontWeight: "bold" }}
          >
            2. CONTRATO PESSOAL DO ATLETA
          </label>

          <div
            style={{
              background: "rgba(0,230,118,0.05)",
              padding: "10px",
              borderRadius: "8px",
              marginTop: 10,
              border: "1px dashed var(--primary)",
            }}
          >
            <label
              style={{
                color: "var(--primary)",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              💰 Luvas / Bônus de Assinatura (₣)
            </label>
            <MoneyInput
              className="input-field"

              value={meta.signingBonus}
              onChange={(e) =>
                setMeta({ ...meta, signingBonus: parseFloat(e.target.value) })
              }
            />
          </div>

          {/* MOSTRADOR DE FAIXA SALARIAL */}
          <div style={{ marginTop: 10 }}>
            <label>Salário Semanal (₣)</label>
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              Faixa Permitida:{" "}
              <span style={{ color: "#2979FF", fontWeight: "bold" }}>
                {fmt(limits.minSal)} - {fmt(limits.maxSal)}
              </span>
            </div>
            <MoneyInput
              className="input-field"

              value={sal}
              onChange={(e) => setSal(e.target.value)}
            />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label>
                {t === "EMPRESTIMO" ? "Duração (Fixo)" : "Contrato (Anos)"}
              </label>
              <input
                className="input-field"
                type="number"
                value={t === "EMPRESTIMO" ? meta.loanDuration : con}
                disabled={t === "EMPRESTIMO"}
                onChange={(e) => setCon(e.target.value)}
              />
            </div>
            <div>
              <label>Papel</label>
              <select
                className="input-field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="CRUCIAL">⭐ Crucial</option>
                <option value="TITULAR">✅ Titular</option>
                <option value="ROTACAO">🔄 Rotação</option>
                <option value="RESERVA">💤 Reserva</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button
            className="btn btn-green"
            style={{ flex: 2 }}
            onClick={() => {
              const finalSal = parseFloat(sal);
              // --- TRAVA DE SALÁRIO NA NEGOCIAÇÃO ---
              if (finalSal < limits.minSal || finalSal > limits.maxSal) {
                return alert(
                  `🚫 SALÁRIO INVÁLIDO!\nO valor deve estar entre ${fmt(limits.minSal)} e ${fmt(limits.maxSal)} para este jogador (Over ${target.overall}).`,
                );
              }

              // Se for pré-contrato, o valor é 0
              const finalVal =
                isPreContract || isFreeAgent || isMyPlayer ? 0 : v;
              onSend(
                target,
                t,
                finalVal,
                swaps,
                t === "EMPRESTIMO" ? meta.loanDuration : con,
                {
                  ...meta,
                  hasBuyOption,
                  newSalary: finalSal,
                  role,
                  status: "PENDING",
                },
                old,
              );
            }}
          >
            {isCounter
              ? "ENVIAR CONTRA-PROPOSTA"
              : isMyPlayer
                ? "OFERECER RENOVAÇÃO"
                : "ENVIAR PROPOSTA"}
          </button>
          <button
            className="btn btn-red"
            style={{ flex: 1 }}
            onClick={() => setModal(null)}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};
