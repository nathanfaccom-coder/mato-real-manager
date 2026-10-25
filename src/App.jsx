import {
  canAdmin,
  isMainAdmin,
  isSubAdmin,
  allowAdminModal,
} from "./admin/permissions.js";
import { adminAuth, observeAdmin } from "./admin/auth.js";
import { createGameActions } from "./actions/index.js";

import { useCollection } from "./hooks/useCollection.js";
import { subscriptionPlan } from "./services/subscriptions.js";
import {
  readSession,
  saveSession,
  clearSession,
  readPreference,
  savePreference,
  ACCOUNT_COLLECTION,
  homeScreen,
  restoreScreen,
  readNavigation,
  saveNavigation,
} from "./services/session.js";
import React, { useState, useEffect } from "react";
import { firebase, db } from "./services/firebase.js";
import { fmt } from "./game/fmt.js";
import { generateAttributes } from "./game/generateAttributes.js";

import { STADIUM_DB } from "./game/STADIUM_DB.js";
import { COMPANY_TYPES } from "./game/COMPANY_TYPES.js";
import { ESTADOS } from "./game/ESTADOS.js";

import { LoginScreen } from "./components/LoginScreen.jsx";
import { GameCalendar } from "./components/GameCalendar.jsx";
const Broadcast = React.lazy(() =>
  import("./simulation/Broadcast.jsx").then((m) => ({ default: m.Broadcast })),
);
const NationalTeams = React.lazy(() =>
  import("./national/NationalTeams.jsx").then((module) => ({
    default: module.NationalTeams,
  })),
);
const AdminPanel = React.lazy(() =>
  import("./components/AdminPanel.jsx").then((module) => ({
    default: module.AdminPanel,
  })),
);
const TeamDashboard = React.lazy(() =>
  import("./components/TeamDashboard.jsx").then((module) => ({
    default: module.TeamDashboard,
  })),
);
const AssistantDashboard = React.lazy(() =>
  import("./components/AssistantDashboard.jsx").then((module) => ({
    default: module.AssistantDashboard,
  })),
);
const VisitorDashboard = React.lazy(() =>
  import("./components/VisitorDashboard.jsx").then((module) => ({
    default: module.VisitorDashboard,
  })),
);
const LeagueTable = React.lazy(() =>
  import("./components/LeagueTable.jsx").then((module) => ({
    default: module.LeagueTable,
  })),
);
const MatchCenter = React.lazy(() =>
  import("./components/MatchCenter.jsx").then((module) => ({
    default: module.MatchCenter,
  })),
);
const TournamentHub = React.lazy(() =>
  import("./components/TournamentHub.jsx").then((module) => ({
    default: module.TournamentHub,
  })),
);
const Market = React.lazy(() =>
  import("./components/Market.jsx").then((module) => ({
    default: module.Market,
  })),
);
const ShoppingScreen = React.lazy(() =>
  import("./components/ShoppingScreen.jsx").then((module) => ({
    default: module.ShoppingScreen,
  })),
);
const Ranking = React.lazy(() =>
  import("./components/Ranking.jsx").then((module) => ({
    default: module.Ranking,
  })),
);
const SocialHub = React.lazy(() =>
  import("./components/SocialHub.jsx").then((module) => ({
    default: module.SocialHub,
  })),
);
const OffersScreen = React.lazy(() =>
  import("./components/OffersScreen.jsx").then((module) => ({
    default: module.OffersScreen,
  })),
);
const PublicServices = React.lazy(() =>
  import("./components/PublicServices.jsx").then((module) => ({
    default: module.PublicServices,
  })),
);
const CompanyDashboard = React.lazy(() =>
  import("./components/CompanyDashboard.jsx").then((module) => ({
    default: module.CompanyDashboard,
  })),
);
const PlayerDashboard = React.lazy(() =>
  import("./components/PlayerDashboard.jsx").then((module) => ({
    default: module.PlayerDashboard,
  })),
);
const CoachDashboard = React.lazy(() =>
  import("./components/CoachDashboard.jsx").then((module) => ({
    default: module.CoachDashboard,
  })),
);
const DoctorDashboard = React.lazy(() =>
  import("./components/DoctorDashboard.jsx").then((module) => ({
    default: module.DoctorDashboard,
  })),
);
const ScoutDashboard = React.lazy(() =>
  import("./components/ScoutDashboard.jsx").then((module) => ({
    default: module.ScoutDashboard,
  })),
);
const PlayerForm = React.lazy(() =>
  import("./components/PlayerForm.jsx").then((module) => ({
    default: module.PlayerForm,
  })),
);
const TeamRequestPlayerModal = React.lazy(() =>
  import("./components/TeamRequestPlayerModal.jsx").then((module) => ({
    default: module.TeamRequestPlayerModal,
  })),
);
const AdminPlayerModal = React.lazy(() =>
  import("./components/AdminPlayerModal.jsx").then((module) => ({
    default: module.AdminPlayerModal,
  })),
);
const TrainingCenterManager = React.lazy(() =>
  import("./components/TrainingCenterManager.jsx").then((module) => ({
    default: module.TrainingCenterManager,
  })),
);
const OfferForm = React.lazy(() =>
  import("./components/OfferForm.jsx").then((module) => ({
    default: module.OfferForm,
  })),
);
const SettingsForm = React.lazy(() =>
  import("./components/SettingsForm.jsx").then((module) => ({
    default: module.SettingsForm,
  })),
);
const MatchPerformanceForm = React.lazy(() =>
  import("./components/MatchPerformanceForm.jsx").then((module) => ({
    default: module.MatchPerformanceForm,
  })),
);
const TeamStandingsEditor = React.lazy(() =>
  import("./components/TeamStandingsEditor.jsx").then((module) => ({
    default: module.TeamStandingsEditor,
  })),
);
const PrizeEditor = React.lazy(() =>
  import("./components/PrizeEditor.jsx").then((module) => ({
    default: module.PrizeEditor,
  })),
);
const AwardsManager = React.lazy(() =>
  import("./components/AwardsManager.jsx").then((module) => ({
    default: module.AwardsManager,
  })),
);
const TournamentManagerModal = React.lazy(() =>
  import("./components/TournamentManagerModal.jsx").then((module) => ({
    default: module.TournamentManagerModal,
  })),
);
const StatsEditor = React.lazy(() =>
  import("./components/StatsEditor.jsx").then((module) => ({
    default: module.StatsEditor,
  })),
);
const MatchManagerForm = React.lazy(() =>
  import("./components/MatchManagerForm.jsx").then((module) => ({
    default: module.MatchManagerForm,
  })),
);
import { FORMATIONS } from "./game/FORMATIONS.js";
import { FORMATION_COORDINATES } from "./game/FORMATION_COORDINATES.js";
import { getPosColor } from "./game/getPosColor.js";

