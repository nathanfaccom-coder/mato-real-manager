import test from 'node:test';
import assert from 'node:assert/strict';
import {surgery} from '../../server/medical-surgery.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'DOCTOR',entityId:'d',revision:1},'accountEntityOwners/users_d':{uid:'u',type:'DOCTOR',entityId:'d'},'users/d':{type:'DOCTOR',status:'ACTIVE',teamId:'t',energy:100,xp:160,level:2,balance:10},'teams/t':{status:'ACTIVE',healthPlan:{coverage:50}},'players/p':{teamId:'t',injury:'Estiramento G2',recoveryLeft:3,balance:1000000,hospitalFund:100000,donors:{someone:100000},energy:70}});
async function request(db){const r=await surgery(db,'u',{playerId:'p'});return {playerId:'p',requestId:'r',procedureId:r.options[0].procedureId,quote:r.options[0].quote};}
test('surgery success atomically debits fund then balance and pays fee, XP and level once',async()=>{
 const db=memoryDB(seed()),input=await request(db);const r=await Promise.all([surgery(db,'u',input,{execute:true,draw:()=>0}),surgery(db,'u',input,{execute:true,draw:()=>999999})]);
 assert.deepEqual(r.map(v=>v.duplicate),[false,true]);assert.equal(r[1].success,true);assert.equal(r[0].charged,750000);assert.equal(r[0].doctorFee,150000);
 const p=db.values.get('players/p'),d=db.values.get('users/d');assert.equal(p.hospitalFund,0);assert.equal(p.balance,350000);assert.equal(p.injury,undefined);assert.equal(p.recoveryLeft,0);assert.deepEqual(p.donors,{});assert.equal(p.energy,70);assert.equal(d.balance,150010);assert.equal(d.energy,60);assert.equal(d.xp,10);assert.equal(d.level,3);assert.equal(d.pendingPerks,1);assert.equal(db.values.get('teams/t').trainingLogs.length,1);
});
test('failure charges once, penalizes XP/injury and records news atomically; cold blood prevents extra injury/news',async()=>{
 for(const cold of [false,true]){const s=seed();s['users/d'].perks=cold?[{id:'COLD_BLOOD'}]:[];const db=memoryDB(s),input=await request(db);const r=await surgery(db,'u',input,{execute:true,draw:()=>999999});assert.equal(r.success,false);assert.equal(db.values.get('players/p').recoveryLeft,cold?3:5);assert.equal(db.values.get('users/d').xp,140);assert.equal(db.values.get('users/d').balance,10);assert.equal(db.values.get('players/p').balance,350000);assert.equal([...db.values.keys()].filter(k=>k.startsWith('news/')).length,cold?0:1);assert.equal((await surgery(db,'u',input,{execute:true})).duplicate,true);}
});
test('stale quotes, forged outcomes, foreign club, match locks and insufficient funds abort without writes',async()=>{
 for(const [path,patch] of [['players/p',{balance:0}],['players/p',{recoveryLeft:4}],['players/p',{teamId:'other'}],['teams/t',{healthPlan:{coverage:80}}],['users/d',{energy:80}],['authAccounts/u',{active:false}],['matchParticipantLocks/player_p',{runId:'m'}]]){const db=memoryDB(seed()),input=await request(db);db.values.set(path,{...db.values.get(path),...patch});const before=[...db.values];await assert.rejects(surgery(db,'u',input,{execute:true}));assert.deepEqual([...db.values],before);}
 const db=memoryDB(seed()),input=await request(db);await assert.rejects(surgery(db,'u',{...input,success:true},{execute:true}));
});
test('different concurrent requests using one review cannot double-operate',async()=>{
 const db=memoryDB(seed()),input=await request(db);const r=await Promise.allSettled(['a','b'].map(requestId=>surgery(db,'u',{...input,requestId},{execute:true,draw:()=>0})));assert.equal(r.filter(v=>v.status==='fulfilled').length,1);assert.equal(db.values.get('users/d').energy,60);
});
