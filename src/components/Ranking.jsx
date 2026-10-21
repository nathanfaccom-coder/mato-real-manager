import React, { useState, useEffect } from "react";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";
import { fmt } from "../game/fmt.js";
import { calculateSocios } from "../game/calculateSocios.js";
import { PlayerCard } from "./PlayerCard.jsx";
import { getPosColor } from "../game/getPosColor.js";

export const Ranking = ({ teams, players, sales, hallOfFame }) => {
  const [view, setView] = React.useState("HALL"); // Abre direto no Hall da Fama agora!
  const [inspect, setInspect] = React.useState(null);

  const validPlayers = React.useMemo(
    () => players.filter((p) => p && p.teamId && p.teamId !== "FREE" && p.name),
    [players],
  );
  const playersByTeam = React.useMemo(() => {
    const grouped = new Map();
    for (const player of players) {
      if (!grouped.has(player.teamId)) grouped.set(player.teamId, []);
      grouped.get(player.teamId).push(player);
    }
    return grouped;
  }, [players]);
  const sociosByTeam = React.useMemo(
    () =>
      new Map(
        teams
          .filter(Boolean)
          .map((team) => [
            team.id,
            calculateSocios(team, playersByTeam.get(team.id) || []),
          ]),
      ),
    [teams, playersByTeam],
  );
  const sociosRanking = React.useMemo(
    () =>
      teams
        .filter((t) => t.status !== "PENDING")
        .sort((a, b) => sociosByTeam.get(b.id) - sociosByTeam.get(a.id)),
    [teams, sociosByTeam],
  );

  const renderTeams = () =>
    teams
      .filter((t) => t && t.status !== "PENDING")
      .map((t) => {
        const squadValue = (playersByTeam.get(t.id) || [])
          .filter((p) => p.name)
          .reduce(
            (total, p) => total + getRecommendedPrice(p.overall, p.position),
            0,
          );

        const balance = parseFloat(t.balance) || 0;
        return { ...t, balance, squadValue, totalWealth: balance + squadValue };
      })
      .sort((a, b) => b.totalWealth - a.totalWealth)
      .map((t, i) => (
        <div
          key={t.id}
          className="card"
          onClick={() => setInspect({ type: "TEAM", data: t })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <b
            style={{
              fontSize: 20,
              color: "#555",
              width: 30,
              textAlign: "center",
            }}
          >
            {i + 1}
          </b>
          {t.logo ? (
            <img
              src={t.logo}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #333",
              }}
            />
          ) : (
            <div style={{ width: 40 }}></div>
          )}

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 5, fontWeight: "bold" }}>
              {String(t.name)}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 5,
              }}
            >
              <div
                style={{
                  background: "rgba(0, 230, 118, 0.1)",
                  padding: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  border: "1px solid rgba(0, 230, 118, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    color: "#aaa",
                    textTransform: "uppercase",
                  }}
                >
                  Saldo
                </div>
                <div
                  style={{ fontSize: 10, fontWeight: "bold", color: "#00E676" }}
                >
                  {fmt(t.balance)}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(41, 121, 255, 0.1)",
                  padding: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  border: "1px solid rgba(41, 121, 255, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    color: "#aaa",
                    textTransform: "uppercase",
                  }}
                >
                  Elenco
                </div>
                <div
                  style={{ fontSize: 10, fontWeight: "bold", color: "#2979FF" }}
                >
                  {fmt(t.squadValue)}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255, 215, 0, 0.1)",
                  padding: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    color: "#aaa",
                    textTransform: "uppercase",
                  }}
                >
                  Total
                </div>
                <div
                  style={{ fontSize: 10, fontWeight: "bold", color: "gold" }}
                >
                  {fmt(t.totalWealth)}
                </div>
              </div>
            </div>
          </div>
          <i className="fas fa-chevron-right" style={{ color: "#333" }}></i>
        </div>
      ));

  const renderPlayers = (sortKey, label, color, isStat = true) => {
    let sorted = [];
    if (isStat) {
      sorted = validPlayers
        .filter((p) => p.stats && p.stats[sortKey] > 0)
        .sort((a, b) => (b.stats[sortKey] || 0) - (a.stats[sortKey] || 0));
    } else {
      sorted = [...validPlayers].sort(
        (a, b) => (parseFloat(b[sortKey]) || 0) - (parseFloat(a[sortKey]) || 0),
      );
    }

    return sorted.slice(0, 20).map((p, i) => (
      <div
        key={p.id}
        className="card"
        onClick={() => setInspect({ type: "PLAYER", data: p })}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <b
          style={{
            fontSize: 20,
            color: "#555",
            width: 30,
            textAlign: "center",
          }}
        >
          {i + 1}
        </b>
        {p.face ? (
          <img
            src={p.face}
            style={{
              width: 35,
              height: 35,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "top",
              border: "1px solid #444",
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
          <b>
            {String(p.name)} {p.recoveryLeft > 0 ? "❌" : ""}
          </b>{" "}
          <small>
            ({String(teams.find((t) => t.id === p.teamId)?.name || "Sem Clube")}
            )
          </small>
        </div>
        <div style={{ fontWeight: "bold", fontSize: 14, color: color }}>
          {label}{" "}
          {isStat
            ? p.stats[sortKey]
            : sortKey === "salary"
              ? fmt(p[sortKey])
              : p[sortKey]}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h3>Ranking e Histórico</h3>
      <div className="rank-tabs">
        <div
          className={`rank-tab ${view === "HALL" ? "active" : ""}`}
          onClick={() => setView("HALL")}
        >
          🏛️ Hall da Fama
        </div>
        <div
          className={`rank-tab ${view === "TEAMS" ? "active" : ""}`}
          onClick={() => setView("TEAMS")}
        >
          💰 Clubes
        </div>
        <div
          className={`rank-tab ${view === "SOCIOS" ? "active" : ""}`}
          onClick={() => setView("SOCIOS")}
        >
          🎟️ Maior Torcida
        </div>
        <div
          className={`rank-tab ${view === "FAME" ? "active" : ""}`}
          onClick={() => setView("FAME")}
        >
          💎 Celebridades
        </div>
        <div
          className={`rank-tab ${view === "OVERALL" ? "active" : ""}`}
          onClick={() => setView("OVERALL")}
        >
          ⭐ Craques
        </div>
        <div
          className={`rank-tab ${view === "SALARY" ? "active" : ""}`}
          onClick={() => setView("SALARY")}
        >
          💸 Salários
        </div>
        <div
          className={`rank-tab ${view === "GOALS" ? "active" : ""}`}
          onClick={() => setView("GOALS")}
        >
          ⚽ Gols
        </div>
        <div
          className={`rank-tab ${view === "ASSIST" ? "active" : ""}`}
          onClick={() => setView("ASSIST")}
        >
          👟 Assistências
        </div>
        <div
          className={`rank-tab ${view === "SAVES" ? "active" : ""}`}
          onClick={() => setView("SAVES")}
        >
          🧤 Defesas
        </div>
        <div
          className={`rank-tab ${view === "YEL" ? "active" : ""}`}
          onClick={() => setView("YEL")}
        >
          🟨 Amarelos
        </div>
        <div
          className={`rank-tab ${view === "RED" ? "active" : ""}`}
          onClick={() => setView("RED")}
        >
          🟥 Vermelhos
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        {view === "HALL" && (
          <div className="animate-in">
            {(hallOfFame || []).length === 0 ? (
              <div
                className="card"
                style={{ textAlign: "center", padding: 40, color: "#666" }}
              >
                <i
                  className="fas fa-museum"
                  style={{ fontSize: 40, marginBottom: 10 }}
                ></i>
                <p>
                  O Museu está vazio. Quando a primeira Temporada virar, a
                  história começará a ser escrita aqui!
                </p>
              </div>
            ) : (
              hallOfFame.map((season) => (
                <div
                  key={season.id}
                  className="card"
                  style={{ marginBottom: 15, border: "1px solid gold" }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      color: "gold",
                      textAlign: "center",
                      borderBottom: "1px dashed #444",
                      paddingBottom: 10,
                    }}
                  >
                    🏆 Temporada {season.season}
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginBottom: 15,
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(0, 230, 118, 0.1)",
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid var(--primary)",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 10, color: "#aaa" }}>
                        Campeão da Série A
                      </span>
                      <br />
                      {season.champA?.logo ? (
                        <img
                          src={season.champA.logo}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                            margin: "5px auto",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: 30, textAlign: "center" }}>
                          🛡️
                        </div>
                      )}
                      <b style={{ display: "block", color: "#fff" }}>
                        {season.champA?.name || "---"}
                      </b>
                    </div>
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #555",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 10, color: "#aaa" }}>
                        Artilheiro do Ano
                      </span>
                      <br />
                      {season.topScorer?.face ? (
                        <img
                          src={season.topScorer.face}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                            margin: "5px auto",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: 30, textAlign: "center" }}>
                          👤
                        </div>
                      )}
                      <b style={{ display: "block", color: "#fff" }}>
                        {season.topScorer?.name || "---"}
                      </b>
                      <span
                        style={{
                          color: "gold",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {season.topScorer?.val || 0} ⚽
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        background: "#222",
                        padding: 8,
                        borderRadius: 5,
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 9, color: "#888" }}>
                        Rei das Assistências
                      </span>
                      <br />
                      <b style={{ fontSize: 11, color: "var(--secondary)" }}>
                        {season.topAssist?.name || "---"}
                      </b>
                      <br />
                      <span style={{ fontSize: 10 }}>
                        {season.topAssist?.val || 0} 👟
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#222",
                        padding: 8,
                        borderRadius: 5,
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 9, color: "#888" }}>
                        Muralha (Defesas)
                      </span>
                      <br />
                      <b style={{ fontSize: 11, color: "cyan" }}>
                        {season.topSaves?.name || "---"}
                      </b>
                      <br />
                      <span style={{ fontSize: 10 }}>
                        {season.topSaves?.val || 0} 🧤
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#222",
                        padding: 8,
                        borderRadius: 5,
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 9, color: "#888" }}>
                        Craque (Média)
                      </span>
                      <br />
                      <b style={{ fontSize: 11, color: "var(--purple)" }}>
                        {season.topRating?.name || "---"}
                      </b>
                      <br />
                      <span style={{ fontSize: 10 }}>
                        ⭐ {season.topRating?.val || 0}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: "1px dashed #444",
                      display: "flex",
                      justifyContent: "space-around",
                      fontSize: 10,
                    }}
                  >
                    <span style={{ color: "#aaa" }}>
                      <b>Série B:</b> {season.champB?.name || "-"}
                    </span>
                    <span style={{ color: "#aaa" }}>
                      <b>Série C:</b> {season.champC?.name || "-"}
                    </span>
                    <span style={{ color: "#aaa" }}>
                      <b>Série D:</b> {season.champD?.name || "-"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {view === "TEAMS" && renderTeams()}

        {view === "SOCIOS" &&
          sociosRanking.map((t, i) => (
            <div
              key={t.id}
              className="card"
              onClick={() => setInspect({ type: "TEAM", data: t })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <b
                style={{
                  fontSize: 20,
                  color: "#555",
                  width: 30,
                  textAlign: "center",
                }}
              >
                {i + 1}
              </b>
              {t.logo ? (
                <img
                  src={t.logo}
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
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  🛡️
                </div>
              )}
              <div style={{ flex: 1 }}>
                <b>{t.name}</b>{" "}
                <small style={{ color: "#aaa" }}>(Série {t.serie})</small>
              </div>
              <div style={{ fontWeight: "bold", fontSize: 16, color: "gold" }}>
                {(sociosByTeam.get(t.id) || 0).toLocaleString("pt-BR")} 👤
              </div>
            </div>
          ))}
        {view === "FAME" &&
          renderPlayers("fame", "Fama:", "var(--purple)", false)}
        {view === "OVERALL" &&
          renderPlayers("overall", "Overall:", "var(--warning)", false)}
        {view === "SALARY" &&
          renderPlayers("salary", "Salário:", "var(--primary)", false)}
        {view === "GOALS" && renderPlayers("goals", "⚽", "#fff")}
        {view === "ASSIST" && renderPlayers("assists", "👟", "#fff")}
        {view === "SAVES" && renderPlayers("saves", "🧤", "#fff")}
        {view === "YEL" && renderPlayers("yellows", "🟨", "yellow")}
        {view === "RED" && renderPlayers("reds", "🟥", "red")}
      </div>

      {/* MODAL DE INSPEÇÃO CORRIGIDO (SEM ERRO DE OBJETO) */}
      {inspect && (
        <div className="modal-overlay" onClick={() => setInspect(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <h3>
                {inspect.type === "PLAYER"
                  ? `🔍 Itens de ${String(inspect.data.name)}`
                  : `🛡️ Elenco do ${String(inspect.data.name)}`}
              </h3>
              <button
                className="btn btn-red"
                style={{ width: "auto", padding: "5px 10px" }}
                onClick={() => setInspect(null)}
              >
                X
              </button>
            </div>

            {inspect.type === "PLAYER" ? (
              <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <PlayerCard
                  player={inspect.data}
                  teamName={
                    teams.find((t) => t.id === inspect.data.teamId)?.name
                  }
                  teamLogo={
                    teams.find((t) => t.id === inspect.data.teamId)?.logo
                  }
                />
                <div
                  className="highlight-card"
                  style={{ padding: 10, marginBottom: 10 }}
                >
                  Fama Total:{" "}
                  <b style={{ color: "gold" }}>
                    {String(inspect.data.fame || 0)}
                  </b>
                </div>
                {sales.filter(
                  (s) => s && s.buyerId === inspect.data.id && s.fameGained > 0,
                ).length === 0 ? (
                  <p style={{ textAlign: "center", color: "#666" }}>
                    Nenhum item de fama encontrado.
                  </p>
                ) : (
                  sales
                    .filter(
                      (s) =>
                        s && s.buyerId === inspect.data.id && s.fameGained > 0,
                    )
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="card"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderLeft: "3px solid gold",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {item.img ? (
                            <img
                              src={item.img}
                              style={{ width: 30, height: 30, borderRadius: 4 }}
                            />
                          ) : (
                            <div style={{ fontSize: 20 }}>📦</div>
                          )}
                          <b>
                            {String(item.productName || "Item Desconhecido")}
                          </b>
                        </div>
                        <b style={{ color: "var(--purple)" }}>
                          +{String(item.fameGained || 0)} Fama
                        </b>
                      </div>
                    ))
                )}
              </div>
            ) : (
              <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {validPlayers
                  .filter((p) => p.teamId === inspect.data.id)
                  .sort((a, b) => b.overall - a.overall)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="card"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderLeft: `4px solid ${getPosColor(p.position)}`,
                      }}
                    >
                      <span>
                        <b>
                          {String(p.name)} {p.recoveryLeft > 0 ? "❌" : ""}
                        </b>{" "}
                        <small>({String(p.position)})</small>
                      </span>
                      <b className="player-ov">{String(p.overall)}</b>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
