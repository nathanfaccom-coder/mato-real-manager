// FIFA member associations: https://inside.fifa.com/associations (21/10/2026).
// ISO region identifiers, with separate Home Nations and the fictional Mato Real.
const groups = {
  AFC: "AF AU BH BD BT BN KH CN TW GU HK IN ID IR IQ JP JO KP KR KW KG LA LB MO MY MV MN MM NP OM PK PS PH QA SA SG LK SY TJ TH TL TM AE UZ VN YE",
  CAF: "DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW",
  CONCACAF:
    "AI AG AW BS BB BZ BM VG CA KY CR CU CW DM DO SV GD GT GY HT HN JM MX MS NI PA PR KN LC VC SR TT TC US VI",
  CONMEBOL: "AR BO BR CL CO EC PY PE UY VE",
  OFC: "AS CK FJ NC NZ PG WS SB PF TO VU",
  UEFA: "AL AD AM AT AZ BY BE BA BG HR CY CZ DK ENG EE FO FI FR GE DE GI GR HU IS IL IT KZ XK LV LI LT LU MT MD ME NL MK NIR NO PL PT IE RO RU SM SCO RS SK SI ES SE CH TR UA WAL",
};
const names = {
  MTR: "Mato Real",
  ENG: "Inglaterra",
  SCO: "Escócia",
  WAL: "País de Gales",
  NIR: "Irlanda do Norte",
  TW: "Taipé Chinês",
  CD: "RD Congo",
  CG: "Congo",
  CI: "Costa do Marfim",
  SZ: "Essuatíni",
  CZ: "Tchéquia",
  TR: "Turquia",
  HK: "Hong Kong",
  MO: "Macau",
  PF: "Taiti",
  VG: "Ilhas Virgens Britânicas",
  VI: "Ilhas Virgens Americanas",
  KR: "Coreia do Sul",
  KP: "Coreia do Norte",
  US: "Estados Unidos",
  XK: "Kosovo",
};
const display = new Intl.DisplayNames(["pt-BR"], { type: "region" });
export const NATIONS = [
  { id: "MTR", name: "Mato Real", confederation: "MATO REAL" },
  ...Object.entries(groups).flatMap(([confederation, ids]) =>
    ids
      .split(" ")
      .map((id) => ({ id, name: names[id] || display.of(id), confederation })),
  ),
].sort((a, b) =>
  a.id === "MTR"
    ? -1
    : b.id === "MTR"
      ? 1
      : a.name.localeCompare(b.name, "pt-BR"),
);
export const NATION_BY_ID = Object.fromEntries(NATIONS.map((n) => [n.id, n]));
export const nationalityOf = (player) => player?.nationality || "MTR";
export const nationName = (id) => NATION_BY_ID[id]?.name || "Mato Real";
export function flag(id) {
  if (id === "MTR") return "🌟";
  if (id === "ENG") return "🏴";
  if (id === "SCO") return "🏴";
  if (id === "WAL") return "🏴";
  if (id === "NIR") return "⚽";
  return /^[A-Z]{2}$/.test(id)
    ? String.fromCodePoint(...[...id].map((c) => 127397 + c.charCodeAt(0)))
    : "🏳️";
}
