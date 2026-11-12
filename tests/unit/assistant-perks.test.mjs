import test from 'node:test';
import assert from 'node:assert/strict';
import {assistantPerks} from '../../server/assistant-perks.js';
import {memoryDB} from '../helpers/memory-db.mjs';
import {ASSISTANT_PERKS} from '../../src/game/ASSISTANT_PERKS.js';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'ASSISTANT',entityId:'s',revision:1},'accountEntityOwners/users_s':{uid:'u',type:'ASSISTANT',entityId:'s'},'users/s':{type:'ASSISTANT',status:'ACTIVE',pendingPerks:2,perks:[]}});
test('perk offer persists across reloads and concurrent requests; choices consume once',async()=>{
 const db=memoryDB(seed());const offers=await Promise.all([assistantPerks(db,'u',{}, {draw:()=>0}),assistantPerks(db,'u',{})]);assert.deepEqual(offers[0],offers[1]);assert.equal(offers[0].options.length,3);
 const choice={revision:offers[0].revision,perkId:offers[0].options[0].id};
 const results=await Promise.all([assistantPerks(db,'u',choice,{choose:true}),assistantPerks(db,'u',choice,{choose:true})]);assert.deepEqual(results.map(r=>r.duplicate),[false,true]);assert.equal(db.values.get('users/s').pendingPerks,1);assert.equal(db.values.get('users/s').perks.length,1);
 const next=await assistantPerks(db,'u',{});assert.equal(next.revision,2);assert.ok(next.options.every(p=>p.id!==choice.perkId));assert.equal((await assistantPerks(db,'u',choice,{choose:true})).duplicate,true);
 await assert.rejects(assistantPerks(db,'u',{...choice,perkId:offers[0].options[1].id},{choose:true}));
});
test('rejects fabricated perk values, unoffered choices and stale profile; no overspending',async()=>{
 const db=memoryDB(seed()),offer=await assistantPerks(db,'u',{});const missing=ASSISTANT_PERKS.find(p=>!offer.options.some(o=>o.id===p.id));
 await assert.rejects(assistantPerks(db,'u',{revision:offer.revision,perkId:missing.id},{choose:true}));
 await assert.rejects(assistantPerks(db,'u',{revision:offer.revision,perkId:offer.options[0].id,value:999},{choose:true}));
 const r=await Promise.allSettled(offer.options.map(p=>assistantPerks(db,'u',{revision:offer.revision,perkId:p.id},{choose:true})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);
 const next=await assistantPerks(db,'u',{});db.values.set('users/s',{...db.values.get('users/s'),pendingPerks:0});await assert.rejects(assistantPerks(db,'u',{revision:next.revision,perkId:next.options[0].id},{choose:true}));
});
test('requires verified binding/ownership/active assistant and valid pending points',async()=>{
 for(const [path,patch] of [['authAccounts/u',{active:false}],['authAccounts/u',{type:'COACH'}],['accountEntityOwners/users_s',{uid:'other'}],['users/s',{status:'BLOCKED'}],['users/s',{pendingPerks:-1}],['users/s',{perks:[{id:'forged'}]}],['serverConfig/matchAutomation',{enabled:false}]]){const s=seed();s[path]={...s[path],...patch};await assert.rejects(assistantPerks(memoryDB(s),'u',{}));}
});
test('all learned or zero pending returns no options without consuming points',async()=>{
 for(const patch of [{perks:ASSISTANT_PERKS},{pendingPerks:0}]){const s=seed();s['users/s']={...s['users/s'],...patch};const db=memoryDB(s);assert.deepEqual(await assistantPerks(db,'u',{}),{revision:null,options:[]});assert.deepEqual(db.values.get('users/s'),s['users/s']);}
});
