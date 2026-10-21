import { ATTR_LABELS } from "./ATTR_LABELS.js";

export const generateAttributes = (pos, targetOv) => {
  const ov = parseInt(targetOv) || 50;
  const attrs = {};
  const keys = Object.keys(ATTR_LABELS);

  let primary = [],
    secondary = [];

  if (pos === "GOL") {
    primary = ["gk", "response", "jump", "longPass"];
    secondary = ["balance", "condition", "mentality", "defense"];
  } else if (pos.includes("ZAG")) {
    primary = ["defense", "header", "balance", "jump", "aggression"];
    secondary = ["stamina", "response", "shortPass", "longPass"];
  } else if (pos.includes("LAT") || pos.includes("LD") || pos.includes("LE")) {
    primary = ["speed", "accel", "stamina", "shortPass", "dribble"];
    secondary = ["defense", "longPass", "curve", "attack"];
  } else if (
    pos.includes("VOL") ||
    pos.includes("MC") ||
    pos === "MD" ||
    pos === "ME"
  ) {
    primary = ["shortPass", "stamina", "teamwork", "defense", "balance"];
    secondary = ["longPass", "tech", "shotPower", "vision"];
  } else if (pos.includes("MEI") || pos.includes("MAT")) {
    primary = ["dribble", "shortPass", "vision", "tech", "curve", "agility"];
    secondary = ["shot", "speed", "attack", "freeKick"];

    // --- NOVO BLOCO ESPECÍFICO PARA PONTAS (PTD / PTE) ---
  } else if (pos === "PTD" || pos === "PTE") {
    // Pontas precisam de muita velocidade, drible e cruzamento (curve/longPass)
    primary = ["speed", "accel", "dribble", "agility", "curve"];
    secondary = ["shot", "stamina", "longPass", "technique"];

    // --- BLOCO PARA CENTROAVANTES (ATA / SA) ---
  } else if (pos.includes("ATA") || pos.includes("SA") || pos.includes("PNT")) {
    primary = ["shot", "attack", "header", "shotPower", "balance"];
    secondary = ["speed", "reaction", "dribble", "strength"];
  }

  // 1. Geração Base
  keys.forEach((k) => {
    let base = ov;

    if (primary.includes(k)) {
      base += Math.floor(Math.random() * 6) + 2;
    } else if (secondary.includes(k)) {
      base -= Math.floor(Math.random() * 4);
    } else {
      base -= Math.floor(Math.random() * 10) + 5;
    }

    if (pos !== "GOL" && k === "gk") base = 10;
    if (
      pos === "GOL" &&
      ["shot", "attack", "dribble", "curve", "freeKick"].includes(k)
    )
      base = Math.max(15, base - 20);

    if (ov < 80 && base > 88) base = 88;
    if (base > 99) base = 99;
    if (base < 1) base = 1;

    attrs[k] = base;
  });

  // 2. Normalização
  const relevantKeys = keys.filter((k) => {
    if (pos === "GOL")
      return ![
        "shot",
        "attack",
        "dribble",
        "curve",
        "freeKick",
        "weakFootAcc",
        "weakFootFreq",
      ].includes(k);
    return k !== "gk";
  });

  let sum = 0;
  relevantKeys.forEach((k) => (sum += attrs[k]));
  const currentAvg = sum / relevantKeys.length;
  const diff = ov - currentAvg;

  relevantKeys.forEach((k) => {
    let boost = diff;
    if (attrs[k] > 90 && ov < 85 && diff > 0) boost = 0;
    let newVal = attrs[k] + boost;
    if (newVal > 99) newVal = 99;
    if (newVal < 1) newVal = 1;
    attrs[k] = Math.round(newVal);
  });

  return attrs;
};
