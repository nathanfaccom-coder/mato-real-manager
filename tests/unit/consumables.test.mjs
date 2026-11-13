import test from 'node:test';
import assert from 'node:assert/strict';
import {consumeItem} from '../../server/consumables.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const now=Date.parse('2026-11-13T15:00:00Z');
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'PLAYER',entityId:'p',revision:1},'accountEntityOwners/players_p':{uid:'u',type:'PLAYER',entityId:'p'},'players/p':{status:'ACTIVE',teamId:'t',energy:80,xp:12},'teams/t':{status:'ACTIVE'},'sales/item':{buyerId:'p',cat:'CONSUMIVEL',power:'30'},'sales/foreign':{buyerId:'other',cat:'SAUDE',power:20}});
const input={requestId:'r',itemId:'item'};
test('consumption caps energy, deletes inventory and replays receipt without repeating effects',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([consumeItem(db,'u',input,{now}),consumeItem(db,'u',input,{now})]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(r[0].energyRecovered,20);assert.equal(db.values.get('players/p').energy,100);assert.equal(db.values.get('players/p').toxicity,1);assert.equal(db.values.get('players/p').xp,12);assert.equal(db.values.has('sales/item'),false);assert.ok(db.values.has('sales/foreign'));
 await assert.rejects(consumeItem(db,'u',{...input,itemId:'foreign'},{now}),/utilizado/);
});
test('third and fourth consumption retain exact sickness and vomiting probability boundaries',async()=>{
 for(const [toxicity,roll,outcome] of [[1,0,'SUCCESS'],[2,399999,'SICK'],[2,400000,'SUCCESS'],[3,949999,'VOMIT'],[3,950000,'SUCCESS']]){
  const s=seed();Object.assign(s['players/p'],{toxicity,lastToxicityDate:'2026-11-13'});const db=memoryDB(s);const r=await consumeItem(db,'u',input,{now,draw:()=>roll});assert.equal(r.outcome,outcome);assert.equal(r.toxicity,toxicity+1);
  const p=db.values.get('players/p');if(outcome==='SICK'){assert.equal(p.recoveryLeft,1);assert.equal(p.injury.type,'INTOXICACAO');assert.equal(p.energy,80);}else if(outcome==='VOMIT'){assert.equal(p.energy,0);assert.equal(p.mood,'😡');}else assert.equal(p.energy,100);
  const retry=await consumeItem(db,'u',input,{now,draw:()=>999999});assert.equal(retry.outcome,outcome);assert.equal(retry.duplicate,true);
 }
});
test('server Brazil day resets at midnight and recognizes legacy browser dates',async()=>{
 for(const [date,time,expected] of [['2026-11-12','2026-11-13T02:59:59Z','VOMIT'],['Thu Nov 12 2026','2026-11-13T02:59:59Z','VOMIT'],['2026-11-12','2026-11-13T03:00:00Z','SUCCESS'],['Fri Nov 13 2026','2026-11-13T03:00:00Z','VOMIT']]){
  const s=seed();Object.assign(s['players/p'],{toxicity:3,lastToxicityDate:date});const db=memoryDB(s);assert.equal((await consumeItem(db,'u',input,{now:Date.parse(time),draw:()=>0})).outcome,expected);
 }
});
test('consumption denies forged effects, foreign sales, locks, invalid states and intoxication without writes',async()=>{
 for(const body of [{...input,power:900},{...input,playerId:'other'},{...input,itemId:'foreign'},null])await assert.rejects(consumeItem(memoryDB(seed()),'u',body,{now}));
 for(const [path,patch] of [['serverConfig/matchAutomation',{enabled:false}],['authAccounts/u',{type:'COACH'}],['accountEntityOwners/players_p',{uid:'other'}],['players/p',{status:'PENDING'}],['players/p',{energy:101}],['players/p',{energy:100}],['players/p',{injury:{type:'INTOXICACAO'}}],['players/p',{toxicity:-1,lastToxicityDate:'2026-11-13'}],['teams/t',{status:'PENDING'}],['matchParticipantLocks/player_p',{runId:'m'}],['matchParticipantLocks/team_t',{runId:'m'}],['sales/item',{cat:'LUVAS'}],['sales/item',{power:'30bad'}],['sales/item',{power:-1}]]){
  const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(consumeItem(db,'u',input,{now}));assert.deepEqual([...db.values],before);
 }
});
test('different simultaneous requests cannot consume one item twice; free player retains access',async()=>{
 const s=seed();s['players/p'].teamId='FREE';const db=memoryDB(s);const r=await Promise.allSettled(['a','b'].map(requestId=>consumeItem(db,'u',{...input,requestId},{now})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('players/p').toxicity,1);
});
test('different items serialize the daily counter so the third use applies its risk',async()=>{
 const s=seed();Object.assign(s['players/p'],{toxicity:1,lastToxicityDate:'2026-11-13'});s['sales/item'].power=0;s['sales/second']={...s['sales/item']};const db=memoryDB(s);
 const r=await Promise.all(['item','second'].map(itemId=>consumeItem(db,'u',{itemId,requestId:itemId},{now,draw:()=>0})));
 assert.deepEqual(r.map(x=>x.outcome),['SUCCESS','SICK']);assert.equal(db.values.get('players/p').toxicity,3);assert.equal(db.values.get('players/p').recoveryLeft,1);assert.equal(db.values.has('sales/item'),false);assert.equal(db.values.has('sales/second'),false);
});
