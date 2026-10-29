import {requireMatchAdmin} from './match-admin.js';
import {validDocumentId} from '../src/matches/validate.js';
import {matchXP} from '../src/matches/policy.js';
import {settleMatchInTransaction} from '../src/matches/settle.js';

const fields=['goals','assists','tackles','saves','yellows','reds','rating'];
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const integer=(value,max)=>Number.isSafeInteger(value)&&value>=0&&value<=max;

// Correction of recorded sporting facts only. Participation, classification,
// season, sides and fatigue remain those recorded by the trusted match worker.
export function correctedReport(old,input) {
 if(!['OFFICIAL','FRIENDLY'].includes(old.kind)||!object(old.rows))throw Error('Resultado incompatível.');
 if(!Array.isArray(input.score)||input.score.length!==2||!input.score.every(n=>integer(n,100)))throw Error('Placar inválido.');
 // Own goals are counted for the side credited on the scoreboard, not the scorer.
 if(!Array.isArray(input.ownGoals)||input.ownGoals.length!==2||!input.ownGoals.every(n=>integer(n,100)))throw Error('Gols contra inválidos.');
 if(!object(input.players))throw Error('Participantes inválidos.');
 const ids=Object.keys(old.rows),submitted=Object.keys(input.players);
 if(!ids.length||ids.length>50||ids.length!==submitted.length||submitted.some(id=>!Object.hasOwn(old.rows,id)))throw Error('Não altere os participantes.');
 const rows={},goals=[0,0],assists=[0,0];
 for(const id of ids){
  const previous=old.rows[id],value=input.players[id];
  if(!validDocumentId(id)||![0,1].includes(previous.side)||previous.stats?.appearances!==1||!(previous.stats.seconds>0))throw Error('Participação incompatível.');
  if(!object(value)||Object.keys(value).length!==fields.length||fields.some(k=>!Object.hasOwn(value,k)))throw Error('Estatísticas incompletas.');
  for(const key of fields.filter(k=>k!=='rating'))if(!integer(value[key],key==='yellows'?2:key==='reds'?1:100))throw Error('Contador inválido.');
  if(typeof value.rating!=='number'||!Number.isFinite(value.rating)||value.rating<0||value.rating>10||Math.abs(value.rating*10-Math.round(value.rating*10))>1e-8)throw Error('Nota inválida.');
  if(value.yellows===2&&value.reds!==1)throw Error('Dois amarelos exigem expulsão.');
  const stats={...previous.stats,...Object.fromEntries(fields.filter(k=>k!=='rating').map(k=>[k,value[k]])),ratingSum:value.rating,ratingCount:1};
  const side=previous.side,own=input.score[side],other=input.score[1-side];
  rows[id]={stats,side,energy:previous.energy,baseXP:matchXP(stats,own===other?'DRAW':own>other?'WIN':'LOSS')};
  goals[side]+=value.goals;assists[side]+=value.assists;
 }
 for(const side of [0,1])if(goals[side]+input.ownGoals[side]!==input.score[side]||assists[side]>goals[side])throw Error('Gols ou assistências não correspondem ao placar.');
 return {policyVersion:old.policyVersion,kind:old.kind,score:[...input.score],ownGoals:[...input.ownGoals],rows};
}

export async function correctMatch(db,uid,input,{now=Date.now()}={}) {
 if(!object(input)||Object.keys(input).some(k=>!['matchId','expectedRevision','reason','score','ownGoals','players'].includes(k)))throw Error('Pedido inválido.');
 if(!validDocumentId(input.matchId)||!Number.isSafeInteger(input.expectedRevision)||input.expectedRevision<1||typeof input.reason!=='string'||input.reason.trim().length<3||input.reason.length>1000)throw Error('Informe revisão e motivo válidos.');
 return db.runTransaction(async tx=>{
  await requireMatchAdmin(tx,db,uid);
  const gate=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
  if(gate.data()?.enabled!==true||gate.data()?.schemaVersion!==1)throw Error('Integração desativada.');
  const runRef=db.collection('matchRuns').doc(input.matchId);
  const run=(await tx.get(runRef)).data();
  const old=(await tx.get(db.collection('matchResults').doc(input.matchId))).data();
  const season=(await tx.get(db.collection('config').doc('system'))).data()?.season;
  if(!run||run.status!=='FINISHED'||!old||old.revision!==input.expectedRevision)throw Error('Recarregue uma partida encerrada.');
  if(!Number.isSafeInteger(season)||season<1||old.seasonId!==`season_${season}`||run.seasonId!==old.seasonId||run.kind!==old.kind||(run.competitionId||null)!==(old.competitionId||null))throw Error('Partida de outra temporada ou vínculo incompatível.');
  const report=correctedReport(old,input);
  const result=await settleMatchInTransaction(db,tx,{matchId:input.matchId,report,finishedAt:now,seasonId:old.seasonId,competitionId:old.competitionId,fixture:old.fixture,actor:uid,reason:input.reason.trim(),expectedRevision:input.expectedRevision});
  tx.update(runRef,{score:report.score,resultRevision:result.revision,correctedAt:now});
  return result;
 });
}
