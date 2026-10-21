import { COMPANY_TYPES } from "../game/COMPANY_TYPES.js";
import { generateAttributes } from "../game/generateAttributes.js";
import { db } from "../services/firebase.js";
import { saveSession } from "../services/session.js";

export function createAccountsActions(context, actions) {
  const {
    setLoading,
    teams,
    players,
    companies,
    coaches,
    papers,
    journalists,
    setUser,
    setScreen,
  } = context;

  const login = async (loginId, loginPass, type) => {
    setLoading(true);
    try {
      let foundUser = null;
      let foundType = "";

      // 1. LOGIN VIA MODAL (Quando clica no card)
      if (type === "TEAM" || type === "USER") {
        const t = teams.find(
          (x) => x.id === loginId && x.password === loginPass,
        );
        if (t) {
          foundUser = t;
          foundType = "USER";
        }
      } else if (type === "PLAYER") {
        const p = players.find(
          (x) => x.id === loginId && x.password === loginPass,
        );
        if (p) {
          foundUser = p;
          foundType = "PLAYER";
        }
      } else if (type === "COMPANY") {
        const c = companies.find(
          (x) => x.id === loginId && x.password === loginPass,
        );
        if (c) {
          foundUser = c;
          foundType = "COMPANY";
        }
      } else if (["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(type)) {
        const c = coaches.find(
          (x) => x.id === loginId && x.password === loginPass,
        );
        if (c) {
          foundUser = c;
          foundType = c.type;
        }
      }
      // --- VERIFICAÇÃO DE IMPRENSA (MODAL) ---
      else if (type === "PRESS" || type === "PAPER") {
        const paper = papers.find(
          (x) => x.id === loginId && x.password === loginPass,
        );
        if (paper) {
          foundUser = paper;
          foundType = "PRESS";
        }
      } else if (type === "PRESS_WORKER" || type === "JOURNALIST") {
        const j = journalists.find(
          (x) => x.id === loginId && x.password === loginPass,
        );
        if (j) {
          const myPaper = papers.find((p) => p.id === j.newspaperId);
          foundUser = { ...j, paperName: myPaper?.name };
          foundType = "PRESS_WORKER";
        }
      }

      // 2. LOGIN MANUAL (Digitando ID e Senha na tela inicial)
      else {
        // Tenta achar em Times
        let t = teams.find(
          (x) =>
            (x.id === loginId || x.name === loginId) &&
            x.password === loginPass,
        );
        if (t) {
          foundUser = t;
          foundType = "USER";
        }

        // Tenta achar em Jogadores
        if (!foundUser) {
          let p = players.find(
            (x) =>
              (x.id === loginId || x.name === loginId) &&
              x.password === loginPass,
          );
          if (p) {
            foundUser = p;
            foundType = "PLAYER";
          }
        }

        // Tenta achar em Comissão (Técnicos, Médicos, etc)
        if (!foundUser) {
          let c = coaches.find(
            (x) =>
              (x.id === loginId || x.name === loginId) &&
              x.password === loginPass,
          );
          if (c) {
            foundUser = c;
            foundType = c.type;
          }
        }

        // Tenta achar em Empresas
        if (!foundUser) {
          let c = companies.find(
            (x) =>
              (x.id === loginId || x.name === loginId) &&
              x.password === loginPass,
          );
          if (c) {
            foundUser = c;
            foundType = "COMPANY";
          }
        }

        // --- VERIFICAÇÃO DE IMPRENSA (MANUAL) ---
        if (!foundUser) {
          let paper = papers.find(
            (x) =>
              (x.id === loginId || x.name === loginId) &&
              x.password === loginPass,
          );
          if (paper) {
            foundUser = paper;
            foundType = "PRESS";
          }
        }

        if (!foundUser) {
          let j = journalists.find(
            (x) =>
              (x.id === loginId || x.name === loginId) &&
              x.password === loginPass,
          );
          if (j) {
            const myPaper = papers.find((p) => p.id === j.newspaperId);
            foundUser = { ...j, paperName: myPaper?.name };
            foundType = "PRESS_WORKER";
          }
        }

        // Tenta Admin
        if (loginId === "admin" && loginPass === "0102") {
          foundUser = { id: "admin", name: "Admin" };
          foundType = "ADMIN";
        }
      }

      // 3. FINALIZA O LOGIN
      if (foundUser) {
        if (foundUser.status === "PENDING") {
          alert("Conta em análise pela Federação. Aguarde aprovação.");
        } else if (foundUser.status === "BLOCKED") {
          alert("Conta bloqueada.");
        } else {
          setUser({ type: foundType, data: foundUser });
          saveSession({ type: foundType, data: foundUser });

          // Redireciona para a tela correta
          if (foundType === "COACH") setScreen("COACH_DASH");
          else if (foundType === "DOCTOR") setScreen("DOCTOR_DASH");
          else if (foundType === "ASSISTANT") setScreen("ASSISTANT_DASH");
          else if (foundType === "SCOUT") setScreen("SCOUT_DASH");
          else if (foundType === "COMPANY") setScreen("COMPANY_DASH");
          else if (foundType === "PLAYER") setScreen("PLAYER_DASH");
          else if (foundType === "PRESS" || foundType === "PRESS_WORKER")
            setScreen("PRESS_DASH"); // Redireciona Imprensa
          else setScreen("HOME");
        }
      } else {
        alert("ID ou Senha incorretos!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro no login: " + error.message);
    }
    setLoading(false);
  };

  const loginAdmin = () => {
    setUser({
      type: "ADMIN",
      data: {
        id: "admin",
        name: "FEDERAÇÃO (ADM)",
        balance: 0,
        logo: null,
        stadiumLevel: 1,
        serie: "ADM",
      },
    });
    setScreen("HOME");
  };

  const createTeam = async (name, bal, serie, pass, logo, estado) => {
    if (!estado) return alert("Escolha um Estado!");
    if (teams.find((t) => t.name.toLowerCase() === name.toLowerCase()))
      return alert("Nome em uso!");
    await db.collection("teams").add({
      name,
      balance: parseFloat(bal),
      serie,
      estado,
      password: pass,
      stadiumLevel: 1,
      logo: logo || null,
      status: "PENDING",
      stats: { pts: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, cards: 0 },
      stateStats: { pts: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0 }, // Stats separadas para o Estadual
    });
    alert("Clube fundado! Aguarde aprovação da Federação.");
  };

  const createPlayerAccount = async (data) => {
    if (!data.name || !data.password || !data.instagram)
      return alert("Preencha todos os campos!");
    setLoading(true);
    try {
      // Regra: Linha começa com 45, Goleiro com 60
      const baseOvr = data.position === "GOL" ? 60 : 45;

      // Gera atributos balanceados baseados nesse OVR e Posição
      const newAttrs = generateAttributes(data.position, baseOvr);

      await db.collection("players").add({
        name: data.name,
        instagram: data.instagram, // Salva o @ para o Admin ver
        position: data.position,
        password: data.password,
        overall: baseOvr,
        attributes: newAttrs,
        teamId: "FREE", // Vai direto para os passes livres
        status: "PENDING", // Fica invisível até o admin aprovar
        balance: 0,
        salary: 1500, // Salário base
        value: 40000, // Valor de passe de base
        contract: 0,
        mood: "😐",
        fame: 0,
        stats: {
          goals: 0,
          assists: 0,
          tackles: 0,
          saves: 0,
          yellows: 0,
          reds: 0,
        },
      });

      alert(
        "✅ Inscrição enviada!\nA Federação avaliará seu Instagram em breve. Assim que aprovado, você aparecerá no mercado de Agentes Livres.",
      );
      window.location.reload();
    } catch (e) {
      alert("Erro ao criar: " + e.message);
      setLoading(false);
    }
  };

  const createStaff = async (data) => {
    if (!data.name || !data.password || !data.role)
      return alert("Preencha todos os campos obrigatórios!");
    setLoading(true);
    try {
      const newId = `staff_${Date.now()}`;

      await db
        .collection("users")
        .doc(newId)
        .set({
          id: newId,
          name: data.name,
          password: data.password,
          type: data.role, // 'COACH', 'DOCTOR', 'SCOUT', 'ASSISTANT'
          level: 1,
          xp: 0,
          salary: 2500,
          affinities: [data.affinity || "Geral"],
          pendingPerks: 0,
          pendingAffinity: 0,
          teamId: "FREE", // Começa sem time (Agente Livre)
          status: "ACTIVE", // APROVAÇÃO AUTOMÁTICA!
          trainingsLeft: 2,
          clause: 50000,
          perks: [],
          face: data.face || null, // Salva a foto redimensionada
          createdAt: Date.now(),
        });

      const roleNames = {
        COACH: "Técnico",
        DOCTOR: "Médico",
        SCOUT: "Olheiro",
        ASSISTANT: "Auxiliar",
      };
      alert(
        `✅ Licença de ${roleNames[data.role]} gerada com sucesso!\nVocê já está ativo nos Agentes Livres. Pode fazer o login!`,
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar perfil profissional.");
      setLoading(false);
    }
  };

  const createNewspaper = async (name, pass, owner) => {
    await db
      .collection("newspapers")
      .add({ name, password: pass, ownerName: owner, status: "PENDING" });
    alert("Jornal criado! Aguarde Federação.");
  };

  const createJournalist = async (name, pass, paperId) => {
    await db
      .collection("journalists")
      .add({ name, password: pass, newspaperId: paperId, status: "PENDING" });
    alert("Conta criada! Aguarde seu Chefe.");
  };

  const createCompany = async (f) => {
    if (!f.n || !f.p) return alert("Preencha tudo!");
    await db
      .collection("companies")
      .add({
        name: f.n,
        owner: f.owner,
        password: f.p,
        companyType: f.type,
        balance: COMPANY_TYPES[f.type].start,
        status: "PENDING",
      });
    alert("Solicitação enviada! Aguarde a Federação.");
  };
  return {
    login,
    loginAdmin,
    createTeam,
    createPlayerAccount,
    createStaff,
    createNewspaper,
    createJournalist,
    createCompany,
  };
}
