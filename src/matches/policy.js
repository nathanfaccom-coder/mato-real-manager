// Shared by the trusted match worker and UI. Never accept a client XP value.
export const POLICY_VERSION = 1;
export const KINDS = ['OFFICIAL', 'FRIENDLY', 'TEST'];
export const COUNTERS = ['appearances','seconds','goals','assists','tackles','saves','yellows','reds','ratingSum','ratingCount'];
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
const finite = (n, fallback=0) => Number.isFinite(Number(n)) ? Number(n) : fallback;
export const brazilDay = ms => new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ms));
export const emptyStats = () => Object.fromEntries(COUNTERS.map(k=>[k,0]));
export function addStats(a={},b={},sign=1) {
 return Object.fromEntries(COUNTERS.map(k=>[k,finite(a[k])+sign*finite(b[k])]));
}
export function careerOf(player) {
 if(player.career?.version === 1) return structuredClone(player.career);
 // The old stats can be a season subtotal. Preserve only what is known,
 // never fabricate appearances/minutes or reconstruct deleted seasons.
 const legacy={};
 for(const key of ['goals','assists','tackles','saves','yellows','reds'])
  if(Number.isFinite(player.stats?.[key])) legacy[key]=player.stats[key];
 if(Number.isFinite(player.pressRatingSum) && Number.isFinite(player.pressRatingCount)) {
  legacy.ratingSum=player.pressRatingSum;legacy.ratingCount=player.pressRatingCount;
 }
 return {version:1,legacy,official:emptyStats(),friendly:emptyStats()};
}
export function ratingFor(person,s,conceded=0) {
 const seconds=finite(s.seconds);if(seconds<=0)return null;
 const minutes=seconds/60, durationFactor=clamp(minutes/90,0,1);
 const pos=person.position || '';
 const keeper=pos==='GOL';
 const defense=/ZAG|VOL|LD|LE|LAT/.test(pos);
 const midfield=/MC|MEI|MD|ME|MAT/.test(pos);
 const passes=Math.max(0,finite(s.passes)), completed=clamp(finite(s.completed),0,passes);
 const value=6 + finite(s.goals)*(keeper||defense?1:.85) + finite(s.assists)*.5
  + Math.min(finite(s.saves),8)*(keeper?.16:.03)
  + Math.min(finite(s.tackles),10)*(defense?.1:midfield?.08:.05)
  + (passes? (completed/passes-.75)*Math.min(passes/15,1)*(midfield?.9:.5):0)
  - Math.max(0,finite(s.shots)-finite(s.goals))*.025
  - finite(s.yellow)*.25-finite(s.red)*.8
  - (keeper?conceded*.12*durationFactor:0);
 // Short appearances have less evidence; shrink toward a neutral six.
 return Math.round(clamp(6+(value-6)*Math.min(1,minutes/30),0,10)*10)/10;
}
export function energyCost(person,seconds,intensity=1) {
 if(seconds<=0)return 0;
 const stamina=clamp(finite(person.attributes?.stamina,50),1,99);
 const resistance=clamp(1+(50-stamina)/250,.8,1.2);
 return Math.round((person.position==='GOL'?12:25)*(seconds/5400)*resistance*clamp(intensity,.85,1.2)*10)/10;
}
function diminishing(count,first,weight) {
 const n=Math.max(0,finite(count));return Math.min(n,first)*weight+Math.min(Math.max(0,n-first),first)*weight*.25;
}
export function matchXP(stats,result) {
 if(!stats.appearances)return 0;
 const participation=clamp(stats.seconds/5400,0,1);
 return Math.trunc(stats.goals*20+stats.assists*15
  +diminishing(stats.tackles,5,10)+diminishing(stats.saves,5,12)
  -stats.yellows*10-stats.reds*30
  +(({WIN:30,DRAW:10,LOSS:-10}[result]||0)+stats.ratingSum*5)*participation);
}
export function rewardFor(kind,baseXP,alreadyGranted=0) {
 if(!KINDS.includes(kind))throw Error('Tipo de partida inválido.');
 if(kind==='TEST')return 0;
 if(kind==='OFFICIAL')return baseXP;
 // Penalties never replenish the positive daily allowance.
 return baseXP>0?Math.min(Math.floor(baseXP*.1),Math.max(0,10-alreadyGranted)):Math.ceil(baseXP*.1);
}
export function reportFromSimulation(match,kind) {
 if(!KINDS.includes(kind))throw Error('Tipo de partida inválido.');
 const rows={};
 match.people.forEach((person,i)=>{
  const s=match.stats[i];if(!s || s.seconds<=0)return;
  if(rows[person.id])throw Error('Participante duplicado.');
  const own=match.score[person.side],other=match.score[1-person.side];
  const rating=ratingFor(person,s,other);
  const stats={...emptyStats(),appearances:1,seconds:s.seconds,goals:s.goals,assists:s.assists,tackles:s.tackles,saves:s.saves,yellows:s.yellow,reds:s.red,ratingSum:rating,ratingCount:1};
  const result=own===other?'DRAW':own>other?'WIN':'LOSS';
  // Weight intensity by actual frames while this athlete is on the pitch.
  let intensitySum=0, samples=0;
  for(let t=0;t<(match.frames?.length||0);t+=30){
   const f=match.frames[t];if(!f.positions?.[i]?.[2])continue;
   intensitySum+=({neutral:1,offensive:1.1,allAttack:1.2,defensive:.95,allDefense:.9}[f.postures?.[person.side]]||1);samples++;
  }
  rows[person.id]={stats,baseXP:matchXP(stats,result),energy:kind==='TEST'?0:energyCost(person,s.seconds,samples?intensitySum/samples:1),side:person.side};
 });
 return {policyVersion:POLICY_VERSION,kind,score:match.score,rows};
}
