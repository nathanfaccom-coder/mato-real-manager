export const getPosColor = (p) => {
  if (p === "GOL") return "#E65100";
  if (["ZAG", "LD", "LE"].includes(p)) return "#2979FF";
  if (["VOL", "MC", "MD", "ME", "MEI"].includes(p)) return "#00E676";
  if (["PTD", "PTE", "ATA", "SA"].includes(p)) return "#FF1744";
  return "#888";
};
