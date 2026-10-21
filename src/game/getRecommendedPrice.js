export const getRecommendedPrice = (ovr, pos) => {
  const o = parseInt(ovr) || 0;

  // 1. Tabela Base por Overall
  let base = 40000; // Padrão (50-54)
  if (o >= 90) base = 20000000;
  else if (o >= 85) base = 10000000;
  else if (o >= 80) base = 6000000;
  else if (o >= 75) base = 3000000;
  else if (o >= 70) base = 1000000;
  else if (o >= 65) base = 400000;
  else if (o >= 60) base = 150000;
  else if (o >= 55) base = 80000;

  // 2. Multiplicador por Posição
  let mult = 1.0; // Base (Laterais e Meias)
  if (pos === "GOL")
    mult = 1.2; // +20%
  else if (["ZAG"].includes(pos))
    mult = 1.15; // +15%
  else if (["VOL", "MC", "MD", "ME"].includes(pos))
    mult = 1.05; // +5%
  else if (["PTD", "PTE"].includes(pos))
    mult = 0.95; // -5%
  else if (["ATA", "SA"].includes(pos)) mult = 0.9; // -10%

  return Math.round(base * mult);
};
