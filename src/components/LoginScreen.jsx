import { AppearanceEditor } from "../simulation/Editors.jsx";
import { NationalitySelect } from "../national/NationalitySelect.jsx";
import React, { useState, useEffect } from "react";
import { db } from "../services/firebase.js";
import { COMPANY_TYPES } from "../game/COMPANY_TYPES.js";
import { SERIES } from "../game/SERIES.js";
import { ESTADOS } from "../game/ESTADOS.js";
import { fmt } from "../game/fmt.js";
import { COACH_AFFINITIES } from "../game/COACH_AFFINITIES.js";
import { POS } from "../game/POS.js";

export const LoginScreen = ({
  teams,
  players,
  papers,
  journalists,
  companies,
  coaches,
  onLogin,
  onCreateTeam,
  onCreatePaper,
  onCreateJourno,
  onCreateCompany,
  onAdmin,
  onVisitor,
  onCreateCoach,
  onCreatePlayer,
  config,
}) => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLogin, setAdminLogin] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminBusy, setAdminBusy] = useState(false);
  const [tab, setTab] = useState("LOGIN");
  const [subTab, setSubTab] = useState("TEAM");
  const [f, setF] = useState({ n: "", b: "10000000", s: "A", p: "" });
  const [fc, setFC] = useState({ n: "", owner: "", p: "", type: "COMERCIO" });
  const [sel, setSel] = useState(null);
  const [selPaper, setSelPaper] = useState(null);
  const [selTeamForPlayer, setSelTeamForPlayer] = useState(null);
  const [lp, setLp] = useState("");
  const [loginSerie, setLoginSerie] = useState(null); // NOVO: Controle das abas de séries

  // --- NOVO: Estados para criação de técnico ---
  const [coachData, setCoachData] = useState({
    name: "",
    password: "",
    affinity: "ATA",
    role: "COACH",
    face: null,
  });
  const [playerData, setPlayerData] = useState({
    nationality: "MTR",
    name: "",
    instagram: "",
    position: "ATA",
    password: "",
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setF({ ...f, l: reader.result });
    if (file) reader.readAsDataURL(file);
  };

  const selectedTypeInfo = COMPANY_TYPES[fc.type] || {};

  // Função Unificada de Login (CORRIGIDA)
  const handleLoginSubmit = () => {
    if (!sel) return;

    // Verifica a senha localmente
    if (String(sel.password) !== String(lp)) {
      return alert("Senha incorreta!");
    }

    // CORREÇÃO: Envia ID, SENHA e TIPO separadamente, como o App.js espera

    // 1. TIMES
    if (sel.type === "TEAM") {
      if (sel.status === "PENDING") return alert("Aguardando aprovação.");
      onLogin(sel.id, lp, "TEAM");
    }
    // 2. JOGADORES
    else if (sel.type === "PLAYER") {
      onLogin(sel.id, lp, "PLAYER");
    }
    // 3. COMISSÃO TÉCNICA (Técnico, Médico, Olheiro, Auxiliar)
    else if (["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(sel.type)) {
      if (sel.status === "PENDING") return alert("Licença em análise.");
      onLogin(sel.id, lp, sel.type); // Agora ele manda o tipo correto pro App!
    }
    // 4. EMPRESAS
    else if (sel.type === "COMPANY") {
      if (sel.status === "PENDING") return alert("Empresa em análise.");
      if (sel.status === "BLOCKED") return alert("Empresa bloqueada.");
      onLogin(sel.id, lp, "COMPANY");
    }
    // 5. JORNAIS (Donos)
    else if (sel.type === "PAPER") {
      if (sel.status === "PENDING") return alert("Jornal em análise.");
      onLogin(sel.id, lp, "PAPER");
    }
    // 6. JORNALISTAS (Funcionários)
    else if (sel.type === "JOURNALIST") {
      if (sel.status === "PENDING") return alert("Registro em análise.");
      onLogin(sel.id, lp, "JOURNALIST");
    }
  };

  return (
    <div className="login-wrapper">
      {/* --- ESTILOS DO CABEÇALHO (CENTRALIZAÇÃO TOTAL E VERSÃO) --- */}
      <style>{`
                .login-header-container { 
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    margin-bottom: 30px; 
                    width: 100%;
                    padding-top: 20px;
                }
                .logos-wrapper { 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    gap: 20px; 
                    margin-bottom: 15px;
                    width: 100%;
                    max-width: 600px;
                }
                .main-logo {
                    height: 160px;
                    max-width: 100%;
                    width: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 0 20px rgba(0, 230, 118, 0.5));
                }
                .game-title { 
                    font-size: 52px; 
                    letter-spacing: 3px; 
                    margin: 0; 
                    color: #fff; 
                    text-transform: uppercase; 
                    font-family: Impact, sans-serif; 
                    text-shadow: 0px 4px 20px rgba(0, 230, 118, 0.6); 
                }
                .dev-info-row {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    margin-top: 10px;
                }
                .dev-credits-sub { 
                    font-size: 11px; 
                    color: #aaa; 
                    letter-spacing: 2px; 
                    text-transform: uppercase; 
                    font-weight: bold; 
                }
                .version-badge {
                    background: rgba(0, 230, 118, 0.15);
                    color: #00E676;
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 900;
                    border: 1px solid rgba(0, 230, 118, 0.3);
                    margin-top: 5px;
                }
                
                @media (max-width: 768px) {
                    .logos-wrapper { gap: 10px; }
                    .main-logo { height: 120px; max-width: 100%; min-width: 0; }
                    .game-title { font-size: 34px; }
                }
            `}</style>

      {/* --- CABEÇALHO COM IMAGENS E VERSÃO --- */}
      <div className="login-header-container animate-in">
        <div className="logos-wrapper">
          <img
            src="assets/img2.jpg"
            alt="Bandeira Mato Real"
            className="main-logo"
          />
        </div>

        <h1 className="game-title">MATO REAL</h1>

        <div className="dev-info-row">
          <div className="dev-credits-sub">
            Desenvolvido por Nathan Reis
          </div>
          {/* Exibição da versão solicitada */}
          <div className="version-badge">VERSÃO 2.9.10 — MATO REAL TV </div>
        </div>
      </div>
      {/* --- FIM DO CABEÇALHO --- */}

      <nav className="login-tabs" aria-label="Acesso e cadastros">
        <button
          type="button"
          className={`tab ${tab === "LOGIN" ? "active" : ""}`}
          aria-pressed={tab === "LOGIN"}
          onClick={() => setTab("LOGIN")}
        >
          ENTRAR
        </button>
        <button
          type="button"
          className={`tab ${tab === "CREATE" ? "active" : ""}`}
          aria-pressed={tab === "CREATE"}
          onClick={() => setTab("CREATE")}
        >
          CRIAR TIME
        </button>
        <button
          type="button"
          className={`tab ${tab === "PRESS" ? "active" : ""}`}
          aria-pressed={tab === "PRESS"}
          onClick={() => setTab("PRESS")}
        >
          IMPRENSA
        </button>
        <button
          type="button"
          className={`tab ${tab === "COMPANY" ? "active" : ""}`}
          aria-pressed={tab === "COMPANY"}
          onClick={() => setTab("COMPANY")}
        >
          EMPRESAS
        </button>
        <button
          type="button"
          className={`tab ${tab === "COACH" ? "active" : ""}`}
          aria-pressed={tab === "COACH"}
          onClick={() => setTab("COACH")}
        >
          COMISSÃO
        </button>
        <button
          type="button"
          className={`tab ${tab === "NEW_PLAYER" ? "active" : ""}`}
          aria-pressed={tab === "NEW_PLAYER"}
          onClick={() => setTab("NEW_PLAYER")}
        >
          JOGADOR
        </button>
      </nav>

      {tab === "LOGIN" && (
        <div>
          <div className="login-tab-buttons" role="group" aria-label="Tipo de conta">
            <button
              className={`btn ${subTab === "TEAM" ? "btn-green" : "btn-ghost"}`}
              style={{ width: "auto" }}
              onClick={() => setSubTab("TEAM")}
            >
              TIMES
            </button>
            <button
              className={`btn ${subTab === "PLAYER" ? "btn-blue" : "btn-ghost"}`}
              style={{ width: "auto" }}
              onClick={() => {
                setSubTab("PLAYER");
                setSelTeamForPlayer(null);
              }}
            >
              JOGADORES
            </button>
            <button
              className={`btn ${subTab === "COMPANY" ? "btn-purple" : "btn-ghost"}`}
              style={{ width: "auto" }}
              onClick={() => setSubTab("COMPANY")}
            >
              EMPRESAS
            </button>
            {/* NOVO BOTÃO DE LOGIN DE TÉCNICO */}
            <button
              className={`btn ${subTab === "COACH" ? "btn-gold" : "btn-ghost"}`}
              style={{ width: "auto" }}
              onClick={() => {
                setSubTab("COACH");
                setSelTeamForPlayer(null);
                setLoginSerie(null);
              }}
            >
              COMISSÃO
            </button>
          </div>

          {/* --- ABA DE LOGIN DE TIMES (MENU VERTICAL) --- */}
          {subTab === "TEAM" && (
            <div className="text-left">
              {!loginSerie ? (
                /* TELA 1: BOTÕES DAS SÉRIES NA VERTICAL */
                <div className="animate-in login-series-wrapper">
                  <h4 className="login-series-title">Selecione a Divisão</h4>
                  {SERIES.map((s) => (
                    <button
                      key={`btn-s-${s}`}
                      className="btn btn-ghost login-series-button-team"
                      onClick={() => setLoginSerie(s)}
                    >
                      {s === "VARZEA"
                        ? "🚜 O Terrão (Várzea)"
                        : `🏆 Campeonato Série ${s}`}
                    </button>
                  ))}
                </div>
              ) : (
                /* TELA 2: LISTA DE TIMES DA SÉRIE ESCOLHIDA */
                <div className="animate-in">
                  <button
                    className="btn login-back-button"
                    onClick={() => setLoginSerie(null)}
                  >
                    ⬅ VOLTAR PARA DIVISÕES
                  </button>
                  <h4
                    className={`login-series-header-team ${loginSerie === "VARZEA" ? "login-series-title-varzea" : "login-series-title-main"}`}
                  >
                    {loginSerie === "VARZEA"
                      ? "🚜 Terrão (Várzea)"
                      : `Série ${loginSerie}`}
                  </h4>

                  {(() => {
                    const teamsInSerie = (teams || [])
                      .filter(
                        (t) => t.status !== "PENDING" && t.serie === loginSerie,
                      )
                      .sort((a, b) => a.name.localeCompare(b.name));

                    if (teamsInSerie.length === 0)
                      return (
                        <p className="login-empty-text">
                          Nenhum time cadastrado nesta série.
                        </p>
                      );

                    return teamsInSerie.map((t) => (
                      <div
                        key={t.id}
                        className="card card-row card-clickable"
                        onClick={() => setSel({ ...t, type: "TEAM" })}
                      >
                        {t.logo ? (
                          <img src={t.logo} className="login-team-card-logo" />
                        ) : (
                          <div className="login-team-card-logo-placeholder">
                            🛡️
                          </div>
                        )}
                        <div>
                          <b className="card-main-title">{t.name}</b>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          )}

          {/* --- ABA DE LOGIN DE JOGADOR (MENU VERTICAL) --- */}
          {subTab === "PLAYER" && !selTeamForPlayer && (
            <div className="text-left">
              {!loginSerie ? (
                /* TELA 1: BOTÕES DAS SÉRIES + AGENTE LIVRE */
                <div className="animate-in login-series-wrapper">
                  <p className="login-player-help">
                    Selecione o clube onde você joga ou acesse como livre:
                  </p>

                  <div
                    className="card pulse login-free-agent-card"
                    onClick={() =>
                      setSelTeamForPlayer({
                        id: "FREE",
                        name: "Agentes Livres",
                      })
                    }
                  >
                    <b className="login-free-agent-title">
                      🆓 SOU AGENTE LIVRE
                    </b>
                  </div>

                  {SERIES.map((s) => (
                    <button
                      key={`btn-p-s-${s}`}
                      className="btn btn-ghost login-series-button-player"
                      onClick={() => setLoginSerie(s)}
                    >
                      {s === "VARZEA"
                        ? "🚜 O Terrão (Várzea)"
                        : `🏆 Campeonato Série ${s}`}
                    </button>
                  ))}
                </div>
              ) : (
                /* TELA 2: LISTA DE TIMES DA SÉRIE (PARA O JOGADOR CLICAR) */
                <div className="animate-in">
                  <button
                    className="btn login-back-button"
                    onClick={() => setLoginSerie(null)}
                  >
                    ⬅ VOLTAR PARA DIVISÕES
                  </button>
                  <h4
                    className={`login-series-header-team ${loginSerie === "VARZEA" ? "login-series-title-varzea" : ""}`}
                  >
                    {loginSerie === "VARZEA"
                      ? "🚜 Terrão (Várzea)"
                      : `Série ${loginSerie}`}
                  </h4>

                  {(() => {
                    const teamsInSerie = (teams || [])
                      .filter(
                        (t) => t.status !== "PENDING" && t.serie === loginSerie,
                      )
                      .sort((a, b) => a.name.localeCompare(b.name));

                    if (teamsInSerie.length === 0)
                      return (
                        <p className="login-empty-text">
                          Nenhum time cadastrado nesta série.
                        </p>
                      );

                    return teamsInSerie.map((t) => (
                      <div
                        key={t.id}
                        className="card"
                        onClick={() => setSelTeamForPlayer(t)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                        }}
                      >
                        {t.logo ? (
                          <img
                            src={t.logo}
                            className="login-player-team-logo"
                          />
                        ) : (
                          <div className="login-player-team-logo-placeholder">
                            🛡️
                          </div>
                        )}
                        <b style={{ fontSize: 15 }}>{t.name}</b>
                        <i
                          className="fas fa-chevron-right"
                          style={{ marginLeft: "auto", color: "#555" }}
                        ></i>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          )}

          {/* --- ABA DE LOGIN DE JOGADOR (TELA 3: LISTA DO ELENCO COM FOTO E ALFABÉTICA) --- */}
          {subTab === "PLAYER" && selTeamForPlayer && (
            <div className="animate-in text-left">
              <button
                className="btn login-back-button"
                onClick={() => setSelTeamForPlayer(null)}
              >
                ⬅ VOLTAR AOS CLUBES
              </button>
              <h4 className="login-series-header-team">
                Elenco: {selTeamForPlayer.name}
              </h4>

              {(() => {
                const teamPlayers = (players || [])
                  .filter((p) => !p.isBot && p.teamId === selTeamForPlayer.id)
                  .sort((a, b) => a.name.localeCompare(b.name));

                if (teamPlayers.length === 0)
                  return (
                    <p className="login-empty-text">
                      Nenhum jogador encontrado neste clube.
                    </p>
                  );

                return teamPlayers.map((p) => (
                  <div
                    key={p.id}
                    className="card card-row card-clickable card-accent-secondary"
                    onClick={() => setSel({ ...p, type: "PLAYER" })}
                  >
                    {p.face ? (
                      <img src={p.face} className="avatar-md" />
                    ) : (
                      <div className="avatar-md-placeholder">👤</div>
                    )}

                    <div className="flex-1">
                      <b className="card-main-title">
                        {p.name} {p.recoveryLeft > 0 ? "❌" : ""}
                      </b>
                      <br />
                      <span className="login-player-position-badge">
                        {p.position}
                      </span>
                    </div>
                    <i className="fas fa-sign-in-alt icon-right-muted"></i>
                  </div>
                ));
              })()}
            </div>
          )}

          {subTab === "COMPANY" &&
            (companies || [])
              .filter((c) => c.status !== "PENDING")
              .map((c) => (
                <div
                  key={c.id}
                  className="card login-company-card"
                  onClick={() => setSel({ ...c, type: "COMPANY" })}
                >
                  🏢 <b>{c.name}</b>
                  <br />
                  <small>{c.companyType}</small>
                </div>
              ))}

          {/* --- ABA DE LOGIN DE COMISSÃO TÉCNICA (MENU VERTICAL CORRIGIDO) --- */}
          {subTab === "COACH" && !selTeamForPlayer && (
            <div className="text-left">
              {!loginSerie ? (
                <div className="animate-in login-series-wrapper">
                  <p className="login-coach-help">
                    Selecione o clube onde trabalha ou acesse como livre:
                  </p>

                  <div
                    className="card pulse login-coach-free-card"
                    onClick={() =>
                      setSelTeamForPlayer({
                        id: "FREE",
                        name: "Profissionais Livres",
                      })
                    }
                  >
                    <b className="login-coach-free-title">
                      🆓 SOU PROFISSIONAL LIVRE
                    </b>
                  </div>

                  {SERIES.map((s) => (
                    <button
                      key={`btn-c-s-${s}`}
                      className="btn btn-ghost login-coach-series-button"
                      onClick={() => setLoginSerie(s)}
                    >
                      {s === "VARZEA"
                        ? "🚜 O Terrão (Várzea)"
                        : `🏆 Campeonato Série ${s}`}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="animate-in">
                  <button
                    className="btn login-back-button"
                    onClick={() => setLoginSerie(null)}
                  >
                    ⬅ VOLTAR PARA DIVISÕES
                  </button>
                  <h4 className="login-coach-series-header">
                    {loginSerie === "VARZEA"
                      ? "🚜 Terrão (Várzea)"
                      : `Série ${loginSerie}`}
                  </h4>

                  {(() => {
                    const teamsInSerie = (teams || [])
                      .filter(
                        (t) => t.status !== "PENDING" && t.serie === loginSerie,
                      )
                      .sort((a, b) => a.name.localeCompare(b.name));

                    if (teamsInSerie.length === 0)
                      return (
                        <p className="login-empty-text">
                          Nenhum time cadastrado nesta série.
                        </p>
                      );

                    return teamsInSerie.map((t) => (
                      <div
                        key={t.id}
                        className="card"
                        onClick={() => setSelTeamForPlayer(t)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                        }}
                      >
                        {t.logo ? (
                          <img src={t.logo} className="login-coach-team-logo" />
                        ) : (
                          <div className="login-coach-team-logo-placeholder">
                            🛡️
                          </div>
                        )}
                        <b style={{ fontSize: 15 }}>{t.name}</b>
                        <i
                          className="fas fa-chevron-right"
                          style={{ marginLeft: "auto", color: "#555" }}
                        ></i>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          )}

          {/* --- TELA 3: FOTO DA COMISSÃO NO TIME ESCOLHIDO --- */}
          {subTab === "COACH" && selTeamForPlayer && (
            <div className="animate-in text-left">
              <button
                className="btn login-back-button"
                onClick={() => setSelTeamForPlayer(null)}
              >
                ⬅ VOLTAR AOS CLUBES
              </button>
              <h4 className="login-coach-list-header">
                {selTeamForPlayer.id === "FREE"
                  ? "Mercado de Profissionais"
                  : `Staff: ${selTeamForPlayer.name}`}
              </h4>

              {(() => {
                const teamCoaches = (coaches || [])
                  .filter(
                    (c) =>
                      c.status === "ACTIVE" && c.teamId === selTeamForPlayer.id,
                  )
                  .sort((a, b) => a.name.localeCompare(b.name));

                if (teamCoaches.length === 0)
                  return (
                    <p className="login-empty-text">
                      Nenhum profissional contratado neste clube.
                    </p>
                  );

                const roleNames = {
                  COACH: "👔 Técnico",
                  DOCTOR: "🩺 Médico",
                  SCOUT: "🕵️‍♂️ Olheiro",
                  ASSISTANT: "📋 Auxiliar",
                };

                return teamCoaches.map((c) => (
                  <div
                    key={c.id}
                    className="card login-coach-card card-clickable"
                    onClick={() => setSel({ ...c, type: c.type || "COACH" })}
                  >
                    {c.face ? (
                      <img src={c.face} className="login-coach-photo" />
                    ) : (
                      <div className="login-coach-photo-placeholder">
                        {c.type === "DOCTOR"
                          ? "🩺"
                          : c.type === "SCOUT"
                            ? "🕵️‍♂️"
                            : c.type === "ASSISTANT"
                              ? "📋"
                              : "👔"}
                      </div>
                    )}

                    <div className="flex-1">
                      <b className="login-coach-name">{c.name}</b>
                      <br />
                      <span className="login-coach-subtitle">
                        {roleNames[c.type] || "👔 Técnico"} | Nível {c.level}
                        {c.type === "COACH" && c.affinities
                          ? ` | Esp: ${c.affinities[0]}`
                          : ""}
                      </span>
                    </div>
                    <i className="fas fa-sign-in-alt icon-login-gold"></i>
                  </div>
                ));
              })()}
            </div>
          )}

          <div className="login-footer-actions">
            <button className="btn btn-blue" onClick={onVisitor}>
              ENTRAR COMO VISITANTE
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setAdminOpen(true);
                setAdminError("");
              }}
            >
              ADMIN
            </button>
            {adminOpen && (
              <form
                className="card"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAdminBusy(true);
                  setAdminError("");
                  try {
                    await onAdmin(adminLogin, adminPassword);
                    setAdminPassword("");
                  } catch (error) {
                    setAdminError(
                      error.code?.startsWith("auth/")
                        ? "Não foi possível entrar. Confira o login e a senha."
                        : error.message,
                    );
                  } finally {
                    setAdminBusy(false);
                  }
                }}
              >
                <h3>Acesso administrativo</h3>
                <label>
                  E-mail do principal ou login do subADM
                  <input
                    className="input-field"
                    autoComplete="username"
                    required
                    value={adminLogin}
                    onChange={(e) => setAdminLogin(e.target.value)}
                  />
                </label>
                <label>
                  Senha administrativa
                  <input
                    className="input-field"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </label>
                {adminError && <p role="alert">{adminError}</p>}
                <button className="btn btn-green" disabled={adminBusy}>
                  ENTRAR NO PAINEL
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={adminBusy}
                  onClick={() => {
                    setAdminOpen(false);
                    setAdminPassword("");
                  }}
                >
                  CANCELAR
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {tab === "CREATE" && (
        <div>
          <h3 style={{ color: "var(--primary)" }}>Fundar Novo Clube</h3>

          <div className="login-create-club-preview">
            <div>
              {f.l ? (
                <img src={f.l} className="login-club-logo" />
              ) : (
                <div className="login-club-logo-placeholder">🛡️</div>
              )}
            </div>

            <label className="btn btn-blue login-upload-badge">
              <i className="fas fa-upload" style={{ marginRight: 5 }}></i>{" "}
              ESCOLHER ESCUDO
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUpload}
              />
            </label>
          </div>

          <input
            className="input-field"
            placeholder="Nome do Clube"
            value={f.n}
            onChange={(e) => setF({ ...f, n: e.target.value })}
          />

          {/* Lógica de Saldo Travado para Várzea */}
          <input
            className={`input-field ${f.s === "VARZEA" ? "login-varzea-balance" : ""}`}
            type="number"
            placeholder="Saldo Inicial"
            value={f.s === "VARZEA" ? 200000 : f.b}
            onChange={(e) => setF({ ...f, b: e.target.value })}
            disabled={f.s === "VARZEA"}
          />

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label style={{ fontSize: 11, color: "#aaa" }}>
                Divisão Nacional
              </label>
              <select
                className="input-field"
                value={f.s}
                onChange={(e) => {
                  const newSerie = e.target.value;
                  const newBal = newSerie === "VARZEA" ? "200000" : "10000000";
                  setF({ ...f, s: newSerie, b: newBal });
                }}
              >
                {SERIES.map((s) => (
                  <option key={s} value={s}>
                    {s === "VARZEA" ? "Série E (Várzea)" : `Série ${s}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#aaa" }}>
                Federação Estadual
              </label>
              <select
                className="input-field"
                value={f.estado || ""}
                onChange={(e) => setF({ ...f, estado: e.target.value })}
              >
                <option value="">-- Escolha --</option>
                {ESTADOS.map((est) => (
                  <option key={est} value={est}>
                    {est}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input
            className="input-field"
            type="password"
            placeholder="Crie uma Senha"
            value={f.p}
            onChange={(e) => setF({ ...f, p: e.target.value })}
          />

          {f.s === "VARZEA" && config?.varzeaOpen === false && (
            <div className="login-varzea-warning">
              <b className="login-varzea-warning-title">
                🛑 INSCRIÇÕES ENCERRADAS!
              </b>
              <span className="login-varzea-warning-text">
                A Federação informa que o limite de clubes da Várzea foi
                atingido.
              </span>
            </div>
          )}

          <button
            className={`btn ${f.s === "VARZEA" && config?.varzeaOpen === false ? "btn-ghost" : "btn-green"}`}
            disabled={f.s === "VARZEA" && config?.varzeaOpen === false}
            onClick={() => {
              if (!f.n || !f.p || !f.estado)
                return alert("⚠️ Preencha nome, senha e escolha o ESTADO!");
              if (
                teams.find(
                  (t) => t.name && t.name.toLowerCase() === f.n.toLowerCase(),
                )
              )
                return alert("🚫 Este nome de clube já está em uso!");

              const statusInicial = f.s === "VARZEA" ? "ACTIVE" : "PENDING";
              const finalBal = f.s === "VARZEA" ? 200000 : parseFloat(f.b);

              db.collection("teams")
                .add({
                  name: f.n,
                  balance: finalBal,
                  serie: f.s,
                  estado: f.estado,
                  password: f.p,
                  stadiumLevel: 1,
                  logo: f.l || null,
                  status: statusInicial,
                  stats: {
                    pts: 0,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    gf: 0,
                    ga: 0,
                    cards: 0,
                  },
                  stateStats: {
                    pts: 0,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    gf: 0,
                    ga: 0,
                  },
                })
                .then(() => {
                  if (statusInicial === "ACTIVE") {
                    alert(
                      "✅ Clube de Várzea fundado! Bem-vindo ao Estadual de " +
                        f.estado +
                        "!",
                    );
                    window.location.reload();
                  } else {
                    alert(
                      "✅ Solicitação enviada à Federação! Aguarde aprovação.",
                    );
                    setF({
                      n: "",
                      b: "10000000",
                      s: "A",
                      p: "",
                      l: null,
                      estado: "",
                    });
                    setTab("LOGIN");
                  }
                });
            }}
          >
            FUNDAR CLUBE E FILIAR À FEDERAÇÃO
          </button>

          {f.s === "VARZEA" && (
            <p className="login-varzea-note">
              * Times da Várzea iniciam com teto de ₣ 200.000 e aprovação
              imediata.
            </p>
          )}
        </div>
      )}
      {tab === "PRESS" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <button
              className="btn btn-ghost"
              onClick={() => setSubTab("LOGIN_P")}
            >
              LOGIN
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setSubTab("NEW_PAPER")}
            >
              CRIAR JORNAL
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setSubTab("NEW_JOURNO")}
            >
              SOU JORNALISTA
            </button>
          </div>
          {subTab === "LOGIN_P" && !selPaper && (
            <div>
              <h4>Selecione o Jornal</h4>
              {(papers || [])
                .filter((p) => p.status === "ACTIVE")
                .map((p) => (
                  <div
                    key={p.id}
                    className="card"
                    onClick={() => setSelPaper(p)}
                  >
                    📰 {p.name}
                  </div>
                ))}
            </div>
          )}
          {subTab === "LOGIN_P" && selPaper && (
            <div>
              <button
                className="btn"
                style={{ marginBottom: 10 }}
                onClick={() => setSelPaper(null)}
              >
                ⬅ VOLTAR
              </button>
              <h4>{selPaper.name} - Jornalistas</h4>
              <div
                className="card"
                onClick={() => setSel({ ...selPaper, type: "PAPER" })}
                style={{ border: "1px solid var(--primary)" }}
              >
                👑 {selPaper.ownerName} (Dono)
              </div>
              {(journalists || [])
                .filter(
                  (j) => j.newspaperId === selPaper.id && j.status === "ACTIVE",
                )
                .map((j) => (
                  <div
                    key={j.id}
                    className="card"
                    onClick={() => setSel({ ...j, type: "JOURNALIST" })}
                  >
                    ✒️ {j.name}
                  </div>
                ))}
            </div>
          )}
          {subTab === "NEW_PAPER" && (
            <div>
              <input
                className="input-field"
                placeholder="Nome do Jornal"
                id="pn"
              />
              <input
                className="input-field"
                placeholder="Seu Nome (Dono)"
                id="po"
              />
              <input
                className="input-field"
                type="number"
                placeholder="Senha"
                id="pp"
              />
              <button
                className="btn btn-green"
                onClick={() =>
                  onCreatePaper(
                    document.getElementById("pn").value,
                    document.getElementById("pp").value,
                    document.getElementById("po").value,
                  )
                }
              >
                SOLICITAR CRIAÇÃO
              </button>
            </div>
          )}
          {subTab === "NEW_JOURNO" && (
            <div>
              <input className="input-field" placeholder="Seu Nome" id="jn" />
              <select className="input-field" id="jp_id">
                <option value="">Selecione o Jornal</option>
                {(papers || [])
                  .filter((p) => p.status === "ACTIVE")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
              <input
                className="input-field"
                type="number"
                placeholder="Senha"
                id="jp"
              />
              <button
                className="btn btn-green"
                onClick={() =>
                  onCreateJourno(
                    document.getElementById("jn").value,
                    document.getElementById("jp").value,
                    document.getElementById("jp_id").value,
                  )
                }
              >
                SOLICITAR EMPREGO
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "COMPANY" && (
        <div>
          <h3 style={{ color: "var(--purple)" }}>Abrir Empresa</h3>
          <input
            className="input-field"
            placeholder="Nome da Empresa"
            value={fc.n}
            onChange={(e) => setFC({ ...fc, n: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Nome do Dono"
            value={fc.owner}
            onChange={(e) => setFC({ ...fc, owner: e.target.value })}
          />

          <label className="login-company-label">Porte da Empresa</label>
          <select
            className="input-field"
            value={fc.type}
            onChange={(e) => setFC({ ...fc, type: e.target.value })}
          >
            <option value="COMERCIO">Comércio Local</option>
            <option value="MEDIA">Média Empresa</option>
            <option value="GRANDE">Grande Empresa</option>
          </select>

          <div className="login-company-box">
            <div className="login-info-row" style={{ marginBottom: 5 }}>
              <span>💰 Capital Inicial:</span>
              <span className="login-company-highlight-primary">
                {fmt(selectedTypeInfo.start)}
              </span>
            </div>
            <div className="login-info-row">
              <span>💸 Imposto Semanal:</span>
              <span className="login-company-highlight-danger">
                {fmt(selectedTypeInfo.tax)}
              </span>
            </div>
            <p className="login-company-tax-note">"{selectedTypeInfo.desc}"</p>
          </div>

          <input
            className="input-field"
            type="number"
            placeholder="Senha de Acesso"
            value={fc.p}
            onChange={(e) => setFC({ ...fc, p: e.target.value })}
          />
          <button
            className="btn btn-purple"
            onClick={() => onCreateCompany(fc)}
          >
            SOLICITAR ABERTURA
          </button>
        </div>
      )}

      {/* --- NOVO BLOCO: ABA COMISSÃO TÉCNICA --- */}
      {tab === "COACH" && (
        <div>
          <h3 className="login-coach-title">🎓 Licença Profissional</h3>
          <p style={{ fontSize: 12, color: "#aaa" }}>
            Inicie sua carreira no Staff de um Clube.
          </p>

          <div className="card login-coach-card-info">
            <div className="login-info-row">
              <span>
                Nível Inicial: <b>1</b>
              </span>
              <span>
                Salário Base: <b>{fmt(2500)}</b>
              </span>
            </div>
          </div>

          <div className="login-coach-avatar-wrapper">
            <div className="login-coach-avatar">
              {coachData.face ? (
                <img
                  src={coachData.face}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              ) : (
                <span style={{ fontSize: 30 }}>📷</span>
              )}
            </div>
            <label className="btn btn-ghost login-coach-upload-label">
              ESCOLHER FOTO DE PERFIL
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = (ev) => {
                    const img = new Image();
                    img.src = ev.target.result;
                    img.onload = () => {
                      const canvas = document.createElement("canvas");
                      const MAX = 150;
                      let w = img.width,
                        h = img.height;
                      if (w > h) {
                        if (w > MAX) {
                          h *= MAX / w;
                          w = MAX;
                        }
                      } else {
                        if (h > MAX) {
                          w *= MAX / h;
                          h = MAX;
                        }
                      }
                      canvas.width = w;
                      canvas.height = h;
                      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                      setCoachData({
                        ...coachData,
                        face: canvas.toDataURL("image/jpeg", 0.8),
                      });
                    };
                  };
                }}
              />
            </label>
          </div>

          <label
            style={{
              textAlign: "left",
              display: "block",
              color: "#aaa",
              fontSize: 12,
            }}
          >
            Qual a sua profissão?
          </label>
          <select
            className="input-field"
            value={coachData.role}
            onChange={(e) =>
              setCoachData({ ...coachData, role: e.target.value })
            }
            style={{ borderColor: "gold", color: "gold", fontWeight: "bold" }}
          >
            <option value="COACH">👔 Técnico Principal</option>
            <option value="ASSISTANT">📋 Auxiliar Técnico</option>
            <option value="DOCTOR">🩺 Médico Chefe</option>
            <option value="SCOUT">🕵️‍♂️ Olheiro / Diretor</option>
          </select>

          <input
            className="input-field"
            value={coachData.name}
            onChange={(e) =>
              setCoachData({ ...coachData, name: e.target.value })
            }
            placeholder="Seu Nome"
          />
          <input
            className="input-field"
            type="password"
            value={coachData.password}
            onChange={(e) =>
              setCoachData({ ...coachData, password: e.target.value })
            }
            placeholder="Senha de Acesso"
          />

          {coachData.role === "COACH" && (
            <>
              <label
                style={{
                  textAlign: "left",
                  display: "block",
                  color: "#aaa",
                  fontSize: 12,
                }}
              >
                Especialidade Inicial
              </label>
              <select
                className="input-field"
                value={coachData.affinity}
                onChange={(e) =>
                  setCoachData({ ...coachData, affinity: e.target.value })
                }
              >
                {COACH_AFFINITIES.map((a) => (
                  <option key={a} value={a}>
                    {a} - Especialista
                  </option>
                ))}
              </select>
            </>
          )}

          <button
            className="btn btn-gold"
            onClick={() => onCreateCoach(coachData)}
          >
            GERAR REGISTRO PROFISSIONAL
          </button>
        </div>
      )}
      {/* --- ABA INSCRIÇÃO DE JOGADOR --- */}
      {tab === "NEW_PLAYER" && (
        <div>
          <h3 style={{ color: "cyan" }}>⚽ Inscrição de Atleta</h3>
          <NationalitySelect
            value={playerData.nationality}
            onChange={(nationality) =>
              setPlayerData({ ...playerData, nationality })
            }
          />
          <small>
            A nacionalidade define qual seleção você poderá representar.
          </small>
          <p style={{ fontSize: 12, color: "#aaa" }}>
            Crie seu jogador. Você começará nos Agentes Livres.
          </p>

          <div
            className="card"
            style={{
              border: "1px solid cyan",
              background: "rgba(0, 255, 255, 0.05)",
              marginBottom: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
              }}
            >
              <span>
                OVR Inicial (Linha): <b>45</b>
              </span>
              <span>
                OVR Inicial (Goleiro): <b>60</b>
              </span>
            </div>
          </div>

          <input
            className="input-field"
            value={playerData.name}
            onChange={(e) =>
              setPlayerData({ ...playerData, name: e.target.value })
            }
            placeholder="Nome no Jogo (Ex: João Silva)"
          />
          <input
            className="input-field"
            value={playerData.instagram}
            onChange={(e) =>
              setPlayerData({ ...playerData, instagram: e.target.value })
            }
            placeholder="@ do seu Instagram (Para verificação)"
          />
          <input
            className="input-field"
            type="password"
            value={playerData.password}
            onChange={(e) =>
              setPlayerData({ ...playerData, password: e.target.value })
            }
            placeholder="Crie uma Senha de Acesso"
          />

          <label
            style={{
              textAlign: "left",
              display: "block",
              color: "#aaa",
              fontSize: 12,
            }}
          >
            Posição Inicial
          </label>
          <select
            className="input-field"
            value={playerData.position}
            onChange={(e) =>
              setPlayerData({ ...playerData, position: e.target.value })
            }
          >
            {POS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <details>
            <summary>Personalizar personagem em pixel art</summary>
            <AppearanceEditor
              player={{ pixelAppearance: playerData.pixelAppearance }}
              onChange={(pixelAppearance) =>
                setPlayerData((v) => ({ ...v, pixelAppearance }))
              }
            />
          </details>
          <button
            className="btn btn-blue"
            onClick={() => onCreatePlayer(playerData)}
          >
            ENVIAR INSCRIÇÃO
          </button>
        </div>
      )}

      {sel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{sel.name}</h3>
            <input
              className="input-field"
              type="password"
              placeholder="Senha"
              value={lp}
              onChange={(e) => setLp(e.target.value)}
            />
            <button className="btn btn-green" onClick={handleLoginSubmit}>
              ENTRAR
            </button>
            <button className="btn" onClick={() => setSel(null)}>
              CANCELAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
