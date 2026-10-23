export const PATTERNS = {
  plain: "Lisa",
  stripes: "Listras verticais",
  hoops: "Listras horizontais",
  sash: "Faixa diagonal",
};
const color = (v, f) => (/^#[0-9a-f]{6}$/i.test(v) ? v : f);
export function kit(v = {}, base = "#16ac78") {
  return {
    shirt: color(v.shirt, base),
    detail: color(v.detail, "#ffffff"),
    shorts: color(v.shorts, "#18243a"),
    socks: color(v.socks, "#ffffff"),
    pattern: Object.hasOwn(PATTERNS, v.pattern) ? v.pattern : "plain",
  };
}
export function clubKits(team) {
  const v = team?.kits || {};
  return {
    home: kit(v.home),
    away: kit(v.away, "#f4f4f4"),
    goalkeeper: kit(v.goalkeeper, "#ffbf35"),
  };
}
function distance(a, b) {
  const rgb = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const x = rgb(a),
    y = rgb(b);
  return Math.hypot(...x.map((v, i) => v - y[i]));
}
export function matchKits(home, away) {
  const h = clubKits(home),
    a = clubKits(away),
    notes = [];
  let homeKit = h.home,
    awayKit = a.away;
  if (distance(homeKit.shirt, awayKit.shirt) < 110) {
    if (distance(homeKit.shirt, a.home.shirt) >= 110) {
      awayKit = a.home;
      notes.push(
        "Visitante usa o uniforme de casa para evitar cores semelhantes.",
      );
    } else {
      awayKit = kit({
        shirt:
          distance(homeKit.shirt, "#f4f4f4") >
          distance(homeKit.shirt, "#202033")
            ? "#f4f4f4"
            : "#202033",
        shorts: "#ff5e67",
        detail: "#ff5e67",
      });
      notes.push("Visitante usa uniforme de contraste neste amistoso.");
    }
  }
  const used = [homeKit.shirt, awayKit.shirt];
  const goalkeeper = (k, label) => {
    if (used.some((c) => distance(c, k.shirt) < 100)) {
      const choices = ["#ffbf35", "#d83de8", "#24d4ed", "#151923", "#f4f4f4"];
      const best = choices.sort(
        (a, b) =>
          Math.min(...used.map((c) => distance(c, b))) -
          Math.min(...used.map((c) => distance(c, a))),
      )[0];
      k = { ...k, shirt: best };
      notes.push(`Goleiro ${label} usa camisa de contraste neste amistoso.`);
    }
    used.push(k.shirt);
    return k;
  };
  return {
    home: homeKit,
    away: awayKit,
    homeGK: goalkeeper(h.goalkeeper, "mandante"),
    awayGK: goalkeeper(a.goalkeeper, "visitante"),
    notes,
  };
}
export function shirtNumbers(lineup) {
  const used = new Set();
  return lineup.map((p, i) => {
    let n = p.pixelAppearance?.number || i + 1;
    if (used.has(n)) {
      n = 1;
      while (used.has(n)) n++;
    }
    used.add(n);
    return { ...p, pixelAppearance: { ...p.pixelAppearance, number: n } };
  });
}
