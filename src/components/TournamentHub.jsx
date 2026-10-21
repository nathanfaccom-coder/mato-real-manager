import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";
import { MatchTeamLogo } from "./MatchTeamLogo.jsx";

export const TournamentHub = ({
  tournaments,
  matches,
  players,
  user,
  teams,
  onInspectTeam,
  onReportMatch,
  onCreateMatch,
  onEditMatch,
  onDeleteMatch,
}) => {
  const [selTourn, setSelTourn] = useState(null);
  const [tab, setTab] = useState("JOGOS");

  const isAdminOrPress = user.type === "ADMIN" || user.type.includes("PRESS");

  if (!selTourn) {
    return (
      <div>
        <h3 style={{ color: "cyan", textAlign: "center", marginTop: 0 }}>
          🏆 Copas e Campeonatos
        </h3>
        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            fontSize: 12,
            marginBottom: 20,
          }}
        >
          Acompanhe o chaveamento e as estatísticas exclusivas de cada torneio.
        </p>
        {tournaments.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Nenhuma competição ativa no momento.
          </p>
        )}

        <div style={{ display: "grid", gap: 15 }}>
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="highlight-card"
              style={{
                cursor: "pointer",
                border: "1px solid cyan",
                padding: 20,
                background: "linear-gradient(135deg, #001a33 0%, #000 100%)",
              }}
              onClick={() => setSelTourn(t)}
            >
              {t.trophyImg ? (
                <img
                  src={t.trophyImg}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    marginBottom: 10,
                    filter: "drop-shadow(0 0 10px rgba(0,255,255,0.3))",
                  }}
                />
              ) : (
                <div style={{ fontSize: 50 }}>🏆</div>
              )}
              <h3 style={{ margin: 0, color: "cyan" }}>{t.name}</h3>
              <small style={{ color: "#aaa" }}>
                {t.format.replace("_", " ")} • Prêmio:{" "}
                <b style={{ color: "lime" }}>{fmt(t.prize)}</b>
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- SORTEIO INICIAL DE JOGOS (Fase 1) ---
  const handleGenerateFixtures = async () => {
    if (!confirm(`Deseja sortear a Primeira Fase da ${selTourn.name}?`)) return;

    const db = firebase.firestore();
    const b = db.batch();

    const existing = matches.filter((m) => m.serie === selTourn.id);
    if (existing.length > 0) {
      if (
        !confirm(
          "Já existem jogos! Sortear novamente APAGARÁ todo o histórico desta Copa. Continuar?",
        )
      )
        return;
      existing.forEach((m) => b.delete(db.collection("matches").doc(m.id)));
    }

    const shuffled = [...selTourn.teams].sort(() => 0.5 - Math.random());
    let roundName =
      shuffled.length <= 2
        ? "Final"
        : shuffled.length <= 4
          ? "Semifinal"
          : shuffled.length <= 8
            ? "Quartas de Final"
            : "Fase Inicial";

    for (let i = 0; i < shuffled.length; i += 2) {
      const homeId = shuffled[i];
      const awayId = shuffled[i + 1];
      if (!homeId || !awayId) continue;

      const homeT = teams.find((t) => t.id === homeId);
      const awayT = teams.find((t) => t.id === awayId);

      const matchRef = db.collection("matches").doc();
      b.set(matchRef, {
        serie: selTourn.id,
        round: roundName,
        status: "PENDING",
        played: false,
        processed: false,
        homeId: homeId,
        homeName: homeT?.name,
        homeLogo: homeT?.logo || null,
        awayId: awayId,
        awayName: awayT?.name,
        awayLogo: awayT?.logo || null,
        scoreHome: 0,
        scoreAway: 0,
      });

      const isFinal = shuffled.length <= 2;
      const isUnico =
        (isFinal && selTourn.finalType === "UNICO") ||
        (!isFinal && selTourn.matchType === "IDA");

      if (!isUnico) {
        const matchRef2 = db.collection("matches").doc();
        b.set(matchRef2, {
          serie: selTourn.id,
          round: roundName + " (Volta)",
          status: "PENDING",
          played: false,
          processed: false,
          homeId: awayId,
          homeName: awayT?.name,
          homeLogo: awayT?.logo || null,
          awayId: homeId,
          awayName: homeT?.name,
          awayLogo: homeT?.logo || null,
          scoreHome: 0,
          scoreAway: 0,
        });
      }
    }
    await b.commit();
    alert("Sorteio realizado com sucesso!");
  };

  // --- AVANÇAR FASE E PAGAR PREMIAÇÃO (MANTENDO O HISTÓRICO) ---
  const handleAdvanceRound = async () => {
    // Pega só os jogos ativos que ainda não foram processados para a próxima fase
    const activeGames = matches.filter(
      (m) => m.serie === selTourn.id && !m.processed,
    );
    if (activeGames.length === 0)
      return alert("Nenhum jogo aguardando transição de fase.");

    const unfinished = activeGames.filter((m) => m.status !== "FINISHED");
    if (unfinished.length > 0)
      return alert(
        `⚠️ Faltam ${unfinished.length} jogo(s) para terminar esta fase! Finalize todos (lançando a súmula).`,
      );

    let matchups = {};

    activeGames.forEach((m) => {
      const pairId = [m.homeId, m.awayId].sort().join("_");
      if (!matchups[pairId]) {
        matchups[pairId] = {
          team1: m.homeId,
          team1Goals: 0,
          team1Pens: 0,
          team2: m.awayId,
          team2Goals: 0,
          team2Pens: 0,
        };
      }
      if (matchups[pairId].team1 === m.homeId) {
        matchups[pairId].team1Goals += m.scoreHome || 0;
        matchups[pairId].team2Goals += m.scoreAway || 0;
        if (m.hasPenalties) {
          matchups[pairId].team1Pens += m.penaltiesHome || 0;
          matchups[pairId].team2Pens += m.penaltiesAway || 0;
        }
      } else {
        matchups[pairId].team2Goals += m.scoreHome || 0;
        matchups[pairId].team1Goals += m.scoreAway || 0;
        if (m.hasPenalties) {
          matchups[pairId].team2Pens += m.penaltiesHome || 0;
          matchups[pairId].team1Pens += m.penaltiesAway || 0;
        }
      }
    });

    const winners = [];
    const losers = [];

    for (const key in matchups) {
      const match = matchups[key];
      if (match.team1Goals > match.team2Goals) {
        winners.push(match.team1);
        losers.push(match.team2);
      } else if (match.team2Goals > match.team1Goals) {
        winners.push(match.team2);
        losers.push(match.team1);
      } else {
        // Desempate por Pênaltis
        if (match.team1Pens > match.team2Pens) {
          winners.push(match.team1);
          losers.push(match.team2);
        } else if (match.team2Pens > match.team1Pens) {
          winners.push(match.team2);
          losers.push(match.team1);
        } else {
          const t1 = teams.find((t) => t.id === match.team1)?.name;
          const t2 = teams.find((t) => t.id === match.team2)?.name;
          return alert(
            `🚨 EMPATE DETECTADO!\nO confronto ${t1} x ${t2} empatou no placar agregado.\nEdite a partida (✏️), marque 'Decidido nos Pênaltis' e preencha para continuar.`,
          );
        }
      }
    }

    const db = firebase.firestore();
    const b = db.batch();

    // 1. Congela os jogos antigos (eles CONTINUAM na tela, mas não afetam o próximo sorteio)
    activeGames.forEach((m) => {
      b.update(db.collection("matches").doc(m.id), { processed: true });
    });

    // 2. SISTEMA DE PREMIAÇÃO DOS ELIMINADOS
    const basePrize = parseFloat(selTourn.prize) || 0;
    const isFinal = winners.length === 1;
    const isSemi = winners.length === 2;
    const isQuarters = winners.length === 4;

    let loserPercentage = 0.05; // Base 5%
    if (isFinal)
      loserPercentage = 0.4; // Vice = 40%
    else if (isSemi)
      loserPercentage = 0.2; // Perdedor da Semi = 20%
    else if (isQuarters) loserPercentage = 0.1; // Perdedor das Quartas = 10%

    const loserPrize = basePrize * loserPercentage;

    losers.forEach((loserId) => {
      if (loserId) {
        b.update(db.collection("teams").doc(loserId), {
          balance: firebase.firestore.FieldValue.increment(loserPrize),
        });
      }
    });

    // 3. PAGAMENTO DO CAMPEÃO (SE FOR A FINAL)
    if (isFinal && winners[0]) {
      b.update(db.collection("teams").doc(winners[0]), {
        balance: firebase.firestore.FieldValue.increment(basePrize),
      });
      await b.commit();

      const champTeam = teams.find((t) => t.id === winners[0]);
      db.collection("news").add({
        text: `🏆 **CAMPEÃO!**\nO **${champTeam?.name}** conquistou a ${selTourn.name} e faturou ${fmt(basePrize)}!\nO Vice-campeão levou ${fmt(loserPrize)} de consolação.`,
        type: "finance",
        date: Date.now(),
        likes: [],
      });
      return alert(
        `🏆 FIM DE COPA!\n${champTeam?.name} é o CAMPEÃO!\n\nPrêmio depositado: ${fmt(basePrize)} (Campeão) e ${fmt(loserPrize)} (Vice).`,
      );
    }

    if (
      !confirm(
        `Confirmar encerramento desta fase?\n\n💰 ${losers.length} clubes eliminados receberão ${fmt(loserPrize)} agora.\n⚽ ${winners.length} clubes avançarão para a próxima fase.`,
      )
    )
      return;

    // 4. GERA A NOVA FASE
    const shuffled = [...winners].sort(() => 0.5 - Math.random());
    let roundName =
      shuffled.length <= 2
        ? "Final"
        : shuffled.length <= 4
          ? "Semifinal"
          : shuffled.length <= 8
            ? "Quartas de Final"
            : "Nova Fase";

    for (let i = 0; i < shuffled.length; i += 2) {
      const homeId = shuffled[i];
      const awayId = shuffled[i + 1];
      if (!homeId || !awayId) continue;

      const homeT = teams.find((t) => t.id === homeId);
      const awayT = teams.find((t) => t.id === awayId);

      const matchRef = db.collection("matches").doc();
      b.set(matchRef, {
        serie: selTourn.id,
        round: roundName,
        status: "PENDING",
        played: false,
        processed: false,
        homeId: homeId,
        homeName: homeT?.name,
        homeLogo: homeT?.logo || null,
        awayId: awayId,
        awayName: awayT?.name,
        awayLogo: awayT?.logo || null,
        scoreHome: 0,
        scoreAway: 0,
      });

      const isUnico =
        (shuffled.length <= 2 && selTourn.finalType === "UNICO") ||
        (shuffled.length > 2 && selTourn.matchType === "IDA");

      if (!isUnico) {
        const matchRef2 = db.collection("matches").doc();
        b.set(matchRef2, {
          serie: selTourn.id,
          round: roundName + " (Volta)",
          status: "PENDING",
          played: false,
          processed: false,
          homeId: awayId,
          homeName: awayT?.name,
          homeLogo: awayT?.logo || null,
          awayId: homeId,
          awayName: homeT?.name,
          awayLogo: homeT?.logo || null,
          scoreHome: 0,
          scoreAway: 0,
        });
      }
    }

    await b.commit();
    alert(
      `✅ Fase concluída!\nPremiações pagas aos eliminados: ${fmt(loserPrize)}.\nPróxima fase (${roundName}) gerada com sucesso!`,
    );
  };

  const tPlayers = players.filter(
    (p) => p.tournaments && p.tournaments[selTourn.id],
  );
  const topScorer = [...tPlayers].sort(
    (a, b) =>
      (b.tournaments[selTourn.id].goals || 0) -
      (a.tournaments[selTourn.id].goals || 0),
  )[0];
  const topAssist = [...tPlayers].sort(
    (a, b) =>
      (b.tournaments[selTourn.id].assists || 0) -
      (a.tournaments[selTourn.id].assists || 0),
  )[0];
  const topTackles = [...tPlayers].sort(
    (a, b) =>
      (b.tournaments[selTourn.id].tackles || 0) -
      (a.tournaments[selTourn.id].tackles || 0),
  )[0];
  const topSaves = [...tPlayers].sort(
    (a, b) =>
      (b.tournaments[selTourn.id].saves || 0) -
      (a.tournaments[selTourn.id].saves || 0),
  )[0];
  const topYellows = [...tPlayers].sort(
    (a, b) =>
      (b.tournaments[selTourn.id].yellows || 0) -
      (a.tournaments[selTourn.id].yellows || 0),
  )[0];
  const topReds = [...tPlayers].sort(
    (a, b) =>
      (b.tournaments[selTourn.id].reds || 0) -
      (a.tournaments[selTourn.id].reds || 0),
  )[0];
  const bestPlayer = [...tPlayers]
    .filter((p) => p.tournaments[selTourn.id].ratingCount > 0)
    .sort((a, b) => {
      const avgA =
        a.tournaments[selTourn.id].ratingSum /
        a.tournaments[selTourn.id].ratingCount;
      const avgB =
        b.tournaments[selTourn.id].ratingSum /
        b.tournaments[selTourn.id].ratingCount;
      return avgB - avgA;
    })[0];

  // Filtro organizador das COPAS (Ativos no topo, Processados embaixo)
  const tMatches = matches
    .filter((m) => m.serie === selTourn.id)
    .sort((a, b) => {
      if (a.processed && !b.processed) return 1;
      if (!a.processed && b.processed) return -1;
      if (a.status === "FINISHED" && b.status !== "FINISHED") return 1;
      if (a.status !== "FINISHED" && b.status === "FINISHED") return -1;
      const isVoltaA = (a.round || "").includes("(Volta)");
      const isVoltaB = (b.round || "").includes("(Volta)");
      if (isVoltaA && !isVoltaB) return 1;
      if (!isVoltaA && isVoltaB) return -1;
      return (a.homeName || "").localeCompare(b.homeName || "");
    });

  return (
    <div className="animate-in">
      <button
        className="btn btn-ghost"
        style={{ marginBottom: 15, width: "auto" }}
        onClick={() => {
          setSelTourn(null);
          setTab("JOGOS");
        }}
      >
        ⬅ VOLTAR
      </button>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {selTourn.trophyImg ? (
          <img
            src={selTourn.trophyImg}
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
              filter: "drop-shadow(0 0 15px rgba(0,255,255,0.6))",
            }}
          />
        ) : (
          <div style={{ fontSize: 60 }}>🏆</div>
        )}
        <h2 style={{ margin: "10px 0 5px 0", color: "cyan" }}>
          {selTourn.name}
        </h2>
        <div style={{ fontSize: 12, color: "gold" }}>
          Premiação do Campeão:{" "}
          <b style={{ color: "lime" }}>{fmt(selTourn.prize)}</b>
        </div>
        {selTourn.neutralFinal && selTourn.finalType === "UNICO" && (
          <div style={{ fontSize: 10, color: "#aaa", marginTop: 5 }}>
            🏟️ Final em Jogo Único (Campo Neutro)
          </div>
        )}
      </div>

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
          className={`btn ${tab === "JOGOS" ? "btn-cyan" : "btn-ghost"}`}
          style={{
            borderColor: "cyan",
            color: tab === "JOGOS" ? "#000" : "cyan",
            background: tab === "JOGOS" ? "cyan" : "transparent",
          }}
          onClick={() => setTab("JOGOS")}
        >
          JOGOS
        </button>
        <button
          className={`btn ${tab === "STATS" ? "btn-gold" : "btn-ghost"}`}
          onClick={() => setTab("STATS")}
        >
          ESTATÍSTICAS
        </button>
        <button
          className={`btn ${tab === "TIMES" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setTab("TIMES")}
        >
          TIMES ({selTourn.teams.length})
        </button>
      </div>

      {tab === "JOGOS" && (
        <div>
          {isAdminOrPress && (
            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
              <button
                className="btn btn-blue"
                onClick={() => onCreateMatch(selTourn.id)}
              >
                + JOGO MANUAL
              </button>
              <button className="btn btn-gold" onClick={handleGenerateFixtures}>
                🎲 SORTEIO INICIAL
              </button>
              <button className="btn btn-purple" onClick={handleAdvanceRound}>
                ⏭️ AVANÇAR FASE / PREMIAR
              </button>
            </div>
          )}

          {tMatches.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>
              Nenhum jogo chaveado ainda.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {tMatches.map((m) => (
                <div
                  key={m.id}
                  className="card"
                  style={{
                    borderLeft:
                      m.status === "FINISHED"
                        ? "4px solid #444"
                        : "4px solid cyan",
                    opacity: m.processed ? 0.5 : 1,
                    position: "relative",
                  }}
                >
                  {user.type === "ADMIN" && (
                    <div
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        display: "flex",
                        gap: 5,
                      }}
                    >
                      <button
                        className="btn btn-ghost"
                        style={{ padding: "2px 5px", fontSize: 10 }}
                        onClick={() => onEditMatch(m)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-red"
                        style={{ padding: "2px 5px", fontSize: 10 }}
                        onClick={() => onDeleteMatch(m.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: user.type === "ADMIN" ? 15 : 0,
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        width: "40%",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        const t = teams.find((x) => x.id === m.homeId);
                        if (t) onInspectTeam(t);
                      }}
                    >
                      <MatchTeamLogo logo={m.homeLogo} />
                      <b style={{ fontSize: 13, color: "var(--primary)" }}>
                        {m.homeName}
                      </b>
                      <div style={{ fontSize: 18, fontWeight: "bold" }}>
                        {m.status === "FINISHED" ? (
                          <>
                            {m.scoreHome}{" "}
                            {m.hasPenalties && (
                              <span
                                style={{
                                  fontSize: 12,
                                  color: "gold",
                                  marginLeft: 4,
                                }}
                              >
                                ({m.penaltiesHome})
                              </span>
                            )}
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#aaa",
                        textAlign: "center",
                      }}
                    >
                      X<br />
                      <small style={{ color: "gold" }}>
                        {m.round ? `Fase: ${m.round}` : "Mata-Mata"}
                      </small>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        width: "40%",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        const t = teams.find((x) => x.id === m.awayId);
                        if (t) onInspectTeam(t);
                      }}
                    >
                      <MatchTeamLogo logo={m.awayLogo} />
                      <b style={{ fontSize: 13, color: "var(--primary)" }}>
                        {m.awayName}
                      </b>
                      <div style={{ fontSize: 18, fontWeight: "bold" }}>
                        {m.status === "FINISHED" ? (
                          <>
                            {m.hasPenalties && (
                              <span
                                style={{
                                  fontSize: 12,
                                  color: "gold",
                                  marginRight: 4,
                                }}
                              >
                                ({m.penaltiesAway})
                              </span>
                            )}{" "}
                            {m.scoreAway}
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  </div>

                  {isAdminOrPress && m.status !== "FINISHED" && (
                    <button
                      className="btn btn-green"
                      style={{ marginTop: 10 }}
                      onClick={() => onReportMatch(m)}
                    >
                      📝 LANÇAR SÚMULA DA COPA
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "STATS" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <div
            className="card"
            style={{ borderTop: "3px solid gold", textAlign: "center" }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              ⚽ ARTILHEIRO
            </div>
            {topScorer && topScorer.tournaments[selTourn.id].goals > 0 ? (
              <div>
                <b style={{ fontSize: 14, color: "#fff" }}>{topScorer.name}</b>
                <br />
                <span style={{ color: "gold", fontWeight: "bold" }}>
                  {topScorer.tournaments[selTourn.id].goals} Gols
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Nenhum gol.</small>
            )}
          </div>
          <div
            className="card"
            style={{
              borderTop: "3px solid var(--secondary)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              👟 GARÇOM
            </div>
            {topAssist && topAssist.tournaments[selTourn.id].assists > 0 ? (
              <div>
                <b style={{ fontSize: 14, color: "#fff" }}>{topAssist.name}</b>
                <br />
                <span style={{ color: "var(--secondary)", fontWeight: "bold" }}>
                  {topAssist.tournaments[selTourn.id].assists} Assis.
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Nenhuma.</small>
            )}
          </div>
          <div
            className="card"
            style={{ borderTop: "3px solid #ff5555", textAlign: "center" }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              🛡️ XERIFE (DESARMES)
            </div>
            {topTackles && topTackles.tournaments[selTourn.id].tackles > 0 ? (
              <div>
                <b style={{ fontSize: 14, color: "#fff" }}>{topTackles.name}</b>
                <br />
                <span style={{ color: "#ff5555", fontWeight: "bold" }}>
                  {topTackles.tournaments[selTourn.id].tackles} Desarmes
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Nenhum.</small>
            )}
          </div>
          <div
            className="card"
            style={{ borderTop: "3px solid cyan", textAlign: "center" }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              🧤 MURALHA (DEFESAS)
            </div>
            {topSaves && topSaves.tournaments[selTourn.id].saves > 0 ? (
              <div>
                <b style={{ fontSize: 14, color: "#fff" }}>{topSaves.name}</b>
                <br />
                <span style={{ color: "cyan", fontWeight: "bold" }}>
                  {topSaves.tournaments[selTourn.id].saves} Defesas
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Nenhuma.</small>
            )}
          </div>
          <div
            className="card"
            style={{ borderTop: "3px solid yellow", textAlign: "center" }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              🟨 AMARELOS
            </div>
            {topYellows && topYellows.tournaments[selTourn.id].yellows > 0 ? (
              <div>
                <b style={{ fontSize: 14, color: "#fff" }}>{topYellows.name}</b>
                <br />
                <span style={{ color: "yellow", fontWeight: "bold" }}>
                  {topYellows.tournaments[selTourn.id].yellows} Cartões
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Nenhum.</small>
            )}
          </div>
          <div
            className="card"
            style={{ borderTop: "3px solid red", textAlign: "center" }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              🟥 VERMELHOS
            </div>
            {topReds && topReds.tournaments[selTourn.id].reds > 0 ? (
              <div>
                <b style={{ fontSize: 14, color: "#fff" }}>{topReds.name}</b>
                <br />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {topReds.tournaments[selTourn.id].reds} Cartões
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Nenhum.</small>
            )}
          </div>
          <div
            className="card"
            style={{
              borderTop: "3px solid var(--purple)",
              textAlign: "center",
              gridColumn: "span 2",
              background: "rgba(213,0,249,0.05)",
            }}
          >
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              ⭐ CRAQUE DO CAMPEONATO
            </div>
            {bestPlayer ? (
              <div>
                <b style={{ fontSize: 16, color: "#fff" }}>{bestPlayer.name}</b>
                <br />
                <span
                  style={{
                    color: "var(--purple)",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {(
                    bestPlayer.tournaments[selTourn.id].ratingSum /
                    bestPlayer.tournaments[selTourn.id].ratingCount
                  ).toFixed(1)}
                </span>
              </div>
            ) : (
              <small style={{ color: "#666" }}>Sem avaliações.</small>
            )}
          </div>
        </div>
      )}

      {tab === "TIMES" && (
        <div style={{ display: "grid", gap: 10 }}>
          {selTourn.teams.map((tid) => {
            const t = teams.find((x) => x.id === tid);
            if (!t) return null;
            return (
              <div
                key={tid}
                className="card"
                style={{ display: "flex", alignItems: "center", gap: 10 }}
                onClick={() => onInspectTeam(t)}
              >
                {t.logo ? (
                  <img
                    src={t.logo}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#333",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    🛡️
                  </div>
                )}
                <b>{t.name}</b>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
