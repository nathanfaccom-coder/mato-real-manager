import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { COACH_PERKS } from "../game/COACH_PERKS.js";
import { COACH_AFFINITIES } from "../game/COACH_AFFINITIES.js";
import { fmt } from "../game/fmt.js";
import { FORMATIONS } from "../game/FORMATIONS.js";
import { FORMATION_COORDINATES } from "../game/FORMATION_COORDINATES.js";
import { getPosColor } from "../game/getPosColor.js";

export const CoachDashboard = ({
  coach,
  team,
  players,
  offers,
  sales,
  onTrain,
  onEvolvePerk,
  onAddAffinity,
  onAcceptOffer,
  onRejectOffer,
  onCounterOffer,
  onUpdateSalary,
  onSelfAction,
  onUseItem,
  onSaveTactics,
  setModal,
}) => {
  const [tab, setTab] = useState("PRANCHETA");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectingPos, setSelectingPos] = useState(null); // Guarda qual posição está sendo preenchida
  const [trainingType, setTrainingType] = useState("FISICO_BASE");
  const [newSalary, setNewSalary] = useState(coach.salary);
  const [formation, setFormation] = useState(
    team?.tactics?.formation || "4-3-3 OFENSIVO",
  );
  const [lineup, setLineup] = useState(team?.tactics?.lineup || {});
  const [editingOffer, setEditingOffer] = useState(null);
  const [counterVals, setCounterVals] = useState({ s: 0, c: 1, cl: 0 });

  const xpNext = coach.level * 100;
  const progress = ((coach.xp || 0) / xpNext) * 100;

  // --- CÁLCULO DE ENERGIA UNIFICADO ---
  const energy = coach.energy !== undefined ? coach.energy : 100;
  const isExhausted = energy < 20;

  const showPerkSelection = coach.pendingPerks > 0;
  const availablePerks = COACH_PERKS.filter(
    (p) => !(coach.perks || []).some((cp) => cp.id === p.id),
  );
  const perkOptions = React.useMemo(
    () => availablePerks.sort(() => 0.5 - Math.random()).slice(0, 3),
    [coach.pendingPerks],
  );

  const showAffinitySelection = coach.pendingAffinity > 0;
  const availableAffinities = COACH_AFFINITIES.filter(
    (a) => !(coach.affinities || []).includes(a),
  );

  const myItems = (sales || []).filter((s) => s.buyerId === coach.id);

  // --- FUNÇÃO DE ESTUDAR TÁTICAS (GANHA XP / GASTA ENERGIA UNIFICADA) ---
  const handleStudy = () => {
    if (energy < 30)
      return alert(
        "Você está muito cansado para estudar! Tome um café ou energético.",
      );
    // Agora chama a função global onTrain com tipo STUDY para processar no Banco de Dados
    onTrain([], "STUDY");
  };

  // --- FUNÇÃO DE ESCALAR TIME ---
  const handleSetPosition = (index, playerId) => {
    const newLineup = { ...lineup, [index]: playerId };
    setLineup(newLineup);
  };

  const handleSaveTeam = () => {
    onSaveTactics(formation, lineup);
  };

  // --- FUNÇÃO DE UPLOAD DA FOTO DO TÉCNICO (COMPRIMIDA) ---
  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_SIZE = 150;
        let width = img.width;
        let height = img.height;

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
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

        if (confirm("Salvar esta foto de perfil do treinador?")) {
          try {
            await firebase
              .firestore()
              .collection("users")
              .doc(coach.id)
              .update({ face: dataUrl });
            alert("Foto atualizada com sucesso!");
          } catch (error) {
            console.error(error);
            alert("Erro ao salvar a foto: " + error.message);
          }
        }
      };
    };
  };

  const handleTogglePlayer = (pid) => {
    if (selectedPlayers.includes(pid))
      setSelectedPlayers(selectedPlayers.filter((id) => id !== pid));
    else if (selectedPlayers.length < 5)
      setSelectedPlayers([...selectedPlayers, pid]);
    else alert("Máximo de 5 jogadores!");
  };

  return (
    <div>
      {/* CABEÇALHO DO TÉCNICO */}
      <div
        className="highlight-card"
        style={{
          textAlign: "center",
          paddingBottom: 30,
          position: "relative",
          border: "2px solid gold",
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
          {/* FOTO DO TÉCNICO COM BOTÃO DE CÂMERA */}
          <div style={{ position: "relative", width: 65, height: 65 }}>
            {coach.face ? (
              <img
                src={coach.face}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "2px solid white",
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
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                }}
              >
                👔
              </div>
            )}
            <label
              style={{
                position: "absolute",
                bottom: -5,
                right: -5,
                background: "var(--primary)",
                color: "black",
                borderRadius: "50%",
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 12,
                border: "2px solid #121212",
                fontWeight: "bold",
                zIndex: 5,
              }}
            >
              📷
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFaceUpload}
              />
            </label>
          </div>

          <div>
            <h2 style={{ margin: 0, color: "gold" }}>{coach.name}</h2>
            <small style={{ color: "#ccc" }}>
              {team ? team.name : "Agente Livre"} | Nível {coach.level}
            </small>
          </div>
        </div>

        {/* BARRA DE ENERGIA UNIFICADA */}
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
          {energy}% Energia {isExhausted && "(Cansado: Treinos rendem 50%)"}
        </small>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            marginTop: 10,
          }}
        >
          <button
            className="btn btn-purple"
            style={{
              width: "auto",
              padding: "5px 15px",
              fontSize: 10,
              borderRadius: 20,
            }}
            onClick={handleStudy}
          >
            📚 ESTUDAR TÁTICAS (-30⚡ / +XP)
          </button>
        </div>

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
              {fmt(coach.balance || 0)}
            </div>
            <span style={{ fontSize: 9, color: "#888" }}>SALDO</span>
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
              {fmt(coach.salary)}
            </div>
            <span style={{ fontSize: 9, color: "#888" }}>SALÁRIO</span>
          </div>
          <div style={{ width: 1, background: "#333" }}></div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: "bold", color: "gold" }}>
              {coach.contract || 0}
            </div>
            <span style={{ fontSize: 9, color: "#888" }}>TEMPORADAS</span>
          </div>
        </div>

        {/* BARRA DE XP COM EXIBIÇÃO NUMÉRICA */}
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
              background: "linear-gradient(90deg, #FF8F00, gold)",
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
              color: "gold",
              fontWeight: "bold",
              textShadow: "1px 1px 2px black",
            }}
          >
            XP: {coach.xp || 0} / {xpNext}
          </div>
        </div>
      </div>

      {/* ABAS DO TÉCNICO */}
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
          className={`btn ${tab === "PRANCHETA" ? "btn-green" : "btn-ghost"}`}
          onClick={() => setTab("PRANCHETA")}
        >
          PRANCHETA
        </button>
        {/* BOTÃO DO CT (Abre o Modal diretamente) */}
        <button
          className="btn btn-warning"
          onClick={() =>
            team
              ? setModal({ type: "CT_TYCOON", data: team })
              : alert(
                  "🚫 Você precisa estar contratado por um Clube para ter acesso à prancheta e ao CT!",
                )
          }
        >
          🏋️‍♂️ CT
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
      </div>

      {/* ABA PRANCHETA (CAMPO VISUAL COM SELEÇÃO) */}
      {tab === "PRANCHETA" && (
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
              <p>Contrate um clube para acessar a prancheta tática.</p>
            </div>
          ) : (
            <div className="card" style={{ padding: "10px" }}>
              <div style={{ marginBottom: 15 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: "gold",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  ESTRATÉGIA DE JOGO
                </label>
                <select
                  className="input-field"
                  value={formation}
                  onChange={(e) => setFormation(e.target.value)}
                  style={{ background: "#111", border: "1px solid gold" }}
                >
                  {Object.keys(FORMATIONS).map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className="football-field"
                style={{
                  background: "#2e7d32",
                  position: "relative",
                  width: "100%",
                  height: "520px",
                  border: "4px solid #fff",
                  borderRadius: "15px",
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)",
                  overflow: "hidden",
                }}
              >
                {/* Linhas do Campo */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "rgba(255,255,255,0.5)",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 100,
                    height: 100,
                    border: "2px solid rgba(255,255,255,0.5)",
                    borderRadius: "50%",
                  }}
                ></div>

                {FORMATIONS[formation].map((posLabel, idx) => {
                  const coords = FORMATION_COORDINATES[formation]
                    ? FORMATION_COORDINATES[formation][idx]
                    : {
                        t: `${Math.floor(idx / 3) * 25 + 10}%`,
                        l: `${(idx % 3) * 30 + 20}%`,
                      };
                  const pId = lineup[idx];
                  const player = players.find((p) => p.id === pId);

                  return (
                    <div
                      key={idx}
                      className="player-slot"
                      style={{
                        position: "absolute",
                        top: coords.t,
                        left: coords.l,
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        zIndex: 10,
                      }}
                      onClick={() =>
                        setSelectingPos({ label: posLabel, index: idx })
                      }
                    >
                      <div
                        className="player-photo-circle"
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "50%",
                          border: player
                            ? "2px solid gold"
                            : "2px dashed rgba(255,255,255,0.3)",
                          background: player ? "#001a33" : "rgba(0,0,0,0.4)",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: player
                            ? "0 4px 10px rgba(0,0,0,0.5)"
                            : "none",
                        }}
                      >
                        {player?.face ? (
                          <img
                            src={player.face}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "10px",
                              fontWeight: "900",
                            }}
                          >
                            {posLabel}
                          </span>
                        )}
                      </div>
                      <div
                        className="player-name-label"
                        style={{
                          background: player ? "gold" : "rgba(0,0,0,0.8)",
                          color: player ? "#000" : "#fff",
                          fontSize: "9px",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          marginTop: "4px",
                          fontWeight: "900",
                          whiteSpace: "nowrap",
                          maxWidth: "80px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {player
                          ? player.name.split(" ")[0].toUpperCase()
                          : "VAZIO"}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
                <button
                  className="btn btn-green"
                  style={{ flex: 1, fontWeight: "900", height: 50 }}
                  onClick={handleSaveTeam}
                >
                  <i className="fas fa-save"></i> SALVAR ESCALAÇÃO
                </button>
                <button
                  className="btn btn-red"
                  style={{ width: 50 }}
                  onClick={() => {
                    if (confirm("Limpar escalação?")) setLineup({});
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              {/* MODAL SELETOR DE JOGADORES (FLUTUANTE) */}
              {selectingPos && (
                <div className="modal-overlay" style={{ zIndex: 9999 }}>
                  <div className="modal-content" style={{ maxHeight: "70vh" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 15,
                      }}
                    >
                      <h3 style={{ margin: 0 }}>
                        Escalar {selectingPos.label}
                      </h3>
                      <button
                        className="btn btn-red"
                        style={{ width: "auto", padding: "5px 10px" }}
                        onClick={() => setSelectingPos(null)}
                      >
                        X
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        overflowY: "auto",
                      }}
                    >
                      <div
                        className="card"
                        style={{
                          background: "#333",
                          border: "1px dashed #666",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleSetPosition(selectingPos.index, null);
                          setSelectingPos(null);
                        }}
                      >
                        <b>❌ REMOVER JOGADOR DESTA VAGA</b>
                      </div>

                      {players
                        .filter((p) => p.teamId === coach.teamId)
                        .filter(
                          (p) =>
                            !Object.values(lineup).includes(p.id) ||
                            lineup[selectingPos.index] === p.id,
                        )
                        .map((p) => (
                          <div
                            key={p.id}
                            className="card"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              cursor: "pointer",
                              borderLeft: `4px solid ${getPosColor(p.position)}`,
                              background:
                                lineup[selectingPos.index] === p.id
                                  ? "rgba(0,230,118,0.1)"
                                  : "var(--bg-input)",
                            }}
                            onClick={() => {
                              handleSetPosition(selectingPos.index, p.id);
                              setSelectingPos(null);
                            }}
                          >
                            {p.face ? (
                              <img
                                src={p.face}
                                style={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  objectPosition: "top",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: "50%",
                                  background: "#333",
                                  display: "grid",
                                  placeItems: "center",
                                  fontSize: 12,
                                }}
                              >
                                👤
                              </div>
                            )}
                            <div style={{ flex: 1 }}>
                              <b>{p.name}</b>
                              <br />
                              <small style={{ color: "#aaa" }}>
                                {p.position} | OV: {p.overall}
                              </small>
                            </div>
                            {lineup[selectingPos.index] === p.id && (
                              <i
                                className="fas fa-check-circle"
                                style={{ color: "var(--primary)" }}
                              ></i>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ABA MOCHILA */}
      {tab === "MOCHILA" && (
        <div>
          <h3>🎒 Inventário do Técnico</h3>
          {myItems.length === 0 && (
            <p style={{ color: "#666", textAlign: "center" }}>
              Compre energéticos no Shopping para recuperar energia!
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

      {/* ABA CARREIRA */}
      {tab === "CARREIRA" && (
        <div className="animate-in">
          {/* --- SALA DE TROFÉUS DO TÉCNICO --- */}
          <div
            className="card"
            style={{
              borderLeft: "4px solid gold",
              background: "rgba(255,215,0,0.05)",
              marginBottom: 15,
            }}
          >
            <h3 style={{ marginTop: 0, color: "gold" }}>
              🏆 Galeria de Títulos
            </h3>
            {!coach.trophies || coach.trophies.length === 0 ? (
              <p style={{ fontSize: 11, color: "#666" }}>
                O professor ainda não levantou nenhuma taça.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                  gap: 10,
                }}
              >
                {[...coach.trophies].reverse().map((t, i) => (
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
          {/* AVISOS DE NOVO NÍVEL (MOVIDOS PARA CÁ) */}
          {showPerkSelection && (
            <div
              className="card pulse-border"
              style={{ background: "rgba(255, 215, 0, 0.1)", marginBottom: 15 }}
            >
              <h3 style={{ color: "gold", textAlign: "center", marginTop: 0 }}>
                ✨ NOVO NÍVEL ALCANÇADO!
              </h3>
              <p style={{ textAlign: "center", fontSize: 11 }}>
                Escolha uma nova Habilidade Passiva:
              </p>
              <div style={{ display: "grid", gap: 5 }}>
                {perkOptions.map((p) => (
                  <div
                    key={p.id}
                    className="card"
                    style={{ cursor: "pointer", border: "1px solid #555" }}
                    onClick={() => onEvolvePerk(p)}
                  >
                    <b style={{ color: "var(--primary)" }}>{p.name}</b>
                    <br />
                    <small>{p.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showAffinitySelection && (
            <div
              className="card"
              style={{
                borderLeft: "4px solid var(--secondary)",
                marginBottom: 15,
              }}
            >
              <h3 style={{ marginTop: 0 }}>📚 Nova Especialização</h3>
              <p style={{ fontSize: 11, color: "#aaa" }}>
                Escolha uma nova posição para se tornar mestre:
              </p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {availableAffinities.map((a) => (
                  <button
                    key={a}
                    className="btn btn-ghost"
                    onClick={() => onAddAffinity(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FOTO DE PERFIL */}
          <div
            className="card"
            style={{ border: "1px dashed #666", marginBottom: 15 }}
          >
            <h3 style={{ marginTop: 0 }}>📷 Atualizar Foto de Perfil</h3>
            <label
              className="btn btn-ghost"
              style={{
                display: "block",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <i className="fas fa-camera"></i> ESCOLHER FOTO
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFaceUpload}
              />
            </label>
          </div>

          {/* STATUS DO CONTRATO */}
          {coach.teamId !== "FREE" && (
            <div
              className="card"
              style={{ border: "1px solid #444", marginBottom: 15 }}
            >
              <h3>📝 Meu Contrato</h3>
              <p style={{ fontSize: 12 }}>
                Clube: <b>{team?.name || "Desconhecido"}</b>
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
                  onClick={() => onSelfAction("RAISE", coach)}
                >
                  💰 PEDIR AUMENTO
                </button>
                <button
                  className="btn btn-gold"
                  onClick={() => onSelfAction("RESIGN_REQ", coach)}
                >
                  👋 PEDIR PARA SAIR
                </button>
                <button
                  className="btn btn-red"
                  style={{ gridColumn: "span 2" }}
                  onClick={() => onSelfAction("BUYOUT", coach)}
                >
                  💸 PAGAR MULTA ({fmt(coach.clause || coach.salary * 10)})
                </button>
              </div>
            </div>
          )}

          {/* PROPOSTAS DE CONTRATO (CAIXA DE ENTRADA DO TÉCNICO) */}
          <div
            className="card"
            style={{ borderLeft: "4px solid var(--primary)" }}
          >
            <h3>📩 Propostas de Contrato</h3>
            {offers.filter(
              (o) => o.recipientId === coach.id && o.status !== "REJECTED",
            ).length === 0 && (
              <p style={{ color: "#666", fontSize: 12 }}>
                Nenhuma proposta pendente.
              </p>
            )}

            {offers
              .filter(
                (o) => o.recipientId === coach.id && o.status !== "REJECTED",
              )
              .map((o) => (
                <div
                  key={o.id}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                >
                  {o.type === "SUGESTAO_RESPOSTA" ? (
                    <div>
                      <b style={{ color: o.accepted ? "lime" : "red" }}>
                        {o.accepted ? "✅ ACEITO" : "❌ RECUSADO"}
                      </b>
                      <p style={{ fontSize: 11 }}>{o.description}</p>
                      <button
                        className="btn btn-ghost"
                        style={{ fontSize: 9 }}
                        onClick={() => onRejectOffer(o)}
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <b>{o.teamName}</b>
                        {o.status === "COUNTERED" && (
                          <small style={{ color: "gold" }}>
                            Aguardando Clube...
                          </small>
                        )}
                      </div>

                      {editingOffer === o.id ? (
                        <div
                          style={{
                            marginTop: 10,
                            background: "#000",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        >
                          <label style={{ fontSize: 10 }}>Salário (₣)</label>
                          <input
                            className="input-field"
                            type="number"
                            value={counterVals.s}
                            onChange={(e) =>
                              setCounterVals({
                                ...counterVals,
                                s: e.target.value,
                              })
                            }
                          />

                          <label style={{ fontSize: 10 }}>
                            Contrato (Anos)
                          </label>
                          <select
                            className="input-field"
                            value={counterVals.c}
                            onChange={(e) =>
                              setCounterVals({
                                ...counterVals,
                                c: e.target.value,
                              })
                            }
                          >
                            <option value="1">1 Ano</option>
                            <option value="2">2 Anos</option>
                            <option value="3">3 Anos</option>
                          </select>

                          <label style={{ fontSize: 10 }}>Multa (₣)</label>
                          <input
                            className="input-field"
                            type="number"
                            value={counterVals.cl}
                            onChange={(e) =>
                              setCounterVals({
                                ...counterVals,
                                cl: e.target.value,
                              })
                            }
                          />

                          <div style={{ display: "flex", gap: 5 }}>
                            <button
                              className="btn btn-gold"
                              onClick={() => {
                                onCounterOffer(
                                  o,
                                  counterVals.s,
                                  counterVals.c,
                                  counterVals.cl,
                                );
                                setEditingOffer(null);
                              }}
                            >
                              ENVIAR CONTRA-PROPOSTA
                            </button>
                            <button
                              className="btn btn-red"
                              onClick={() => setEditingOffer(null)}
                            >
                              CANCELAR
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, marginTop: 5 }}>
                          <div>
                            💰 Salário:{" "}
                            <span style={{ color: "lime" }}>
                              {fmt(o.salary)}
                            </span>
                          </div>
                          <div>
                            📅 Duração:{" "}
                            <span style={{ color: "white" }}>
                              {o.contract} Temp.
                            </span>
                          </div>
                          <div>
                            🔒 Multa:{" "}
                            <span style={{ color: "red" }}>
                              {fmt(o.clause)}
                            </span>
                          </div>

                          {o.status === "PENDING" && (
                            <div
                              style={{ display: "flex", gap: 5, marginTop: 10 }}
                            >
                              <button
                                className="btn btn-green"
                                onClick={() => onAcceptOffer(o)}
                              >
                                ACEITAR
                              </button>

                              {coach.level >= 2 ? (
                                <button
                                  className="btn btn-blue"
                                  onClick={() => {
                                    setCounterVals({
                                      s: o.salary,
                                      c: o.contract,
                                      cl: o.clause,
                                    });
                                    setEditingOffer(o.id);
                                  }}
                                >
                                  NEGOCIAR
                                </button>
                              ) : (
                                <button
                                  className="btn btn-ghost"
                                  disabled
                                  style={{ opacity: 0.5 }}
                                >
                                  Nív. 2 p/ Negociar
                                </button>
                              )}

                              <button
                                className="btn btn-red"
                                onClick={() => onRejectOffer(o)}
                              >
                                RECUSAR
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* PRETENSÃO SALARIAL */}
          <div className="card" style={{ marginTop: 15 }}>
            <h3>💰 Atualizar Pretensão Salarial</h3>
            {coach.level >= 2 ? (
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  className="input-field"
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                />
                <button
                  className="btn btn-gold"
                  onClick={() => onUpdateSalary(newSalary)}
                >
                  DEFINIR
                </button>
              </div>
            ) : (
              <p style={{ color: "#666", fontSize: 11 }}>
                Desbloqueia no Nível 2.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
