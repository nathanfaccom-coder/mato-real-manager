import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {COACH_PERKS} from '../src/game/COACH_PERKS.js';
import {DOCTOR_PERKS} from '../src/game/DOCTOR_PERKS.js';
import {ASSISTANT_PERKS} from '../src/game/ASSISTANT_PERKS.js';

export async function assistantPerks(db,uid,input,{choose=false,staffRoles=false,draw=randomInt}={}) {
 const allowed=choose?['revision','perkId']:[];
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!allowed.includes(k)))throw Error('Pedido inválido.');
 if(choose&&(!Number.isSafeInteger(input.revision)||input.revision<1||![...ASSISTANT_PERKS,...COACH_PERKS,...DOCTOR_PERKS].some(p=>p.id===input.perkId)))throw Error('Escolha inválida.');
 // Sample before transaction retries, never in the browser.
 const catalogs={ASSISTANT:ASSISTANT_PERKS,COACH:COACH_PERKS,DOCTOR:DOCTOR_PERKS};
 const orders=Object.fromEntries(Object.entries(catalogs).map(([role,catalog])=>{const ids=catalog.map(p=>p.id);for(let i=ids.length-1;i>0;i--){const j=draw(0,i+1);[ids[i],ids[j]]=[ids[j],ids[i]];}return [role,ids];}));
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id);
  const read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||!(staffRoles?['COACH','DOCTOR']:['ASSISTANT']).includes(account.type)||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const catalog=catalogs[account.type],shuffled=orders[account.type];
  if(choose&&!catalog.some(p=>p.id===input.perkId))throw Error('Habilidade de outra função.');
  const namespace=account.type==='ASSISTANT'?`assistantPerks_${uid}`:`staffPerks_${account.type}_${uid}`;
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!==account.type||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const staffRef=ref('users',account.entityId),staff=await read(staffRef);
  if(staff?.status!=='ACTIVE'||staff.type!==account.type)throw Error('Auxiliar indisponível.');
  const pending=staff.pendingPerks??0,perks=staff.perks??[];
  if(!Number.isSafeInteger(pending)||pending<0||!Array.isArray(perks)||perks.some(p=>!catalog.some(c=>c.id===p?.id)))throw Error('Habilidades inválidas.');
  const owned=perks.map(p=>p.id).sort();if(new Set(owned).size!==owned.length)throw Error('Habilidades duplicadas.');
  const offerRef=ref('serverConfig',namespace),offer=await read(offerRef);
  const sameOwned=offer?.staffId===account.entityId&&JSON.stringify(offer.owned)===JSON.stringify(owned);
  if(!choose){
   if(!pending||owned.length===catalog.length)return {revision:null,options:[]};
   if(offer&&!offer.chosen&&sameOwned)return {revision:offer.revision,options:catalog.filter(p=>offer.options.includes(p.id))};
   const revision=(offer?.revision??0)+1;if(!Number.isSafeInteger(revision))throw Error('Revisão inválida.');
   const options=shuffled.filter(id=>!owned.includes(id)).slice(0,3);
   tx.set(offerRef,{staffId:account.entityId,revision,owned,options,chosen:null});
   return {revision,options:catalog.filter(p=>options.includes(p.id))};
  }
  const receiptRef=ref(`serverConfig/${namespace}/choices`,String(input.revision)),receipt=await read(receiptRef);
  if(receipt){if(receipt.staffId!==account.entityId||receipt.perkId!==input.perkId)throw Error('Escolha já utilizada.');return {...receipt.result,duplicate:true};}
  if(!offer||offer.revision!==input.revision||offer.chosen||!sameOwned||!pending||!offer.options.includes(input.perkId)||owned.includes(input.perkId))throw Error('Recarregue as opções.');
  const perk=catalog.find(p=>p.id===input.perkId),result={perk,pendingPerks:pending-1,duplicate:false};
  tx.update(staffRef,{perks:[...perks,perk],pendingPerks:pending-1});
  tx.update(offerRef,{chosen:input.perkId});
  tx.set(receiptRef,{staffId:account.entityId,perkId:input.perkId,result});
  return result;
 });
}
