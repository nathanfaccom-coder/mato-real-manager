import {FixtureApprovalPanel} from '../admin/FixtureApprovalPanel.jsx';
import {MatchCorrectionPanel} from '../admin/MatchCorrectionPanel.jsx';
import React, { useState, useEffect } from "react";
import { SERIES } from "../game/SERIES.js";
import { MatchTeamLogo } from "./MatchTeamLogo.jsx";

export const MatchCenter = ({
  matches,
  teams,
  onReportMatch,
  isAdmin,
  onEditMatch,
  onDeleteMatch,
  onCreateMatch,
  automaticMatches = false,
  onAutomaticMatch,
}) => {
  const [approvalId,setApprovalId]=useState(null);
  const [correctionId,setCorrectionId]=useState(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  async function openAutomatic(m){
    if(busy)return;
    setBusy(true);setError('');
    try{await onAutomaticMatch(m);}catch(e){setError(e.message);}finally{setBusy(false);}
  }
  const [serie, setSerie] = useState("A");
  const [round, setRound] = useState(1);

  // Filtro organizador das LIGAS (Finalizados no fim, Ordem Alfabética)
  const games = matches
    .filter(
      (m) =>
        (m.serie || "A") === serie && parseInt(m.round) === parseInt(round),
    )
    .sort((a, b) => {
      if (a.status === "FINISHED" && b.status !== "FINISHED") return 1;
      if (a.status !== "FINISHED" && b.status === "FINISHED") return -1;
      return (a.homeName || "").localeCompare(b.homeName || "");
    });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Central de Jogos</h3>
        {isAdmin && (
          <button
            className="btn btn-blue"
            style={{ width: "auto", padding: "5px 10px", fontSize: 10 }}
            onClick={() => onCreateMatch(serie, round)}
          >
            + CRIAR JOGO
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <select
          className="input-field"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        >
          {SERIES.map((s) => (
            <option key={s} value={s}>
              {s === "VARZEA" ? "🚜 Terrão (Várzea)" : `Série ${s}`}
            </option>
          ))}
        </select>
        <select
          className="input-field"
          value={round}
          onChange={(e) => setRound(e.target.value)}
        >
          {[...Array(38).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              Rodada {i + 1}
            </option>
          ))}
        </select>
      </div>

      {automaticMatches && isAdmin && approvalId && <FixtureApprovalPanel key={approvalId} fixtureId={approvalId} onClose={()=>setApprovalId(null)}/>}
      {automaticMatches && isAdmin && correctionId && <MatchCorrectionPanel key={correctionId} matchId={correctionId} onClose={()=>setCorrectionId(null)}/>}
      {error && <p role="alert">{error}</p>}
      {games.length === 0 && (
        <div
          className="card"
          style={{ padding: 15, textAlign: "center", color: "#666" }}
        >
          Nenhum jogo nesta rodada.
        </div>
      )}

      {games.map((m) => (
        <div
          key={m.id}
          className="card"
          style={{
            borderLeft:
              m.status === "FINISHED"
                ? "4px solid #444"
                : "4px solid var(--primary)",
            position: "relative",
          }}
        >
          {isAdmin && (
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
                style={{
                  padding: "2px 5px",
                  fontSize: 10,
                  border: "1px solid #666",
                }}
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
              marginBottom: 5,
              marginTop: isAdmin ? 15 : 0,
            }}
          >
            <div
              style={{
                textAlign: "center",
                width: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MatchTeamLogo logo={m.homeLogo} />
              <b style={{ fontSize: 13 }}>{m.homeName}</b>
              <div style={{ fontSize: 18, fontWeight: "bold" }}>
                {m.status === "FINISHED" ? (
                  <>
                    {m.scoreHome}{" "}
                    {m.hasPenalties && (
                      <span
                        style={{ fontSize: 12, color: "gold", marginLeft: 4 }}
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
            <div style={{ fontSize: 12, color: "#aaa" }}>X</div>
            <div
              style={{
                textAlign: "center",
                width: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MatchTeamLogo logo={m.awayLogo} />
              <b style={{ fontSize: 13 }}>{m.awayName}</b>
              <div style={{ fontSize: 18, fontWeight: "bold" }}>
                {m.status === "FINISHED" ? (
                  <>
                    {m.hasPenalties && (
                      <span
                        style={{ fontSize: 12, color: "gold", marginRight: 4 }}
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

          {automaticMatches && isAdmin && !m.runId && m.status==='PENDING' && <button className="btn btn-blue" disabled={busy} onClick={()=>setApprovalId(m.id)}>CONFERIR / APROVAR CALENDÁRIO</button>}
          {automaticMatches && isAdmin && m.runId && m.status==='FINISHED' && <button className="btn btn-blue" onClick={()=>{setApprovalId(null);setCorrectionId(m.runId);}}>CORRIGIR SÚMULA</button>}
          {automaticMatches ? (
            m.runId || (isAdmin && m.status==='PENDING') ?
              <button className="btn btn-green" disabled={busy} onClick={()=>openAutomatic(m)}>
                {m.runId?'ASSISTIR PARTIDA':'INICIAR JOGO OFICIAL'}
              </button> : null
          ) : isAdmin && m.status !== "FINISHED" && (
            <button className="btn btn-green" onClick={() => onReportMatch(m)}>
              📝 LANÇAR SÚMULA
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
