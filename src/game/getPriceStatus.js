export const getPriceStatus = (askedPrice, recommendedPrice) => {
  if (!askedPrice || askedPrice <= 0) return { label: "GRÁTIS", color: "lime" };

  const ratio = parseFloat(askedPrice) / parseFloat(recommendedPrice);

  // Lógica de tolerância (Margem de 20%)
  if (ratio < 0.8)
    return { label: "💰 BARGANHA (ABAIXO DA MÉDIA)", color: "gold" };
  if (ratio > 1.2) return { label: "💸 ACIMA DA MÉDIA", color: "#ff5555" };
  return { label: "✅ PREÇO JUSTO", color: "#00E676" };
};
