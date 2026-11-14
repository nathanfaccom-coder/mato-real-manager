import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {SOLO_TYPES} from './solo-training.js';
import {COACH_PERKS} from '../src/game/COACH_PERKS.js';
import {CT_DB} from '../src/game/CT_DB.js';
import {POS_TRAINING_MAP} from '../src/game/POS_TRAINING_MAP.js';
import {INJURIES_DB} from '../src/game/INJURIES_DB.js';
import {overallFor} from '../src/game/progression.js';
const uint=n=>Number.isSafeInteger(n)&&n>=0;
const energy=n=>Number.isFinite(n)&&n>=0&&n<=100;
export async function trainCoach(db,uid,input,{now=Date.now(),draw=randomInt}={}){
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['requestId','type','playerIds'].includes(k))||!validDocumentId(input.requestId))throw Error('Treino inválido.');
 const study=input.type==='STUDY',ids=input.playerIds;
 if((!study&&!Object.hasOwn(SOLO_TYPES,input.type))||!Array.isArray(ids)||ids.length>5||ids.some(id=>!validDocumentId(id))||new Set(ids).size!==ids.length||(study?ids.length!==0:ids.length===0))throw Error('Seleção inválida.');
 const playerIds=[...ids].sort(),attrs=study?[]:SOLO_TYPES[input.type];
 const rolls=playerIds.map(()=>({injured:draw(0,1000000)<10000,injury:INJURIES_DB.LEVE[draw(0,INJURIES_DB.LEVE.length)],base:draw(8,13),crit:draw(0,1000000)/1000000,growth:attrs.map(()=>draw(0,1000000)/1000000)})),studyXP=draw(15,25);
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||account.type!=='COACH'||!validDocumentId(account.entityId)||!uint(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!=='COACH'||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const coachRef=ref('users',account.entityId),coach=await read(coachRef);
  if(coach?.status!=='ACTIVE'||coach.type!=='COACH')throw Error('Técnico indisponível.');
  let team=null,teamRef=null;
  if(coach.teamId&&coach.teamId!=='FREE'){
   if(!validDocumentId(coach.teamId))throw Error('Clube inválido.');
   teamRef=ref('teams',coach.teamId);team=await read(teamRef);if(team?.status!=='ACTIVE')throw Error('Clube indisponível.');
  }
  if(!study&&!team)throw Error('Técnico sem clube.');
  const receiptRef=ref(`serverConfig/coachTraining_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  if(receipt){if(receipt.coachId!==account.entityId||receipt.type!==input.type||JSON.stringify(receipt.playerIds)!==JSON.stringify(playerIds))throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  if(team&&await read(ref('matchParticipantLocks',`team_${coach.teamId}`)))throw Error('Clube em partida.');
  const players=[];
  for(const id of playerIds){
   if(await read(ref('matchParticipantLocks',`player_${id}`)))throw Error('Jogador em partida.');
   const p=await read(ref('players',id));
   if(!p||p.teamId!==coach.teamId||['PENDING','BLOCKED'].includes(p.status)||!energy(p.energy??100)||!Number.isSafeInteger(p.xp??0)||!uint(p.recoveryLeft??0))throw Error('Jogador indisponível.');players.push(p);
  }
  const coachEnergy=coach.energy??100,cost=study?30:20;
  let xp=coach.xp??0,level=coach.level??1,pendingPerks=coach.pendingPerks??0,pendingAffinity=coach.pendingAffinity??0;
  if(!energy(coachEnergy)||coachEnergy<cost||![xp,level,pendingPerks,pendingAffinity].every(uint)||level<1)throw Error('Técnico sem condições para treinar.');
  // Values come from the catalog, never legacy mutable perk payloads.
  const perks=(Array.isArray(coach.perks)?coach.perks:[]).map(p=>COACH_PERKS.find(c=>c.id===p?.id)).filter((p,i,a)=>p&&a.indexOf(p)===i);
  const perkValue=type=>perks.find(p=>p.type===type)?.value??0;
  const playerCost=perks.some(p=>p.type==='ENERGY_SAVE')?Math.round(25*perkValue('ENERGY_SAVE')):25;
  const ct=team?.ctLevel||1;if(!Object.hasOwn(CT_DB,ct))throw Error('CT inválido.');
  const affinities=Array.isArray(coach.affinities)?coach.affinities:[];
  let coachXP=study?studyXP:0;const writes=[];
  const rows=players.map((p,i)=>{
   const base={playerId:playerIds[i],name:typeof p.name==='string'?p.name.slice(0,100):'Jogador'},e=p.energy??100,r=rolls[i];
   if(p.recoveryLeft>0||e<playerCost)return {...base,skipped:true,reason:p.recoveryLeft>0?'INJURED':'EXHAUSTED'};
   if(r.injured){writes.push([ref('players',playerIds[i]),{...p,injury:r.injury,recoveryLeft:1,energy:Math.max(0,e-15),mood:'😡'}]);return {...base,injured:true,injury:r.injury};}
   let gain=r.base+perkValue('MIN_XP_BOOST');gain+=Math.floor(gain*CT_DB[ct].bonusXP/100);
   if(affinities.includes(p.position))gain+=5+perkValue('AFFINITY_BOOST');
   if(p.equippedItem){if(!validDocumentId(p.equippedItem.id)||!uint(p.equippedItem.power))throw Error('Equipamento inválido.');gain+=Math.ceil(gain*p.equippedItem.power/100);}
   for(const perk of perks){if(perk.type==='TRAIN_BOOST'&&perk.attrs.some(a=>attrs.includes(a)))gain=Math.round(gain*perk.multiplier);if(perk.type==='YOUTH_BOOST'&&(p.age||18)<=perk.ageLimit)gain=Math.round(gain*perk.multiplier);}
   const critical=r.crit<0.1+perkValue('CRIT_CHANCE');if(critical)gain*=2;
   if(!uint(gain)||!Number.isSafeInteger((p.xp??0)+gain))throw Error('XP inválido.');
   const attributes={...(p.attributes??{})};if(Object.values(attributes).some(v=>!Number.isSafeInteger(v)||v<1||v>99))throw Error('Atributos inválidos.');
   attrs.forEach((a,j)=>{if((attributes[a]??50)<99&&r.growth[j]<gain/80)attributes[a]=(attributes[a]??50)+1;});
   const next={...p,energy:e-playerCost,xp:(p.xp??0)+gain,attributes,overall:overallFor(p.position,attributes,p.overall??45)};delete next.equippedItem;
   let learned=null;
   if(p.learningPosition){const lp=p.learningPosition;
    if(!Object.hasOwn(POS_TRAINING_MAP,lp.target)||!uint(lp.current)||!uint(lp.required)||lp.required<1)throw Error('Aprendizado inválido.');
    if(POS_TRAINING_MAP[lp.target].train===input.type){const current=lp.current+10+(affinities.includes(lp.target)?5:0)+Number(ct)*2;
     if(current>=lp.required){for(const key of ['secondaryPositions','pendingPosBoosts']){if(p[key]&&!Array.isArray(p[key]))throw Error('Posições inválidas.');next[key]=[...new Set([...(p[key]??[]),lp.target])];}delete next.learningPosition;learned=lp.target;}
     else next.learningPosition={...lp,current};
    }
   }
   writes.push([ref('players',playerIds[i]),next]);coachXP+=20;return {...base,xp:gain,energyCost:playerCost,critical,learned};
  });
  xp+=coachXP;const leveledUp=xp>=level*120&&level<30;if(leveledUp){xp-=level*120;level++;if(level%5===0)pendingPerks++;if([10,20,30].includes(level))pendingAffinity++;}
  if(![xp,level,pendingPerks,pendingAffinity].every(uint))throw Error('Progressão inválida.');
  for(const [r,data] of writes)tx.set(r,data);
  tx.update(coachRef,{energy:coachEnergy-cost,xp,level,pendingPerks,pendingAffinity});
  if(team)tx.update(teamRef,{trainingLogs:[{date:now,type:input.type,report:study?'Estudo de táticas concluído.':rows.map(r=>`${r.name}: ${r.skipped?r.reason:r.injured?r.injury:`+${r.xp} XP${r.learned?`; nova posição ${r.learned}`:''}`}`).join('\n')},...(Array.isArray(team.trainingLogs)?team.trainingLogs:[])].slice(0,10)});
  const result={cost,coachXP,level,leveledUp,rows,duplicate:false};tx.set(receiptRef,{coachId:account.entityId,playerIds,type:input.type,createdAt:now,result});return result;
 });
}
