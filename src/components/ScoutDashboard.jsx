import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { getPeneiraCost } from "../game/getPeneiraCost.js";
import { fmt } from "../game/fmt.js";
import { POS } from "../game/POS.js";
import { generateAttributes } from "../game/generateAttributes.js";
import { generateNpcName } from "../game/generateNpcName.js";
import { getSalaryLimits } from "../game/getSalaryLimits.js";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";

export const ScoutDashboard = ({
  scout,
  team,
  players,
  onSelfAction,
  setModal,
}) => {
  const energy = scout.energy !== undefined ? scout.energy : 100;
  const isExhausted = energy < 30;

  // --- LÓGICA DE XP DO OLHEIRO ---
  const xpNext = scout.level * 100;
  const progress = ((scout.xp || 0) / xpNext) * 100;

  const runPeneira = async (level, maxOvr) => {
    if (!team || team.id === "FREE")
      return alert(
        "Você precisa estar contratado por um clube para realizar peneiras!",
      );

    const today = new Date().toDateString();
    const scoutsDone =
      scout.lastScoutDate === today ? scout.scoutsToday || 0 : 0;

    if (scoutsDone >= 2)
      return alert(
        "Você já realizou 2 peneiras hoje! Descanse a vista e volte amanhã.",
      );
    if (energy < 50)
      return alert(
        "Você precisa de pelo menos 50⚡ de Energia para viajar e avaliar jogadores.",
      );

    const cost = getPeneiraCost(maxOvr);
    if ((team.balance || 0) < cost)
      return alert(
        `A diretoria não liberou verba para esta Peneira. Necessário: ${fmt(cost)} no caixa do clube.`,
      );

    if (
      !confirm(
        `Realizar Peneira Nível ${level}?\nCusto para o Clube: ${fmt(cost)}\nEnergia gasta: -50⚡\n\nIsso apagará a lista da peneira anterior.`,
      )
    )
      return;

    const db = firebase.firestore();
    const b = db.batch();

    // 1. Gera 5 NPCs aleatórios
    const newProspects = [];
    for (let i = 0; i < 5; i++) {
      const ovr =
        Math.floor(Math.random() * (maxOvr - (maxOvr - 10))) + (maxOvr - 10); // Ex: Se max 50, gera entre 40 e 50
      const pos = POS[Math.floor(Math.random() * POS.length)];
      const attrs = generateAttributes(pos, ovr);

      newProspects.push({
        id: `npc_${Date.now()}_${i}`,
        name: generateNpcName(),
        position: pos,
        overall: ovr,
        attributes: attrs,
        salary: getSalaryLimits(ovr).minSal,
        value: getRecommendedPrice(ovr, pos),
        isNPC: true, // Marcação vital
      });
    }

    // 2. Cobra do clube, salva a lista e avisa no Diário
    let newLogs = [...(team.trainingLogs || [])];
    newLogs.unshift({
      date: Date.now(),
      type: "🔎 OLHEIRO (PENEIRA)",
      report: `O Olheiro ${scout.name} retornou de viagem e entregou um relatório com 5 novas promessas para a Diretoria avaliar.`,
    });
    if (newLogs.length > 15) newLogs.pop();

    b.update(db.collection("teams").doc(team.id), {
      balance: firebase.firestore.FieldValue.increment(-cost),
      peneiraList: newProspects,
      trainingLogs: newLogs,
    });

    // 3. Atualiza o XP e o Nível do Olheiro
    let newXp = (scout.xp || 0) + 50; // Ganha 50 XP por peneira
    let newLevel = scout.level;
    let pending = scout.pendingPerks || 0;

    // Lógica de subir de nível
    if (newXp >= newLevel * 100) {
      newXp -= newLevel * 100;
      newLevel++;
      if (newLevel % 3 === 0) pending++; // Ganha perk a cada 3 níveis (se quiser adicionar habilidades depois)
      alert(`🎉 PARABÉNS! Você evoluiu para o Nível ${newLevel} de Olheiro!`);
    }

    b.update(db.collection("users").doc(scout.id), {
      energy: energy - 50,
      lastScoutDate: today,
      scoutsToday: scoutsDone + 1,
      xp: newXp,
      level: newLevel,
      pendingPerks: pending,
    });

    await b.commit();
    alert(
      `🔎 Peneira Concluída!\nForam encontrados 5 novos talentos. Eles já estão disponíveis na aba PENEIRA do CT do ${team.name}.`,
    );
  };

  return (
    <div>
      {/* CABEÇALHO DO OLHEIRO */}
      <div
        className="highlight-card"
        style={{
          textAlign: "center",
          paddingBottom: 30,
          position: "relative",
          border: "2px solid #9c27b0",
          background: "linear-gradient(135deg, #311b92 0%, #000 100%)",
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
              border: "2px solid #9c27b0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            {scout.face ? (
              <img
                src={scout.face}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "🕵️‍♂️"
            )}
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#e040fb" }}>{scout.name}</h2>
            <small style={{ color: "#ccc" }}>
              {team ? team.name : "Agente Livre"} | Olheiro Nvl {scout.level}
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
              background: energy > 50 ? "lime" : "red",
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

        {/* SALDO E SALÁRIO DO OLHEIRO */}
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
              {fmt(scout.balance || 0)}
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
              {fmt(scout.salary)}
            </div>
            <span style={{ fontSize: 9, color: "#888" }}>SALÁRIO</span>
          </div>
        </div>

        {/* BARRA DE XP ROXA */}
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
              background: "linear-gradient(90deg, #9c27b0, #e040fb)",
              height: "100%",
              transition: "1s",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "-14px",
              right: "5px",
              fontSize: "9px",
              color: "#e040fb",
              fontWeight: "bold",
              textShadow: "1px 1px 2px black",
            }}
          >
            XP: {scout.xp || 0} / {xpNext}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3 style={{ color: "var(--purple)" }}>
          🔎 Rede de Olheiros (Peneiras)
        </h3>
        <p style={{ fontSize: 11, color: "#aaa", marginBottom: 15 }}>
          Viaje e organize peneiras para descobrir novos "Bots" para a base do
          clube. Limite: 2 por dia.
        </p>

        <div style={{ display: "grid", gap: 10 }}>
          {/* PENEIRA LVL 1 */}
          <div className="card" style={{ borderLeft: "4px solid #fff" }}>
            <b>Peneira Amadora (OVR 30-40)</b>
            <div style={{ fontSize: 10, color: "#888", margin: "5px 0" }}>
              Custo Clube: <b style={{ color: "lime" }}>GRÁTIS</b> | Seu Custo:{" "}
              <b style={{ color: "orange" }}>-50⚡</b>
            </div>
            <button className="btn btn-ghost" onClick={() => runPeneira(1, 40)}>
              INICIAR BUSCA
            </button>
          </div>

          {/* PENEIRA LVL 2 */}
          <div
            className="card"
            style={{
              borderLeft: "4px solid cyan",
              opacity: scout.level >= 2 ? 1 : 0.5,
            }}
          >
            <b>Peneira Profissional (OVR 41-50)</b>
            <div style={{ fontSize: 10, color: "#888", margin: "5px 0" }}>
              Custo Clube:{" "}
              <b style={{ color: "var(--danger)" }}>
                {fmt(getPeneiraCost(50))}
              </b>{" "}
              | Seu Custo: <b style={{ color: "orange" }}>-50⚡</b>
            </div>
            {scout.level >= 2 ? (
              <button
                className="btn btn-blue"
                onClick={() => runPeneira(2, 50)}
              >
                INICIAR BUSCA NACIONAL
              </button>
            ) : (
              <small
                style={{ display: "block", textAlign: "center", color: "cyan" }}
              >
                Desbloqueia no Nível 2
              </small>
            )}
          </div>

          {/* PENEIRA LVL 3 */}
          <div
            className="card"
            style={{
              borderLeft: "4px solid gold",
              opacity: scout.level >= 5 ? 1 : 0.5,
            }}
          >
            <b>Peneira Internacional (OVR 51-60)</b>
            <div style={{ fontSize: 10, color: "#888", margin: "5px 0" }}>
              Custo Clube:{" "}
              <b style={{ color: "var(--danger)" }}>
                {fmt(getPeneiraCost(60))}
              </b>{" "}
              | Seu Custo: <b style={{ color: "orange" }}>-50⚡</b>
            </div>
            {scout.level >= 5 ? (
              <button
                className="btn btn-gold"
                onClick={() => runPeneira(3, 60)}
              >
                VIAGEM INTERNACIONAL
              </button>
            ) : (
              <small
                style={{ display: "block", textAlign: "center", color: "gold" }}
              >
                Desbloqueia no Nível 5
              </small>
            )}
          </div>
        </div>
      </div>

      {/* BOTÃO DO CT */}
      <button
        className="btn btn-warning"
        style={{ marginTop: 15 }}
        onClick={() =>
          team
            ? setModal({ type: "CT_TYCOON", data: team })
            : alert("🚫 Você precisa estar contratado!")
        }
      >
        🏟️ VISITAR CT (VER PENEIRA)
      </button>
    </div>
  );
};
