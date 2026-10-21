import { getSalaryLimits } from "./getSalaryLimits.js";
import { fmt } from "./fmt.js";

export const processBotDecision = (offer, buyingTeam, npcPlayer) => {
  const minFairSalary = getSalaryLimits(npcPlayer.overall).minSal;
  const offeredSalary = parseFloat(offer.meta.newSalary) || 0;

  // Fator Fase do Time (O Bot não quer ir para time que só perde)
  const form = buyingTeam.recentForm || [];
  const wins = form.filter((r) => r === "VITORIA").length;
  const losses = form.filter((r) => r === "DERROTA").length;

  // Se o time está muito mal, o bot exige mais dinheiro para aceitar ir (Mercenário)
  let salaryRequirementMult = 1.0;
  if (losses > wins) salaryRequirementMult = 1.2; // Exige 20% a mais
  if (wins > losses) salaryRequirementMult = 0.9; // Aceita ganhar 10% a menos pra jogar em time vencedor

  const targetSalary = minFairSalary * salaryRequirementMult;

  if (offeredSalary >= targetSalary) {
    return {
      decision: "ACCEPT",
      message: `🤖 O empresário de ${npcPlayer.name} achou a oferta excelente e aceitou os termos contratuais!`,
    };
  } else if (offeredSalary >= targetSalary * 0.8) {
    return {
      decision: "COUNTER",
      counterValue: targetSalary,
      message: `🤖 O jogador tem interesse no ${buyingTeam.name}, mas pede um ajuste salarial para ${fmt(targetSalary)}.`,
    };
  } else {
    return {
      decision: "REJECT",
      message: `🤖 A proposta salarial foi considerada muito baixa pelo staff de ${npcPlayer.name}. Negociação encerrada.`,
    };
  }
};
