import { FORMATIONS } from '../game/FORMATIONS.js';
export const POSTURES = {
  neutral: { label: 'Neutro', shift: 0, pressure: 1, shot: 1 },
  offensive: { label: 'Ofensivo', shift: 8, pressure: 1.15, shot: 1.15 },
  allAttack: { label: 'Todos no ataque', shift: 16, pressure: 1.35, shot: 1.3 },
  defensive: { label: 'Defensivo', shift: -8, pressure: .9, shot: .85 },
  allDefense: { label: 'Todos na defesa', shift: -16, pressure: .8, shot: .7 },
};
export function controlsTeam(user, id) {
  return !!id && ((user?.type === 'USER' && user.data?.id === id) || (user?.type === 'COACH' && user.data?.teamId === id));
}
export function validCommand(c) {
  return c && typeof c.id === 'string' && [0,1].includes(c.side) && Number.isInteger(c.at) && c.at >= 0 &&
    ((c.kind === 'tactics' && Object.hasOwn(FORMATIONS,c.formation) && Object.hasOwn(POSTURES,c.posture)) ||
     (c.kind === 'penalty' && Number.isInteger(c.penaltyAt) && typeof c.playerId === 'string'));
}
