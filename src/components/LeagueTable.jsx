import React, { useState, useEffect } from "react";
import {LinkedCompetitionStandings} from '../matches/CompetitionStandings.jsx';

export const LeagueTable = ({ teams, serie, estado, onInspectTeam, automaticMatches=false, matches=[] }) => {
  if(automaticMatches)return <LinkedCompetitionStandings matches={matches} serie={serie} estado={estado} teams={teams} onInspectTeam={onInspectTeam}/>;
  const isEstadual = serie === "ESTADUAL";

  const list = teams
    .filter((t) => {
      if (isEstadual) return t.estado === estado && t.status !== "PENDING";

      const timeSerie = t.serie || "A";
      if (serie === "VARZEA")
        return timeSerie === "VARZEA" && t.status !== "PENDING";
      return timeSerie === serie && t.status !== "PENDING";
    })
    .sort((a, b) => {
      // Se for estadual, usa stateStats. Se for nacional, usa stats.
      const sA = isEstadual ? a.stateStats || {} : a.stats || {};
      const sB = isEstadual ? b.stateStats || {} : b.stats || {};

      if ((sA.pts || 0) !== (sB.pts || 0)) return (sB.pts || 0) - (sA.pts || 0);
      if ((sA.wins || 0) !== (sB.wins || 0))
        return (sB.wins || 0) - (sA.wins || 0);
      return (sB.gf || 0) - (sB.ga || 0) - ((sA.gf || 0) - (sA.ga || 0));
    });

  if (list.length === 0)
    return (
      <div
        className="card"
        style={{ padding: 15, textAlign: "center", color: "#666" }}
      >
        Nenhum time disputando aqui ainda.
      </div>
    );

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: 10,
          background: isEstadual
            ? "var(--purple)"
            : serie === "VARZEA"
              ? "gold"
              : "var(--primary)",
          color: isEstadual ? "#fff" : "#000",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {isEstadual
            ? `🏆 Campeonato ${estado}`
            : serie === "VARZEA"
              ? "🚜 TERRÃO (VÁRZEA)"
              : `SÉRIE ${serie}`}
        </span>
        <small>
          {isEstadual
            ? "G4 avança para Semifinal"
            : serie === "VARZEA"
              ? "G3 Sobe"
              : serie === "D"
                ? "G2 Sobe | Z3 Cai"
                : "G2 Sobe | Z2 Cai"}
        </small>
      </div>
      <div
        style={{
          padding: "5px 10px",
          background: "#333",
          fontSize: "10px",
          color: "#aaa",
          textAlign: "center",
        }}
      >
        💡 Clique no nome do time para ver a escalação e o técnico
      </div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}
      >
        <thead style={{ background: "#222", color: "#888" }}>
          <tr>
            <th style={{ padding: 5, textAlign: "left" }}># Time</th>
            <th title="Pontos">P</th>
            <th title="Jogos">J</th>
            <th title="Vitórias">V</th>
            <th title="Saldo">SG</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t, i) => {
            const s = isEstadual ? t.stateStats || {} : t.stats || {};
            let rowColor = "transparent";

            if (isEstadual) {
              if (i < 4) rowColor = "rgba(213, 0, 249, 0.15)"; // G4 do Estadual fica roxo
            } else if (serie === "A") {
              if (i >= list.length - 2 && list.length >= 8)
                rowColor = "rgba(255, 23, 68, 0.1)";
            } else if (serie === "B" || serie === "C") {
              if (i < 2) rowColor = "rgba(0, 230, 118, 0.1)";
              if (i >= list.length - 2 && list.length >= 8)
                rowColor = "rgba(255, 23, 68, 0.1)";
            } else if (serie === "D") {
              if (i < 2) rowColor = "rgba(0, 230, 118, 0.1)";
              if (i >= list.length - 3 && list.length >= 8)
                rowColor = "rgba(255, 23, 68, 0.1)";
            } else if (serie === "VARZEA") {
              if (i < 3) rowColor = "rgba(255, 215, 0, 0.1)";
            }

            return (
              <tr
                key={t.id}
                style={{ borderBottom: "1px solid #333", background: rowColor }}
              >
                <td
                  style={{
                    padding: "8px 5px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => onInspectTeam(t)}
                >
                  <span style={{ color: "#666", width: 15 }}>{i + 1}</span>
                  {t.logo && (
                    <img
                      src={t.logo}
                      style={{ width: 20, height: 20, borderRadius: "50%" }}
                    />
                  )}
                  <b>{t.name}</b>
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  {s.pts || 0}
                </td>
                <td style={{ textAlign: "center" }}>
                  {(s.wins || 0) + (s.draws || 0) + (s.losses || 0)}
                </td>
                <td style={{ textAlign: "center" }}>{s.wins || 0}</td>
                <td style={{ textAlign: "center" }}>
                  {(s.gf || 0) - (s.ga || 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
