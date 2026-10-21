import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { DOCTOR_PERKS } from "../game/DOCTOR_PERKS.js";
import { INJURIES_DB } from "../game/INJURIES_DB.js";
import { fmt } from "../game/fmt.js";

export const DoctorDashboard = ({
  doctor,
  team,
  players,
  offers,
  sales,
  onUseItem,
  onSelfAction,
  onEvolvePerk,
  setModal,
}) => {
  const [tab, setTab] = useState("DM");

  const energy = doctor.energy !== undefined ? doctor.energy : 100;
  const isExhausted = energy < 30;
  const myItems = (sales || []).filter((s) => s.buyerId === doctor.id);
  const injuredPlayers = players
    .filter((p) => (p.recoveryLeft || 0) > 0)
    .sort((a, b) => b.overall - a.overall);

  const xpNext = doctor.level * 100;
  const progress = ((doctor.xp || 0) / xpNext) * 100;

  // Lógica de Upgrades do Médico
  const showPerkSelection = doctor.pendingPerks > 0;
  const availablePerks = DOCTOR_PERKS.filter(
    (p) => !(doctor.perks || []).some((cp) => cp.id === p.id),
  );
  const perkOptions = React.useMemo(
    () => availablePerks.sort(() => 0.5 - Math.random()).slice(0, 3),
    [doctor.pendingPerks],
  );

  const activePerks = doctor.perks || [];
  const hasNutri = activePerks.some((p) => p.id === "SPORTS_NUTRITION");
  const hasFastDiag = activePerks.some((p) => p.id === "FAST_DIAGNOSIS");
  const hasGoldenHands = activePerks.some((p) => p.id === "GOLDEN_HANDS");
  const hasMiracle = activePerks.some((p) => p.id === "MIRACLE_WORKER");
  const hasColdBlood = activePerks.some((p) => p.id === "COLD_BLOOD");
  const hasDiscount = activePerks.some((p) => p.id === "VIP_DISCOUNT");

  const handleStudy = async () => {
    if (energy < 20)
      return alert("Você está exausto! Tome um energético antes de estudar.");
    let xpGain = Math.floor(Math.random() * 15) + 10;

    if (hasNutri) xpGain = Math.round(xpGain * 1.2); // Bônus da Habilidade Nutrição

    let newXp = (doctor.xp || 0) + xpGain;
    let newLevel = doctor.level;
    let pending = doctor.pendingPerks || 0;

    if (newXp >= newLevel * 100) {
      newXp -= newLevel * 100;
      newLevel++;
      if (newLevel % 3 === 0) pending++; // Médico ganha habilidade a cada 3 níveis!
      alert(`🎉 Você subiu para o Nível ${newLevel} de Medicina Esportiva!`);
    }

    await firebase
      .firestore()
      .collection("users")
      .doc(doctor.id)
      .update({
        energy: energy - 20,
        xp: newXp,
        level: newLevel,
        pendingPerks: pending,
      });
    alert(`📚 Você estudou novos tratamentos e ganhou ${xpGain} XP!`);
  };

  const handleEvaluate = async (p) => {
    const cost = hasFastDiag ? 5 : 10;
    if (energy < cost) return alert(`Energia insuficiente. (Custo: ${cost}⚡)`);

    const injuryName = typeof p.injury === "object" ? p.injury.label : p.injury;
    const isLeve =
      !INJURIES_DB.MODERADA.includes(injuryName) &&
      !INJURIES_DB.GRAVE.includes(injuryName) &&
      !INJURIES_DB.EXTREMA.includes(injuryName);
    const baseChance = 0.2 + doctor.level * 0.02; // 20% base + 2% por nível
    const success = Math.random() < baseChance;

    const db = firebase.firestore();
    const b = db.batch();

    let newXp = (doctor.xp || 0) + 5;
    let newLevel = doctor.level;
    let pending = doctor.pendingPerks || 0;

    if (newXp >= newLevel * 100) {
      newXp -= newLevel * 100;
      newLevel++;
      if (newLevel % 3 === 0) pending++;
      alert(`🎉 Nível ${newLevel} alcançado!`);
    }

    b.update(db.collection("users").doc(doctor.id), {
      energy: energy - cost,
      xp: newXp,
      level: newLevel,
      pendingPerks: pending,
    });

    if (isLeve && success) {
      b.update(db.collection("players").doc(p.id), {
        recoveryLeft: 0,
        injury: firebase.firestore.FieldValue.delete(),
      });
      await b.commit();
      alert(
        `✨ DIAGNÓSTICO PRECISO!\nSua avaliação e aplicação de gelo curaram o jogador na hora! ${p.name} está liberado.`,
      );
    } else {
      await b.commit();
      alert(
        `📋 Avaliação Concluída.\nA lesão é real. O atleta precisará cumprir o repouso ou passar por cirurgia.`,
      );
    }
  };

  const handleSurgery = async (p) => {
    if (energy < 40)
      return alert(
        "Uma cirurgia exige muita concentração! Você precisa de pelo menos 40⚡.",
      );

    let category = "LEVE";
    const injuryName = typeof p.injury === "object" ? p.injury.label : p.injury;
    if (INJURIES_DB.MODERADA.includes(injuryName)) category = "MODERADA";
    if (INJURIES_DB.GRAVE.includes(injuryName)) category = "GRAVE";
    if (INJURIES_DB.EXTREMA.includes(injuryName)) category = "EXTREMA";

    if (category === "LEVE" || injuryName === "Intoxicação Alimentar")
      return alert("Lesões clínicas não operáveis.");

    const SURGERY_OPTIONS = {
      MODERADA: [
        {
          name: "Fisioterapia PRP",
          timeRed: 2,
          cost: 750000,
          baseSuccess: 0.85,
        },
      ],
      GRAVE: [
        { name: "Artroscopia", timeRed: 3, cost: 1500000, baseSuccess: 0.8 },
        {
          name: "Sutura Meniscal",
          timeRed: 4,
          cost: 3500000,
          baseSuccess: 0.7,
        },
      ],
      EXTREMA: [
        {
          name: "Enxerto Ligamentar",
          timeRed: 6,
          cost: 8000000,
          baseSuccess: 0.65,
        },
        {
          name: "Cirurgia Robótica",
          timeRed: 8,
          cost: 15000000,
          baseSuccess: 0.5,
        },
      ],
    };

    const options = SURGERY_OPTIONS[category];

    const lvlBonus = doctor.level * 0.02;
    const exhaustionPenalty = energy < 30 ? 0.3 : energy < 50 ? 0.15 : 0;

    const lista = options
      .map((s, idx) => {
        let finalChance = s.baseSuccess + lvlBonus - exhaustionPenalty;
        if (hasGoldenHands) finalChance += 0.1;
        finalChance = Math.min(0.99, Math.max(0.1, finalChance));

        let surgeryCost = s.cost;
        if (hasDiscount) surgeryCost = surgeryCost * 0.9;

        return `${idx + 1}) ${s.name}\nCusto do Convênio: ${fmt(surgeryCost)} | Reduz: ${s.timeRed} ${hasMiracle ? "+1" : ""} jogos\nSua Chance de Sucesso: ${(finalChance * 100).toFixed(0)}%`;
      })
      .join("\n\n");

    const escolha = prompt(
      `🔪 CENTRO CIRÚRGICO - Paciente: ${p.name}\nSua Energia: ${energy}% (Fadiga afeta precisão!)\n\nEscolha o procedimento (1-${options.length}):\n\n${lista}`,
    );

    if (escolha) {
      const cirurgia = options[parseInt(escolha) - 1];
      if (!cirurgia) return;

      let finalChance = cirurgia.baseSuccess + lvlBonus - exhaustionPenalty;
      if (hasGoldenHands) finalChance += 0.1;
      finalChance = Math.min(0.99, Math.max(0.1, finalChance));

      let baseCost = cirurgia.cost;
      if (hasDiscount) baseCost = baseCost * 0.9;

      const teamCoverage = team?.healthPlan?.coverage || 0;
      const playerCoverage = p.healthPlan?.coverage || 0;
      const bestCoverage = Math.max(teamCoverage, playerCoverage);
      const finalCost = baseCost - baseCost * (bestCoverage / 100);

      const doctorFee = baseCost * 0.1;

      if ((p.hospitalFund || 0) + (p.balance || 0) < finalCost) {
        return alert(
          `O jogador não tem fundos para pagar a cirurgia (Custos + Honorários).\nFaltam recursos!`,
        );
      }

      if (
        !confirm(
          `Confirmar ${cirurgia.name}?\nVocê gastará 40⚡.\nSe der certo, você receberá ${fmt(doctorFee)} de Honorários.\nSe errar, sua moral cairá.`,
        )
      )
        return;

      const db = firebase.firestore();
      const b = db.batch();
      const pRef = db.collection("players").doc(p.id);
      const docRef = db.collection("users").doc(doctor.id);

      let remainingCost = finalCost;
      let currentFund = p.hospitalFund || 0;

      if (currentFund >= remainingCost) {
        b.update(pRef, { hospitalFund: currentFund - remainingCost });
      } else {
        remainingCost -= currentFund;
        b.update(pRef, {
          hospitalFund: 0,
          balance: firebase.firestore.FieldValue.increment(-remainingCost),
        });
      }

      const success = Math.random() < finalChance;

      if (success) {
        let tempoReduzido = cirurgia.timeRed;
        if (hasMiracle) tempoReduzido += 1;

        const novoTempo = Math.max(0, p.recoveryLeft - tempoReduzido);
        let newXp = (doctor.xp || 0) + 50;
        let newLevel = doctor.level;
        let pending = doctor.pendingPerks || 0;

        if (newXp >= newLevel * 100) {
          newXp -= newLevel * 100;
          newLevel++;
          if (newLevel % 3 === 0) pending++;
          alert(`🎉 Nível ${newLevel} alcançado!`);
        }

        // LOG DO DIÁRIO
        let newLogs = [...(team?.trainingLogs || [])];
        newLogs.unshift({
          date: Date.now(),
          type: "🏥 DM (ALTA MÉDICA)",
          report: `O Dr. ${doctor.name} operou ${p.name} com SUCESSO e reduziu ${tempoReduzido} jogos de lesão!`,
        });
        if (newLogs.length > 15) newLogs.pop();
        if (team)
          b.update(db.collection("teams").doc(team.id), {
            trainingLogs: newLogs,
          });

        b.update(pRef, {
          recoveryLeft: novoTempo,
          injury:
            novoTempo === 0 ? firebase.firestore.FieldValue.delete() : p.injury,
          donors: {},
        });
        b.update(docRef, {
          energy: energy - 40,
          balance: firebase.firestore.FieldValue.increment(doctorFee),
          xp: newXp,
          level: newLevel,
          pendingPerks: pending,
        });

        await b.commit();
        alert(
          `✅ CIRURGIA UM SUCESSO!\nSuas mãos foram precisas. O jogador reduziu ${tempoReduzido} jogos de lesão!\nVocê ganhou ${fmt(doctorFee)} e +50 XP.`,
        );
      } else {
        // ERRO MÉDICO!
        let penalty = 2;
        if (hasColdBlood) penalty = 0;

        // LOG DO DIÁRIO
        let newLogs = [...(team?.trainingLogs || [])];
        newLogs.unshift({
          date: Date.now(),
          type: "⚠️ ERRO MÉDICO",
          report: `Houve complicações na cirurgia de ${p.name}. O jogador precisará de mais tempo.`,
        });
        if (newLogs.length > 15) newLogs.pop();
        if (team)
          b.update(db.collection("teams").doc(team.id), {
            trainingLogs: newLogs,
          });

        b.update(pRef, { recoveryLeft: p.recoveryLeft + penalty, mood: "😡" });
        b.update(docRef, {
          energy: energy - 40,
          xp: Math.max(0, (doctor.xp || 0) - 20),
        });

        if (!hasColdBlood) {
          db.collection("news").add({
            text: `🚨 **ERRO MÉDICO!**\nO Dr. **${doctor.name}** do ${team?.name || "Clube"} cometeu uma falha grave na cirurgia de **${p.name}**!`,
            type: "press",
            date: Date.now(),
            likes: [],
          });
        }

        await b.commit();

        if (hasColdBlood) {
          alert(
            `⚠️ FALHA NA CIRURGIA!\nFelizmente, devido ao seu Sangue Frio, você conseguiu estabilizar o paciente e ele não sofreu sequelas extras. Porém, o tratamento não avançou.`,
          );
        } else {
          alert(
            `❌ FALHA CRÍTICA...\nHouve uma complicação na mesa de cirurgia. O jogador piorou (+2 jogos fora).\nVocê não recebeu os honorários e sua reputação foi manchada no jornal.`,
          );
        }
      }
    }
  };

  return (
    <div>
      {/* CABEÇALHO DO MÉDICO */}
      <div
        className="highlight-card"
        style={{
          textAlign: "center",
          paddingBottom: 30,
          position: "relative",
          border: "2px solid #00E676",
          background: "linear-gradient(135deg, #003311 0%, #000 100%)",
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
          <div style={{ position: "relative", width: 65, height: 65 }}>
            {doctor.face ? (
              <img
                src={doctor.face}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "2px solid #00E676",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#333",
                  border: "2px solid #00E676",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                🩺
              </div>
            )}
          </div>
          <div>
            <h2 style={{ margin: 0, color: "#00E676" }}>Dr. {doctor.name}</h2>
            <small style={{ color: "#ccc" }}>
              {team ? team.name : "Clínica Autônoma"} | CRM Nível {doctor.level}
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
          {energy}% Energia {isExhausted && "(Risco alto de Erro Médico!)"}
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
              {fmt(doctor.balance || 0)}
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
              {fmt(doctor.salary)}
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
              background: "linear-gradient(90deg, #009944, #00E676)",
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
          className={`btn ${tab === "DM" ? "btn-green" : "btn-ghost"}`}
          onClick={() => setTab("DM")}
        >
          MACA (DM)
        </button>
        <button
          className={`btn ${tab === "ESTUDO" ? "btn-blue" : "btn-ghost"}`}
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
          CARREIRA
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            team
              ? setModal({ type: "CT_TYCOON", data: team })
              : alert(
                  "🚫 Você precisa estar contratado por um Clube para acessar o CT!",
                )
          }
        >
          🏋️‍♂️ CT
        </button>
      </div>

      {showPerkSelection && (
        <div
          className="card pulse-border"
          style={{ background: "rgba(0, 230, 118, 0.1)", marginBottom: 15 }}
        >
          <h3 style={{ color: "#00E676", textAlign: "center", marginTop: 0 }}>
            ✨ ESPECIALIZAÇÃO MÉDICA!
          </h3>
          <p style={{ textAlign: "center", fontSize: 11 }}>
            Escolha uma nova Habilidade Médica:
          </p>
          <div style={{ display: "grid", gap: 5 }}>
            {perkOptions.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{ cursor: "pointer", border: "1px solid #555" }}
                onClick={() => onEvolvePerk(p)}
              >
                <b style={{ color: "#00E676" }}>{p.name}</b>
                <br />
                <small>{p.desc}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: DEPARTAMENTO MÉDICO */}
      {tab === "DM" && (
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
              <p>Assine com um clube para assumir o Departamento Médico.</p>
            </div>
          ) : (
            <>
              <h3 style={{ color: "#00E676", marginTop: 0 }}>
                🏥 Pacientes do Elenco
              </h3>
              {injuredPlayers.length === 0 ? (
                <div
                  className="card"
                  style={{ textAlign: "center", padding: 30 }}
                >
                  <span style={{ fontSize: 40 }}>🥗</span>
                  <p style={{ color: "#aaa", fontSize: 12 }}>
                    Departamento Vazio! Ótimo trabalho preventivo.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {injuredPlayers.map((p) => {
                    const injuryName =
                      typeof p.injury === "object" ? p.injury.label : p.injury;
                    const isLeve =
                      !INJURIES_DB.MODERADA.includes(injuryName) &&
                      !INJURIES_DB.GRAVE.includes(injuryName) &&
                      !INJURIES_DB.EXTREMA.includes(injuryName);
                    return (
                      <div
                        key={p.id}
                        className="card"
                        style={{ borderLeft: "4px solid red" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <b style={{ fontSize: 15 }}>{p.name}</b>
                            <div
                              style={{
                                color: "red",
                                fontSize: 11,
                                fontWeight: "bold",
                              }}
                            >
                              {p.injury}
                            </div>
                          </div>
                          <span
                            style={{
                              background: "red",
                              color: "white",
                              padding: "2px 8px",
                              borderRadius: 10,
                              fontSize: 10,
                              fontWeight: "bold",
                            }}
                          >
                            {p.recoveryLeft} JOGOS
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                          <button
                            className="btn btn-ghost"
                            style={{ borderColor: "cyan", color: "cyan" }}
                            onClick={() => handleEvaluate(p)}
                          >
                            🩺 AVALIAR (-{hasFastDiag ? 5 : 10}⚡)
                          </button>
                          <button
                            className="btn btn-red"
                            onClick={() => handleSurgery(p)}
                            disabled={isLeve}
                            style={{ opacity: isLeve ? 0.3 : 1 }}
                          >
                            🔪 OPERAR (-40⚡)
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ABA: ESTUDAR */}
      {tab === "ESTUDO" && (
        <div
          className="animate-in card"
          style={{ textAlign: "center", border: "1px dashed cyan" }}
        >
          <h3 style={{ color: "cyan", marginTop: 0 }}>
            📚 Pesquisa e Atualização
          </h3>
          <p style={{ fontSize: 11, color: "#aaa" }}>
            Atualize-se nos novos métodos cirúrgicos. Níveis mais altos garantem
            menos erros nas cirurgias (Menos chance do paciente piorar e mais
            chance de sucesso).
          </p>
          <button
            className="btn btn-blue"
            style={{ padding: "15px", fontSize: 14 }}
            onClick={handleStudy}
          >
            📖 LER ARTIGOS CIENTÍFICOS (-20⚡)
          </button>
        </div>
      )}

      {/* ABA MOCHILA */}
      {tab === "MOCHILA" && (
        <div className="animate-in">
          <h3>🎒 Seus Itens Pessoais</h3>
          {myItems.length === 0 && (
            <p style={{ color: "#666", textAlign: "center" }}>
              Compre energéticos no Shopping (Aba Cidade) para recuperar
              energia!
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

      {/* ABA CARREIRA / CONTRATO */}
      {tab === "CARREIRA" && (
        <div className="animate-in">
          {/* Habilidades Adquiridas */}
          <div
            className="card"
            style={{ borderLeft: "4px solid #00E676", marginBottom: 15 }}
          >
            <h3 style={{ marginTop: 0, color: "#00E676" }}>
              🧠 Especializações Médicas
            </h3>
            {(doctor.perks || []).length === 0 ? (
              <p style={{ fontSize: 11, color: "#666" }}>
                Avançe de nível para desbloquear habilidades.
              </p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {doctor.perks.map((p) => (
                  <span
                    key={p.id}
                    className="badge"
                    style={{
                      background: "#004422",
                      border: "1px solid #00E676",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                    title={p.desc}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {doctor.teamId !== "FREE" ? (
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
                  onClick={() => onSelfAction("RAISE", doctor)}
                >
                  💰 PEDIR AUMENTO
                </button>
                <button
                  className="btn btn-gold"
                  onClick={() => onSelfAction("RESIGN_REQ", doctor)}
                >
                  👋 PEDIR PARA SAIR
                </button>
                <button
                  className="btn btn-red"
                  style={{ gridColumn: "span 2" }}
                  onClick={() => onSelfAction("BUYOUT", doctor)}
                >
                  💸 PAGAR MULTA ({fmt(doctor.clause || doctor.salary * 10)})
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: "#666", textAlign: "center" }}>
              Você não tem contrato vigente.
            </p>
          )}

          {/* Propostas */}
          <h3 style={{ marginTop: 20 }}>📩 Propostas Recebidas</h3>
          {offers
            .filter(
              (o) => o.recipientId === doctor.id && o.status !== "REJECTED",
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
                      onClick={() =>
                        onSelfAction("ACCEPT_OFFER", { doctor, offer: o })
                      }
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
            (o) => o.recipientId === doctor.id && o.status !== "REJECTED",
          ).length === 0 && (
            <small style={{ color: "#666" }}>Nenhuma proposta.</small>
          )}
        </div>
      )}
    </div>
  );
};
