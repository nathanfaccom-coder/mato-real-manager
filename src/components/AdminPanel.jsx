import { promptMoney } from '../money/promptMoney.jsx';
import { MoneyInput } from '../money/MoneyInput.jsx';
import { BotRosterManager } from "../admin/BotRosterManager.jsx";
import { canAdmin, isMainAdmin } from "../admin/permissions.js";
import { SubAdminManager } from "../admin/SubAdminManager.jsx";
import {AccountBindingManager} from '../admin/AccountBindingManager.jsx';
import {PlayerApplicationManager} from '../admin/PlayerApplicationManager.jsx';
import {secureGameLogin} from '../services/game-auth.js';
import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { getProdCost } from "../game/getProdCost.js";
import { getSalaryLimits } from "../game/getSalaryLimits.js";
import { fmt } from "../game/fmt.js";
import { getPosColor } from "../game/getPosColor.js";
import { COMPANY_TYPES } from "../game/COMPANY_TYPES.js";

export const AdminPanel = ({
  setModal,
  onNationalTeams,
  onCompetitions,
  teams,
  players,
  onGenFixtures,
  onTurnSeasonAdvanced,
  papers,
  journalists,
  companies,
  coaches,
  reqs,
  sps,
  config,
  onAct,
  onPost,
  onApprove,
  onReject,
  onEditT,
  onApproveTeam,
  onUpdateBal,
  onDeleteTeam,
  onApprovePaper,
  onDeletePaper,
  onDeleteJourno,
  onRejectPaper,
  onConfig,
  onReset,
  onApproveComp,
  onDeleteComp,
  onUpdateCompBal,
  onGenAttrs,
  user,
  matches,
  tourns,
  handleDeleteMatch,
}) => {
  const permissionForTab = {
    TEAMS: "teams",
    FINANCE: "finance",
    PRESS: "press",
    COMP: "companies",
    COACH: "staff",
    CALENDAR: "calendar",
  };
  const allowedTab = (id) =>
    ["DASH", "SUBADM", "BINDINGS"].includes(id)
      ? isMainAdmin(user)
      : canAdmin(user, permissionForTab[id]);
  const [tab, setTab] = useState(() =>
    isMainAdmin(user)
      ? "DASH"
      : Object.keys(permissionForTab).find(allowedTab) || "NONE",
  );
  useEffect(() => {
    if (!allowedTab(tab))
      setTab(Object.keys(permissionForTab).find(allowedTab) || "NONE");
  }, [user, tab]);
  const [selTeamPlayers, setSelTeamPlayers] = useState(null);
  const [pixLogs, setPixLogs] = useState(null); // Estado para a Receita Federal

  const tabStyle = (active) => ({
    background: active ? "var(--primary)" : "#333",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  });

  const fedSpons = (sps || []).filter((s) => s.companyId === "FEDERACAO");

  const managePassword = async (collection, docId, currentPass, name) => {
    if(secureGameLogin)return alert('As senhas agora são gerenciadas pelo próprio titular, em Recuperar senha na tela de acesso. Use VÍNCULOS DE ACESSO para conferir ou bloquear o vínculo.');
    if (!isMainAdmin(user))
      return alert(
        "Somente o ADM principal pode alterar senhas de outras contas.",
      );
    const newPass = prompt(
      `🔐 GESTÃO DE SENHAS\nUsuário: ${name}\n\nSenha Atual: ${currentPass || "Vazia"}\n\nDigite a NOVA SENHA para alterar:`,
      currentPass,
    );
    if (newPass !== null && newPass !== currentPass) {
      try {
        await firebase
          .firestore()
          .collection(collection)
          .doc(docId)
          .update({ password: newPass });
        alert(`✅ Senha de ${name} alterada com sucesso!`);
      } catch (e) {
        alert("Erro: " + e.message);
      }
    }
  };

  const fixShopPrices = async () => {
    if (
      !confirm(
        "⚠️ MANUTENÇÃO DO SHOP:\n\n1. Resetar ESTOQUE de tudo para 10 unidades.\n2. Corrigir PREÇOS abaixo do custo (Anti-Cheat).\n\nDeseja aplicar essa atualização geral agora?",
      )
    )
      return;

    try {
      const db = firebase.firestore();
      const snap = await db.collection("products").get();
      const b = db.batch();
      let count = 0;

      snap.docs.forEach((doc) => {
        const p = doc.data();
        const minCost = getProdCost(p.cat, p.power);
        const correctedPrice = Math.max(parseFloat(p.price) || 0, minCost);
        b.update(doc.ref, {
          price: correctedPrice,
          stock: 10,
        });
        count++;
      });

      await b.commit();
      alert(
        `✅ SUCESSO!\n\n${count} produtos foram atualizados para 10 unidades de estoque e tiveram seus preços regularizados.`,
      );
    } catch (e) {
      alert("Erro na correção: " + e.message);
    }
  };

  const fixAllSalaries = async () => {
    if (
      !confirm(
        "⚠️ ATENÇÃO ADM:\n\nIsso vai verificar TODOS os jogadores do banco de dados.\n\n🔻 Quem ganha ACIMA do teto -> Salário desce para o máximo permitido.\n🔺 Quem ganha ABAIXO do piso -> Salário sobe para o mínimo permitido.\n\nDeseja aplicar essa correção geral agora?",
      )
    )
      return;

    try {
      const db = firebase.firestore();
      const snap = await db.collection("players").get();
      const b = db.batch();
      let count = 0;

      snap.docs.forEach((doc) => {
        const p = doc.data();
        const ovr = parseInt(p.overall) || 0;
        const currentSal = parseFloat(p.salary) || 0;
        const limits = getSalaryLimits(ovr);

        let newSal = currentSal;
        let changed = false;

        if (currentSal < limits.minSal) {
          newSal = limits.minSal;
          changed = true;
        } else if (currentSal > limits.maxSal) {
          newSal = limits.maxSal;
          changed = true;
        }

        if (changed) {
          b.update(doc.ref, { salary: newSal });
          count++;
        }
      });

      if (count > 0) {
        await b.commit();
        alert(
          `✅ OPERAÇÃO CONCLUÍDA!\n\n${count} contratos estavam irregulares e foram ajustados para a nova tabela.`,
        );
      } else {
        alert("👍 Tudo certo! Todos os salários já estão dentro das normas.");
      }
    } catch (e) {
      alert("Erro ao corrigir: " + e.message);
    }
  };

  const giveMassGrant = async () => {
    const target = prompt(
      "🎁 ABONO COLETIVO - QUEM VAI RECEBER?\n\n1: Jogadores (Todos)\n2: Jogadores (Apenas Contratados)\n3: Times\n4: Empresas\n5: Técnicos",
    );
    if (!target) return;

    const amountStr = await promptMoney("💰 QUAL O VALOR DO BÔNUS? (Ex: 10.000)");
    if (!amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return alert("Valor inválido");

    const reason = prompt(
      "📝 MOTIVO (Aparecerá no jornal):",
      "🎁 Bônus de Feriado",
    );

    let collectionName = "";
    let typeName = "";
    let filterFn = () => true;

    if (target === "1") {
      collectionName = "players";
      typeName = "Jogadores";
    } else if (target === "2") {
      collectionName = "players";
      typeName = "Jogadores Contratados";
      filterFn = (d) => d.teamId && d.teamId !== "FREE";
    } else if (target === "3") {
      collectionName = "teams";
      typeName = "Times";
    } else if (target === "4") {
      collectionName = "companies";
      typeName = "Empresas";
    } else if (target === "5") {
      collectionName = "users";
      typeName = "Técnicos";
    } else return alert("Opção inválida");

    if (
      !confirm(
        `CONFIRMA?\nDar ${fmt(amount)} para ${typeName.toUpperCase()}?\nMotivo: ${reason}`,
      )
    )
      return;

    try {
      const db = firebase.firestore();
      const b = db.batch();
      let q = db.collection(collectionName);

      if (target === "5") q = q.where("type", "==", "COACH");

      const snap = await q.get();
      let count = 0;

      snap.docs.forEach((doc) => {
        const d = doc.data();
        if (d.status === "PENDING" || d.status === "BLOCKED") return;
        if (!filterFn(d)) return;

        b.update(doc.ref, {
          balance: firebase.firestore.FieldValue.increment(amount),
        });
        count++;
      });

      db.collection("news").add({
        text: `🎉 **${reason.toUpperCase()}**\nA Federação concedeu um bônus de ${fmt(amount)} para os **${typeName}**!`,
        type: "money",
        date: Date.now(),
      });

      await b.commit();
      alert(`✅ Sucesso! Bônus enviado para ${count} ${typeName}.`);
    } catch (e) {
      alert("Erro: " + e.message);
    }
  };

  return (
    <div>
      <h2>Painel Administrativo</h2>
      <button
        className="btn btn-green"
        disabled={!canAdmin(user, "nationalTeams")}
        onClick={onNationalTeams}
      >
        🌍 SELEÇÕES — GERENCIAR TÉCNICOS
      </button>
      {isMainAdmin(user) && (
        <button className="btn btn-blue" onClick={() => setTab("SUBADM")}>
          GERENCIAR SUBADMS
        </button>
      )}
      <button
        className="btn"
        disabled={!canAdmin(user, "competitions")}
        onClick={onCompetitions}
      >
        CAMPEONATOS E PARTIDAS
      </button>
      {tab === "SUBADM" && isMainAdmin(user) && <SubAdminManager user={user} />}
      {secureGameLogin&&isMainAdmin(user)&&<button className="btn btn-blue" onClick={()=>setTab('BINDINGS')}>VÍNCULOS E INSCRIÇÕES</button>}
      {secureGameLogin&&tab==='BINDINGS'&&isMainAdmin(user)&&<><AccountBindingManager {...{user,teams,players,companies,papers,journalists,coaches}}/><PlayerApplicationManager user={user}/></>}
      {tab === "NONE" && (
        <p>
          Seu acesso não tem permissões de administração. Peça ao ADM principal
          para liberá-las.
        </p>
      )}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          overflowX: "auto",
          paddingBottom: 5,
        }}
      >
        <button
          style={tabStyle(tab === "DASH")}
          disabled={!allowedTab("DASH")}
          onClick={() => setTab("DASH")}
        >
          Geral
        </button>
        <button
          style={tabStyle(tab === "TEAMS")}
          disabled={!allowedTab("TEAMS")}
          onClick={() => setTab("TEAMS")}
        >
          Times / Elenco
        </button>
        <button
          style={tabStyle(tab === "FINANCE")}
          disabled={!allowedTab("FINANCE")}
          onClick={() => setTab("FINANCE")}
        >
          Finanças & Gala
        </button>
        <button
          style={tabStyle(tab === "PRESS")}
          disabled={!allowedTab("PRESS")}
          onClick={() => setTab("PRESS")}
        >
          Imprensa
        </button>
        <button
          style={tabStyle(tab === "COMP")}
          disabled={!allowedTab("COMP")}
          onClick={() => setTab("COMP")}
        >
          Empresas
        </button>
        <button
          style={tabStyle(tab === "COACH")}
          disabled={!allowedTab("COACH")}
          onClick={() => setTab("COACH")}
        >
          Comissão
        </button>
        <button
          style={tabStyle(tab === "CALENDAR")}
          disabled={!allowedTab("CALENDAR")}
          onClick={() => setTab("CALENDAR")}
        >
          📅 Calendário
        </button>
      </div>
      {/* ABA DE TÉCNICOS */}
      {tab === "COACH" && allowedTab("COACH") && (
        <div>
          <h3>Técnicos Pendentes</h3>
          {(coaches || []).filter((c) => c.status === "PENDING").length ===
            0 && <p style={{ color: "#666" }}>Nenhuma solicitação.</p>}
          {(coaches || [])
            .filter((c) => c.status === "PENDING")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <div
                key={c.id}
                className="card"
                style={{ borderLeft: "4px solid gold" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <b>{c.name}</b> (Nível {c.level})
                  </span>
                  <small>Esp: {c.affinities[0]}</small>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-red"
                    onClick={async () => {
                      if (confirm("Rejeitar solicitação?"))
                        await firebase
                          .firestore()
                          .collection("users")
                          .doc(c.id)
                          .delete();
                    }}
                  >
                    REJEITAR / EXCLUIR
                  </button>
                  <button
                    className="btn btn-green"
                    onClick={async () => {
                      await firebase
                        .firestore()
                        .collection("users")
                        .doc(c.id)
                        .update({ status: "ACTIVE" });
                    }}
                  >
                    APROVAR
                  </button>
                </div>
              </div>
            ))}

          <hr style={{ borderColor: "#333" }} />

          <h3>Técnicos Ativos</h3>
          {(coaches || [])
            .filter((c) => c.status === "ACTIVE")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <div
                key={c.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontWeight: "bold", color: "gold" }}>
                    {c.name}
                  </span>
                  <br />
                  <small style={{ color: "#ccc" }}>
                    {c.teamId === "FREE" ? (
                      <span style={{ color: "lime" }}>Livre</span>
                    ) : (
                      "Contratado"
                    )}{" "}
                    | Nível: {c.level} | $: {fmt(c.balance)}
                  </small>
                  <br />
                  <small style={{ fontSize: 9, color: "#888" }}>
                    Perks: {(c.perks || []).length} (Pend: {c.pendingPerks || 0}
                    )
                  </small>
                </div>

                <div style={{ display: "flex", gap: 5 }}>
                  {/* BOTÃO DE SENHA TÉCNICO (NOVO) */}
                  <button
                    className="btn btn-ghost"
                    style={{ width: "auto" }}
                    onClick={() =>
                      managePassword("users", c.id, c.password, c.name)
                    }
                  >
                    🔑
                  </button>

                  <button
                    className="btn btn-blue"
                    style={{ fontSize: 10, width: "auto", padding: "5px 8px" }}
                    onClick={async () => {
                      const n = prompt(
                        `Novo Nível para ${c.name} (Atual: ${c.level}):`,
                        c.level,
                      );
                      if (n) {
                        const newLevel = parseInt(n);
                        const currentPerksCount = (c.perks || []).length;
                        const idealPerksCount = Math.floor(newLevel / 5);
                        const newPending = Math.max(
                          0,
                          idealPerksCount - currentPerksCount,
                        );

                        await firebase
                          .firestore()
                          .collection("users")
                          .doc(c.id)
                          .update({
                            level: newLevel,
                            pendingPerks: newPending,
                          });
                        alert(
                          `Nível alterado para ${newLevel}. Perks pendentes ajustados para: ${newPending}`,
                        );
                      }
                    }}
                  >
                    LVL
                  </button>

                  <button
                    className="btn btn-green"
                    style={{ fontSize: 10, width: "auto", padding: "5px 8px" }}
                    onClick={async () => {
                      const n = await promptMoney("Novo Saldo:", c.balance, {allowNegative:true});
                      if (n)
                        await firebase
                          .firestore()
                          .collection("users")
                          .doc(c.id)
                          .update({ balance: parseFloat(n) });
                    }}
                  >
                    $
                  </button>

                  <button
                    className="btn btn-red"
                    style={{ fontSize: 10, width: "auto", padding: "5px 8px" }}
                    onClick={async () => {
                      if (
                        prompt("Digite DELETE para banir este técnico:") ===
                        "DELETE"
                      )
                        await firebase
                          .firestore()
                          .collection("users")
                          .doc(c.id)
                          .delete();
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {tab === "DASH" && allowedTab("DASH") && (
        <div>
          <div className="card" style={{ border: "1px solid var(--danger)" }}>
            <h4 style={{ marginTop: 0, color: "var(--danger)" }}>
              🎮 Controle do Jogo
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <button
                className={`btn ${config.marketOpen ? "btn-red" : "btn-green"}`}
                onClick={() => onAct("MARKET", !config.marketOpen)}
              >
                {config.marketOpen ? "FECHAR MERCADO" : "ABRIR MERCADO"}
              </button>
              <button
                className={`btn ${config.varzeaOpen === false ? "btn-green" : "btn-red"}`}
                onClick={() =>
                  onAct("VARZEA", config.varzeaOpen === false ? true : false)
                }
              >
                {config.varzeaOpen === false ? "ABRIR VÁRZEA" : "TRAVAR VÁRZEA"}
              </button>
              <button className="btn btn-purple" onClick={() => onAct("WEEK")}>
                VIRAR SEMANA
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <button
                className="btn"
                style={{ background: "#E65100", color: "white" }}
                onClick={fixShopPrices}
              >
                🛠️ CORRIGIR SHOP
              </button>
              <button
                className="btn"
                style={{ background: "#00E676", color: "black" }}
                onClick={giveMassGrant}
              >
                🎁 ABONO COLETIVO
              </button>
              <button
                className="btn"
                style={{
                  background: "#2979FF",
                  color: "white",
                  gridColumn: "span 2",
                  marginTop: 10,
                }}
                onClick={fixAllSalaries}
              >
                ⚖️ REGULARIZAR TODOS OS SALÁRIOS (LEI DO TETO)
              </button>
            </div>

            <button
              className="btn"
              style={{
                background: "#442200",
                color: "#ffaa00",
                border: "1px solid #ffaa00",
                marginTop: 10,
              }}
              onClick={async () => {
                if (
                  confirm(
                    "⚠️ ATENÇÃO: Isso vai apagar TODOS os itens de TODAS as mochilas e resetar a Fama de todos para 0. Isso limpa bugs de itens antigos. Continuar?",
                  )
                ) {
                  const senha = prompt(
                    "Digite CONFIRMAR para executar esta manutenção:",
                  );
                  if (isMainAdmin(user) && senha === "CONFIRMAR") {
                    try {
                      const db = firebase.firestore();
                      const b = db.batch();
                      const salesSnap = await db.collection("sales").get();
                      salesSnap.docs.forEach((doc) => b.delete(doc.ref));
                      const playersSnap = await db.collection("players").get();
                      playersSnap.docs.forEach((doc) => {
                        b.update(doc.ref, {
                          equippedItem: firebase.firestore.FieldValue.delete(),
                          fame: 0,
                        });
                      });
                      await b.commit();
                      alert(
                        "🧹 FAXINA CONCLUÍDA! Todas as mochilas foram esvaziadas e a fama resetada.",
                      );
                      window.location.reload();
                    } catch (e) {
                      alert("Erro na faxina: " + e.message);
                    }
                  }
                }
              }}
            >
              <i className="fas fa-broom"></i> LIMPAR TODAS AS MOCHILAS (FIX
              BUG)
            </button>

            <button
              className="btn"
              style={{ background: "#b71c1c", color: "white", marginTop: 10 }}
              onClick={async () => {
                if (
                  confirm(
                    "Deseja reduzir 1 jogo de recuperação de TODOS os jogadores lesionados? Use isso APÓS a realização de uma partida.",
                  )
                ) {
                  try {
                    const db = firebase.firestore();
                    const b = db.batch();
                    const snap = await db.collection("players").get();

                    let count = 0;
                    snap.docs.forEach((doc) => {
                      const p = doc.data();
                      const currentRecovery = parseInt(p.recoveryLeft) || 0;

                      if (currentRecovery > 0) {
                        const nextVal = currentRecovery - 1;

                        if (nextVal <= 0) {
                          b.update(doc.ref, {
                            recoveryLeft: 0,
                            injury: firebase.firestore.FieldValue.delete(),
                          });
                        } else {
                          b.update(doc.ref, { recoveryLeft: nextVal });
                        }
                        count++;
                      }
                    });

                    if (count > 0) {
                      await b.commit();
                      alert(
                        `✅ Sucesso! ${count} jogadores avançaram na recuperação.`,
                      );
                    } else {
                      alert("ℹ️ Nenhum jogador está lesionado no momento.");
                    }
                  } catch (e) {
                    console.error(e);
                    alert("Erro: " + e.message);
                  }
                }
              }}
            >
              <i className="fas fa-clock"></i> AVANÇAR 1 JOGO NA RECUPERAÇÃO
            </button>

            <button
              className="btn btn-red"
              style={{ marginTop: 10 }}
              onClick={() => onAct("SEASON")}
            >
              VIRAR TEMPORADA
            </button>
            <button
              className="btn btn-gold"
              onClick={() => {
                const t = prompt("Título");
                const b = prompt("Texto");
                if (t) onPost(t, b, "admin");
              }}
            >
              COMUNICADO
            </button>
            <button
              className="btn btn-blue"
              style={{ marginTop: 10 }}
              onClick={onGenFixtures}
            >
              🗓️ GERAR TABELA DE JOGOS
            </button>
            <button
              className="btn btn-gold"
              style={{ marginTop: 10 }}
              onClick={() => onAct("EDIT_PRIZES")}
            >
              ⚙️ CONFIGURAR PREMIAÇÕES DA TEMPORADA
            </button>
            <button
              className="btn btn-purple"
              style={{ marginTop: 10 }}
              onClick={onTurnSeasonAdvanced}
            >
              🏆 VIRAR TEMPORADA (AVANÇADO)
            </button>
            <button
              className="btn"
              style={{
                background: "#004D40",
                color: "cyan",
                border: "1px solid cyan",
                marginTop: 15,
                padding: 15,
                fontSize: 13,
              }}
              onClick={() => setModal({ type: "TOURN_MANAGER" })}
            >
              🗺️ CRIAR COPAS E CAMPEONATOS
            </button>
            <button
              className="btn"
              style={{
                background: "#333",
                border: "1px solid #666",
                marginTop: 10,
              }}
              onClick={onGenAttrs}
            >
              🎲 GERAR ATRIBUTOS (ALL)
            </button>

            <button
              className="btn"
              style={{
                background: "black",
                color: "red",
                border: "1px solid red",
                marginTop: 15,
              }}
              onClick={onReset}
            >
              <i className="fas fa-bomb"></i> RESETAR TODO O GAME
            </button>
          </div>
        </div>
      )}
      {/* --- ABA TIMES E JOGADORES --- */}
      {tab === "TEAMS" && allowedTab("TEAMS") && !selTeamPlayers && (
        <div>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <button
              className="btn btn-green"
              onClick={() => setModal({ type: "ADMIN_PLAYER", data: null })}
            >
              ✨ CRIAR NOVO JOGADOR (MANUAL)
            </button>
          </div>

          <BotRosterManager user={user} teams={teams} players={players} />

          {(players || []).some((p) => p.status === "PENDING") && (
            <h4>📝 Novatos Pendentes (Verificar)</h4>
          )}
          {(players || [])
            .filter((p) => p.status === "PENDING")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  borderLeft: "4px solid cyan",
                  background: "rgba(0, 255, 255, 0.05)",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <b>{p.name}</b>
                  <span
                    className="badge-pos"
                    style={{ background: getPosColor(p.position) }}
                  >
                    {p.position}
                  </span>
                </div>
                <div style={{ margin: "5px 0", fontSize: 11, color: "#aaa" }}>
                  <b>Time:</b>{" "}
                  {p.teamId && p.teamId !== "FREE" ? (
                    <span style={{ color: "cyan" }}>
                      {teams.find((t) => t.id === p.teamId)?.name || p.teamId}
                    </span>
                  ) : (
                    <span style={{ color: "gold" }}>Agente Livre</span>
                  )}
                </div>
                <div style={{ margin: "10px 0" }}>
                  <a
                    href={`https://instagram.com/${p.instagram?.replace("@", "")}`}
                    target="_blank"
                    style={{
                      color: "cyan",
                      textDecoration: "none",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <i
                      className="fab fa-instagram"
                      style={{ fontSize: 18 }}
                    ></i>{" "}
                    {p.instagram}
                  </a>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-green"
                    onClick={async () => {
                      // Se ele tem um time, aprova com o status que o time pediu. Se for livre, vai pra venda.
                      const finalStatus =
                        p.teamId && p.teamId !== "FREE"
                          ? p.requestedStatus || "NAO_A_VENDA"
                          : "VENDA";
                      await firebase
                        .firestore()
                        .collection("players")
                        .doc(p.id)
                        .update({
                          status: finalStatus,
                          requestedStatus:
                            firebase.firestore.FieldValue.delete(), // Limpa o rastro
                        });
                      alert(`${p.name} foi aprovado com sucesso!`);
                    }}
                  >
                    APROVAR
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={async () => {
                      if (confirm("Recusar e excluir inscrição?"))
                        await firebase
                          .firestore()
                          .collection("players")
                          .doc(p.id)
                          .delete();
                    }}
                  >
                    RECUSAR
                  </button>
                  <button
                    className="btn btn-blue"
                    style={{ width: "auto" }}
                    onClick={() => setModal({ type: "ADMIN_PLAYER", data: p })}
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}

          <hr style={{ borderColor: "#444", margin: "20px 0" }} />

          {(teams || [])
            .filter((t) => t.status === "PENDING")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((t) => (
              <div
                key={t.id}
                className="card"
                style={{ borderLeft: "4px solid var(--warning)" }}
              >
                <b>{t.name} (PENDENTE)</b>
                <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                  <MoneyInput allowNegative
                    className="input-field"
                    style={{ width: 100, marginBottom: 0 }}
                    defaultValue={t.balance}
                    id={`bal-${t.id}`}
                  />
                  <button
                    className="btn btn-green"
                    style={{ width: "auto" }}
                    onClick={() =>
                      onApproveTeam(
                        t.id,
                        document.getElementById(`bal-${t.id}`).value,
                      )
                    }
                  >
                    V
                  </button>
                  <button
                    className="btn btn-red"
                    style={{ width: "auto" }}
                    onClick={() => onDeleteTeam(t.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

          <h4>Clubes Ativos por Divisão</h4>
          {["A", "B", "C", "D", "VARZEA", "GUEST"].map((serie) => {
            const teamsInSerie = (teams || [])
              .filter((t) => t.status !== "PENDING" && t.serie === serie)
              .sort((a, b) => a.name.localeCompare(b.name));
            if (teamsInSerie.length === 0) return null;

            return (
              <details
                key={serie}
                style={{
                  marginBottom: 10,
                  background: "#1e293b",
                  borderRadius: 8,
                  border: "1px solid #334155",
                }}
              >
                <summary
                  style={{
                    padding: 15,
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "cyan",
                    outline: "none",
                  }}
                >
                  {serie === "VARZEA"
                    ? "🚜 O Terrão (Várzea)"
                    : serie === "GUEST"
                      ? "🌍 Convidados"
                      : `🏆 Série ${serie}`}{" "}
                  <span style={{ color: "#aaa", fontSize: 12 }}>
                    ({teamsInSerie.length} times)
                  </span>
                </summary>
                <div
                  style={{
                    padding: "0 10px 10px 10px",
                    display: "grid",
                    gap: 10,
                  }}
                >
                  {teamsInSerie.map((t) => (
                    <div
                      key={t.id}
                      className="card"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      <span>
                        <b>{t.name}</b>
                      </span>
                      <div style={{ display: "flex", gap: 5 }}>
                        <button
                          className="btn btn-ghost"
                          style={{ width: "auto", fontSize: 10 }}
                          onClick={() => onConfig(t)}
                        >
                          ⚙️ CONFIG
                        </button>
                        <button
                          className="btn btn-ghost"
                          style={{ width: "auto", fontSize: 10 }}
                          onClick={() =>
                            managePassword("teams", t.id, t.password, t.name)
                          }
                        >
                          🔑 SENHA
                        </button>
                        <button
                          className="btn btn-green"
                          style={{ width: "auto", fontSize: 10 }}
                          onClick={async () => {
                            const n = await promptMoney("Novo Saldo:", t.balance, {allowNegative:true});
                            if (n) onUpdateBal(t.id, parseFloat(n) || 0);
                          }}
                        >
                          $
                        </button>
                        <button
                          className="btn btn-purple"
                          style={{ width: "auto", fontSize: 10 }}
                          onClick={() => setSelTeamPlayers(t)}
                        >
                          👥 ELENCO
                        </button>
                        <button
                          className="btn btn-blue"
                          style={{ width: "auto", fontSize: 10 }}
                          onClick={() => onEditT(t)}
                        >
                          📝 EDITAR
                        </button>
                        <button
                          className="btn btn-red"
                          style={{ width: "auto", fontSize: 10 }}
                          onClick={() => onDeleteTeam(t.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}

          <hr style={{ borderColor: "#444", margin: "20px 0" }} />

          <h4>🏃‍♂️ Agentes Livres</h4>
          {(players || [])
            .filter((p) => p.teamId === "FREE" && p.status !== "PENDING")
            .map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <b>{p.name}</b>{" "}
                  <span
                    className="badge-pos"
                    style={{ background: getPosColor(p.position) }}
                  >
                    {p.position}
                  </span>
                  <br />
                  <small style={{ color: "#aaa" }}>
                    OVR: {p.overall} | XP: {p.xp || 0}
                  </small>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-blue"
                    style={{ width: "auto", fontSize: 10 }}
                    onClick={() => setModal({ type: "ADMIN_PLAYER", data: p })}
                  >
                    ✏️ EDITAR
                  </button>
                  <button
                    className="btn btn-red"
                    style={{ width: "auto", fontSize: 10 }}
                    onClick={async () => {
                      if (confirm("Excluir " + p.name + "?"))
                        await firebase
                          .firestore()
                          .collection("players")
                          .doc(p.id)
                          .delete();
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* SUB-ABA: ELENCO DO TIME ESPECÍFICO */}
      {tab === "TEAMS" && allowedTab("TEAMS") && selTeamPlayers && (
        <div className="animate-in">
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <button
              className="btn btn-ghost"
              style={{ width: "auto" }}
              onClick={() => setSelTeamPlayers(null)}
            >
              ⬅ VOLTAR
            </button>
            <button
              className="btn btn-blue"
              style={{ width: "auto" }}
              onClick={() => onEditT(selTeamPlayers)}
            >
              📝 IR PARA EDIÇÃO COMPLETA DO CLUBE
            </button>
          </div>

          <h4>Elenco: {selTeamPlayers.name}</h4>
          {(players || [])
            .filter((p) => p.teamId === selTeamPlayers.id)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: `4px solid ${getPosColor(p.position)}`,
                }}
              >
                <div>
                  <b>{p.name}</b>{" "}
                  <small>
                    ({p.position} - {p.overall})
                  </small>
                  <br />
                  <small style={{ color: "#aaa" }}>
                    XP: {p.xp || 0} | 🔑 {p.password}
                  </small>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button
                    className="btn btn-blue"
                    style={{ width: "auto", fontSize: 10 }}
                    onClick={() => setModal({ type: "ADMIN_PLAYER", data: p })}
                  >
                    ✏️ EDITAR
                  </button>
                  <button
                    className="btn btn-ghost"
                    style={{ width: "auto", fontSize: 10 }}
                    onClick={() =>
                      managePassword("players", p.id, p.password, p.name)
                    }
                  >
                    🔑 SENHA
                  </button>
                  <button
                    className="btn btn-red"
                    style={{ width: "auto", fontSize: 10 }}
                    onClick={async () => {
                      if (confirm("Excluir " + p.name + "?"))
                        await firebase
                          .firestore()
                          .collection("players")
                          .doc(p.id)
                          .delete();
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* ABA FINANÇAS E GALA */}
      {tab === "FINANCE" && allowedTab("FINANCE") && (
        <div>
          <button
            className="btn btn-gold"
            style={{ marginBottom: 20, padding: 15, fontSize: 14 }}
            onClick={() => setModal({ type: "AWARDS_MANAGER" })}
          >
            🏆 CENTRAL DE PREMIAÇÕES DE GALA (TROFÉUS E MEDALHAS)
          </button>

          {/* --- INÍCIO DO CÓDIGO DA RECEITA FEDERAL (PIX) --- */}
          <div
            className="card"
            style={{ border: "1px solid #00bcd4", marginBottom: 20 }}
          >
            <h4 style={{ marginTop: 0, color: "#00bcd4" }}>
              👁️ Olho de Deus (Receita Federal)
            </h4>
            <p style={{ fontSize: 11, color: "#aaa", marginBottom: 10 }}>
              Monitore todas as transferências PIX realizadas por Jogadores e
              Técnicos para evitar lavagem de dinheiro.
            </p>

            <button
              className="btn btn-blue"
              style={{ background: "#00bcd4", color: "#000" }}
              onClick={async () => {
                const snap = await firebase
                  .firestore()
                  .collection("pixLogs")
                  .orderBy("date", "desc")
                  .limit(50)
                  .get();
                setPixLogs(snap.docs.map((d) => d.data()));
              }}
            >
              GERAR EXTRATO DE TRANSAÇÕES
            </button>

            {pixLogs && (
              <div
                style={{
                  marginTop: 15,
                  maxHeight: "300px",
                  overflowY: "auto",
                  background: "#000",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <h5 style={{ color: "cyan", margin: 0 }}>Últimos 50 PIX</h5>
                  <button
                    className="btn btn-red"
                    style={{
                      width: "auto",
                      padding: "2px 8px",
                      margin: 0,
                      fontSize: 10,
                    }}
                    onClick={() => setPixLogs(null)}
                  >
                    FECHAR
                  </button>
                </div>
                {pixLogs.length === 0 && (
                  <p style={{ color: "#666", fontSize: 11 }}>
                    Nenhum PIX registrado ainda no servidor.
                  </p>
                )}

                {pixLogs.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 11,
                      borderBottom: "1px dashed #333",
                      padding: "8px 0",
                    }}
                  >
                    <div style={{ color: "#888", fontSize: 9 }}>
                      {new Date(l.date).toLocaleString()}
                    </div>
                    <div style={{ marginTop: 2 }}>
                      <b style={{ color: "var(--danger)" }}>{l.senderName}</b>
                      <i
                        className="fas fa-arrow-right"
                        style={{ margin: "0 5px", color: "#555" }}
                      ></i>
                      <b style={{ color: "lime" }}>{l.recipientName}</b>
                      <span
                        style={{
                          float: "right",
                          color: "gold",
                          fontWeight: "bold",
                        }}
                      >
                        {fmt(l.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* --- FIM DO CÓDIGO DA RECEITA FEDERAL --- */}

          <h4>Solicitações Financeiras</h4>
          {(reqs || []).filter((r) => r.status === "PENDING").length === 0 && (
            <p style={{ color: "#666" }}>Nenhum pedido pendente.</p>
          )}

          {(reqs || [])
            .filter((r) => r.status === "PENDING")
            .sort((a, b) => (a.teamName || "").localeCompare(b.teamName || ""))
            .map((r) => (
              <div
                key={r.id}
                className="card"
                style={{ borderLeft: "4px solid gold" }}
              >
                <b>{r.teamName}</b>: {fmt(r.amount)} <small>({r.type})</small>
                <br />
                <span style={{ fontSize: 11, color: "#ccc" }}>{r.details}</span>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    className="btn btn-green"
                    style={{ width: "auto", padding: "5px 15px" }}
                    onClick={() => onApprove(r)}
                  >
                    APROVAR
                  </button>
                  <button
                    className="btn btn-red"
                    style={{ width: "auto", padding: "5px 15px" }}
                    onClick={() => onReject(r.id)}
                  >
                    RECUSAR
                  </button>
                </div>
              </div>
            ))}

          <hr style={{ borderColor: "#333", margin: "20px 0" }} />

          <h4>🏛️ Patrocínios Ativos da Federação</h4>
          {fedSpons.length === 0 && (
            <p style={{ color: "#666" }}>
              Nenhum patrocínio governamental ativo.
            </p>
          )}

          {fedSpons
            .sort((a, b) => (a.teamName || "").localeCompare(b.teamName || ""))
            .map((s) => (
              <div
                key={s.id}
                className="card"
                style={{
                  borderLeft: "4px solid var(--primary)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <b>{s.teamName}</b>
                  <br />
                  <small style={{ color: "lime" }}>
                    + {fmt(s.value)} / semana
                  </small>
                </div>
                <button
                  className="btn btn-red"
                  style={{ width: "auto", fontSize: 10 }}
                  onClick={async () => {
                    if (confirm(`Cancelar o patrocínio do ${s.teamName}?`)) {
                      await firebase
                        .firestore()
                        .collection("sponsorships")
                        .doc(s.id)
                        .delete();
                      alert("Patrocínio cancelado!");
                    }
                  }}
                >
                  CANCELAR
                </button>
              </div>
            ))}
        </div>
      )}
      {/* --- ABA IMPRENSA (ATUALIZADA COM GESTÃO DE SENHAS) --- */}
      {tab === "PRESS" && allowedTab("PRESS") && (
        <div>
          {/* Jornais Pendentes */}
          {(papers || []).some((p) => p.status === "PENDING") && (
            <h4>Jornais Pendentes</h4>
          )}
          {(papers || [])
            .filter((p) => p.status === "PENDING")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((p) => (
              <div
                key={p.id}
                className="card"
                style={{ borderLeft: "4px solid cyan" }}
              >
                <b>📰 {p.name} (PENDENTE)</b>
                <br />
                <small>Dono: {p.ownerName}</small>
                <div style={{ marginTop: 5 }}>
                  <button
                    className="btn btn-green"
                    onClick={() => onApprovePaper(p.id)}
                  >
                    APROVAR
                  </button>
                  <button
                    className="btn btn-red"
                    style={{ marginLeft: 5 }}
                    onClick={() => onRejectPaper(p.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

          <h4>Imprensa Ativa e Acessos</h4>
          {(papers || [])
            .filter((p) => p.status === "ACTIVE")
            .map((p) => (
              <div key={p.id} style={{ marginBottom: 20 }}>
                {/* Cartão do Jornal (Dono) */}
                <div
                  className="card"
                  style={{
                    background: "#222",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <b>📰 {p.name} (DONO)</b>
                  <div style={{ display: "flex", gap: 5 }}>
                    {/* Botão Senha Jornal */}
                    <button
                      className="btn btn-ghost"
                      style={{ width: "auto" }}
                      onClick={() =>
                        managePassword("newspapers", p.id, p.password, p.name)
                      }
                    >
                      🔑 SENHA
                    </button>
                    <button
                      className="btn btn-red"
                      style={{ width: "auto" }}
                      onClick={() => onDeletePaper(p.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Lista de Jornalistas deste Jornal */}
                <div style={{ marginLeft: 20, marginTop: 5 }}>
                  {journalists
                    .filter((j) => j.newspaperId === p.id)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((j) => (
                      <div
                        key={j.id}
                        className="card"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 15px",
                          borderLeft: "2px solid cyan",
                        }}
                      >
                        <small>✒️ {j.name}</small>
                        <div style={{ display: "flex", gap: 5 }}>
                          {/* Botão Senha Jornalista */}
                          <button
                            className="btn btn-ghost"
                            style={{ width: "auto", padding: "2px 8px" }}
                            onClick={() =>
                              managePassword(
                                "journalists",
                                j.id,
                                j.password,
                                j.name,
                              )
                            }
                          >
                            🔑
                          </button>
                          <button
                            className="btn btn-red"
                            style={{ width: "auto", padding: "2px 8px" }}
                            onClick={() => onDeleteJourno(j.id)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* --- ABA EMPRESAS (ATUALIZADA COM GESTÃO DE SENHAS) --- */}
      {tab === "COMP" && allowedTab("COMP") && (
        <div>
          {/* Empresas Pendentes */}
          {(companies || []).some((c) => c.status === "PENDING") && (
            <h4>Empresas Pendentes</h4>
          )}
          {(companies || [])
            .filter((c) => c.status === "PENDING")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <div
                key={c.id}
                className="card"
                style={{ borderLeft: "4px solid var(--purple)" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <b style={{ fontSize: 14 }}>🏢 {c.name}</b>{" "}
                    <span style={{ fontSize: 10, color: "var(--warning)" }}>
                      (PENDENTE)
                    </span>
                    <br />
                    <small style={{ color: "#aaa" }}>Dono: {c.owner}</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: 10,
                        background: "var(--purple)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {(COMPANY_TYPES[c.companyType] || {}).label ||
                        c.companyType ||
                        "Comércio Local"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  <button
                    className="btn btn-green"
                    onClick={() => onApproveComp(c.id)}
                  >
                    APROVAR
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => onDeleteComp(c.id)}
                  >
                    RECUSAR
                  </button>
                </div>
              </div>
            ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <h4 style={{ margin: 0 }}>Empresas Ativas</h4>
            <button
              className="btn btn-blue"
              style={{ width: "auto", fontSize: 10, padding: "5px 10px" }}
              onClick={async () => {
                if (
                  confirm(
                    "Deseja forçar a reativação e sincronização de todas as empresas? Isso conserta bugs de empresas invisíveis no jogo.",
                  )
                ) {
                  try {
                    const db = firebase.firestore();
                    const b = db.batch();
                    let count = 0;
                    companies.forEach((c) => {
                      // Só reativa as que não estão pendentes
                      if (c.status !== "PENDING") {
                        b.update(db.collection("companies").doc(c.id), {
                          status: "ACTIVE",
                        });
                        count++;
                      }
                    });
                    await b.commit();
                    alert(
                      `✅ SUCESSO! ${count} empresas foram forçadas a aparecer. Peça aos jogadores para atualizarem a página.`,
                    );
                  } catch (e) {
                    alert("Erro: " + e.message);
                  }
                }
              }}
            >
              ♻️ RE-SINCRONIZAR EMPRESAS
            </button>
          </div>

          {(companies || [])
            .filter((c) => c.status !== "PENDING")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <div
                key={c.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <b>{c.name}</b>{" "}
                  {c.status === "BLOCKED" && (
                    <span style={{ color: "red" }}>(BLOQUEADA)</span>
                  )}
                  <br />
                  <small>Saldo: {fmt(c.balance)}</small>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {/* Botão Senha Empresa */}
                  <button
                    className="btn btn-ghost"
                    style={{ width: "auto" }}
                    onClick={() =>
                      managePassword("companies", c.id, c.password, c.name)
                    }
                  >
                    🔑 SENHA
                  </button>

                  <button
                    className="btn btn-green"
                    style={{ width: "auto" }}
                    onClick={async () => {
                      const n = await promptMoney("Novo Saldo da Empresa:", c.balance, {allowNegative:true});
                      if (n !== null) onUpdateCompBal(c.id, parseFloat(n) || 0);
                    }}
                  >
                    $
                  </button>

                  <button
                    className="btn btn-red"
                    style={{ width: "auto" }}
                    onClick={() => onDeleteComp(c.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* --- ABA CALENDÁRIO (ADMIN) --- */}
      {tab === "CALENDAR" && allowedTab("CALENDAR") && (
        <div className="animate-in">
          <div
            className="card"
            style={{ borderLeft: "4px solid var(--primary)" }}
          >
            <h3 style={{ color: "var(--primary)", marginTop: 0 }}>
              Máquina do Tempo
            </h3>
            <p style={{ fontSize: 11, color: "#aaa" }}>
              Altere a data atual do jogo. O calendário real fará o cálculo
              automático de dias e meses.
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                background: "rgba(0,0,0,0.3)",
                padding: 15,
                borderRadius: 8,
              }}
            >
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 10, color: "#888" }}>
                  Data Atual do Servidor
                </label>
                <input
                  className="input-field"
                  type="date"
                  value={config.calendar?.date || ""}
                  onChange={async (e) => {
                    if (confirm("Deseja forçar a mudança de data?")) {
                      await firebase
                        .firestore()
                        .collection("config")
                        .doc("calendar")
                        .set({ date: e.target.value }, { merge: true });
                    }
                  }}
                  style={{
                    marginBottom: 0,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
              </div>
              <button
                className="btn btn-green"
                style={{ width: "auto", height: "50px", padding: "0 20px" }}
                onClick={async () => {
                  const current = new Date(
                    (config.calendar?.date ||
                      new Date().toISOString().split("T")[0]) + "T12:00:00",
                  );
                  current.setDate(current.getDate() + 1);
                  const newDate = current.toISOString().split("T")[0];
                  await firebase
                    .firestore()
                    .collection("config")
                    .doc("calendar")
                    .set({ date: newDate }, { merge: true });
                }}
              >
                ⏩ AVANÇAR +1 DIA
              </button>
            </div>
          </div>

          <div
            className="card"
            style={{ marginTop: 15, borderLeft: "4px solid gold" }}
          >
            <h4 style={{ marginTop: 0, color: "gold" }}>Agendar Eventos</h4>
            <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
              <input
                className="input-field"
                type="date"
                id="evDate"
                style={{ flex: 1, marginBottom: 0 }}
              />
              <input
                className="input-field"
                type="text"
                id="evText"
                placeholder="Ex: Abertura da Janela"
                style={{ flex: 2, marginBottom: 0 }}
              />
              <button
                className="btn btn-gold"
                style={{ width: "auto" }}
                onClick={async () => {
                  const d = document.getElementById("evDate").value;
                  const t = document.getElementById("evText").value;
                  if (!d || !t) return alert("Preencha data e texto!");
                  const evs = [
                    ...(config.calendar?.events || []),
                    { id: Date.now(), date: d, text: t },
                  ];
                  await firebase
                    .firestore()
                    .collection("config")
                    .doc("calendar")
                    .set({ events: evs }, { merge: true });
                  document.getElementById("evText").value = "";
                  alert("Evento agendado!");
                }}
              >
                +
              </button>
            </div>

            <div
              style={{
                background: "#111",
                padding: 10,
                borderRadius: 5,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {[...(config.calendar?.events || [])]
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      borderBottom: "1px dashed #333",
                      padding: "5px 0",
                    }}
                  >
                    <span>
                      <b style={{ color: "cyan" }}>
                        {ev.date.split("-").reverse().join("/")}
                      </b>{" "}
                      - {ev.text}
                    </span>
                    <i
                      className="fas fa-trash"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={async () => {
                        if (confirm("Apagar evento?")) {
                          const evs = config.calendar.events.filter(
                            (x) => x.id !== ev.id,
                          );
                          await firebase
                            .firestore()
                            .collection("config")
                            .doc("calendar")
                            .set({ events: evs }, { merge: true });
                        }
                      }}
                    ></i>
                  </div>
                ))}
              {(config.calendar?.events || []).length === 0 && (
                <small style={{ color: "#666" }}>Nenhum evento.</small>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
