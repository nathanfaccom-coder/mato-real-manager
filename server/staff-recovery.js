import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';

const integer = value => Number.isSafeInteger(value) && value >= 0;
const energy = value => Number.isFinite(value) && value >= 0 && value <= 100;

// uid is supplied only by the authenticated HTTP handler. Randomness is sampled
// before transaction retries; the immutable receipt makes network retries safe.
export async function recoverPlayers(db, uid, input, {now=Date.now(), draw=randomInt}={}) {
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['requestId','playerIds'].includes(k))||!validDocumentId(input.requestId))throw Error('Pedido inválido.');
 const ids=input.playerIds;
 if(!Array.isArray(ids)||ids.length<1||ids.length>5||ids.some(id=>!validDocumentId(id))||new Set(ids).size!==ids.length)throw Error('Seleção inválida.');
 const playerIds=[...ids].sort();
 const rewards=playerIds.map(()=>({xp:draw(1,4),happy:draw(0,100)<30}));
 return db.runTransaction(async tx=>{
  const ref=(collection,id)=>db.collection(collection).doc(id);
  const read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||account.type!=='ASSISTANT'||!validDocumentId(account.entityId)||!integer(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!==account.type||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const staffRef=ref('users',account.entityId), staff=await read(staffRef);
  if(staff?.status!=='ACTIVE'||staff.type!=='ASSISTANT'||!validDocumentId(staff.teamId)||staff.teamId==='FREE')throw Error('Auxiliar indisponível.');
  const teamRef=ref('teams',staff.teamId), team=await read(teamRef);
  if(team?.status!=='ACTIVE')throw Error('Clube indisponível.');
  const receiptRef=ref(`serverConfig/recovery_${uid}/operations`,input.requestId);
  const receipt=await read(receiptRef);
  if(receipt){
   if(receipt.teamId!==staff.teamId||receipt.staffId!==account.entityId||JSON.stringify(receipt.playerIds)!==JSON.stringify(playerIds))throw Error('Pedido já utilizado.');
   return {...receipt.result,duplicate:true};
  }
  if(await read(ref('matchParticipantLocks',`team_${staff.teamId}`)))throw Error('Clube em partida.');
  const players=[];
  for(const id of playerIds){
   if(await read(ref('matchParticipantLocks',`player_${id}`)))throw Error('Jogador em partida.');
   const p=await read(ref('players',id));
   if(!p||p.teamId!==staff.teamId||['PENDING','BLOCKED'].includes(p.status)||!energy(p.energy??100)||!integer(p.xp??0))throw Error('Jogador indisponível.');
   players.push(p);
  }
  const currentEnergy=staff.energy??100;
  let xp=staff.xp??0,level=staff.level??1,pendingPerks=staff.pendingPerks??0;
  if(!energy(currentEnergy)||!integer(xp)||!integer(level)||level<1||!integer(pendingPerks))throw Error('Auxiliar inválido.');
  const has=id=>Array.isArray(staff.perks)&&staff.perks.some(p=>p?.id===id);
  const eligible=players.some(p=>!(p.recoveryLeft>0));
  const cost=eligible?(has('COFFEE_LOVER')?10:20):0;
  if(currentEnergy<cost)throw Error('Energia insuficiente.');
  const rows=players.map((p,i)=>{
   const base={playerId:playerIds[i],name:typeof p.name==='string'?p.name.slice(0,100):'Jogador'};
   if(p.recoveryLeft>0)return {...base,skipped:true};
   const gained=rewards[i].xp+(has('LIGHT_WORK')?5:0), nextXP=(p.xp??0)+gained;
   if(!integer(nextXP))throw Error('XP inválido.');
   const restored=Math.min(100,p.energy??100)+(has('ICE_BATH')?40:25);
   const nextEnergy=Math.min(100,restored), happy=has('GOOD_VIBES')&&rewards[i].happy;
   tx.update(ref('players',playerIds[i]),{energy:nextEnergy,xp:nextXP,...(happy?{mood:'🤩'}:{})});
   return {...base,skipped:false,energyRecovered:nextEnergy-(p.energy??100),xp:gained,happy};
  });
  if(eligible){
   xp+=20;if(!integer(xp))throw Error('XP inválido.');
   if(xp>=level*100&&level<30){xp-=level*100;level++;if(level%3===0)pendingPerks++;}
   if(!integer(pendingPerks))throw Error('Habilidades inválidas.');
   tx.update(staffRef,{energy:currentEnergy-cost,xp,level,pendingPerks});
   const report=rows.map(r=>r.skipped?`⚠️ ${r.name} ignorado (DM).`:`🔋 ${r.name} recuperou +${r.energyRecovered}⚡ (+${r.xp} XP)${r.happy?' 🤩':''}`).join('\n');
   tx.update(teamRef,{trainingLogs:[{date:now,type:'🧊 REGENERATIVO (AUXILIAR)',report},...(Array.isArray(team.trainingLogs)?team.trainingLogs:[])].slice(0,10)});
  }
  const result={rows,cost,level,duplicate:false};
  tx.set(receiptRef,{staffId:account.entityId,teamId:staff.teamId,playerIds,createdAt:now,result});
  return result;
 });
}
