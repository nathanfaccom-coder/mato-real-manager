import { getRecommendedPrice } from "./getRecommendedPrice.js";

export const getPeneiraCost = (maxOvr) => {
  if (maxOvr <= 40) return 0; // Peneira Nível 1 é de graça
  return getRecommendedPrice(maxOvr, "GOL"); // Usa a tabela oficial do jogo
};
