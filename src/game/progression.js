import {ATTR_LABELS} from './ATTR_LABELS.js';
import {POS_TRAINING_MAP} from './POS_TRAINING_MAP.js';
export const xpCost = ovr => ovr<=50?50:ovr<=60?80:ovr<=70?150:ovr<=80?300:ovr<=85?600:ovr<=90?1000:2000;
export function countedAttributes(position,attrs={}) {
 const excluded=position==='GOL'?['shot','attack','dribble','curve','freeKick','weakFootAcc','weakFootFreq']:['gk'];
 return Object.keys(ATTR_LABELS).filter(k=>!excluded.includes(k)&&Number.isFinite(attrs[k]));
}
export function overallFor(position,attrs,fallback=45) {
 const keys=countedAttributes(position,attrs);return keys.length?Math.round(keys.reduce((s,k)=>s+attrs[k],0)/keys.length):fallback;
}
export function evolveSeason(player,random=Math.random) {
 const attrs={...(player.attributes||{})};
 const total=(Number(player.xp)||0)+(Number(player.pendingXP)||0), cost=xpCost(player.overall||50);
 const direction=total<0?-1:1;let remainder=total;
 const keys=Object.keys(ATTR_LABELS).filter(k=>Number.isFinite(attrs[k])&&(player.position==='GOL'||k!=='gk'));
 const primary=POS_TRAINING_MAP[player.position]?.attrs||['stamina','balance','speed','shortPass','dribble','shot'];
 for(let i=0;i<Math.floor(Math.abs(total)/cost);i++) {
  const eligible=keys.filter(k=>direction>0?attrs[k]<99:attrs[k]>1);
  if(!eligible.length)break; // Do not consume points when every eligible attribute is capped.
  const preferred=eligible.filter(k=>primary.includes(k));
  const pool=preferred.length&&random()<.75?preferred:eligible;
  const key=pool[Math.min(pool.length-1,Math.floor(random()*pool.length))];
  attrs[key]+=direction;remainder-=direction*cost;
 }
 for(const position of new Set(player.pendingPosBoosts||[]))
  for(const key of POS_TRAINING_MAP[position]?.attrs||[])
   if(Number.isFinite(attrs[key]))attrs[key]=Math.min(99,attrs[key]+3);
 return {attributes:attrs,overall:overallFor(player.position,attrs,player.overall),xp:remainder,pendingXP:0,pendingPosBoosts:[]};
}
