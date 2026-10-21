import { guardedUpdate, guardedBatch } from "../services/guardedWrites.js";
import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";
import { INJURIES_DB } from "../game/INJURIES_DB.js";

export const PublicServices = ({
  players,
  coaches,
  user,
  onDonate,
  onOperate,
}) => {
  const [hTab, setHTab] = useState("HOSPITAL");
  const [showLoanUI, setShowLoanUI] = useState(false);
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanInst, setLoanInst] = useState(5);
  const [showInvestUI, setShowInvestUI] = useState(false);
  const [investAmount, setInvestAmount] = useState(100000);

  // --- ESTADOS DO PIX ---
  const [pixRecipient, setPixRecipient] = useState("");
  const [pixAmount, setPixAmount] = useState("");
  const [pixSearch, setPixSearch] = useState("");

  const injured = (players || []).filter((p) => (p.recoveryLeft || 0) > 0);
  const db = firebase.firestore();

  const SURGERY_OPTIONS = {
    MODERADA: [
      {
        id: "M1",
        name: "Fisioterapia Intensiva (Aceleração)",
        timeRed: 1,
        cost: 300000,
        success: 0.95,
        text: "Sessões de choque e ultrassom para acelerar a cicatrização.",
      },
      {
        id: "M2",
        name: "Infiltração com Plasma (PRP)",
        timeRed: 2,
        cost: 750000,
        success: 0.85,
        text: "Tratamento biológico para regenerar tecidos moderadamente lesionados.",
      },
    ],
    GRAVE: [
      {
        id: "G1",
        name: "Artroscopia de Limpeza",
        timeRed: 2,
        cost: 1500000,
        success: 0.8,
        text: "Microcirurgia para remover fragmentos e limpar a articulação.",
      },
      {
        id: "G2",
        name: "Sutura Meniscal / Tendínea",
        timeRed: 3,
        cost: 3500000,
        success: 0.7,
        text: "Intervenção cirúrgica para costurar fibras rompidas.",
      },
    ],
    EXTREMA: [
      {
        id: "E1",
        name: "Reconstrução Ligamentar (Enxerto)",
        timeRed: 4,
        cost: 8000000,
        success: 0.65,
        text: "Substituição total do ligamento com reforço estrutural.",
      },
      {
        id: "E2",
        name: "Cirurgia Robótica de Alta Performance",
        timeRed: 6,
        cost: 15000000,
        success: 0.5,
        text: "Tecnologia de ponta para casos terminais. Risco alto, mas recuperação massiva.",
      },
    ],
  };

  const LOAN_LIMITS = {
    VARZEA: 500000,
    D: 2000000,
    C: 5000000,
    B: 10000000,
    A: 20000000,
  };

  const openLoanUI = () => {
    if (user.type !== "USER")
      return alert("Apenas clubes podem solicitar empréstimos comerciais.");
    const team = user.data;
    if (team.bankLoan && team.bankLoan.installments > 0)
      return alert(
        "Você já possui um empréstimo ativo. Quite-o antes de pedir outro.",
      );

    const limit = LOAN_LIMITS[team.serie || "VARZEA"] || 500000;
    setLoanAmount(Math.min(100000, limit));
    setLoanInst(5);
    setShowLoanUI(true);
  };

  const bankUpdate = async (expected, update) => {
    try {
      await guardedUpdate(
        db,
        db.collection("teams").doc(user.data.id),
        expected,
        update,
      );
      return true;
    } catch (error) {
      alert("Operação não realizada: " + error.message);
      return false;
    }
  };

  const handleConfirmLoan = async () => {
    const team = user.data;
    const limit = LOAN_LIMITS[team.serie || "VARZEA"] || 500000;

    if (
      !Number.isFinite(loanAmount) ||
      !Number.isInteger(loanInst) ||
      loanInst < 1 ||
      loanAmount <= 0 ||
      loanAmount > limit
    )
      return alert("Valor inválido.");

    const interestRate = 0.1 + (loanInst - 1) * 0.05;
    const totalToPay = loanAmount * (1 + interestRate);
    const weekly = totalToPay / loanInst;

    if (
      confirm(
        `Assinar contrato com o banco?\nValor pego: ${fmt(loanAmount)}\nVocê pagará ${loanInst}x de ${fmt(weekly)}.\n(Total com juros: ${fmt(totalToPay)})`,
      )
    ) {
      if (
        !(await bankUpdate(
          { bankLoan: team.bankLoan },
          {
            balance: firebase.firestore.FieldValue.increment(loanAmount),
            bankLoan: {
              amountBorrowed: loanAmount,
              totalOwed: totalToPay,
              weeklyPayment: weekly,
              installments: loanInst,
            },
          },
        ))
      )
        return;
      alert(
        "✅ Dinheiro na conta! As parcelas serão debitadas automaticamente.",
      );
      setShowLoanUI(false);
    }
  };

  const openInvestUI = () => {
    if (user.type !== "USER") return alert("Apenas clubes podem investir.");
    const team = user.data;
    const currentInvested = team.bankInvestment?.amount || 0;
    const maxInvestment = 50000000;

    if (currentInvested >= maxInvestment)
      return alert(
        `Você já atingiu o teto máximo de investimento (${fmt(maxInvestment)}).`,
      );
    if ((team.balance || 0) <= 0)
      return alert("Você não tem saldo em caixa para investir.");

    const availableToInvest = Math.min(
      team.balance,
      maxInvestment - currentInvested,
    );
    setInvestAmount(Math.min(100000, availableToInvest));
    setShowInvestUI(true);
  };

  const handleConfirmInvest = async () => {
    const team = user.data;
    const currentInvested = team.bankInvestment?.amount || 0;
    const maxInvestment = 50000000;

    if (!Number.isFinite(investAmount) || investAmount <= 0)
      return alert("Valor inválido.");
    if (investAmount > team.balance)
      return alert("Você não tem esse saldo disponível no caixa do clube.");
    if (currentInvested + investAmount > maxInvestment)
      return alert(`O valor ultrapassa o teto permitido.`);

    if (
      confirm(
        `Confirmar aplicação de ${fmt(investAmount)}?\nO dinheiro sairá do seu caixa e ficará bloqueado rendendo 2% ao mês.\n(Carência de 3 semanas para saque sem multa).`,
      )
    ) {
      if (
        !(await bankUpdate(
          { balance: team.balance, bankInvestment: team.bankInvestment },
          {
            balance: firebase.firestore.FieldValue.increment(-investAmount),
            bankInvestment: {
              amount: currentInvested + investAmount,
              weeksLocked: 3,
            },
          },
        ))
      )
        return;
      alert(
        "✅ Investimento realizado! Ele renderá juros a cada virada de semana.",
      );
      setShowInvestUI(false);
    }
  };

  const handleWithdraw = async () => {
    const team = user.data;
    const inv = team.bankInvestment;
    if (!inv || inv.amount <= 0)
      return alert("Você não possui dinheiro investido.");

    let amountToReceive = inv.amount;
    let msg = `Resgatar ${fmt(inv.amount)}?`;

    if ((inv.weeksLocked || 0) > 0) {
      const penalty = inv.amount * 0.05;
      amountToReceive = inv.amount - penalty;
      msg = `⚠️ RESGATE ANTECIPADO!\n\nSeu dinheiro ainda está bloqueado por ${inv.weeksLocked} semana(s).\nSe sacar agora, o banco cobrará uma multa de 5% por quebra de contrato (${fmt(penalty)}).\n\nValor a receber: ${fmt(amountToReceive)}\n\nConfirmar saque emergencial?`;
    } else {
      msg = `✅ RESGATE TOTAL\n\nSeu dinheiro já cumpriu a carência e pode ser sacado sem multas.\n\nValor a receber: ${fmt(amountToReceive)}\n\nConfirmar saque?`;
    }

    if (confirm(msg)) {
      if (
        !(await bankUpdate(
          { bankInvestment: team.bankInvestment },
          {
            balance: firebase.firestore.FieldValue.increment(amountToReceive),
            bankInvestment: firebase.firestore.FieldValue.delete(),
          },
        ))
      )
        return;
      alert("Dinheiro transferido para o caixa do clube com sucesso!");
    }
  };

  // --- NOVA FUNÇÃO: ENVIAR PIX (P2P) ---
  const handleSendPix = async () => {
    const amount = parseFloat(pixAmount);
    if (isNaN(amount) || amount <= 0) return alert("Valor inválido.");
    if (amount > 20000)
      return alert("O limite máximo por PIX é de ₣ 20.000 (Lei Antilavagem).");
    if (!pixRecipient) return alert("Selecione um destinatário.");

    // TRAVAS ANTI-TRAPAÇA
    if (user.type === "PLAYER") {
      if ((user.data.overall || 0) <= 50)
        return alert(
          "🚫 BLOQUEADO: Apenas jogadores com Overall acima de 50 (Nível Pró) podem enviar PIX.",
        );
      if (user.data.teamId === "FREE" || !user.data.teamId)
        return alert(
          "🚫 BLOQUEADO: Agentes Livres (Contas Fantasmas) não podem fazer transferências bancárias.",
        );
    } else if (user.type === "COACH") {
      if ((user.data.level || 1) < 2)
        return alert(
          "🚫 BLOQUEADO: Apenas Técnicos Nível 2+ podem enviar PIX.",
        );
    }

    const totalCost = amount * 1.1; // Taxa de 10%
    if ((user.data.balance || 0) < totalCost)
      return alert(
        `Saldo insuficiente!\nCom a taxa bancária de 10%, você precisa ter na conta: ${fmt(totalCost)}`,
      );

    const splitIndex = pixRecipient.indexOf("_");
    const recType = pixRecipient.substring(0, splitIndex);
    const recId = pixRecipient.substring(splitIndex + 1);
    const collection = recType === "PLAYER" ? "players" : "users";

    if (
      !confirm(
        `Confirma o PIX de ${fmt(amount)}?\n\n💸 Valor da Transferência: ${fmt(amount)}\n🏦 Taxa do Banco (10%): ${fmt(amount * 0.1)}\n=====================\nTotal Debitado: ${fmt(totalCost)}`,
      )
    )
      return;

    try {
      const b = guardedBatch(db, [
        {
          ref: db
            .collection(user.type === "PLAYER" ? "players" : "users")
            .doc(user.data.id),
          expected: {
            balance: user.data.balance,
            overall: user.data.overall,
            teamId: user.data.teamId,
            level: user.data.level,
          },
        },
      ]);

      // 1. Tira do remetente
      const myCol = user.type === "PLAYER" ? "players" : "users";
      b.update(db.collection(myCol).doc(user.data.id), {
        balance: firebase.firestore.FieldValue.increment(-totalCost),
      });

      // 2. Entrega ao destinatário
      b.update(db.collection(collection).doc(recId), {
        balance: firebase.firestore.FieldValue.increment(amount),
      });

      // 3. Salva no Log da Receita Federal (Admin)
      let recName = "Desconhecido";
      if (recType === "PLAYER")
        recName = players.find((p) => p.id === recId)?.name || recName;
      if (recType === "COACH")
        recName = coaches.find((c) => c.id === recId)?.name || recName;

      const logRef = db.collection("pixLogs").doc();
      b.set(logRef, {
        senderId: user.data.id,
        senderName: user.data.name,
        senderType: user.type,
        recipientId: recId,
        recipientName: recName,
        recipientType: recType,
        amount: amount,
        tax: amount * 0.1,
        date: Date.now(),
      });

      await b.commit();
      alert(
        `✅ PIX ENVIADO COM SUCESSO!\n${fmt(amount)} foram transferidos para a conta de ${recName}.`,
      );
      setPixAmount("");
      setPixRecipient("");
    } catch (e) {
      alert("Erro ao processar o PIX: " + e.message);
    }
  };

  const handleNightclub = async () => {
    if (user.type !== "PLAYER" && user.type !== "COACH") {
      return alert(
        "Apenas Pessoas Físicas (Jogadores e Técnicos) podem curtir a noitada!",
      );
    }

    if (user.type === "PLAYER" && (user.data.recoveryLeft || 0) > 0) {
      const confirmBribe = confirm(
        "⚠️ ATENÇÃO: Você está no Departamento Médico!\n\nSe a imprensa ou a diretoria te pegarem na balada de atestado, a punição será severa. Deseja forçar a entrada disfarçado?",
      );
      if (!confirmBribe) return;

      if (Math.random() < 0.8) {
        const fine = 10000;
        const penaltyUpdates = {
          balance: firebase.firestore.FieldValue.increment(-fine),
          recoveryLeft: user.data.recoveryLeft + 1,
          mood: "😡",
          fame: Math.max(0, (user.data.fame || 0) - 1000),
        };

        const scandalMsg = `🚨 **ESCÂNDALO MÉDICO!**\nO atleta **${user.data.name}**, que deveria estar se recuperando de lesão, foi flagrado na porta da balada! A diretoria aplicou multa pesada e o tempo de recuperação piorou.`;

        try {
          const b = db.batch();
          b.update(db.collection("players").doc(user.data.id), penaltyUpdates);
          b.set(db.collection("news").doc(), {
            text: scandalMsg,
            type: "press",
            date: Date.now(),
            likes: [],
          });
          await b.commit();
          return alert(
            `📸 FLAGRADO!\n\nO paparazzo tirou foto sua mancando na porta da boate! Você virou piada e a diretoria não perdoou.\n\nEfeitos:\n💸 Multa de ${fmt(fine)}\n📉 Fama: -1000\n🏥 Lesão Agravada (+1 jogo fora)!`,
          );
        } catch (e) {
          return alert("Erro: " + e.message);
        }
      } else {
        alert(
          "🥷 NINJA!\nVocê conseguiu entrar pela porta dos fundos de capuz e óculos escuros sem ninguém ver. O risco foi alto, mas a noite é sua!",
        );
      }
    }

    const entryFee = 5000;
    if ((user.data.balance || 0) < entryFee) {
      return alert(
        `O segurança barrou você na porta!\nVocê precisa de ${fmt(entryFee)} para pagar a entrada VIP.`,
      );
    }

    if (
      !confirm(
        `🎟️ ENTRADA VIP: ${fmt(entryFee)}\n\nSua noite pode ser lendária ou terminar em escândalo. A roleta de Mato Real está girando... Entrar?`,
      )
    )
      return;

    const roll = Math.random();
    let msg = "";
    let updates = {
      balance: firebase.firestore.FieldValue.increment(-entryFee),
    };
    let newsMsg = null;

    const celebs = [
      "Neymar",
      "Casimiro",
      "Craque Neto",
      "Tiago Leifert",
      "Galvão Bueno",
      "Ronaldo Fenômeno",
      "Adriano Imperador",
      "Ronaldinho Gaúcho",
      "Luva de Pedreiro",
    ];
    const badEntities = [
      "Leo Dias",
      "a página Choquei",
      "um Paparazzi",
      "um Torcedor Rival",
      "a Torcida Organizada",
      "o Segurança da Boate",
    ];
    const injuries = [
      "Olho Roxo",
      "Nariz Quebrado",
      "Torção no Tornozelo (Dançando)",
      "Corte no Supercílio",
      "Desgaste Extremo",
    ];
    const badActions = [
      "vomitou no sapato de",
      "tentou dar um drible e caiu na frente de",
      "foi pego no flagra discutindo com",
      "deu calote na mesa de",
    ];
    const goodActions = [
      "pagou um combo de bebida pra você",
      "fez uma dancinha viral no TikTok com você",
      "te chamou de 'Garotinho' ao vivo",
      "te apresentou um sheik árabe",
      "elogiou seu futebol na roda de amigos",
    ];

    if (roll < 0.005) {
      updates.balance = firebase.firestore.FieldValue.increment(10000);
      updates.energy = 100;
      if (user.type === "PLAYER") {
        updates.fame = (user.data.fame || 0) + 1500;
        updates.mood = "🤩";
      }
      msg = `👑 EVENTO LENDÁRIO DESBLOQUEADO!\n\nVocê trombou com NATHAN, o criador absoluto de Mato Real! Vocês viraram uma garrafa de Mansão Maromba juntos no camarote. \n\nEfeitos:\n⚡ Energia 100%\n💸 Ele te deu ₣ 10.000 no PIX pela resenha!`;
      newsMsg = `🚨 **VISTOS JUNTOS!**\n**${user.data.name}** foi flagrado tomando Mansão Maromba com o grande Nathan na área VIP. Que moral gigantesca!`;
    } else if (roll < 0.05) {
      const isLucky = Math.random() > 0.5;
      const bruxo = "Ronaldinho Gaúcho";

      if (isLucky) {
        updates.energy = 100;
        updates.balance = firebase.firestore.FieldValue.increment(20000);
        if (user.type === "PLAYER") updates.fame = (user.data.fame || 0) + 800;
        msg = `🪄 O ROLÊ DO BRUXO!\nVocê foi convidado pro camarote do ${bruxo}. Rolou pagode, dibres e você ainda ganhou ₣ 20.000 jogando truco com ele! Que noite!`;
        newsMsg = `🪄 **ALEATÓRIO!**\n**${user.data.name}** postou stories tocando pandeiro ao lado de ${bruxo}. A torcida foi à loucura!`;
      } else {
        updates.energy = 0;
        if (user.type === "PLAYER") {
          updates.recoveryLeft = 1;
          updates.injury = "Exaustão Pós-Bruxo";
          updates.mood = "😡";
        }
        msg = `🪄 O ROLÊ DO BRUXO DEU RUIM...\nVocê tentou acompanhar o ritmo de festa do ${bruxo}. Erro fatal. Você desmaiou às 9h da manhã, zerou a energia e vai ficar 1 jogo afastado.`;
      }
    } else if (roll < 0.15) {
      const celeb = celebs[Math.floor(Math.random() * celebs.length)];
      const action =
        goodActions[Math.floor(Math.random() * goodActions.length)];
      const randomMoney = Math.floor(Math.random() * 15000) + 5000;

      updates.energy = 100;
      updates.balance = firebase.firestore.FieldValue.increment(randomMoney);
      if (user.type === "PLAYER") updates.fame = (user.data.fame || 0) + 500;

      msg = `🌟 RESENHA FORTE!\nVocê esbarrou com ${celeb} e ele ${action}!\n\nVocê saiu com a energia no máximo e ainda fez contatos que renderam ₣ ${randomMoney.toLocaleString("pt-BR")}!`;
    } else if (roll < 0.3) {
      updates.energy = 100;
      msg = `🍹 NOITE TRANQUILA!\nVocê curtiu a música, ficou na água com limão e deu boas risadas com os amigos. Sua mente está relaxada e sua Energia foi restaurada para 100%!`;
    } else if (roll < 0.65) {
      const lostMoney = Math.floor(Math.random() * 8000) + 2000;
      updates.energy = 0;
      updates.balance = firebase.firestore.FieldValue.increment(-lostMoney);
      if (user.type === "PLAYER") updates.mood = "😐";

      msg = `🤢 RESSACA BRABA...\nA noite foi intensa. Você misturou whisky com catuaba, perdeu sua carteira (prejuízo de ₣ ${lostMoney.toLocaleString("pt-BR")}) e acordou abraçado no vaso sanitário.\n\nEnergia ZERADA!`;
    } else {
      const villain =
        badEntities[Math.floor(Math.random() * badEntities.length)];
      const action = badActions[Math.floor(Math.random() * badActions.length)];
      const isFight = Math.random() > 0.5;

      updates.energy = 0;
      if (user.type === "PLAYER") updates.mood = "😡";

      if (isFight && user.type === "PLAYER") {
        const injury = injuries[Math.floor(Math.random() * injuries.length)];
        updates.recoveryLeft = 1;
        updates.injury = `${injury} (Briga Noturna)`;
        updates.fame = Math.max(0, (user.data.fame || 0) - 300);

        msg = `👊 TRETA NA SAÍDA!\nDeu ruim! Você se desentendeu com ${villain}. Rolou empurra-empurra e você levou a pior.\n\nResultado: Lesão (${injury}), perda de Fama e 1 JOGO DE SUSPENSÃO.`;
        newsMsg = `🚨 **CASO DE POLÍCIA!**\nO atleta **${user.data.name}** se envolveu numa briga física pesada com ${villain} nesta madrugada. O clube promete punições severas!`;
      } else {
        updates.fame = Math.max(0, (user.data.fame || 0) - 500);
        msg = `📸 ESCÂNDALO NA INTERNET!\nVocê bebeu demais e ${action} ${villain}! Tudo foi filmado e postado nas redes sociais.\n\nSua moral despencou, sua energia zerou e a diretoria está furiosa!`;
        newsMsg = `📉 **CANCELADO!**\nVídeos vazados mostram **${user.data.name}** em estado lamentável na boate. A repercussão é péssima nos bastidores.`;
      }
    }

    try {
      const col = user.type === "PLAYER" ? "players" : "users";
      await db.collection(col).doc(user.data.id).update(updates);
      if (newsMsg) {
        await db
          .collection("news")
          .add({ text: newsMsg, type: "press", date: Date.now(), likes: [] });
      }
      alert(msg);
    } catch (e) {
      alert("Erro no evento: " + e.message);
    }
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        className="highlight-card"
        style={{
          background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>🏛️ Serviços Públicos</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>
          Gestão de Saúde e Bem-Estar de Mato Real
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          className={`btn ${hTab === "HOSPITAL" ? "btn-red" : "btn-ghost"}`}
          onClick={() => setHTab("HOSPITAL")}
          style={{ flex: 1, padding: 10 }}
        >
          🏥 HOSPITAL
        </button>
        <button
          className={`btn ${hTab === "BANCO" ? "btn-blue" : "btn-ghost"}`}
          onClick={() => setHTab("BANCO")}
          style={{ flex: 1, padding: 10 }}
        >
          🏦 BANCO
        </button>
        <button
          className={`btn ${hTab === "BALADA" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setHTab("BALADA")}
          style={{ flex: 1, padding: 10 }}
        >
          🍸 BALADA
        </button>
      </div>

      {hTab === "HOSPITAL" && (
        <div>
          <div
            style={{
              background: "#b71c1c",
              padding: 10,
              borderRadius: 8,
              color: "white",
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 24 }}>🚑</span>
            <div>
              <b style={{ display: "block" }}>EMERGÊNCIA MUNICIPAL</b>
              <small>{injured.length} jogador(es) sob cuidados médicos</small>
            </div>
          </div>

          {injured.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🥗</div>
              <p>
                Departamento médico vazio! Todos os atletas estão prontos para o
                jogo.
              </p>
            </div>
          ) : (
            injured.map((p) => {
              const injuryName =
                typeof p.injury === "object" ? p.injury.label : p.injury;
              const isLight =
                !INJURIES_DB.MODERADA.includes(injuryName) &&
                !INJURIES_DB.GRAVE.includes(injuryName) &&
                !INJURIES_DB.EXTREMA.includes(injuryName);

              return (
                <div
                  key={p.id}
                  className="card"
                  style={{
                    borderLeft: "5px solid #ff1744",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <b style={{ fontSize: 16 }}>❌ {p.name}</b>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#ff1744",
                          fontWeight: "bold",
                          marginTop: 2,
                        }}
                      >
                        {injuryName || "Lesão não especificada"}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          background: "#ff1744",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {p.recoveryLeft} JOGOS
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 15,
                      background: "rgba(0,0,0,0.2)",
                      padding: 10,
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        marginBottom: 10,
                      }}
                    >
                      <span>Fundo para Cirurgia:</span>
                      <b style={{ color: "gold" }}>
                        {fmt(p.hospitalFund || 0)}
                      </b>
                    </div>

                    <div
                      style={{ fontSize: 9, color: "#888", marginBottom: 10 }}
                    >
                      <b>Doadores Recentes:</b>
                      <br />
                      {p.donors && Object.keys(p.donors).length > 0
                        ? Object.values(p.donors).map((d, i) => (
                            <span key={i}>
                              • {d.name} ({fmt(d.val)}){" "}
                            </span>
                          ))
                        : "Nenhuma doação recebida."}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                      }}
                    >
                      <button
                        className={`btn ${isLight ? "btn-ghost" : "btn-green"}`}
                        style={{
                          fontSize: 10,
                          padding: 8,
                          opacity: isLight ? 0.5 : 1,
                          cursor: isLight ? "not-allowed" : "pointer",
                        }}
                        disabled={isLight}
                        onClick={() => {
                          if (isLight)
                            return alert(
                              "Lesões leves e clínicas precisam apenas de repouso natural.",
                            );
                          const v = prompt(
                            `Quanto desejas doar para ${p.name}?`,
                          );
                          if (v && !isNaN(v)) onDonate(p, parseFloat(v));
                        }}
                      >
                        {isLight ? "🚫 APENAS REPOUSO" : "💸 DOAR"}
                      </button>

                      <button
                        className={`btn ${isLight ? "btn-ghost" : "btn-blue"}`}
                        style={{
                          fontSize: 10,
                          padding: 8,
                          opacity: isLight ? 0.5 : 1,
                        }}
                        onClick={() =>
                          isLight
                            ? alert(
                                "Lesões leves e clínicas precisam apenas de repouso natural.",
                              )
                            : onOperate(p)
                        }
                      >
                        {isLight ? "🚫 SEM CIRURGIA" : "🏥 OPERAR"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {hTab === "BANCO" && (
        <div>
          <div
            style={{
              background: "linear-gradient(90deg, #0d47a1, #1976d2)",
              padding: 10,
              borderRadius: 8,
              color: "white",
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
          >
            <span style={{ fontSize: 24 }}>🏦</span>
            <div>
              <b style={{ display: "block" }}>BANCO DE MATO REAL</b>
              <small>Crédito, Investimentos e PIX</small>
            </div>
          </div>

          {!["USER", "PLAYER", "COACH"].includes(user.type) ? (
            <div
              className="card"
              style={{ textAlign: "center", padding: 30, color: "#888" }}
            >
              <i
                className="fas fa-lock"
                style={{ fontSize: 40, marginBottom: 10 }}
              ></i>
              <p>Esta área é exclusiva para Clubes, Jogadores e Técnicos.</p>
            </div>
          ) : (
            <div className="animate-in">
              {/* --- MÓDULO PIX (APENAS PARA PESSOA FÍSICA: JOGADORES E TÉCNICOS) --- */}
              {(user.type === "PLAYER" || user.type === "COACH") && (
                <div
                  className="card"
                  style={{ borderLeft: "4px solid #00bcd4", marginBottom: 15 }}
                >
                  <h4 style={{ marginTop: 0, color: "#00bcd4" }}>
                    💸 Enviar PIX (Transferência)
                  </h4>

                  {/* VERIFICAÇÃO VISUAL DAS TRAVAS ANTI-TRAPAÇA */}
                  {user.type === "PLAYER" && (user.data.overall || 0) <= 50 ? (
                    <div
                      style={{
                        background: "rgba(255,0,0,0.1)",
                        padding: 15,
                        borderRadius: 8,
                        border: "1px solid red",
                        color: "#ff5555",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      <i
                        className="fas fa-ban"
                        style={{ fontSize: 24, marginBottom: 5 }}
                      ></i>
                      <br />
                      <b>CONTA BANCÁRIA RESTRITA</b>
                      <br />
                      Apenas jogadores com{" "}
                      <b>Overall acima de 50 (Nível Pró)</b> podem enviar
                      transferências para evitar contas fakes. Treine para
                      evoluir!
                    </div>
                  ) : user.type === "PLAYER" &&
                    (!user.data.teamId || user.data.teamId === "FREE") ? (
                    <div
                      style={{
                        background: "rgba(255,0,0,0.1)",
                        padding: 15,
                        borderRadius: 8,
                        border: "1px solid red",
                        color: "#ff5555",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      <i
                        className="fas fa-ban"
                        style={{ fontSize: 24, marginBottom: 5 }}
                      ></i>
                      <br />
                      <b>CONTA BANCÁRIA INATIVA</b>
                      <br />
                      Agentes Livres não possuem o PIX liberado.{" "}
                      <b>Assine com um clube</b> para ativar suas transações
                      financeiras!
                    </div>
                  ) : user.type === "COACH" && (user.data.level || 1) < 2 ? (
                    <div
                      style={{
                        background: "rgba(255,0,0,0.1)",
                        padding: 15,
                        borderRadius: 8,
                        border: "1px solid red",
                        color: "#ff5555",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      <i
                        className="fas fa-ban"
                        style={{ fontSize: 24, marginBottom: 5 }}
                      ></i>
                      <br />
                      <b>CONTA BANCÁRIA RESTRITA</b>
                      <br />
                      Apenas Técnicos <b>Nível 2 ou superior</b> podem realizar
                      transferências.
                    </div>
                  ) : (
                    /* SE PASSOU NAS REGRAS, MOSTRA O FORMULÁRIO DO PIX NORMAL COM A BUSCA */
                    <>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#aaa",
                          marginBottom: 15,
                        }}
                      >
                        Transfira dinheiro diretamente para o bolso de outros
                        atletas ou técnicos (Taxa bancária: 10%). Limite: ₣
                        20.000.
                      </p>

                      <label>Quem vai receber o PIX?</label>

                      {/* BARRA DE PESQUISA DO PIX */}
                      <input
                        className="input-field"
                        type="text"
                        placeholder="🔍 Buscar pelo nome..."
                        value={pixSearch}
                        onChange={(e) => setPixSearch(e.target.value)}
                        style={{ marginBottom: "5px", borderColor: "#00bcd4" }}
                      />

                      <select
                        className="input-field"
                        value={pixRecipient}
                        onChange={(e) => setPixRecipient(e.target.value)}
                      >
                        <option value="">-- Selecione o contato --</option>
                        <optgroup label="🏃 Jogadores">
                          {players
                            .filter(
                              (p) =>
                                p.id !== user.data.id &&
                                p.name &&
                                p.name
                                  .toLowerCase()
                                  .includes(pixSearch.toLowerCase()),
                            )
                            .map((p) => (
                              <option key={p.id} value={`PLAYER_${p.id}`}>
                                {p.name} (Jogador)
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="👔 Técnicos">
                          {(coaches || [])
                            .filter(
                              (c) =>
                                c.id !== user.data.id &&
                                c.name &&
                                c.name
                                  .toLowerCase()
                                  .includes(pixSearch.toLowerCase()),
                            )
                            .map((c) => (
                              <option key={c.id} value={`COACH_${c.id}`}>
                                {c.name} (Treinador)
                              </option>
                            ))}
                        </optgroup>
                      </select>

                      <label>Valor da Transferência (₣)</label>
                      <input
                        className="input-field"
                        type="number"
                        placeholder="Ex: 5000"
                        value={pixAmount}
                        onChange={(e) => setPixAmount(e.target.value)}
                      />

                      <button
                        className="btn btn-blue"
                        style={{ background: "#00bcd4", color: "#000" }}
                        onClick={handleSendPix}
                      >
                        <i className="fas fa-paper-plane"></i> CONFIRMAR PIX
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* --- MÓDULO DE SEGURO (SÓ JOGADOR) --- */}
              {user.type === "PLAYER" && (
                <div
                  className="card"
                  style={{ borderLeft: "4px solid #00E676", marginBottom: 15 }}
                >
                  <h4 style={{ marginTop: 0, color: "#00E676" }}>
                    🛡️ Meu Seguro Saúde Particular
                  </h4>

                  {user.data.healthPlan ? (
                    <div
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        padding: 15,
                        borderRadius: 8,
                        border: "1px solid #333",
                      }}
                    >
                      <b style={{ color: "#00E676" }}>Cobertura Ativa</b>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          marginTop: 10,
                          borderBottom: "1px dashed #444",
                          paddingBottom: 5,
                        }}
                      >
                        <span>
                          Plano: <b>{user.data.healthPlan.name}</b>
                        </span>
                        <span>
                          Cobre:{" "}
                          <b style={{ color: "lime" }}>
                            {user.data.healthPlan.coverage}% de Cirurgias
                          </b>
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        <span>Mensalidade:</span>
                        <b style={{ color: "var(--danger)" }}>
                          {fmt(user.data.healthPlan.cost)}/sem
                        </b>
                      </div>
                      <button
                        className="btn btn-red"
                        style={{ marginTop: 15 }}
                        onClick={async () => {
                          if (confirm("Cancelar seu Seguro Particular?")) {
                            await db
                              .collection("players")
                              .doc(user.data.id)
                              .update({
                                healthPlan:
                                  firebase.firestore.FieldValue.delete(),
                              });
                            alert("Plano cancelado.");
                          }
                        }}
                      >
                        ❌ CANCELAR PLANO
                      </button>
                    </div>
                  ) : (
                    <>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#aaa",
                          marginBottom: 10,
                        }}
                      >
                        O presidente do clube não paga seu seguro? Contrate um
                        particular! Ele cobre suas cirurgias e o valor é
                        descontado automaticamente do seu salário toda semana.
                      </p>

                      <div style={{ display: "grid", gap: 10 }}>
                        <div
                          style={{
                            background: "#111",
                            padding: 10,
                            borderRadius: 5,
                            border: "1px solid silver",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <b style={{ color: "silver", fontSize: 13 }}>
                              Prata
                            </b>
                            <br />
                            <small style={{ color: "#00E676" }}>
                              Cobre 30%
                            </small>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <b
                              style={{
                                color: "var(--danger)",
                                display: "block",
                              }}
                            >
                              {fmt(1500)}/s
                            </b>
                            <button
                              className="btn btn-ghost"
                              style={{
                                padding: "5px",
                                fontSize: 9,
                                width: "auto",
                                margin: 0,
                                marginTop: 5,
                              }}
                              onClick={async () => {
                                if (
                                  confirm(
                                    `Contratar o Plano Prata por ${fmt(1500)}/semana?`,
                                  )
                                ) {
                                  await db
                                    .collection("players")
                                    .doc(user.data.id)
                                    .update({
                                      healthPlan: {
                                        name: "Prata",
                                        coverage: 30,
                                        cost: 1500,
                                      },
                                    });
                                }
                              }}
                            >
                              ASSINAR
                            </button>
                          </div>
                        </div>

                        <div
                          style={{
                            background: "#111",
                            padding: 10,
                            borderRadius: 5,
                            border: "1px solid gold",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <b style={{ color: "gold", fontSize: 13 }}>Ouro</b>
                            <br />
                            <small style={{ color: "#00E676" }}>
                              Cobre 50%
                            </small>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <b
                              style={{
                                color: "var(--danger)",
                                display: "block",
                              }}
                            >
                              {fmt(4000)}/s
                            </b>
                            <button
                              className="btn btn-ghost"
                              style={{
                                padding: "5px",
                                fontSize: 9,
                                width: "auto",
                                margin: 0,
                                marginTop: 5,
                                borderColor: "gold",
                                color: "gold",
                              }}
                              onClick={async () => {
                                if (
                                  confirm(
                                    `Contratar o Plano Ouro por ${fmt(4000)}/semana?`,
                                  )
                                ) {
                                  await db
                                    .collection("players")
                                    .doc(user.data.id)
                                    .update({
                                      healthPlan: {
                                        name: "Ouro",
                                        coverage: 50,
                                        cost: 4000,
                                      },
                                    });
                                }
                              }}
                            >
                              ASSINAR
                            </button>
                          </div>
                        </div>

                        <div
                          style={{
                            background: "linear-gradient(45deg, #111, #1a237e)",
                            padding: 10,
                            borderRadius: 5,
                            border: "1px solid cyan",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <b style={{ color: "cyan", fontSize: 13 }}>
                              Diamante
                            </b>
                            <br />
                            <small style={{ color: "#00E676" }}>
                              Cobre 70%
                            </small>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <b
                              style={{
                                color: "var(--danger)",
                                display: "block",
                              }}
                            >
                              {fmt(10000)}/s
                            </b>
                            <button
                              className="btn btn-blue"
                              style={{
                                padding: "5px",
                                fontSize: 9,
                                width: "auto",
                                margin: 0,
                                marginTop: 5,
                              }}
                              onClick={async () => {
                                if (
                                  confirm(
                                    `Contratar o Plano Diamante por ${fmt(10000)}/semana?`,
                                  )
                                ) {
                                  await db
                                    .collection("players")
                                    .doc(user.data.id)
                                    .update({
                                      healthPlan: {
                                        name: "Diamante",
                                        coverage: 70,
                                        cost: 10000,
                                      },
                                    });
                                }
                              }}
                            >
                              ASSINAR
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* --- MÓDULOS DOS CLUBES (USER) --- */}
              {user.type === "USER" && (
                <>
                  <div
                    className="card"
                    style={{
                      borderLeft: "4px solid var(--secondary)",
                      marginBottom: 15,
                    }}
                  >
                    <h4 style={{ marginTop: 0, color: "var(--secondary)" }}>
                      💸 Linhas de Crédito
                    </h4>

                    {user.data.stadiumLoan &&
                      user.data.stadiumLoan.installments > 0 && (
                        <div
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            padding: 15,
                            borderRadius: 8,
                            border: "1px solid cyan",
                            marginBottom: 10,
                          }}
                        >
                          <b style={{ color: "cyan" }}>
                            🏟️ Financiamento da Arena
                          </b>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 12,
                              marginTop: 10,
                              borderBottom: "1px dashed #444",
                              paddingBottom: 5,
                            }}
                          >
                            <span>
                              Faltam:{" "}
                              <b>
                                {user.data.stadiumLoan.installments} parcelas
                              </b>
                            </span>
                            <span>
                              Pagamento:{" "}
                              <b style={{ color: "var(--danger)" }}>
                                {fmt(user.data.stadiumLoan.weeklyPayment)}/sem
                              </b>
                            </span>
                          </div>
                        </div>
                      )}

                    {user.data.bankLoan &&
                    user.data.bankLoan.installments > 0 ? (
                      <div
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          padding: 15,
                          borderRadius: 8,
                          border: "1px solid #333",
                        }}
                      >
                        <b style={{ color: "var(--danger)" }}>
                          Empréstimo Ativo
                        </b>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            marginTop: 10,
                            borderBottom: "1px dashed #444",
                            paddingBottom: 5,
                          }}
                        >
                          <span>
                            Faltam:{" "}
                            <b>{user.data.bankLoan.installments} parcelas</b>
                          </span>
                          <span>
                            Pagamento:{" "}
                            <b style={{ color: "var(--danger)" }}>
                              {fmt(user.data.bankLoan.weeklyPayment)}/sem
                            </b>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {!showLoanUI ? (
                          <>
                            <p
                              style={{
                                fontSize: 11,
                                color: "#aaa",
                                marginBottom: 10,
                              }}
                            >
                              Precisa de caixa rápido? Pegue um empréstimo.
                            </p>
                            <button
                              className="btn btn-blue"
                              onClick={openLoanUI}
                            >
                              💰 SIMULAR EMPRÉSTIMO
                            </button>
                          </>
                        ) : (
                          <div
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              padding: 15,
                              borderRadius: 8,
                              border: "1px solid var(--secondary)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 5,
                              }}
                            >
                              <label
                                style={{
                                  color: "var(--secondary)",
                                  fontSize: 12,
                                  fontWeight: "bold",
                                }}
                              >
                                Valor do Empréstimo
                              </label>
                              <b style={{ color: "#fff" }}>{fmt(loanAmount)}</b>
                            </div>
                            <input
                              type="range"
                              min="10000"
                              max={
                                LOAN_LIMITS[user.data.serie || "VARZEA"] ||
                                500000
                              }
                              step="10000"
                              value={loanAmount}
                              onChange={(e) =>
                                setLoanAmount(Number(e.target.value))
                              }
                              style={{
                                width: "100%",
                                accentColor: "var(--secondary)",
                                marginBottom: 15,
                              }}
                            />

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 5,
                              }}
                            >
                              <label
                                style={{
                                  color: "var(--secondary)",
                                  fontSize: 12,
                                  fontWeight: "bold",
                                }}
                              >
                                Parcelas (Semanas)
                              </label>
                              <b style={{ color: "#fff" }}>{loanInst}x</b>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              step="1"
                              value={loanInst}
                              onChange={(e) =>
                                setLoanInst(Number(e.target.value))
                              }
                              style={{
                                width: "100%",
                                accentColor: "var(--secondary)",
                                marginBottom: 15,
                              }}
                            />

                            {(() => {
                              const interestRate = 0.1 + (loanInst - 1) * 0.05;
                              const totalToPay =
                                loanAmount * (1 + interestRate);
                              const weekly = totalToPay / loanInst;
                              return (
                                <div
                                  style={{
                                    background: "#111",
                                    padding: 10,
                                    borderRadius: 5,
                                    fontSize: 11,
                                    borderLeft: "3px solid var(--secondary)",
                                    marginBottom: 15,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span>Taxa de Juros:</span>{" "}
                                    <b style={{ color: "gold" }}>
                                      {(interestRate * 100).toFixed(0)}%
                                    </b>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      margin: "5px 0",
                                    }}
                                  >
                                    <span>Pagamento Semanal:</span>{" "}
                                    <b style={{ color: "var(--danger)" }}>
                                      {fmt(weekly)}
                                    </b>
                                  </div>
                                </div>
                              );
                            })()}

                            <div style={{ display: "flex", gap: 10 }}>
                              <button
                                className="btn btn-green"
                                onClick={handleConfirmLoan}
                              >
                                ASSINAR CONTRATO
                              </button>
                              <button
                                className="btn btn-red"
                                onClick={() => setShowLoanUI(false)}
                              >
                                CANCELAR
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div
                    className="card"
                    style={{ borderLeft: "4px solid #00E676" }}
                  >
                    <h4 style={{ marginTop: 0, color: "#00E676" }}>
                      📈 Fundo de Renda Fixa
                    </h4>

                    {user.data.bankInvestment &&
                    user.data.bankInvestment.amount > 0 ? (
                      <div
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          padding: 15,
                          borderRadius: 8,
                          border: "1px solid #333",
                        }}
                      >
                        <b style={{ color: "#00E676" }}>Investimento Ativo</b>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            marginTop: 10,
                          }}
                        >
                          <span>
                            Valor Aplicado:{" "}
                            <b>{fmt(user.data.bankInvestment.amount)}</b>
                          </span>
                          <span
                            style={{
                              color:
                                (user.data.bankInvestment.weeksLocked || 0) > 0
                                  ? "var(--warning)"
                                  : "lime",
                            }}
                          >
                            {(user.data.bankInvestment.weeksLocked || 0) > 0
                              ? `Bloqueado (${user.data.bankInvestment.weeksLocked} sem)`
                              : "Livre para Saque"}
                          </span>
                        </div>
                        <button
                          className="btn btn-red"
                          style={{ marginTop: 15 }}
                          onClick={handleWithdraw}
                        >
                          🏦 RESGATAR DINHEIRO
                        </button>
                      </div>
                    ) : (
                      <>
                        {!showInvestUI ? (
                          <>
                            <p
                              style={{
                                fontSize: 11,
                                color: "#aaa",
                                marginBottom: 10,
                              }}
                            >
                              Aplique seu dinheiro no banco rendendo{" "}
                              <b style={{ color: "#00E676" }}>2% de juros</b> na
                              virada de semana.
                            </p>
                            <button
                              className="btn btn-green"
                              style={{ color: "#000" }}
                              onClick={openInvestUI}
                            >
                              📊 SIMULAR INVESTIMENTO
                            </button>
                          </>
                        ) : (
                          <div
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              padding: 15,
                              borderRadius: 8,
                              border: "1px solid #00E676",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 5,
                              }}
                            >
                              <label
                                style={{
                                  color: "#00E676",
                                  fontSize: 12,
                                  fontWeight: "bold",
                                }}
                              >
                                Valor a Aplicar
                              </label>
                              <b style={{ color: "#fff" }}>
                                {fmt(investAmount)}
                              </b>
                            </div>

                            <input
                              type="range"
                              min="10000"
                              max={Math.min(
                                user.data.balance || 0,
                                50000000 -
                                  (user.data.bankInvestment?.amount || 0),
                              )}
                              step="10000"
                              value={investAmount}
                              onChange={(e) =>
                                setInvestAmount(Number(e.target.value))
                              }
                              style={{
                                width: "100%",
                                accentColor: "#00E676",
                                marginBottom: 15,
                              }}
                            />

                            {(() => {
                              const rendimento = investAmount * 0.02;
                              return (
                                <div
                                  style={{
                                    background: "#111",
                                    padding: 10,
                                    borderRadius: 5,
                                    fontSize: 11,
                                    borderLeft: "3px solid #00E676",
                                    marginBottom: 15,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span>Rendimento Semanal (2%):</span>{" "}
                                    <b style={{ color: "lime" }}>
                                      + {fmt(rendimento)}
                                    </b>
                                  </div>
                                </div>
                              );
                            })()}

                            <div style={{ display: "flex", gap: 10 }}>
                              <button
                                className="btn btn-green"
                                style={{ color: "#000" }}
                                onClick={handleConfirmInvest}
                              >
                                CONFIRMAR APLICAÇÃO
                              </button>
                              <button
                                className="btn btn-red"
                                onClick={() => setShowInvestUI(false)}
                              >
                                CANCELAR
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div
                    className="card"
                    style={{ borderLeft: "4px solid #D500F9", marginTop: 15 }}
                  >
                    <h4 style={{ marginTop: 0, color: "#D500F9" }}>
                      🏥 Plano de Saúde do Elenco
                    </h4>

                    {user.data.healthPlan ? (
                      <div
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          padding: 15,
                          borderRadius: 8,
                          border: "1px solid #333",
                        }}
                      >
                        <b style={{ color: "#D500F9" }}>Cobertura Ativa</b>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            marginTop: 10,
                            borderBottom: "1px dashed #444",
                            paddingBottom: 5,
                          }}
                        >
                          <span>
                            Plano: <b>{user.data.healthPlan.name}</b>
                          </span>
                          <span>
                            Cobre:{" "}
                            <b style={{ color: "lime" }}>
                              {user.data.healthPlan.coverage}% de Cirurgias
                            </b>
                          </span>
                        </div>
                        <button
                          className="btn btn-red"
                          style={{ marginTop: 15 }}
                          onClick={async () => {
                            if (confirm("Cancelar o Plano de Saúde?")) {
                              await db
                                .collection("teams")
                                .doc(user.data.id)
                                .update({
                                  healthPlan:
                                    firebase.firestore.FieldValue.delete(),
                                });
                              alert("Plano cancelado.");
                            }
                          }}
                        >
                          ❌ CANCELAR PLANO
                        </button>
                      </div>
                    ) : (
                      <>
                        {(() => {
                          const s = user.data.serie || "VARZEA";
                          const costs = {
                            VARZEA: { basic: 5000, master: 15000 },
                            D: { basic: 15000, master: 40000 },
                            C: { basic: 30000, master: 80000 },
                            B: { basic: 60000, master: 150000 },
                            A: { basic: 150000, master: 350000 },
                          };
                          const myCost = costs[s] || costs["VARZEA"];

                          return (
                            <div style={{ display: "grid", gap: 10 }}>
                              <div
                                style={{
                                  background: "#111",
                                  padding: 10,
                                  borderRadius: 5,
                                  border: "1px solid #333",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <b style={{ color: "silver", fontSize: 13 }}>
                                    Plano Básico
                                  </b>
                                  <br />
                                  <small style={{ color: "#00E676" }}>
                                    Cobre 30%
                                  </small>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <b
                                    style={{
                                      color: "var(--danger)",
                                      display: "block",
                                    }}
                                  >
                                    {fmt(myCost.basic)}/s
                                  </b>
                                  <button
                                    className="btn btn-ghost"
                                    style={{
                                      padding: "5px",
                                      fontSize: 9,
                                      width: "auto",
                                      margin: 0,
                                      marginTop: 5,
                                      border: "1px solid silver",
                                    }}
                                    onClick={async () => {
                                      if (
                                        confirm(
                                          `Contratar o Plano Básico por ${fmt(myCost.basic)}/semana?`,
                                        )
                                      ) {
                                        await db
                                          .collection("teams")
                                          .doc(user.data.id)
                                          .update({
                                            healthPlan: {
                                              name: "Básico",
                                              coverage: 30,
                                              cost: myCost.basic,
                                            },
                                          });
                                        alert("Plano Básico ativado!");
                                      }
                                    }}
                                  >
                                    ASSINAR
                                  </button>
                                </div>
                              </div>

                              <div
                                style={{
                                  background: "#111",
                                  padding: 10,
                                  borderRadius: 5,
                                  border: "1px solid gold",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <b style={{ color: "gold", fontSize: 13 }}>
                                    Plano Master
                                  </b>
                                  <br />
                                  <small style={{ color: "#00E676" }}>
                                    Cobre 70%
                                  </small>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <b
                                    style={{
                                      color: "var(--danger)",
                                      display: "block",
                                    }}
                                  >
                                    {fmt(myCost.master)}/s
                                  </b>
                                  <button
                                    className="btn btn-gold"
                                    style={{
                                      color: "#000",
                                      padding: "5px",
                                      fontSize: 9,
                                      width: "auto",
                                      margin: 0,
                                      marginTop: 5,
                                    }}
                                    onClick={async () => {
                                      if (
                                        confirm(
                                          `Contratar o Plano Master por ${fmt(myCost.master)}/semana?`,
                                        )
                                      ) {
                                        await db
                                          .collection("teams")
                                          .doc(user.data.id)
                                          .update({
                                            healthPlan: {
                                              name: "Master",
                                              coverage: 70,
                                              cost: myCost.master,
                                            },
                                          });
                                        alert("Plano Master ativado!");
                                      }
                                    }}
                                  >
                                    ASSINAR
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {hTab === "BALADA" && (
        <div className="animate-in">
          <div
            style={{
              background: "linear-gradient(90deg, #4a148c, #000)",
              padding: 15,
              borderRadius: 8,
              color: "white",
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid var(--purple)",
            }}
          >
            <span style={{ fontSize: 30 }}>🍸</span>
            <div>
              <b style={{ display: "block", color: "var(--purple)" }}>
                LOUNGE MUNICIPAL
              </b>
              <small style={{ color: "#aaa" }}>
                Área VIP, Cassino e Muita Resenha
              </small>
            </div>
          </div>

          {user.type !== "PLAYER" && user.type !== "COACH" ? (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: 30,
                color: "#888",
                border: "1px dashed #666",
              }}
            >
              <i
                className="fas fa-lock"
                style={{ fontSize: 40, marginBottom: 10 }}
              ></i>
              <p>
                A entrada é restrita apenas a Pessoas Físicas (Jogadores e
                Técnicos).
              </p>
            </div>
          ) : (
            <div
              className="card"
              style={{
                borderLeft: "4px solid var(--purple)",
                textAlign: "center",
                padding: "20px 10px",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--purple)" }}>
                Entrar na Área VIP
              </h3>
              <p style={{ fontSize: 11, color: "#aaa", marginBottom: 20 }}>
                Quer relaxar a mente, fazer contatos milionários ou correr o
                risco de beber demais e virar desfalque amanhã? Gire os dados da
                noite!
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 20,
                  fontSize: 10,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    background: "rgba(0,230,118,0.1)",
                    padding: 8,
                    borderRadius: 5,
                    border: "1px solid lime",
                  }}
                >
                  <span style={{ color: "lime", fontWeight: "bold" }}>
                    🟢 O que pode dar bom:
                  </span>
                  <br />
                  <br />
                  • Recuperar 100% da Energia
                  <br />
                  • Fechar um grande Patrocínio
                  <br />• Ganhar muita Fama e Moral
                </div>
                <div
                  style={{
                    background: "rgba(255,23,68,0.1)",
                    padding: 8,
                    borderRadius: 5,
                    border: "1px solid red",
                  }}
                >
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    🔴 O que pode dar ruim:
                  </span>
                  <br />
                  <br />
                  • Ressaca severa (Zera Energia)
                  <br />
                  • Briga (Lesão de 1 jogo fora)
                  <br />• Vazar fotos na Imprensa
                </div>
              </div>

              <button
                className="btn btn-purple"
                style={{ padding: "15px", fontSize: 14, fontWeight: "900" }}
                onClick={handleNightclub}
              >
                🎵 PAGAR ENTRADA VIP (₣ 5.000)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
