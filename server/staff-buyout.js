import {createHash} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
const cents=n=>{if(typeof n!=='number'||!Number.isFinite(n)||!Number.isSafeInteger(Math.round(n*100))||Math.abs(n*100-Math.round(n*100))>0.00001)throw Error('Saldo inválido.');return Math.round(n*100);};
export async function buyoutStaff(db,uid,input,{execute=false,now=Date.now()}={}){
 const allowed=execute?['requestId','quote']:[];
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!allowed.includes(k))||(execute&&(!validDocumentId(input.requestId)||typeof input.quote!=='string'||!/^[a-f0-9]{64}$/.test(input.quote))))throw Error('Pedido inválido.');
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));if(account?.active!==true||!['COACH','DOCTOR','SCOUT','ASSISTANT'].includes(account.type)||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));if(owner?.uid!==uid||owner.type!==account.type||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const staffRef=ref('users',account.entityId),staff=await read(staffRef);if(staff?.status!=='ACTIVE'||staff.type!==account.type)throw Error('Profissional indisponível.');
  const receiptRef=execute?ref(`serverConfig/staffBuyout_${uid}/operations`,input.requestId):null,receipt=receiptRef?await read(receiptRef):null;
  if(receipt){if(receipt.staffId!==account.entityId||receipt.role!==account.type||receipt.quote!==input.quote)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  if(!validDocumentId(staff.teamId)||staff.teamId==='FREE')throw Error('Profissional sem clube.');
  const teamRef=ref('teams',staff.teamId),team=await read(teamRef);if(team?.status!=='ACTIVE')throw Error('Clube indisponível.');
  if(await read(ref('matchParticipantLocks',`team_${staff.teamId}`)))throw Error('Clube em partida.');
  const fine=staff.clause?cents(staff.clause):cents(staff.salary)*10,teamBalance=cents(team.balance??0),staffBalance=cents(staff.balance??0);
  if(fine<0||!Number.isSafeInteger(fine)||!Number.isSafeInteger(teamBalance+fine)||!Number.isSafeInteger(staffBalance-fine))throw Error('Rescisão inválida.');
  const quote=createHash('sha256').update(JSON.stringify([account.entityId,account.type,staff.teamId,staff.contract??0,staff.salary??null,staff.clause??null,fine,teamBalance,staffBalance])).digest('hex');
  if(!execute)return {teamName:typeof team.name==='string'?team.name:'Clube',fine:fine/100,affordable:staffBalance>=fine,quote};
  if(input.quote!==quote||staffBalance<fine)throw Object.assign(Error('Confira novamente a rescisão.'),{code:'STAFF_BUYOUT_REVIEW_REQUIRED'});
  tx.update(teamRef,{balance:(teamBalance+fine)/100});tx.update(staffRef,{balance:(staffBalance-fine)/100,teamId:'FREE',contract:0,salary:2500});
  const result={fine:fine/100,duplicate:false};tx.set(receiptRef,{staffId:account.entityId,role:account.type,teamId:staff.teamId,quote,actorUid:uid,createdAt:now,previous:{salary:staff.salary??null,clause:staff.clause??null,contract:staff.contract??0},result});return result;
 });
}
