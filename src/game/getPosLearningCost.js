export const getPosLearningCost = (currPos, targetPos) => {
  const sectors = {
    GOL: 0,
    ZAG: 1,
    LD: 1,
    LE: 1,
    VOL: 2,
    MC: 2,
    MD: 2,
    ME: 2,
    MEI: 2,
    PTD: 3,
    PTE: 3,
    ATA: 3,
    SA: 3,
  };
  const diff = Math.abs(sectors[currPos] - sectors[targetPos]);
  if (diff === 0) return 50; // Mesmo setor (Aprox 5 treinos)
  if (diff === 1) return 100; // Setor Adjacente (Aprox 10 treinos)
  if (diff === 2) return 200; // Setor Distante (Aprox 20 treinos)
  return 400; // Goleiro <-> Linha (Aprox 40 treinos)
};
