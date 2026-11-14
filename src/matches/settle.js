import {addStats,brazilDay,careerOf,rewardFor} from './policy.js';
import {validDocumentId,validateReport} from './validate.js';
import {tableResult,reviseTable} from './standings.js';
// SERVER ONLY: caller must authenticate and derive report from a server snapshot.
// No browser imports this module. One Firestore transaction commits the ledger,
// athletes, season/competition aggregates and daily allowances together.
export async function settleMatch(db,args) {
 return db.runTransaction(tx=>settleMatchInTransaction(db,tx,args));
}
// Trusted server composition only: authorization and settlement share one transaction.
export async function settleMatchInTransaction(db,tx,{matchId,report,finishedAt,seasonId,competitionId=null,fixture=null,actor='SYSTEM',reason=null,expectedRevision=0}) {
 if(!validDocumentId(matchId))throw Error('Identificador inválido.');
 if(!Number.isFinite(finishedAt)||!validDocumentId(seasonId)||(competitionId!==null&&!validDocumentId(competitionId)))throw Error('Data/temporada inválida.');
 validateReport(report);
 if(reason!==null && (typeof reason!=='string'||reason.trim().length<3||reason.length>1000))throw Error('Informe o motivo da correção.');
 if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('Revisão inválida.');
 if(fixture && (report.kind!=='OFFICIAL'||!competitionId||!['id','homeId','awayId'].every(k=>validDocumentId(fixture[k]))||fixture.homeId===fixture.awayId))throw Error('Vínculo da partida inválido.');
 if(report.kind==='TEST')return {ignored:true};
 const ref=db.collection('matchResults').doc(matchId);
  const previous=await tx.get(ref), old=previous.exists?previous.data():null;
  if(old && !reason)return {duplicate:true,revision:old.revision};
  if(old && old.revision!==expectedRevision)throw Error('Resultado mudou. Recarregue antes de corrigir.');
  if(old && (old.kind!==report.kind || old.seasonId!==seasonId || old.competitionId!==competitionId))throw Error('Não é permitido mudar a categoria ou competição de uma partida encerrada.');
  if(old && ['id','homeId','awayId'].some(k=>(old.fixture?.[k]??null)!==(fixture?.[k]??null)))throw Error('Não é permitido mudar os clubes da partida encerrada.');
  let fixtureRef=null,fixtureDoc=null,tableRefs=[],tableDocs=[];
  if(fixture){
   fixtureRef=db.collection('matches').doc(fixture.id);fixtureDoc=await tx.get(fixtureRef);
   const f=fixtureDoc.exists?fixtureDoc.data():null;
   if(!f||f.runId!==matchId||f.competitionId!==competitionId||f.seasonId!==seasonId||f.homeId!==fixture.homeId||f.awayId!==fixture.awayId)throw Error('Calendário incompatível com a partida.');
   tableRefs=[fixture.homeId,fixture.awayId].map(id=>db.collection('competitionStandings').doc(`${competitionId}_${seasonId}_${id}`));
   tableDocs=await Promise.all(tableRefs.map(r=>tx.get(r)));
  }
  const day=old?.day || brazilDay(finishedAt);
  const ids=[...new Set([...Object.keys(old?.rows||{}),...Object.keys(report.rows)])].sort();
  if(ids.length>50)throw Error('Participantes demais.');
  const refs=ids.map(id=>{
   if(!/^[\w-]{1,128}$/.test(id))throw Error('Jogador inválido.');
   return {p:db.collection('players').doc(id),budget:db.collection('friendlyDailyXP').doc(`${id}_${day}`),season:db.collection('playerSeasons').doc(`${id}_${seasonId}`),competition:competitionId?db.collection('playerCompetitions').doc(`${id}_${competitionId}`):null};
  });
  const docs=await Promise.all(refs.map(async r=>({p:await tx.get(r.p),budget:await tx.get(r.budget),season:await tx.get(r.season),competition:r.competition?await tx.get(r.competition):null})));
  const rows={};
  for(let i=0;i<ids.length;i++){
   const id=ids[i],r=refs[i],d=docs[i];
   if(!d.p.exists)throw Error(`Jogador ${id} indisponível; nada foi aplicado.`);
   const p=d.p.data(),before=old?.rows[id],after=report.rows[id];
   const budget=d.budget.exists?d.budget.data():{granted:0};
   // Corrections cannot recycle previously issued allowance, even after a loss.
   const allocation=before?.dailyAllocation||0;
   const desired=after?rewardFor(report.kind,after.baseXP,Math.max(0,budget.granted-allocation)):0;
   const positiveAllocation=report.kind==='FRIENDLY'?Math.max(allocation,desired):0;
   const deltaXP=desired-(before?.xp||0);
   const energyDelta=(after?.energy||0)-(before?.energy||0);
   // Refund only energy actually deducted, not fatigue lost at the zero floor.
   // Keep this ledger through revisions so repeated corrections cannot mint energy.
   const previousApplied=before?.energyApplied??before?.energy??0;
   const currentEnergy=Math.max(0,Math.min(100,p.energy??100));
   const actualDelta=energyDelta>=0?Math.min(currentEnergy,energyDelta):-Math.min(previousApplied,-energyDelta,100-currentEnergy);
   const career=careerOf(p),bucket=report.kind==='OFFICIAL'?'official':'friendly';
   const deltaStats=addStats(after?.stats,before?.stats,-1);
   career[bucket]=addStats(career[bucket],deltaStats);
   // Apply a difference to CURRENT energy; never restore an old snapshot.
   const energy=currentEnergy-actualDelta;
   tx.update(r.p,{career,energy,pendingXP:(p.pendingXP||0)+deltaXP});
   for(const key of ['season','competition'])if(r[key]){
    const aggregate=d[key]?.exists?d[key].data():{};
    tx.set(r[key],{...aggregate,playerId:id,seasonId,competitionId,[bucket]:addStats(aggregate[bucket],deltaStats)});
   }
   if(report.kind==='FRIENDLY')tx.set(r.budget,{playerId:id,day,granted:budget.granted+positiveAllocation-allocation});
   rows[id]={...(after||{stats:{},baseXP:0,energy:0}),xp:desired,dailyAllocation:positiveAllocation,energyApplied:previousApplied+actualDelta};
  }
  const revision=(old?.revision||0)+1;
  if(fixture){
   tx.update(fixtureRef,{scoreHome:report.score[0],scoreAway:report.score[1],status:'FINISHED',played:true,resultRevision:revision});
   for(let side=0;side<2;side++){
    const current=tableDocs[side].exists?tableDocs[side].data():{};
    tx.set(tableRefs[side],{teamId:side===0?fixture.homeId:fixture.awayId,seasonId,competitionId,...reviseTable(current,old?tableResult(old.score,side):null,tableResult(report.score,side))});
   }
  }
  const result={...report,rows,matchId,seasonId,competitionId,fixture,day,finishedAt:old?.finishedAt||finishedAt,revision,actor,reason};
  tx.set(ref,result);
  tx.set(db.collection('matchResultAudit').doc(`${matchId}_${revision}`),{...result,changedAt:finishedAt});
  return {revision};
}
