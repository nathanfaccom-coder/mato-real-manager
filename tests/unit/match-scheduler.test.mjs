import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {processNextDueMatch} from '../../server/match-scheduler.js';
function fixture(){
 const db=memoryDB({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'matchRuns/m':{status:'RUNNING',endsAt:1000,nextAttemptAt:1000}});
 const collection=db.collection;
 db.collection=name=>{
  const result=collection(name);
  if(name==='matchRuns')result.where=()=>({where:(_field,_op,now)=>({orderBy:()=>({limit:()=>({get:async()=>{
   const entries=[...db.values].filter(([key,value])=>key.startsWith('matchRuns/')&&value.status==='RUNNING'&&value.nextAttemptAt<=now).sort((a,b)=>a[1].nextAttemptAt-b[1].nextAttemptAt).slice(0,1);
   return {empty:!entries.length,docs:entries.map(([key])=>({ref:collection('matchRuns').doc(key.split('/')[1])}))};
  }})})})});
  return result;
 };
 return db;
}
test('overlapping scheduler deliveries claim only one simulation',async()=>{
 const db=fixture();let calls=0;
 const finalize=async()=>{calls++;return {revision:1};};
 const results=await Promise.all([processNextDueMatch(db,{now:1000,leaseId:'a',finalize}),processNextDueMatch(db,{now:1000,leaseId:'b',finalize})]);
 assert.equal(calls,1);assert.ok(results.some(r=>r.busy));
 assert.equal(db.values.get('matchRuns/m').workerLease.until,181000);
});
test('failed job backs off and does not block a second due match',async()=>{
 const db=fixture();db.values.set('matchRuns/n',{status:'RUNNING',endsAt:1000,nextAttemptAt:1001});
 await assert.rejects(processNextDueMatch(db,{now:1001,finalize:async()=>{throw Error('network');}}),/network/);
 const failed=db.values.get('matchRuns/m');assert.equal(failed.workerFailures,1);assert.equal(failed.nextAttemptAt,31001);assert.equal(failed.workerLease,null);
 const next=await processNextDueMatch(db,{now:1002,finalize:async(_db,id)=>{assert.equal(id,'n');return {revision:1};}});assert.equal(next.matchId,'n');
});
test('disabled config, future jobs and live leases do not run; expired lease recovers',async()=>{
 const db=fixture();let calls=0;const finalize=async()=>{calls++;return {revision:1};};
 assert.deepEqual(await processNextDueMatch(db,{now:999,finalize}),{idle:true});
 db.values.get('serverConfig/matchAutomation').enabled=false;assert.deepEqual(await processNextDueMatch(db,{now:1000,finalize}),{disabled:true});
 db.values.get('serverConfig/matchAutomation').enabled=true;
 db.values.get('matchRuns/m').workerLease={id:'old',until:2000};
 assert.deepEqual(await processNextDueMatch(db,{now:1000,finalize}),{busy:true});
 await processNextDueMatch(db,{now:2000,finalize});assert.equal(calls,1);
});
