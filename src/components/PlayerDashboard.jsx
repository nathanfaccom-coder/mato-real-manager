import React, { useState, useEffect } from "react";
import { firebase, db } from "../services/firebase.js";
import { PlayerCard } from "./PlayerCard.jsx";
import { fmt } from "../game/fmt.js";

export const PlayerDashboard = ({
  user,
  player,
  team,
  sales,
  onUpdatePassword,
  onAction,
  onTrainSolo,
  onUseItem,
  setModal,
}) => {
  const [newPass, setNewPass] = useState("");
  const [tab, setTab] = useState("PERFIL");
  const [trainType, setTrainType] = useState("FISICO_BASE");

  // Itens na Mochila (filtra sales onde eu sou comprador)
  const myItems = (sales || []).filter((s) => s.buyerId === player.id);

  const getXpCostDisplay = (ovr) => {
    if (ovr <= 50) return 50;
    if (ovr <= 60) return 80;
    if (ovr <= 70) return 150;
    if (ovr <= 80) return 300;
    if (ovr <= 85) return 600;
    if (ovr <= 90) return 1000;
    return 2000;
  };

  const currentCost = getXpCostDisplay(player.overall || 50);
  const xpCurrent = (player.xp || 0) + (player.pendingXP || 0);
  const pointsToGain =
    Math.floor(Math.abs(xpCurrent) / currentCost) * (xpCurrent < 0 ? -1 : 1);
  const xpRest = Math.abs(xpCurrent) % currentCost;

  const attrCount = player.attributes
    ? Object.keys(player.attributes).length
    : 30;
  const projectedOvIncrease = Math.floor(pointsToGain / (attrCount * 0.75)); // Estimativa com a nova regra de 75%

  const xpNeededForNextOv = attrCount * currentCost;
  const currentProgressForOv = Math.abs(xpCurrent) % xpNeededForNextOv;
  const missingXpForOv = xpNeededForNextOv - currentProgressForOv;
  const avgSoloXp = 11.5; // Nova média do treino solo (8 a 15)
  const estSoloTrains = Math.ceil(missingXpForOv / avgSoloXp);
  // ----------------------------------------------------------

  const energy = player.energy !== undefined ? player.energy : 100;

  // --- FUNÇÃO PARA UPLOAD DE ROSTO (COM COMPRESSÃO) ---
  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Lê o arquivo
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = async () => {
        // 2. Cria um Canvas para redimensionar (Compressão)
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Define tamanho máximo para ícone (200px é perfeito e leve)
        const MAX_SIZE = 200;
        let width = img.width;
        let height = img.height;

        // Redimensiona mantendo a proporção
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenha a imagem redimensionada no canvas
        ctx.drawImage(img, 0, 0, width, height);

        // 3. Converte para Texto Base64 leve (JPEG qualidade 0.8)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

        if (confirm("Salvar esta foto de perfil?")) {
          try {
            await db
              .collection("players")
              .doc(player.id)
              .update({ face: dataUrl });
            alert("Foto atualizada com sucesso!");
          } catch (error) {
            console.error(error);
            alert("Erro ao salvar: " + error.message);
          }
        }
      };
    };
  };

  const ATTR_LIST = [
    { k: "weakFootAcc", l: "Pior Pé Precisão", i: "🦶" },
    { k: "shot", l: "Finalização", i: "🥅" },
    { k: "condition", l: "Condição Física", i: "💪" },
    { k: "stamina", l: "Resistência", i: "🔋" },
    { k: "header", l: "Cabeceio", i: "🤕" },
    { k: "attack", l: "Ataque", i: "⚔️" },
    { k: "weakFootFreq", l: "Pior Pé Frequência", i: "🔄" },
    { k: "longPassSpd", l: "Passe Longo Velocidade", i: "🚀" },
    { k: "teamwork", l: "Trabalho em Equipe", i: "🤝" },
    { k: "freeKick", l: "Falta", i: "🎯" },
    { k: "aggression", l: "Agressividade", i: "😡" },
    { k: "defense", l: "Defesa", i: "🛡️" },
    { k: "tech", l: "Técnica", i: "✨" },
    { k: "dribbleSpd", l: "Drible Velocidade", i: "💨" },
    { k: "mentality", l: "Atitude", i: "🧠" },
    { k: "shotTech", l: "Técnica de Chute", i: "👟" },
    { k: "balance", l: "Equilíbrio", i: "⚖️" },
    { k: "shortPass", l: "Passe Curto", i: "🎯" },
    { k: "longPass", l: "Passe Longo", i: "📡" },
    { k: "shortPassSpd", l: "Passe Curto Velocidade", i: "⏩" },
    { k: "accel", l: "Aceleração", i: "🏎️" },
    { k: "gk", l: "Habilidade Goleiro", i: "🧤" },
    { k: "shotPower", l: "Força do Chute", i: "💣" },
    { k: "jump", l: "Impulsão", i: "🦘" },
    { k: "speed", l: "Velocidade Máxima", i: "⚡" },
    { k: "curve", l: "Efeito", i: "🍌" },
    { k: "response", l: "Resposta", i: "💡" },
    { k: "dribble", l: "Drible", i: "⚽" },
    { k: "agility", l: "Agilidade", i: "🤸" },
  ];

  const getAttrColor = (val) => {
    if (!val) return "#666";
    if (val < 50) return "#ff5e5e";
    if (val < 70) return "#ffbb33";
    return "#00C851";
  };

  const badges = [];
  const s = player.stats || {};
  if (s.goals >= 1)
    badges.push({ icon: "⚽", name: "Primeiro Gol", color: "#fff" });
  if (s.goals >= 10)
    badges.push({ icon: "🔥", name: "Artilheiro", color: "gold" });
  if (s.assists >= 10)
    badges.push({ icon: "🎩", name: "Maestro", color: "var(--secondary)" });
  if (s.tackles >= 10)
    badges.push({ icon: "🧱", name: "Paredão", color: "#aaa" });
  if (player.overall >= 80)
    badges.push({ icon: "⭐", name: "Craque", color: "var(--purple)" });

  return (
    <div>
      {/* CABEÇALHO COM A CARTA FIFA E BARRAS */}
      <div
        className="highlight-card"
        style={{
          textAlign: "center",
          paddingBottom: 30,
          position: "relative",
          paddingTop: 20,
        }}
      >
        <PlayerCard
          player={player}
          teamName={team?.name}
          teamLogo={team?.logo}
          onFaceUpload={handleFaceUpload}
        />

        <h3 style={{ margin: 0 }}>
          {String(player.mood || "😐")} {team?.name || "Agente Livre"}
        </h3>

        {/* MOSTRADOR DE FAMA */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            display: "inline-block",
            padding: "5px 15px",
            borderRadius: 20,
            marginTop: 5,
            border: "1px solid gold",
          }}
        >
          <span style={{ color: "gold", fontWeight: "bold", fontSize: 12 }}>
            💎 FAMA: {String(player.fame || 0)}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginTop: 15,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: "var(--warning)",
                  lineHeight: 1,
                }}
              >
                {String(player.overall)}
              </div>
              {projectedOvIncrease > 0 && (
                <span
                  className="pulse"
                  style={{
                    fontSize: 12,
                    color: "#00E676",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i className="fas fa-arrow-up" style={{ marginRight: 2 }}></i>
                  {projectedOvIncrease}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                color: "#888",
              }}
            >
              Overall
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: "900",
                color: energy > 50 ? "var(--primary)" : "var(--danger)",
                lineHeight: 1,
              }}
            >
              {String(energy)}%
            </div>
            <span
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                color: "#888",
              }}
            >
              Energia
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#333",
          }}
        >
          <div
            style={{
              width: `${xpRest}%`,
              height: "100%",
              background: "linear-gradient(90deg, var(--warning), gold)",
              transition: "1s",
            }}
          ></div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 5,
            fontSize: 9,
            color: "#fff",
            textShadow: "0 1px 2px black",
          }}
        >
          Próx. Ponto: {xpRest} / {currentCost} XP
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 15,
          overflowX: "auto",
        }}
      >
        <button
          className={`btn ${tab === "PERFIL" ? "btn-blue" : "btn-ghost"}`}
          onClick={() => setTab("PERFIL")}
        >
          PERFIL
        </button>
        <button
          className={`btn ${tab === "ACOES" ? "btn-red" : "btn-ghost"}`}
          onClick={() => setTab("ACOES")}
        >
          AÇÕES
        </button>
        <button
          className={`btn ${tab === "CARREIRA" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setTab("CARREIRA")}
        >
          CARREIRA
        </button>
        <button
          className={`btn ${tab === "INV" ? "btn-gold" : "btn-ghost"}`}
          onClick={() => setTab("INV")}
        >
          MOCHILA
        </button>
        <button
          className={`btn ${tab === "CT" ? "btn-warning" : "btn-ghost"}`}
          onClick={() =>
            team
              ? setModal({ type: "CT_TYCOON", data: team })
              : alert(
                  "🚫 Você precisa estar contratado por um Clube para acessar o Centro de Treinamento!",
                )
          }
        >
          🏋️‍♂️ CT
        </button>
      </div>

      {tab === "PERFIL" && (
        <div>
          <div
            className="card"
            style={{
              borderLeft: "4px solid var(--primary)",
              background: "linear-gradient(90deg, #1b2e1b, #1E1E1E)",
            }}
          >
            <h3 style={{ marginTop: 0, color: "var(--primary)" }}>
              🏦 {fmt(player.balance || 0)}
            </h3>
            <small style={{ color: "#aaa" }}>
              Salário: {fmt(player.salary)} | Passe:{" "}
              {player.teamId === "FREE" ? (
                <span style={{ color: "lime" }}>GRÁTIS</span>
              ) : (
                fmt(player.value)
              )}
            </small>
          </div>

          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span>Atributos</span>
              {pointsToGain > 0 && (
                <span style={{ fontSize: 10, color: "#aaa" }}>
                  Pontos para distribuir:{" "}
                  <span style={{ color: "#00E676", fontWeight: "bold" }}>
                    +{pointsToGain}
                  </span>
                </span>
              )}
            </div>

            {player.attributes ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "5px 10px",
                  fontSize: 10,
                }}
              >
                {ATTR_LIST.map((attr) => {
                  const val = player.attributes[attr.k];
                  return (
                    <div
                      key={attr.k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span title={attr.l}>
                        {attr.i} {attr.l}
                      </span>
                      <b style={{ color: getAttrColor(val) }}>{val || "-"}</b>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "#666" }}>
                Atributos não gerados.
              </p>
            )}

            {/* --- CARD DE ESTIMATIVA DE TREINO --- */}
            {player.attributes && (
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 15,
                  fontSize: 11,
                  color: "#ddd",
                  textAlign: "center",
                  border: "1px dashed #444",
                }}
              >
                ⏳ <b>Estimativa Evolutiva:</b> Faltam cerca de{" "}
                <b style={{ color: "var(--warning)" }}>
                  {estSoloTrains} treinos individuais
                </b>{" "}
                para você garantir{" "}
                <b style={{ color: "#00E676" }}>+1 de Overall</b>.<br />
                <span style={{ fontSize: 9, color: "#888" }}>
                  *Cálculo base isolado. Jogar partidas, ter um Técnico e usar
                  Itens da Loja acelera este tempo drasticamente!
                </span>
              </div>
            )}
          </div>

          <div className="card">
            <h3>📊 Estatísticas</h3>
            <div
              className="stats-grid"
              style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <div className="stat-item">
                <span className="stat-lbl">⚽ Gols</span>
                <span className="stat-val">
                  {String(player.stats?.goals || 0)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-lbl">👟 Assistências</span>
                <span className="stat-val">
                  {String(player.stats?.assists || 0)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-lbl">🛡️ Desarmes</span>
                <span className="stat-val">
                  {String(player.stats?.tackles || 0)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-lbl">🧤 Defesas</span>
                <span className="stat-val">
                  {String(player.stats?.saves || 0)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-lbl">🟨 Amarelos</span>
                <span className="stat-val">
                  {String(player.stats?.yellows || 0)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-lbl">🟥 Vermelhos</span>
                <span className="stat-val">
                  {String(player.stats?.reds || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === "ACOES" && (
        <div>
          <div
            className="card"
            style={{ borderLeft: "4px solid var(--danger)" }}
          >
            <h4>📢 O Gabinete do Presidente</h4>
            {team ? (
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                {/* Botões Padrão */}
                <button
                  className="btn btn-gold"
                  onClick={() => onAction("ASK_RAISE", player)}
                >
                  💰 PEDIR AUMENTO
                </button>

                {/* Lógica Inteligente para Transferência/Neutro */}
                {player.status === "VENDA" ? (
                  <button
                    className="btn btn-blue"
                    onClick={() => onAction("RESET_MOOD", player)}
                  >
                    🤝 RETIRAR PEDIDO E FICAR NEUTRO
                  </button>
                ) : (
                  <button
                    className="btn btn-red"
                    onClick={() => onAction("TRANSFER_REQUEST", player)}
                  >
                    😡 PEDIR TRANSFERÊNCIA
                  </button>
                )}

                {/* Lógica para Felicidade */}
                {player.mood !== "🤩" && (
                  <button
                    className="btn btn-green"
                    style={{ background: "#00E676", color: "#000" }}
                    onClick={() => onAction("DECLARE_HAPPY", player)}
                  >
                    💙 DECLARAR AMOR AO CLUBE
                  </button>
                )}
              </div>
            ) : (
              <p style={{ color: "var(--primary)", fontWeight: "bold" }}>
                Estás livre no mercado!
              </p>
            )}
          </div>

          <div className="card">
            <h4>🔐 Segurança</h4>
            <div style={{ display: "flex", gap: 5 }}>
              <input
                className="input-field"
                type="password"
                placeholder="Nova Senha"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                style={{ marginBottom: 0 }}
              />
              <button
                className="btn btn-purple"
                style={{ width: "auto" }}
                onClick={() => {
                  if (!newPass) return alert("Digite uma senha!");
                  onUpdatePassword(newPass);
                  setNewPass("");
                }}
              >
                ALTERAR
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "CARREIRA" && (
        <div>
          <div className="card">
            <h3>🏆 Conquistas</h3>
            {badges.length === 0 && (
              <p style={{ color: "#666", fontSize: 11 }}>
                Joga para desbloquear.
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {badges.map((b, i) => (
                <div
                  key={i}
                  style={{
                    background: "#333",
                    padding: "5px 10px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    border: `1px solid ${b.color}`,
                  }}
                >
                  <span>{b.icon}</span>
                  <span
                    style={{ fontSize: 11, fontWeight: "bold", color: b.color }}
                  >
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ borderLeft: "4px solid #fff" }}>
            {/* --- PATROCÍNIO PESSOAL --- */}
            {player.personalSponsor && (
              <div
                className="card"
                style={{
                  borderLeft: "4px solid var(--purple)",
                  marginBottom: 15,
                  background: "rgba(213,0,249,0.05)",
                }}
              >
                <h3 style={{ marginTop: 0, color: "var(--purple)" }}>
                  📸 Garoto Propaganda
                </h3>
                <p style={{ fontSize: 12 }}>
                  Empresa: <b>{player.personalSponsor.companyName}</b>
                </p>
                <p style={{ fontSize: 12, color: "lime", fontWeight: "bold" }}>
                  Ganhos: +{fmt(player.personalSponsor.value)} / sem
                </p>

                {user.type === "PLAYER" && (
                  <button
                    className="btn btn-red"
                    style={{ width: "auto", fontSize: 10, marginTop: 10 }}
                    onClick={async () => {
                      const multa = player.personalSponsor.clause;
                      if (player.balance < multa)
                        return alert(
                          `Você não tem dinheiro para a multa rescisória de ${fmt(multa)}.`,
                        );
                      if (
                        !confirm(
                          `Quebrar o contrato com a ${player.personalSponsor.companyName}?\nVocê pagará ${fmt(multa)} de multa do seu bolso.`,
                        )
                      )
                        return;

                      const b = db.batch();
                      b.update(db.collection("players").doc(player.id), {
                        balance:
                          firebase.firestore.FieldValue.increment(-multa),
                        personalSponsor: firebase.firestore.FieldValue.delete(),
                      });
                      b.update(
                        db
                          .collection("companies")
                          .doc(player.personalSponsor.companyId),
                        {
                          balance:
                            firebase.firestore.FieldValue.increment(multa),
                        },
                      );
                      await b.commit();
                      alert("Contrato quebrado e multa paga à empresa.");
                    }}
                  >
                    QUEBRAR CONTRATO ({fmt(player.personalSponsor.clause)})
                  </button>
                )}
              </div>
            )}

            {/* --- SALA DE TROFÉUS --- */}
            <div
              className="card"
              style={{
                borderLeft: "4px solid gold",
                background: "rgba(255,215,0,0.05)",
                marginBottom: 15,
              }}
            >
              <h3 style={{ marginTop: 0, color: "gold" }}>
                🏆 Sala de Troféus
              </h3>
              {!player.trophies || player.trophies.length === 0 ? (
                <p style={{ fontSize: 11, color: "#666" }}>
                  A estante ainda está vazia.
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                    gap: 10,
                  }}
                >
                  {[...player.trophies].reverse().map((t, i) => (
                    <div
                      key={i}
                      style={{
                        textAlign: "center",
                        background: "rgba(0,0,0,0.5)",
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #444",
                      }}
                    >
                      <img
                        src={t.img}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "contain",
                          filter: "drop-shadow(0 0 5px rgba(255,215,0,0.5))",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: "bold",
                          color: "#fff",
                          marginTop: 5,
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: 8, color: "gold" }}>
                        {t.tournament}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <h3>🌍 Histórico de Carreira</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                gap: 10,
              }}
            >
              {(player.history || []).map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(255,255,255,0.05)",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: 9, color: "#aaa" }}>
                    {String(h.from || "Agente Livre")}
                  </span>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "var(--primary)", fontSize: 12 }}>
                      ➡
                    </div>
                    <div style={{ fontSize: 9, color: "#fff" }}>
                      {/* Blindagem contra objetos no histórico */}
                      {typeof h.value === "object"
                        ? "Negociado"
                        : h.value > 0
                          ? fmt(h.value)
                          : "Transferência Grátis"}
                    </div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: "bold" }}>
                    {String(h.to || "Desconhecido")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "INV" && (
        <div>
          <h3>🎒 Mochila</h3>

          {/* ITEM EQUIPADO CORRIGIDO (BLINDADO CONTRA OBJETOS) */}
          {player.equippedItem && (
            <div
              className="card"
              style={{
                border: "1px solid lime",
                background: "rgba(0,255,0,0.05)",
                marginBottom: 15,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 24 }}>🛡️</div>
              <div>
                <span
                  style={{ fontSize: 10, color: "lime", fontWeight: "bold" }}
                >
                  EQUIPADO
                </span>
                <div style={{ fontWeight: "bold" }}>
                  {String(player.equippedItem.name || "Item")}
                </div>
                <small style={{ color: "#ccc" }}>
                  Bônus: +{String(player.equippedItem.power || 0)}% Pontos de
                  Experiência
                </small>
              </div>
            </div>
          )}

          {myItems.length === 0 && (
            <p style={{ color: "#666", textAlign: "center" }}>
              Vazia. Vá ao Shopping!
            </p>
          )}

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {myItems.map((item, index) => {
              const isConsumable = ["SAUDE", "CONSUMIVEL"].includes(item.cat);
              const isEquippable = ["CHUTEIRA", "LUVAS"].includes(item.cat);
              const isLuxury = [
                "VEICULO",
                "IMOVEL",
                "TECNOLOGIA",
                "LUXO",
              ].includes(item.cat);

              return (
                <div
                  key={item.id || index}
                  className="card"
                  style={{
                    border: "1px solid #444",
                    textAlign: "center",
                    padding: 10,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 5,
                      fontSize: 9,
                      background: "#333",
                      padding: "2px 5px",
                      borderRadius: 3,
                    }}
                  >
                    {item.cat}
                  </div>
                  {item.giftedBy && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 5,
                        left: 5,
                        right: 5,
                        fontSize: 8,
                        background: "rgba(213,0,249,0.8)",
                        padding: "2px",
                        borderRadius: 3,
                        color: "#fff",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      🎁 De: {item.giftedBy}
                    </div>
                  )}

                  {item.img ? (
                    <img
                      src={item.img}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        marginBottom: 5,
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 24 }}>📦</div>
                  )}

                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: 12,
                      height: 30,
                      overflow: "hidden",
                    }}
                  >
                    {String(item.productName || "Produto")}
                  </div>

                  <div style={{ fontSize: 10, color: "gold", margin: "5px 0" }}>
                    {isConsumable &&
                      `⚡ Recuperação de Energia: ${item.power}%`}
                    {isEquippable && `⚔️ Bônus de Experiência: +${item.power}%`}
                    {isLuxury && `💎 Fama Adquirida: +${item.fameGained}`}
                  </div>

                  {/* BOTÕES DE AÇÃO */}
                  {isConsumable && (
                    <button
                      className="btn btn-green"
                      style={{ fontSize: 10, padding: 5, margin: 0 }}
                      onClick={() => onUseItem(item, "CONSUME")}
                    >
                      USAR AGORA
                    </button>
                  )}
                  {isEquippable && (
                    <button
                      className="btn btn-blue"
                      style={{ fontSize: 10, padding: 5, margin: 0 }}
                      onClick={() => onUseItem(item, "EQUIP")}
                    >
                      EQUIPAR NO PERFIL
                    </button>
                  )}
                  {isLuxury && (
                    <div
                      style={{
                        fontSize: 9,
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      Item de Coleção
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
