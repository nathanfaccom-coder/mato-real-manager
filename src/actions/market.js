import { processBotDecision } from "../game/processBotDecision.js";
import { purchaseProduct } from "../services/purchases.js";
import { PROD_CATS } from "../game/PROD_CATS.js";
import { fmt } from "../game/fmt.js";
import { firebase } from "../services/firebase.js";
import { db } from "../services/firebase.js";

export function createMarketActions(context, actions) {
  const {
    coaches,
    user,
    setModal,
    products,
    sps,
    companies,
    buyingRef,
    setLoading,
    players,
    teams,
  } = context;
  const postNews = (...args) => actions.postNews(...args);
  const handleSendCoachOffer = async (coachId, salary, contract, clause) => {
    const coach = coaches.find((c) => c.id === coachId);
    if (!coach) return;

    await db.collection("offers").add({
      type: "COACH_OFFER",
      coachId: coachId, // ID Fixo do Profissional
      staffType: coach.type, // NOVO: Marca se é Técnico, Médico, etc.
      recipientId: coachId, // Quem deve responder agora
      senderId: user.data.id, // Quem enviou (Time)
      teamId: user.data.id,
      teamName: user.data.name,
      coachName: coach.name,
      salary: parseFloat(salary),
      contract: parseInt(contract), // Tempo em temporadas
      clause: parseFloat(clause), // Multa rescisória
      status: "PENDING",
      createdAt: Date.now(),
    });
    setModal(null);
    alert(`Proposta enviada para ${coach.name}!`);
  };

  const handleCounterCoachOffer = async (
    offer,
    newSalary,
    newContract,
    newClause,
  ) => {
    // Regra: Só nível 2+ negocia
    if (user.data.level < 2)
      return alert("Apenas profissionais Nível 2+ podem negociar valores!");

    await db
      .collection("offers")
      .doc(offer.id)
      .update({
        salary: parseFloat(newSalary),
        contract: parseInt(newContract),
        clause: parseFloat(newClause),
        status: "COUNTERED", // Marca como contra-proposta
        recipientId: offer.teamId, // Devolve a bola para o Presidente
        senderId: user.data.id, // Marca que foi o funcionário que mandou
      });
    alert("Contra-proposta enviada ao clube!");
  };

  const handleFinalizeCoachContract = async (offer) => {
    const teamId = offer.teamId;
    const coachId =
      offer.coachId ||
      (offer.recipientId === teamId ? offer.senderId : offer.recipientId);
    const staffType = offer.staffType || "COACH"; // Identifica o cargo

    // Verifica saldo do time
    const teamDoc = await db.collection("teams").doc(teamId).get();
    const teamData = teamDoc.data();
    if (teamData.balance < offer.salary)
      return alert("O time não tem saldo para pagar as luvas (1º salário)!");

    const b = db.batch();

    // 1. Demite o antigo APENAS se ele for da MESMA PROFISSÃO! (Médico substitui Médico)
    const oldStaff = coaches.find(
      (c) =>
        c.teamId === teamId && c.status === "ACTIVE" && c.type === staffType,
    );
    if (oldStaff) {
      b.update(db.collection("users").doc(oldStaff.id), {
        teamId: "FREE",
        contract: 0,
      });
    }

    // 2. Atualiza o Profissional com o NOVO CONTRATO
    const luvas = parseFloat(offer.luvas) || 0;

    b.update(db.collection("users").doc(coachId), {
      teamId: teamId,
      salary: parseFloat(offer.salary),
      contract: parseInt(offer.contract),
      clause: parseFloat(offer.clause),
      balance: firebase.firestore.FieldValue.increment(luvas), // Paga as luvas ao profissional
    });

    // 3. Paga Luvas e o 1º Salário e desconta do time
    b.update(db.collection("teams").doc(teamId), {
      balance: teamData.balance - offer.salary - luvas,
    });

    // 4. Apaga a oferta (negócio fechado)
    b.delete(db.collection("offers").doc(offer.id));

    await b.commit();
    alert(
      `Contrato assinado! ${offer.coachName} agora integra o Staff do ${offer.teamName}.`,
    );
  };

  const saveProduct = async (p) => {
    const price = parseFloat(p.price);
    const payload = {
      name: p.name,
      price,
      img: p.img,
      desc: p.desc,
      cat: p.cat || "CHUTEIRA",
      companyId: user.data.id,
      power: p.power || 0, // Salva o poder

      // --- CORREÇÃO AQUI: SALVAR O ESTOQUE ---
      stock: parseInt(p.stock) || 0,
    };

    if (p.id) {
      const old = products.find((x) => x.id === p.id);
      // Se baixou o preço, avisa no jornal
      if (old && price < old.price) {
        postNews(
          `🚨 **PROMOÇÃO!**\nA **${user.data.name}** baixou o preço de **${p.name}**!\nDe: ${fmt(old.price)} ➝ Por: ${fmt(price)}`,
          "biz",
        );
      }

      delete payload.companyId; // Não precisa atualizar o ID da empresa
      await db.collection("products").doc(p.id).update(payload);
    } else {
      // Criação de novo produto
      await db.collection("products").add(payload);
      postNews(
        `🛍️ **NOVIDADE**\nA **${user.data.name}** lançou: **${p.name}** (${PROD_CATS[payload.cat]}) por ${fmt(price)}.`,
        "biz",
      );
    }
  };

  const requestSponsorship = async (companyId, val) => {
    if (
      sps.find((s) => s.companyId === companyId && s.teamId === user.data.id)
    ) {
      return alert(
        "Já existe uma negociação ou contrato ativo com esta empresa.",
      );
    }
    const comp = companies.find((c) => c.id === companyId);
    await db.collection("sponsorships").add({
      companyId,
      companyName: comp.name,
      teamId: user.data.id,
      teamName: user.data.name,
      value: parseFloat(val),
      status: "PENDING",
    });
    alert("Proposta enviada para a empresa!");
  };

  const processSponsorship = async (s, status) => {
    if (status === "REJECTED" || status === "CANCELLED") {
      if (
        confirm(
          status === "REJECTED" ? "Recusar proposta?" : "Cancelar contrato?",
        )
      ) {
        await db.collection("sponsorships").doc(s.id).delete();
      }
    } else if (status === "ACTIVE") {
      await db
        .collection("sponsorships")
        .doc(s.id)
        .update({ status: "ACTIVE" });
      postNews(
        `🤝 **NOVO PATROCÍNIO**\nA **${user.data.name}** agora patrocina o **${s.teamName}**!`,
        "biz",
      );
    }
  };

  const buyProduct = async (prod, seller, giftTarget = null) => {
    if (buyingRef.current) return;
    const price = Number(prod.price);
    if (!Number.isFinite(price) || price < 0) return alert("Preço inválido.");
    if (
      !confirm(
        giftTarget
          ? `Comprar ${prod.name} como PRESENTE para ${giftTarget.name} por ${fmt(price)}?`
          : `Comprar ${prod.name} por ${fmt(price)}?`,
      )
    )
      return;
    buyingRef.current = true;
    setLoading(true);
    try {
      const result = await purchaseProduct(db, firebase.firestore.FieldValue, {
        user,
        productId: prod.id,
        sellerId: seller.id,
        giftTarget,
        expectedPrice: price,
      });
      let msg = giftTarget
        ? `✅ Presente enviado com sucesso para ${giftTarget.name}!`
        : "✅ Compra realizada com sucesso!";
      if (!giftTarget && result.fameBonus > 0)
        msg += `\n🌟 FAMA +${result.fameBonus}`;
      alert(msg);
    } catch (error) {
      alert("Erro ao processar compra: " + error.message);
    } finally {
      buyingRef.current = false;
      setLoading(false);
    }
  };

  const handleAcceptCoachOffer = async (offer) => {
    const teamId = offer.teamId;
    const coach = user.data;

    // Verifica se o time ainda tem dinheiro (pode ter gasto enquanto a proposta estava pendente)
    const teamDoc = await db.collection("teams").doc(teamId).get();
    const teamData = teamDoc.data();

    if (teamData.balance < offer.value) {
      return alert(
        "O time não tem mais saldo para te contratar! Proposta cancelada.",
      );
    }

    const b = db.batch();

    // 1. Se o time já tinha técnico, demite o antigo
    const oldCoach = coaches.find(
      (c) => c.teamId === teamId && c.status === "ACTIVE",
    );
    if (oldCoach) {
      b.update(db.collection("users").doc(oldCoach.id), { teamId: "FREE" });
    }

    // 2. Se o técnico atual já tinha time, sai do time antigo
    if (coach.teamId && coach.teamId !== "FREE") {
      // Lógica opcional: Multa rescisória? Vamos simplificar e só sair.
    }

    // 3. Atualiza o Técnico (Contratado)
    b.update(db.collection("users").doc(coach.id), {
      teamId: teamId,
      salary: offer.value, // Atualiza o salário para o valor da proposta
    });

    // 4. Cobra as "Luvas" (1º Salário) do time
    b.update(db.collection("teams").doc(teamId), {
      balance: teamData.balance - offer.value,
    });

    // 5. Apaga a oferta (e outras ofertas pendentes desse time para técnicos, se quiser limpar)
    b.delete(db.collection("offers").doc(offer.id));

    await b.commit();
    alert(`Parabéns! Você agora é técnico do ${offer.teamName}!`);
  };

  const handleRejectCoachOffer = async (offer) => {
    await db.collection("offers").doc(offer.id).delete();
    alert("Proposta recusada.");
  };

  const sendOffer = async (target, type, value, swapIds, con, meta, old) => {
    const v = parseFloat(value) || 0;
    const contractYears = parseInt(con) || 1;
    const actingTeamName = user.data.name;
    const targetPlayerName = target.name;
    const finalSal = parseFloat(meta.newSalary) || 0;
    const role = meta.role || "ROTACAO";

    const isStaff = ["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(
      target.type,
    );

    // ==========================================
    // ROTA ESPECIAL: NEGOCIAÇÃO COM A COMISSÃO TÉCNICA
    // ==========================================
    if (isStaff) {
      try {
        setLoading(true);
        const luvas = parseFloat(meta.signingBonus) || 0;
        const db = firebase.firestore();

        // Verifica se é uma contra-proposta (Alguém respondendo)
        if (old && old.id) {
          await db.collection("offers").doc(old.id).update({
            salary: finalSal,
            contract: contractYears,
            luvas: luvas,
            status: "PENDING", // Volta para o outro lado avaliar
            recipientId: target.id, // Envia para o profissional
            senderId: user.data.id,
          });
        } else {
          // É uma Proposta Nova ou Renovação inicial
          await db.collection("offers").add({
            type: "COACH_OFFER",
            coachId: target.id,
            staffType: target.type,
            recipientId: target.id,
            senderId: user.data.id,
            teamId: user.data.id,
            teamName: actingTeamName,
            coachName: target.name,
            salary: finalSal,
            contract: contractYears,
            clause: finalSal * 10, // Multa padrão
            luvas: luvas, // Bônus de Assinatura
            status: "PENDING",
            createdAt: Date.now(),
          });
        }

        setLoading(false);
        setModal(null);
        return alert(
          `📋 Proposta formal enviada para ${target.name}! Aguarde a resposta na sua Caixa de Entrada.`,
        );
      } catch (e) {
        setLoading(false);
        return alert("Erro ao enviar proposta para a Comissão Técnica.");
      }
    }
    // ==========================================

    // --- 1. TRAVA DO LIMITE DE 7 BOTS (MERCADO GLOBAL) ---
    if (target.isNPC && user.type === "USER") {
      const myTeamBots = players.filter(
        (p) => p.teamId === user.data.id && p.isNPC,
      ).length;

      // 1. Trava se já tiver 7 e estiver tentando comprar de fora
      if (myTeamBots >= 7 && target.teamId !== user.data.id) {
        alert(
          `🚫 LIMITE DA BASE ATINGIDO!\nVocê já tem 7/7 BOTS no elenco. Você só poderá contratar outro quando 1 deles sair do elenco.`,
        );
        return; // Aborta a compra!
      }

      // 2. Balão de fala EXATO que você pediu! (Aparece antes de enviar a proposta)
      if (target.teamId !== user.data.id) {
        // Só avisa se o Bot não for do próprio time
        if (
          !confirm(
            `⚠️ AVISO DA BASE\n\nAtualmente você tem ${myTeamBots}/7 BOTS no elenco.\nTem certeza que quer enviar esta proposta para ${target.name}?\n\nAssim que você completar 7 de 7, você só poderá contratar outro quando 1 deles sair do elenco.`,
          )
        ) {
          return; // O usuário clicou em Cancelar e desistiu de enviar a proposta
        }
      }
    }

    // --- LÓGICA DE DESTINATÁRIO INTELIGENTE ---
    let recipientId;
    const isFreeAgent = target.teamId === "FREE" || !target.teamId;

    if (old && old.id) {
      if (old.type === "RENOVACAO_URGENTE") recipientId = old.playerId;
      else if (old.sellerAccepted === true)
        recipientId = user.data.id === old.buyerId ? old.playerId : old.buyerId;
      else
        recipientId =
          user.data.id === old.buyerId
            ? old.sellerId === "FREE" || !old.sellerId
              ? old.playerId
              : old.sellerId
            : old.buyerId;
    } else {
      if (type === "PRE_CONTRATO" || type === "RENOVACAO")
        recipientId = target.id;
      else recipientId = isFreeAgent ? target.id : target.teamId;
    }

    // --- 2. INTELIGÊNCIA DO BOT (Apenas se a proposta for DIRETAMENTE para ele) ---
    if (target.isNPC && user.type === "USER" && recipientId === target.id) {
      const teamObj = teams.find((t) => t.id === user.data.id);
      const botResponse = processBotDecision(
        { meta: { newSalary: finalSal } },
        teamObj,
        target,
      );

      if (botResponse.decision === "REJECT") {
        alert(botResponse.message);
        return; // 🛑 ABORTA: Bot não gostou, fim de papo.
      } else if (botResponse.decision === "COUNTER") {
        if (
          confirm(
            `${botResponse.message}\n\nVocê aceita pagar ${fmt(botResponse.counterValue)} de salário para fechar negócio AGORA?`,
          )
        ) {
          meta.newSalary = botResponse.counterValue; // Atualiza forçado se o humano aceitou
        } else {
          alert("Negociação cancelada. O jogador encerrou as conversas.");
          return; // 🛑 ABORTA: O humano não quis pagar o que o Bot pediu.
        }
      } else if (botResponse.decision === "ACCEPT") {
        alert(botResponse.message);
      }

      // 🚀 SE CHEGOU AQUI: O BOT DISSE SIM! VAMOS ASSINAR O CONTRATO NA HORA!
      try {
        setLoading(true);
        const db = firebase.firestore();
        const b = db.batch();
        const luvas = parseFloat(meta.signingBonus) || 0;

        // Se o clube não tiver dinheiro para as luvas, bloqueia
        if (teamObj.balance < luvas) {
          setLoading(false);
          return alert(
            `Seu clube não tem ${fmt(luvas)} no caixa para pagar as Luvas de Assinatura. O negócio melou!`,
          );
        }

        // Desconta Luvas do Clube
        if (luvas > 0)
          b.update(db.collection("teams").doc(user.data.id), {
            balance: firebase.firestore.FieldValue.increment(-luvas),
          });

        // Paga as luvas ao Bot e atualiza o contrato
        b.update(db.collection("players").doc(target.id), {
          teamId: user.data.id,
          status: "NAO_A_VENDA",
          contract: contractYears,
          salary: parseFloat(meta.newSalary),
          role: role,
          balance: firebase.firestore.FieldValue.increment(luvas),
          history: firebase.firestore.FieldValue.arrayUnion({
            date: Date.now(),
            from: isFreeAgent ? "AGENTE LIVRE" : "Clube Anterior",
            to: user.data.name,
            type: type,
            value: 0,
          }),
        });

        // Se era uma negociação antiga rolando, apaga a pendência
        if (old && old.id) b.delete(db.collection("offers").doc(old.id));

        await b.commit();
        postNews(
          `🤝 **NOVA CONTRATAÇÃO!**\nO Atleta da Base **${target.name}** aceitou os termos e assinou com o **${user.data.name}**!`,
          "transfer",
        );
        setLoading(false);
        setModal(null);
        return alert(`Negócio fechado! ${target.name} já está no seu elenco.`);
      } catch (error) {
        setLoading(false);
        return alert("Erro ao assinar com o Bot: " + error.message);
      }
    }
    // --- FIM DA INTELIGÊNCIA DO BOT ---

    // --- SISTEMA DE NEGOCIAÇÃO HUMANA (PADRÃO) ---
    try {
      let details = `💰 Taxa: ${fmt(v)}\n`;
      if (meta.installments > 1)
        details += `📅 Parcelamento: ${meta.installments}x de ${fmt(v / meta.installments)}\n`;
      if (meta.sellOn > 0) details += `📈 Revenda: ${meta.sellOn}%\n`;

      if (type === "PRE_CONTRATO") {
        details = `⚖️ **LEI BOSMAN (PRÉ-CONTRATO)**\nO jogador virá a custo zero no início da próxima temporada.\n`;
      } else if (type === "RENOVACAO") {
        details = `📝 **PROPOSTA DE RENOVAÇÃO**\nA diretoria ofereceu um novo contrato.\n`;
      }

      details += `📝 Contrato: ${contractYears} anos\n`;
      details += `💵 Salário Sugerido: ${fmt(finalSal)}/sem\n`;
      details += `👔 Papel: ${role}`;

      const pl = {
        playerId: target.id,
        playerName: targetPlayerName,
        buyerId: old?.buyerId || user.data.id,
        buyerName: old?.buyerName || actingTeamName,
        sellerId: target.teamId || old?.sellerId || "FREE",
        recipientId: recipientId,
        type: old?.type === "RENOVACAO_URGENTE" ? "RENOVACAO" : type,
        value: v,
        offerContract: contractYears,
        description: details,
        status: "PENDING",
        sellerAccepted: old ? old.sellerAccepted || false : false,
        meta: {
          ...meta,
          newSalary: finalSal,
          signingBonus: parseFloat(meta.signingBonus) || 0,
          role: role,
          installments: parseInt(meta.installments) || 1,
          sellOn: parseInt(meta.sellOn) || 0,
          hasBuyOption: meta.hasBuyOption || false,
        },
        date: Date.now(),
      };

      const b = db.batch();
      if (old && old.id) b.delete(db.collection("offers").doc(old.id));

      b.set(db.collection("offers").doc(), pl);
      await b.commit();

      const msgHead =
        old && old.id
          ? "🔄 CONTRAPROPOSTA"
          : type === "PRE_CONTRATO"
            ? "⚖️ PRÉ-CONTRATO"
            : type === "RENOVACAO"
              ? "📝 RENOVAÇÃO"
              : "💼 NOVA OFERTA";

      postNews(
        `${msgHead}\n**${actingTeamName}** enviou uma proposta para **${targetPlayerName}**!\n\n${details}`,
        "transfer",
      );

      setModal(null);
      alert("Enviado com sucesso! Aguarde a resposta.");
    } catch (e) {
      console.error("Erro no Firebase:", e);
      alert("Erro técnico ao gravar no banco de dados.");
    }
  };

  const acceptOffer = async (o) => {
    try {
      // --- 1. LÓGICA DE NOTIFICAÇÃO (APENAS LEITURA) ---
      if (o.type === "NOTIFICACAO") {
        await db.collection("offers").doc(o.id).delete();
        alert("Confirmado!");
        return;
      }

      // --- LÓGICA DE PATROCÍNIO PESSOAL (GAROTO PROPAGANDA) ---
      if (o.type === "PERSONAL_SPONSOR_OFFER") {
        if (
          !confirm(
            `Aceitar o patrocínio da ${o.companyName} por ${fmt(o.value)} semanais?\nSeu rosto aparecerá na loja deles!`,
          )
        )
          return;

        const b = db.batch();

        // Grava o patrocínio no jogador
        b.update(db.collection("players").doc(o.recipientId), {
          personalSponsor: {
            companyId: o.senderId,
            companyName: o.companyName,
            value: o.value,
            clause: o.value * 4, // Multa de 4 semanas
          },
        });
        b.delete(db.collection("offers").doc(o.id));
        await b.commit();

        postNews(
          `📸 **NOVA ESTRELA!**\n**${o.playerName}** é o mais novo garoto propaganda da marca **${o.companyName}**!`,
          "biz",
        );
        alert("Contrato assinado! Verifique seu Perfil.");
        return;
      }

      // --- 2. LÓGICA DE PRÉ-CONTRATO (V1.52.9) ---
      // (Mantido para não perder a funcionalidade de assinar com jogadores em fim de contrato)
      if (o.type === "PRE_CONTRATO") {
        if (
          !confirm(
            `Confirmar assinatura de Pré-Contrato com ${o.buyerName}?\nVocê se juntará a eles na próxima temporada.`,
          )
        )
          return;

        const b = db.batch();

        // Grava o pré-contrato no perfil do jogador
        b.update(db.collection("players").doc(o.playerId), {
          preContract: {
            teamId: o.buyerId,
            teamName: o.buyerName,
            salary: o.meta.newSalary,
            date: Date.now(),
          },
          mood: "🤩",
        });

        b.delete(db.collection("offers").doc(o.id));
        await b.commit();

        postNews(
          `📝 **PRÉ-CONTRATO ASSINADO**\n**${o.playerName}** assinou com o **${o.buyerName}** e se apresentará na próxima temporada!`,
          "transfer",
        );
        alert("Pré-contrato assinado com sucesso!");
        return;
      }

      const buy = teams.find((t) => t.id === o.buyerId);
      const p = players.find((x) => x.id === o.playerId);
      const isFreeAgent = !o.sellerId || o.sellerId === "FREE";
      const sel = isFreeAgent ? null : teams.find((t) => t.id === o.sellerId);

      // --- 3. CASO ESPECIAL: COMPRA DEFINITIVA (EXERCER OPÇÃO DE EMPRÉSTIMO) ---
      if (o.type === "COMPRA_DEFINITIVA") {
        if (!buy || !p) return alert("Erro: Dados incompletos.");
        if (buy.balance < o.value)
          return alert(`Saldo insuficiente! Necessário: ${fmt(o.value)}`);
        if (
          !confirm(`Exercer opção de compra de ${p.name} por ${fmt(o.value)}?`)
        )
          return;

        const b = db.batch();
        b.update(db.collection("teams").doc(buy.id), {
          balance: buy.balance - o.value,
        });
        if (sel)
          b.update(db.collection("teams").doc(sel.id), {
            balance: sel.balance + o.value,
          });

        b.update(db.collection("players").doc(p.id), {
          teamId: buy.id,
          loanMeta: firebase.firestore.FieldValue.delete(),
          status: "NAO_A_VENDA",
          contract: 3,
          history: firebase.firestore.FieldValue.arrayUnion({
            date: Date.now(),
            from: sel ? sel.name : "EMPRÉSTIMO",
            to: buy.name,
            type: "COMPRA_DEFINITIVA",
            value: o.value,
          }),
        });
        b.delete(db.collection("offers").doc(o.id));
        await b.commit();
        postNews(
          `✅ **OPÇÃO EXERCIDA**\nO **${buy.name}** contratou **${p.name}** em definitivo!`,
          "transfer",
        );
        alert("Compra realizada!");
        return;
      }

      // =================================================================================
      // LÓGICA DE NEGOCIAÇÃO INTELIGENTE (ACEITE BIDIRECIONAL)
      // =================================================================================

      const iAmBuyer = user.type === "USER" && user.data.id === o.buyerId;
      const iAmSeller = user.type === "USER" && user.data.id === o.sellerId;
      const iAmPlayer = user.type === "PLAYER" || (isFreeAgent && !iAmBuyer);

      // --- FASE 1: ACORDO ENTRE CLUBES ---
      if (!isFreeAgent && !o.sellerAccepted && (iAmSeller || iAmBuyer)) {
        if (iAmBuyer) {
          if (
            !confirm(
              `Aceitar a pedida do clube vendedor (${fmt(o.value)}) e negociar com o jogador?`,
            )
          )
            return;
        } else {
          if (
            !confirm(
              "Aceitar os valores propostos? O jogador decidirá o contrato agora.",
            )
          )
            return;
        }

        await db.collection("offers").doc(o.id).update({
          recipientId: o.playerId,
          sellerAccepted: true,
          status: "PENDING",
        });

        postNews(
          `💰 **ACORDO ENTRE CLUBES**\n${buy.name} e ${sel.name} chegaram a um acordo por **${p.name}**. Falta o "Sim" do atleta!`,
          "transfer",
        );
        alert(
          "Acordo financeiro selado! A proposta foi enviada para o jogador.",
        );
        return;
      }

      // --- FASE 2: ACORDO FINAL ---
      const readyForContract = isFreeAgent || o.sellerAccepted;

      if (readyForContract && (iAmPlayer || iAmBuyer)) {
        if (!buy || !p) return alert("Erro: Dados incompletos.");

        const valorEntrada =
          o.meta?.installments > 1 ? o.value / o.meta.installments : o.value;
        const luvas = parseFloat(o.meta?.signingBonus) || 0;
        const custoTotalImediato = valorEntrada + luvas;

        if (buy.balance < custoTotalImediato) {
          return alert(
            `Saldo insuficiente no caixa do comprador!\nNecessário: ${fmt(custoTotalImediato)}`,
          );
        }

        if (iAmBuyer) {
          if (
            !confirm(
              `Aceitar a pedida salarial do jogador e fechar a contratação?\nCusto Imediato: ${fmt(custoTotalImediato)}`,
            )
          )
            return;
        } else {
          if (!confirm(`Deseja assinar com o ${buy.name}?`)) return;
        }

        // --- EXECUÇÃO DA TRANSFERÊNCIA ---
        const b = db.batch();

        // 1. Paga o Clube Vendedor (se houver) E processa cláusula de revenda ANTIGA
        if (sel) {
          let valorParaVendedor = valorEntrada;

          // >>>> LÓGICA DE REVENDA (SELL-ON FEE) AUTOMÁTICA <<<<
          // Se o jogador tem uma cláusula salva, calcula a parte do antigo dono
          if (p.sellOnClause && p.sellOnClause.percentage > 0) {
            const beneficiaryId = p.sellOnClause.beneficiaryId;

            // Só executa se o beneficiário ainda existir e não for o mesmo que está comprando
            if (beneficiaryId && beneficiaryId !== buy.id) {
              const shareAmount =
                (valorEntrada * p.sellOnClause.percentage) / 100;

              // Desconta do vendedor atual
              valorParaVendedor -= shareAmount;

              // Paga ao dono original (Beneficiário)
              b.update(db.collection("teams").doc(beneficiaryId), {
                balance: firebase.firestore.FieldValue.increment(shareAmount),
              });
            }
          }

          // Paga o vendedor (já descontado a revenda, se houve)
          b.update(db.collection("teams").doc(sel.id), {
            balance: sel.balance + valorParaVendedor,
          });

          // Cria dívida se parcelado
          if (o.meta?.installments > 1) {
            const debtRef = db.collection("debts").doc();
            b.set(debtRef, {
              buyerId: buy.id,
              buyerName: buy.name,
              sellerId: sel.id,
              sellerName: sel.name,
              playerName: p.name,
              installmentVal: valorEntrada,
              weeksRemaining: parseInt(o.meta.installments) - 1,
              date: Date.now(),
            });
          }
        }

        // 2. Desconta do Comprador
        b.update(db.collection("teams").doc(buy.id), {
          balance: buy.balance - custoTotalImediato,
        });

        // 3. Paga Luvas ao Jogador
        if (luvas > 0) {
          b.update(db.collection("players").doc(p.id), {
            balance: firebase.firestore.FieldValue.increment(luvas),
          });
        }

        // 4. Atualiza o Jogador (Move de time e Grava NOVA Cláusula)

        // Prepara a NOVA cláusula se foi negociada agora (0 a 80%)
        const newSellOnClause =
          o.meta && o.meta.sellOn > 0 && sel
            ? {
                beneficiaryId: sel.id,
                percentage: o.meta.sellOn,
              }
            : firebase.firestore.FieldValue.delete(); // Se não tem revenda nova, apaga a antiga para limpar o histórico

        b.update(db.collection("players").doc(p.id), {
          teamId: buy.id,
          status: "NAO_A_VENDA",
          contract:
            o.type === "EMPRESTIMO"
              ? parseInt(o.meta.loanDuration) || 1
              : parseInt(o.offerContract) || 1,
          salary: parseFloat(o.meta?.newSalary) || p.salary,
          role: o.meta?.role || "ROTACAO",
          loanMeta:
            o.type === "EMPRESTIMO"
              ? {
                  ownerId: sel?.id,
                  salarySplit: o.meta.salarySplit || 100,
                  hasBuyOption: o.meta.hasBuyOption || false,
                  buyOpt: o.meta.buyOpt || 0,
                  originalContract: p.contract,
                }
              : null,
          // AQUI GRAVA A NOVA CLÁUSULA NO JOGADOR
          sellOnClause: newSellOnClause,
          history: firebase.firestore.FieldValue.arrayUnion({
            date: Date.now(),
            from: isFreeAgent
              ? "AGENTE LIVRE"
              : sel
                ? sel.name
                : "Desconhecido",
            to: buy.name,
            type: o.type,
            value: o.value,
          }),
        });

        // 5. Apaga a oferta e notifica
        b.delete(db.collection("offers").doc(o.id));
        await b.commit();

        const newsMsg = isFreeAgent
          ? `✍️ **ASSINOU!**\nO Agente Livre **${p.name}** é o novo reforço do **${buy.name}**!`
          : `🤝 **TRANSFERÊNCIA CONCLUÍDA**\n**${p.name}** assinou com o **${buy.name}**!`;

        postNews(newsMsg, "transfer");

        // Notificação extra se houve repasse de revenda
        if (sel && p.sellOnClause && p.sellOnClause.percentage > 0) {
          postNews(
            `💸 **CLÁUSULA DE REVENDA**\nUma parte da venda de **${p.name}** (${p.sellOnClause.percentage}%) foi repassada ao seu antigo clube formador.`,
            "money",
          );
        }

        alert("Negócio fechado com sucesso!");
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao processar o aceite: " + e.message);
    }
  };

  const rejectOffer = async (o) => {
    try {
      // --- CASO 1: RECUSA DE OPÇÃO DE COMPRA (FIM DE EMPRÉSTIMO) ---
      if (o.type === "COMPRA_DEFINITIVA" && o.isLoanOption) {
        const p = players.find((x) => x.id === o.playerId);
        const ownerId = o.sellerId;
        const ownerTeam = teams.find((t) => t.id === ownerId);

        if (
          !confirm(
            "Deseja recusar a compra? O jogador retornará ao clube de origem.",
          )
        )
          return;

        const b = db.batch();
        const pRef = db.collection("players").doc(p.id);

        // --- CORREÇÃO DE SEGURANÇA PARA DADOS ANTIGOS ---
        let originalDuration = 0;

        if (p.loanMeta && p.loanMeta.originalContract) {
          originalDuration = parseInt(p.loanMeta.originalContract);
        } else {
          console.warn(
            "Contrato original não encontrado. Usando fallback de 6 anos.",
          );
          originalDuration = 6;
        }

        let remainingContract = originalDuration - 1;
        if (remainingContract < 0) remainingContract = 0;

        if (remainingContract <= 0) {
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
            description: `⚠️ **URGENTE: FIM DE CONTRATO**\nO empréstimo de **${p.name}** acabou e o contrato dele com você expirou.\n\nRenove ou libere para os passes livres.`,
            date: Date.now(),
          });

          b.update(pRef, {
            teamId: ownerId,
            loanMeta: firebase.firestore.FieldValue.delete(),
            status: "INTRANSFERIVEL",
            contract: 0,
          });

          postNews(
            `🔙 **RETORNO CRÍTICO**\nO empréstimo de ${p.name} acabou e o contrato expirou!`,
            "rumor",
          );
        } else {
          const notifRef = db.collection("offers").doc();
          b.set(notifRef, {
            type: "NOTIFICACAO",
            playerId: p.id,
            playerName: p.name,
            buyerName: "Sistema",
            recipientId: ownerId,
            status: "PENDING",
            description: `🔙 **RETORNO DE EMPRÉSTIMO**\nA opção de compra foi recusada.\n**${p.name}** voltou ao seu elenco.\n\n📄 Contrato Restante: ${remainingContract} temporada(s).`,
            date: Date.now(),
          });

          b.update(pRef, {
            teamId: ownerId,
            loanMeta: firebase.firestore.FieldValue.delete(),
            status: "NAO_A_VENDA",
            contract: remainingContract,
          });

          postNews(
            `🔙 **RETORNO**\n${p.name} retornou ao ${ownerTeam?.name} (${remainingContract} anos rest.).`,
            "transfer",
          );
        }

        b.delete(db.collection("offers").doc(o.id));
        await b.commit();
        alert("Opção recusada. Jogador devolvido ao clube de origem.");
        return;
      }

      // --- CASO 2: RECUSA DE RENOVAÇÃO URGENTE ---
      if (o.type === "RENOVACAO_URGENTE") {
        if (
          !confirm(
            "Tem certeza? O jogador perderá o vínculo com o clube e irá para os Agentes Livres.",
          )
        )
          return;

        const b = db.batch();
        b.update(db.collection("players").doc(o.playerId), {
          teamId: "FREE",
          status: "VENDA",
          mood: "😐",
          contract: 0,
        });
        b.delete(db.collection("offers").doc(o.id));
        await b.commit();

        postNews(
          `🆓 **AGENTE LIVRE**\nO vínculo de **${o.playerName}** expirou e ele está livre no mercado!`,
          "transfer",
        );
        alert("Jogador enviado para os Agentes Livres.");
        return;
      }

      // --- CASO 3: RECUSA NORMAL DE PROPOSTAS ---
      if (!confirm("Deseja recusar e encerrar esta negociação?")) return;
      await db.collection("offers").doc(o.id).delete();

      if (o.type !== "NOTIFICACAO") {
        postNews(
          `❌ **NEGOCIAÇÃO ENCERRADA**\nO acordo por **${o.playerName}** não avançou.`,
          "transfer",
        );
      }
    } catch (e) {
      console.error(e);
      alert("Erro técnico ao processar a recusa.");
    }
  };

  const renewContract = async (p) => {
    if (!p.teamId || p.teamId === "FREE")
      return alert("Jogadores livres assinam novos contratos, não renovam!");

    const cost = (parseFloat(p.value) || 1000000) * 0.1;
    if (user.data.balance < cost)
      return alert(
        `Saldo insuficiente para bônus de renovação (Custo: ${fmt(cost)})`,
      );

    if (
      !confirm(
        `Renovar com ${p.name}?\nCusto: ${fmt(cost)} (Este valor irá para o saldo do jogador)`,
      )
    )
      return;

    try {
      const b = db.batch();
      b.update(db.collection("teams").doc(user.data.id), {
        balance: firebase.firestore.FieldValue.increment(-cost),
      });
      b.update(db.collection("players").doc(p.id), {
        contract: (parseInt(p.contract) || 0) + 1,
        balance: firebase.firestore.FieldValue.increment(cost),
        status: "NAO_A_VENDA",
      });
      await b.commit();
      postNews(
        `📝 **RENOVAÇÃO**\nO **${user.data.name}** renovou com **${p.name}**!`,
        "transfer",
      );
      setModal(null);
    } catch (e) {
      alert("Erro ao renovar: " + e.message);
    }
  };

  const handlePlayerActions = async (type, p) => {
    const team = teams.find((t) => t.id === p.teamId);

    // 1. PEDIR TRANSFERÊNCIA
    if (type === "TRANSFER_REQUEST") {
      if (!team) return alert("Já és um Agente Livre!");
      if (p.status === "VENDA")
        return alert("Já estás na lista de transferências.");
      if (
        !confirm(
          `Tens a certeza que queres pedir para sair do ${team.name}? O adepto não vai gostar...`,
        )
      )
        return;

      await db.collection("players").doc(p.id).update({
        status: "VENDA",
        mood: "😡",
      });
      postNews(
        `💣 **CRISE NO ${team.name.toUpperCase()}!**\nO jogador **${p.name}** está insatisfeito e pediu para ser colocado na lista de transferências!`,
        "rumor",
      );
      alert("O pedido foi feito. O teu humor piorou.");
    }

    // 2. PEDIR AUMENTO
    if (type === "ASK_RAISE") {
      if (!team) return alert("Precisas de um clube para pedir aumento.");
      if (!confirm("Ir à imprensa pedir um aumento salarial?")) return;

      // Apenas lança a notícia para pressionar o dono
      postNews(
        `💰 **POLÉMICA**\n**${p.name}** declara publicamente: "Mereço ganhar mais no ${team.name}. Espero uma renovação em breve."`,
        "press",
      );
      alert("Declaração feita à imprensa! O presidente foi notificado.");
    }

    // 3. DECLARAR FELICIDADE (NOVO)
    if (type === "DECLARE_HAPPY") {
      if (!team) return alert("Precisas de um clube.");
      if (p.mood === "🤩") return alert("Já estás feliz!");

      await db.collection("players").doc(p.id).update({
        mood: "🤩",
        status: "NAO_A_VENDA", // Tira da lista de venda se estiver
      });
      postNews(
        `💙 **AMOR À CAMISA**\n**${p.name}** declarou: "Estou muito feliz no ${team.name} e quero fazer história aqui!"`,
        "press",
      );
      alert("Declaração feita! A torcida adorou.");
    }

    // 4. FICAR NEUTRO / RETIRAR PEDIDO (NOVO)
    if (type === "RESET_MOOD") {
      if (!team) return alert("Precisas de um clube.");

      await db.collection("players").doc(p.id).update({
        mood: "😐",
        status: "NAO_A_VENDA",
      });
      postNews(
        `🤝 **PAZES FEITAS**\n**${p.name}** retirou seu pedido de transferência e foca novamente no ${team.name}.`,
        "press",
      );
      alert("Voltaste ao normal. Clima apaziguado.");
    }
  };
  return {
    handleSendCoachOffer,
    handleCounterCoachOffer,
    handleFinalizeCoachContract,
    saveProduct,
    requestSponsorship,
    processSponsorship,
    buyProduct,
    handleAcceptCoachOffer,
    handleRejectCoachOffer,
    sendOffer,
    acceptOffer,
    rejectOffer,
    renewContract,
    handlePlayerActions,
  };
}
