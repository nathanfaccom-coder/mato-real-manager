import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';

// Preserve the existing study rule: cost 20, XP 10–24, one level per study,
// perk every third level. No client-supplied XP, role, energy or level.
export async function studyStaff(db,uid,input,{now=Date.now(),draw=randomInt,doctor=false}={}) {
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>k!=='requestId')||!validDocumentId(input.requestId))throw Error('Pedido inválido.');
 const baseGain=draw(10,25),role=doctor?'DOCTOR':'ASSISTANT';
 return db.runTransaction(async tx=>{
  const ref=(collection,id)=>db.collection(collection).doc(id);
  const read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||account.type!==role||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!==account.type||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const staffRef=ref('users',account.entityId),staff=await read(staffRef);
  if(staff?.status!=='ACTIVE'||staff.type!==role)throw Error('Auxiliar indisponível.');
  const receiptRef=ref(`serverConfig/${doctor?'doctorStudy':'study'}_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  if(receipt){if(receipt.staffId!==account.entityId)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  if(staff.teamId&&staff.teamId!=='FREE'){
   if(!validDocumentId(staff.teamId))throw Error('Clube inválido.');
   if(await read(ref('matchParticipantLocks',`team_${staff.teamId}`)))throw Error('Clube em partida.');
  }
  const energy=staff.energy??100;
  let xp=staff.xp??0,level=staff.level??1,pendingPerks=staff.pendingPerks??0;
  if(!Number.isFinite(energy)||energy<20||energy>100||![xp,level,pendingPerks].every(v=>Number.isSafeInteger(v)&&v>=0)||level<1)throw Error('Progressão indisponível.');
  const gain=doctor&&Array.isArray(staff.perks)&&staff.perks.some(p=>p?.id==='SPORTS_NUTRITION')?Math.round(baseGain*1.2):baseGain;
  xp+=gain;
  if(!Number.isSafeInteger(xp)||!Number.isSafeInteger(level*100))throw Error('Progressão inválida.');
  const leveledUp=xp>=level*100;
  if(leveledUp){xp-=level*100;level++;if(level%3===0)pendingPerks++;}
  if(![level,pendingPerks].every(Number.isSafeInteger))throw Error('Progressão inválida.');
  const result={gain,cost:20,level,leveledUp,duplicate:false};
  tx.update(staffRef,{energy:energy-20,xp,level,pendingPerks});
  tx.set(receiptRef,{staffId:account.entityId,createdAt:now,result});
  return result;
 });
}
