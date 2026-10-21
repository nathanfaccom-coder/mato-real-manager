import { guardedBatch, guardedUpdate } from "../services/guardedWrites.js";
import { firebase } from "../services/firebase.js";
import { db } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";

export function createFinanceActions(context, actions) {
  const { user, setLoading, setModal } = context;
  const postNews = (...args) => actions.postNews(...args);
  const handleHospitalDonation = async (player, amount) => {
    if (!user.data || user.data.balance < amount)
      return alert("Saldo insuficiente!");
    if (!Number.isFinite(amount) || amount <= 0)
      return alert("Valor inválido.");

    // 1. TRAVA: Já doou para este jogador?
    const myDonations = player.donors || {};
    if (myDonations[user.data.id]) {
      return alert(
        "🛑 GESTO JÁ REALIZADO!\nVocê já contribuiu para o tratamento atual deste jogador. Aguarde a recuperação ou a cirurgia para ajudar novamente.",
      );
    }

    // 2. TRAVA: Empresas só pagam até 1% da cirurgia MAIS CARA disponível
    if (user.type === "COMPANY") {
      const tetoMaximo = 15000000; // Custo da cirurgia mais cara (Robótica)
      const limiteEmpresa = tetoMaximo * 0.01; // Restrito a 1%
      if (amount > limiteEmpresa) {
        return alert(
          `🚫 LIMITE EMPRESARIAL!\nPelas leis de Mato Real, empresas podem doar no máximo ${fmt(limiteEmpresa)} (1% do teto cirúrgico) por procedimento para evitar monopólio.`,
        );
      }
    }

    const donorRef =
      user.type === "PLAYER"
        ? db.collection("players").doc(user.data.id)
        : user.type === "USER"
          ? db.collection("teams").doc(user.data.id)
          : db.collection("companies").doc(user.data.id);
    const b = guardedBatch(db, [
      { ref: donorRef, expected: { balance: user.data.balance } },
      {
        ref: db.collection("players").doc(player.id),
        expected: { donors: player.donors },
      },
    ]);

    b.update(donorRef, {
      balance: firebase.firestore.FieldValue.increment(-amount),
    });

    // 3. Grava a doação e o nome do doador no perfil do jogador
    const donationObj = {
      [user.data.id]: { name: user.data.name, val: amount, date: Date.now() },
    };

    b.update(db.collection("players").doc(player.id), {
      hospitalFund: firebase.firestore.FieldValue.increment(amount),
      donors: { ...myDonations, ...donationObj },
    });

    try {
      await b.commit();
    } catch (error) {
      alert(error.message);
      return;
    }
    alert(
      `🙏 DOAÇÃO CONFIRMADA!\nObrigado, ${user.data.name}. Seus ${fmt(amount)} foram enviados para o fundo hospitalar.`,
    );
  };

  const handleFinanceApprove = async (req) => {
    setLoading(true);
    const reqRef = db.collection("financeRequests").doc(req.id);
    const b = guardedBatch(db, [
      {
        ref: reqRef,
        expected: {
          status: req.status,
          amount: req.amount,
          type: req.type,
          teamId: req.teamId,
        },
      },
    ]);
    let announcement = null;

    try {
      if (!Number.isFinite(Number(req.amount)) || Number(req.amount) <= 0)
        throw new Error("Valor inválido.");
      if (!["INJECTION", "SPONSORSHIP"].includes(req.type))
        throw new Error("Tipo de solicitação inválido.");
      // TIPO 1: INJEÇÃO (Dinheiro na hora, uma vez só)
      if (req.type === "INJECTION") {
        const teamRef = db.collection("teams").doc(req.teamId);
        b.update(teamRef, {
          balance: firebase.firestore.FieldValue.increment(Number(req.amount)),
        });
        b.delete(reqRef); // Remove o pedido

        announcement = `💰 **INJEÇÃO FINANCEIRA**\nA Federação aportou ${fmt(req.amount)} no caixa do ${req.teamName}.`;
      }

      // TIPO 2: PATROCÍNIO (Cria um contrato semanal)
      else if (req.type === "SPONSORSHIP") {
        const sponsRef = db.collection("sponsorships").doc();
        // Cria o patrocínio com ID de empresa 'FEDERACAO' para identificarmos depois
        b.set(sponsRef, {
          teamId: req.teamId,
          teamName: req.teamName,
          companyId: "FEDERACAO",
          companyName: "FEDERAÇÃO (Governo)",
          value: parseFloat(req.amount),
          status: "ACTIVE",
        });
        b.delete(reqRef); // Remove o pedido

        announcement = `🤝 **PATROCÍNIO ESTATAL**\nO ${req.teamName} fechou contrato com a Federação.\nValor: ${fmt(req.amount)}/semana.`;
      }

      await b.commit();
      if (announcement)
        postNews(announcement, "admin").catch((error) => console.warn(error));
      alert("Solicitação Aprovada com Sucesso!");
    } catch (e) {
      alert("Erro ao aprovar: " + e.message);
    }
    setLoading(false);
  };

  const updateBalance = async (teamId, newBal) => {
    await db
      .collection("teams")
      .doc(teamId)
      .update({ balance: parseFloat(newBal) });
    alert("Atualizado!");
  };

  const withdrawMoney = async (amount, reason) => {
    const val = parseFloat(amount.replace(",", "."));
    if (!Number.isFinite(val) || val <= 0) return alert("Valor inválido!");
    if (user.data.balance < val) return alert("Saldo insuficiente!");
    try {
      await guardedUpdate(
        db,
        db.collection("teams").doc(user.data.id),
        { balance: user.data.balance },
        { balance: firebase.firestore.FieldValue.increment(-val) },
      );
    } catch (error) {
      alert(error.message);
      return;
    }
    postNews(
      `💸 **SAÍDA DE CAIXA**\nO **${user.data.name}** retirou ${fmt(val)}.\n📝 Motivo: ${reason}`,
      "money-minus",
    );
    setModal(null);
  };
  return {
    handleHospitalDonation,
    handleFinanceApprove,
    updateBalance,
    withdrawMoney,
  };
}
