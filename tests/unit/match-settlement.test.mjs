import test from 'node:test';import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {brazilDay,careerOf,energyCost,emptyStats,reportFromSimulation,rewardFor} from '../../src/matches/policy.js';
import {settleMatch} from '../../src/matches/settle.js';
const time=Date.parse('2026-10-25T15:00:00Z');
const row=(xp=80,goals=1,energy=25)=>({baseXP:xp,energy,stats:{...emptyStats(),appearances:1,seconds:5400,goals,ratingSum:8,ratingCount:1}});
const report=(r=row(),kind='FRIENDLY')=>({kind,score:[1,0],rows:{p:r}});
const seed=()=>memoryDB({'players/p':{energy:100,xp:10,pendingXP:0,stats:{goals:7}}});
const args=(id,r=report())=>({matchId:id,report:r,finishedAt:time,seasonId:'s1'});
test('day boundary follows Brazil, not browser time zone',()=>{
 assert.equal(brazilDay(Date.parse('2026-10-25T02:59:59Z')),'2026-10-24');
 assert.equal(brazilDay(Date.parse('2026-10-25T03:00:00Z')),'2026-10-25');
});
test('same match concurrent completion grants once',async()=>{
 const db=seed();const results=await Promise.all([settleMatch(db,args('a')),settleMatch(db,args('a'))]);
 assert.ok(results.some(r=>r.duplicate));assert.equal(db.values.get('players/p').pendingXP,8);
 assert.equal(db.values.get('players/p').energy,75);assert.equal(db.values.get('players/p').career.legacy.goals,7);
});
test('daily allowance shared by all matches and persists after transfers; losses never refill',async()=>{
 const db=seed();await settleMatch(db,args('a'));await settleMatch(db,args('b'));
 db.values.get('players/p').teamId='new-team';await settleMatch(db,args('loss',report(row(-30))));await settleMatch(db,args('c'));
 assert.equal(db.values.get('players/p').pendingXP,7);assert.equal(db.values.get('friendlyDailyXP/p_2026-10-25').granted,10);
});
test('correction applies difference, preserves later records and requires revision',async()=>{
 const db=seed();await settleMatch(db,args('a',report(row(100), 'OFFICIAL')));await settleMatch(db,args('b',report(row(100), 'OFFICIAL')));
 await settleMatch(db,{...args('a',report(row(120,2), 'OFFICIAL')),reason:'Gol atribuído incorretamente',actor:'admin',expectedRevision:1});
 const p=db.values.get('players/p');assert.equal(p.pendingXP,220);assert.equal(p.career.official.goals,3);assert.equal(p.energy,50);
 await assert.rejects(settleMatch(db,{...args('a'),reason:'stale',expectedRevision:1}));
});
test('preview writes nothing and no-play reserves are excluded',async()=>{
 const db=seed();await settleMatch(db,args('test',report(row(),'TEST')));assert.equal(db.values.size,1);
 const match={people:[{id:'p',side:0,position:'ATA'},{id:'bench',side:0}],stats:[{seconds:60,goals:0,assists:0,tackles:0,saves:0,yellow:0,red:0},{seconds:0}],score:[0,0]};
 assert.deepEqual(Object.keys(reportFromSimulation(match,'OFFICIAL').rows),['p']);
});
test('fatigue proportional to time with keeper reduction, extra time and bounded resistance',()=>{
 assert.equal(energyCost({position:'ATA'},5400),25);assert.equal(energyCost({position:'GOL'},5400),12);
 assert.equal(energyCost({position:'ATA'},2700),12.5);assert.ok(energyCost({position:'ATA'},7200)>25);
 assert.equal(energyCost({position:'ATA'},0),0);
});
test('migration preserves only known legacy counts, and remains idempotent',()=>{
 const career=careerOf({stats:{goals:5}});assert.equal(career.legacy.goals,5);assert.equal(career.legacy.appearances,undefined);
 assert.deepEqual(careerOf({career}),career);assert.equal(rewardFor('FRIENDLY',80,9),1);
});
test('daily correction cannot recycle XP budget',async()=>{
 const db=seed();await settleMatch(db,args('a',report(row(100))));
 await settleMatch(db,{...args('a',report(row(10))),reason:'Correção',expectedRevision:1});
 await settleMatch(db,args('b',report(row(100))));
 assert.equal(db.values.get('players/p').pendingXP,1);assert.equal(db.values.get('friendlyDailyXP/p_2026-10-25').granted,10);
});
test('an absent player aborts the whole settlement',async()=>{
 const db=seed();const bad=report();bad.rows.missing=row();
 await assert.rejects(settleMatch(db,args('missing',bad)));
 assert.equal(db.values.size,1);assert.equal(db.values.get('players/p').energy,100);
});
test('two matches processed concurrently share one allowance',async()=>{
 const db=seed();await Promise.all([settleMatch(db,args('a')),settleMatch(db,args('b'))]);
 assert.equal(db.values.get('players/p').pendingXP,10);
});
test('correction refunds only fatigue actually deducted at the zero floor',async()=>{
 const db=seed();db.values.get('players/p').energy=5;
 await settleMatch(db,args('a'));
 assert.equal(db.values.get('players/p').energy,0);
 assert.equal(db.values.get('matchResults/a').rows.p.energyApplied,5);
 await settleMatch(db,{...args('a',report(row(80,1,0))),reason:'Participação corrigida',expectedRevision:1});
 assert.equal(db.values.get('players/p').energy,5);
 await settleMatch(db,{...args('a'),reason:'Participação restaurada',expectedRevision:2});
 await settleMatch(db,{...args('a',report(row(80,1,0))),reason:'Participação corrigida',expectedRevision:3});
 assert.equal(db.values.get('players/p').energy,5);
});
test('fatigue refund respects subsequent recovery and the maximum energy',async()=>{
 const db=seed();await settleMatch(db,args('a'));
 db.values.get('players/p').energy=95;
 await settleMatch(db,{...args('a',report(row(80,1,0))),reason:'Participação corrigida',expectedRevision:1});
 assert.equal(db.values.get('players/p').energy,100);
});
test('invalid financial-style numeric strings, nonfinite XP and malformed participation abort without writes',async()=>{
 const changes=[r=>r.rows.p.baseXP=NaN,r=>r.rows.p.energy=-1,r=>r.rows.p.stats.goals='2',r=>r.rows.p.stats.seconds=0,r=>r.rows.p.stats.ratingSum=11,r=>r.kind='UNKNOWN',r=>r.score=[-1,0]];
 for(const change of changes){const db=seed(),r=report();change(r);await assert.rejects(settleMatch(db,args('bad',r)));assert.equal(db.values.size,1);}
});
test('invalid aggregate IDs and empty correction reasons are rejected',async()=>{
 for(const patch of [{seasonId:'../s1'},{competitionId:'a/b'},{reason:' '},{expectedRevision:-1}]){
  const db=seed();await assert.rejects(settleMatch(db,{...args('bad'),...patch}));assert.equal(db.values.size,1);
 }
});
test('official score correction reverses the previous table contribution without another appearance',async()=>{
 const db=seed(),fixture={id:'f1',homeId:'h',awayId:'a'};
 db.values.set('matches/f1',{...fixture,runId:'game',competitionId:'cup',seasonId:'s1'});
 const options={...args('game',report(row(),'OFFICIAL')),competitionId:'cup',fixture};
 await settleMatch(db,options);
 assert.equal(db.values.get('competitionStandings/cup_s1_h').pts,3);
 const correction={...report(row(),'OFFICIAL'),score:[0,2]};
 await settleMatch(db,{...options,report:correction,reason:'Placar corrigido',expectedRevision:1});
 const home=db.values.get('competitionStandings/cup_s1_h'),away=db.values.get('competitionStandings/cup_s1_a');
 assert.deepEqual(home,{teamId:'h',seasonId:'s1',competitionId:'cup',played:1,pts:0,wins:0,draws:0,losses:1,gf:0,ga:2});
 assert.equal(away.pts,3);assert.equal(db.values.get('players/p').career.official.appearances,1);
 assert.equal(db.values.get('matches/f1').resultRevision,2);
});
test('missing official fixture aborts player rewards and ledger atomically',async()=>{
 const db=seed();await assert.rejects(settleMatch(db,{...args('game',report(row(),'OFFICIAL')),competitionId:'cup',fixture:{id:'gone',homeId:'h',awayId:'a'}}));
 assert.equal(db.values.size,1);
});
