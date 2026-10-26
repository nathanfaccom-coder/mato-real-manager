import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {startMatch} from '../../server/match-service.js';
import {OWNER_UID} from '../../src/admin/permissions.js';
import {finalizeDueMatch} from '../../server/match-worker.js';
const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE'];
function seed(){
 const data={'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'config/system':{season:1},'teams/h':{name:'Casa',status:'ACTIVE'},'teams/a':{name:'Fora',status:'ACTIVE'}};
 for(const t of ['h','a'])roles.forEach((position,i)=>data[`players/${t}${i}`]={teamId:t,name:`P${i}`,position,overall:60,energy:100});
 return memoryDB(data);
}
const input={requestId:'one',homeId:'h',awayId:'a'};
test('server creates friendly snapshots, seed and exclusive locks with retry idempotency',async()=>{
 const db=seed(),now=100000;
 const result=await startMatch(db,OWNER_UID,input,{now,seed:42});
 const run=db.values.get(`matchRuns/${result.matchId}`);
 assert.equal(run.kind,'FRIENDLY');assert.equal(run.snapshot.seed,42);assert.equal(run.startedAt,now);
 assert.equal(run.participantIds.length,22);assert.ok(run.endsAt>now+1800000);
 assert.equal(db.values.get('matchParticipantLocks/player_h0').matchId,result.matchId);
 assert.equal((await startMatch(db,OWNER_UID,input,{now:200000,seed:1})).duplicate,true);
 await assert.rejects(startMatch(db,OWNER_UID,{...input,requestId:'two'}),/outra partida/);
});
test('press, anonymous users and inactive subadmins cannot create games',async()=>{
 for(const uid of [null,'press','inactive','wrongPermission']){
  const db=seed();db.values.set('adminProfiles/inactive',{active:false,permissions:['competitions']});db.values.set('adminProfiles/wrongPermission',{active:true,permissions:['press']});
  await assert.rejects(startMatch(db,uid,input));assert.equal([...db.values.keys()].filter(k=>k.startsWith('matchRuns/')).length,0);
 }
 const db=seed();db.values.set('adminProfiles/sub',{active:true,permissions:['competitions']});
 assert.ok((await startMatch(db,'sub',input)).matchId);
});
test('automatic pipeline is disabled until trusted server configuration enables it',async()=>{
 const db=seed();db.values.delete('serverConfig/matchAutomation');
 await assert.rejects(startMatch(db,OWNER_UID,input),/não liberada/);
});
test('clients cannot supply classification, XP, seed or snapshots',async()=>{
 for(const extra of [{kind:'OFFICIAL'},{snapshot:{}},{seed:99},{baseXP:9999},{uid:OWNER_UID}]){
  await assert.rejects(startMatch(seed(),OWNER_UID,{...input,...extra}),/inválido/);
 }
});
test('official status requires an approved fixture and active competition of current season',async()=>{
 const db=seed();const fixture={homeId:'h',awayId:'a',status:'PENDING',played:false,competitionId:'leagueA',seasonId:'season_1'};
 db.values.set('matches/f1',fixture);db.values.set('competitions/leagueA',{active:true,seasonId:'season_1'});
 const request={requestId:'start',fixtureId:'f1'};
 await assert.rejects(startMatch(db,OWNER_UID,request),/validado/);
 fixture.serverVerified=true;db.values.set('matches/f1',fixture);
 const result=await startMatch(db,OWNER_UID,request,{now:1000,seed:5});
 assert.equal(result.matchId,'official_f1');assert.equal(db.values.get('matchRuns/official_f1').kind,'OFFICIAL');
 assert.equal(db.values.get('matches/f1').status,'RUNNING');
 assert.equal((await startMatch(db,OWNER_UID,{...request,requestId:'retry'})).duplicate,true);
});
test('same idempotency key cannot be reused for another pairing',async()=>{
 const db=seed();await startMatch(db,OWNER_UID,input);
 await assert.rejects(startMatch(db,OWNER_UID,{...input,homeId:'a',awayId:'h'}),/outra partida/);
});
test('start-to-finish official game settles fixture and standings and releases locks once',async()=>{
 const db=seed();
 db.values.set('matches/f1',{homeId:'h',awayId:'a',status:'PENDING',played:false,serverVerified:true,competitionId:'leagueA',seasonId:'season_1'});
 db.values.set('competitions/leagueA',{active:true,seasonId:'season_1'});
 const {matchId}=await startMatch(db,OWNER_UID,{requestId:'one',fixtureId:'f1'},{now:1000,seed:5});
 await finalizeDueMatch(db,matchId,db.values.get(`matchRuns/${matchId}`).endsAt);
 const result=db.values.get(`matchResults/${matchId}`),fixture=db.values.get('matches/f1');
 assert.equal(fixture.status,'FINISHED');assert.equal(fixture.scoreHome,result.score[0]);
 const table=db.values.get('competitionStandings/leagueA_season_1_h');
 assert.equal(table.played,1);assert.equal(table.gf,result.score[0]);assert.equal(table.ga,result.score[1]);
 assert.equal([...db.values.keys()].filter(k=>k.startsWith('matchParticipantLocks/')).length,0);
 assert.ok((await startMatch(db,OWNER_UID,{...input,requestId:'next'})).matchId);
 await finalizeDueMatch(db,matchId,Date.now());
 assert.deepEqual(db.values.get('competitionStandings/leagueA_season_1_h'),table);
});
