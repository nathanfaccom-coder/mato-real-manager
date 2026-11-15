import {createHash,randomInt} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {SURGERY_OPTIONS,surgeryCategory,surgeryTerms} from '../src/medical/surgery-policy.js';
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const cents=value=>{const n=(value??0)*100;if(typeof (value??0)!=='number'||!Number.isFinite(n)||!Number.isSafeInteger(Math.round(n))||Math.abs(n-Math.round(n))>0.00001)throw Error('Saldo inválido.');return Math.round(n);};
export async function surgery(db,uid,input,{execute=false,now=Date.now(),draw=randomInt}={}) {
 const keys=execute?['playerId','requestId','procedureId','quote']:['playerId'];
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!keys.includes(k))||!validDocumentId(input.playerId))throw Error('Pedido inválido.');
 if(execute&&(!validDocumentId(input.requestId)||!validDocumentId(input.procedureId)||typeof input.quote!=='string'||!/^[a-f0-9]{64}$/.test(input.quote)))throw Error('Conferência inválida.');
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

  const receiptRef=execute?ref(`serverConfig/surgery_${uid}/operations`,input.requestId):null;
  if(execute){const receipt=await read(receiptRef);if(receipt){if(receipt.staffId!==account.entityId||receipt.teamId!==staff.teamId||receipt.playerId!==input.playerId||receipt.procedureId!==input.procedureId||receipt.quote!==input.quote)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}}
  if(await read(ref('matchParticipantLocks',`team_${staff.teamId}`))||await read(ref('matchParticipantLocks',`player_${input.playerId}`)))throw Error('Participante em partida.');
  const playerRef=ref('players',input.playerId),player=await read(playerRef);
  if(!player||player.teamId!==staff.teamId||['PENDING','BLOCKED'].includes(player.status)||!Number.isSafeInteger(player.recoveryLeft)||player.recoveryLeft<=0)throw Error('Paciente indisponível.');
  const procedures=SURGERY_OPTIONS[surgeryCategory(player.injury)];if(!procedures)throw Error('Lesão não operável.');
  const fund=cents(player.hospitalFund),balance=cents(player.balance),doctorBalance=cents(staff.balance);
  if(fund<0||!Number.isSafeInteger(fund+balance))throw Error('Fundos inválidos.');
  let xp=staff.xp??0,level=staff.level??1,pendingPerks=staff.pendingPerks??0;
  if(![xp,level,pendingPerks].every(v=>Number.isSafeInteger(v)&&v>=0)||level<1||!Number.isSafeInteger(level*100))throw Error('Progressão inválida.');
  const options=procedures.map(p=>{
   const terms=surgeryTerms({procedureId:p.id,doctor:staff,player,team});
   const quote=hash([account.entityId,staff.teamId,input.playerId,terms,player.injury,player.recoveryLeft,fund,balance,doctorBalance,xp,level,pendingPerks,staff.energy??100]);
   return {...terms,quote,affordable:fund+balance>=cents(terms.finalCost)};
  });
  if(!execute)return {playerId:input.playerId,playerName:typeof player.name==='string'?player.name.slice(0,100):'Jogador',options};
  const selected=options.find(p=>p.procedureId===input.procedureId);
  if(!selected||selected.quote!==input.quote||!selected.affordable)throw Object.assign(Error('Condições alteradas; confira novamente.'),{code:'SURGERY_REVIEW_REQUIRED'});
  const charge=cents(selected.finalCost),fundUsed=Math.min(fund,charge),success=roll<selected.chance;
  const recoveryLeft=success?Math.max(0,player.recoveryLeft-selected.timeRed):player.recoveryLeft+selected.failurePenalty;
  if(!Number.isSafeInteger(recoveryLeft))throw Error('Lesão inválida.');
  const nextPlayer={...player,hospitalFund:(fund-fundUsed)/100,balance:(balance-(charge-fundUsed))/100,recoveryLeft};
  const nextStaff={energy:(staff.energy??100)-40};
  if(success){
   if(!recoveryLeft)delete nextPlayer.injury;nextPlayer.donors={};
   xp+=50;if(!Number.isSafeInteger(xp))throw Error('XP inválido.');
   if(xp>=level*100){xp-=level*100;level++;if(level%3===0)pendingPerks++;}
   const paid=doctorBalance+cents(selected.doctorFee);
   if(![paid,level,pendingPerks].every(Number.isSafeInteger))throw Error('Progressão inválida.');
   Object.assign(nextStaff,{balance:paid/100,xp,level,pendingPerks});
  }else{nextPlayer.mood='😡';nextStaff.xp=Math.max(0,xp-20);}
  const doctorName=typeof staff.name==='string'?staff.name.slice(0,100):'Médico',playerName=typeof player.name==='string'?player.name.slice(0,100):'Jogador';
  const report=success?`O Dr. ${doctorName} operou ${playerName} com SUCESSO e reduziu ${selected.timeRed} jogos de lesão!`:`Houve complicações na cirurgia de ${playerName}. O jogador precisará de mais tempo.`;
  tx.set(playerRef,nextPlayer);tx.update(staffRef,nextStaff);
  tx.update(ref('teams',staff.teamId),{trainingLogs:[{date:now,type:success?'🏥 DM (ALTA MÉDICA)':'⚠️ ERRO MÉDICO',report},...(Array.isArray(team.trainingLogs)?team.trainingLogs:[])].slice(0,15)});
  if(!success&&selected.failurePenalty)tx.set(ref('news',`surgery_${hash([uid,input.requestId])}`),{text:`🚨 **ERRO MÉDICO!**\nO Dr. **${doctorName}** do ${typeof team.name==='string'?team.name.slice(0,100):'Clube'} cometeu uma falha grave na cirurgia de **${playerName}**!`,type:'press',date:now,likes:[]});
  const result={playerId:input.playerId,success,recoveryLeft,charged:selected.finalCost,doctorFee:success?selected.doctorFee:0,xpChange:success?50:nextStaff.xp-xp,energyCost:40,level,duplicate:false};
  tx.set(receiptRef,{staffId:account.entityId,teamId:staff.teamId,playerId:input.playerId,procedureId:input.procedureId,quote:input.quote,createdAt:now,result});return result;
 });
}
