import test from 'node:test';
import assert from 'node:assert/strict';
import {equipItem} from '../../server/equipment.js';
import {trainSolo} from '../../server/solo-training.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'PLAYER',entityId:'p',revision:1},'accountEntityOwners/players_p':{uid:'u',type:'PLAYER',entityId:'p'},'players/p':{status:'ACTIVE',teamId:'t',energy:100,xp:0,equippedItem:{id:'old',power:10}},'teams/t':{status:'ACTIVE'},'sales/item':{buyerId:'p',productName:'Chuteira',cat:'CHUTEIRA',power:'50',img:'image'},'sales/other':{buyerId:'other',productName:'Luvas',cat:'LUVAS',power:20}});
const input={requestId:'r',itemId:'item'};
test('equip moves canonical inventory once; replay after training never restores consumed equipment',async()=>{
 const db=memoryDB(seed());const results=await Promise.all([equipItem(db,'u',input),equipItem(db,'u',input)]);
 assert.deepEqual(results.map(r=>r.duplicate),[false,true]);assert.equal(db.values.has('sales/item'),false);
 assert.deepEqual(db.values.get('players/p').equippedItem,{id:'item',name:'Chuteira',cat:'CHUTEIRA',power:50,img:'image'});
 let n=0;const training=await trainSolo(db,'u',{requestId:'training',type:'CHUTE'},{draw:min=>n++===0?999999:min});assert.equal(training.equipmentBonus,4);
 assert.equal(db.values.get('players/p').equippedItem,undefined);
 assert.equal((await equipItem(db,'u',input)).duplicate,true);assert.equal(db.values.get('players/p').equippedItem,undefined);
 assert.equal(db.values.get('sales/other').buyerId,'other');
 await assert.rejects(equipItem(db,'u',{...input,itemId:'other'}),/utilizado/);
});
test('competing equip requests can only move the same inventory item once',async()=>{
 const db=memoryDB(seed());const r=await Promise.allSettled(['a','b'].map(requestId=>equipItem(db,'u',{...input,requestId})));
 assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal([...db.values.keys()].filter(k=>k.startsWith('serverConfig/equip_')).length,1);
});
test('equip rejects forged payload, foreign inventory, invalid binding, locks and malformed powers without writes',async()=>{
 for(const body of [{...input,power:900},{...input,playerId:'other'},{...input,itemId:'other'},null])await assert.rejects(equipItem(memoryDB(seed()),'u',body));
 const cases=[['serverConfig/matchAutomation',{enabled:false}],['authAccounts/u',{type:'COACH'}],['authAccounts/u',{active:false}],['accountEntityOwners/players_p',{uid:'other'}],['players/p',{status:'PENDING'}],['teams/t',{status:'PENDING'}],['matchParticipantLocks/player_p',{runId:'m'}],['matchParticipantLocks/team_t',{runId:'m'}],['sales/item',{buyerId:'other'}],['sales/item',{cat:'ENERGETICO'}],...[-1,1.5,Infinity,'50fake','',{},Number.MAX_SAFE_INTEGER+1].map(power=>['sales/item',{power}])];
 for(const [path,patch] of cases){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(equipItem(db,'u',input));assert.deepEqual([...db.values],before);}
});
test('free players can equip gloves without an image or bonus',async()=>{
 const s=seed();s['players/p'].teamId='FREE';s['sales/item']={buyerId:'p',cat:'LUVAS',productName:'Luvas'};const db=memoryDB(s);await equipItem(db,'u',input);assert.deepEqual(db.values.get('players/p').equippedItem,{id:'item',name:'Luvas',cat:'LUVAS',power:0});
});
