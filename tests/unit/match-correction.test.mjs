import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {correctMatch,reviewCorrection} from '../../server/match-correction.js';
import {settleMatch} from '../../src/matches/settle.js';
import {emptyStats,matchXP} from '../../src/matches/policy.js';
import {OWNER_UID} from '../../src/admin/permissions.js';
const time=Date.parse('2026-10-29T15:00:00Z');
const stats=()=>({...emptyStats(),appearances:1,seconds:5400,ratingSum:6,ratingCount:1});
const facts=()=>({goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,rating:6});
const input=()=>({matchId:'m',expectedRevision:1,reason:'Gol conferido pelo ADM',score:[1,0],ownGoals:[0,0],players:{h:{...facts(),goals:1},a:facts()}});
async function seed(kind='OFFICIAL'){
 const fixture=kind==='OFFICIAL'?{id:'f',homeId:'home',awayId:'away'}:null;
 const competitionId=fixture?'cup':null;
 const db=memoryDB({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'config/system':{season:1},'players/h':{energy:100},'players/a':{energy:100},
  'matchRuns/m':{status:'FINISHED',kind,seasonId:'season_1',competitionId,score:[0,0]},
  ...(fixture?{'matches/f':{...fixture,runId:'m',competitionId,seasonId:'season_1'}}:{})});
 const rows=Object.fromEntries(['h','a'].map((id,side)=>[id,{side,stats:stats(),baseXP:matchXP(stats(),'DRAW'),energy:25}]));
 await settleMatch(db,{matchId:'m',report:{policyVersion:1,kind,score:[0,0],rows},finishedAt:time,seasonId:'season_1',competitionId,fixture});
 return db;
}
test('ADM correction atomically revises career, XP, table, run and audit without another match or fatigue',async()=>{
 const db=await seed();const r=await correctMatch(db,OWNER_UID,input(),{now:time+1000});assert.equal(r.revision,2);
 const p=db.values.get('players/h');assert.equal(p.career.official.goals,1);assert.equal(p.career.official.appearances,1);assert.equal(p.energy,75);assert.equal(p.pendingXP,80);
 assert.equal(db.values.get('competitionStandings/cup_season_1_home').pts,3);assert.equal(db.values.get('competitionStandings/cup_season_1_home').played,1);
 assert.deepEqual(db.values.get('matchRuns/m').score,[1,0]);assert.equal(db.values.get('matchResults/m').finishedAt,time);
 const audit=db.values.get('matchResultAudit/m_2');assert.equal(audit.actor,OWNER_UID);assert.equal(audit.changedAt,time+1000);assert.equal(audit.reason,input().reason);
});
test('ordinary users, press and inactive or malformed administrator permissions cannot correct',async()=>{
 for(const profile of [null,{active:false,permissions:['competitions']},{active:'true',permissions:['competitions']},{active:true,permissions:'competitions'},{active:true,permissions:['press']}]){
  const db=await seed();if(profile)db.values.set('adminProfiles/u',profile);const before=structuredClone([...db.values]);
  await assert.rejects(correctMatch(db,'u',input()));assert.deepEqual([...db.values],before);
 }
 const db=await seed();db.values.set('adminProfiles/u',{active:true,permissions:['competitions']});assert.equal((await correctMatch(db,'u',input())).revision,2);
});
test('concurrent corrections with same revision apply only once',async()=>{
 const db=await seed();const results=await Promise.allSettled([correctMatch(db,OWNER_UID,input()),correctMatch(db,OWNER_UID,input())]);
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(db.values.get('players/h').pendingXP,80);assert.equal(db.values.get('matchResults/m').revision,2);
});
test('malformed stats, client XP, minutes, participants and inconsistent score fail without writes',async()=>{
 const changes=[i=>i.uid=OWNER_UID,i=>i.kind='FRIENDLY',i=>i.expectedRevision=0,i=>i.reason=' ',i=>i.players.h.baseXP=9999,i=>i.players.h.seconds=9999,i=>delete i.players.a,i=>i.players.fake=facts(),i=>i.players.h.rating=NaN,i=>i.players.h.rating=6.55,i=>i.players.h.goals='1',i=>i.players.h.yellows=2,i=>i.players.a.assists=1,i=>i.score=[2,0],i=>i.ownGoals=[-1,0]];
 for(const change of changes){const db=await seed(),data=input();change(data);const before=structuredClone([...db.values]);await assert.rejects(correctMatch(db,OWNER_UID,data));assert.deepEqual([...db.values],before);}
});
test('own goals balance scoreboard without inventing player goals and friendly corrections respect daily cap',async()=>{
 const db=await seed('FRIENDLY'),data=input();data.players.h.goals=0;data.ownGoals=[1,0];await correctMatch(db,OWNER_UID,data);
 assert.equal(db.values.get('players/h').career.friendly.goals,0);assert.equal(db.values.get('players/h').pendingXP,6);
 data.expectedRevision=2;data.players.h.goals=10;data.score=[10,0];data.ownGoals=[0,0];await correctMatch(db,OWNER_UID,data);
 assert.equal(db.values.get('players/h').pendingXP,10);assert.equal(db.values.get('friendlyDailyXP/h_2026-10-29').granted,10);
});
test('disabled gate, unfinished match and season rollover reject corrections atomically',async()=>{
 for(const [path,patch] of [['serverConfig/matchAutomation',{enabled:false}],['matchRuns/m',{status:'RUNNING'}],['config/system',{season:2}],['matchRuns/m',{kind:'FRIENDLY'}]]){
  const db=await seed();Object.assign(db.values.get(path),patch);const before=structuredClone([...db.values]);await assert.rejects(correctMatch(db,OWNER_UID,input()));assert.deepEqual([...db.values],before);
 }
});

test('correction review is administrator-only, sanitized, read-only and blocks closed seasons',async()=>{
 const db=await seed();db.values.get('matchRuns/m').snapshot={home:{name:'Casa',password:'private',lineup:[{id:'h',name:'Atleta'}]},away:{name:'Fora',lineup:[{id:'a',name:'Visitante'}]}};
 db.values.get('matchResults/m').reason='private reason';
 const before=structuredClone([...db.values]);
 await assert.rejects(reviewCorrection(db,'press',{matchId:'m'}));
 const review=await reviewCorrection(db,OWNER_UID,{matchId:'m'});
 assert.equal(review.canCorrect,true);assert.equal(review.players.h.name,'Atleta');assert.deepEqual(review.ownGoals,[0,0]);assert.equal(review.expectedRevision,1);
 assert.equal(JSON.stringify(review).includes('private'),false);assert.equal(review.players.h.baseXP,undefined);assert.deepEqual([...db.values],before);
 db.values.get('config/system').season=2;assert.equal((await reviewCorrection(db,OWNER_UID,{matchId:'m'})).canCorrect,false);
 await assert.rejects(reviewCorrection(db,OWNER_UID,{matchId:'m',uid:OWNER_UID}));
});
