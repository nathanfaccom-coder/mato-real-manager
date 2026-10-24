import React, { useEffect, useRef, useState } from "react";
import { FORMATIONS } from "../game/FORMATIONS.js";
import { FORMATION_COORDINATES } from "../game/FORMATION_COORDINATES.js";
import { getPosColor } from "../game/getPosColor.js";

export function TacticsEditor({ team, players, onSaveTactics, editorRole }) {
  const [formation, setFormation] = useState(
    team?.tactics?.formation || "4-3-3 OFENSIVO",
  );
  const [lineup, setLineup] = useState(team?.tactics?.lineup || {});
  const [selectingPos, setSelectingPos] = useState(null);
  const [notice, setNotice] = useState(() =>
    team?.tactics?.updatedAt
      ? `Última alteração feita por ${team.tactics.updatedBy || "time/técnico"}. Formação e escalação sincronizadas para ambos.`
      : "",
  );
  const lastRevision = useRef(team?.tactics?.revision || 0);

  useEffect(() => {
    const tactics = team?.tactics || {};
    const revision = tactics.revision || 0;
    if (revision !== lastRevision.current) {
      setFormation(tactics.formation || "4-3-3 OFENSIVO");
      setLineup(tactics.lineup || {});
      setSelectingPos(null);
      setNotice(
        `${tactics.updatedBy || "O clube"} atualizou a formação e a escalação. A alteração foi sincronizada para o time e o técnico.`,
      );
      lastRevision.current = revision;
    }
  }, [team?.id, team?.tactics?.revision]);

  const handleSave = () => onSaveTactics(team.id, formation, lineup, editorRole);
  const handleSetPosition = (index, playerId) =>
    setLineup((current) => ({ ...current, [index]: playerId }));

  return (
    <div className="card animate-in" style={{ padding: 10 }}>
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
          aria-label="Formação do time"
          value={formation}
          onChange={(event) => setFormation(event.target.value)}
          style={{ background: "#111", border: "1px solid gold" }}
        >
          {Object.keys(FORMATIONS).map((item) => (
            <option key={item} value={item}>
              {item}
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
          height: 520,
          border: "4px solid #fff",
          borderRadius: 15,
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.5)",
          }}
        />
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
        />
        {FORMATIONS[formation].map((position, index) => {
          const coords = FORMATION_COORDINATES[formation]?.[index] || {
            t: `${Math.floor(index / 3) * 25 + 10}%`,
            l: `${(index % 3) * 30 + 20}%`,
          };
          const player = players.find((item) => item.id === lineup[index]);
          return (
            <div
              key={index}
              className="player-slot"
              role="button"
              tabIndex={0}
              aria-label={`Escalar ${position}`}
              onClick={() => setSelectingPos({ label: position, index })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ")
                  setSelectingPos({ label: position, index });
              }}
              style={{
                position: "absolute",
                top: coords.t,
                left: coords.l,
                transform: "translate(-50%, -50%)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 10,
                cursor: "pointer",
              }}
            >
              <div
                className="player-photo-circle"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  border: player
                    ? "2px solid gold"
                    : "2px dashed rgba(255,255,255,0.3)",
                  background: player ? "#001a33" : "rgba(0,0,0,0.4)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: player ? "0 4px 10px rgba(0,0,0,0.5)" : "none",
                }}
              >
                {player?.face ? (
                  <img
                    src={player.face}
                    alt={player.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                ) : (
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>
                    {position}
                  </span>
                )}
              </div>
              <div
                className="player-name-label"
                style={{
                  background: player ? "gold" : "rgba(0,0,0,0.8)",
                  color: player ? "#000" : "#fff",
                  fontSize: 9,
                  padding: "2px 6px",
                  borderRadius: 10,
                  marginTop: 4,
                  fontWeight: 900,
                  whiteSpace: "nowrap",
                  maxWidth: 80,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {player ? player.name.split(" ")[0].toUpperCase() : "VAZIO"}
              </div>
            </div>
          );
        })}
      </div>

      {notice && (
        <p role="status" aria-live="polite" className="card" style={{ color: "#50dfac" }}>
          🔄 {notice}
        </p>
      )}
      <p style={{ color: "#aaa", fontSize: 12 }}>
        Esta formação e escalação são compartilhadas entre o time e o técnico.
      </p>
      <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
        <button
          className="btn btn-green"
          style={{ flex: 1, fontWeight: 900, height: 50 }}
          onClick={handleSave}
        >
          <i className="fas fa-save" /> SALVAR ESCALAÇÃO
        </button>
        <button
          className="btn btn-red"
          aria-label="Limpar escalação"
          style={{ width: 50 }}
          onClick={() => {
            if (confirm("Limpar escalação?")) setLineup({});
          }}
        >
          <i className="fas fa-trash" />
        </button>
      </div>

      {selectingPos && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content" style={{ maxHeight: "70vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
              <h3 style={{ margin: 0 }}>Escalar {selectingPos.label}</h3>
              <button
                className="btn btn-red"
                aria-label="Fechar seletor de jogadores"
                style={{ width: "auto", padding: "5px 10px" }}
                onClick={() => setSelectingPos(null)}
              >
                X
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
              <button
                className="card"
                style={{ background: "#333", border: "1px dashed #666", textAlign: "center", cursor: "pointer", color: "white" }}
                onClick={() => {
                  handleSetPosition(selectingPos.index, null);
                  setSelectingPos(null);
                }}
              >
                <b>❌ REMOVER JOGADOR DESTA VAGA</b>
              </button>
              {players
                .filter((player) => player.teamId === team.id)
                .filter((player) => !Object.values(lineup).includes(player.id) || lineup[selectingPos.index] === player.id)
                .map((player) => (
                  <div
                    key={player.id}
                    className="card"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      handleSetPosition(selectingPos.index, player.id);
                      setSelectingPos(null);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        handleSetPosition(selectingPos.index, player.id);
                        setSelectingPos(null);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      borderLeft: `4px solid ${getPosColor(player.position)}`,
                      background: lineup[selectingPos.index] === player.id ? "rgba(0,230,118,0.1)" : "var(--bg-input)",
                    }}
                  >
                    {player.face ? (
                      <img src={player.face} alt="" style={{ width: 35, height: 35, borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
                    ) : (
                      <div style={{ width: 35, height: 35, borderRadius: "50%", background: "#333", display: "grid", placeItems: "center", fontSize: 12 }}>👤</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <b>{player.name}</b>
                      <br />
                      <small style={{ color: "#aaa" }}>{player.position} | OV: {player.overall}</small>
                    </div>
                    {lineup[selectingPos.index] === player.id && <i className="fas fa-check-circle" style={{ color: "var(--primary)" }} />}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
