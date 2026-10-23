import { KitEditor } from "../simulation/Editors.jsx";
import React, { useState, useEffect } from "react";
import { fmt } from "../game/fmt.js";
import { getPosColor } from "../game/getPosColor.js";
import { AttributeGrid } from "./AttributeGrid.jsx";
import { StadiumManager } from "./StadiumManager.jsx";

export const TeamDashboard = ({
  team,
  players,
  staff,
  isVisitor,
  onEdit,
  onAdd,
  onFireCoach,
  onRenewCoach,
  setModal,
  isAdmin,
}) => {
  const [tab, setTab] = useState("ELENCO");
  const [showStadiumUI, setShowStadiumUI] = useState(false);
  const [showCT, setShowCT] = useState(false);
  const wageBill =
    players.reduce((a, p) => a + (parseFloat(p.salary) || 0), 0) +
    (staff || []).reduce((a, c) => a + (parseFloat(c.salary) || 0), 0);

  const POS_ORDER = {
    GOL: 1,
    ZAG: 2,
    LD: 3,
    LE: 4,
    VOL: 5,
    MC: 6,
    MD: 7,
    ME: 8,
    MEI: 9,
    PTD: 10,
    PTE: 11,
    SA: 12,
    ATA: 13,
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const posA = POS_ORDER[a.position] || 99;
    const posB = POS_ORDER[b.position] || 99;
    if (posA !== posB) return posA - posB;
    return (b.overall || 0) - (a.overall || 0);
  });

  return (
    <div>
      <div
        className="card-row"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>{team.name}</h2>
          <small className="page-subtitle-muted">
            Folha: <span className="pill pill-danger">{fmt(wageBill)}/sem</span>
          </small>
        </div>
      </div>

      {!isVisitor && (
        <div style={{ marginBottom: 15 }}>
          <button
            className="btn btn-blue"
            onClick={() => setShowStadiumUI(true)}
            style={{ width: "100%", padding: "12px" }}
          >
            🏟️ GESTÃO DE ARENA
          </button>
          <button
            className="btn btn-green"
            onClick={() => setModal({ type: "CT_TYCOON", data: team })}
            style={{ width: "100%", padding: "12px", marginTop: "10px" }}
          >
            🏋️‍♂️ CENTRO DE TREINAMENTO
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          className={`btn ${tab === "ELENCO" ? "btn-blue" : "btn-ghost"}`}
          onClick={() => setTab("ELENCO")}
        >
          ELENCO
        </button>
        {!isVisitor && (
          <button
            className="btn btn-ghost pixel-feature"
            onClick={() => setTab("KITS")}
          >
            UNIFORMES
          </button>
        )}
        <button
          className={`btn ${tab === "STAFF" ? "btn-gold" : "btn-ghost"}`}
          onClick={() => setTab("STAFF")}
        >
          COMISSÃO TÉCNICA
        </button>
        <button
          className={`btn ${tab === "TROFEUS" ? "btn-warning" : "btn-ghost"}`}
          onClick={() => setTab("TROFEUS")}
        >
          🏆 TROFÉUS
        </button>
      </div>

      {/* --- ABA 1: ELENCO (ORDENADO) --- */}
      {tab === "KITS" && !isVisitor && <KitEditor key={team.id} team={team} />}
      {tab === "ELENCO" && (
        <div>
          <div style={{ marginBottom: 15 }}>
            <div className="page-section-title">
              Jogadores ({sortedPlayers.length})
            </div>

            {/* BOTÃO PARA ADMIN E PARA O DONO DO TIME */}
            {(isAdmin || !isVisitor) && (
              <button
                className="btn btn-green"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: 12,
                  fontWeight: "900",
                  border: "1px solid lime",
                }}
                onClick={() => {
                  if (isAdmin) {
                    onAdd(); // Admin cria direto
                  } else {
                    setModal({ type: "TEAM_REQUEST_PLAYER", data: team }); // Dono pede aprovação
                  }
                }}
              >
                {isAdmin
                  ? "✨ + CRIAR NOVO JOGADOR (ADM)"
                  : "📝 + INSCREVER NOVO JOGADOR (Análise Federação)"}
              </button>
            )}
          </div>

          {/* LISTA DE JOGADORES ORDENADA */}
          {sortedPlayers.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{
                borderLeft: `4px solid ${getPosColor(p.position)}`,
                marginBottom: 10,
              }}
            >
              <div
                className="card-row"
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <span
                    className="badge-pos"
                    style={{ background: getPosColor(p.position) }}
                  >
                    {p.position}
                  </span>
                  <b style={{ fontSize: 16, marginLeft: 8 }}>{p.name}</b>
                  <div className="page-subtitle-muted">
                    Sal: {fmt(p.salary)}{" "}
                    <span style={{ margin: "0 5px" }}>|</span> Con: {p.contract}
                    {p.status === "VENDA" && (
                      <span
                        className="pill pill-success"
                        style={{ marginLeft: 5 }}
                      >
                        {" "}
                        (À VENDA)
                      </span>
                    )}
                  </div>
                </div>
                <div className="player-ov">{p.overall}</div>
              </div>

              <div className="grid-stats-3">
                <div>
                  <small className="page-subtitle-muted">
                    ⚽ {p.stats?.goals || 0}
                  </small>
                </div>
                <div>
                  <small className="page-subtitle-muted">
                    👟 {p.stats?.assists || 0}
                  </small>
                </div>
                <div>
                  <small className="page-subtitle-muted">
                    🛡️ {p.stats?.tackles || 0}
                  </small>
                </div>
                <div>
                  <small className="page-subtitle-muted">
                    🧤 {p.stats?.saves || 0}
                  </small>
                </div>
                <div>
                  <small className="page-subtitle-muted">
                    🟨 {p.stats?.yellows || 0}
                  </small>
                </div>
                <div>
                  <small className="page-subtitle-muted">
                    🟥 {p.stats?.reds || 0}
                  </small>
                </div>
              </div>

              <div className="divider-soft">
                <AttributeGrid attrs={p.attributes} pendingXP={p.pendingXP} />
              </div>

              {/* --- CONTROLES DE AÇÃO (ADMIN VS DONO DO TIME) --- */}
              {isAdmin && (
                <div style={{ marginTop: 10, display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-blue"
                    style={{ width: "100%", fontSize: 10, padding: "8px" }}
                    onClick={() => onEdit(p)}
                  >
                    ✏️ EDITAR JOGADOR (ADM)
                  </button>
                </div>
              )}

              {!isAdmin && !isVisitor && (
                <div style={{ marginTop: 10, display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-purple"
                    style={{ flex: 1, fontSize: 10, padding: "8px" }}
                    onClick={() => setModal({ type: "OFFER", data: p })}
                  >
                    🤝 NEGOCIAR / RENOVAR
                  </button>
                  <button
                    className="btn btn-ghost"
                    style={{
                      flex: 1,
                      fontSize: 10,
                      padding: "8px",
                      borderColor: "var(--primary)",
                      color: "var(--primary)",
                    }}
                    onClick={() => setModal({ type: "PLAYER", data: p })}
                  >
                    🏷️ MERCADO
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* --- ABA 2: COMISSÃO TÉCNICA --- */}
      {tab === "STAFF" && (
        <div>
          {!staff || staff.length === 0 ? (
            <div className="card empty-state">
              <h3>Sem Comissão Técnica</h3>
              <p>Vá ao Mercado &gt; Comissão para contratar profissionais.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {[...staff]
                .sort((a, b) => a.type.localeCompare(b.type))
                .map((c) => {
                  const roleNames = {
                    COACH: "Técnico Principal",
                    DOCTOR: "Médico Chefe",
                    SCOUT: "Olheiro",
                    ASSISTANT: "Auxiliar",
                  };
                  const isCoach = c.type === "COACH";
                  const roleIcon =
                    c.type === "DOCTOR"
                      ? "🩺"
                      : c.type === "SCOUT"
                        ? "🕵️‍♂️"
                        : "👔";

                  return (
                    <div
                      key={c.id}
                      className="highlight-card"
                      style={{
                        borderLeft: isCoach
                          ? "4px solid gold"
                          : "4px solid #00E676",
                        padding: 15,
                      }}
                    >
                      <div
                        className="card-row"
                        style={{
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          className="card-row-wide"
                          style={{ alignItems: "center" }}
                        >
                          {c.face ? (
                            <img
                              src={c.face}
                              className="avatar-md"
                              style={{
                                border: `2px solid ${isCoach ? "gold" : "#00E676"}`,
                              }}
                            />
                          ) : (
                            <div
                              className="avatar-md-placeholder"
                              style={{
                                border: `2px solid ${isCoach ? "gold" : "#00E676"}`,
                              }}
                            >
                              {roleIcon}
                            </div>
                          )}
                          <div className="text-left">
                            <h3
                              style={{
                                margin: 0,
                                color: isCoach ? "gold" : "#00E676",
                              }}
                            >
                              {c.name}
                            </h3>
                            <span
                              className="badge-muted"
                              style={{ marginTop: 5 }}
                            >
                              {roleNames[c.type]} (Nvl {c.level})
                            </span>
                          </div>
                        </div>
                        {!isVisitor && (
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              flexDirection: "column",
                              position: "relative",
                              zIndex: 50,
                            }}
                          >
                            <button
                              className="btn btn-blue"
                              style={{
                                width: "auto",
                                fontSize: 10,
                                padding: "6px 10px",
                                cursor: "pointer",
                                pointerEvents: "auto",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setModal({ type: "OFFER", data: c });
                              }}
                            >
                              RENOVAR
                            </button>
                            <button
                              className="btn btn-red"
                              style={{
                                width: "auto",
                                fontSize: 10,
                                padding: "6px 10px",
                                cursor: "pointer",
                                pointerEvents: "auto",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onFireCoach(c);
                              }}
                            >
                              DEMITIR
                            </button>
                          </div>
                        )}
                      </div>

                      <hr
                        style={{
                          borderColor: "rgba(255,255,255,0.1)",
                          margin: "15px 0",
                        }}
                      />

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                          fontSize: 11,
                          textAlign: "left",
                        }}
                      >
                        {isCoach && (
                          <div>
                            <span style={{ color: "#aaa" }}>
                              Especialidade:
                            </span>
                            <br />
                            <b>{(c.affinities || []).join(", ")}</b>
                          </div>
                        )}
                        <div>
                          <span style={{ color: "#aaa" }}>Salário:</span>
                          <br />
                          <b>{fmt(c.salary)}/sem</b>
                        </div>
                        <div>
                          <span style={{ color: "#aaa" }}>
                            Multa Rescisória:
                          </span>
                          <br />
                          <b className="pill pill-danger">
                            {fmt(c.clause || c.salary * 4)}
                          </b>
                        </div>
                        <div>
                          <span style={{ color: "#aaa" }}>
                            Energia / Físico:
                          </span>
                          <br />
                          <b
                            style={{
                              color:
                                (c.energy !== undefined ? c.energy : 100) > 30
                                  ? "lime"
                                  : "red",
                            }}
                          >
                            {c.energy !== undefined ? c.energy : 100}%⚡
                          </b>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: 15,
                          background: "rgba(0,0,0,0.3)",
                          padding: 10,
                          borderRadius: 5,
                          textAlign: "left",
                        }}
                      >
                        <small style={{ color: "#ccc" }}>
                          💡 Habilidades / Vantagens:
                        </small>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 5,
                            marginTop: 5,
                          }}
                        >
                          {(c.perks || []).map((p) => (
                            <span
                              key={p.id}
                              className="badge"
                              style={{
                                background: "var(--purple)",
                                border: `1px solid ${isCoach ? "gold" : "#00E676"}`,
                                fontSize: 9,
                              }}
                              title={p.desc}
                            >
                              ⚡ {p.name}
                            </span>
                          ))}
                          {(c.perks || []).length === 0 && (
                            <span style={{ color: "#666", fontSize: 9 }}>
                              Nenhuma habilidade desbloqueada.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
      {/* --- ABA 3: SALA DE TROFÉUS DO CLUBE --- */}
      {tab === "TROFEUS" && (
        <div className="animate-in">
          <div
            className="card"
            style={{
              borderLeft: "4px solid gold",
              background: "rgba(255,215,0,0.05)",
              marginBottom: 15,
              minHeight: "200px",
            }}
          >
            <h3 style={{ marginTop: 0, color: "gold" }}>
              🏆 Galeria de Títulos e Honrarias
            </h3>
            {!team.trophies || team.trophies.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-box-open empty-state-icon"></i>
                <p className="empty-state-text">
                  A estante do clube ainda está vazia. Vença campeonatos para
                  preenchê-la!
                </p>
              </div>
            ) : (
              <div className="trophy-grid">
                {[...team.trophies].reverse().map((t, i) => (
                  <div key={i} className="trophy-card">
                    <img src={t.img} className="trophy-image" />
                    <div className="trophy-name">{t.name}</div>
                    <div className="trophy-tournament">{t.tournament}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* RENDERIZAÇÃO DO MODAL DO ESTÁDIO */}
      {showStadiumUI && (
        <StadiumManager
          team={team}
          players={players}
          onClose={() => setShowStadiumUI(false)}
        />
      )}
    </div>
  );
};
