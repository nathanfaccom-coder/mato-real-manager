import { promptMoney } from '../money/promptMoney.jsx';
import React, { useState, useEffect } from "react";
import { db } from "../services/firebase.js";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";
import { getPriceStatus } from "../game/getPriceStatus.js";
import { getPosColor } from "../game/getPosColor.js";
import { fmt } from "../game/fmt.js";
import { AttributeGrid } from "./AttributeGrid.jsx";
import { getPersonalSponsorLimits } from "../game/getPersonalSponsorLimits.js";

export const Market = ({
  user,
  me,
  teams,
  players,
  coaches,
  open,
  isVis,
  onNeg,
  onPayClause,
  onPre,
  onHireCoach,
  onIndicate,
}) => {
  const [view, setView] = useState("MENU");
  const [serie, setSerie] = useState("A");
  const [selT, setSelT] = useState(null);
  const [filt, setFilt] = useState("VENDA");

  // --- NOVOS ESTADOS PARA OS FILTROS ---
  const [searchName, setSearchName] = useState("");
  const [searchPos, setSearchPos] = useState("");
  const [minOvr, setMinOvr] = useState(0);
  const [maxOvr, setMaxOvr] = useState(99);

  // --- BLOQUEIO DE SEGURANÇA ---
  // Apenas presidentes de clubes (tipo 'USER') podem negociar ou contratar técnicos
  const isPresident = user && user.type === "USER";

  // Filtros de jogadores (Client-side / Tempo Real)
  const filteredPlayers = React.useMemo(() => {
    let baseList = [];
    if (view === "GLOBAL") {
      if (filt === "FREE") {
        baseList = players.filter((p) => p.teamId === "FREE" || !p.teamId);
      } else {
        baseList = players.filter(
          (p) => p.status === filt && p.teamId !== me && p.teamId !== "FREE",
        );
      }
    } else if (view === "TEAM" && selT) {
      baseList = players.filter((p) => p.teamId === selT.id);
    } else if (view === "MENU") {
      baseList = players; // No menu, a busca global procura em todos os jogadores
    }

    // Não filtra jogadores se estiver nas telas puras de séries ou técnicos
    if (view === "LIST" || view === "COACHES") return [];

    // Se estiver no MENU e não houver filtro ativo, retorna vazio para não renderizar a lista inteira de cara
    const isFilterActive =
      searchName !== "" || searchPos !== "" || minOvr > 0 || maxOvr < 99;
    if (view === "MENU" && !isFilterActive) return [];

    // Aplica os filtros
    return baseList
      .filter((p) => {
        const matchName =
          searchName === "" ||
          (p.name && p.name.toLowerCase().includes(searchName.toLowerCase()));
        const matchPos = searchPos === "" || p.position === searchPos;
        const ovr = parseInt(p.overall) || 0;
        const matchOvr = ovr >= minOvr && ovr <= maxOvr;

        return matchName && matchPos && matchOvr;
      })
      .sort((a, b) => b.overall - a.overall);
  }, [players, view, filt, me, selT, searchName, searchPos, minOvr, maxOvr]);

  // Filtro de técnicos livres
  const availableCoaches = (coaches || []).filter(
    (c) => c.status === "ACTIVE" && c.teamId === "FREE",
  );

  // =====================================================================
  // RENDERIZADORES COMPARTILHADOS (Evita código duplicado)
  // =====================================================================

  // 1. Barra de Filtros
  const renderFilters = (titleText) => (
    <div
      className="card"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid #333",
        marginBottom: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: "bold", color: "#aaa" }}>
          <i className="fas fa-filter"></i> {titleText}
        </span>
        <button
          className="btn btn-ghost"
          style={{ width: "auto", padding: "2px 8px", fontSize: 10 }}
          onClick={() => {
            setSearchName("");
            setSearchPos("");
            setMinOvr(0);
            setMaxOvr(99);
          }}
        >
          LIMPAR
        </button>
      </div>

      <input
        className="input-field"
        placeholder="🔍 Buscar por nome..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, color: "#888" }}>Posição</label>
          <select
            className="input-field"
            value={searchPos}
            onChange={(e) => setSearchPos(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="GOL">GOL</option>
            <option value="ZAG">ZAG</option>
            <option value="LD">LD</option>
            <option value="LE">LE</option>
            <option value="VOL">VOL</option>
            <option value="MC">MC</option>
            <option value="MEI">MEI</option>
            <option value="PTD">PTD</option>
            <option value="PTE">PTE</option>
            <option value="ATA">ATA</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, color: "#888" }}>
            OVR Mín ({minOvr})
          </label>
          <input
            className="input-field"
            type="number"
            min="0"
            max="99"
            value={minOvr}
            onChange={(e) => setMinOvr(parseInt(e.target.value) || 0)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, color: "#888" }}>
            OVR Máx ({maxOvr})
          </label>
          <input
            className="input-field"
            type="number"
            min="0"
            max="99"
            value={maxOvr}
            onChange={(e) => setMaxOvr(parseInt(e.target.value) || 99)}
          />
        </div>
      </div>
    </div>
  );

  // 2. Card do Jogador individual
  const renderPlayerCard = (p) => {
    const recPrice = getRecommendedPrice(p.overall, p.position);
    const status = getPriceStatus(p.value, recPrice);

    return (
      <div
        key={p.id}
        className="card"
        style={{
          borderLeft: `4px solid ${getPosColor(p.position)}`,
          opacity: p.preContract ? 0.7 : 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {p.face ? (
              <img
                src={p.face}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "top",
                  border: "2px solid #444",
                }}
              />
            ) : (
              <div style={{ display: "flex", gap: 2 }}>
                <span
                  className="badge-pos"
                  style={{
                    background: getPosColor(p.position),
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                  }}
                >
                  {p.position}
                </span>
                {p.secondaryPositions &&
                  p.secondaryPositions.map((sp) => (
                    <span
                      key={sp}
                      className="badge-pos"
                      style={{
                        background: getPosColor(sp),
                        width: 25,
                        height: 25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        opacity: 0.8,
                      }}
                      title={`Aprendeu a jogar de ${sp}`}
                    >
                      {sp}
                    </span>
                  ))}
              </div>
            )}

            <div>
              <b style={{ fontSize: 16 }}>
                {p.name} <span style={{ fontSize: 14 }}>{p.mood}</span>
              </b>
              <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>
                {p.teamId === "FREE" ? (
                  <b style={{ color: "var(--warning)" }}>
                    <i className="fas fa-unlock"></i> PASSE LIVRE
                  </b>
                ) : (
                  <span>
                    <i className="fas fa-tshirt"></i>{" "}
                    {teams.find((t) => t.id === p.teamId)?.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="player-ov">{p.overall}</span>
        </div>

        {p.teamId !== "FREE" && (
          <div
            style={{
              marginTop: 8,
              textAlign: "center",
              background: "rgba(0,0,0,0.4)",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                color: status.color,
                fontSize: "10px",
                fontWeight: "bold",
                letterSpacing: "0.5px",
              }}
            >
              {status.label}
            </span>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            fontSize: 11,
            color: "#aaa",
            marginTop: 10,
            background: "rgba(0,0,0,0.2)",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <div>
            Valor:{" "}
            <b style={{ color: p.teamId === "FREE" ? "lime" : "#fff" }}>
              {p.teamId === "FREE" ? "GRÁTIS" : fmt(p.value)}
            </b>
          </div>
          <div>
            Contrato:{" "}
            <b
              style={{
                color:
                  p.contract === 0
                    ? "var(--danger)"
                    : p.contract === 1
                      ? "var(--warning)"
                      : "#fff",
              }}
            >
              {p.contract} Temp.
            </b>
          </div>
        </div>

        <div
          style={{ marginTop: 8, borderTop: "1px dashed #444", paddingTop: 5 }}
        >
          <AttributeGrid attrs={p.attributes} />
        </div>

        {p.preContract && (
          <div
            style={{
              marginTop: 10,
              background: "rgba(0,0,0,0.5)",
              padding: 5,
              borderRadius: 4,
              textAlign: "center",
              border: "1px solid var(--secondary)",
            }}
          >
            <small style={{ color: "var(--secondary)", fontWeight: "bold" }}>
              📝 JÁ ASSINOU PRÉ-CONTRATO
            </small>
            <br />
            <small style={{ color: "#aaa", fontSize: 9 }}>
              Vai para o {p.preContract.teamName} no fim da temporada.
            </small>
          </div>
        )}

        {/* --- BOTÃO DAS EMPRESAS (NOVO) --- */}
        {user && user.type === "COMPANY" && !p.personalSponsor && (
          <div style={{ marginTop: 12 }}>
            <button
              className="btn btn-purple"
              style={{ width: "100%", marginBottom: 0, padding: "8px" }}
              onClick={async () => {
                const limits = getPersonalSponsorLimits(p.overall);
                const val = await promptMoney(
                  `Patrocínio Pessoal para ${p.name}\n\nSeu Saldo: ${fmt(user.data.balance)}\nFaixa Permitida: ${fmt(limits.min)} a ${fmt(limits.max)} por semana.\n\nDigite o valor semanal oferecido:`,
                );
                if (val) {
                  const v = parseFloat(val);
                  if (v < limits.min || v > limits.max)
                    return alert(
                      "Valor fora da faixa permitida para o Overall deste jogador.",
                    );

                  db.collection("offers").add({
                    type: "PERSONAL_SPONSOR_OFFER",
                    recipientId: p.id,
                    senderId: user.data.id,
                    companyName: user.data.name,
                    playerName: p.name,
                    value: v,
                    status: "PENDING",
                    description: `📸 **CONVITE PARA GAROTO PROPAGANDA**\nA marca **${user.data.name}** quer você como rosto oficial deles!\n\nPagamento Semanal: ${fmt(v)}\n\nMulta por quebra de contrato: 4 semanas de pagamento.`,
                    date: Date.now(),
                  });
                  alert("Proposta enviada ao jogador!");
                }
              }}
            >
              📸 PROPOR PATROCÍNIO
            </button>
          </div>
        )}

        {/* --- AQUI APLIQUEI A NOVA REGRA (SOMENTE PRESIDENTES PODEM NEGOCIAR) --- */}
        {isPresident && !p.preContract && (
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            {(open || p.teamId === "FREE") && p.status !== "INTRANSFERIVEL" && (
              <button
                className="btn btn-purple"
                style={{ flex: 1, marginBottom: 0 }}
                onClick={() => onNeg(p)}
              >
                <i className="fas fa-handshake"></i>{" "}
                {p.teamId === "FREE" ? "CONTRATAR" : "NEGOCIAR"}
              </button>
            )}

            {p.contract === 1 &&
              p.teamId !== "FREE" &&
              p.status !== "INTRANSFERIVEL" && (
                <button
                  className="btn btn-blue"
                  style={{ flex: 1, marginBottom: 0 }}
                  onClick={() => {
                    const dummyOffer = { type: "PRE_CONTRATO", value: 0 };
                    onNeg({ ...p, oldOffer: dummyOffer });
                  }}
                >
                  <i className="fas fa-file-signature"></i> PRÉ-CONTRATO
                </button>
              )}

            {!open && p.teamId !== "FREE" && p.contract !== 1 && (
              <button
                className="btn btn-ghost"
                style={{ flex: 1, marginBottom: 0, opacity: 0.5 }}
                disabled
              >
                <i className="fas fa-lock"></i> FECHADO
              </button>
            )}

            {false && p.teamId !== "FREE" && parseFloat(p.clause) > 0 && (
              <button
                className="btn btn-gold"
                style={{ width: "auto", marginBottom: 0 }}
                onClick={() => onPayClause(p)}
              >
                <i className="fas fa-gavel"></i> MULTA
              </button>
            )}
          </div>
        )}

        {/* BOTÃO DE INDICAÇÃO PARA TÉCNICOS */}
        {user &&
          user.type === "COACH" &&
          user.data.teamId !== "FREE" &&
          p.teamId !== user.data.teamId &&
          !p.preContract && (
            <div style={{ marginTop: 12 }}>
              <button
                className="btn btn-gold"
                style={{ width: "100%", marginBottom: 0 }}
                onClick={() => {
                  const obs = prompt(
                    "Motivo da indicação (Opcional):",
                    "Jogador ideal para o elenco!",
                  );
                  if (confirm(`Sugerir ${p.name} para o seu presidente?`)) {
                    onIndicate(p, obs);
                  }
                }}
              >
                💡 INDICAR AO CLUBE
              </button>
            </div>
          )}
      </div>
    );
  };

  // 3. Renderiza a Grade de Jogadores
  const renderPlayerList = () => {
    if (filteredPlayers.length === 0) {
      return (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: 30,
            fontStyle: "italic",
          }}
        >
          Nenhum jogador encontrado com esses filtros.
        </p>
      );
    }
    return (
      <div style={{ display: "grid", gap: 10 }}>
        <div
          style={{
            fontSize: 10,
            color: "#aaa",
            textAlign: "right",
            marginBottom: -5,
          }}
        >
          Exibindo {filteredPlayers.length} jogador(es)
        </div>
        {filteredPlayers.map((p) => renderPlayerCard(p))}
      </div>
    );
  };

  // =====================================================================
  // VIEWS DO MERCADO
  // =====================================================================

  if (view === "MENU") {
    const isFilterActive =
      searchName !== "" || searchPos !== "" || minOvr > 0 || maxOvr < 99;

    return (
      <div>
        <h3 style={{ display: "flex", alignItems: "center", gap: 10 }}>
          Mercado Global{" "}
          {open ? (
            <span style={{ color: "var(--primary)", fontSize: 12 }}>
              🟢 ABERTO
            </span>
          ) : (
            <span style={{ color: "var(--danger)", fontSize: 12 }}>
              🔴 FECHADO
            </span>
          )}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <div
            className="card"
            style={{
              textAlign: "center",
              cursor: "pointer",
              border:
                filt === "VENDA"
                  ? "2px solid var(--primary)"
                  : "1px solid #333",
              background:
                filt === "VENDA" ? "rgba(0,230,118,0.1)" : "var(--bg-card)",
            }}
            onClick={() => {
              setFilt("VENDA");
              setView("GLOBAL");
            }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: 20, marginBottom: 5, color: "var(--primary)" }}
            ></i>
            <br />
            <span style={{ fontSize: 10, fontWeight: "bold" }}>À VENDA</span>
          </div>
          <div
            className="card"
            style={{
              textAlign: "center",
              cursor: "pointer",
              border:
                filt === "EMPRESTIMO"
                  ? "2px solid var(--secondary)"
                  : "1px solid #333",
              background:
                filt === "EMPRESTIMO"
                  ? "rgba(41,121,255,0.1)"
                  : "var(--bg-card)",
            }}
            onClick={() => {
              setFilt("EMPRESTIMO");
              setView("GLOBAL");
            }}
          >
            <i
              className="fas fa-retweet"
              style={{
                fontSize: 20,
                marginBottom: 5,
                color: "var(--secondary)",
              }}
            ></i>
            <br />
            <span style={{ fontSize: 10, fontWeight: "bold" }}>EMPRÉST.</span>
          </div>
          <div
            className="card"
            style={{
              textAlign: "center",
              cursor: "pointer",
              border:
                filt === "FREE" ? "2px solid var(--warning)" : "1px solid #333",
              background:
                filt === "FREE" ? "rgba(255,196,0,0.1)" : "var(--bg-card)",
            }}
            onClick={() => {
              setFilt("FREE");
              setView("GLOBAL");
            }}
          >
            <i
              className="fas fa-user-check"
              style={{ fontSize: 20, marginBottom: 5, color: "var(--warning)" }}
            ></i>
            <br />
            <span style={{ fontSize: 10, fontWeight: "bold" }}>LIVRES</span>
          </div>
        </div>

        {/* BOTÃO PARA TÉCNICOS SÓ APARECE PARA CLUBES (USERS) */}
        {isPresident && (
          <div
            className="card"
            style={{
              textAlign: "center",
              cursor: "pointer",
              border: "2px solid gold",
              background: "rgba(255,215,0,0.1)",
              marginBottom: 15,
            }}
            onClick={() => {
              setView("COACHES");
            }}
          >
            <i
              className="fas fa-user-tie"
              style={{ fontSize: 20, marginBottom: 5, color: "gold" }}
            ></i>
            <br />
            <span style={{ fontSize: 10, fontWeight: "bold" }}>
              CONTRATAR COMISSÃO
            </span>
          </div>
        )}

        {/* --- FILTRO GLOBAL NO MENU --- */}
        {renderFilters("Busca Global Escouter")}

        {isFilterActive ? (
          <div className="animate-in">
            <h4 style={{ marginTop: 5, color: "var(--primary)" }}>
              Resultados da Busca
            </h4>
            {renderPlayerList()}
          </div>
        ) : (
          <div className="animate-in">
            <h4>Navegar por Séries</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {["A", "B", "C", "D"].map((s) => (
                <div
                  key={s}
                  className="card"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    borderLeft: `4px solid var(--secondary)`,
                  }}
                  onClick={() => {
                    setSerie(s);
                    setView("LIST");
                  }}
                >
                  <b>SÉRIE {s}</b>
                </div>
              ))}
              {/* BOTÃO ESPECÍFICO DA VÁRZEA */}
              <div
                className="card"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  borderLeft: `4px solid gold`,
                  gridColumn: "span 2",
                  background: "rgba(255, 215, 0, 0.05)",
                }}
                onClick={() => {
                  setSerie("VARZEA");
                  setView("LIST");
                }}
              >
                <b>TERRÃO (VÁRZEA)</b>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === "LIST")
    return (
      <div>
        <button
          className="btn btn-ghost"
          style={{ marginBottom: 15, width: "auto" }}
          onClick={() => setView("MENU")}
        >
          <i className="fas fa-chevron-left"></i> VOLTAR
        </button>
        <h3>
          {serie === "VARZEA" ? "Clubes da Várzea" : `Clubes da Série ${serie}`}
        </h3>
        {teams
          .filter((t) => t.serie === serie && t.status !== "PENDING")
          .map((t) => (
            <div
              key={t.id}
              className="card"
              onClick={() => {
                setSelT(t);
                setView("TEAM");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                cursor: "pointer",
              }}
            >
              {t.logo ? (
                <img
                  src={t.logo}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #444",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#333",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <i className="fas fa-shield-alt"></i>
                </div>
              )}
              <b style={{ fontSize: 16 }}>{t.name}</b>
              <i
                className="fas fa-chevron-right"
                style={{ marginLeft: "auto", color: "#555" }}
              ></i>
            </div>
          ))}
        {teams.filter((t) => t.serie === serie && t.status !== "PENDING")
          .length === 0 && (
          <p style={{ color: "#666", textAlign: "center" }}>
            Nenhum time nesta divisão.
          </p>
        )}
      </div>
    );

  // --- VIEW DA COMISSÃO TÉCNICA (TÉCNICOS, MÉDICOS, ETC) ---
  if (view === "COACHES") {
    const roleNames = {
      COACH: "Técnico",
      DOCTOR: "Médico",
      SCOUT: "Olheiro",
      ASSISTANT: "Auxiliar",
    };
    return (
      <div>
        <button
          className="btn btn-ghost"
          style={{ marginBottom: 15, width: "auto" }}
          onClick={() => setView("MENU")}
        >
          <i className="fas fa-chevron-left"></i> VOLTAR
        </button>
        <h3>Mercado da Comissão Técnica</h3>

        {availableCoaches.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Nenhum profissional disponível no momento.
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          {availableCoaches.map((c) => (
            <div
              key={c.id}
              className="card"
              style={{ borderLeft: "4px solid gold" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <b>
                  {c.type === "DOCTOR"
                    ? "🩺 Dr. "
                    : c.type === "ASSISTANT"
                      ? "📋 "
                      : c.type === "SCOUT"
                        ? "🕵️‍♂️ "
                        : "👔 "}
                  {c.name}
                </b>
                <span
                  style={{ color: "gold", fontWeight: "bold", fontSize: 11 }}
                >
                  ★ Nível {c.level}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#aaa", margin: "5px 0" }}>
                Cargo:{" "}
                <b style={{ color: "#fff" }}>
                  {roleNames[c.type] || "Técnico"}
                </b>
                {c.type === "COACH" &&
                  ` | Esp: ${c.affinities ? c.affinities[0] : "Geral"}`}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "var(--primary)",
                  marginBottom: 10,
                }}
              >
                Salário Pretendido: {fmt(c.salary)}/sem
              </div>

              {isPresident && (
                <button
                  className="btn btn-green"
                  onClick={() => onHireCoach(c)}
                >
                  NEGOCIAR CONTRATO DE{" "}
                  {roleNames[c.type]
                    ? roleNames[c.type].toUpperCase()
                    : "PROFISSIONAL"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW DE JOGADORES (GLOBAL ou TEAM) ---
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <button
          className="btn btn-ghost"
          style={{ width: "auto", margin: 0 }}
          onClick={() => {
            setSearchName("");
            setSearchPos("");
            setMinOvr(0);
            setMaxOvr(99); // Limpa ao voltar
            view === "GLOBAL" ? setView("MENU") : setView("LIST");
          }}
        >
          <i className="fas fa-chevron-left"></i> VOLTAR
        </button>
        <h3 style={{ margin: 0 }}>
          {view === "GLOBAL"
            ? filt === "FREE"
              ? "Mercado de Agentes Livres"
              : `Lista de ${filt}`
            : selT.name}
        </h3>
      </div>

      {renderFilters(view === "GLOBAL" ? "Filtrar Lista" : "Filtrar Elenco")}

      {renderPlayerList()}
    </div>
  );
};
