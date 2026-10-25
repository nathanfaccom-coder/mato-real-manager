import {addStats,brazilDay,careerOf,rewardFor} from './policy.js';
// SERVER ONLY: caller must authenticate and derive report from a server snapshot.
// No browser imports this module. One Firestore transaction commits the ledger,
// athletes, season/competition aggregates and daily allowances together.
export async function settleMatch(db,{matchId,report,finishedAt,seasonId,competitionId=null,actor='SYSTEM',reason=null,expectedRevision=0}) {
 if(!/^[\w-]{1,128}$/.test(matchId))throw Error('Identificador inválido.');
 if(!Number.isFinite(finishedAt)||!seasonId)throw Error('Data/temporada inválida.');
 if(report.kind==='TEST')return {ignored:true};
 const ref=db.collection('matchResults').doc(matchId);
 return db.runTransaction(async tx=>{
  const previous=await tx.get(ref), old=previous.exists?previous.data():null;
  if(old && !reason)return {duplicate:true,revision:old.revision};
  if(old && old.revision!==expectedRevision)throw Error('Resultado mudou. Recarregue antes de corrigir.');
  if(old && (old.kind!==report.kind || old.seasonId!==seasonId || old.competitionId!==competitionId))throw Error('Não é permitido mudar a categoria ou competição de uma partida encerrada.');
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
   const career=careerOf(p),bucket=report.kind==='OFFICIAL'?'official':'friendly';
   const deltaStats=addStats(after?.stats,before?.stats,-1);
   career[bucket]=addStats(career[bucket],deltaStats);
   // Apply a difference to CURRENT energy; never restore an old snapshot.
   const energy=Math.max(0,Math.min(100,(p.energy??100)-energyDelta));
   tx.update(r.p,{career,energy,pendingXP:(p.pendingXP||0)+deltaXP});
   for(const key of ['season','competition'])if(r[key]){
    const aggregate=d[key]?.exists?d[key].data():{};
    tx.set(r[key],{...aggregate,playerId:id,seasonId,competitionId,[bucket]:addStats(aggregate[bucket],deltaStats)});
   }
   if(report.kind==='FRIENDLY')tx.set(r.budget,{playerId:id,day,granted:budget.granted+positiveAllocation-allocation});
   rows[id]={...(after||{stats:{},baseXP:0,energy:0}),xp:desired,dailyAllocation:positiveAllocation};
  }
  const revision=(old?.revision||0)+1;
  const result={...report,rows,matchId,seasonId,competitionId,day,finishedAt:old?.finishedAt||finishedAt,revision,actor,reason};
  tx.set(ref,result);
  tx.set(db.collection('matchResultAudit').doc(`${matchId}_${revision}`),{...result,changedAt:finishedAt});
  return {revision};
 });
}
