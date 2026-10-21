import React, { useState, useEffect } from "react";
import { INJURIES_DB } from "../game/INJURIES_DB.js";

export const MatchPerformanceForm = ({
  players,
  teams,
  onSaveStats,
  matchData,
}) => {
  const [mode, setMode] = useState("TEAM");

  // --- ESTADOS DO MODO SÚMULA RÁPIDA (TIME) ---
  const [selTeamId, setSelTeamId] = useState("");
  const [teamResult, setTeamResult] = useState("NENHUM");
  const [batchStats, setBatchStats] = useState({});

  // --- ESTADOS DO MODO INDIVIDUAL (ANTIGO) ---
  const [selP, setSelP] = useState(null);
  const [match, setMatch] = useState({
    goals: 0,
    assists: 0,
    tackles: 0,
    saves: 0,
    yellows: 0,
    reds: 0,
    rating: "",
    result: "NENHUM",
    injuredType: "NONE",
  });
  const [search, setSearch] = useState("");

  // --- LÓGICA DE SORTEIO DE LESÃO (SÚMULA) ---
  const rollInjury = (withAmbulance) => {
    const rand = Math.random() * 100;
    let cat = "LEVE";
    let time = 1;

    if (withAmbulance) {
      // Se sair de ambulância: Lesões extremamente longas (Precisa de Médico urgente)
      if (rand < 10) {
        cat = "LEVE";
        time = Math.floor(Math.random() * 3) + 2;
      } // 2 a 4 jogos
      else if (rand < 35) {
        cat = "MODERADA";
        time = Math.floor(Math.random() * 4) + 5;
      } // 5 a 8 jogos
      else if (rand < 75) {
        cat = "GRAVE";
        time = Math.floor(Math.random() * 6) + 9;
      } // 9 a 14 jogos
      else {
        cat = "EXTREMA";
        time = Math.floor(Math.random() * 11) + 15;
      } // 15 a 25 jogos
    } else {
      // Se sair andando: Ainda machuca, mas um pouco menos
      if (rand < 50) {
        cat = "LEVE";
        time = Math.floor(Math.random() * 2) + 2;
      } // 2 a 3 jogos
      else if (rand < 85) {
        cat = "MODERADA";
        time = Math.floor(Math.random() * 3) + 4;
      } // 4 a 6 jogos
      else if (rand < 97) {
        cat = "GRAVE";
        time = Math.floor(Math.random() * 4) + 7;
      } // 7 a 10 jogos
      else {
        cat = "EXTREMA";
        time = Math.floor(Math.random() * 5) + 12;
      } // 12 a 16 jogos
    }

    const injuryList = INJURIES_DB[cat];
    const injuryName =
      injuryList[Math.floor(Math.random() * injuryList.length)];

    return { name: injuryName, time: time };
  };

  // --- LÓGICA DO MODO TIME ---
  const handleBatchChange = (pid, field, val) => {
    setBatchStats((prev) => ({
      ...prev,
      [pid]: { ...prev[pid], [field]: val },
    }));
  };

  const submitBatch = () => {
    const payload = [];
    const teamPlayers = players.filter((p) => p.teamId === selTeamId);

    teamPlayers.forEach((p) => {
      const s = batchStats[p.id] || {};
      // Só adiciona se o jornalista tiver dado pelo menos a NOTA
      if (s.rating && s.rating !== "") {
        let injuryData = null;
        // Se marcou que lesionou
        if (s.injuredType && s.injuredType !== "NONE") {
          injuryData = rollInjury(s.injuredType === "AMBULANCE");
        }

        payload.push({
          player: p,
          match: {
            goals: parseInt(s.goals || 0),
            assists: parseInt(s.assists || 0),
            tackles: parseInt(s.tackles || 0),
            saves: parseInt(s.saves || 0),
            yellows: parseInt(s.yellows || 0),
            reds: parseInt(s.reds || 0),
            rating: parseFloat(s.rating),
            result: teamResult,
            // Novos campos de lesão
            injury: injuryData ? injuryData.name : null,
            recoveryLeft: injuryData ? injuryData.time : 0,
          },
        });
      }
    });

    if (payload.length === 0)
      return alert("Preencha a NOTA de pelo menos um jogador para salvar.");

    if (confirm(`Confirmar súmula para ${payload.length} jogadores?`)) {
      const homeTeamObj = matchData
        ? teams.find((t) => t.id === matchData.homeId)
        : null;
      if (homeTeamObj && selTeamId === homeTeamObj.id) {
        onSaveStats(payload, null, undefined, homeTeamObj, matchData);
      } else {
        onSaveStats(payload, null, undefined, null, matchData);
      }
    }
  };

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  // --- RENDERIZAÇÃO ---
  return (
    <div style={{ minHeight: 400 }}>
      <h3 style={{ color: "var(--primary)", marginTop: 0 }}>
        Lançar Desempenho
      </h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          className={`btn ${mode === "TEAM" ? "btn-blue" : "btn-ghost"}`}
          onClick={() => setMode("TEAM")}
        >
          POR TIME (RÁPIDO)
        </button>
        <button
          className={`btn ${mode === "SEARCH" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setMode("SEARCH")}
        >
          BUSCA INDIVIDUAL
        </button>
      </div>

      {/* === MODO 1: SÚMULA POR TIME (TABELA DETALHADA) === */}
      {mode === "TEAM" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 10 }}>Selecione o Time</label>
              {matchData ? (
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className={`btn ${selTeamId === matchData.homeId ? "btn-green" : "btn-ghost"}`}
                    style={{ margin: 0, padding: "8px", fontSize: 11 }}
                    onClick={() => setSelTeamId(matchData.homeId)}
                  >
                    🏠 {matchData.homeName}
                  </button>
                  <button
                    className={`btn ${selTeamId === matchData.awayId ? "btn-green" : "btn-ghost"}`}
                    style={{ margin: 0, padding: "8px", fontSize: 11 }}
                    onClick={() => setSelTeamId(matchData.awayId)}
                  >
                    ✈️ {matchData.awayName}
                  </button>
                </div>
              ) : (
                <select
                  className="input-field"
                  value={selTeamId}
                  onChange={(e) => setSelTeamId(e.target.value)}
                >
                  <option value="">-- Escolha --</option>
                  {teams
                    .filter((t) => t.status !== "PENDING")
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
            <div style={{ width: 120 }}>
              <label style={{ fontSize: 10 }}>Resultado Geral</label>
              <select
                className="input-field"
                value={teamResult}
                onChange={(e) => setTeamResult(e.target.value)}
              >
                <option value="NENHUM">Neutro</option>
                <option value="VITORIA">Vitória</option>
                <option value="EMPATE">Empate</option>
                <option value="DERROTA">Derrota</option>
              </select>
            </div>
          </div>

          {selTeamId && (
            <div>
              <div
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  border: "1px solid #333",
                  borderRadius: 5,
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 10,
                  }}
                >
                  <thead
                    style={{
                      background: "#222",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                    }}
                  >
                    <tr>
                      <th style={{ padding: 5, textAlign: "left" }}>Jogador</th>
                      <th
                        style={{
                          padding: 2,
                          width: 35,
                          textAlign: "center",
                          color: "gold",
                        }}
                      >
                        Nota
                      </th>
                      <th
                        style={{ padding: 2, width: 30, textAlign: "center" }}
                      >
                        GOL
                      </th>
                      <th
                        style={{ padding: 2, width: 30, textAlign: "center" }}
                      >
                        ASS
                      </th>
                      <th
                        style={{
                          padding: 2,
                          width: 110,
                          textAlign: "center",
                          color: "#ff1744",
                        }}
                      >
                        Ocorreu Lesão?
                      </th>
                      <th
                        style={{
                          padding: 2,
                          width: 30,
                          textAlign: "center",
                          color: "orange",
                        }}
                      >
                        DES
                      </th>
                      <th
                        style={{
                          padding: 2,
                          width: 30,
                          textAlign: "center",
                          color: "cyan",
                        }}
                      >
                        DEF
                      </th>
                      <th
                        style={{
                          padding: 2,
                          width: 30,
                          textAlign: "center",
                          color: "yellow",
                        }}
                      >
                        AMA
                      </th>
                      <th
                        style={{
                          padding: 2,
                          width: 30,
                          textAlign: "center",
                          color: "red",
                        }}
                      >
                        VER
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {players
                      .filter((p) => p.teamId === selTeamId)
                      .map((p) => {
                        const s = batchStats[p.id] || {};
                        const hasData = s.rating && s.rating !== "";
                        const isGK = p.position === "GOL";

                        return (
                          <tr
                            key={p.id}
                            style={{
                              background: hasData
                                ? "rgba(0,255,0,0.08)"
                                : "transparent",
                              borderBottom: "1px solid #333",
                            }}
                          >
                            <td style={{ padding: 5 }}>
                              <b>
                                {p.name} {p.recoveryLeft > 0 ? "❌" : ""}
                              </b>
                              <br />
                              <span style={{ color: "#888", fontSize: 9 }}>
                                {p.position}
                              </span>
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                step="0.1"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                  borderColor: hasData ? "lime" : "#444",
                                }}
                                placeholder="-"
                                value={s.rating || ""}
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "rating",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                }}
                                placeholder="0"
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "goals",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                }}
                                placeholder="0"
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "assists",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: 2 }}>
                              <select
                                className="input-field"
                                style={{
                                  marginBottom: 0,
                                  fontSize: 9,
                                  padding: 2,
                                  background:
                                    s.injuredType && s.injuredType !== "NONE"
                                      ? "#440000"
                                      : "var(--bg-input)",
                                }}
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "injuredType",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="NONE">✅ Saudável</option>
                                <option value="WALKING">
                                  🚶 Lesão s/ Ambulância
                                </option>
                                <option value="AMBULANCE">
                                  🚑 Lesão c/ Ambulância
                                </option>
                              </select>
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                  background: isGK ? "#111" : "var(--bg-input)",
                                  color: "orange",
                                  opacity: isGK ? 0.3 : 1,
                                }}
                                placeholder="0"
                                disabled={isGK}
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "tackles",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                  background: !isGK
                                    ? "#111"
                                    : "var(--bg-input)",
                                  color: "cyan",
                                  opacity: !isGK ? 0.3 : 1,
                                }}
                                placeholder="0"
                                disabled={!isGK}
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "saves",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                  color: "yellow",
                                }}
                                placeholder="0"
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "yellows",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: 2 }}>
                              <input
                                className="input-field"
                                type="number"
                                style={{
                                  marginBottom: 0,
                                  padding: 2,
                                  textAlign: "center",
                                  height: 25,
                                  color: "red",
                                }}
                                placeholder="0"
                                onChange={(e) =>
                                  handleBatchChange(
                                    p.id,
                                    "reds",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-green"
                style={{ marginTop: 15, padding: 15 }}
                onClick={submitBatch}
              >
                💾 SALVAR SÚMULA COMPLETA
              </button>
            </div>
          )}
        </div>
      )}

      {/* === MODO 2: BUSCA INDIVIDUAL (Mantido e Corrigido) === */}
      {mode === "SEARCH" && (
        <div>
          {!selP ? (
            <div>
              <input
                className="input-field"
                placeholder="Buscar jogador..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div style={{ maxHeight: 300, overflowY: "auto" }}>
                {search.length > 0 &&
                  filtered.map((p) => (
                    <div
                      key={p.id}
                      className="card"
                      onClick={() => {
                        setSelP(p);
                        setMatch({
                          goals: 0,
                          assists: 0,
                          tackles: 0,
                          saves: 0,
                          yellows: 0,
                          reds: 0,
                          rating: "",
                          result: "NENHUM",
                          injuredType: "NONE",
                        });
                      }}
                    >
                      <b>
                        {p.name} {p.recoveryLeft > 0 ? "❌" : ""}
                      </b>{" "}
                      <small>
                        ({teams.find((t) => t.id === p.teamId)?.name})
                      </small>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div>
              <h4 style={{ color: "var(--primary)", margin: "0 0 10px 0" }}>
                Súmula: {selP.name}
              </h4>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div>
                    <label>⚽ Gols</label>
                    <input
                      className="input-field"
                      type="number"
                      value={match.goals}
                      onChange={(e) =>
                        setMatch({ ...match, goals: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <label>👟 Assist</label>
                    <input
                      className="input-field"
                      type="number"
                      value={match.assists}
                      onChange={(e) =>
                        setMatch({
                          ...match,
                          assists: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>🛡️ Desar</label>
                    <input
                      className="input-field"
                      type="number"
                      value={match.tackles}
                      onChange={(e) =>
                        setMatch({
                          ...match,
                          tackles: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>🧤 Defes</label>
                    <input
                      className="input-field"
                      type="number"
                      value={match.saves}
                      onChange={(e) =>
                        setMatch({ ...match, saves: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <label>🟨 Amar</label>
                    <input
                      className="input-field"
                      type="number"
                      value={match.yellows}
                      onChange={(e) =>
                        setMatch({
                          ...match,
                          yellows: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>🟥 Verm</label>
                    <input
                      className="input-field"
                      type="number"
                      value={match.reds}
                      onChange={(e) =>
                        setMatch({ ...match, reds: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <hr style={{ borderColor: "#444" }} />

                {/* --- SELETOR DE LESÃO NO MODO INDIVIDUAL --- */}
                <div
                  style={{
                    marginBottom: 10,
                    border: "1px dashed #ff1744",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <label style={{ color: "#ff1744", fontSize: 11 }}>
                    🚑 Ocorreu Lesão?
                  </label>
                  <select
                    className="input-field"
                    value={match.injuredType}
                    onChange={(e) =>
                      setMatch({ ...match, injuredType: e.target.value })
                    }
                  >
                    <option value="NONE">✅ Não</option>
                    <option value="WALKING">🚶 Sim (Leve/Moderada)</option>
                    <option value="AMBULANCE">🚑 Sim (Grave/Ambulância)</option>
                  </select>
                </div>

                <label>⭐ Nota (0.0 - 10.0)</label>
                <input
                  className="input-field"
                  type="number"
                  step="0.1"
                  value={match.rating}
                  onChange={(e) =>
                    setMatch({ ...match, rating: e.target.value })
                  }
                />
                <label>🚩 Resultado</label>
                <select
                  className="input-field"
                  value={match.result}
                  onChange={(e) =>
                    setMatch({ ...match, result: e.target.value })
                  }
                >
                  <option value="NENHUM">Neutro</option>
                  <option value="VITORIA">Vitória</option>
                  <option value="EMPATE">Empate</option>
                  <option value="DERROTA">Derrota</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="btn btn-green"
                  onClick={() => {
                    let finalMatch = { ...match };
                    // Processa a lesão no modo individual
                    if (match.injuredType && match.injuredType !== "NONE") {
                      const inj = rollInjury(match.injuredType === "AMBULANCE");
                      finalMatch.injury = inj.name;
                      finalMatch.recoveryLeft = inj.time;
                    }
                    onSaveStats([{ player: selP, match: finalMatch }]);
                  }}
                >
                  LANÇAR
                </button>
                <button className="btn" onClick={() => setSelP(null)}>
                  VOLTAR
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