export function App() {
  const [user, setUser] = useState(null);
  const [restoring, setRestoring] = useState(true);
  const [restoreError, setRestoreError] = useState(false);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [news, setNews] = useState([]);
  const [reqs, setReqs] = useState([]);
  const [conf, setConf] = useState({ marketOpen: true });
  const [calendar, setCalendar] = useState({
    date: new Date().toISOString().split("T")[0],
    events: [],
  });
  const [papers, setPapers] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [sps, setSps] = useState([]);
  const [awards, setAwards] = useState([]);
  const [tourns, setTourns] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [hallOfFame, setHallOfFame] = useState([]);
  const [matches, setMatches] = useState([]);
  const [posts, setPosts] = useState([]);
  const [screen, setScreen] = useState("HOME");
  const [matchesTab, setMatchesTab] = useState("LIGAS");
  const [modal, setModalState] = useState(null);
  const setModal = (value) => {
    if (!allowAdminModal(user, value)) {
      alert("Você não tem permissão para esta função.");
      return;
    }
    setModalState(value);
  };
  const [loading, setLoading] = useState(false);
  const [newNews, setNewNews] = useState(false);
  const [adminTeam, setAdminTeam] = useState(null);
  const [sales, setSales] = useState([]);
  const [salesLoaded, setSalesLoaded] = useState(null);

  useEffect(() => {
    if (!isSubAdmin(user)) return;
    return observeAdmin(
      user,
      (updated) => {
        setUser(updated);
        setModalState(null);
      },
      () => {
        clearSession();
        setUser(null);
        setModalState(null);
        adminAuth.signOut();
      },
    );
  }, [user?.type, user?.data?.id]);

  // --- NOVO: PERSISTÊNCIA DE SESSÃO (LEMBRAR ONDE PAREI) ---

  // 1. Ao abrir o app, tenta recuperar o login e a tela salva
  useEffect(() => {
    let active = true;
    const session = readSession();
    if (session) {
      db.collection(ACCOUNT_COLLECTION[session.type])
        .doc(session.data.id)
        .get()
        .then((doc) => {
          if (!active) return;
          if (
            !doc.exists ||
            ["BLOCKED", "PENDING"].includes(doc.data().status)
          ) {
            clearSession();
            return;
          }
          const restored = {
            type: session.type,
            data: { ...doc.data(), id: doc.id },
          };
          setUser(restored);
          saveSession(restored);
          setScreen(
            restoreScreen(
              restored.type,
              readNavigation(restored, "screen", readPreference("savedScreen")),
            ),
          );
          const tab = readNavigation(restored, "matchesTab", "LIGAS");
          setMatchesTab(
            ["LIGAS", "ESTADUAIS", "COPAS"].includes(tab) ? tab : "LIGAS",
          );
        })
        .catch((error) => {
          console.error("Não foi possível restaurar a sessão:", error.code);
          if (active) setRestoreError(true);
        })
        .finally(() => {
          if (active) setRestoring(false);
        });
    } else setRestoring(false);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (screen && user) {
      savePreference("savedScreen", screen);
      saveNavigation(user, "screen", screen);
    }
  }, [screen, user?.data?.id, user?.type]);

  useEffect(() => {
    if (user) saveNavigation(user, "matchesTab", matchesTab);
  }, [matchesTab, user?.data?.id, user?.type]);

  const plan = subscriptionPlan(user?.type, screen, modal?.type);
  // Login still needs these public directories while legacy credentials are in use.
  useCollection("teams", setTeams);
  useCollection("players", setPlayers);
  useCollection("newspapers", setPapers);
  useCollection("journalists", setJournalists);
  useCollection("companies", setCompanies);
  useCollection("users", setCoaches, true, null, null, true);
  useCollection("financeRequests", setReqs, plan.financeRequests);
  useCollection("products", setProducts, plan.products);
  useCollection("sponsorships", setSps, plan.sponsorships);
  useCollection("awards", setAwards, plan.awards);
  useCollection("tournaments", setTourns, plan.tournaments);
  useCollection("hallOfFame", setHallOfFame, plan.hallOfFame, "season");
  useCollection("matches", setMatches, plan.matches);
  useCollection("posts", setPosts, plan.posts, "date", 50);
  useCollection("news", setNews, plan.news, "date", 50);
  useEffect(
    () =>
      db
        .collection("config")
        .doc("system")
        .onSnapshot(
          (snap) => setConf(snap.exists ? snap.data() : { marketOpen: true }),
          (error) => console.error("Configuração indisponível:", error.code),
        ),
    [],
  );
  useEffect(() => {
    if (!plan.calendar) return;
    return db
      .collection("config")
      .doc("calendar")
      .onSnapshot(
        (snap) => {
          if (snap.exists) setCalendar(snap.data());
        },
        (error) => console.error("Calendário indisponível:", error.code),
      );
  }, [plan.calendar]);
  useEffect(() => {
    const lastRead = Number(readPreference("lastRead") || 0);
    if (news.length && news[0].date > lastRead) setNewNews(true);
  }, [news]);
  // --- LISTENER DE OFERTAS (Para Times, Jogadores e Técnicos) ---
  useEffect(() => {
    if (!user || user.type === "ADMIN" || user.type === "VISITOR") {
      setOffers([]);
      return;
    }

    // Escuta todas as ofertas onde o destinatário sou EU (pelo ID)
    // Isso cobre JOGADORES e TÉCNICOS que estão recebendo propostas.
    // E também cobre TIMES se o recipientId for o ID do time (em negociações futuras)
    const unsub = db
      .collection("offers")
      .where("recipientId", "==", user.data.id)
      .onSnapshot(
        (snap) => {
          const myOffers = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
          setOffers(myOffers);
        },
        (error) => {
          console.log("Erro ao buscar ofertas:", error);
        },
      );

    return () => unsub();
  }, [user?.data?.id, user?.type]);

  // ==========================================================
  // ==========================================================
  // NOVO: SISTEMA DE MOCHILA INTELIGENTE (ECONOMIZA FIREBASE)
  // ==========================================================
  useEffect(() => {
    if (!user || !user.data || user.type === "VISITOR") {
      setSales([]);
      return;
    }

    setSalesLoaded(null);
    let query = db.collection("sales");

    if (user.type === "COMPANY") {
      // Removido o orderBy do Firebase para não exigir Índice Composto (evita o bug de sumir tudo)
      query = query.where("companyId", "==", user.data.id);
    } else if (
      ["PLAYER", "COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(user.type)
    ) {
      // Removido o orderBy do Firebase para não exigir Índice Composto
      query = query.where("buyerId", "==", user.data.id);
    } else {
      // Presidentes, Imprensa e Admin carregam o histórico geral recente para poderem inspecionar jogadores
      query = query.orderBy("date", "desc").limit(300);
    }

    const unsubSales = query.onSnapshot(
      { includeMetadataChanges: true },
      (snap) => {
        // A MÁGICA AQUI: Fazemos a ordenação do mais novo para o mais velho usando o próprio JavaScript!
        // Assim driblamos a limitação do Firebase e a mochila volta a carregar.
        const myItems = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => b.date - a.date);
        setSales(myItems);
        setSalesLoaded(snap.metadata.fromCache ? null : user.data.id);
      },
      (error) => {
        console.error("Erro ao carregar mochila:", error);
      },
    );

    // Limpa a busca ao sair da tela/deslogar
    return () => unsubSales();
  }, [user?.data?.id, user?.type]);

  // --- NOVO: SINCRONIZADOR DE FAMA (CORREÇÃO AUTOMÁTICA) ---
  // Isso garante que a Fama seja SEMPRE a soma dos itens na mochila.
  // Se o jogador tiver 2 bonés (200), e estiver mostrando 300, isso corrige para 200 na hora.
  useEffect(() => {
    if (
      !user ||
      user.type !== "PLAYER" ||
      !sales ||
      salesLoaded !== user.data.id
    )
      return;

    // 1. Pega apenas os itens deste jogador
    const myInventory = sales.filter((s) => s.buyerId === user.data.id);

    // 2. Calcula quanto de Fama esses itens valem somados
    const realFame = myInventory.reduce((total, item) => {
      // Verifica se é um item que dá fama (Luxo, Veículo, etc)
      if (["VEICULO", "IMOVEL", "TECNOLOGIA", "LUXO"].includes(item.cat)) {
        // Garante que estamos somando apenas NÚMEROS para evitar erro de [object Object]
        const gained = parseInt(item.fameGained) || 0;
        return total + gained;
      }
      return total;
    }, 0);

    // 3. Se o valor no perfil estiver errado, corrige no Banco de Dados
    if (typeof realFame === "number" && (user.data.fame || 0) !== realFame) {
      console.log(`Corrigindo Fama: De ${user.data.fame} para ${realFame}`);

      // Atualiza no Firebase
      db.collection("players")
        .doc(user.data.id)
        .update({ fame: realFame })
        .catch((err) => console.error("Erro ao sincronizar fama:", err));

      // Atualiza na tela do usuário imediatamente
      setUser((prev) => ({
        ...prev,
        data: { ...prev.data, fame: realFame },
      }));
    }
  }, [sales, salesLoaded, user?.data?.id]); // Roda sempre que houver uma venda ou compra nova

  useEffect(() => {
    // Sincronização de dados do usuário logado
    if (user?.type === "USER" || user?.type === "PLAYER") {
      const me =
        user.type === "USER"
          ? teams.find((t) => t.id === user.data.id)
          : players.find((p) => p.id === user.data.id);

      if (me && me !== user.data) setUser((prev) => ({ ...prev, data: me }));
    }

    // Sincronização para toda a Comissão Técnica (Técnico, Médico, etc)
    if (["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(user?.type)) {
      const me = coaches.find((c) => c.id === user.data.id);
      if (me && me !== user.data) setUser((prev) => ({ ...prev, data: me }));
    }

    if (user?.type === "COMPANY") {
      const me = companies.find((c) => c.id === user.data.id);
      if (me) {
        if (me.status === "BLOCKED") {
          alert("🚫 Sua empresa foi bloqueada ou faliu.");
          window.location.reload();
        } else {
          if (me !== user.data) setUser((prev) => ({ ...prev, data: me }));
        }
      }
    }
  }, [teams, players, companies, coaches, user?.data?.id, user?.type]);

  const buyingRef = React.useRef(false);
  const [chatMessages, setChatMessages] = useState([]);

  const {
    postNews,
    handleHospitalDonation,
    login,
    handleSaveMatch,
    handleDeleteMatch,
    handleFinanceApprove,
    loginAdmin,
    createTeam,
    createPlayerAccount,
    createStaff,
    createNewspaper,
    createJournalist,
    handleFireCoach,
    handleCoachSelfActions,
    handleSendCoachOffer,
    handleCounterCoachOffer,
    handleFinalizeCoachContract,
    adminAction,
    generateFixtures,
    handleSeasonTurnAdvanced,
    createCompany,
    saveProduct,
    requestSponsorship,
    processSponsorship,
    buyProduct,
    handleCoachIndication,
    saveTactics,
    handleCoachUseItem,
    handleUseItem,
    resetDatabase,
    approveTeam,
    deleteTeam,
    deletePaper,
    deleteJournalist,
    updateBalance,
    withdrawMoney,
    savePlayer,
    handleAcceptCoachOffer,
    handleRejectCoachOffer,
    handleUpdateCoachSalary,
    handleAssistantRegen,
    handleCoachTrain,
    handleEvolveCoachPerk,
    sendOffer,
    acceptOffer,
    rejectOffer,
    renewContract,
    handleSocialPost,
    handleSocialLike,
    handleSocialDelete,
    updateTeamStats,
    saveMatchStats,
    handlePlayerSoloTrain,
    handlePlayerActions,
    subscribeToChat,
    sendChatMessage,
    toggleFollow,
  } = createGameActions({
    setLoading,
    teams,
    players,
    companies,
    coaches,
    papers,
    journalists,
    setUser,
    setScreen,
    setModal,
    conf,
    sps,
    user,
    products,
    buyingRef,
    setSales,
    posts,
    setChatMessages,
  });
  // --- RENDER ---
  if (restoreError)
    return (
      <div className="container" role="alert">
        <p>
          Não foi possível recuperar sua sessão. Verifique a conexão e tente
          novamente.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          TENTAR NOVAMENTE
        </button>
        <button
          className="btn"
          onClick={() => {
            clearSession();
            setRestoreError(false);
          }}
        >
          VOLTAR AO LOGIN
        </button>
      </div>
    );
  if (loading || restoring)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        Carregando...
      </div>
    );
  if (!user)
    return (
      <LoginScreen
        teams={teams}
        players={players}
        papers={papers}
        journalists={journalists}
        companies={companies}
        coaches={coaches}
        onLogin={login}
        onCreateTeam={createTeam}
        onCreatePaper={createNewspaper}
        onCreateJourno={createJournalist}
        onCreateCompany={createCompany}
        onAdmin={loginAdmin}
        onVisitor={() => {
          setUser({
            type: "VISITOR",
            data: { id: "visitor", name: "Visitante" },
          });
          setScreen("RANKING");
        }}
        onCreateCoach={createStaff}
        onCreatePlayer={createPlayerAccount}
        config={conf}
      />
    );
  return (
    <div>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user.type === "USER" && user.data.logo && (
            <img
              src={user.data.logo}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "2px solid var(--primary)",
                objectFit: "cover",
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: "900", fontSize: 16 }}>
              {user.type === "USER"
                ? user.data.name
                : user.data?.name || user.type}
            </div>
            <div
              className="dev-credits"
              style={{ textAlign: "left", margin: 0 }}
            >
              Desenvolvido por: Nathan Reis | v2.9.8
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
          {/* ÍCONE DE NOTIFICAÇÃO (SINO) */}
          {["USER", "PLAYER", "COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(
            user.type,
          ) && (
            <div
              onClick={() => setScreen("OFFERS")}
              style={{
                position: "relative",
                cursor: "pointer",
                padding: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i
                className="fas fa-bell"
                style={{
                  fontSize: "20px",
                  color: (offers || []).some(
                    (o) =>
                      o.recipientId === user.data.id &&
                      (o.status === "PENDING" || o.status === "COUNTERED"),
                  )
                    ? "var(--warning)"
                    : "#666",
                  transition: "0.3s",
                }}
              ></i>
              {(offers || []).some(
                (o) =>
                  o.recipientId === user.data.id &&
                  (o.status === "PENDING" || o.status === "COUNTERED"),
              ) && (
                <span
                  className="pulse"
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "red",
                    borderRadius: "50%",
                    width: "10px",
                    height: "10px",
                    border: "2px solid var(--bg-card)",
                  }}
                ></span>
              )}
            </div>
          )}

          {/* SALDO EM DINHEIRO */}
          {[
            "USER",
            "COMPANY",
            "PLAYER",
            "COACH",
            "DOCTOR",
            "SCOUT",
            "ASSISTANT",
          ].includes(user.type) && (
            <div
              style={{
                color: "var(--primary)",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              {fmt(user.data.balance)}
            </div>
          )}

          {/* CONFIGURAÇÕES */}
          {user.type === "USER" && (
            <i
              className="fas fa-cog"
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={() => setModal({ type: "SETTINGS", data: user.data })}
            ></i>
          )}

          {/* BOTÃO DE SAIR */}
          <i
            className="fas fa-sign-out-alt"
            style={{ cursor: "pointer", marginLeft: 10 }}
            onClick={() => {
              if (confirm("Deseja realmente sair e trocar de conta?")) {
                clearSession();
                adminAuth.signOut().finally(() => window.location.reload());
              }
            }}
          ></i>
        </div>
      </div>

      <div className="container">
        {!["BROADCAST", "WATCH_GAMES"].includes(screen) && (
          <button
            className="btn btn-green pixel-feature"
            onClick={() => setScreen("BROADCAST")}
          >
            📺 MATO REAL TV — AMISTOSOS
          </button>
        )}
        {["BROADCAST", "WATCH_GAMES"].includes(screen) && (
          <Broadcast
            watchOnly={screen === "WATCH_GAMES"}
            user={user}
            teams={teams}
            players={players}
            onBack={() => setScreen(homeScreen(user.type))}
          />
        )}
        {/* WIDGET UNIVERSAL DO CALENDÁRIO */}
        {screen !== "LOGIN" && <GameCalendar calendar={calendar} />}
        {screen === "NATIONAL_TEAMS" && (
          <NationalTeams
            user={user}
            players={players}
            coaches={coaches}
            onBack={() => setScreen(homeScreen(user.type))}
          />
        )}

        {screen === "HOME" && user.type === "ADMIN" && (
          <AdminPanel
            onNationalTeams={() => setScreen("NATIONAL_TEAMS")}
            onCompetitions={() => setScreen("MATCHES")}
            user={user}
            matches={matches}
            tourns={tourns}
            handleDeleteMatch={handleDeleteMatch}
            setModal={setModal}
            teams={teams}
            papers={papers}
            journalists={journalists}
            companies={companies}
            reqs={reqs}
            config={{ ...conf, calendar }}
            coaches={coaches}
            sps={sps}
            players={players}
            onAct={adminAction}
            onGenFixtures={generateFixtures}
            onTurnSeasonAdvanced={handleSeasonTurnAdvanced}
            onPost={(t, b, tp) => postNews(`📢 **${t}**\n${b}`, tp)}
            onApprove={handleFinanceApprove}
            onReject={(id) => db.collection("financeRequests").doc(id).delete()}
            onEditT={(t) => {
              setAdminTeam(t);
              setScreen("ADMIN_TEAM");
            }}
            onApproveTeam={approveTeam}
            onUpdateBal={updateBalance}
            onDeleteTeam={deleteTeam}
            onApprovePaper={async (id) => {
              await db
                .collection("newspapers")
                .doc(id)
                .update({ status: "ACTIVE" });
              alert("Jornal Aprovado com sucesso!");
            }}
            onDeletePaper={deletePaper}
            onDeleteJourno={deleteJournalist}
            onRejectPaper={async (id) => {
              await db.collection("newspapers").doc(id).delete();
              alert("Jornal Recusado/Excluído!");
            }}
            onConfig={(t) => setModal({ type: "SETTINGS", data: t })}
            onReset={resetDatabase}
            onApproveComp={async (id) => {
              await db
                .collection("companies")
                .doc(id)
                .update({ status: "ACTIVE" });
              alert("Empresa Aprovada!");
            }}
            onDeleteComp={async (id) => {
              if (confirm("Excluir Empresa?"))
                await db.collection("companies").doc(id).delete();
            }}
            onUpdateCompBal={async (id, val) => {
              await db
                .collection("companies")
                .doc(id)
                .update({ balance: parseFloat(val) });
              alert("Saldo Alterado!");
            }}
            onGenAttrs={async () => {
              if (
                !confirm(
                  "Isso vai gerar atributos para TODOS os jogadores que não têm. Continuar?",
                )
              )
                return;
              setLoading(true);
              const b = db.batch();
              let count = 0;
              players.forEach((p) => {
                if (!p.attributes) {
                  const newAttrs = generateAttributes(
                    p.position || "ATA",
                    p.overall || 60,
                  );
                  b.update(db.collection("players").doc(p.id), {
                    attributes: newAttrs,
                  });
                  count++;
                }
              });
              await b.commit();
              setLoading(false);
              alert(`Atributos gerados para ${count} jogadores!`);
            }}
          />
        )}

        {screen === "HOME" && user.type === "USER" && (
          <div key="user-home-view">
            <TeamDashboard
              team={user.data}
              players={players.filter((p) => p.teamId === user.data.id)}
              staff={coaches.filter(
                (c) => c.teamId === user.data.id && c.status === "ACTIVE",
              )}
              onFireCoach={handleFireCoach}
              onRenewCoach={(c) => setModal({ type: "OFFER", data: c })}
              isVisitor={false}
              setModal={setModal}
              onEdit={(p) => setModal({ type: "PLAYER", data: p })}
              onAdd={() =>
                setModal({ type: "PLAYER", data: { teamId: user.data.id } })
              }
              onSaveTactics={saveTactics}
            />
            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                color: "#666",
                fontSize: 12,
              }}
            >
              <i>
                Acesse a aba <b>JOGOS</b> para ver a tabela e partidas.
              </i>
            </div>
          </div>
        )}

        {/* --- PAINEL DO AUXILIAR TÉCNICO --- */}
        {(screen === "HOME" || screen === "ASSISTANT_DASH") &&
          user.type === "ASSISTANT" && (
            <div key="assistant-home-container">
              <AssistantDashboard
                assistant={user.data}
                team={teams.find((t) => t.id === user.data.teamId)}
                players={players.filter((p) => p.teamId === user.data.teamId)}
                offers={offers}
                sales={sales}
                onUseItem={handleCoachUseItem}
                onTrainRegen={handleAssistantRegen}
                onSelfAction={(act, payload) => {
                  if (act === "ACCEPT_OFFER")
                    handleFinalizeCoachContract(payload.offer);
                  if (act === "REJECT_OFFER") rejectOffer(payload.offer);
                  handleCoachSelfActions(act, payload);
                }}
                onEvolvePerk={handleEvolveCoachPerk}
                setModal={setModal}
              />
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  color: "#666",
                  fontSize: 12,
                }}
              >
                <i>
                  Acesse a aba <b>JOGOS</b> para ver a tabela e partidas.
                </i>
              </div>
            </div>
          )}

        {screen === "HOME" && user.type === "VISITOR" && (
          <div>
            <VisitorDashboard players={players} teams={teams} />
          </div>
        )}

        {screen === "PRESS_DASH" &&
          (user.type === "PRESS" || user.type === "PRESS_WORKER") && (
            <div>
              <h3>Painel de Imprensa ({user.data.name})</h3>
              <div className="card">
                <button
                  className="btn btn-blue"
                  onClick={() => setModal({ type: "POST_NEWS" })}
                >
                  ESCREVER NOTÍCIA
                </button>
                <button
                  className="btn btn-purple"
                  onClick={() => setModal({ type: "MATCH_PERFORMANCE" })}
                >
                  LANÇAR SÚMULA (XP)
                </button>
                <button
                  className="btn btn-gold"
                  onClick={() => setModal({ type: "TEAM_TABLE" })}
                >
                  EDITAR TABELA
                </button>
              </div>

              {user.type === "PRESS" &&
                journalists
                  .filter(
                    (j) =>
                      j.newspaperId === user.data.id && j.status === "PENDING",
                  )
                  .map((j) => (
                    <div key={j.id} className="card">
                      {j.name}
                      <button
                        className="btn btn-green"
                        onClick={async () => {
                          await db
                            .collection("journalists")
                            .doc(j.id)
                            .update({ status: "ACTIVE" });
                          alert("Jornalista aprovado!");
                        }}
                      >
                        APROVAR
                      </button>
                    </div>
                  ))}
            </div>
          )}

        {screen === "MATCHES" && (
          <div style={{ paddingBottom: 60 }}>
            <div
              style={{
                display: "flex",
                gap: 5,
                marginBottom: 20,
                justifyContent: "center",
                overflowX: "auto",
              }}
            >
              <button
                className={`btn ${matchesTab === "LIGAS" ? "btn-blue" : "btn-ghost"}`}
                onClick={() => setMatchesTab("LIGAS")}
                style={{ padding: "10px 5px", fontSize: 10 }}
              >
                NACIONAIS
              </button>
              <button
                className={`btn ${matchesTab === "ESTADUAIS" ? "btn-purple" : "btn-ghost"}`}
                onClick={() => setMatchesTab("ESTADUAIS")}
                style={{ padding: "10px 5px", fontSize: 10 }}
              >
                🗺️ ESTADUAIS
              </button>
              <button
                className={`btn ${matchesTab === "COPAS" ? "btn-cyan" : "btn-ghost"}`}
                onClick={() => setMatchesTab("COPAS")}
                style={{
                  borderColor: "cyan",
                  color: matchesTab === "COPAS" ? "#000" : "cyan",
                  background: matchesTab === "COPAS" ? "cyan" : "transparent",
                  padding: "10px 5px",
                  fontSize: 10,
                }}
              >
                🏆 COPAS
              </button>
            </div>

            {matchesTab === "LIGAS" && (
              <div className="animate-in">
                <h2
                  style={{
                    color: "var(--primary)",
                    textAlign: "center",
                    marginTop: 0,
                  }}
                >
                  Campeonato Mato Real
                </h2>
                <div style={{ marginBottom: 20 }}>
                  <LeagueTable
                    teams={teams}
                    serie="A"
                    onInspectTeam={(t) =>
                      setModal({ type: "VIEW_LINEUP", data: t })
                    }
                  />
                </div>
                <details open>
                  <summary
                    style={{
                      padding: 10,
                      background: "#333",
                      borderRadius: 5,
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    Divisões de Acesso (B, C, D)
                  </summary>
                  <div style={{ display: "grid", gap: 20 }}>
                    <LeagueTable
                      teams={teams}
                      serie="B"
                      onInspectTeam={(t) =>
                        setModal({ type: "VIEW_LINEUP", data: t })
                      }
                    />
                    <LeagueTable
                      teams={teams}
                      serie="C"
                      onInspectTeam={(t) =>
                        setModal({ type: "VIEW_LINEUP", data: t })
                      }
                    />
                    <LeagueTable
                      teams={teams}
                      serie="D"
                      onInspectTeam={(t) =>
                        setModal({ type: "VIEW_LINEUP", data: t })
                      }
                    />
                  </div>
                </details>
                <div
                  style={{
                    marginTop: 30,
                    border: "2px dashed gold",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "gold",
                      color: "black",
                      padding: "10px",
                      textAlign: "center",
                      fontWeight: "900",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    🚜 O Terrão (Várzea)
                  </div>
                  <div
                    style={{
                      padding: 5,
                      background: "rgba(255, 215, 0, 0.05)",
                    }}
                  >
                    <LeagueTable
                      teams={teams}
                      serie="VARZEA"
                      onInspectTeam={(t) =>
                        setModal({ type: "VIEW_LINEUP", data: t })
                      }
                    />
                  </div>
                </div>
                <hr style={{ borderColor: "#333", margin: "20px 0" }} />
                <MatchCenter
                  matches={matches}
                  teams={teams}
                  isAdmin={canAdmin(user, "competitions")}
                  onCreateMatch={(serie, round) =>
                    setModal({
                      type: "MATCH_MANAGER",
                      data: {
                        serie,
                        round,
                        homeId: "",
                        awayId: "",
                        scoreHome: 0,
                        scoreAway: 0,
                        status: "PENDING",
                      },
                    })
                  }
                  onEditMatch={(m) =>
                    setModal({ type: "MATCH_MANAGER", data: m })
                  }
                  onDeleteMatch={(id) => handleDeleteMatch(id)}
                  onReportMatch={(m) => {
                    if (
                      user.type.includes("PRESS") ||
                      canAdmin(user, "competitions")
                    )
                      setModal({
                        type: "MATCH_PERFORMANCE",
                        data: { match: m, player: null },
                      });
                    else alert("Apenas imprensa/admin lança súmula.");
                  }}
                />
              </div>
            )}

            {matchesTab === "ESTADUAIS" && (
              <div className="animate-in">
                <h2
                  style={{
                    color: "var(--purple)",
                    textAlign: "center",
                    marginTop: 0,
                  }}
                >
                  🗺️ Campeonatos Estaduais
                </h2>
                <p style={{ textAlign: "center", fontSize: 11, color: "#aaa" }}>
                  Disputa entre todos os clubes da mesma região, independente de
                  divisão!
                </p>

                {ESTADOS.map((estado) => {
                  const stateMatches = matches.filter(
                    (m) => m.isEstadual && m.estado === estado,
                  );
                  return (
                    <details key={estado} style={{ marginBottom: 10 }}>
                      <summary
                        style={{
                          padding: 15,
                          background: "#1a1a1a",
                          borderRadius: 5,
                          cursor: "pointer",
                          fontWeight: "bold",
                          border: "1px solid var(--purple)",
                          color: "var(--purple)",
                        }}
                      >
                        📍 Campeonato {estado}
                      </summary>
                      <div style={{ padding: "10px 0" }}>
                        <LeagueTable
                          teams={teams}
                          serie="ESTADUAL"
                          estado={estado}
                          onInspectTeam={(t) =>
                            setModal({ type: "VIEW_LINEUP", data: t })
                          }
                        />

                        <div style={{ marginTop: 15 }}>
                          <b style={{ color: "#aaa", fontSize: 11 }}>
                            JOGOS DA RODADA ({estado}):
                          </b>
                          {stateMatches.length === 0 ? (
                            <p style={{ fontSize: 11, color: "#666" }}>
                              Nenhum jogo gerado ainda.
                            </p>
                          ) : (
                            <div style={{ marginTop: 10 }}>
                              <MatchCenter
                                matches={matches.filter(
                                  (m) => m.isEstadual && m.estado === estado,
                                )}
                                teams={teams}
                                isAdmin={canAdmin(user, "competitions")}
                                onCreateMatch={() =>
                                  alert(
                                    "Jogos estaduais são gerados automaticamente.",
                                  )
                                }
                                onEditMatch={(m) =>
                                  setModal({ type: "MATCH_MANAGER", data: m })
                                }
                                onDeleteMatch={(id) => handleDeleteMatch(id)}
                                onReportMatch={(m) => {
                                  if (
                                    user.type.includes("PRESS") ||
                                    canAdmin(user, "competitions")
                                  )
                                    setModal({
                                      type: "MATCH_PERFORMANCE",
                                      data: { match: m, player: null },
                                    });
                                  else
                                    alert(
                                      "Apenas imprensa/admin lança súmula.",
                                    );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            )}

            {matchesTab === "COPAS" && (
              <div className="animate-in">
                <TournamentHub
                  tournaments={tourns}
                  matches={matches}
                  players={players}
                  user={user}
                  teams={teams}
                  onInspectTeam={(t) =>
                    setModal({ type: "VIEW_LINEUP", data: t })
                  }
                  onCreateMatch={(tournId) =>
                    setModal({
                      type: "MATCH_MANAGER",
                      data: {
                        serie: tournId,
                        round: 1,
                        homeId: "",
                        awayId: "",
                        scoreHome: 0,
                        scoreAway: 0,
                        status: "PENDING",
                      },
                    })
                  }
                  onEditMatch={(m) =>
                    setModal({ type: "MATCH_MANAGER", data: m })
                  }
                  onDeleteMatch={(id) => handleDeleteMatch(id)}
                  onReportMatch={(m) =>
                    setModal({
                      type: "MATCH_PERFORMANCE",
                      data: { match: m, player: null },
                    })
                  }
                />
              </div>
            )}
          </div>
        )}

        {screen === "MARKET" && (
          <Market
            user={user}
            me={user.data?.id}
            teams={teams}
            players={players}
            coaches={coaches}
            open={conf.marketOpen}
            isVis={user.type === "VISITOR" || user.type === "COACH"}
            onIndicate={handleCoachIndication}
            onNeg={(p) => setModal({ type: "OFFER", data: p })}
            onPayClause={async (p) => {
              const buy = teams.find((t) => t.id === user.data.id);
              const sel = teams.find((t) => t.id === p.teamId);
              if (buy.balance < p.clause) return alert("Saldo insuficiente!");
              if (!confirm(`Pagar multa de ${fmt(p.clause)} por ${p.name}?`))
                return;
              const b = db.batch();
              b.update(db.collection("teams").doc(buy.id), {
                balance: buy.balance - p.clause,
              });
              b.update(db.collection("teams").doc(sel.id), {
                balance: sel.balance + p.clause,
              });
              b.update(db.collection("players").doc(p.id), {
                teamId: buy.id,
                status: "NAO_A_VENDA",
                contract: 3,
                history: firebase.firestore.FieldValue.arrayUnion({
                  date: Date.now(),
                  from: sel.name,
                  to: buy.name,
                  type: "MULTA",
                  value: p.clause,
                }),
              });
              await b.commit();
              postNews(
                `🚨 **MULTA PAGA!**\nO **${buy.name}** pagou a multa de **${p.name}**!`,
                "transfer",
              );
              alert("Contratado via multa!");
            }}
            onPre={async (p) => {
              const buy = teams.find((t) => t.id === user.data.id);
              if (!confirm(`Assinar pré-contrato com ${p.name}?`)) return;
              await db
                .collection("players")
                .doc(p.id)
                .update({
                  preContract: { teamId: buy.id, teamName: buy.name },
                  mood: "🤩",
                });
              postNews(
                `📝 **PRÉ-CONTRATO**\n**${p.name}** reforçará o **${buy.name}** na próxima temporada!`,
                "transfer",
              );
              alert("Pré-contrato assinado!");
            }}
            onHireCoach={(c) => setModal({ type: "HIRE_COACH", data: c })}
          />
        )}

        {screen === "SHOPPING" && (
          <ShoppingScreen
            products={products}
            companies={companies}
            user={user}
            players={players}
            teams={teams}
            onBuy={buyProduct}
            onDeleteProd={async (id) => {
              if (confirm("Admin: Excluir produto?"))
                await db.collection("products").doc(id).delete();
            }}
          />
        )}

        {screen === "SPONSORSHIPS" && user.type === "USER" && (
          <div>
            <h3>Buscar Patrocínio</h3>
            <p style={{ fontSize: 11, color: "#aaa" }}>
              Envie propostas semanais para as empresas.
            </p>
            {companies
              .filter((c) => c.status === "ACTIVE")
              .map((c) => (
                <div key={c.id} className="card">
                  <b>{c.name}</b>{" "}
                  <small>({(COMPANY_TYPES[c.companyType] || {}).label})</small>
                  <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                    <button
                      className="btn btn-purple"
                      onClick={() => {
                        const v = prompt("Valor Semanal pedido (₣):");
                        if (v) requestSponsorship(c.id, v);
                      }}
                    >
                      PEDIR PATROCÍNIO
                    </button>
                  </div>
                </div>
              ))}
            <hr style={{ borderColor: "#333" }} />
            <h4>Meus Contratos</h4>
            {sps.filter((s) => s.teamId === user.data.id).length === 0 && (
              <p style={{ color: "#666" }}>Sem contratos.</p>
            )}
            {sps
              .filter((s) => s.teamId === user.data.id)
              .map((s) => (
                <div
                  key={s.id}
                  className="card"
                  style={{
                    borderLeft: `4px solid ${s.status === "ACTIVE" ? "var(--primary)" : "#666"}`,
                  }}
                >
                  <b>{s.companyName}</b>
                  <br />
                  Valor: {fmt(s.value)}/sem{" "}
                  <small>
                    ({s.status === "PENDING" ? "Aguardando" : "Ativo"})
                  </small>
                  {s.status === "ACTIVE" && (
                    <button
                      className="btn btn-red"
                      style={{ width: "auto", marginTop: 5 }}
                      onClick={() => {
                        if (confirm("Encerrar contrato de patrocínio?"))
                          db.collection("sponsorships").doc(s.id).delete();
                      }}
                    >
                      ENCERRAR
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}

        {screen === "RANKING" && (
          <Ranking
            teams={teams}
            players={players}
            sales={sales}
            hallOfFame={hallOfFame}
          />
        )}

        {screen === "NEWS" && (
          <div>
            <h3>Notícias</h3>
            {news.map((n) => (
              <div key={n.id} className={`news-card news-${n.type}`}>
                {n.text}
                <br />
                <small style={{ color: "#666" }}>
                  {new Date(n.date).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}

        {/* TELA DO MATOGRAM */}
        {screen === "SOCIAL" && (
          <SocialHub
            user={user}
            posts={posts}
            onPost={handleSocialPost}
            onLike={handleSocialLike}
            onDeletePost={handleSocialDelete}
            onSendChat={sendChatMessage}
            onSubChat={subscribeToChat}
            messages={chatMessages}
            onFollow={toggleFollow}
          />
        )}

        {screen === "OFFERS" && (
          <OffersScreen
            user={user}
            offers={offers}
            teams={teams}
            players={players}
            setModal={setModal} // <-- ESSA LINHA É O SEGREDO
            onAccept={acceptOffer}
            onReject={rejectOffer}
            onCounter={(o) =>
              setModal({
                type: "OFFER",
                data: {
                  ...players.find((p) => p.id === o.playerId),
                  oldOffer: o,
                },
              })
            }
            onCoachAccept={handleFinalizeCoachContract}
            onCoachReject={rejectOffer}
            onCoachCounter={handleCounterCoachOffer}
          />
        )}
        {/* NOVA TELA DE SERVIÇOS PÚBLICOS (HOSPITAL E BANCO) */}
        {screen === "PUBLIC_SERVICES" && (
          <PublicServices
            players={players}
            coaches={coaches}
            user={user}
            onDonate={handleHospitalDonation}
            onOperate={() => {
              if (user.type === "DOCTOR") setScreen("DOCTOR_DASH");
              else
                alert(
                  "As cirurgias são realizadas pelo médico no painel médico. O fundo hospitalar deste jogador permanece disponível para o procedimento.",
                );
            }}
          />
        )}
        {(screen === "COMPANY_DASH" || screen === "COMPANY_HOME") &&
          user.type === "COMPANY" && (
            <CompanyDashboard
              company={user.data}
              products={products.filter((p) => p.companyId === user.data.id)}
              sps={sps.filter((s) => s.companyId === user.data.id)}
              sales={sales || []}
              teams={teams}
              onSaveProd={saveProduct}
              onDeleteProd={async (id) => {
                if (confirm("Excluir produto?"))
                  await db.collection("products").doc(id).delete();
              }}
              onProcessSpons={processSponsorship}
            />
          )}

        {screen === "PLAYER_DASH" && user.type === "PLAYER" && (
          <div key="player-dash-container">
            <PlayerDashboard
              user={user} /* <-- ADICIONE ESTA LINHA AQUI! */
              player={players.find((p) => p.id === user.data.id) || user.data}
              team={teams.find((t) => t.id === user.data.teamId)}
              sales={sales || []}
              onAction={handlePlayerActions}
              onUpdatePassword={async (newP) => {
                await db
                  .collection("players")
                  .doc(user.data.id)
                  .update({ password: newP });
                alert("Senha alterada!");
              }}
              onTrainSolo={handlePlayerSoloTrain}
              onUseItem={handleUseItem}
              setModal={setModal}
            />
            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                color: "#666",
                fontSize: 12,
              }}
            >
              <i>
                Acesse a aba <b>JOGOS</b> para ver a tabela e partidas.
              </i>
            </div>
          </div>
        )}
        {/* --- PAINEL DO TÉCNICO --- */}
        {(screen === "HOME" || screen === "COACH_DASH") &&
          user.type === "COACH" && (
            <div key="coach-home-container">
              <CoachDashboard
                coach={user.data}
                team={teams.find((t) => t.id === user.data.teamId)}
                players={players.filter((p) => p.teamId === user.data.teamId)}
                offers={offers}
                sales={sales}
                onTrain={handleCoachTrain}
                onEvolvePerk={handleEvolveCoachPerk}
                onAddAffinity={async (aff) => {
                  await db
                    .collection("users")
                    .doc(user.data.id)
                    .update({
                      affinities: firebase.firestore.FieldValue.arrayUnion(aff),
                      pendingAffinity:
                        firebase.firestore.FieldValue.increment(-1),
                    });
                  alert("Nova afinidade desbloqueada!");
                }}
                onAcceptOffer={handleFinalizeCoachContract}
                onRejectOffer={rejectOffer}
                onCounterOffer={handleCounterCoachOffer}
                onUpdateSalary={handleUpdateCoachSalary}
                onSelfAction={handleCoachSelfActions}
                onSaveTactics={saveTactics}
                onUseItem={handleCoachUseItem}
                setModal={setModal}
              />
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  color: "#666",
                  fontSize: 12,
                }}
              >
                <i>
                  Acesse a aba <b>JOGOS</b> para ver a tabela e partidas.
                </i>
              </div>
            </div>
          )}
        {/* --- PAINEL DO MÉDICO --- */}
        {(screen === "HOME" || screen === "DOCTOR_DASH") &&
          user.type === "DOCTOR" && (
            <div key="doctor-home-container">
              <DoctorDashboard
                doctor={user.data}
                team={teams.find((t) => t.id === user.data.teamId)}
                players={players.filter((p) => p.teamId === user.data.teamId)}
                offers={offers}
                sales={sales}
                onUseItem={handleCoachUseItem}
                onSelfAction={(act, payload) => {
                  if (act === "ACCEPT_OFFER")
                    handleFinalizeCoachContract(payload.offer);
                  if (act === "REJECT_OFFER") rejectOffer(payload.offer);
                  handleCoachSelfActions(act, payload);
                }}
                onEvolvePerk={handleEvolveCoachPerk}
                setModal={setModal}
              />
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  color: "#666",
                  fontSize: 12,
                }}
              >
                <i>
                  Acesse a aba <b>JOGOS</b> para ver a tabela e partidas.
                </i>
              </div>
            </div>
          )}
        {/* --- PAINEL DO OLHEIRO (SCOUT) --- */}
        {(screen === "HOME" || screen === "SCOUT_DASH") &&
          user.type === "SCOUT" && (
            <div key="scout-home-container">
              <ScoutDashboard
                scout={user.data}
                team={teams.find((t) => t.id === user.data.teamId)}
                players={players.filter((p) => p.teamId === user.data.teamId)}
                setModal={setModal}
                onSelfAction={(act, payload) => {
                  if (act === "ACCEPT_OFFER")
                    handleFinalizeCoachContract(payload.offer);
                  if (act === "REJECT_OFFER") rejectOffer(payload.offer);
                  handleCoachSelfActions(act, payload);
                }}
              />
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  color: "#666",
                  fontSize: 12,
                }}
              >
                <i>
                  Acesse a aba <b>JOGOS</b> para ver a tabela e partidas.
                </i>
              </div>
            </div>
          )}
        {/* INDICADOR DE ROLAGEM ANIMADO */}
        <div className="scroll-hint">
          Deslize <i className="fas fa-arrow-right"></i>
        </div>
        <div className="bottom-nav">
          {/* 1. HOME */}
          <div
            className={`nav-item ${["HOME", "COMPANY_HOME", "COMPANY_DASH", "PLAYER_DASH", "COACH_DASH", "DOCTOR_DASH", "ASSISTANT_DASH", "SCOUT_DASH", "PRESS_DASH"].includes(screen) ? "active" : ""}`}
            onClick={() => {
              if (user.type.includes("PRESS")) setScreen("PRESS_DASH");
              else if (user.type === "COMPANY") setScreen("COMPANY_HOME");
              else if (user.type === "PLAYER") setScreen("PLAYER_DASH");
              else if (user.type === "COACH") setScreen("COACH_DASH");
              else if (user.type === "DOCTOR") setScreen("DOCTOR_DASH");
              else if (user.type === "ASSISTANT") setScreen("ASSISTANT_DASH");
              else if (user.type === "SCOUT")
                setScreen("SCOUT_DASH"); // <-- OLHEIRO ADICIONADO AQUI
              else setScreen("HOME");
            }}
          >
            <i className="fas fa-home"></i>
            <span>INÍCIO</span>
          </div>

          <div
            role="button"
            tabIndex={0}
            aria-label="Assistir jogos"
            className={`nav-item pixel-feature ${screen === "WATCH_GAMES" ? "active" : ""}`}
            onClick={() => setScreen("WATCH_GAMES")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setScreen("WATCH_GAMES");
              }
            }}
          >
            <i className="fas fa-tv" aria-hidden="true"></i>
            <span>ASSISTIR</span>
          </div>
          {/* 2. JOGOS (NOVO - PARA TODOS) */}
          <div
            className={`nav-item ${screen === "MATCHES" ? "active" : ""}`}
            onClick={() => setScreen("MATCHES")}
          >
            <i className="fas fa-futbol"></i>
            <span>JOGOS</span>
          </div>

          {/* NOVO BOTÃO SOCIAL */}
          <div
            className={`nav-item ${screen === "SOCIAL" ? "active" : ""}`}
            onClick={() => setScreen("SOCIAL")}
          >
            <i className="fas fa-camera"></i>
            <span>SOCIAL</span>
          </div>

          {/* 3. SERVIÇOS PÚBLICOS (CIDADE: HOSPITAL E BANCO) */}
          <div
            className={`nav-item ${screen === "PUBLIC_SERVICES" ? "active" : ""}`}
            onClick={() => setScreen("PUBLIC_SERVICES")}
          >
            <i className="fas fa-city"></i>
            <span>CIDADE</span>
          </div>

          {/* 4. MERCADO (Agora aberto para Empresas patrocinarem) */}
          <div
            className={`nav-item ${screen === "MARKET" ? "active" : ""}`}
            onClick={() => setScreen("MARKET")}
          >
            <i className="fas fa-globe"></i>
            <span>MERCADO</span>
          </div>

          {/* 5. SHOP (Esconde para empresas) */}
          {user.type !== "COMPANY" && (
            <div
              className={`nav-item ${screen === "SHOPPING" ? "active" : ""}`}
              onClick={() => setScreen("SHOPPING")}
            >
              <i className="fas fa-shopping-bag"></i>
              <span>SHOP</span>
            </div>
          )}

          {/* 6. PATROCINIO (Só times) */}
          {user.type === "USER" && (
            <div
              className={`nav-item ${screen === "SPONSORSHIPS" ? "active" : ""}`}
              onClick={() => setScreen("SPONSORSHIPS")}
            >
              <i className="fas fa-handshake"></i>
              <span>PATRO</span>
            </div>
          )}

          {/* 7. RANKING (RESTAURADO) */}
          {user.type !== "COMPANY" && (
            <div
              className={`nav-item ${screen === "RANKING" ? "active" : ""}`}
              onClick={() => setScreen("RANKING")}
            >
              <i className="fas fa-trophy"></i>
              <span>RANK</span>
            </div>
          )}

          {/* 8. NEWS (Todos) */}
          <div
            className={`nav-item ${screen === "NEWS" ? "active" : ""}`}
            onClick={() => {
              setScreen("NEWS");
              setNewNews(false);
              savePreference("lastRead", Date.now());
            }}
          >
            <i className="fas fa-newspaper"></i>
            <span>NEWS</span>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`nav-item ${screen === "NATIONAL_TEAMS" ? "active" : ""}`}
            onClick={() => setScreen("NATIONAL_TEAMS")}
            onKeyDown={(e) => {
              if (e.key === "Enter") setScreen("NATIONAL_TEAMS");
            }}
          >
            <i className="fas fa-globe-americas" aria-hidden="true"></i>
            <span>SELEÇÕES</span>
          </div>
        </div>

        {modal && (
          <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && setModal(null)}
          >
            <div className="modal-content">
              {modal.type === "PLAYER" && (
                <PlayerForm
                  initial={modal.data}
                  onSave={savePlayer}
                  onDelete={async (id) => {
                    db.collection("players").doc(id).delete();
                    setModal(null);
                  }}
                  isAdmin={canAdmin(user, "teams")}
                  teams={teams}
                  onRenew={renewContract}
                  isOwner={
                    user.type === "USER" && modal.data?.teamId === user.data?.id
                  }
                />
              )}
              {modal.type === "TEAM_REQUEST_PLAYER" && (
                <TeamRequestPlayerModal
                  team={modal.data}
                  onClose={() => setModal(null)}
                  onSubmit={async (data) => {
                    try {
                      setLoading(true);
                      // Gera os atributos sorteados com base na posição e overall que o time pediu
                      const newAttrs = generateAttributes(
                        data.position,
                        data.overall,
                      );

                      await db.collection("players").add({
                        ...data,
                        attributes: newAttrs,
                        requestedStatus: data.status, // Salva o status que o time quer que ele tenha quando for aprovado
                        status: "PENDING", // Força o status PENDING para ficar invisível e ir pro Admin
                        xp: 0,
                        fame: 0,
                        balance: 0,
                        stats: {
                          goals: 0,
                          assists: 0,
                          tackles: 0,
                          saves: 0,
                          yellows: 0,
                          reds: 0,
                        },
                      });
                      setLoading(false);
                      setModal(null);
                      alert(
                        "Inscrição enviada com sucesso! O jogador aparecerá no seu elenco assim que a Federação aprovar.",
                      );
                    } catch (e) {
                      setLoading(false);
                      alert("Erro ao inscrever: " + e.message);
                    }
                  }}
                />
              )}
              {modal.type === "ADMIN_PLAYER" && (
                <AdminPlayerModal
                  player={modal.data}
                  teams={teams}
                  onClose={() => setModal(null)}
                />
              )}
              {modal.type === "CT_TYCOON" && modal.data && (
                <TrainingCenterManager
                  team={teams.find((t) => t.id === modal.data.id) || modal.data}
                  players={players.filter((p) => p.teamId === modal.data.id)}
                  staff={(coaches || []).filter(
                    (c) => c.teamId === modal.data.id && c.status === "ACTIVE",
                  )}
                  user={user}
                  onClose={() => setModal(null)}
                  onTrain={handleCoachTrain}
                  onTrainSolo={handlePlayerSoloTrain}
                />
              )}
              {modal.type === "OFFER" && (
                <OfferForm
                  target={modal.data}
                  myPlayers={players.filter((p) => p.teamId === user.data.id)}
                  onSend={sendOffer}
                  setModal={setModal}
                  user={user}
                />
              )}
              {modal.type === "SETTINGS" && (
                <SettingsForm
                  team={modal.data || user.data}
                  isAdmin={canAdmin(user, "teams")}
                  onUp={(d) => {
                    const tid = modal.data?.id || user.data.id;
                    let payload = { ...d };
                    // Se escolheu um estado e o time não tinha os pontos do estadual, cria agora!
                    if (d.estado && !modal.data?.stateStats) {
                      payload.stateStats = {
                        pts: 0,
                        wins: 0,
                        draws: 0,
                        losses: 0,
                        gf: 0,
                        ga: 0,
                      };
                    }
                    db.collection("teams").doc(tid).update(payload);
                    setModal(null);
                  }}
                  onUpgrade={() => {
                    /*Up*/
                  }}
                  onReq={(t, a, d) => {
                    db.collection("financeRequests").add({
                      teamId: user.data.id,
                      teamName: user.data.name,
                      type: t,
                      amount: parseFloat(a),
                      details: d,
                      status: "PENDING",
                    });
                    setModal(null);
                    alert("Enviado!");
                  }}
                  onWithdraw={withdrawMoney}
                />
              )}
              {modal.type === "MATCH_PERFORMANCE" && (
                <MatchPerformanceForm
                  players={players}
                  teams={teams}
                  onSaveStats={saveMatchStats}
                  matchData={modal.data?.match}
                />
              )}
              {modal.type === "TEAM_TABLE" && (
                <TeamStandingsEditor
                  teams={teams}
                  onUpdateTeamStats={updateTeamStats}
                />
              )}
              {modal.type === "POST_NEWS" && (
                <div>
                  <h3>Nova Notícia</h3>
                  <input
                    className="input-field"
                    placeholder="Manchete / Texto"
                    id="news-body"
                  />
                  <button
                    className="btn btn-blue"
                    onClick={() => {
                      postNews(
                        `📰 **${user.data.name}:**\n${document.getElementById("news-body").value}`,
                        "press",
                      );
                      setModal(null);
                    }}
                  >
                    PUBLICAR
                  </button>
                </div>
              )}
              {modal.type === "EDIT_PRIZES" && (
                <PrizeEditor
                  initialData={modal.data}
                  onSave={async (newPrizes) => {
                    await db
                      .collection("config")
                      .doc("system")
                      .update({ prizes: newPrizes });
                    alert("Premiações Atualizadas!");
                    setModal(null);
                  }}
                  onClose={() => setModal(null)}
                />
              )}
              {modal.type === "AWARDS_MANAGER" && (
                <AwardsManager
                  awards={awards}
                  teams={teams}
                  players={players}
                  coaches={coaches}
                  onClose={() => setModal(null)}
                />
              )}
              {modal.type === "TOURN_MANAGER" && (
                <TournamentManagerModal
                  tournaments={tourns}
                  teams={teams}
                  awards={awards}
                  onClose={() => setModal(null)}
                />
              )}
              {modal.type === "STATS_SEARCH" && (
                <StatsEditor
                  players={players}
                  teams={teams}
                  onSave={async (id, stats) => {
                    try {
                      const clean = Object.fromEntries(
                        Object.entries(stats).map(([key, value]) => [
                          key,
                          Math.max(
                            0,
                            Number.isFinite(Number(value)) ? Number(value) : 0,
                          ),
                        ]),
                      );
                      await db
                        .collection("players")
                        .doc(id)
                        .update({ stats: clean });
                      setModal(null);
                      alert("Estatísticas atualizadas!");
                    } catch (error) {
                      alert("Erro ao salvar: " + error.message);
                    }
                  }}
                />
              )}

              {modal.type === "MATCH_MANAGER" && (
                <MatchManagerForm
                  initialData={modal.data}
                  teams={teams}
                  tournaments={tourns}
                  onSave={handleSaveMatch}
                  onDelete={handleDeleteMatch}
                />
              )}

              {modal.type === "MATCH_REPORT" && (
                <MatchPerformanceForm
                  players={players}
                  teams={teams}
                  onSaveStats={saveMatchStats}
                />
              )}

              {modal?.type === "VIEW_LINEUP" && (
                <div className="modal-overlay" onClick={() => setModal(null)}>
                  {/* Scroll liberado para caber todo o conteúdo novo */}
                  <div
                    className="modal-content animate-in"
                    style={{
                      maxWidth: "550px",
                      maxHeight: "90vh",
                      overflowY: "auto",
                      background: "#121212",
                      border: "1px solid var(--primary)",
                      padding: "15px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* CABEÇALHO FIXO NO TOPO */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 15,
                        position: "sticky",
                        top: "-15px",
                        background: "#121212",
                        zIndex: 100,
                        padding: "15px 0 10px 0",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {modal.data.logo ? (
                          <img
                            src={modal.data.logo}
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: "50%",
                              border: "1px solid var(--primary)",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: 24 }}>🛡️</span>
                        )}
                        {modal.data.name}
                      </h3>
                      <button
                        className="btn btn-red"
                        style={{
                          width: "auto",
                          padding: "5px 10px",
                          margin: 0,
                        }}
                        onClick={() => setModal(null)}
                      >
                        FECHAR
                      </button>
                    </div>

                    {/* 1. ARENA (Mantido, mas estilizado) */}
                    {(() => {
                      const lvl = modal.data.stadiumLevel || 1;
                      const sDb = STADIUM_DB[lvl] || STADIUM_DB[1];
                      const ticPrice = modal.data.ticketPrice || sDb.minTic;

                      return (
                        <div
                          style={{
                            position: "relative",
                            height: 130,
                            borderRadius: 8,
                            overflow: "hidden",
                            marginBottom: 20,
                            border: "1px solid cyan",
                            background: "#111",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                          }}
                        >
                          {modal.data.stadiumPic ? (
                            <img
                              src={modal.data.stadiumPic}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                opacity: 0.6,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                display: "grid",
                                placeItems: "center",
                                height: "100%",
                                fontSize: 50,
                                color: "#333",
                              }}
                            >
                              🏟️
                            </div>
                          )}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background:
                                "linear-gradient(transparent, rgba(0,0,0,0.95))",
                              padding: "30px 10px 10px 10px",
                            }}
                          >
                            <b
                              style={{
                                color: "cyan",
                                fontSize: 15,
                                display: "block",
                                marginBottom: 4,
                                textShadow: "1px 1px 2px black",
                              }}
                            >
                              {sDb.name}{" "}
                              <small style={{ color: "gold" }}>
                                (Nvl {lvl})
                              </small>
                            </b>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 10,
                                color: "#ddd",
                                textShadow: "1px 1px 2px black",
                              }}
                            >
                              <span>
                                👥{" "}
                                <b style={{ color: "#fff" }}>
                                  {sDb.cap.toLocaleString("pt-BR")}
                                </b>
                              </span>
                              <span>
                                🎫{" "}
                                <b style={{ color: "#00E676" }}>
                                  {fmt(ticPrice)}
                                </b>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* 2. COMISSÃO TÉCNICA COMPLETA */}
                    {(() => {
                      // Filtra todo o staff do time
                      const teamStaff = (coaches || [])
                        .filter(
                          (c) =>
                            c.teamId === modal.data.id && c.status === "ACTIVE",
                        )
                        .sort((a, b) => a.type.localeCompare(b.type));
                      const roleIcons = {
                        COACH: "👔",
                        ASSISTANT: "📋",
                        DOCTOR: "🩺",
                        SCOUT: "🕵️‍♂️",
                      };
                      const roleNames = {
                        COACH: "Técnico",
                        ASSISTANT: "Auxiliar",
                        DOCTOR: "Médico",
                        SCOUT: "Olheiro",
                      };

                      return (
                        <div style={{ marginBottom: 25 }}>
                          <h4
                            style={{
                              color: "gold",
                              margin: "0 0 10px 0",
                              fontSize: 14,
                              borderBottom: "1px solid #333",
                              paddingBottom: 5,
                            }}
                          >
                            👔 Comissão Técnica
                          </h4>
                          {teamStaff.length === 0 ? (
                            <p
                              style={{
                                fontSize: 11,
                                color: "#666",
                                fontStyle: "italic",
                              }}
                            >
                              Nenhum profissional contratado.
                            </p>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                overflowX: "auto",
                                paddingBottom: 10,
                              }}
                            >
                              {teamStaff.map((c) => (
                                <div
                                  key={c.id}
                                  style={{
                                    minWidth: "110px",
                                    background: "rgba(255,215,0,0.05)",
                                    border: "1px solid gold",
                                    borderRadius: 8,
                                    padding: 10,
                                    textAlign: "center",
                                  }}
                                >
                                  {c.face ? (
                                    <img
                                      src={c.face}
                                      style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: 5,
                                        border: "1px solid gold",
                                      }}
                                    />
                                  ) : (
                                    <div
                                      style={{ fontSize: 26, marginBottom: 5 }}
                                    >
                                      {roleIcons[c.type]}
                                    </div>
                                  )}
                                  <b
                                    style={{
                                      fontSize: 11,
                                      display: "block",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {c.name}
                                  </b>
                                  <span
                                    style={{
                                      fontSize: 9,
                                      color: "gold",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {roleNames[c.type]} (Nv {c.level})
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* 3. CAMPO TÁTICO COM TITULARES (AGORA MOSTRA OVR) */}
                    <div style={{ marginBottom: 25 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          borderBottom: "1px solid #333",
                          paddingBottom: 5,
                          marginBottom: 10,
                        }}
                      >
                        <h4
                          style={{
                            color: "var(--primary)",
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          ⚽ Escalação Principal
                        </h4>
                        <span style={{ fontSize: 10, color: "#888" }}>
                          Esquema:{" "}
                          {modal.data.tactics?.formation || "Não definido"}
                        </span>
                      </div>

                      <div
                        className="football-field"
                        style={{
                          height: "400px",
                          pointerEvents: "none",
                          position: "relative",
                        }}
                      >
                        {modal.data.tactics ? (
                          FORMATIONS[modal.data.tactics.formation].map(
                            (posLabel, idx) => {
                              const coords =
                                FORMATION_COORDINATES[
                                  modal.data.tactics.formation
                                ][idx];
                              const pId = modal.data.tactics.lineup[idx];
                              const player = players.find((p) => p.id === pId);

                              return (
                                <div
                                  key={idx}
                                  style={{
                                    position: "absolute",
                                    top: coords.t,
                                    left: coords.l,
                                    transform: "translate(-50%, -50%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    className="player-photo-circle"
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      border: player
                                        ? "2px solid gold"
                                        : "1px dashed #666",
                                      background: player
                                        ? "#001a33"
                                        : "rgba(0,0,0,0.4)",
                                      boxShadow: "0 4px 6px rgba(0,0,0,0.6)",
                                    }}
                                  >
                                    {player?.face ? (
                                      <img
                                        src={player.face}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                          objectPosition: "top",
                                        }}
                                      />
                                    ) : (
                                      <span style={{ fontSize: "9px" }}>
                                        {posLabel}
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    className="player-name-label"
                                    style={{
                                      fontSize: "9px",
                                      padding: "2px 6px",
                                      background: player
                                        ? "#fff"
                                        : "rgba(0,0,0,0.8)",
                                      color: player ? "#000" : "#fff",
                                      fontWeight: "900",
                                      marginTop: "3px",
                                      borderRadius: "4px",
                                      border: player
                                        ? "1px solid #333"
                                        : "none",
                                      boxShadow: "0 2px 5px rgba(0,0,0,0.8)",
                                      letterSpacing: "0.5px",
                                    }}
                                  >
                                    {/* AQUI ESTÁ A MÁGICA DO OVERALL NO CAMPO! */}
                                    {player
                                      ? `${player.name.split(" ")[0].toUpperCase()} | ${player.overall}`
                                      : "VAZIO"}
                                  </div>
                                </div>
                              );
                            },
                          )
                        ) : (
                          <div
                            style={{
                              display: "grid",
                              placeItems: "center",
                              height: "100%",
                              color: "#fff",
                              fontSize: "13px",
                              textAlign: "center",
                              padding: 20,
                            }}
                          >
                            <br />O técnico ainda não enviou a súmula tática.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 4. BANCO DE RESERVAS E RESTANTE DO ELENCO */}
                    {(() => {
                      const lineupIds = modal.data.tactics
                        ? Object.values(modal.data.tactics.lineup)
                        : [];
                      // Pega jogadores do time que NÃO estão na prancheta
                      const benchPlayers = players
                        .filter(
                          (p) =>
                            p.teamId === modal.data.id &&
                            !lineupIds.includes(p.id),
                        )
                        .sort((a, b) => b.overall - a.overall);

                      return (
                        <div style={{ marginBottom: 25 }}>
                          <h4
                            style={{
                              color: "var(--secondary)",
                              margin: "0 0 10px 0",
                              fontSize: 14,
                              borderBottom: "1px solid #333",
                              paddingBottom: 5,
                            }}
                          >
                            🪑 Banco de Reservas ({benchPlayers.length})
                          </h4>
                          {benchPlayers.length === 0 ? (
                            <p
                              style={{
                                fontSize: 11,
                                color: "#666",
                                fontStyle: "italic",
                              }}
                            >
                              Nenhum jogador no banco de reservas.
                            </p>
                          ) : (
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 10,
                              }}
                            >
                              {benchPlayers.map((p) => (
                                <div
                                  key={p.id}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    background: "#1a1a1a",
                                    padding: 8,
                                    borderRadius: 6,
                                    borderLeft: `3px solid ${getPosColor(p.position)}`,
                                    border: "1px solid #333",
                                  }}
                                >
                                  {p.face ? (
                                    <img
                                      src={p.face}
                                      style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        objectPosition: "top",
                                      }}
                                    />
                                  ) : (
                                    <div
                                      style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        background: "#333",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: 10,
                                      }}
                                    >
                                      👤
                                    </div>
                                  )}
                                  <div style={{ flex: 1, overflow: "hidden" }}>
                                    <b
                                      style={{
                                        fontSize: 11,
                                        display: "block",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {p.name} {p.recoveryLeft > 0 ? "🏥" : ""}
                                    </b>
                                    <span
                                      style={{ fontSize: 9, color: "#aaa" }}
                                    >
                                      {p.position}
                                    </span>
                                  </div>
                                  <b
                                    style={{
                                      color:
                                        p.overall >= 80
                                          ? "gold"
                                          : p.overall >= 70
                                            ? "lime"
                                            : "white",
                                      fontSize: 14,
                                    }}
                                  >
                                    {p.overall}
                                  </b>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* 5. SALA DE TROFÉUS */}
                    <div>
                      <h4
                        style={{
                          color: "gold",
                          margin: "0 0 10px 0",
                          fontSize: 14,
                          borderBottom: "1px solid #333",
                          paddingBottom: 5,
                        }}
                      >
                        🏆 Sala de Troféus
                      </h4>
                      {!modal.data.trophies ||
                      modal.data.trophies.length === 0 ? (
                        <p
                          style={{
                            fontSize: 11,
                            color: "#666",
                            textAlign: "center",
                            padding: 20,
                            background: "#1a1a1a",
                            borderRadius: 8,
                            fontStyle: "italic",
                          }}
                        >
                          A estante do clube ainda está vazia.
                        </p>
                      ) : (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(80px, 1fr))",
                            gap: 10,
                          }}
                        >
                          {[...modal.data.trophies].reverse().map((t, i) => (
                            <div
                              key={i}
                              style={{
                                textAlign: "center",
                                background: "rgba(255,215,0,0.05)",
                                padding: 10,
                                borderRadius: 8,
                                border: "1px solid #444",
                              }}
                            >
                              <img
                                src={t.img}
                                style={{
                                  width: 45,
                                  height: 45,
                                  objectFit: "contain",
                                  filter:
                                    "drop-shadow(0 0 5px rgba(255,215,0,0.5))",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: "bold",
                                  color: "#fff",
                                  marginTop: 5,
                                }}
                              >
                                {t.name}
                              </div>
                              <div style={{ fontSize: 8, color: "gold" }}>
                                {t.tournament}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {modal.type === "HIRE_COACH" && (
                <div className="modal-content">
                  <h3>Negociar com {modal.data.name}</h3>
                  <label>Salário Semanal (₣)</label>
                  <input
                    className="input-field"
                    type="number"
                    id="c_salary"
                    defaultValue={modal.data.salary}
                  />

                  <label>Duração (Temporadas)</label>
                  <select className="input-field" id="c_contract">
                    <option value="1">1 Temporada</option>
                    <option value="2">2 Temporadas</option>
                    <option value="3">3 Temporadas</option>
                  </select>

                  <label>Multa Rescisória (₣)</label>
                  <input
                    className="input-field"
                    type="number"
                    id="c_clause"
                    defaultValue={modal.data.salary * 10}
                  />

                  <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                    <button
                      className="btn btn-green"
                      onClick={() => {
                        const s = document.getElementById("c_salary").value;
                        const c = document.getElementById("c_contract").value;
                        const cl = document.getElementById("c_clause").value;
                        handleSendCoachOffer(modal.data.id, s, c, cl);
                        setModal(null);
                      }}
                    >
                      ENVIAR PROPOSTA
                    </button>
                    <button
                      className="btn btn-red"
                      onClick={() => setModal(null)}
                    >
                      CANCELAR
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
