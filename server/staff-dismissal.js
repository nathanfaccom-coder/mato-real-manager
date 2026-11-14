import {createHash} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
const cents=n=>{if(typeof n!=='number'||!Number.isFinite(n)||!Number.isSafeInteger(Math.round(n*100))||Math.abs(n*100-Math.round(n*100))>0.00001)throw Error('Saldo inválido.');return Math.round(n*100);};
export async function dismissStaff(db,uid,input,{execute=false,now=Date.now()}={}){
 const allowed=execute?['staffId','requestId','quote']:['staffId'];
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!allowed.includes(k))||!validDocumentId(input.staffId)||(execute&&(!validDocumentId(input.requestId)||typeof input.quote!=='string'||!/^[a-f0-9]{64}$/.test(input.quote))))throw Error('Pedido inválido.');
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));if(account?.active!==true||account.type!=='TEAM'||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`teams_${account.entityId}`));if(owner?.uid!==uid||owner.type!=='TEAM'||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const teamRef=ref('teams',account.entityId),team=await read(teamRef);if(team?.status!=='ACTIVE')throw Error('Clube indisponível.');
  const receiptRef=execute?ref(`serverConfig/staffDismiss_${uid}/operations`,input.requestId):null,receipt=receiptRef?await read(receiptRef):null;
  if(receipt){if(receipt.teamId!==account.entityId||receipt.staffId!==input.staffId||receipt.quote!==input.quote)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  if(await read(ref('matchParticipantLocks',`team_${account.entityId}`)))throw Error('Clube em partida.');
  const staffRef=ref('users',input.staffId),staff=await read(staffRef);
  if(staff?.status!=='ACTIVE'||!['COACH','DOCTOR','SCOUT','ASSISTANT'].includes(staff.type)||staff.teamId!==account.entityId)throw Error('Profissional não pertence ao clube.');
  const salary=cents(staff.salary||2500),fine=salary*4,teamBalance=cents(team.balance??0),staffBalance=cents(staff.balance??0);
  if(salary<0||!Number.isSafeInteger(fine)||!Number.isSafeInteger(staffBalance+fine)||!Number.isSafeInteger(teamBalance-fine))throw Error('Rescisão inválida.');
  const quote=createHash('sha256').update(JSON.stringify([account.entityId,input.staffId,staff.type,staff.contract??0,salary,teamBalance,staffBalance])).digest('hex');
  if(!execute)return {staffId:input.staffId,name:typeof staff.name==='string'?staff.name:'Profissional',fine:fine/100,affordable:teamBalance>=fine,quote};
  if(input.quote!==quote||teamBalance<fine)throw Object.assign(Error('Confira novamente a rescisão.'),{code:'STAFF_DISMISS_REVIEW_REQUIRED'});
  tx.update(teamRef,{balance:(teamBalance-fine)/100});tx.update(staffRef,{balance:(staffBalance+fine)/100,teamId:'FREE',contract:0,salary:2500});
  const result={staffId:input.staffId,fine:fine/100,duplicate:false};
  tx.set(receiptRef,{teamId:account.entityId,staffId:input.staffId,quote,actorUid:uid,createdAt:now,previous:{type:staff.type,contract:staff.contract??0,salary:salary/100},result});return result;
 });
}
