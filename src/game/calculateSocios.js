export const calculateSocios = (team, teamPlayers) => {
  if (!team) return 0;
  const baseBySerie = { A: 10000, B: 4000, C: 1500, D: 500, VARZEA: 100 };
  const base = baseBySerie[team.serie || "VARZEA"] || 100;

  // 1. Fator Fama (Soma da fama do elenco / 20)
  const totalFame = teamPlayers.reduce((acc, p) => acc + (p.fame || 0), 0);
  const fameBonus = Math.floor(totalFame / 20);

  // 2. Fator Fase do Time (Últimos 5 jogos)
  const form = team.recentForm || []; // Ex: ['VITORIA', 'EMPATE', 'DERROTA']
  let formMultiplier = 1.0;
  if (form.length > 0) {
    const wins = form.filter((r) => r === "VITORIA").length;
    const losses = form.filter((r) => r === "DERROTA").length;
    if (wins > losses) formMultiplier += wins * 0.06; // Até +30%
    if (losses > wins) formMultiplier -= losses * 0.08; // Até -40%
  }

  const potentialSocios = Math.floor((base + fameBonus) * formMultiplier);

  // 3. Fator Ganância (Preço)
  const price = team.socioPrice || 40;
  let priceMultiplier = 1.0;
  if (price > 10) {
    // Equação linear: 10 = 100% de adesão | 150 = 10% de adesão
    priceMultiplier = 1.0 - (price - 10) * 0.006428;
  }
  if (priceMultiplier < 0.05) priceMultiplier = 0.05; // Mínimo de 5% de loucos que pagam qualquer preço

  return Math.max(0, Math.floor(potentialSocios * priceMultiplier));
};
