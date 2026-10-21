import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { CT_DB } from "../game/CT_DB.js";
import { fmt } from "../game/fmt.js";

export const TrainingCenterManager = ({
  team,
  players,
  staff,
  user,
  onClose,
  onTrain,
  onTrainSolo,
}) => {
  const lvl = team.ctLevel || 1;
  const db = CT_DB[lvl];
  const nextDb = CT_DB[lvl + 1];

  const isPresident = user.type === "USER" && user.data.id === team.id;
  const isCoach = user.type === "COACH" && user.data.teamId === team.id;
  const isPlayer = user.type === "PLAYER" && user.data.teamId === team.id;

  const [tab, setTab] = useState("LOBBY");
  const [trainingType, setTrainingType] = useState("FISICO_BASE");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const energy = user.data?.energy !== undefined ? user.data.energy : 100;

  // Identificando quem é quem no Staff
  const coach = (staff || []).find((c) => c.type === "COACH");
  const assistant = (staff || []).find((c) => c.type === "ASSISTANT");
  const doctor = (staff || []).find((c) => c.type === "DOCTOR");
  const scout = (staff || []).find((c) => c.type === "SCOUT");

  const handleUpgrade = async () => {
    if (!nextDb) return;
    if ((team.balance || 0) < db.upgCost) return alert("Saldo insuficiente!");
    if (confirm(`Evoluir para ${nextDb.name} por ${fmt(db.upgCost)}?`)) {
      await firebase
        .firestore()
        .collection("teams")
        .doc(team.id)
        .update({
          balance: firebase.firestore.FieldValue.increment(-db.upgCost),
          ctLevel: lvl + 1,
        });
      alert("CT evoluído com sucesso!");
      onClose();
    }
  };

  const handleTogglePlayer = (pid) => {
    if (selectedPlayers.includes(pid))
      setSelectedPlayers(selectedPlayers.filter((id) => id !== pid));
    else if (selectedPlayers.length < 5)
      setSelectedPlayers([...selectedPlayers, pid]);
    else alert("Máximo de 5 jogadores!");
  };

  const StaffCard = ({ roleName, member, icon, color }) => (
    <div
      className="card"
      style={{
        borderLeft: `3px solid ${color}`,
        padding: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {member && member.face ? (
        <img
          src={member.face}
          style={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: 35,
            height: 35,
            background: "#333",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <small style={{ color: color, fontSize: "9px", fontWeight: "bold" }}>
          {roleName}
        </small>
        <br />
        <b style={{ fontSize: "11px" }}>
          {member ? member.name : "Vaga Aberta"}
        </b>
        {member && (
          <div
            style={{
              width: "100%",
              background: "#222",
              height: 4,
              borderRadius: 2,
              marginTop: 4,
            }}
          >
            <div
              style={{
                width: `${member.energy || 0}%`,
                background: (member.energy || 0) > 40 ? "lime" : "red",
                height: "100%",
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "650px", padding: "15px", background: "#121212" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABEÇALHO DO CT */}
        <div
          style={{
            position: "relative",
            height: 100,
            background: "#1a1a1a",
            borderRadius: 8,
            overflow: "hidden",
            marginBottom: 15,
            border: "2px solid #00E676",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: 40,
              color: "#222",
            }}
          >
            🏋️‍♂️
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.95))",
              padding: "20px 10px 5px 10px",
            }}
          >
            <b style={{ color: "#00E676", fontSize: 14, display: "block" }}>
              {db.name} <small style={{ color: "gold" }}>(Nvl {lvl})</small>
            </b>
          </div>
        </div>

        {/* ABAS SETORIZADAS */}
        <div
          style={{
            display: "flex",
            gap: 5,
            marginBottom: 15,
            overflowX: "auto",
            paddingBottom: 5,
          }}
        >
          <button
            className={`btn ${tab === "LOBBY" ? "btn-blue" : "btn-ghost"}`}
            onClick={() => setTab("LOBBY")}
          >
            🏠 LOBBY (AVISOS)
          </button>
          <button
            className={`btn ${tab === "CAMPO" ? "btn-green" : "btn-ghost"}`}
            onClick={() => setTab("CAMPO")}
          >
            ⚽ CAMPO
          </button>
          <button
            className={`btn ${tab === "DM" ? "btn-red" : "btn-ghost"}`}
            onClick={() => setTab("DM")}
          >
            🏥 DM
          </button>
          <button
            className={`btn ${tab === "DIRETORIA" ? "btn-purple" : "btn-ghost"}`}
            onClick={() => setTab("DIRETORIA")}
          >
            💼 DIRETORIA
          </button>
        </div>

        {/* ABA 1: LOBBY E DIÁRIO DE ATIVIDADES */}
        {tab === "LOBBY" && (
          <div className="animate-in">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <StaffCard
                roleName="TÉCNICO"
                member={coach}
                icon="👔"
                color="gold"
              />
              <StaffCard
                roleName="AUXILIAR"
                member={assistant}
                icon="📋"
                color="#2979FF"
              />
              <StaffCard
                roleName="MÉDICO"
                member={doctor}
                icon="🩺"
                color="#00E676"
              />
              <StaffCard
                roleName="OLHEIRO"
                member={scout}
                icon="🕵️‍♂️"
                color="#D500F9"
              />
            </div>

            <h4
              style={{
                color: "cyan",
                borderBottom: "1px solid #333",
                paddingBottom: 5,
                marginTop: 0,
              }}
            >
              📋 Diário Oficial do Clube
            </h4>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                background: "rgba(0,0,0,0.3)",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #222",
              }}
            >
              {!team.trainingLogs || team.trainingLogs.length === 0 ? (
                <p style={{ fontSize: 11, color: "#666", textAlign: "center" }}>
                  Nenhuma atividade da comissão registrada nesta semana.
                </p>
              ) : (
                team.trainingLogs.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: 10,
                      paddingBottom: 10,
                      borderBottom: "1px dashed #444",
                      fontSize: 11,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#aaa",
                        marginBottom: 5,
                      }}
                    >
                      <b
                        style={{
                          color: "#fff",
                          background: "#333",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {log.type}
                      </b>
                      <span style={{ fontSize: 9 }}>
                        {new Date(log.date).toLocaleString()}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#00E676",
                        whiteSpace: "pre-wrap",
                        paddingLeft: 5,
                      }}
                    >
                      {log.report}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ABA 2: CAMPO DE TREINO */}
        {tab === "CAMPO" && (
          <div className="animate-in">
            <p style={{ fontSize: 11, color: "#aaa" }}>
              Bônus atual da estrutura:{" "}
              <b style={{ color: "lime" }}>+{db.bonusXP}% XP</b>
            </p>

            {(isPlayer || isCoach) && (
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 15,
                }}
              >
                <label style={{ fontSize: 11 }}>Foco do Treino:</label>
                <select
                  className="input-field"
                  style={{ margin: "5px 0" }}
                  value={trainingType}
                  onChange={(e) => setTrainingType(e.target.value)}
                >
                  <option value="FISICO_BASE">
                    🏋️‍♂️ Físico e Condicionamento
                  </option>
                  <option value="PASSE">⚽ Passes e Visão</option>
                  <option value="CHUTE">🎯 Finalização</option>
                  <option value="DEFESA">🛡️ Marcação e Defesa</option>
                  <option value="GOLEIRO">🧤 Treino de Goleiro</option>
                </select>

                {isPlayer && (
                  <button
                    className="btn btn-green"
                    onClick={() => {
                      onTrainSolo(user.data, trainingType);
                      onClose();
                    }}
                  >
                    🏃 INICIAR TREINO SOLO (-35⚡)
                  </button>
                )}

                {isCoach && (
                  <button
                    className="btn btn-gold"
                    onClick={() => {
                      if (selectedPlayers.length === 0)
                        return alert(
                          "Selecione os jogadores da lista abaixo primeiro.",
                        );
                      onTrain(selectedPlayers, trainingType);
                      onClose();
                    }}
                  >
                    👔 DAR TREINO COLETIVO (-20⚡)
                  </button>
                )}
              </div>
            )}

            <h4 style={{ color: "gold", marginTop: 0 }}>
              🏃 Jogadores no Campo
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {players.map((p) => (
                <div
                  key={p.id}
                  className="card"
                  style={{
                    background: selectedPlayers.includes(p.id)
                      ? "rgba(0,255,0,0.1)"
                      : "#111",
                    border: selectedPlayers.includes(p.id)
                      ? "1px solid var(--primary)"
                      : "1px solid #333",
                    cursor: isCoach ? "pointer" : "default",
                    padding: "10px",
                    opacity: (p.recoveryLeft || 0) > 0 ? 0.4 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onClick={() => isCoach && handleTogglePlayer(p.id)}
                >
                  {/* FOTO DO JOGADOR RESTAURADA */}
                  {p.face ? (
                    <img
                      src={p.face}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        background: "#333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                      }}
                    >
                      👤
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", fontSize: 11 }}>
                      {p.name} {(p.recoveryLeft || 0) > 0 ? "🏥" : ""}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "#aaa",
                        marginBottom: "4px",
                      }}
                    >
                      {p.position} | OV: {p.overall}
                    </div>

                    {/* BARRINHA DE ENERGIA RESTAURADA */}
                    <div
                      style={{
                        width: "100%",
                        background: "#222",
                        height: 6,
                        borderRadius: 3,
                        overflow: "hidden",
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 3: DEPARTAMENTO MÉDICO */}
        {tab === "DM" && (
          <div className="animate-in">
            <div
              style={{
                background: "#b71c1c",
                padding: 10,
                borderRadius: 8,
                color: "white",
                marginBottom: 15,
                display: "flex",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 24 }}>🚑</span>
              <div>
                <b style={{ display: "block" }}>DEPARTAMENTO MÉDICO</b>
                <small>Os atletas abaixo não podem treinar nem jogar.</small>
              </div>
            </div>

            {players.filter((p) => (p.recoveryLeft || 0) > 0).length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                Nenhum jogador lesionado!
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {players
                  .filter((p) => (p.recoveryLeft || 0) > 0)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="card"
                      style={{ borderLeft: "4px solid red" }}
                    >
                      <b style={{ color: "red" }}>{p.name}</b>
                      <div style={{ fontSize: 11 }}>
                        Lesão:{" "}
                        {typeof p.injury === "object"
                          ? p.injury.label
                          : p.injury}
                      </div>
                      <div style={{ fontSize: 11, color: "#aaa" }}>
                        Faltam: <b>{p.recoveryLeft} jogos</b> para voltar.
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <p
              style={{
                fontSize: 10,
                color: "#aaa",
                textAlign: "center",
                marginTop: 15,
              }}
            >
              * O <b>Médico</b> e o <b>Auxiliar</b> devem acessar seus painéis
              pessoais para realizar tratamentos e curar os jogadores.
            </p>
          </div>
        )}

        {/* ABA 4: DIRETORIA (PENEIRAS E UPGRADES) */}
        {tab === "DIRETORIA" && (
          <div className="animate-in">
            {isPresident && nextDb && (
              <div
                style={{
                  marginBottom: 15,
                  padding: 10,
                  border: "1px dashed gold",
                  borderRadius: 8,
                  textAlign: "center",
                  background: "rgba(255,215,0,0.05)",
                }}
              >
                <b style={{ color: "gold" }}>
                  Melhoria de CT: {nextDb.name} (+{nextDb.bonusXP}% XP)
                </b>
                <button
                  className="btn btn-gold"
                  onClick={handleUpgrade}
                  style={{ color: "#000", margin: "10px 0 0 0", fontSize: 10 }}
                >
                  AUTORIZAR OBRA ({fmt(db.upgCost)})
                </button>
              </div>
            )}

            <h4 style={{ color: "var(--purple)", marginTop: 0 }}>
              🔎 Relatórios do Olheiro (Peneira)
            </h4>
            {!team.peneiraList || team.peneiraList.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666", fontSize: 11 }}>
                O Olheiro ainda não enviou nenhum relatório hoje.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {team.peneiraList.map((npc) => (
                  <div
                    key={npc.id}
                    className="card"
                    style={{
                      borderLeft: "4px solid var(--purple)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <b>{npc.name}</b>{" "}
                      <span
                        style={{
                          fontSize: 9,
                          background: "#333",
                          padding: "2px 5px",
                          borderRadius: 3,
                        }}
                      >
                        {npc.position}
                      </span>
                      <br />
                      <small style={{ color: "#aaa" }}>
                        OVR: <b style={{ color: "gold" }}>{npc.overall}</b> |
                        Custo: {fmt(npc.value)}
                      </small>
                    </div>
                    {isPresident && (
                      <button
                        className="btn btn-green"
                        style={{
                          fontSize: 9,
                          padding: "5px",
                          width: "auto",
                          margin: 0,
                        }}
                        onClick={async () => {
                          // --- RESTAURANDO A REGRA DOS 7 BOTS ---
                          const myTeamBots = players.filter(
                            (pl) => pl.teamId === team.id && pl.isNPC,
                          ).length;

                          if (myTeamBots >= 7) {
                            return alert(
                              `🚫 LIMITE DA BASE ATINGIDO!\nVocê já tem 7/7 BOTS no elenco. Venda ou dispense um antes de subir outro da peneira.`,
                            );
                          }

                          if (
                            !confirm(
                              `⚠️ AVISO DA BASE\n\nAtualmente você tem ${myTeamBots}/7 BOTS no elenco.\nTem certeza que deseja aprovar a contratação de ${npc.name} por ${fmt(npc.value)}?`,
                            )
                          ) {
                            return;
                          }

                          if (team.balance < npc.value)
                            return alert("Caixa insuficiente!");

                          await firebase
                            .firestore()
                            .collection("teams")
                            .doc(team.id)
                            .update({
                              balance: firebase.firestore.FieldValue.increment(
                                -npc.value,
                              ),
                              peneiraList: team.peneiraList.filter(
                                (x) => x.id !== npc.id,
                              ),
                            });

                          await firebase
                            .firestore()
                            .collection("players")
                            .add({
                              name: npc.name,
                              position: npc.position,
                              overall: npc.overall,
                              attributes: npc.attributes,
                              salary: npc.salary,
                              value: npc.value,
                              teamId: team.id,
                              status: "NAO_A_VENDA",
                              contract: 3,
                              isNPC: true,
                              mood: "😐",
                              balance: npc.value,
                              xp: 0,
                              fame: 0,
                              stats: {
                                goals: 0,
                                assists: 0,
                                tackles: 0,
                                saves: 0,
                                yellows: 0,
                                reds: 0,
                              },
                            });

                          alert(`${npc.name} foi contratado para a base!`);
                          onClose();
                        }}
                      >
                        APROVAR
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-red"
          style={{ marginTop: 15 }}
          onClick={onClose}
        >
          FECHAR
        </button>
      </div>
    </div>
  );
};
