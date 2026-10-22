import { COMPANY_TYPES } from "../game/COMPANY_TYPES.js";
import { fmt } from "../game/fmt.js";
import { STADIUM_DB } from "../game/STADIUM_DB.js";
import { calculateSocios } from "../game/calculateSocios.js";
import { firebase } from "../services/firebase.js";
import { db } from "../services/firebase.js";
import { DEFAULT_PRIZES } from "../game/DEFAULT_PRIZES.js";

export function createAdministrationActions(context, actions) {
  const {
    setModal,
    conf,
    setLoading,
    players,
    teams,
    companies,
    sps,
    coaches,
  } = context;
  const postNews = (...args) => actions.postNews(...args);
  const adminAction = async (act, data) => {
    // --- ABRIR EDITOR DE PREMIAÇÕES ---
    if (act === "EDIT_PRIZES") {
      setModal({ type: "EDIT_PRIZES", data: conf.prizes || DEFAULT_PRIZES });
      return;
    }
    //FIM

    // --- 1. ABRIR/FECHAR MERCADO ---
    if (act === "MARKET") {
      db.collection("config").doc("system").update({ marketOpen: data });
      postNews(data ? "📢 JANELA ABERTA" : "🔒 JANELA FECHADA", "infra");
    }
    if (act === "VARZEA") {
      db.collection("config").doc("system").update({ varzeaOpen: data });
      postNews(
        data
          ? "🔓 **INSCRIÇÕES ABERTAS!**\nA Várzea voltou a aceitar novos times!"
          : "🛑 **INSCRIÇÕES ENCERRADAS!**\nO limite de times na Várzea foi atingido. Apenas na próxima temporada!",
        "infra",
      );
    }

    // --- 2. VIRADA DE SEMANA ---
    if (act === "WEEK") {
      if (
        !confirm(
          "⚠️ VIRAR SEMANA?\n\n1. Pagar Salários (+)\n2. Cobrar Imposto Jogador (3%)\n3. Recuperar Energia (100%)\n4. Empresas, Técnicos e XP",
        )
      )
        return;

      setLoading(true);
      const b = db.batch();

      // 2.1. JOGADORES (Salário, Imposto, Energia)
      players.forEach((p) => {
        if (p.teamId && p.teamId !== "FREE") {
          if (teams.some((t) => t.id === p.teamId)) {
            const currentBal = parseFloat(p.balance) || 0;
            const salary = parseFloat(p.salary) || 0;
            const tax = currentBal * 0.03;
            const healthCost = p.healthPlan ? p.healthPlan.cost || 0 : 0;
            // --- PAGAMENTO DO PATROCÍNIO PESSOAL (GAROTO PROPAGANDA) ---
            let sponsorIncome = 0;
            if (p.personalSponsor) {
              const compId = p.personalSponsor.companyId;
              const comp = companies.find((c) => c.id === compId);
              const sponVal = parseFloat(p.personalSponsor.value) || 0;

              // Se a empresa existe e tem dinheiro
              if (
                comp &&
                comp.status === "ACTIVE" &&
                (comp.balance || 0) >= sponVal
              ) {
                sponsorIncome = sponVal;
                b.update(db.collection("companies").doc(compId), {
                  balance: firebase.firestore.FieldValue.increment(-sponVal),
                });
              } else {
                // Empresa faliu ou não tem saldo: Quebra de contrato automática
                b.update(db.collection("players").doc(p.id), {
                  personalSponsor: firebase.firestore.FieldValue.delete(),
                  mood: "😡",
                });
                db.collection("news").add({
                  text: `📉 **CALOTE!** A empresa **${p.personalSponsor.companyName}** não teve fundos para pagar o patrocínio de **${p.name}** e o contrato foi rompido!`,
                  type: "press",
                  date: Date.now(),
                  likes: [],
                });
              }
            }

            const finalBalance =
              currentBal + salary + sponsorIncome - tax - healthCost;
            const xpTotal = (p.xp || 0) + (p.pendingXP || 0);

            b.update(db.collection("players").doc(p.id), {
              balance: finalBalance,
              energy: 100,
              xp: xpTotal,
              pendingXP: 0,
            });
          }
        }
      });

      // 2.2. TIMES (Salários, Patrocínios, BANCO e RELATÓRIO)
      teams.forEach((t) => {
        const currentBal = parseFloat(t.balance) || 0;

        // --- RECEITAS ---
        const myPlayers = players.filter((p) => p.teamId === t.id);
        const income = sps
          .filter((s) => s.teamId === t.id && s.status === "ACTIVE")
          .reduce((a, s) => a + parseFloat(s.value), 0);
        const serieBonuses = {
          A: 650000,
          B: 500000,
          C: 400000,
          D: 300000,
          VARZEA: 100000,
        };
        const cotaFederacao = serieBonuses[t.serie || "VARZEA"] || 100000;
        const activeSocios = calculateSocios(t, myPlayers);
        const socioIncome = activeSocios * (t.socioPrice || 40);
        const receitasCaixa = cotaFederacao + income + socioIncome;

        // --- DESPESAS ---
        const wages = myPlayers.reduce(
          (a, p) => a + (parseFloat(p.salary) || 0),
          0,
        );
        const staffWages = coaches
          .filter((c) => c.teamId === t.id && c.status === "ACTIVE")
          .reduce((a, c) => a + (parseFloat(c.salary) || 0), 0);
        const healthCost = t.healthPlan ? t.healthPlan.cost || 0 : 0;
        const stadiumLvl = t.stadiumLevel || 1;
        const maintCost = STADIUM_DB[stadiumLvl]
          ? STADIUM_DB[stadiumLvl].maint
          : 0;

        let updates = {};
        let bankLoanPayment = 0;
        let stadiumLoanPayment = 0;
        let interest = 0;

        // Investimentos (Rende 2% mas fica preso no banco)
        if (t.bankInvestment && t.bankInvestment.amount > 0) {
          const currentInv = t.bankInvestment.amount;
          interest = currentInv * 0.02;
          const newLocked = Math.max(
            0,
            (t.bankInvestment.weeksLocked || 0) - 1,
          );
          updates.bankInvestment = {
            amount: currentInv + interest,
            weeksLocked: newLocked,
          };
        }

        // Empréstimo Normal
        if (t.bankLoan && t.bankLoan.installments > 0) {
          bankLoanPayment = t.bankLoan.weeklyPayment;
          const remainingInstallments = t.bankLoan.installments - 1;
          if (remainingInstallments <= 0)
            updates.bankLoan = firebase.firestore.FieldValue.delete();
          else
            updates.bankLoan = {
              ...t.bankLoan,
              installments: remainingInstallments,
            };
        }

        // Financiamento de Estádio
        if (t.stadiumLoan && t.stadiumLoan.installments > 0) {
          stadiumLoanPayment = t.stadiumLoan.weeklyPayment;
          const remainingInstallments = t.stadiumLoan.installments - 1;
          if (remainingInstallments <= 0)
            updates.stadiumLoan = firebase.firestore.FieldValue.delete();
          else
            updates.stadiumLoan = {
              ...t.stadiumLoan,
              installments: remainingInstallments,
            };
        }

        const totalDespesas =
          wages +
          staffWages +
          healthCost +
          maintCost +
          bankLoanPayment +
          stadiumLoanPayment;

        // NOVO SALDO DO CLUBE
        updates.balance = currentBal + receitasCaixa - totalDespesas;

        // --- GERAR O RELATÓRIO DO DIÁRIO OFICIAL ---
        let reportMsg = `🟢 RECEITAS:\n`;
        reportMsg += `+ Federação/TV: ${fmt(cotaFederacao)}\n`;
        if (socioIncome > 0)
          reportMsg += `+ Sócios-Torcedores: ${fmt(socioIncome)}\n`;
        if (income > 0) reportMsg += `+ Patrocinadores: ${fmt(income)}\n`;

        reportMsg += `\n🔴 DESPESAS:\n`;
        if (wages > 0) reportMsg += `- Salários (Elenco): ${fmt(wages)}\n`;
        if (staffWages > 0)
          reportMsg += `- Salários (Comissão): ${fmt(staffWages)}\n`;
        if (healthCost > 0)
          reportMsg += `- Convênio Médico: ${fmt(healthCost)}\n`;
        if (maintCost > 0)
          reportMsg += `- Manutenção Arena: ${fmt(maintCost)}\n`;
        if (bankLoanPayment > 0)
          reportMsg += `- Parcela Empréstimo: ${fmt(bankLoanPayment)}\n`;
        if (stadiumLoanPayment > 0)
          reportMsg += `- Parcela Arena: ${fmt(stadiumLoanPayment)}\n`;

        const balancoCaixa = receitasCaixa - totalDespesas;
        reportMsg += `\n⚖️ RESULTADO FINAL: ${balancoCaixa >= 0 ? "Lucro de " + fmt(balancoCaixa) : "Prejuízo de " + fmt(balancoCaixa)}`;

        if (interest > 0)
          reportMsg += `\n\n📈 Sua Renda Fixa rendeu +${fmt(interest)} (O valor continua aplicado no Banco).`;

        // Salva o relatório no CT do time
        let newLogs = [...(t.trainingLogs || [])];
        newLogs.unshift({
          date: Date.now(),
          type: "📊 BALANÇO FINANCEIRO",
          report: reportMsg,
        });
        if (newLogs.length > 15) newLogs.pop();
        updates.trainingLogs = newLogs;

        b.update(db.collection("teams").doc(t.id), updates);
      });

      // 2.3. GERAR NOTÍCIA GLOBAL DA COTA DA FEDERAÇÃO
      const newsRef = db.collection("news").doc();
      b.set(newsRef, {
        text: "💰 **COTAS DA FEDERAÇÃO PAGAS!**\nO apoio financeiro semanal foi depositado. Diretorias, confiram o Extrato no Diário Oficial do Clube (CT) para ver os lucros e despesas de sua equipe.",
        date: Date.now(),
        type: "money",
        likes: [],
      });

      // 2.3. EMPRESAS (Imposto)
      companies.forEach((c) => {
        if (c.status === "ACTIVE") {
          const currentBal = parseFloat(c.balance) || 0;
          const type = c.companyType || "COMERCIO";
          const tax = (COMPANY_TYPES[type] || {}).tax || 50000;
          b.update(db.collection("companies").doc(c.id), {
            balance: currentBal - tax,
          });
        }
      });

      // 2.4. COMISSÃO TÉCNICA (Pagar Conta Pessoal e Resetar Treino)
      const coachSnap = await db
        .collection("users")
        .where("type", "in", ["COACH", "DOCTOR", "SCOUT", "ASSISTANT"])
        .get();

      coachSnap.docs.forEach((doc) => {
        const c = doc.data();
        let updates = { trainingsLeft: 2 };

        if (c.teamId && c.teamId !== "FREE") {
          const teamExists = teams.some((t) => t.id === c.teamId);

          if (teamExists) {
            // Atenção: Não descontamos do time aqui porque já foi descontado no relatório detalhado acima!
            // Apenas depositamos na conta do profissional
            const currentCoachBal = parseFloat(c.balance) || 0;
            updates.balance = currentCoachBal + parseFloat(c.salary);
          } else {
            updates.teamId = "FREE";
            updates.contract = 0;
          }
        }
        b.update(db.collection("users").doc(doc.id), updates);
      });

      // 2.5. DÍVIDAS
      const ds = await db.collection("debts").get();
      ds.docs.forEach((doc) => {
        const d = doc.data();
        const buyerExists = teams.some((t) => t.id === d.buyerId);
        const sellerExists = teams.some((t) => t.id === d.sellerId);

        if (!buyerExists || !sellerExists) {
          b.delete(doc.ref);
        } else if (d.weeksRemaining > 0) {
          b.update(db.collection("teams").doc(d.buyerId), {
            balance: firebase.firestore.FieldValue.increment(-d.installmentVal),
          });
          b.update(db.collection("teams").doc(d.sellerId), {
            balance: firebase.firestore.FieldValue.increment(d.installmentVal),
          });
          if (d.weeksRemaining - 1 === 0) {
            b.delete(doc.ref);
            postNews(
              `✅ **DÍVIDA QUITADA**\n${d.buyerName} terminou de pagar ${d.playerName}.`,
              "money",
            );
          } else {
            b.update(doc.ref, { weeksRemaining: d.weeksRemaining - 1 });
            postNews(
              `💳 **PARCELA PAGA**\n${d.buyerName} pagou a parcela (${d.weeksRemaining}x) de ${d.playerName}.`,
              "money-minus",
            );
          }
        }
      });

      try {
        await b.commit();
        alert("Semana processada! Salários pagos e treinos resetados.");
      } catch (error) {
        alert("Erro: " + error.message);
      }
      setLoading(false);
    }

    // --- 3. VIRADA DE TEMPORADA (Simples - Mantida por compatibilidade, mas o botão avançado usará a nova) ---
    if (act === "SEASON") {
      if (
        !confirm(
          "⚠️ VIRAR TEMPORADA?\n\n1. Evoluir Atributos (XP)\n2. Envelhecer Contratos\n3. Processar Retornos\n4. Envelhecer Técnicos",
        )
      )
        return;

      setLoading(true);
      const b = db.batch();

      // 3.1. JOGADORES (Evolução e Contratos)
      players.forEach((p) => {
        let u = {};

        // 3.1.1. SISTEMA DE EVOLUÇÃO DE ATRIBUTOS
        const totalXP = (p.xp || 0) + (p.pendingXP || 0);
        const pointsToDistribute = Math.floor(totalXP / 100);
        const remainderXP = totalXP % 100;

        if (p.attributes && pointsToDistribute !== 0) {
          let newAttrs = { ...p.attributes };
          const keys = Object.keys(newAttrs);
          const absPoints = Math.abs(pointsToDistribute);
          const isPositive = pointsToDistribute > 0;

          for (let i = 0; i < absPoints; i++) {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            if (isPositive) {
              if (newAttrs[randomKey] < 99) newAttrs[randomKey]++;
            } else {
              if (newAttrs[randomKey] > 1) newAttrs[randomKey]--;
            }
          }

          u.attributes = newAttrs;
          const vals = Object.values(newAttrs);
          const newOverall = Math.round(
            vals.reduce((acc, curr) => acc + curr, 0) / vals.length,
          );

          u.overall = newOverall;
          u.xp = remainderXP;
          u.pendingXP = 0;
        } else {
          u.xp = 0;
          u.pendingXP = 0;
        }

        // 3.1.2. ENVELHECIMENTO DE CONTRATOS (JOGADORES)
        let nc = (parseInt(p.contract) || 0) - 1;
        if (nc < 0) nc = 0;
        u.contract = nc;

        // 3.1.3. FIM DE VÍNCULO / EMPRÉSTIMO
        if (nc === 0 && p.loanMeta && p.loanMeta.ownerId) {
          const ownerId = p.loanMeta.ownerId;
          const ownerTeam = teams.find((t) => t.id === ownerId);

          if (p.loanMeta.hasBuyOption && p.loanMeta.buyOpt > 0) {
            const currentTeam = teams.find((t) => t.id === p.teamId);
            const offerRef = db.collection("offers").doc();
            b.set(offerRef, {
              type: "COMPRA_DEFINITIVA",
              playerId: p.id,
              playerName: p.name,
              buyerId: p.teamId,
              buyerName: currentTeam?.name || "Clube Atual",
              sellerId: ownerId,
              recipientId: p.teamId,
              value: p.loanMeta.buyOpt,
              status: "PENDING",
              description: `🏁 **FIM DE EMPRÉSTIMO**\nDeseja exercer a opção de compra de **${p.name}** por ${fmt(p.loanMeta.buyOpt)}?\nCaso recuse, o jogador retornará ao clube de origem.`,
              date: Date.now(),
              isLoanOption: true,
            });
            u.status = "INTRANSFERIVEL";
          } else {
            let contractWithDonoRemaining =
              (parseInt(p.loanMeta.originalContract) || 1) - 1;

            if (contractWithDonoRemaining <= 0) {
              const renewalReqRef = db.collection("offers").doc();
              b.set(renewalReqRef, {
                type: "RENOVACAO_URGENTE",
                playerId: p.id,
                playerName: p.name,
                buyerId: ownerId,
                buyerName: ownerTeam?.name || "Clube de Origem",
                sellerId: "SISTEMA",
                recipientId: ownerId,
                status: "PENDING",
                description: `⚠️ **URGENTE: FIM DE VÍNCULO**\nO empréstimo de **${p.name}** acabou e ele está sem contrato com você.`,
                date: Date.now(),
              });
              u.teamId = ownerId;
              u.contract = 0;
              u.status = "INTRANSFERIVEL";
            } else {
              u.teamId = ownerId;
              u.contract = contractWithDonoRemaining;
              u.status = "NAO_A_VENDA";

              const notifRef = db.collection("offers").doc();
              b.set(notifRef, {
                type: "NOTIFICACAO",
                playerId: p.id,
                playerName: p.name,
                buyerName: "Sistema",
                recipientId: ownerId,
                status: "PENDING",
                description: `🔙 **RETORNO DE EMPRÉSTIMO**\nO jogador **${p.name}** retornou ao seu elenco.\n\n📄 Contrato Restante: ${contractWithDonoRemaining} temporada(s).`,
                date: Date.now(),
              });
              postNews(
                `🔙 **RETORNO**\n${p.name} voltou ao ${ownerTeam?.name} (${contractWithDonoRemaining} anos rest.).`,
                "transfer",
              );
            }
            u.loanMeta = firebase.firestore.FieldValue.delete();
          }
        } else if (nc === 0 && (!p.loanMeta || !p.loanMeta.ownerId)) {
          if (
            p.preContract &&
            teams.some((t) => t.id === p.preContract.teamId)
          ) {
            u.teamId = p.preContract.teamId;
            u.contract = 2;
            u.status = "NAO_A_VENDA";
            u.preContract = firebase.firestore.FieldValue.delete();
          } else {
            u.teamId = "FREE";
            u.status = "VENDA";
            u.mood = "😐";
            u.loanMeta = firebase.firestore.FieldValue.delete();
          }
        }

        b.update(db.collection("players").doc(p.id), u);
      });

      // 3.2. ENVELHECER CONTRATOS DE TÉCNICOS
      const coachSnap = await db
        .collection("users")
        .where("type", "==", "COACH")
        .get();
      coachSnap.docs.forEach((doc) => {
        const c = doc.data();
        if (c.teamId && c.teamId !== "FREE") {
          const newContract = (c.contract || 1) - 1;

          if (newContract <= 0) {
            b.update(db.collection("users").doc(doc.id), {
              teamId: "FREE",
              contract: 0,
              salary: 2500,
            });
          } else {
            b.update(db.collection("users").doc(doc.id), {
              contract: newContract,
            });
          }
        }
      });

      try {
        await b.commit();
        alert("Temporada virada! Jogadores e técnicos atualizados.");
      } catch (e) {
        alert("Erro: " + e.message);
      }
      setLoading(false);
      postNews(
        "💪 **PRÉ-TEMPORADA**\nOs jogadores treinaram e contratos foram renovados!",
        "season",
      );
    }
  };

  const resetDatabase = async () => {
    const senha = prompt(
      "⚠️ PERIGO: Isso apagará TODOS os dados do jogo. Digite a senha master para confirmar:",
    );
    if (senha !== "0102") return;

    if (
      !confirm(
        "TEM CERTEZA? Todos os times, jogadores e finanças sumirão para sempre!",
      )
    )
      return;

    setLoading(true);
    const collections = [
      "teams",
      "players",
      "users",
      "news",
      "offers",
      "sponsorships",
      "sales",
      "debts",
      "financeRequests",
      "products",
      "companies",
      "journalists",
      "newspapers",
      "nationalTeams",
      "nationalMatches",
      "nationalCompetitions",
      "nationalWindows",
    ];

    try {
      let batches = [db.batch()];
      let count = 0;

      for (const col of collections) {
        const snapshot = await db.collection(col).get();
        snapshot.docs.forEach((doc) => {
          if (count >= 450) {
            batches.push(db.batch());
            count = 0;
          }
          batches[batches.length - 1].delete(doc.ref);
          count++;
        });
      }
      for (let b of batches) {
        await b.commit();
      }

      alert("💥 BANCO DE DADOS RESETADO! O sistema irá reiniciar.");
      window.location.reload();
    } catch (e) {
      alert("Erro ao resetar: " + e.message);
    }
    setLoading(false);
  };

  const approveTeam = async (teamId, finalBalance) => {
    await db
      .collection("teams")
      .doc(teamId)
      .update({ status: "ACTIVE", balance: parseFloat(finalBalance) });
    const t = teams.find((x) => x.id === teamId);
    postNews(
      `🛡️ **NOVO CLUBE!**\nO **${t.name}** foi aprovado na Série ${t.serie}.`,
      "infra",
    );
    alert("Aprovado!");
  };

  const deleteTeam = async (teamId) => {
    if (!confirm("⚠️ PERIGO: Excluir time e jogadores?")) return;
    const batch = db.batch();
    batch.delete(db.collection("teams").doc(teamId));
    const snap = await db
      .collection("players")
      .where("teamId", "==", teamId)
      .get();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    postNews("🚫 **CLUBE EXTINTO**\nUm time encerrou atividades.", "infra");
  };

  const deletePaper = async (id) => {
    if (!confirm("Excluir Jornal e demitir jornalistas?")) return;
    const batch = db.batch();
    batch.delete(db.collection("newspapers").doc(id));
    const js = await db
      .collection("journalists")
      .where("newspaperId", "==", id)
      .get();
    js.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    alert("Jornal fechado!");
  };

  const deleteJournalist = async (id) => {
    if (!confirm("Demitir Jornalista?")) return;
    await db.collection("journalists").doc(id).delete();
    alert("Demitido!");
  };
  return {
    adminAction,
    resetDatabase,
    approveTeam,
    deleteTeam,
    deletePaper,
    deleteJournalist,
  };
}
