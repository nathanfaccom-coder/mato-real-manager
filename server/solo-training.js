import {randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {INJURIES_DB} from '../src/game/INJURIES_DB.js';
import {overallFor} from '../src/game/progression.js';
export const SOLO_TYPES={FISICO_BASE:['stamina','balance','condition'],VELOCIDADE:['speed','accel','agility','dribbleSpd'],IMPULSAO:['jump','header','condition'],CHUTE:['shot','shotPower','shotTech','weakFootAcc'],PASSE:['shortPass','longPass','shortPassSpd','longPassSpd','tech','weakFootFreq'],DRIBLE:['dribble','dribbleSpd','agility','tech'],DEFESA:['defense','aggression','response'],MENTAL:['teamwork','mentality','response'],BOLA_PARADA:['freeKick','curve','header','shotTech'],GOLEIRO:['gk','response','jump','longPass']};
export async function trainSolo(db,uid,input,{now=Date.now(),draw=randomInt}={}){
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['requestId','type'].includes(k))||!validDocumentId(input.requestId)||!Object.hasOwn(SOLO_TYPES,input.type))throw Error('Treino inválido.');
 const injured=draw(0,1000000)<20000,injury=INJURIES_DB.LEVE[draw(0,INJURIES_DB.LEVE.length)],baseXP=draw(8,16),growth=SOLO_TYPES[input.type].filter(()=>draw(0,1000000)<150000);
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||account.type!=='PLAYER'||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`players_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!=='PLAYER'||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const playerRef=ref('players',account.entityId),player=await read(playerRef);
  if(!player||player.status!=='ACTIVE')throw Error('Jogador indisponível.');
  const receiptRef=ref(`serverConfig/solo_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  if(receipt){if(receipt.playerId!==account.entityId||receipt.type!==input.type)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  if(await read(ref('matchParticipantLocks',`player_${account.entityId}`)))throw Error('Jogador em partida.');
  let team=null,teamRef=null;
  if(player.teamId&&player.teamId!=='FREE'){
   if(!validDocumentId(player.teamId))throw Error('Clube inválido.');
   if(await read(ref('matchParticipantLocks',`team_${player.teamId}`)))throw Error('Clube em partida.');
   teamRef=ref('teams',player.teamId);team=await read(teamRef);if(team?.status!=='ACTIVE')throw Error('Clube indisponível.');
  }
  const energy=player.energy??100,xp=player.xp??0,recovery=player.recoveryLeft??0;
  if(!Number.isFinite(energy)||energy<35||energy>100||!Number.isSafeInteger(xp)||!Number.isSafeInteger(recovery)||recovery!==0)throw Error('Jogador sem condições para treinar.');
  let result;
  if(injured){
   tx.update(playerRef,{injury,recoveryLeft:1,energy:energy-20,mood:'😡'});
   result={injured:true,injury,xp:0,energyCost:20,evolved:[],equipmentBonus:0,duplicate:false};
  }else{
   const attrs={...(player.attributes??{})};
   if(Object.values(attrs).some(v=>!Number.isSafeInteger(v)||v<1||v>99))throw Error('Atributos inválidos.');
   let bonus=0;
   if(player.equippedItem){const item=player.equippedItem;if(!validDocumentId(item.id)||!Number.isSafeInteger(item.power)||item.power<0)throw Error('Equipamento inválido.');bonus=Math.ceil(baseXP*item.power/100);}
   const gain=baseXP+bonus;if(!Number.isSafeInteger(gain)||!Number.isSafeInteger(xp+gain))throw Error('XP inválido.');
   const evolved=[];for(const attr of growth)if((attrs[attr]??50)<99){attrs[attr]=(attrs[attr]??50)+1;evolved.push(attr);}
   const next={...player,energy:energy-35,xp:xp+gain,attributes:attrs,overall:overallFor(player.position,attrs,player.overall??45)};
   // Equipping already moves the item out of sales. Consume only the equipped
   // snapshot, never delete an arbitrary sales document by an embedded ID.
   delete next.equippedItem;tx.set(playerRef,next);
   if(team)tx.update(teamRef,{trainingLogs:[{date:now,type:'🏃‍♂️ TREINO SOLO',report:`${typeof player.name==='string'?player.name.slice(0,100):'Jogador'} fez um treino extra e ganhou +${gain} XP.${evolved.length?' Alguns atributos evoluíram!':''}`},...(Array.isArray(team.trainingLogs)?team.trainingLogs:[])].slice(0,15)});
   result={injured:false,xp:gain,energyCost:35,evolved,equipmentBonus:bonus,duplicate:false};
  }
  tx.set(receiptRef,{playerId:account.entityId,type:input.type,createdAt:now,result});return result;
 });
}
