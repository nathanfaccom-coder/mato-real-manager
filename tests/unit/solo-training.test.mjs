import test from 'node:test';
import assert from 'node:assert/strict';
import {trainSolo} from '../../server/solo-training.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'PLAYER',entityId:'p',revision:1},'accountEntityOwners/players_p':{uid:'u',type:'PLAYER',entityId:'p'},'players/p':{status:'ACTIVE',teamId:'t',position:'ATA',energy:70,xp:10,attributes:{shot:99,shotPower:60,shotTech:60,weakFootAcc:60},equippedItem:{id:'item',power:50}},'teams/t':{status:'ACTIVE'},'sales/item':{buyerId:'other'}});
const input={requestId:'r',type:'CHUTE'};
function draw(){let count=0;return (min)=>count++===0?999999:min;}
test('solo training derives XP and attributes, caps growth and consumes equipped snapshot once',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([trainSolo(db,'u',input,{draw:draw()}),trainSolo(db,'u',input,{draw:draw()})]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(r[0].xp,12);assert.equal(r[0].equipmentBonus,4);const p=db.values.get('players/p');assert.equal(p.energy,35);assert.equal(p.xp,22);assert.equal(p.attributes.shot,99);assert.equal(p.attributes.shotPower,61);assert.equal(p.equippedItem,undefined);assert.deepEqual(db.values.get('sales/item'),{buyerId:'other'});assert.equal(db.values.get('teams/t').trainingLogs.length,1);
 await assert.rejects(trainSolo(db,'u',{...input,type:'PASSE'}));
});
test('injury consumes 20 energy without granting XP, consuming equipment or adding training log',async()=>{
 const db=memoryDB(seed());const r=await trainSolo(db,'u',input,{draw:min=>min});assert.equal(r.injured,true);const p=db.values.get('players/p');assert.equal(p.energy,50);assert.equal(p.xp,10);assert.equal(p.recoveryLeft,1);assert.ok(p.equippedItem);assert.equal(db.values.get('teams/t').trainingLogs,undefined);
});
test('forged type, rewards, role, ownership, locks, injury and foreign item power are rejected',async()=>{
 for(const body of [{...input,type:'__proto__'},{...input,xp:900},{...input,playerId:'other'}])await assert.rejects(trainSolo(memoryDB(seed()),'u',body));
 for(const [path,patch] of [['authAccounts/u',{active:false}],['authAccounts/u',{type:'COACH'}],['accountEntityOwners/players_p',{uid:'other'}],['players/p',{energy:34}],['players/p',{recoveryLeft:1}],['players/p',{equippedItem:{id:'item',power:-1}}],['matchParticipantLocks/player_p',{runId:'m'}],['matchParticipantLocks/team_t',{runId:'m'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=[...db.values];await assert.rejects(trainSolo(db,'u',input,{draw:draw()}));assert.deepEqual([...db.values],before);}
});
test('free player can train; competing requests cannot overspend energy',async()=>{
 const s=seed();s['players/p'].teamId='FREE';s['players/p'].energy=35;const db=memoryDB(s);const r=await Promise.allSettled(['a','b'].map(requestId=>trainSolo(db,'u',{...input,requestId},{draw:draw()})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('players/p').energy,0);
});
