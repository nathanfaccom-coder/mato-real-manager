// Trusted worker adapter. Must run with Admin SDK behind authenticated/scheduled
// functions and protected matchRuns documents; NEVER invoke from a web client.
import {simulateMatch} from '../src/simulation/engine.js';
import {reportFromSimulation} from '../src/matches/policy.js';
import {settleMatch} from '../src/matches/settle.js';
export async function finalizeDueMatch(db,matchId,now=Date.now()) {
 const ref=db.collection('matchRuns').doc(matchId),snap=await ref.get();
 if(!snap.exists)throw Error('Partida não encontrada.');
 const run=snap.data();
 if(run.status==='FINISHED')return {duplicate:true};
 if(run.status!=='RUNNING'||!Number.isFinite(run.endsAt)||now<run.endsAt)return {pending:true};
 if(!['OFFICIAL','FRIENDLY'].includes(run.kind))throw Error('Tipo de partida persistente inválido.');
 if(run.kind==='OFFICIAL'&&(!run.fixtureId||!run.competitionId))throw Error('Partida oficial sem vínculo competitivo.');
 // Commands must have been validated and frozen by the server at their deadlines.
 const match=simulateMatch({...run.snapshot,commands:run.commands||[]});
 const report=reportFromSimulation(match,run.kind);
 const fixture=run.fixtureId?{id:run.fixtureId,homeId:run.snapshot.home.id,awayId:run.snapshot.away.id}:null;
 const result=await settleMatch(db,{matchId,report,finishedAt:run.endsAt,seasonId:run.seasonId,competitionId:run.competitionId||null,fixture});
 // A crash between settlement and this marker is safe: the ledger deduplicates.
 await db.runTransaction(async tx=>{
  const current=await tx.get(ref);
  if(current.data().status==='FINISHED')return;
  const locks=(run.lockIds||[]).map(id=>db.collection('matchParticipantLocks').doc(id));
  const lockDocs=await Promise.all(locks.map(ref=>tx.get(ref)));
  tx.update(ref,{status:'FINISHED',score:report.score,settledAt:now});
  locks.forEach((ref,i)=>{if(lockDocs[i].exists&&lockDocs[i].data().matchId===matchId)tx.delete(ref);});
 });
 return result;
}
