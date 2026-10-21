export const getPersonalSponsorLimits = (ovr) => {
  const o = parseInt(ovr) || 0;
  if (o <= 55) return { min: 2000, max: 10000 };
  if (o <= 65) return { min: 10000, max: 50000 };
  if (o <= 75) return { min: 50000, max: 200000 };
  if (o <= 85) return { min: 200000, max: 800000 };
  return { min: 1000000, max: 5000000 }; // Lendas
};
