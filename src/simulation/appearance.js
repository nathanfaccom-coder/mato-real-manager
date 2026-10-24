import { kit as normalizeKit } from "./kits.js";
export const SKIN = [
  "#f5d0ac",
  "#e8b58a",
  "#cf9367",
  "#aa704b",
  "#805034",
  "#543323",
];
export const HAIR = [
  "#171717",
  "#523323",
  "#8d5b36",
  "#d6b15d",
  "#d7d7d7",
  "#ab3459",
];
export const BOOTS = [
  "#151923",
  "#f2f4f8",
  "#ffbf35",
  "#f15d56",
  "#68deae",
  "#64b5f6",
];
export const EYES = [
  "#172027",
  "#663f25",
  "#345e95",
  "#437442",
  "#9b792d",
  "#686873",
];
export const STYLES = {
  short: "Curto",
  afro: "Afro",
  mohawk: "Moicano",
  long: "Longo",
  ponytail: "Rabo de cavalo",
  bald: "Careca",
  curls: "Cachos",
  spikes: "Espetado",
  fade: "Degradê",
  braids: "Tranças",
  swept: "Franja lateral",
};
export function appearance(value = {}) {
  const pick = (list, v) => (list.includes(v) ? v : list[0]);
  return {
    skin: pick(SKIN, value.skin),
    hair: pick(HAIR, value.hair),
    eyes: pick(EYES, value.eyes),
    boots: pick(BOOTS, value.boots),
    style: Object.hasOwn(STYLES, value.style) ? value.style : "short",
    beard: ["none", "short", "full"].includes(value.beard)
      ? value.beard
      : "none",
    sleeves: value.sleeves === "long" ? "long" : "short",
    number: Math.max(1, Math.min(99, Math.floor(Number(value.number) || 10))),
  };
}
// The editor and the pitch use exactly the same pixel sprite and palette.
export function drawPlayer(
  ctx,
  x,
  y,
  custom,
  kit = "#32bf97",
  phase = 0,
  scale = 1,
  back = false,
  pose = {},
) {
  const a = appearance(custom),
    uniform = normalizeKit(typeof kit === "string" ? { shirt: kit } : kit),
    step = phase === 0 ? 0 : Math.round(Math.sin(phase) * 2);
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale * (pose.facing === -1 ? -1 : 1), scale);
  if (pose.action === "injury") {
    ctx.translate(0, -3);
    ctx.rotate(-Math.PI / 2);
  }
  if (pose.action === "tackle") ctx.rotate(-Math.PI / 16);
  if (pose.action === "kick") ctx.rotate(-0.13);

  const rect = (color, x, y, w, h) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };
  // Original outlined arcade sprite, shared by character editor and match renderer.
  rect("#08131766", -8, 0, 17, 4);
  // Two planted feet and a subtle body bounce make the run readable at small sizes.
  if (phase && !["tackle", "injury"].includes(pose.action))
    ctx.translate(0, -Math.abs(step) * 0.5);
  // Stepped silhouette: temples, ears, cheeks and tapered chin.
  rect("#10171d", -5, -30, 11, 2);
  rect("#10171d", -7, -28, 15, 9);
  rect("#10171d", -5, -20, 11, 3);
  rect("#10171d", -3, -18, 7, 2);
  rect(a.skin, -5, -28, 11, 10);
  rect(a.skin, -6, -26, 13, 6);
  rect(a.skin, -3, -19, 7, 2);
  rect("#10171d", -8, -25, 2, 5);
  rect("#10171d", 7, -25, 2, 5);
  rect(a.skin, -7, -24, 2, 3);
  rect(a.skin, 7, -24, 1, 3);
  rect("#00000024", 4, -25, 2, 6);
  rect("#00000022", -3, -18, 7, 1);
  rect("#ffffff22", -4, -27, 4, 2);
  rect(a.skin, -2, -17, 5, 2);
  if (a.style !== "bald") {
    rect("#10171d", -5, -32, 11, 2);
    rect("#10171d", -7, -30, 15, 5);
    rect(a.hair, -5, -31, 11, 3);
    rect(a.hair, -6, -29, 13, 4);
    rect(a.hair, -7, -27, 4, 4);
    rect(a.hair, 5, -27, 3, 5);
    rect("#ffffff22", -4, -30, 7, 2);
    if (a.style === "afro") {
      rect("#10171d", -9, -31, 19, 10);
      rect(a.hair, -8, -31, 17, 8);
      rect(a.hair, -6, -33, 13, 4);
    }
    if (a.style === "mohawk") {
      rect(a.skin, -6, -28, 4, 3);
      rect(a.skin, 3, -28, 4, 3);
      rect(a.hair, -2, -34, 5, 9);
    }
    if (a.style === "long") {
      rect("#10171d", -8, -26, 3, 13);
      rect(a.hair, -7, -26, 2, 12);
      rect(a.hair, 6, -26, 3, 12);
    }
    if (a.style === "ponytail") {
      rect("#10171d", 7, -27, 5, 10);
      rect(a.hair, 8, -26, 3, 8);
    }
  }
  if (a.style === "curls")
    for (let j = 0; j < 5; j++) {
      rect(a.hair, -8 + j * 3, -32 + (j % 2), 4, 7);
      rect("#ffffff22", -7 + j * 3, -31 + (j % 2), 2, 2);
    }
  if (a.style === "spikes")
    for (let j = 0; j < 4; j++) {
      rect(a.hair, -6 + j * 4, -34 + (j % 2) * 2, 3, 7);
    }
  if (a.style === "fade") {
    rect(a.skin, -6, -26, 3, 3);
    rect(a.skin, 4, -26, 3, 3);
    rect("#00000033", -6, -26, 2, 2);
  }
  if (a.style === "braids")
    for (let j = 0; j < 4; j++) {
      rect(a.hair, -6 + j * 4, -31, 2, 14);
      rect("#ffffff22", -6 + j * 4, -30, 1, 5);
    }
  if (a.style === "swept") {
    rect(a.hair, -5, -29, 12, 5);
    rect(a.hair, 2, -26, 5, 4);
  }
  if (back && a.style !== "bald") rect(a.hair, -5, -26, 11, 7);
  if (!back) {
    rect(a.hair, -4, -25, 3, 1);
    rect(a.hair, 2, -25, 3, 1);
    rect("#fff9e9", -4, -24, 3, 3);
    rect("#fff9e9", 2, -24, 3, 3);
    rect(a.eyes, -3, -23, 2, 2);
    rect(a.eyes, 3, -23, 2, 2);
    rect("#00000033", 0, -21, 2, 2);
    rect("#633e36", -1, -19, 3, 1);
    if (a.beard !== "none")
      rect(a.hair, -4, -20, 9, a.beard === "full" ? 4 : 2);
  }
  rect("#10171d", -6, -16, 13, 12);
  rect("#10171d", -8, -15, 17, 6);
  rect(uniform.shirt, -5, -15, 11, 8);
  rect(uniform.shirt, -7, -14, 3, 4);
  rect(uniform.shirt, 5, -14, 3, 4);
  if (pose.action === "greet") {
    rect("#10171d", 5, -17, 4, 8);
    rect(a.sleeves === "long" ? uniform.shirt : a.skin, 6, -18, 2, 5);
    rect(a.skin, 6, -20, 3, 3);
    rect("#10171d", -8, -11, 4, 5);
    rect(a.sleeves === "long" ? uniform.shirt : a.skin, -7, -10, 2, 3);
  } else if (pose.action === "throwin" || pose.action === "celebrate") {
    const lift = pose.action === "celebrate" ? 1 : 0;
    rect("#10171d", -10, -17, 4, 12);
    rect("#10171d", 7, -17, 4, 12);
    rect(a.sleeves === "long" ? uniform.shirt : a.skin, -9, -23 - lift, 2, 9);
    rect(a.sleeves === "long" ? uniform.shirt : a.skin, 8, -23 - lift, 2, 9);
    rect(a.skin, -10, -25 - lift, 4, 3);
    rect(a.skin, 7, -25 - lift, 4, 3);
  } else {
    rect("#10171d", -8, -11 + step, 4, 5);
    rect(a.sleeves === "long" ? uniform.shirt : a.skin, -7, -10 + step, 2, 3);
    rect(a.skin, -6, -8 + step, 2, 2);
    rect("#10171d", 5, -11 - step, 4, 5);
    rect(a.sleeves === "long" ? uniform.shirt : a.skin, 6, -10 - step, 2, 3);
    rect(a.skin, 5, -8 - step, 2, 2);
  }
  if (uniform.pattern === "stripes") {
    rect(uniform.detail, -3, -15, 2, 8);
    rect(uniform.detail, 2, -15, 2, 8);
  }
  if (uniform.pattern === "hoops") {
    rect(uniform.detail, -5, -13, 11, 2);
    rect(uniform.detail, -5, -9, 11, 1);
  }
  if (uniform.pattern === "sash")
    for (let i = 0; i < 7; i++) rect(uniform.detail, -4 + i, -15 + i, 3, 1);
  rect("#ffffff24", -4, -15, 3, 6);
  rect("#00000026", 4, -14, 2, 7);
  rect(uniform.detail, -2, -15, 5, 1);
  rect(uniform.shorts, -5, -7, 11, 3);
  rect("#ffffff22", -4, -7, 3, 1);
  rect("#00000044", 0, -6, 1, 3);
  rect(a.skin, -4, -4 + step, 3, 2);
  rect(a.skin, 2, -4 - step, 3, 2);
  rect("#10171d", -6, -4, 5, 7 + step);
  rect("#10171d", 1, -4, 6, 7 - step);
  rect(uniform.socks, -4, -4, 3, 4 + step);
  rect(uniform.socks, 2, -4, 3, 4 - step);
  if (pose.action === "kick") {
    rect(uniform.socks, 3, -5, 7, 3);
    rect(a.boots, 9, -6, 4, 4);
  }
  rect(a.boots, -6, step, 5, 2);
  rect("#eee8d5", -6, step + 2, 5, 1);
  rect(a.boots, 2, -step, 5, 2);
  rect("#eee8d5", 2, -step + 2, 5, 1);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 5px monospace";
  ctx.textAlign = "center";
  if (!pose.referee) ctx.fillText(String(a.number), 0.5, -9);
  if (pose.action === "throwin") {
    rect(a.skin, -8, -34, 17, 3);
    rect("#10171d", -3, -38, 8, 6);
    rect("#fff9e9", -2, -37, 6, 4);
    rect("#172027", 0, -36, 2, 2);
  }
  if (pose.card) {
    rect(uniform.shirt, 5, -19, 3, 6);
    rect(a.skin, 5, -27, 3, 8);
    rect("#10171d", 4, -34, 6, 9);
    rect(pose.card === "red" ? "#ff354a" : "#ffe133", 5, -33, 4, 7);
  }
  ctx.restore();
}
