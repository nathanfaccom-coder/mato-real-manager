import React, { useState, useEffect } from "react";

export const VisitorDashboard = ({ players, teams }) => {
  const pList = players || [];
  const topScorer = [...pList].sort(
    (a, b) =>
      ((b.stats && b.stats.goals) || 0) - ((a.stats && a.stats.goals) || 0),
  )[0];
  const topAssist = [...pList].sort(
    (a, b) =>
      ((b.stats && b.stats.assists) || 0) - ((a.stats && a.stats.assists) || 0),
  )[0];

  return (
    <div>
      <div className="highlight-card">
        <h2 style={{ margin: 0, color: "var(--primary)" }}>Jornal do Dia</h2>
        <small>Resumo da Temporada</small>
        <div style={{ marginTop: 15, textAlign: "left" }}>
          <div style={{ marginBottom: 10 }}>
            <span
              className="page-subtitle-muted"
              style={{ textTransform: "uppercase" }}
            >
              Artilheiro
            </span>
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              ⚽ {topScorer ? topScorer.name : "Ninguém"}{" "}
              <span className="pill pill-success">
                {topScorer && topScorer.stats ? topScorer.stats.goals : 0} Gols
              </span>
            </div>
          </div>
          <div>
            <span
              className="page-subtitle-muted"
              style={{ textTransform: "uppercase" }}
            >
              Rei das Assistências
            </span>
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              👟 {topAssist ? topAssist.name : "Ninguém"}{" "}
              <span className="pill pill-success">
                {topAssist && topAssist.stats ? topAssist.stats.assists : 0}{" "}
                Assis
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="empty-state" style={{ marginTop: 15 }}>
        Acesse a aba <b>JOGOS</b> abaixo para ver a Classificação.
      </div>
    </div>
  );
};
