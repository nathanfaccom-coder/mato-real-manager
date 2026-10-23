import { canAdmin } from "./permissions.js";
import { generateAttributes } from "../game/generateAttributes.js";
import { getSalaryLimits } from "../game/getSalaryLimits.js";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";
import {
  appearance,
  SKIN,
  HAIR,
  BOOTS,
  STYLES,
} from "../simulation/appearance.js";

export const BOT_ROSTER_SIZE = 22;
const eleven = [
  "GOL",
  "LD",
  "ZAG",
  "ZAG",
  "LE",
  "VOL",
  "VOL",
  "MEI",
  "PTD",
  "PTE",
  "ATA",
];
const names = [
  "Caio",
  "Bruno",
  "Davi",
  "Lucas",
  "Rafael",
  "Pedro",
  "Igor",
  "André",
  "Renan",
  "Vitor",
  "Gabriel",
  "Diego",
];
const surnames = [
  "Silva",
  "Costa",
  "Lima",
  "Souza",
  "Rocha",
  "Alves",
  "Melo",
  "Reis",
];
export function planBotRoster(teamId, players) {
  const roster = players.filter((p) => p.teamId === teamId);
  const remaining = Math.max(0, BOT_ROSTER_SIZE - roster.length);
  const counts = {};
  roster.forEach((p) => {
    counts[p.position] = (counts[p.position] || 0) + 1;
  });
  const missing = [...eleven, ...eleven].filter((position) => {
    if (counts[position]) {
      counts[position]--;
      return false;
    }
    return true;
  });
  return missing.slice(0, remaining);
}
export function makeBot(teamId, position, number, random = Math.random) {
  const pick = (list) => list[Math.floor(random() * list.length)];
  const overall = 45;
  const salary = getSalaryLimits(overall).minSal;
  const value = getRecommendedPrice(overall, position);
  return {
    name: `${pick(names)} ${pick(surnames)} ${number} [BOT]`,
    isBot: true,
    botVersion: 1,
    teamId,
    position,
    overall,
    attributes: generateAttributes(position, overall),
    pixelAppearance: appearance({
      skin: pick(SKIN),
      hair: pick(HAIR),
      boots: pick(BOOTS),
      style: pick(Object.keys(STYLES)),
      number,
    }),
    status: "NAO_A_VENDA",
    salary,
    value,
    clause: value * 2,
    contract: 1,
    balance: 0,
    energy: 100,
    mood: "😐",
    fame: 0,
    stats: { goals: 0, assists: 0, tackles: 0, saves: 0, yellows: 0, reds: 0 },
  };
}

export async function fillTeamWithBots(db, user, teamId) {
  if (!canAdmin(user, "teams"))
    throw Error("Você não tem permissão para gerenciar times e jogadores.");
  const teamRef = db.collection("teams").doc(teamId);
  // Updating the team serializes concurrent bot fills. On a transaction retry,
  // query the roster again so a second ADM cannot duplicate the first fill.
  return db.runTransaction(async (transaction) => {
    const team = await transaction.get(teamRef);
    if (!team.exists || team.data().status === "PENDING")
      throw Error("Este clube não está ativo.");
    const snapshot = await db
      .collection("players")
      .where("teamId", "==", teamId)
      .get({ source: "server" });
    const roster = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const positions = planBotRoster(teamId, roster);
    if (!positions.length) return 0;
    const used = new Set(roster.map((p) => Number(p.pixelAppearance?.number)));
    for (const position of positions) {
      let number = 1;
      while (used.has(number)) number++;
      used.add(number);
      transaction.set(
        db.collection("players").doc(),
        makeBot(teamId, position, number),
      );
    }
    transaction.update(teamRef, {
      botRosterRevision: (Number(team.data().botRosterRevision) || 0) + 1,
    });
    return positions.length;
  });
}
