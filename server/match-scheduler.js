import {randomUUID} from 'node:crypto';
import {finalizeDueMatch} from './match-worker.js';

// A trusted scheduler invokes one job per request to bound Edge CPU usage.
// Duplicate cron deliveries are normal. A lease prevents concurrent simulation;
// the settlement ledger is the final authority if a worker crashes after commit.
export async function processNextDueMatch(db,{now=Date.now(),leaseId=randomUUID(),finalize=finalizeDueMatch}={}) {
 const gate=await db.collection('serverConfig').doc('matchAutomation').get();
 if(!gate.exists||gate.data().enabled!==true||gate.data().schemaVersion!==1)return {disabled:true};
 const pending=await db.collection('matchRuns').where('status','==','RUNNING').where('nextAttemptAt','<=',now).orderBy('nextAttemptAt').limit(1).get();
 if(pending.empty)return {idle:true};
 const ref=pending.docs[0].ref;
 const claimed=await db.runTransaction(async tx=>{
  const config=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
  const doc=await tx.get(ref),run=doc.exists?doc.data():null;
  if(!config.exists||config.data().enabled!==true||config.data().schemaVersion!==1)return false;
  if(!run||run.status!=='RUNNING'||!Number.isFinite(run.endsAt)||run.endsAt>now||!Number.isFinite(run.nextAttemptAt)||run.nextAttemptAt>now||run.workerLease?.until>now)return false;
  tx.update(ref,{workerLease:{id:leaseId,until:now+180000},nextAttemptAt:now+180000});
  return true;
 });
 if(!claimed)return {busy:true};
 try {
  const result=await finalize(db,ref.id,now);
  return {matchId:ref.id,...result};
 } catch(error) {
  await db.runTransaction(async tx=>{
   const doc=await tx.get(ref),run=doc.exists?doc.data():null;
   if(!run||run.status!=='RUNNING'||run.workerLease?.id!==leaseId)return;
   const attempts=Math.min(100,(run.workerFailures||0)+1);
   tx.update(ref,{workerLease:null,workerFailures:attempts,nextAttemptAt:now+Math.min(3600000,30000*2**Math.min(attempts-1,7)),lastWorkerErrorAt:now});
  });
  throw error;
 }
}
