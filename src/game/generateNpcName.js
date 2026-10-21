import { NPC_FIRST_NAMES } from "./NPC_FIRST_NAMES.js";
import { NPC_LAST_NAMES } from "./NPC_LAST_NAMES.js";

export const generateNpcName = () => {
  const first =
    NPC_FIRST_NAMES[Math.floor(Math.random() * NPC_FIRST_NAMES.length)];
  const last =
    NPC_LAST_NAMES[Math.floor(Math.random() * NPC_LAST_NAMES.length)];
  return `${first} ${last} 🤖`;
};
