import {randomInt} from 'node:crypto';
import {brazilDay} from '../src/matches/policy.js';
import {validDocumentId} from '../src/matches/validate.js';

// Ownership here is relative to stored inventory. Legacy sales/profile writes
// must be closed before enabling this endpoint in production.
export async function consumeItem(db, uid, input, {now=Date.now(),draw=randomInt,staff=false}={}) {
 if (!validDocumentId(uid) || !input || Array.isArray(input) ||
     Object.keys(input).some(k=>!['requestId','itemId'].includes(k)) ||
     !validDocumentId(input.requestId) || !validDocumentId(input.itemId)) throw Error('Consumo inválido.');
 const roll=draw(0,1000000),today=brazilDay(now);
 // Accept the previous browser Date.toDateString format during migration.
 const legacyDay=new Date(`${today}T12:00:00Z`).toUTCString().slice(0,16).replace(',', '').split(' ');
 const legacyDate=`${legacyDay[0]} ${legacyDay[2]} ${legacyDay[1]} ${legacyDay[3]}`;
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id);
  const read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true || gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true || !(staff?['COACH','DOCTOR','SCOUT','ASSISTANT']:['PLAYER']).includes(account.type) || !validDocumentId(account.entityId) || !Number.isSafeInteger(account.revision) || account.revision<1)throw Error('Vínculo inválido.');
  const collection=staff?'users':'players';
  const owner=await read(ref('accountEntityOwners',`${collection}_${account.entityId}`));
  if(owner?.uid!==uid || owner.type!==account.type || owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const playerRef=ref(collection,account.entityId), player=await read(playerRef);
  if(player?.status!=='ACTIVE'||(staff&&player.type!==account.type))throw Error('Jogador indisponível.');
  const receiptRef=ref(`serverConfig/${staff?'staffConsume':'consume'}_${uid}/operations`,input.requestId), receipt=await read(receiptRef);
  if(receipt){
   if(receipt.playerId!==account.entityId || receipt.itemId!==input.itemId||(staff&&receipt.role!==account.type))throw Error('Pedido já utilizado.');
   return {...receipt.result,duplicate:true};
  }
  if(!staff&&await read(ref('matchParticipantLocks',`player_${account.entityId}`)))throw Error('Jogador em partida.');
  if(player.teamId && player.teamId!=='FREE'){
   if(!validDocumentId(player.teamId))throw Error('Clube inválido.');
   if(await read(ref('matchParticipantLocks',`team_${player.teamId}`)))throw Error('Clube em partida.');
   if((await read(ref('teams',player.teamId)))?.status!=='ACTIVE')throw Error('Clube indisponível.');
  }
  const itemRef=ref('sales',input.itemId), item=await read(itemRef);
  if(!item || item.buyerId!==account.entityId || (item.buyerType&&item.buyerType!==account.type))throw Error('Item indisponível no seu inventário.');
  if(!(staff?['energy','SAUDE','CONSUMIVEL']:['SAUDE','CONSUMIVEL']).includes(item.cat))throw Error('Este item não pode ser consumido.');
  const raw=item.power??0;
  const power=typeof raw==='number'?raw:typeof raw==='string'&&/^\d+$/.test(raw)?Number(raw):NaN;
  const energy=player.energy??(staff?100:0);
  const toxicity=[today,legacyDate].includes(player.lastToxicityDate)?(player.toxicity??0):0;
  if(!Number.isSafeInteger(power)||power<0||!Number.isFinite(energy)||energy<0||energy>100||!Number.isSafeInteger(toxicity)||toxicity<0||toxicity>=Number.MAX_SAFE_INTEGER)throw Error('Dados de consumo inválidos.');
  if(staff&&energy>=100)throw Error('Sua energia já está cheia!');
  if(!staff&&player.injury?.type==='INTOXICACAO')throw Error('Você está intoxicado e não pode consumir este item.');
  const outcome=toxicity===2&&roll<400000?'SICK':toxicity>=3&&roll<950000?'VOMIT':'SUCCESS';
  const patch={toxicity:toxicity+1,lastToxicityDate:today};
  if(staff&&outcome!=='SUCCESS'){patch.energy=0;}
  else if(outcome==='VOMIT'){patch.energy=0;patch.mood='😡';}
  else if(outcome==='SICK'){
   patch.injury={type:'INTOXICACAO',label:'Intoxicação Alimentar',games:1,isIncurable:true};patch.recoveryLeft=1;
  }else{
   if(power>0&&energy>=100)throw Error('Sua energia já está cheia!');
   patch.energy=Math.min(100,energy+power);
  }
  tx.update(playerRef,patch);tx.delete(itemRef);
  const result={itemId:input.itemId,outcome,energy:patch.energy??energy,energyRecovered:(patch.energy??energy)-energy,toxicity:patch.toxicity,duplicate:false};
  tx.set(receiptRef,{playerId:account.entityId,itemId:input.itemId,createdAt:now,...(staff?{role:account.type}:{}),result});return result;
 });
}
