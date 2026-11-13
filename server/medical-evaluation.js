import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {INJURIES_DB} from '../src/game/INJURIES_DB.js';

export async function evaluatePlayer(db,uid,input,{now=Date.now(),draw=randomInt}={}) {
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['requestId','playerId'].includes(k))||!validDocumentId(input.requestId)||!validDocumentId(input.playerId))throw Error('Pedido inválido.');
 const roll=draw(0,1000000)/1000000;
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||account.type!=='DOCTOR'||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));
  if(owner?.uid!==uid||owner.entityId!==account.entityId||owner.type!=='DOCTOR')throw Error('Titular inválido.');
  const staffRef=ref('users',account.entityId),staff=await read(staffRef);
  if(staff?.status!=='ACTIVE'||staff.type!=='DOCTOR'||!validDocumentId(staff.teamId)||staff.teamId==='FREE')throw Error('Médico indisponível.');
  const team=await read(ref('teams',staff.teamId));if(team?.status!=='ACTIVE')throw Error('Clube indisponível.');
  const receiptRef=ref(`serverConfig/evaluation_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  if(receipt){if(receipt.staffId!==account.entityId||receipt.teamId!==staff.teamId||receipt.playerId!==input.playerId)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  if(await read(ref('matchParticipantLocks',`team_${staff.teamId}`))||await read(ref('matchParticipantLocks',`player_${input.playerId}`)))throw Error('Participante em partida.');
  const playerRef=ref('players',input.playerId),player=await read(playerRef);
  if(!player||player.teamId!==staff.teamId||['PENDING','BLOCKED'].includes(player.status)||!Number.isSafeInteger(player.recoveryLeft)||player.recoveryLeft<=0)throw Error('Paciente indisponível.');
  const injuryName=typeof player.injury==='object'?player.injury?.label:player.injury;
  if(typeof injuryName!=='string'||!injuryName.trim())throw Error('Lesão inválida.');
  const light=![...INJURIES_DB.MODERADA,...INJURIES_DB.GRAVE,...INJURIES_DB.EXTREMA].includes(injuryName);
  const cost=Array.isArray(staff.perks)&&staff.perks.some(p=>p?.id==='FAST_DIAGNOSIS')?5:10;
  const energy=staff.energy??100;let xp=staff.xp??0,level=staff.level??1,pendingPerks=staff.pendingPerks??0;
  if(!Number.isFinite(energy)||energy<cost||energy>100||![xp,level,pendingPerks].every(v=>Number.isSafeInteger(v)&&v>=0)||level<1||!Number.isSafeInteger(level*100))throw Error('Progressão inválida.');
  const healed=light&&roll<0.2+level*0.02;
  xp+=5;if(!Number.isSafeInteger(xp))throw Error('XP inválido.');
  if(xp>=level*100){xp-=level*100;level++;if(level%3===0)pendingPerks++;}
  if(![level,pendingPerks].every(Number.isSafeInteger))throw Error('Progressão inválida.');
  tx.update(staffRef,{energy:energy-cost,xp,level,pendingPerks});
  if(healed){const {injury,...rest}=player;tx.set(playerRef,{...rest,recoveryLeft:0});}
  const result={playerId:input.playerId,healed,cost,xp:5,level,duplicate:false};
  tx.set(receiptRef,{staffId:account.entityId,teamId:staff.teamId,playerId:input.playerId,createdAt:now,result});
  return result;
 });
}
