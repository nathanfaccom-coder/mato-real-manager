import React, { useState, useEffect } from "react";

export const TeamStandingsEditor = ({ teams, onUpdateTeamStats }) => {
  return (
    <div>
      <h3>Editar Tabela (Jornalista)</h3>
      <div style={{ maxHeight: 400, overflowY: "auto" }}>
        {teams
          .filter((t) => t.status !== "PENDING")
          .map((t) => (
            <div
              key={t.id}
              className="card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "30%" }}>
                <b>{String(t.name)}</b>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <div style={{ textAlign: "center" }}>
                  <small>V</small>
                  <input
                    className="input-field"
                    type="number"
                    style={{ width: 40, padding: 5, marginBottom: 0 }}
                    defaultValue={t.stats?.wins || 0}
                    id={`w-${t.id}`}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <small>E</small>
                  <input
                    className="input-field"
                    type="number"
                    style={{ width: 40, padding: 5, marginBottom: 0 }}
                    defaultValue={t.stats?.draws || 0}
                    id={`d-${t.id}`}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <small>D</small>
                  <input
                    className="input-field"
                    type="number"
                    style={{ width: 40, padding: 5, marginBottom: 0 }}
                    defaultValue={t.stats?.losses || 0}
                    id={`l-${t.id}`}
                  />
                </div>
                <button
                  className="btn btn-green"
                  style={{ width: "auto", height: 35, marginTop: 18 }}
                  onClick={() => {
                    const w =
                      parseInt(document.getElementById(`w-${t.id}`).value) || 0;
                    const d =
                      parseInt(document.getElementById(`d-${t.id}`).value) || 0;
                    const l =
                      parseInt(document.getElementById(`l-${t.id}`).value) || 0;
                    onUpdateTeamStats(t.id, { wins: w, draws: d, losses: l });
                  }}
                >
                  💾
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
