import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluatePlayer} from '../../server/medical-evaluation.js';
import {memoryDB} from '../helpers/memory-db.mjs';
import {INJURIES_DB} from '../../src/game/INJURIES_DB.js';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'DOCTOR',entityId:'d',revision:1},'accountEntityOwners/users_d':{uid:'u',entityId:'d',type:'DOCTOR'},'users/d':{type:'DOCTOR',status:'ACTIVE',teamId:'t',energy:10,xp:195,level:2},'teams/t':{status:'ACTIVE'},'players/p':{teamId:'t',injury:INJURIES_DB.LEVE[0],recoveryLeft:1,energy:70,attributes:{speed:60},balance:123}});
const input={requestId:'r',playerId:'p'};
test('successful evaluation atomically heals light injury, preserves player fields and charges once',async()=>{
 const db=memoryDB(seed());const results=await Promise.all([evaluatePlayer(db,'u',input,{draw:()=>0}),evaluatePlayer(db,'u',input,{draw:()=>999999})]);
 assert.deepEqual(results.map(r=>r.duplicate),[false,true]);assert.equal(results[1].healed,true);assert.equal(db.values.get('players/p').injury,undefined);assert.equal(db.values.get('players/p').recoveryLeft,0);assert.equal(db.values.get('players/p').balance,123);assert.deepEqual(db.values.get('players/p').attributes,{speed:60});assert.equal(db.values.get('users/d').energy,0);assert.equal(db.values.get('users/d').xp,0);assert.equal(db.values.get('users/d').level,3);assert.equal(db.values.get('users/d').pendingPerks,1);
 await assert.rejects(evaluatePlayer(db,'u',{...input,playerId:'other'}));
});
test('fast diagnosis lowers cost; failed roll or serious injury never heals',async()=>{
 for(const [injury,draw] of [[INJURIES_DB.LEVE[0],()=>999999],[{label:INJURIES_DB.GRAVE[0]},()=>0]]){
  const s=seed();s['users/d'].perks=[{id:'FAST_DIAGNOSIS',value:0}];s['players/p'].injury=injury;const db=memoryDB(s),r=await evaluatePlayer(db,'u',input,{draw});assert.equal(r.cost,5);assert.equal(r.healed,false);assert.deepEqual(db.values.get('players/p'),s['players/p']);assert.equal(db.values.get('users/d').energy,5);
 }
});
test('role, ownership, club, injury, locks and injected result are validated before writes',async()=>{
 for(const [path,patch] of [['authAccounts/u',{active:false}],['authAccounts/u',{type:'COACH'}],['accountEntityOwners/users_d',{uid:'other'}],['users/d',{teamId:'FREE'}],['users/d',{energy:9}],['teams/t',{status:'BLOCKED'}],['players/p',{teamId:'other'}],['players/p',{recoveryLeft:0}],['players/p',{injury:null}],['matchParticipantLocks/player_p',{runId:'m'}],['matchParticipantLocks/team_t',{runId:'m'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=[...db.values];await assert.rejects(evaluatePlayer(db,'u',input));assert.deepEqual([...db.values],before);}
 await assert.rejects(evaluatePlayer(memoryDB(seed()),'u',{...input,healed:true}));
});
test('distinct concurrent evaluations cannot overspend or heal an already healed player',async()=>{
 const db=memoryDB(seed());const r=await Promise.allSettled(['a','b'].map(requestId=>evaluatePlayer(db,'u',{...input,requestId},{draw:()=>0})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('users/d').energy,0);
});
