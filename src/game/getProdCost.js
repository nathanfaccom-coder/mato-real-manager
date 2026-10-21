export const getProdCost = (cat, power) => {
  const p = parseInt(power) || 0;

  // 1. SAÚDE / ENERGIA (Mais barato, pois consome muito)
  // Ex: Power 50 = 50 * 15 = 750
  // Ex: Power 100 = 100 * 15 = 1.500
  if (["energy", "SAUDE", "CONSUMIVEL"].includes(cat)) {
    return p * 15;
  }

  // 2. TREINO / XP (Médio, pois dá vantagem competitiva)
  // Ex: Power 50 = 50 * 100 = 5.000
  // Ex: Power 100 = 100 * 100 = 10.000
  if (["training", "CHUTEIRA", "LUVAS"].includes(cat)) {
    return p * 100;
  }

  // 3. FAMA / LUXO (Muito caro, pois é status)
  // Ex: Power 50 = 50 * 500 = 25.000
  // Ex: Power 100 = 100 * 500 = 50.000
  if (
    [
      "vehicle",
      "real_estate",
      "VEICULO",
      "IMOVEL",
      "TECNOLOGIA",
      "LUXO",
    ].includes(cat)
  ) {
    return p * 500;
  }

  return 50; // Custo base de segurança
};
