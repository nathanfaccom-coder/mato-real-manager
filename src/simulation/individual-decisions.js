import { shootingChance } from './decisions.js';
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
export function shotDecision(ball,keeper,dir,pressure,overall,shot,chain,posture=1) {
  const distance=dir>0?100-ball[0]:ball[0], lateral=Math.abs(ball[1]-32);
  const open=(ball[0]-keeper.x)*dir>1 && distance<17 && lateral<12;
  // A clear close-range opportunity is recognized at every level; execution still uses attributes.
  if (open || (distance<16 && lateral<9 && pressure<1.5)) return 1;
  const awareness=clamp(overall/100,0,1);
  const base=shootingChance(ball,keeper,dir,pressure,overall,shot,chain);
  return clamp(base*posture + (distance<23 && lateral<14 ? awareness*.22/(1+pressure*.25):0),0,.98);
}
export function passValue({from,to,dir,pressure,space,offside,overall,receiverShot,ownChance,receiverChance,returnPass,noise}) {
  const awareness=clamp(overall/100,0,1), progress=(to.x-from.x)*dir;
  const distance=Math.hypot(to.x-from.x,to.y-from.y);
  const chanceGain=receiverChance-ownChance;
  return progress*.5 + Math.min(space,8) - pressure*(10+awareness*8) - distance*.08
    + chanceGain*(12+awareness*22) + receiverChance*receiverShot/25
    - (offside?18+awareness*30:0) - (returnPass?8:0)
    - (progress < -4 && ownChance>.55 && chanceGain<.1 ? 24:0)
    + (noise-.5)*(18-awareness*15);
}
// Coordinates use the game's 100 x 64 pitch, with its penalty mark 11 units from goal.
export function penaltyPositions(people,active,taker,keeper,dir) {
  let n=0;
  return people.map((p,i)=>{
    if (!active(i)) return null;
    if (i===taker) return {x:dir>0?85:15,y:32};
    if (i===keeper) return {x:dir>0?100:0,y:32};
    if (p.slot===0) return {x:dir>0?3:97,y:32};
    const row=Math.floor(n/9), col=n++%9;
    return {x:dir>0?78-row*4:22+row*4,y:8+col*6};
  });
}
