export const getAttrColor = (val) => {
  if (val >= 90) return "#2979FF"; // Azul
  if (val >= 75) return "#00E676"; // Verde
  if (val >= 60) return "#FFC400"; // Amarelo
  return "#FF1744"; // Vermelho
};
