import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {ASSISTANT_PERKS} from '../src/game/ASSISTANT_PERKS.js';

export async function assistantPerks(db,uid,input,{choose=false,draw=randomInt}={}) {
 const allowed=choose?['revision','perkId']:[];
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!allowed.includes(k)))throw Error('Pedido inválido.');
 if(choose&&(!Number.isSafeInteger(input.revision)||input.revision<1||!ASSISTANT_PERKS.some(p=>p.id===input.perkId)))throw Error('Escolha inválida.');
 // Sample before transaction retries, never in the browser.
 const shuffled=ASSISTANT_PERKS.map(p=>p.id);
 for(let i=shuffled.length-1;i>0;i--){const j=draw(0,i+1);[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id);
  const read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||account.type!=='ASSISTANT'||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`users_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!==account.type||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const staffRef=ref('users',account.entityId),staff=await read(staffRef);
  if(staff?.status!=='ACTIVE'||staff.type!=='ASSISTANT')throw Error('Auxiliar indisponível.');
  const pending=staff.pendingPerks??0,perks=staff.perks??[];
  if(!Number.isSafeInteger(pending)||pending<0||!Array.isArray(perks)||perks.some(p=>!ASSISTANT_PERKS.some(c=>c.id===p?.id)))throw Error('Habilidades inválidas.');
  const owned=perks.map(p=>p.id).sort();if(new Set(owned).size!==owned.length)throw Error('Habilidades duplicadas.');
  const offerRef=ref('serverConfig',`assistantPerks_${uid}`),offer=await read(offerRef);
  const sameOwned=offer?.staffId===account.entityId&&JSON.stringify(offer.owned)===JSON.stringify(owned);
  if(!choose){
   if(!pending||owned.length===ASSISTANT_PERKS.length)return {revision:null,options:[]};
   if(offer&&!offer.chosen&&sameOwned)return {revision:offer.revision,options:ASSISTANT_PERKS.filter(p=>offer.options.includes(p.id))};
   const revision=(offer?.revision??0)+1;if(!Number.isSafeInteger(revision))throw Error('Revisão inválida.');
   const options=shuffled.filter(id=>!owned.includes(id)).slice(0,3);
   tx.set(offerRef,{staffId:account.entityId,revision,owned,options,chosen:null});
   return {revision,options:ASSISTANT_PERKS.filter(p=>options.includes(p.id))};
  }
  const receiptRef=ref(`serverConfig/assistantPerks_${uid}/choices`,String(input.revision)),receipt=await read(receiptRef);
  if(receipt){if(receipt.staffId!==account.entityId||receipt.perkId!==input.perkId)throw Error('Escolha já utilizada.');return {...receipt.result,duplicate:true};}
  if(!offer||offer.revision!==input.revision||offer.chosen||!sameOwned||!pending||!offer.options.includes(input.perkId)||owned.includes(input.perkId))throw Error('Recarregue as opções.');
  const perk=ASSISTANT_PERKS.find(p=>p.id===input.perkId),result={perk,pendingPerks:pending-1,duplicate:false};
  tx.update(staffRef,{perks:[...perks,perk],pendingPerks:pending-1});
  tx.update(offerRef,{chosen:input.perkId});
  tx.set(receiptRef,{staffId:account.entityId,perkId:input.perkId,result});
  return result;
 });
}
