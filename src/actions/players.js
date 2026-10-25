import { promptMoney } from '../money/promptMoney.jsx';
import { guardedBatch } from "../services/guardedWrites.js";
import { POS_TRAINING_MAP } from "../game/POS_TRAINING_MAP.js";
import { INJURIES_DB } from "../game/INJURIES_DB.js";
import { CT_DB } from "../game/CT_DB.js";
import { generateAttributes } from "../game/generateAttributes.js";
import { firebase } from "../services/firebase.js";
import { db } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";

export function createPlayersActions(context, actions) {
  const { user, teams, setLoading, setSales, setUser, setModal, players } =
    context;

  const handleFireCoach = async (coach) => {
    const team = user.data;
    const currentSalary = parseFloat(coach.salary) || 2500;
    const fine = currentSalary * 4; // Multa = 4 semanas de salário

    if (
      confirm(
        `Demitir ${coach.name}?\nVocê terá que pagar uma multa rescisória de ${fmt(fine)}.`,
      )
    ) {
      const teamBalance = parseFloat(team.balance) || 0;
      if (teamBalance < fine)
        return alert("Saldo insuficiente para pagar a rescisão!");

      const b = db.batch();

      // 1. Cobra a multa do time
      b.update(db.collection("teams").doc(team.id), {
        balance: teamBalance - fine,
      });

      // 2. Libera o profissional, zera o contrato, volta salário pro base e paga a multa a ele
      b.update(db.collection("users").doc(coach.id), {
        teamId: "FREE",
        contract: 0,
        salary: 2500,
        balance: firebase.firestore.FieldValue.increment(fine),
      });

      await b.commit();
      alert(`${coach.name} foi demitido e a multa de ${fmt(fine)} foi paga.`);
    }
  };

  const handleCoachSelfActions = async (action, coach) => {
    const team = teams.find((t) => t.id === coach.teamId);
    if (!team) return;

    // PEDIR AUMENTO
    if (action === "RAISE") {
      const ask = await promptMoney("Qual o novo salário semanal desejado?", coach.salary);
      if (!ask) return;
      const val = parseFloat(ask);
      if (val <= coach.salary)
        return alert("O valor deve ser maior que o atual.");

      await db.collection("offers").add({
        type: "COACH_RAISE",
        recipientId: team.id, // Vai para o Dono do Time
        senderId: coach.id,
        teamName: team.name,
        coachName: coach.name,
        currentSalary: coach.salary,
        requestedSalary: val,
        status: "PENDING",
        description: `💰 **PEDIDO DE AUMENTO**\nO técnico **${coach.name}** pede um reajuste salarial.\nAtual: ${fmt(coach.salary)} ➝ Pedido: ${fmt(val)}`,
        date: Date.now(),
      });
      alert("Pedido de aumento enviado à diretoria!");
    }

    // PEDIR PARA SAIR (AMIGÁVEL)
    if (action === "RESIGN_REQ") {
      if (!confirm("Enviar pedido de demissão amigável? O clube pode recusar."))
        return;
      await db.collection("offers").add({
        type: "COACH_RESIGN",
        recipientId: team.id,
        senderId: coach.id,
        teamName: team.name,
        coachName: coach.name,
        status: "PENDING",
        description: `👋 **PEDIDO DE DESLIGAMENTO**\nO técnico **${coach.name}** deseja rescindir o contrato amigavelmente (sem multa).`,
        date: Date.now(),
      });
      alert("Pedido de desligamento enviado!");
    }

    // PAGAR MULTA (SAÍDA IMEDIATA)
    if (action === "BUYOUT") {
      const clause = coach.clause || coach.salary * 10;
      if (coach.balance < clause)
        return alert(`Saldo insuficiente! Você precisa de ${fmt(clause)}.`);

      if (
        !confirm(
          `TEM CERTEZA? Você pagará ${fmt(clause)} do seu bolso para ficar livre agora.`,
        )
      )
        return;

      const b = db.batch();
      const currentCoachBal = parseFloat(coach.balance) || 0;
      const currentTeamBal = parseFloat(team.balance) || 0;

      // Tira do Técnico
      b.update(db.collection("users").doc(coach.id), {
        balance: currentCoachBal - clause,
        teamId: "FREE",
        contract: 0,
        salary: 2500, // Volta ao base
      });
      // Paga ao Time
      b.update(db.collection("teams").doc(team.id), {
        balance: currentTeamBal + clause,
      });

      await b.commit();
      alert("Multa paga! Você está livre no mercado.");
      window.location.reload();
    }
  };

  const handleCoachIndication = async (player, obs) => {
    // 1. Cria a notificação para o time
    await db.collection("offers").add({
      type: "COACH_SUGGESTION",
      teamId: user.data.teamId, // Vai para o time do técnico
      recipientId: user.data.teamId,
      senderId: user.data.id, // ID do técnico
      senderName: user.data.name,
      playerId: player.id,
      playerName: player.name,
      playerPos: player.position,
      playerOv: player.overall,
      playerVal: player.value,
      status: "PENDING",
      description: `💡 **INDICAÇÃO DO TÉCNICO**\n${user.data.name} sugere a contratação de **${player.name}** (${player.position}).\n\n📝 Obs: "${obs || "Sem observações"}"`,
      date: Date.now(),
    });
    alert("Indicação enviada para a diretoria!");
  };

  const handleCoachUseItem = async (item) => {
    // Verificações de segurança
    if (
      !user.data ||
      !["COACH", "DOCTOR", "SCOUT", "ASSISTANT"].includes(user.type)
    )
      return;
    // 1. Configuração do Dia e Toxicidade
    const today = new Date().toDateString();
    const lastDate = user.data.lastToxicityDate || "";
    // Se mudou o dia, reseta o contador de toxicidade para 0, senão mantém o atual
    const currentTox = lastDate === today ? user.data.toxicity || 0 : 0;

    // Pega a energia atual (se não tiver, assume 100)
    const currentEnergy =
      user.data.energy !== undefined ? user.data.energy : 100;

    // Trava: Se já estiver cheio, não deixa gastar o item
    if (currentEnergy >= 100)
      return alert("Sua energia já está cheia! Guarde o item para depois.");

    setLoading(true);

    try {
      const b = guardedBatch(db, [
        {
          ref: db.collection("sales").doc(item.id),
          expected: { buyerId: user.data.id },
        },
        {
          ref: db.collection("users").doc(user.data.id),
          expected: {
            energy: user.data.energy,
            toxicity: user.data.toxicity,
            fame: user.data.fame,
            equippedItem: user.data.equippedItem,
          },
        },
      ]);
      const coachRef = db.collection("users").doc(user.data.id);
      const itemRef = db.collection("sales").doc(item.id);

      // 2. Cálculo do Risco (Igual ao do Jogador)
      let outcome = "SUCCESS";

      // 3º Uso no dia: 40% de chance de passar mal
      if (currentTox === 2) {
        if (Math.random() < 0.4) outcome = "SICK";
      }
      // 4º Uso ou mais: 95% de chance de Vomitar (Perda total)
      else if (currentTox >= 3) {
        if (Math.random() < 0.95) outcome = "VOMIT";
      }

      // --- APLICAÇÃO DOS EFEITOS ---

      // CENÁRIO A: VÔMITO / INTOXICAÇÃO (Deu Ruim)
      if (outcome === "VOMIT" || outcome === "SICK") {
        // Penalidade: Zera a energia
        b.update(coachRef, {
          energy: 0,
          toxicity: currentTox + 1,
          lastToxicityDate: today,
        });
        b.delete(itemRef); // Consome o item
        await b.commit();

        // Atualiza visualmente na hora
        setSales((prev) => prev.filter((s) => s.id !== item.id));
        setUser((prev) => ({
          ...prev,
          data: { ...prev.data, energy: 0, toxicity: currentTox + 1 },
        }));

        alert(
          outcome === "VOMIT"
            ? "🤮 VÔMITO! Você comeu demais e seu estômago rejeitou tudo.\nResultado: Energia ZERADA."
            : "🤢 ENJOO FORTE! O item não caiu bem.\nResultado: Você precisou deitar e sua energia zerou.",
        );
      }

      // CENÁRIO B: SUCESSO (Deu Bom)
      else {
        const energyGain = parseInt(item.power) || 0;
        const newEnergy = Math.min(100, currentEnergy + energyGain); // Teto de 100%

        b.update(coachRef, {
          energy: newEnergy,
          toxicity: currentTox + 1,
          lastToxicityDate: today,
        });
        b.delete(itemRef); // Consome o item
        await b.commit();

        // Atualiza visualmente na hora
        setSales((prev) => prev.filter((s) => s.id !== item.id));
        setUser((prev) => ({
          ...prev,
          data: { ...prev.data, energy: newEnergy, toxicity: currentTox + 1 },
        }));

        // Feedback com Aviso
        if (currentTox === 1) {
          alert(
            `⚡ Energia recuperada: +${energyGain}% (Total: ${newEnergy}%)\n⚠️ CUIDADO: Foi seu 2º item hoje. O próximo tem risco de intoxicação.`,
          );
        } else if (currentTox >= 2) {
          alert(
            `⚡ Energia recuperada: +${energyGain}%\n⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`,
          );
        } else {
          alert(
            `⚡ Energia recuperada: +${energyGain}% (Total: ${newEnergy}%)`,
          );
        }
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao usar item: " + error.message);
    }

    setLoading(false);
  };

  const handleUseItem = async (item, action) => {
    if (!user.data || user.type !== "PLAYER") return;

    // 1. TRAVA A TELA (LOADING)
    setLoading(true);

    try {
      const b = guardedBatch(db, [
        {
          ref: db.collection("sales").doc(item.id),
          expected: { buyerId: user.data.id },
        },
        {
          ref: db.collection("players").doc(user.data.id),
          expected: {
            energy: user.data.energy,
            toxicity: user.data.toxicity,
            fame: user.data.fame,
            equippedItem: user.data.equippedItem,
          },
        },
      ]);
      const itemRef = db.collection("sales").doc(item.id);
      const playerRef = db.collection("players").doc(user.data.id);

      // AÇÃO 1: CONSUMIR (Energia + Sistema de Toxicidade)
      if (action === "CONSUME") {
        // --- NOVO: SISTEMA DE TOXICIDADE ---
        const today = new Date().toDateString();
        const lastDate = user.data.lastToxicityDate || "";
        // Se mudou o dia, reseta a toxicidade para 0, senão mantém a atual
        const currentTox = lastDate === today ? user.data.toxicity || 0 : 0;

        // 1. Bloqueio: Se já estiver intoxicado, não pode beber nada
        if (user.data.injury?.type === "INTOXICACAO") {
          alert(
            "🤢 VOCÊ ESTÁ INTOXICADO!\nSeu estômago não aceita nada. Espere o dia virar para melhorar.",
          );
          setLoading(false);
          return;
        }

        // 2. Cálculo do Risco
        let outcome = "SUCCESS";

        // 3º Uso no dia: 40% de chance de passar mal
        if (currentTox === 2) {
          if (Math.random() < 0.4) outcome = "SICK";
        }
        // 4º Uso ou mais: 95% de chance de Vomitar
        else if (currentTox >= 3) {
          if (Math.random() < 0.95) outcome = "VOMIT";
        }

        // --- APLICAÇÃO DOS EFEITOS ---

        // CENÁRIO A: VÔMITO (Perde Energia e Humor)
        if (outcome === "VOMIT") {
          b.update(playerRef, {
            energy: 0, // Zera energia
            mood: "😡", // Fica irritado
            toxicity: currentTox + 1,
            lastToxicityDate: today,
          });
          b.delete(itemRef);
          await b.commit();

          // Atualização Visual Local
          setSales((prev) => prev.filter((s) => s.id !== item.id));
          setUser((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              energy: 0,
              mood: "😡",
              toxicity: currentTox + 1,
            },
          }));

          alert(
            "🤮 VÔMITO!\n\nVocê consumiu demais! Seu corpo rejeitou tudo.\n\nEfeito: Energia ZERADA e Humor piorado.",
          );
          setLoading(false);
          return;
        }

        // CENÁRIO B: INTOXICAÇÃO (Lesão Leve Incurável)
        if (outcome === "SICK") {
          const sickInjury = {
            type: "INTOXICACAO",
            label: "Intoxicação Alimentar",
            games: 1,
            isIncurable: true, // Hospital não cura
          };

          b.update(playerRef, {
            injury: sickInjury,
            recoveryLeft: 1,
            toxicity: currentTox + 1,
            lastToxicityDate: today,
          });
          b.delete(itemRef);
          await b.commit();

          // Atualização Visual Local
          setSales((prev) => prev.filter((s) => s.id !== item.id));
          setUser((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              injury: sickInjury,
              toxicity: currentTox + 1,
            },
          }));

          alert(
            "🤢 INTOXICAÇÃO ALIMENTAR!\n\nSeu estômago não aguentou.\n\nEfeito: Você foi internado e terá que esperar melhorar naturalmente (1 dia).",
          );
          setLoading(false);
          return;
        }

        // CENÁRIO C: SUCESSO (Uso Normal)
        const energyGain = parseInt(item.power) || 0;
        const currentEnergy = user.data.energy || 0;

        if (energyGain > 0 && currentEnergy >= 100) {
          alert("Sua energia já está cheia!");
          setLoading(false);
          return;
        }

        const newEnergy = Math.min(100, currentEnergy + energyGain);

        // Atualiza Banco de Dados (Energia + Toxicidade)
        b.update(playerRef, {
          energy: newEnergy,
          toxicity: currentTox + 1,
          lastToxicityDate: today,
        });
        b.delete(itemRef);

        await b.commit();

        // Atualização Visual Imediata
        setSales((prev) => prev.filter((s) => s.id !== item.id));
        setUser((prev) => ({
          ...prev,
          data: { ...prev.data, energy: newEnergy, toxicity: currentTox + 1 },
        }));

        // Feedback com Aviso de Risco
        if (currentTox === 1) {
          alert(
            `⚡ Energia recuperada: +${energyGain}%\n⚠️ CUIDADO: Foi seu 2º energético hoje. O próximo tem risco de intoxicação.`,
          );
        } else if (currentTox >= 2) {
          alert(
            `⚡ Energia recuperada...\n⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`,
          );
        } else {
          alert(
            `⚡ Energia recuperada: +${energyGain}% (Total: ${newEnergy}%)`,
          );
        }
      }

      // AÇÃO 2: EQUIPAR (XP Boost) - MANTIDO IGUAL
      if (action === "EQUIP") {
        // 1. Grava no perfil do jogador (Movendo o item)
        b.update(playerRef, {
          equippedItem: {
            id: item.id,
            name: item.productName,
            cat: item.cat,
            power: parseInt(item.power) || 0,
            img: item.img,
          },
        });

        // 2. DELETA DA MOCHILA
        b.delete(itemRef);

        await b.commit();

        // 3. Atualiza visualmente
        setSales((prev) => prev.filter((s) => s.id !== item.id));

        alert(
          `🛡️ Item equipado: ${item.productName}\nEle será consumido automaticamente no próximo treino.`,
        );
      }
    } catch (error) {
      console.error("Erro ao usar item:", error);
      alert("Erro ao processar item. Tente novamente.");
    } finally {
      // 2. DESTRAVA A TELA
      setLoading(false);
    }
  };

  const savePlayer = async (p) => {
    try {
      // Garante que estamos salvando o objeto completo, incluindo 'attributes'
      const payload = { ...p };

      if (p.id) {
        await db.collection("players").doc(p.id).update(payload);
      } else {
        // Se for criação e por acaso vier sem atributos, gera aqui (segurança)
        if (!payload.attributes) {
          payload.attributes = generateAttributes(
            payload.position || "ATA",
            payload.overall || 60,
          );
        }
        await db.collection("players").add(payload);
      }
      setModal(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar jogador: " + e.message);
    }
  };

  const handleUpdateCoachSalary = async (newVal) => {
    if (user.data.level < 2) return alert("Nível insuficiente!");
    if (newVal < 1000) return alert("Salário mínimo é 1.000!");

    await db
      .collection("users")
      .doc(user.data.id)
      .update({ salary: parseFloat(newVal) });
    alert("Valor de mercado atualizado!");
  };

  const handleAssistantRegen = async (playerIds) => {
    const assistant = user.data;
    const activePerks = assistant.perks || [];

    // Verifica as Habilidades do Auxiliar
    const hasCoffee = activePerks.some((p) => p.id === "COFFEE_LOVER");
    const hasIce = activePerks.some((p) => p.id === "ICE_BATH");
    const hasVibes = activePerks.some((p) => p.id === "GOOD_VIBES");
    const hasLightWork = activePerks.some((p) => p.id === "LIGHT_WORK");

    const cost = hasCoffee ? 10 : 20; // Habilidade Café diminui custo
    const currentEnergy =
      assistant.energy !== undefined ? assistant.energy : 100;

    if (currentEnergy < cost)
      return alert(
        `Você está muito cansado! Energia atual: ${currentEnergy}% (Necessário: ${cost}%)`,
      );
    if (playerIds.length === 0)
      return alert("Selecione os jogadores que vão pra banheira de gelo!");

    setLoading(true);
    const b = db.batch();
    let report = [];

    playerIds.forEach((pid) => {
      const p = players.find((x) => x.id === pid);
      if (!p) return;

      if ((p.recoveryLeft || 0) > 0) {
        report.push(`⚠️ ${p.name} ignorado (Já está sob cuidados do DM).`);
        return;
      }

      // A MÁGICA: Em vez de gastar, o jogador RECUPERA energia
      let energyRecovered = 25; // Base recuperada
      if (hasIce) energyRecovered += 15; // Habilidade Crioterapia

      const newEnergy = Math.min(
        100,
        (p.energy !== undefined ? p.energy : 100) + energyRecovered,
      );

      // XP ganho (Mínimo, só pra não dizer que não treinou)
      let xpGain = Math.floor(Math.random() * 3) + 1; // Ganha só de 1 a 3 XP
      if (hasLightWork) xpGain += 5; // Habilidade Físico Leve

      let updates = {
        energy: newEnergy,
        xp: (p.xp || 0) + xpGain,
      };

      // Habilidade Resenha Forte (Melhora o Humor)
      let moodMsg = "";
      if (hasVibes && Math.random() < 0.3) {
        updates.mood = "🤩";
        moodMsg = " e ficou muito feliz (🤩)!";
      }

      b.update(db.collection("players").doc(pid), updates);
      report.push(
        `🔋 ${p.name} recuperou +${energyRecovered}⚡ (+${xpGain} XP)${moodMsg}`,
      );
    });

    // XP de Carreira do Auxiliar
    let newXp = (assistant.xp || 0) + 20;
    let newLevel = assistant.level;
    let pending = assistant.pendingPerks || 0;

    if (newXp >= newLevel * 100 && newLevel < 30) {
      newXp -= newLevel * 100;
      newLevel++;
      if (newLevel % 3 === 0) pending++; // Ganha perk a cada 3 níveis
      alert(`🎉 PARABÉNS! Nível ${newLevel} alcançado!`);
    }

    b.update(db.collection("users").doc(assistant.id), {
      energy: currentEnergy - cost,
      xp: newXp,
      level: newLevel,
      pendingPerks: pending,
    });

    // Adicionar ao mural de atividades do time
    const currentTeam = teams.find((t) => t.id === assistant.teamId);
    if (currentTeam) {
      let newLogs = [...(currentTeam.trainingLogs || [])];
      newLogs.unshift({
        date: Date.now(),
        type: "🧊 REGENERATIVO (AUXILIAR)",
        report: report.join("\n"),
      });
      if (newLogs.length > 10) newLogs.pop();
      b.update(db.collection("teams").doc(currentTeam.id), {
        trainingLogs: newLogs,
      });
    }

    await b.commit();
    setLoading(false);
    alert(`Sessão de Recuperação finalizada!\n\n${report.join("\n")}`);
  };

  const handleCoachTrain = async (playerIds, type) => {
    const currentCoach = user.data;
    const coachEnergy =
      currentCoach.energy !== undefined ? currentCoach.energy : 100;
    const coachEnergyCost = playerIds.length > 0 ? 20 : 30;

    if (coachEnergy < coachEnergyCost) {
      return alert(
        `Você está muito cansado para realizar esta atividade! Energia atual: ${coachEnergy}% (Necessário: ${coachEnergyCost}%)`,
      );
    }

    setLoading(true);
    const b = db.batch();
    let coachXpGain = 0;
    let report = [];

    const activePerks = currentCoach.perks || [];
    const energyPerk = activePerks.find((p) => p.type === "ENERGY_SAVE");
    const playerEnergyCost = energyPerk
      ? Math.round(25 * energyPerk.value)
      : 25;
    const critPerk = activePerks.find((p) => p.type === "CRIT_CHANCE");
    const critBonus = critPerk ? critPerk.value : 0;
    const minXpPerk = activePerks.find((p) => p.type === "MIN_XP_BOOST");
    const minXpBonus = minXpPerk ? minXpPerk.value : 0;
    const affPerk = activePerks.find((p) => p.type === "AFFINITY_BOOST");
    const affBonus = affPerk ? affPerk.value : 0;

    // Bônus do CT do Time
    const currentTeam = teams.find((t) => t.id === currentCoach.teamId);
    const ctLvl = currentTeam?.ctLevel || 1;
    const ctBonusMult = CT_DB[ctLvl].bonusXP / 100;

    let trainedAttrs = [];
    if (type === "FISICO_BASE")
      trainedAttrs = ["stamina", "balance", "condition", "strength"];
    else if (type === "VELOCIDADE")
      trainedAttrs = ["speed", "accel", "agility", "dribbleSpd"];
    else if (type === "IMPULSAO")
      trainedAttrs = ["jump", "header", "condition"];
    else if (type === "CHUTE")
      trainedAttrs = ["shot", "shotPower", "shotTech", "weakFootAcc"];
    else if (type === "PASSE")
      trainedAttrs = [
        "shortPass",
        "longPass",
        "shortPassSpd",
        "longPassSpd",
        "tech",
        "weakFootFreq",
      ];
    else if (type === "DRIBLE")
      trainedAttrs = ["dribble", "dribbleSpd", "agility", "tech"];
    else if (type === "DEFESA")
      trainedAttrs = ["defense", "aggression", "response"];
    else if (type === "MENTAL")
      trainedAttrs = ["teamwork", "mentality", "response"];
    else if (type === "BOLA_PARADA")
      trainedAttrs = ["freeKick", "curve", "header", "penalties"];
    else if (type === "GOLEIRO")
      trainedAttrs = ["gk", "response", "jump", "longPass"];
    else if (type === "STUDY") trainedAttrs = [];

    playerIds.forEach((pid) => {
      const p = players.find((x) => x.id === pid);
      if (!p) return;

      const currentEnergy = p.energy !== undefined ? p.energy : 100;

      if ((p.recoveryLeft || 0) > 0) {
        report.push(`⚠️ ${p.name} ignorado (está lesionado)`);
        return;
      }
      if (currentEnergy < playerEnergyCost) {
        report.push(`⚠️ ${p.name} ignorado (exausto: ${currentEnergy}%)`);
        return;
      }

      if (Math.random() < 0.01) {
        const injuryName =
          INJURIES_DB.LEVE[Math.floor(Math.random() * INJURIES_DB.LEVE.length)];
        b.update(db.collection("players").doc(p.id), {
          injury: injuryName,
          recoveryLeft: 1,
          energy: Math.max(0, currentEnergy - 15),
          mood: "😡",
        });
        report.push(`❌ ${p.name} se lesionou no treino: ${injuryName}`);
        return;
      }

      const newEnergy = currentEnergy - playerEnergyCost;
      let baseGain = Math.floor(Math.random() * 5) + 8 + minXpBonus;

      // Aplica Bônus do CT
      let xpGain = baseGain + Math.floor(baseGain * ctBonusMult);

      if ((currentCoach.affinities || []).includes(p.position))
        xpGain += 5 + affBonus;

      if (p.equippedItem) {
        const itemBonusPercent = p.equippedItem.power || 0;
        const bonusAmount = Math.ceil(xpGain * (itemBonusPercent / 100));
        xpGain += bonusAmount;
        report.push(
          `👟 ${p.name} usou ${p.equippedItem.name} (+${bonusAmount} XP)`,
        );
        b.delete(db.collection("sales").doc(p.equippedItem.id));
        b.update(db.collection("players").doc(pid), {
          equippedItem: firebase.firestore.FieldValue.delete(),
        });
      }

      activePerks.forEach((perk) => {
        if (perk.type === "TRAIN_BOOST") {
          const hasSynergy = perk.attrs.some((attr) =>
            trainedAttrs.includes(attr),
          );
          if (hasSynergy) xpGain = Math.round(xpGain * perk.multiplier);
        }
        if (perk.type === "YOUTH_BOOST") {
          const age = p.age || 18;
          if (age <= perk.ageLimit)
            xpGain = Math.round(xpGain * perk.multiplier);
        }
      });

      if (Math.random() < 0.1 + critBonus) {
        xpGain *= 2;
        report.push(`🔥 ${p.name} teve uma GRANDE evolução (+${xpGain} XP)!`);
      }

      let newAttrs = { ...(p.attributes || {}) };
      trainedAttrs.forEach((attr) => {
        if ((newAttrs[attr] || 50) < 99) {
          if (Math.random() < xpGain / 80)
            newAttrs[attr] = (newAttrs[attr] || 50) + 1;
        }
      });

      let updates = {
        xp: (p.xp || 0) + xpGain,
        energy: newEnergy,
        attributes: newAttrs,
      };

      // --- LÓGICA DE APRENDER NOVA POSIÇÃO ---
      if (p.learningPosition) {
        if (type === POS_TRAINING_MAP[p.learningPosition.target].train) {
          let posProgress = 10; // Progresso base
          if (
            (currentCoach.affinities || []).includes(p.learningPosition.target)
          )
            posProgress += 5; // Bônus do técnico
          posProgress += ctLvl * 2; // Bônus do CT

          const newCur = p.learningPosition.current + posProgress;
          if (newCur >= p.learningPosition.required) {
            report.push(
              `🌟 ${p.name} APRENDEU a jogar de ${p.learningPosition.target}! (O Boost de atributos entrará na próxima temporada)`,
            );
            updates.secondaryPositions =
              firebase.firestore.FieldValue.arrayUnion(
                p.learningPosition.target,
              );
            updates.learningPosition = firebase.firestore.FieldValue.delete();
            updates.pendingPosBoosts = firebase.firestore.FieldValue.arrayUnion(
              p.learningPosition.target,
            );
          } else {
            updates["learningPosition.current"] = newCur;
            report.push(
              `🔄 ${p.name} adaptando para ${p.learningPosition.target}: ${Math.min(100, Math.floor((newCur / p.learningPosition.required) * 100))}%`,
            );
          }
        } else {
          report.push(
            `⚠️ ${p.name} precisa do treino de ${POS_TRAINING_MAP[p.learningPosition.target].train} para evoluir na nova posição.`,
          );
        }
      }

      b.update(db.collection("players").doc(pid), updates);
      coachXpGain += 20;
      report.push(
        `✔️ ${p.name} evoluiu +${xpGain} XP (Desgaste: -${playerEnergyCost}⚡)`,
      );
    });

    if (type === "STUDY") {
      coachXpGain = Math.floor(Math.random() * 10) + 15;
      report.push(
        "📚 Você dedicou tempo estudando novas táticas e evoluiu como treinador.",
      );
    }

    let newCoachXp = (currentCoach.xp || 0) + coachXpGain;
    let newLevel = currentCoach.level;
    let pendingPerks = currentCoach.pendingPerks || 0;
    let pendingAffinity = currentCoach.pendingAffinity || 0;

    const xpNeed = newLevel * 120;
    if (newCoachXp >= xpNeed && newLevel < 30) {
      newCoachXp -= xpNeed;
      newLevel++;
      if (newLevel % 5 === 0) pendingPerks++;
      if ([10, 20, 30].includes(newLevel)) pendingAffinity++;
      alert(`🎉 PARABÉNS! Nível ${newLevel} alcançado!`);
    }

    b.update(db.collection("users").doc(currentCoach.id), {
      energy: coachEnergy - coachEnergyCost,
      xp: newCoachXp,
      level: newLevel,
      pendingPerks,
      pendingAffinity,
    });

    // GRAVA NO MURAL DO CLUBE (TREINO DO TÉCNICO)
    if (currentTeam) {
      let newLogs = [...(currentTeam.trainingLogs || [])];
      newLogs.unshift({ date: Date.now(), type, report: report.join("\n") });
      if (newLogs.length > 10) newLogs.pop(); // Agora guarda os últimos 10 treinos
      b.update(db.collection("teams").doc(currentTeam.id), {
        trainingLogs: newLogs,
      });
    }

    await b.commit();
    setLoading(false);

    let msg =
      type === "STUDY" ? "Estudo concluído!" : "Treino realizado com sucesso!";
    if (report.length > 0) msg += "\n\n" + report.join("\n");
    alert(msg);
  };

  const handleEvolveCoachPerk = async (perk) => {
    // Atualiza no Banco de Dados
    await db
      .collection("users")
      .doc(user.data.id)
      .update({
        perks: firebase.firestore.FieldValue.arrayUnion(perk),
        pendingPerks: firebase.firestore.FieldValue.increment(-1),
      });

    // ATUALIZAÇÃO VISUAL IMEDIATA (Para a tela sumir na hora)
    setUser((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        perks: [...(prev.data.perks || []), perk],
        pendingPerks: (prev.data.pendingPerks || 1) - 1,
      },
    }));

    alert(`Habilidade "${perk.name}" aprendida!`);
  };

  const updateTeamStats = async (tid, stats) => {
    await db.collection("teams").doc(tid).update({ stats });
    alert("Tabela atualizada!");
  };

  const handlePlayerSoloTrain = async (player, type) => {
    const currentEnergy = player.energy !== undefined ? player.energy : 100;

    if (currentEnergy < 35)
      return alert(`Exausto (${currentEnergy}%)! Precisa de 35%.`);
    if ((player.recoveryLeft || 0) > 0)
      return alert(`Você está lesionado e não pode treinar!`);

    setLoading(true);
    const b = db.batch();
    let report = [];

    if (Math.random() < 0.02) {
      const injuryName =
        INJURIES_DB.LEVE[Math.floor(Math.random() * INJURIES_DB.LEVE.length)];
      b.update(db.collection("players").doc(player.id), {
        injury: injuryName,
        recoveryLeft: 1,
        energy: Math.max(0, currentEnergy - 20),
        mood: "😡",
      });
      await b.commit();
      setLoading(false);
      return alert(
        `❌ INFORTÚNIO!\nLesão no treino: ${injuryName}\n1 Jogo fora.`,
      );
    }

    let trainedAttrs = [];
    if (type === "FISICO_BASE")
      trainedAttrs = ["stamina", "balance", "condition", "strength"];
    else if (type === "VELOCIDADE")
      trainedAttrs = ["speed", "accel", "agility", "dribbleSpd"];
    else if (type === "IMPULSAO")
      trainedAttrs = ["jump", "header", "condition"];
    else if (type === "CHUTE")
      trainedAttrs = ["shot", "shotPower", "shotTech", "weakFootAcc"];
    else if (type === "PASSE")
      trainedAttrs = [
        "shortPass",
        "longPass",
        "shortPassSpd",
        "longPassSpd",
        "tech",
        "weakFootFreq",
      ];
    else if (type === "DRIBLE")
      trainedAttrs = ["dribble", "dribbleSpd", "agility", "tech"];
    else if (type === "DEFESA")
      trainedAttrs = ["defense", "aggression", "response"];
    else if (type === "MENTAL")
      trainedAttrs = ["teamwork", "mentality", "response"];
    else if (type === "BOLA_PARADA")
      trainedAttrs = ["freeKick", "curve", "header", "penalties"];
    else if (type === "GOLEIRO")
      trainedAttrs = ["gk", "response", "jump", "longPass"];

    let xpGain = Math.floor(Math.random() * 8) + 8;
    const newEnergy = currentEnergy - 35;

    if (player.equippedItem) {
      const bonusAmount = Math.ceil(
        xpGain * ((player.equippedItem.power || 0) / 100),
      );
      xpGain += bonusAmount;
      report.push(`Usou ${player.equippedItem.name} (+${bonusAmount} XP)`);
      b.delete(db.collection("sales").doc(player.equippedItem.id));
      b.update(db.collection("players").doc(player.id), {
        equippedItem: firebase.firestore.FieldValue.delete(),
      });
    }

    let newAttrs = { ...(player.attributes || {}) };
    let evolved = false;
    trainedAttrs.forEach((attr) => {
      if ((newAttrs[attr] || 50) < 99 && Math.random() < 0.15) {
        newAttrs[attr] = (newAttrs[attr] || 50) + 1;
        evolved = true;
      }
    });

    // SALVA DADOS DO JOGADOR
    b.update(db.collection("players").doc(player.id), {
      xp: (player.xp || 0) + xpGain,
      energy: newEnergy,
      attributes: newAttrs,
    });

    // ESCREVE NO DIÁRIO DO CLUBE
    const currentTeam = teams.find((t) => t.id === player.teamId);
    if (currentTeam) {
      let newLogs = [...(currentTeam.trainingLogs || [])];
      let msgLog = `${player.name} fez um treino extra e ganhou +${xpGain} XP.`;
      if (evolved) msgLog += ` Alguns atributos evoluíram!`;
      newLogs.unshift({
        date: Date.now(),
        type: "🏃‍♂️ TREINO SOLO",
        report: msgLog,
      });
      if (newLogs.length > 15) newLogs.pop();
      b.update(db.collection("teams").doc(currentTeam.id), {
        trainingLogs: newLogs,
      });
    }

    await b.commit();
    setLoading(false);

    let msg = `Treino concluído!\nEnergia: -35%\nXP: +${xpGain}`;
    if (report.length > 0) msg += `\n${report.join("\n")}`;
    alert(msg);
  };
  return {
    handleFireCoach,
    handleCoachSelfActions,
    handleCoachIndication,
    handleCoachUseItem,
    handleUseItem,
    savePlayer,
    handleUpdateCoachSalary,
    handleAssistantRegen,
    handleCoachTrain,
    handleEvolveCoachPerk,
    updateTeamStats,
    handlePlayerSoloTrain,
  };
}
