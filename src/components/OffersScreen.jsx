import React, { useState, useEffect } from "react";
import { db } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";

export const OffersScreen = ({
  user,
  offers,
  teams,
  players,
  setModal,
  onAccept,
  onReject,
  onCounter,
  onCoachAccept,
  onCoachReject,
  onCoachCounter,
}) => {
  // FILTRO RIGOROSO:
  // A proposta só aparece se o usuário logado for o destinatário atual (recipientId).
  // Isso garante o fluxo: Comprador -> Vendedor -> Jogador.
  // Ao enviar uma contraproposta, o recipientId muda e ela some automaticamente daqui.
  const myOffers = offers.filter(
    (o) =>
      o.recipientId === user.data.id &&
      (o.status === "PENDING" || o.status === "COUNTERED") && // Aceita PENDING e COUNTERED
      o.status !== "REJECTED",
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <h3 style={{ margin: 0 }}>Caixa de Entrada ({myOffers.length})</h3>
        <button
          className="btn btn-ghost"
          style={{ width: "auto", padding: "5px 10px" }}
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-sync"></i> ATUALIZAR
        </button>
      </div>

      {myOffers.length === 0 && (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <i
            className="fas fa-envelope-open"
            style={{ fontSize: 40, color: "#333", marginBottom: 10 }}
          ></i>
          <p style={{ color: "#666" }}>
            Nenhuma proposta aguardando sua ação no momento.
          </p>
        </div>
      )}

      {myOffers.map((o) => (
        <div
          key={o.id}
          className="card"
          style={{
            borderLeft:
              o.type === "COACH_SUGGESTION"
                ? "4px solid #FFD700"
                : o.type === "SUGESTAO_RESPOSTA"
                  ? o.accepted
                    ? "4px solid lime"
                    : "4px solid red"
                  : o.type.includes("URGENTE")
                    ? "4px solid red"
                    : o.type === "NOTIFICACAO"
                      ? "4px solid #00E676"
                      : o.type === "COACH_OFFER"
                        ? "4px solid gold"
                        : "4px solid var(--primary)",
            background: "#1e1e1e",
          }}
        >
          {/* --- CASO 1: INDICAÇÃO DO TÉCNICO (Novo) --- */}
          {o.type === "COACH_SUGGESTION" ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <b style={{ color: "gold" }}>💡 Indicação de Contratação</b>
                <small style={{ color: "#aaa" }}>
                  {new Date(o.date).toLocaleDateString()}
                </small>
              </div>
              <div style={{ fontSize: 13, margin: "10px 0", color: "#fff" }}>
                O técnico <b>{o.senderName}</b> sugere a contratação de:
                <div
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 5,
                    border: "1px solid gold",
                  }}
                >
                  👟 <b>{o.playerName}</b>{" "}
                  <small>
                    ({o.playerPos} - OV: {o.playerOv})
                  </small>
                  <br />
                  <i style={{ fontSize: 11, color: "#ccc" }}>
                    "
                    {o.description.split('Obs: "')[1]?.replace('"', "") ||
                      "Sem observações"}
                    "
                  </i>
                </div>
              </div>

              {user.type === "USER" && (
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-green"
                    onClick={() => {
                      const pObj = players.find((p) => p.id === o.playerId);
                      if (!pObj)
                        return alert(
                          "Jogador não encontrado (talvez aposentado).",
                        );

                      // 1. Abre o Modal de Oferta usando a prop setModal recebida
                      setModal({ type: "OFFER", data: pObj });

                      // 2. Avisa o Técnico
                      db.collection("offers").add({
                        type: "SUGESTAO_RESPOSTA",
                        recipientId: o.senderId,
                        accepted: true,
                        description: `A diretoria acatou sua indicação e abriu negociações com ${o.playerName}. Torça para dar certo!`,
                        date: Date.now(),
                      });

                      // 3. Remove a indicação da caixa de entrada
                      db.collection("offers").doc(o.id).delete();
                    }}
                  >
                    TENTAR NEGOCIAÇÃO
                  </button>

                  <button
                    className="btn btn-red"
                    onClick={() => {
                      const reasons = [
                        "Jogador muito caro para o orçamento.",
                        "Não temos interesse neste perfil.",
                        "Posição já está inchada no elenco.",
                        "Prioridade é a base no momento.",
                      ];
                      const reasonTxt = reasons
                        .map((r, i) => `${i + 1}. ${r}`)
                        .join("\n");
                      const opt = prompt(
                        `Motivo da Recusa (Digite o número ou texto):\n\n${reasonTxt}`,
                      );

                      if (opt !== null) {
                        let finalReason = "Decisão da diretoria.";
                        if (opt == "1") finalReason = reasons[0];
                        else if (opt == "2") finalReason = reasons[1];
                        else if (opt == "3") finalReason = reasons[2];
                        else if (opt == "4") finalReason = reasons[3];
                        else if (opt.trim() !== "") finalReason = opt;

                        db.collection("offers")
                          .add({
                            type: "SUGESTAO_RESPOSTA",
                            recipientId: o.senderId,
                            accepted: false,
                            status: "PENDING",
                            description: `A diretoria recusou ${o.playerName}.\nMotivo: ${finalReason}`,
                            date: Date.now(),
                          })
                          .then(() => {
                            db.collection("offers").doc(o.id).delete();
                            alert("Indicação recusada e técnico notificado.");
                          });
                      }
                    }}
                  >
                    RECUSAR
                  </button>
                </div>
              )}
            </div>
          ) : o.type === "SUGESTAO_RESPOSTA" ? (
            /* --- CASO 2: RESPOSTA DA DIRETORIA PARA O TÉCNICO (Novo) --- */
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <b style={{ color: o.accepted ? "lime" : "red" }}>
                  {o.accepted ? "✅ INDICAÇÃO ACEITA" : "❌ INDICAÇÃO RECUSADA"}
                </b>
                <small style={{ color: "#aaa" }}>
                  {new Date(o.date).toLocaleDateString()}
                </small>
              </div>
              <div
                style={{
                  background: "#222",
                  padding: 10,
                  borderRadius: 5,
                  margin: "10px 0",
                  fontSize: 12,
                  color: "#ddd",
                  border: o.accepted ? "1px solid lime" : "1px solid red",
                }}
              >
                {o.description}
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => db.collection("offers").doc(o.id).delete()}
              >
                ENTENDIDO
              </button>
            </div>
          ) : o.type === "COACH_OFFER" ? (
            /* --- CASO 3: CONTRATO DE TÉCNICO --- */
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <b>
                  {o.status === "COUNTERED"
                    ? `🔄 Contra-Proposta: ${o.coachName}`
                    : `🤝 Proposta de Emprego: ${o.teamName}`}
                </b>
                <small style={{ color: "#aaa" }}>
                  {new Date(o.createdAt || o.date).toLocaleDateString()}
                </small>
              </div>
              <div
                style={{
                  fontSize: 12,
                  marginTop: 10,
                  marginBottom: 10,
                  background: "rgba(255,255,255,0.05)",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <div>
                  💰 Salário: <b style={{ color: "lime" }}>{fmt(o.salary)}</b>
                </div>
                <div>
                  📅 Contrato: <b>{o.contract} Temporadas</b>
                </div>
                <div>
                  🔒 Multa: <b style={{ color: "red" }}>{fmt(o.clause)}</b>
                </div>
              </div>

              <div style={{ display: "flex", gap: 5 }}>
                {/* VISÃO DO DONO DO TIME (Recebendo Contra-Proposta) */}
                {user.type === "USER" && o.status === "COUNTERED" && (
                  <>
                    <button
                      className="btn btn-green"
                      onClick={() => onCoachAccept(o)}
                    >
                      ACEITAR CONDIÇÕES
                    </button>
                    <button
                      className="btn btn-red"
                      onClick={() => onCoachReject(o)}
                    >
                      CANCELAR
                    </button>
                  </>
                )}

                {/* VISÃO DA COMISSÃO TÉCNICA (Recebendo Proposta Inicial) */}
                {["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(
                  user.type,
                ) &&
                  o.status === "PENDING" && (
                    <>
                      <button
                        className="btn btn-green"
                        onClick={() => onCoachAccept(o)}
                      >
                        ACEITAR
                      </button>
                      {(user.data.level >= 2 || user.type !== "COACH") && (
                        <button
                          className="btn btn-blue"
                          onClick={() => onCoachCounter(o)}
                        >
                          NEGOCIAR
                        </button>
                      )}
                      <button
                        className="btn btn-red"
                        onClick={() => onCoachReject(o)}
                      >
                        RECUSAR
                      </button>
                    </>
                  )}
              </div>
            </div>
          ) : (
            /* --- CASO 4: TRANSFERÊNCIA DE JOGADOR (PADRÃO) --- */
            <div>
              {/* AVISOS DE STATUS REALISTA PARA O JOGADOR */}
              {o.sellerAccepted && user.type === "PLAYER" && (
                <div
                  style={{
                    background: "rgba(0,230,118,0.2)",
                    color: "var(--primary)",
                    padding: "6px",
                    borderRadius: 8,
                    fontSize: 10,
                    marginBottom: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid var(--primary)",
                  }}
                >
                  ✅ O SEU CLUBE ACEITOU A VENDA. DEPENDE DE VOCÊ!
                </div>
              )}

              {!o.sellerAccepted &&
                user.type === "PLAYER" &&
                o.sellerId !== "FREE" && (
                  <div
                    style={{
                      background: "rgba(255,196,0,0.1)",
                      color: "var(--warning)",
                      padding: "6px",
                      borderRadius: 8,
                      fontSize: 10,
                      marginBottom: 10,
                      textAlign: "center",
                      fontWeight: "bold",
                      border: "1px solid var(--warning)",
                    }}
                  >
                    ⏳ SEU CLUBE AINDA ESTÁ ANALISANDO A TAXA DE TRANSFERÊNCIA.
                  </div>
                )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b style={{ color: "var(--primary)", fontSize: 16 }}>
                  {o.playerName}
                </b>
                <span
                  style={{
                    fontSize: 10,
                    background: o.type === "NOTIFICACAO" ? "#00E676" : "gold",
                    color: "black",
                    padding: "2px 5px",
                    borderRadius: 4,
                    fontWeight: "bold",
                  }}
                >
                  {o.type}
                </span>
              </div>
              <small
                style={{ display: "block", marginBottom: 10, color: "#aaa" }}
              >
                {o.type === "NOTIFICACAO" ? "Remetente:" : "Interessado:"}{" "}
                <b style={{ color: "#fff" }}>{o.buyerName}</b>
              </small>

              <div
                style={{
                  background: "#121212",
                  padding: 12,
                  borderRadius: 8,
                  whiteSpace: "pre-wrap",
                  fontSize: 12,
                  border: "1px solid #333",
                  lineHeight: "1.5",
                  color: "#eee",
                  marginBottom: 10,
                }}
              >
                {o.description}
              </div>

              {o.type === "NOTIFICACAO" ? (
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-green"
                    style={{ width: "100%" }}
                    onClick={() => onAccept(o)}
                  >
                    <i className="fas fa-check"></i> ENTENDIDO
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-green"
                    style={{ flex: 1 }}
                    onClick={() => onAccept(o)}
                  >
                    ACEITAR
                  </button>
                  <button
                    className="btn btn-blue"
                    style={{ flex: 1 }}
                    onClick={() => onCounter(o)}
                  >
                    CONTRA
                  </button>
                  <button
                    className="btn btn-red"
                    style={{ flex: 1 }}
                    onClick={() => onReject(o)}
                  >
                    RECUSAR
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
