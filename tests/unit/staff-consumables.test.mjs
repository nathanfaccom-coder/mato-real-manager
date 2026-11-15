import test from 'node:test';
import assert from 'node:assert/strict';
import {consumeItem} from '../../server/consumables.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const now=Date.parse('2026-11-13T15:00:00Z'),input={requestId:'r',itemId:'item'};
const seed=(type='COACH')=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type,entityId:'s',revision:1},'accountEntityOwners/users_s':{uid:'u',type,entityId:'s'},'users/s':{status:'ACTIVE',type,teamId:'FREE',energy:80,xp:12},'sales/item':{buyerId:'s',cat:'energy',power:30}});
const consume=(db,body=input,roll=0)=>consumeItem(db,'u',body,{staff:true,now,draw:()=>roll});
test('all staff roles consume owned legacy energy items once with capped recovery',async()=>{
 for(const role of ['COACH','DOCTOR','SCOUT','ASSISTANT']){
  const db=memoryDB(seed(role));const r=await Promise.all([consume(db),consume(db)]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(r[0].energyRecovered,20);assert.equal(db.values.get('users/s').energy,100);assert.equal(db.values.get('users/s').xp,12);assert.equal(db.values.has('sales/item'),false);
 }
});
test('staff sickness and vomiting zero energy without player injury or mood effects',async()=>{
 for(const [toxicity,outcome] of [[2,'SICK'],[3,'VOMIT']]){
  const s=seed();Object.assign(s['users/s'],{toxicity,lastToxicityDate:'2026-11-13',mood:'happy'});const db=memoryDB(s);const r=await consume(db);assert.equal(r.outcome,outcome);assert.equal(db.values.get('users/s').energy,0);assert.equal(db.values.get('users/s').injury,undefined);assert.equal(db.values.get('users/s').mood,'happy');assert.equal((await consume(db,input,999999)).outcome,outcome);
 }
});
test('staff consumption rejects wrong role, owner, item, profile and club lock without writes',async()=>{
 for(const [path,patch] of [['authAccounts/u',{type:'PLAYER'}],['authAccounts/u',{active:false}],['accountEntityOwners/users_s',{uid:'other'}],['users/s',{type:'DOCTOR'}],['users/s',{status:'PENDING'}],['users/s',{energy:100,toxicity:3,lastToxicityDate:'2026-11-13'}],['sales/item',{buyerId:'other'}],['sales/item',{cat:'LUVAS'}]]){
  const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(consume(db));assert.deepEqual([...db.values],before);
 }
 const s=seed();s['users/s'].teamId='t';s['teams/t']={status:'ACTIVE'};s['matchParticipantLocks/team_t']={runId:'m'};await assert.rejects(consume(memoryDB(s)));
 await assert.rejects(consume(memoryDB(seed()),{...input,staff:true}));
 await assert.rejects(consumeItem(memoryDB(seed()),'u',input,{now}));
});
test('role changes cannot replay a receipt belonging to a previous staff role',async()=>{
 const db=memoryDB(seed());await consume(db);for(const path of ['authAccounts/u','accountEntityOwners/users_s','users/s'])db.values.get(path).type='DOCTOR';await assert.rejects(consume(db),/utilizado/);
});
test('typed player inventory is not consumable by staff with the same entity ID',async()=>{
 const s=seed();s['sales/item'].buyerType='PLAYER';await assert.rejects(consume(memoryDB(s)));
});
