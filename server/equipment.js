import {validDocumentId} from '../src/matches/validate.js';

// Ownership here is relative to stored inventory. Legacy sales/profile writes
// must be closed before enabling this endpoint in production.
export async function equipItem(db, uid, input, {now=Date.now()}={}) {
 if (!validDocumentId(uid) || !input || Array.isArray(input) ||
     Object.keys(input).some(k=>!['requestId','itemId'].includes(k)) ||
     !validDocumentId(input.requestId) || !validDocumentId(input.itemId)) throw Error('Equipamento inválido.');
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id);
  const read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true || gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true || account.type!=='PLAYER' || !validDocumentId(account.entityId) || !Number.isSafeInteger(account.revision) || account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`players_${account.entityId}`));
  if(owner?.uid!==uid || owner.type!=='PLAYER' || owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const playerRef=ref('players',account.entityId), player=await read(playerRef);
  if(player?.status!=='ACTIVE')throw Error('Jogador indisponível.');
  const receiptRef=ref(`serverConfig/equip_${uid}/operations`,input.requestId), receipt=await read(receiptRef);
  if(receipt){
   if(receipt.playerId!==account.entityId || receipt.itemId!==input.itemId)throw Error('Pedido já utilizado.');
   return {...receipt.result,duplicate:true};
  }
  if(await read(ref('matchParticipantLocks',`player_${account.entityId}`)))throw Error('Jogador em partida.');
  if(player.teamId && player.teamId!=='FREE'){
   if(!validDocumentId(player.teamId))throw Error('Clube inválido.');
   if(await read(ref('matchParticipantLocks',`team_${player.teamId}`)))throw Error('Clube em partida.');
   if((await read(ref('teams',player.teamId)))?.status!=='ACTIVE')throw Error('Clube indisponível.');
  }
  const itemRef=ref('sales',input.itemId), item=await read(itemRef);
  if(!item || item.buyerId!==account.entityId)throw Error('Item indisponível no seu inventário.');
  if(!['CHUTEIRA','LUVAS'].includes(item.cat))throw Error('Este item não pode ser equipado.');
  // Product forms can store integer powers as strings. Never parse a prefix
  // such as "50invalid" or allow negative/fractional/non-finite bonuses.
  const raw=item.power??0;
  const power=typeof raw==='number'?raw:typeof raw==='string'&&/^\d+$/.test(raw)?Number(raw):NaN;
  if(!Number.isSafeInteger(power) || power<0 || typeof item.productName!=='string')throw Error('Dados do equipamento inválidos.');
  const equippedItem={id:input.itemId,name:item.productName,cat:item.cat,power};
  if(typeof item.img==='string')equippedItem.img=item.img;
  // Preserve replacement behavior: the old equipped item is not refunded.
  tx.update(playerRef,{equippedItem});tx.delete(itemRef);
  const result={itemId:input.itemId,name:item.productName,duplicate:false};
  tx.set(receiptRef,{playerId:account.entityId,itemId:input.itemId,createdAt:now,result});
  return result;
 });
}
