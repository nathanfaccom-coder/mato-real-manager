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
export const STYLES = {
  short: "Curto",
  afro: "Afro",
  mohawk: "Moicano",
  long: "Longo",
  ponytail: "Rabo de cavalo",
  bald: "Careca",
};
export function appearance(value = {}) {
  const pick = (list, v) => (list.includes(v) ? v : list[0]);
  return {
    skin: pick(SKIN, value.skin),
    hair: pick(HAIR, value.hair),
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
) {
  const a = appearance(custom),
    uniform = normalizeKit(typeof kit === "string" ? { shirt: kit } : kit),
    step = Math.sin(phase) > 0 ? 1 : -1;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);
  const rect = (color, x, y, w, h) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };
  rect("#00000040", -6, 0, 13, 3);
  rect(a.skin, -3, -22, 7, 7);
  rect(a.skin, -4, -21, 9, 4);
  if (a.style !== "bald") {
    rect(a.hair, -4, -24, 9, a.style === "afro" ? 6 : 3);
    if (a.style === "afro") {
      rect(a.hair, -5, -24, 11, 5);
      rect(a.hair, -4, -26, 9, 3);
    }
    if (a.style === "mohawk") {
      rect(a.skin, -4, -23, 3, 2);
      rect(a.skin, 2, -23, 3, 2);
      rect(a.hair, -1, -27, 3, 5);
    }
    if (a.style === "long") {
      rect(a.hair, -5, -21, 2, 9);
      rect(a.hair, 4, -21, 2, 9);
    }
    if (a.style === "ponytail") rect(a.hair, 4, -22, 3, 8);
  }
  if (!back) {
    rect("#20202c", -2, -19, 1, 1);
    rect("#20202c", 2, -19, 1, 1);
    if (a.beard !== "none")
      rect(a.hair, -2, -17, 5, a.beard === "full" ? 3 : 1);
  }
  rect(uniform.shirt, -5, -15, 11, 8);
  rect(uniform.shirt, -7, -14, 3, 4);
  rect(uniform.shirt, 5, -14, 3, 4);
  rect(a.sleeves === "long" ? uniform.shirt : a.skin, -7, -10 + step, 2, 4);
  rect(a.sleeves === "long" ? uniform.shirt : a.skin, 6, -10 - step, 2, 4);
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
  rect(uniform.shorts, -5, -7, 11, 3);
  rect(uniform.socks, -4, -4, 3, 4 + step);
  rect(uniform.socks, 2, -4, 3, 4 - step);
  rect(a.boots, -5, step, 4, 2);
  rect(a.boots, 2, -step, 4, 2);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 5px monospace";
  ctx.textAlign = "center";
  ctx.fillText(String(a.number), 0.5, -9);
  ctx.restore();
}
