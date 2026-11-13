import test from 'node:test';
import assert from 'node:assert/strict';
import {trainCoach} from '../../server/coach-training.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'COACH',entityId:'c',revision:1},'accountEntityOwners/users_c':{uid:'u',type:'COACH',entityId:'c'},'users/c':{status:'ACTIVE',type:'COACH',teamId:'t',energy:100,xp:1180,level:9,affinities:['ATA'],perks:[{id:'FITNESS_EXPERT',value:0},{id:'HARD_WORKER',value:9999}]},'teams/t':{status:'ACTIVE',ctLevel:3},'players/p':{teamId:'t',status:'ACTIVE',position:'ATA',energy:100,xp:0,attributes:{shot:99},equippedItem:{id:'item',power:50},learningPosition:{target:'ATA',current:90,required:100}},'sales/item':{buyerId:'other'}});
const input={requestId:'r',type:'CHUTE',playerIds:['p']};
// No injury/critical/growth; lowest base XP and study XP.
const draw=(min,max)=>max===1000000?999999:min;
test('coach training derives catalog perks, CT, affinity and equipment; learns position and levels once',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([trainCoach(db,'u',input,{draw}),trainCoach(db,'u',input,{draw})]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(r[0].rows[0].xp,32);assert.equal(r[0].rows[0].learned,'ATA');const p=db.values.get('players/p');assert.equal(p.energy,80);assert.equal(p.xp,32);assert.equal(p.attributes.shot,99);assert.equal(p.equippedItem,undefined);assert.equal(p.learningPosition,undefined);assert.deepEqual(p.pendingPosBoosts,['ATA']);assert.equal(db.values.get('sales/item').buyerId,'other');const c=db.values.get('users/c');assert.equal(c.level,10);assert.equal(c.xp,120);assert.equal(c.pendingPerks,1);assert.equal(c.pendingAffinity,1);assert.equal(c.energy,80);
});
test('study works for free coach, costs 30 and gains 15-24 XP, forbids player selection',async()=>{
 const s=seed();s['users/c'].teamId='FREE';const db=memoryDB(s);const r=await trainCoach(db,'u',{requestId:'s',type:'STUDY',playerIds:[]},{draw});assert.equal(r.coachXP,15);assert.equal(db.values.get('users/c').energy,70);await assert.rejects(trainCoach(db,'u',{...input,type:'STUDY'},{draw}));
});
test('injury consumes 15 player energy, retains equipment and grants no coach reward for that player',async()=>{
 const db=memoryDB(seed());const r=await trainCoach(db,'u',input,{draw:min=>min});assert.equal(r.rows[0].injured,true);assert.equal(r.coachXP,0);const p=db.values.get('players/p');assert.equal(p.energy,85);assert.equal(p.recoveryLeft,1);assert.ok(p.equippedItem);assert.equal(p.xp,0);
});
test('invalid subjects, locks, forged rewards and malformed selection reject without writes',async()=>{
 for(const body of [{...input,xp:900},{...input,playerIds:['p','p']},{...input,type:'__proto__'},{...input,playerIds:[]}])await assert.rejects(trainCoach(memoryDB(seed()),'u',body,{draw}));
 for(const [path,patch] of [['authAccounts/u',{type:'PLAYER'}],['accountEntityOwners/users_c',{uid:'other'}],['users/c',{energy:19}],['players/p',{teamId:'other'}],['matchParticipantLocks/player_p',{runId:'m'}],['matchParticipantLocks/team_t',{runId:'m'}],['players/p',{learningPosition:{target:'bad'}}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(trainCoach(db,'u',input,{draw}));assert.deepEqual([...db.values],before);}
});
test('skips injured/exhausted players and competing requests cannot overspend coach energy',async()=>{
 const s=seed();s['users/c'].energy=20;s['players/p'].recoveryLeft=1;const db=memoryDB(s);const r=await Promise.allSettled(['a','b'].map(requestId=>trainCoach(db,'u',{...input,requestId},{draw})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(r.find(x=>x.status==='fulfilled').value.rows[0].skipped,true);assert.equal(db.values.get('players/p').energy,100);assert.equal(db.values.get('users/c').energy,0);
});
test('synergy, youth and critical bonuses multiply in legacy order; growth caps at 99',async()=>{
 const s=seed();Object.assign(s['users/c'],{affinities:[],perks:[{id:'SNIPER_COACH'},{id:'YOUTH_MENTOR'}]});s['teams/t'].ctLevel=1;delete s['players/p'].equippedItem;s['players/p'].age=21;s['players/p'].attributes={shot:98,shotPower:99};let n=0;
 const db=memoryDB(s);const r=await trainCoach(db,'u',input,{draw:(min,max)=>max===1000000?(n++===0?999999:0):min});assert.equal(r.rows[0].xp,48);assert.equal(r.rows[0].critical,true);assert.equal(db.values.get('players/p').attributes.shot,99);assert.equal(db.values.get('players/p').attributes.shotPower,99);
});
test('partial position learning progresses only with matching training; request cannot change focus',async()=>{
 const s=seed();s['players/p'].learningPosition.current=0;const db=memoryDB(s);await trainCoach(db,'u',input,{draw});assert.equal(db.values.get('players/p').learningPosition.current,21);
 await assert.rejects(trainCoach(db,'u',{...input,type:'PASSE'},{draw}),/utilizado/);
 await trainCoach(db,'u',{...input,requestId:'next',type:'PASSE'},{draw});assert.equal(db.values.get('players/p').learningPosition.current,21);
});
