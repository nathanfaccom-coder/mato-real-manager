import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { ASSISTANT_PERKS } from "../game/ASSISTANT_PERKS.js";
import { fmt } from "../game/fmt.js";

export const AssistantDashboard = ({
  assistant,
  team,
  players,
  offers,
  sales,
  onTrainRegen,
  onSelfAction,
  onEvolvePerk,
  onUseItem,
  setModal,
}) => {
  const [tab, setTab] = useState("REGEN");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const energy = assistant.energy !== undefined ? assistant.energy : 100;
  const isExhausted = energy < 20;
  const myItems = (sales || []).filter((s) => s.buyerId === assistant.id);

  const xpNext = assistant.level * 100;
  const progress = ((assistant.xp || 0) / xpNext) * 100;

  const showPerkSelection = assistant.pendingPerks > 0;
  const availablePerks = ASSISTANT_PERKS.filter(
    (p) => !(assistant.perks || []).some((cp) => cp.id === p.id),
  );
  const perkOptions = React.useMemo(
    () => availablePerks.sort(() => 0.5 - Math.random()).slice(0, 3),
    [assistant.pendingPerks],
  );

  const activePerks = assistant.perks || [];
  const hasCoffee = activePerks.some((p) => p.id === "COFFEE_LOVER");
  const costToTrain = hasCoffee ? 10 : 20;

  const handleTogglePlayer = (pid) => {
    if (selectedPlayers.includes(pid))
      setSelectedPlayers(selectedPlayers.filter((id) => id !== pid));
    else if (selectedPlayers.length < 5)
      setSelectedPlayers([...selectedPlayers, pid]);
    else alert("Máximo de 5 jogadores na banheira de gelo!");
  };

  const handleStudy = async () => {
    if (energy < 20) return alert("Você está exausto! Tome um energético.");
    let xpGain = Math.floor(Math.random() * 15) + 10;

    let newXp = (assistant.xp || 0) + xpGain;
    let newLevel = assistant.level;
    let pending = assistant.pendingPerks || 0;

    if (newXp >= newLevel * 100) {
      newXp -= newLevel * 100;
      newLevel++;
      if (newLevel % 3 === 0) pending++; // Ganha perk a cada 3 níveis
      alert(`🎉 Você subiu para o Nível ${newLevel}!`);
    }

    await firebase
      .firestore()
      .collection("users")
      .doc(assistant.id)
      .update({
        energy: energy - 20,
        xp: newXp,
        level: newLevel,
        pendingPerks: pending,
      });
    alert(`📚 Você estudou novas táticas e ganhou ${xpGain} XP!`);
  };

  return (
    <div>
      <div
        className="highlight-card"
        style={{
          textAlign: "center",
          paddingBottom: 30,
          position: "relative",
          border: "2px solid #2979FF",
          background: "linear-gradient(135deg, #001a33 0%, #000 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
          }}
        >
          <div
            style={{
              width: 65,
              height: 65,
              borderRadius: "50%",
              background: "#333",
              border: "2px solid #2979FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            {assistant.face ? (
              <img
                src={assistant.face}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "📋"
            )}
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#2979FF" }}>{assistant.name}</h2>
            <small style={{ color: "#ccc" }}>
              {team ? team.name : "Agente Livre"} | Auxiliar Nvl{" "}
              {assistant.level}
            </small>
          </div>
        </div>

        <div
          style={{
            margin: "15px auto",
            width: "80%",
            background: "#333",
            height: 10,
            borderRadius: 5,
            overflow: "hidden",
            border: "1px solid #555",
          }}
        >
          <div
            style={{
              width: `${energy}%`,
              background: energy > 50 ? "lime" : energy > 20 ? "orange" : "red",
              height: "100%",
              transition: "0.5s",
            }}
          ></div>
        </div>
        <small
          style={{ color: isExhausted ? "red" : "lime", fontWeight: "bold" }}
        >
          {energy}% Energia
        </small>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            marginTop: 15,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--success)",
              }}
            >
              {fmt(assistant.balance || 0)}
            </div>
            <span style={{ fontSize: 9, color: "#888" }}>CAIXA</span>
          </div>
          <div style={{ width: 1, background: "#333" }}></div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "var(--primary)",
              }}
            >
              {fmt(assistant.salary)}
            </div>
            <span style={{ fontSize: 9, color: "#888" }}>SALÁRIO</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#222",
            borderTop: "1px solid #444",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, progress)}%`,
              background: "linear-gradient(90deg, #2979FF, cyan)",
              height: "100%",
              transition: "1s",
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 5,
          marginBottom: 15,
          marginTop: 10,
          overflowX: "auto",
        }}
      >
        <button
          className={`btn ${tab === "REGEN" ? "btn-blue" : "btn-ghost"}`}
          onClick={() => setTab("REGEN")}
        >
          REGENERATIVO
        </button>
        <button
          className={`btn ${tab === "ESTUDO" ? "btn-green" : "btn-ghost"}`}
          onClick={() => setTab("ESTUDO")}
        >
          ESTUDAR
        </button>
        <button
          className={`btn ${tab === "MOCHILA" ? "btn-gold" : "btn-ghost"}`}
          onClick={() => setTab("MOCHILA")}
        >
          MOCHILA
        </button>
        <button
          className={`btn ${tab === "CARREIRA" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setTab("CARREIRA")}
        >
          CONTRATO
        </button>
      </div>

      {showPerkSelection && (
        <div
          className="card pulse-border"
          style={{ background: "rgba(41, 121, 255, 0.1)", marginBottom: 15 }}
        >
          <h3 style={{ color: "#2979FF", textAlign: "center", marginTop: 0 }}>
            ✨ ESPECIALIZAÇÃO TÉCNICA!
          </h3>
          <p style={{ textAlign: "center", fontSize: 11 }}>
            Escolha uma nova Habilidade:
          </p>
          <div style={{ display: "grid", gap: 5 }}>
            {perkOptions.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{ cursor: "pointer", border: "1px solid #555" }}
                onClick={() => onEvolvePerk(p)}
              >
                <b style={{ color: "#2979FF" }}>{p.name}</b>
                <br />
                <small>{p.desc}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "REGEN" && (
        <div className="animate-in">
          {!team ? (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: 40,
                border: "1px dashed #666",
              }}
            >
              <i
                className="fas fa-lock"
                style={{ fontSize: 40, color: "#444", marginBottom: 15 }}
              ></i>
              <p>Assine com um clube para acessar o campo de treinos.</p>
            </div>
          ) : (
            <div className="card" style={{ border: "1px dashed cyan" }}>
              <h3 style={{ color: "cyan", marginTop: 0 }}>
                🧊 Treino Regenerativo
              </h3>
              <p style={{ fontSize: 11, color: "#aaa" }}>
                Foque na recuperação física. O XP ganho é baixíssimo, mas os
                jogadores saem com as baterias recarregadas para o jogo.
                <br />
                <span style={{ color: "var(--warning)", fontWeight: "bold" }}>
                  Seu custo: -{costToTrain}⚡ Energia
                </span>
              </p>

              <button
                className="btn btn-blue"
                onClick={() => {
                  if (selectedPlayers.length === 0)
                    return alert("Selecione os jogadores (Max 5).");
                  onTrainRegen(selectedPlayers);
                  setSelectedPlayers([]);
                }}
              >
                INICIAR REGENERATIVO (-{costToTrain}⚡)
              </button>

              <p
                style={{
                  textAlign: "center",
                  color: "#888",
                  fontSize: 11,
                  margin: "10px 0",
                }}
              >
                👉 Selecione até <b>5 jogadores</b> muito cansados:
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  maxHeight: "250px",
                  overflowY: "auto",
                }}
              >
                {players
                  .filter((p) => p.teamId === team.id)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="card"
                      style={{
                        background: selectedPlayers.includes(p.id)
                          ? "rgba(0,255,255,0.1)"
                          : "#111",
                        border: selectedPlayers.includes(p.id)
                          ? "1px solid cyan"
                          : "1px solid #333",
                        cursor: "pointer",
                        padding: "10px",
                        opacity: (p.recoveryLeft || 0) > 0 ? 0.4 : 1,
                      }}
                      onClick={() => handleTogglePlayer(p.id)}
                    >
                      <div style={{ fontWeight: "bold", fontSize: 11 }}>
                        {p.name} {(p.recoveryLeft || 0) > 0 ? "🏥" : ""}
                      </div>
                      <div
                        style={{
                          margin: "4px 0",
                          background: "#222",
                          height: 6,
                          borderRadius: 3,
                          overflow: "hidden",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: `${p.energy || 0}%`,
                            height: "100%",
                            background:
                              (p.energy || 0) > 70
                                ? "lime"
                                : (p.energy || 0) > 30
                                  ? "orange"
                                  : "red",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: "#aaa",
                          textAlign: "right",
                        }}
                      >
                        {p.energy || 0}% ⚡
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "ESTUDO" && (
        <div
          className="animate-in card"
          style={{ textAlign: "center", border: "1px dashed #2979FF" }}
        >
          <h3 style={{ color: "#2979FF", marginTop: 0 }}>📚 Análise Tática</h3>
          <p style={{ fontSize: 11, color: "#aaa" }}>
            Estude esquemas adversários para subir de nível.
          </p>
          <button
            className="btn btn-blue"
            style={{ padding: "15px", fontSize: 14 }}
            onClick={handleStudy}
          >
            📖 ASSISTIR VÍDEOS (-20⚡)
          </button>
        </div>
      )}

      {tab === "MOCHILA" && (
        <div className="animate-in">
          <h3>🎒 Seus Itens Pessoais</h3>
          {myItems.length === 0 && (
            <p style={{ color: "#666", textAlign: "center" }}>
              Compre energéticos no Shopping!
            </p>
          )}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {myItems.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{ textAlign: "center", border: "1px solid #444" }}
              >
                <b>{item.productName}</b>
                {["energy", "SAUDE", "CONSUMIVEL"].includes(item.cat) && (
                  <button
                    className="btn btn-green"
                    style={{ fontSize: 10, marginTop: 5 }}
                    onClick={() => onUseItem(item)}
                  >
                    CONSUMIR (+{item.power}%)
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "CARREIRA" && (
        <div className="animate-in">
          {assistant.teamId !== "FREE" ? (
            <div className="card" style={{ border: "1px solid #444" }}>
              <h3>📝 Meu Contrato</h3>
              <p style={{ fontSize: 12 }}>
                Clube: <b>{team?.name}</b>
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 5,
                }}
              >
                <button
                  className="btn btn-blue"
                  onClick={() => onSelfAction("RAISE", assistant)}
                >
                  💰 PEDIR AUMENTO
                </button>
                <button
                  className="btn btn-gold"
                  onClick={() => onSelfAction("RESIGN_REQ", assistant)}
                >
                  👋 PEDIR PARA SAIR
                </button>
                <button
                  className="btn btn-red"
                  style={{ gridColumn: "span 2" }}
                  onClick={() => onSelfAction("BUYOUT", assistant)}
                >
                  💸 PAGAR MULTA (
                  {fmt(assistant.clause || assistant.salary * 10)})
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: "#666", textAlign: "center" }}>
              Você não tem contrato vigente.
            </p>
          )}

          <h3 style={{ marginTop: 20 }}>📩 Propostas Recebidas</h3>
          {offers
            .filter(
              (o) => o.recipientId === assistant.id && o.status !== "REJECTED",
            )
            .map((o) => (
              <div
                key={o.id}
                className="card"
                style={{
                  borderLeft: "4px solid var(--primary)",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <b>{o.teamName}</b>
                  <small style={{ color: "#aaa" }}>
                    {new Date(o.date || o.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <div style={{ fontSize: 12, marginTop: 5, marginBottom: 10 }}>
                  💰 Salário: <b style={{ color: "lime" }}>{fmt(o.salary)}</b> |
                  📅: <b>{o.contract} Temp.</b>
                </div>
                {o.status === "PENDING" && (
                  <div style={{ display: "flex", gap: 5 }}>
                    <button
                      className="btn btn-green"
                      onClick={() => onSelfAction("ACCEPT_OFFER", { offer: o })}
                    >
                      ACEITAR
                    </button>
                    <button
                      className="btn btn-red"
                      onClick={() => onSelfAction("REJECT_OFFER", { offer: o })}
                    >
                      RECUSAR
                    </button>
                  </div>
                )}
              </div>
            ))}
          {offers.filter(
            (o) => o.recipientId === assistant.id && o.status !== "REJECTED",
          ).length === 0 && (
            <small style={{ color: "#666" }}>Nenhuma proposta.</small>
          )}
        </div>
      )}
    </div>
  );
};
