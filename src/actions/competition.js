import {evolveSeason} from '../game/progression.js';
import {careerOf} from '../matches/policy.js';
import { STADIUM_DB } from "../game/STADIUM_DB.js";
import { DEFAULT_PRIZES } from "../game/DEFAULT_PRIZES.js";
import { ESTADOS } from "../game/ESTADOS.js";
import { firebase } from "../services/firebase.js";
import { db } from "../services/firebase.js";

export function createCompetitionActions(context, actions) {
  const { setModal, setLoading, teams, conf, players, user } = context;
  const postNews = (...args) => actions.postNews(...args);
  const handleSaveMatch = async (matchData) => {
    if (!matchData) {
      setModal(null);
      return;
    } // Cancelar

    setLoading(true);
    try {
      if (matchData.id) {
        // Edição
        await db.collection("matches").doc(matchData.id).update(matchData);
        alert("Partida atualizada!");
      } else {
        // Criação
        await db.collection("matches").add(matchData);
        alert("Partida criada!");
      }
      setModal(null);
    } catch (e) {
      alert("Erro: " + e.message);
    }
    setLoading(false);
  };

  const handleDeleteMatch = async (matchId) => {
    if (
      !confirm("Tem certeza que deseja excluir esta partida permanentemente?")
    )
      return;
    await db.collection("matches").doc(matchId).delete();
    setModal(null);
    alert("Partida excluída.");
  };

  const generateFixtures = async () => {
    if (
      !confirm(
        "Gerar tabela de jogos para TODAS as séries (A, B, C, D e Várzea)?",
      )
    )
      return;

    setLoading(true);
    const db = firebase.firestore();

    // 🔥 SOLUÇÃO BUG A: SISTEMA DE LOTES INFINITOS (Bypass Limite 500)
    let batches = [db.batch()];
    let opCount = 0;
    const getBatch = () => {
      if (opCount >= 450) {
        batches.push(db.batch());
        opCount = 0;
      }
      opCount++;
      return batches[batches.length - 1];
    };

    try {
      // Limpa jogos antigos de forma segura
      // 1. GERA AS LIGAS NACIONAIS (SÉRIES)
      const seriesToGen = ["A", "B", "C", "D", "VARZEA"];
      seriesToGen.forEach((serie) => {
        const leagueTeams = teams.filter(
          (t) => t.serie === serie && t.status === "ACTIVE",
        );
        if (leagueTeams.length < 2) return;

        const numRounds = (leagueTeams.length - 1) * 2;
        let ids = leagueTeams.map((t) => t.id);
        if (ids.length % 2 !== 0) ids.push(null);

        for (let round = 0; round < numRounds; round++) {
          const isReturnLeg = round >= numRounds / 2;
          for (let i = 0; i < ids.length / 2; i++) {
            let home = ids[i];
            let away = ids[ids.length - 1 - i];
            if (!home || !away) continue;
            if (isReturnLeg) {
              [home, away] = [away, home];
            }

            const hTeam = teams.find((t) => t.id === home);
            const aTeam = teams.find((t) => t.id === away);
            getBatch().set(db.collection("matches").doc(), {
              serie: serie,
              round: round + 1,
              homeId: home,
              homeName: hTeam.name,
              homeLogo: hTeam.logo || null,
              awayId: away,
              awayName: aTeam.name,
              awayLogo: aTeam.logo || null,
              scoreHome: 0,
              scoreAway: 0,
              status: "PENDING",
              played: false,
            });
          }
          ids.splice(1, 0, ids.pop());
        }
      });

      // 2. GERA OS ESTADUAIS (FASE 1 - TODOS CONTRA TODOS DO ESTADO)
      ESTADOS.forEach((estado) => {
        const stateTeams = teams.filter(
          (t) => t.estado === estado && t.status === "ACTIVE",
        );
        if (stateTeams.length < 2) return;

        const numRounds = stateTeams.length - 1; // Apenas Jogo de Ida (Fase Curta)
        let ids = stateTeams.map((t) => t.id);
        if (ids.length % 2 !== 0) ids.push(null);

        for (let round = 0; round < numRounds; round++) {
          for (let i = 0; i < ids.length / 2; i++) {
            let home = ids[i];
            let away = ids[ids.length - 1 - i];
            if (!home || !away) continue;
            // Sorteia quem joga em casa na fase única
            if (Math.random() > 0.5) {
              [home, away] = [away, home];
            }

            const hTeam = teams.find((t) => t.id === home);
            const aTeam = teams.find((t) => t.id === away);
            getBatch().set(db.collection("matches").doc(), {
              serie: "ESTADUAL",
              estado: estado,
              round: `Fase 1 (Rod. ${round + 1})`,
              homeId: home,
              homeName: hTeam.name,
              homeLogo: hTeam.logo || null,
              awayId: away,
              awayName: aTeam.name,
              awayLogo: aTeam.logo || null,
              scoreHome: 0,
              scoreAway: 0,
              status: "PENDING",
              played: false,
              isEstadual: true,
            });
          }
          ids.splice(1, 0, ids.pop());
        }
      });

      // Executa todos os lotes gerados!
      for (let b of batches) {
        await b.commit();
      }

      setLoading(false);
      postNews(
        "📅 **TABELA DIVULGADA!**\nA Federação liberou o calendário de jogos da temporada (incluindo Várzea).",
        "infra",
      );
      alert("Jogos gerados com sucesso e sem travamentos!");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Erro ao gerar tabela: " + error.message);
    }
  };

  const handleSeasonTurnAdvanced = async () => {
    if (
      !confirm(
        "⚠️ ATENÇÃO: Isso encerrará a temporada atual!\n\n1. Pagará Premiações Finais\n2. Aplica Promoção/Rebaixamento\n3. Evolui Atributos e Overall (XP)\n4. Envelhece contratos e Zera estatísticas",
      )
    )
      return;

    setLoading(true);
    const db = firebase.firestore();
    const currentSeason = conf.season || 1;

    // 🔥 SOLUÇÃO BUG A: SISTEMA DE LOTES INFINITOS (Bypass Limite 500)
    let batches = [db.batch()];
    let opCount = 0;
    const getBatch = () => {
      if (opCount >= 450) {
        batches.push(db.batch());
        opCount = 0;
      }
      opCount++;
      return batches[batches.length - 1];
    };

    const sortTable = (list) =>
      list.sort((a, b) => {
        const pA = a.stats?.pts || 0,
          pB = b.stats?.pts || 0;
        if (pA !== pB) return pB - pA;
        const vA = a.stats?.wins || 0,
          vB = b.stats?.wins || 0;
        if (vA !== vB) return vB - vA;
        const sgA = (a.stats?.gf || 0) - (a.stats?.ga || 0),
          sgB = (b.stats?.gf || 0) - (b.stats?.ga || 0);
        if (sgA !== sgB) return sgB - sgA;
        const cA = a.stats?.cards || 0,
          cB = b.stats?.cards || 0;
        return cA - cB;
      });

    const tA = sortTable(
      teams.filter((t) => t.serie === "A" && t.status !== "PENDING"),
    );
    const tB = sortTable(
      teams.filter((t) => t.serie === "B" && t.status !== "PENDING"),
    );
    const tC = sortTable(
      teams.filter((t) => t.serie === "C" && t.status !== "PENDING"),
    );
    const tD = sortTable(
      teams.filter((t) => t.serie === "D" && t.status !== "PENDING"),
    );
    const tVarzea = sortTable(
      teams.filter((t) => t.serie === "VARZEA" && t.status !== "PENDING"),
    );

    const activePrizes = conf.prizes || DEFAULT_PRIZES;

    const calculatePrize = (serie, index, totalTeams) => {
      const pos = index + 1;
      const isRelegated =
        (serie === "A" || serie === "B" || serie === "C") &&
        index >= totalTeams - 2;
      const isRelegatedD = serie === "D" && index >= totalTeams - 3;
      const p = activePrizes[serie] || DEFAULT_PRIZES[serie];

      if (serie === "A") {
        if (pos === 1) return p.champ;
        if (pos === 2) return p.vice;
        if (pos === 3) return p.third;
        if (isRelegated) return p.rel;
        return p.mid;
      }
      if (serie === "B" || serie === "C") {
        if (pos === 1) return p.champ;
        if (pos === 2) return p.vice;
        if (isRelegated) return p.rel;
        return p.mid;
      }
      if (serie === "D") {
        if (pos === 1) return p.champ;
        if (pos === 2) return p.vice;
        if (isRelegatedD) return p.rel;
        return p.mid;
      }
      if (serie === "VARZEA") {
        if (pos === 1) return p.champ;
        if (pos === 2) return p.vice;
        if (pos === 3) return p.third;
        return p.mid;
      }
      return 0;
    };

    const awardPrizes = (teamList, serieName) => {
      teamList.forEach((t, i) => {
        const prize = calculatePrize(serieName, i, teamList.length);
        getBatch().update(db.collection("teams").doc(t.id), {
          balance: firebase.firestore.FieldValue.increment(prize),
        });
      });
    };

    awardPrizes(tA, "A");
    awardPrizes(tB, "B");
    awardPrizes(tC, "C");
    awardPrizes(tD, "D");
    awardPrizes(tVarzea, "VARZEA");

    const champA = tA[0];
    const champB = tB[0];
    const champC = tC[0];
    const champD = tD[0];
    const champVarzea = tVarzea[0];

    // 2. HALL DA FAMA
    const topScorer = [...players].sort(
      (a, b) =>
        ((b.stats && b.stats.goals) || 0) - ((a.stats && a.stats.goals) || 0),
    )[0];
    const topAssist = [...players].sort(
      (a, b) =>
        ((b.stats && b.stats.assists) || 0) -
        ((a.stats && a.stats.assists) || 0),
    )[0];
    const topSaves = [...players].sort(
      (a, b) =>
        ((b.stats && b.stats.saves) || 0) - ((a.stats && a.stats.saves) || 0),
    )[0];
    const topRating = [...players]
      .filter((p) => p.pressRatingCount > 0)
      .sort((a, b) => (b.pressRatingAvg || 0) - (a.pressRatingAvg || 0))[0];

    const hallRef = db.collection("hallOfFame").doc(`season_${currentSeason}`);
    getBatch().set(hallRef, {
      season: currentSeason,
      date: Date.now(),
      champA: champA ? { name: champA.name, logo: champA.logo } : null,
      champB: champB ? { name: champB.name, logo: champB.logo } : null,
      champC: champC ? { name: champC.name, logo: champC.logo } : null,
      champD: champD ? { name: champD.name, logo: champD.logo } : null,
      champVarzea: champVarzea
        ? { name: champVarzea.name, logo: champVarzea.logo }
        : null,
      topScorer:
        topScorer && topScorer.stats?.goals > 0
          ? {
              name: topScorer.name,
              face: topScorer.face,
              val: topScorer.stats.goals,
            }
          : null,
      topAssist:
        topAssist && topAssist.stats?.assists > 0
          ? {
              name: topAssist.name,
              face: topAssist.face,
              val: topAssist.stats.assists,
            }
          : null,
      topSaves:
        topSaves && topSaves.stats?.saves > 0
          ? {
              name: topSaves.name,
              face: topSaves.face,
              val: topSaves.stats.saves,
            }
          : null,
      topRating: topRating
        ? {
            name: topRating.name,
            face: topRating.face,
            val: topRating.pressRatingAvg,
          }
        : null,
    });

    // 3. PROMOÇÃO E REBAIXAMENTO
    if (tA.length > 0 || tB.length > 0) {
      tA.slice(-2).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), { serie: "B" }),
      );
      tB.slice(0, 2).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), { serie: "A" }),
      );
      tB.slice(-2).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), { serie: "C" }),
      );
      tC.slice(0, 2).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), { serie: "B" }),
      );
      tC.slice(-2).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), { serie: "D" }),
      );
      tD.slice(0, 2).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), { serie: "C" }),
      );
      tD.slice(-3).forEach((t) =>
        getBatch().update(db.collection("teams").doc(t.id), {
          serie: "VARZEA",
        }),
      );
      tVarzea
        .slice(0, 3)
        .forEach((t) =>
          getBatch().update(db.collection("teams").doc(t.id), { serie: "D" }),
        );
    }

    teams.forEach((t) => {
      getBatch().update(db.collection("teams").doc(t.id), {
        stats: { pts: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, cards: 0 },
      });
    });
    getBatch().update(db.collection("config").doc("system"), {
      season: currentSeason + 1,
    });

    // 🔥 SOLUÇÃO BUG B: JOGADORES (Evolução Inteligente e Contratos)
    players.forEach((p) => {
      let updates = {
        stats: {
          goals: 0,
          assists: 0,
          tackles: 0,
          saves: 0,
          yellows: 0,
          reds: 0,
        },
        pressRatingSum: 0,
        pressRatingCount: 0,
        pressRatingAvg: 0,
      };

      Object.assign(updates, evolveSeason(p));
      updates.career = careerOf(p);

      let nc = (parseInt(p.contract) || 0) - 1;
      if (nc < 0) nc = 0;

      if (nc === 0) {
        if (!p.loanMeta || !p.loanMeta.ownerId) {
          updates.contract = 0;
          updates.teamId = "FREE";
          updates.status = "VENDA";
          updates.mood = "😐";
        } else {
          updates.teamId = p.loanMeta.ownerId;
          updates.contract =
            parseInt(p.loanMeta.originalContract) > 0
              ? parseInt(p.loanMeta.originalContract)
              : 1;
          updates.status = "NAO_A_VENDA";
          updates.loanMeta = firebase.firestore.FieldValue.delete();
        }
      } else {
        updates.contract = nc;
      }

      getBatch().update(db.collection("players").doc(p.id), updates);
    });

    // 6. ENVELHECIMENTO DA COMISSÃO TÉCNICA
    const coachSnap = await db
      .collection("users")
      .where("type", "in", ["COACH", "DOCTOR", "SCOUT", "ASSISTANT"])
      .get();
    coachSnap.docs.forEach((doc) => {
      const c = doc.data();
      if (c.teamId && c.teamId !== "FREE") {
        const newContract = (c.contract || 1) - 1;
        if (newContract <= 0) {
          getBatch().update(doc.ref, {
            teamId: "FREE",
            contract: 0,
            salary: 2500,
          });
        } else {
          getBatch().update(doc.ref, { contract: newContract });
        }
      }
    });

    try {
      // Executa todos os lotes!
      for (let b of batches) {
        await b.commit();
      }

      setLoading(false);
      postNews(
        `🏆 **FIM DA TEMPORADA ${currentSeason}!**\nAs premiações foram depositadas! Parabéns aos campeões:\n\n🥇 Série A: ${champA?.name || "Ninguém"}\n🥈 Série B: ${champB?.name || "Ninguém"}\n🥉 Série C: ${champC?.name || "Ninguém"}\n🏅 Série D: ${champD?.name || "Ninguém"}`,
        "finance",
      );
      alert(
        `Temporada ${currentSeason} encerrada com sucesso!\n\nPremiações pagas, acessos e descensos definidos, atributos evoluídos e Museu atualizado!`,
      );
    } catch (e) {
      setLoading(false);
      alert("Erro na virada: " + e.message);
    }
  };

  const saveTactics = async (teamId, formation, lineup, editorRole) => {
    const ref = db.collection("teams").doc(teamId);
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists) throw Error("O time não foi encontrado.");
      const revision = (snapshot.data().tactics?.revision || 0) + 1;
      transaction.update(ref, {
        tactics: {
          formation,
          lineup,
          revision,
          updatedAt: Date.now(),
          updatedBy: editorRole,
        },
      });
    });
    alert("Formação e escalação atualizadas e sincronizadas entre o time e o técnico.");
  };

  const saveMatchStats = async (
    dataPayload,
    legacyMatch,
    legacyXp,
    homeTeam = null,
    matchDataObj = null,
  ) => {
    let batchData = [];

    if (legacyMatch && legacyMatch.goals !== undefined) {
      batchData = [
        { player: dataPayload, match: legacyMatch, xpOverride: legacyXp },
      ];
    } else {
      batchData = Array.isArray(dataPayload) ? dataPayload : [dataPayload];
    }

    if (batchData.length === 0) return alert("Nenhum dataPayload para salvar.");

    setLoading(true);
    const b = db.batch();
    let count = 0;

    const R = {
      GOAL: 20,
      ASSIST: 15,
      TACKLE: 10,
      SAVE: 12,
      WIN: 30,
      DRAW: 10,
      LOSS: -10,
      YELLOW: -10,
      RED: -30,
      RATING_MULT: 5,
    };

    batchData.forEach((item) => {
      const { player, match, xpOverride } = item;
      if (!player || !match) return;

      let xp = 0;
      if (xpOverride !== undefined) {
        xp = xpOverride;
      } else {
        xp += (match.goals || 0) * R.GOAL;
        xp += (match.assists || 0) * R.ASSIST;
        xp += (match.tackles || 0) * R.TACKLE;
        xp += (match.saves || 0) * R.SAVE;
        xp += (match.yellows || 0) * R.YELLOW;
        xp += (match.reds || 0) * R.RED;
        if (match.result === "VITORIA") xp += R.WIN;
        if (match.result === "EMPATE") xp += R.DRAW;
        if (match.result === "DERROTA") xp += R.LOSS;
        xp += (parseFloat(match.rating) || 0) * R.RATING_MULT;
      }
      const xpGained = parseInt(xp);

      const pRef = db.collection("players").doc(player.id);

      // 1. DADOS GERAIS (Carreira)
      const newStats = {
        goals: (player.stats?.goals || 0) + (match.goals || 0),
        assists: (player.stats?.assists || 0) + (match.assists || 0),
        tackles: (player.stats?.tackles || 0) + (match.tackles || 0),
        saves: (player.stats?.saves || 0) + (match.saves || 0),
        yellows: (player.stats?.yellows || 0) + (match.yellows || 0),
        reds: (player.stats?.reds || 0) + (match.reds || 0),
      };

      const currentSum = player.pressRatingSum || 0;
      const currentCount = player.pressRatingCount || 0;
      const newSum = currentSum + parseFloat(match.rating || 0);
      const newCount = currentCount + 1;
      const newAvg = newSum / newCount;

      const updateData = {
        stats: newStats,
        pendingXP: (player.pendingXP || 0) + xpGained,
        pressRatingSum: newSum,
        pressRatingCount: newCount,
        pressRatingAvg: parseFloat(newAvg.toFixed(1)),
        energy: Math.max(0, (player.energy || 100) - 25),
      };

      if (match.injury && (match.recoveryLeft || 0) > 0) {
        updateData.injury = match.injury;
        updateData.recoveryLeft = parseInt(match.recoveryLeft);
        updateData.mood = "😡";
      }

      // 2. MATEMÁTICA DUPLA: DADOS DA COPA ISOLADOS
      const matchSerie = matchDataObj ? matchDataObj.serie : match.serie;
      const isCustomTourn =
        matchSerie && !["A", "B", "C", "D", "VARZEA"].includes(matchSerie);

      if (isCustomTourn) {
        const tournId = matchSerie;
        const currentTournaments = player.tournaments || {};
        const currentTournStats = currentTournaments[tournId] || {
          goals: 0,
          assists: 0,
          tackles: 0,
          saves: 0,
          yellows: 0,
          reds: 0,
          ratingSum: 0,
          ratingCount: 0,
        };

        updateData.tournaments = {
          ...currentTournaments,
          [tournId]: {
            goals: currentTournStats.goals + (match.goals || 0),
            assists: currentTournStats.assists + (match.assists || 0),
            tackles: currentTournStats.tackles + (match.tackles || 0),
            saves: currentTournStats.saves + (match.saves || 0),
            yellows: currentTournStats.yellows + (match.yellows || 0),
            reds: currentTournStats.reds + (match.reds || 0),
            ratingSum:
              currentTournStats.ratingSum + (parseFloat(match.rating) || 0),
            ratingCount: currentTournStats.ratingCount + 1,
          },
        };
      }

      b.update(pRef, updateData);
      count++;
    });

    // BILHETERIA E LOJA DO ESTÁDIO (Se mandante)
    if (homeTeam && homeTeam.id && matchDataObj && !matchDataObj.neutralFinal) {
      const lvl = homeTeam.stadiumLevel || 1;
      const sDb = STADIUM_DB[lvl] || STADIUM_DB[1];
      const ticPrice = homeTeam.ticketPrice || sDb.minTic;
      const priceFactor =
        1.0 - ((ticPrice - sDb.minTic) / (sDb.maxTic - sDb.minTic || 1)) * 0.6;
      const rngFactor = (Math.floor(Math.random() * 41) + 80) / 100;
      let attendance = Math.floor(sDb.cap * priceFactor * rngFactor);
      if (attendance > sDb.cap) attendance = sDb.cap;

      const ticketRevenue = attendance * ticPrice;
      const baseConversionRate = [0, 0.05, 0.1, 0.15, 0.2, 0.25][lvl] || 0.05;

      let totalStoreRevenue = 0;
      let currentProducts = [...(homeTeam.storeProducts || [])];
      const updatedProducts = currentProducts.map((prod) => {
        let priceDifficulty = 1;
        if (prod.price > 30) priceDifficulty = Math.max(0.05, 30 / prod.price);
        const potentialBuyers = Math.floor(
          attendance * baseConversionRate * priceDifficulty,
        );
        const itemsSold = Math.min(potentialBuyers, prod.stock);
        totalStoreRevenue += itemsSold * prod.price;
        return { ...prod, stock: prod.stock - itemsSold };
      });

      const teamRef = db.collection("teams").doc(homeTeam.id);
      b.update(teamRef, {
        balance: firebase.firestore.FieldValue.increment(ticketRevenue),
        storeBalance:
          firebase.firestore.FieldValue.increment(totalStoreRevenue),
        storeProducts: updatedProducts,
      });
    }

    // FASE DO TIME E AUTOMAÇÃO DE TABELA / PLACAR
    const teamResults = {};
    let totalGoalsInThisSumula = 0; // Vai somar os gols lançados agora

    batchData.forEach((item) => {
      if (item.player && item.player.teamId && item.player.teamId !== "FREE") {
        teamResults[item.player.teamId] = item.match.result;
        totalGoalsInThisSumula += item.match.goals || 0; // Soma os gols
      }
    });

    const submittedTeamId = Object.keys(teamResults)[0]; // Pega o ID do time que está sendo salvo

    Object.keys(teamResults).forEach((tid) => {
      if (teamResults[tid] !== "NENHUM") {
        const tObj = teams.find((t) => t.id === tid);
        if (tObj) {
          let updatesToTeam = {};

          // 1. Atualiza as bolinhas verdes e vermelhas (Fase)
          let form = tObj.recentForm || [];
          form.unshift(teamResults[tid]);
          if (form.length > 5) form.pop();
          updatesToTeam.recentForm = form;

          // 2. Atualiza a Tabela de Classificação
          const isEstadualMatch = matchDataObj && matchDataObj.isEstadual;
          const isLeague = ["A", "B", "C", "D", "VARZEA"].includes(tObj.serie);

          if (isLeague || isEstadualMatch) {
            // Se for estadual, mexe no stateStats. Senão, no stats normal.
            let currentStats = isEstadualMatch
              ? tObj.stateStats || {
                  pts: 0,
                  wins: 0,
                  draws: 0,
                  losses: 0,
                  gf: 0,
                  ga: 0,
                }
              : tObj.stats || {
                  pts: 0,
                  wins: 0,
                  draws: 0,
                  losses: 0,
                  gf: 0,
                  ga: 0,
                  cards: 0,
                };
            let newStats = { ...currentStats };

            newStats.gf += totalGoalsInThisSumula; // Adiciona os gols feitos

            if (teamResults[tid] === "VITORIA") {
              newStats.pts += 3;
              newStats.wins += 1;
            } else if (teamResults[tid] === "EMPATE") {
              newStats.pts += 1;
              newStats.draws += 1;
            } else if (teamResults[tid] === "DERROTA") {
              newStats.losses += 1;
            }

            // Salva no lugar certo
            if (isEstadualMatch) {
              updatesToTeam.stateStats = newStats;
            } else {
              updatesToTeam.stats = newStats;
            }
          }

          b.update(db.collection("teams").doc(tid), updatesToTeam);
        }
      }
    });

    // 3. Atualiza o Placar na Central de Jogos Automaticamente
    if (matchDataObj && matchDataObj.id && submittedTeamId) {
      let matchUpdates = {};
      if (submittedTeamId === matchDataObj.homeId) {
        matchUpdates.scoreHome = totalGoalsInThisSumula;
      } else if (submittedTeamId === matchDataObj.awayId) {
        matchUpdates.scoreAway = totalGoalsInThisSumula;
      }
      matchUpdates.status = "FINISHED"; // Marca o jogo como finalizado

      b.update(db.collection("matches").doc(matchDataObj.id), matchUpdates);
    }

    await b.commit();
    setLoading(false);
    setModal(null);
    alert(
      `${count} súmula(s) lançada(s) com sucesso!${homeTeam && !matchDataObj?.neutralFinal ? "\n🏟️ Bilheteria e vendas da Loja contabilizadas!" : ""}`,
    );
  };
  return {
    handleSaveMatch,
    handleDeleteMatch,
    generateFixtures,
    handleSeasonTurnAdvanced,
    saveTactics,
    saveMatchStats,
  };
}
