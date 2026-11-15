import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {readMatch,listMatches} from '../../server/match-view.js';
import {makeSnapshot,simulateMatch} from '../../src/simulation/engine.js';
const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE'];
function seed(){
 const players=['h','a'].flatMap(teamId=>roles.map((position,i)=>({id:teamId+i,name:'Atleta',teamId,position,overall:60,energy:100})));
 const snapshot=makeSnapshot({id:'h',name:'Casa'},{id:'a',name:'Fora'},players,42);
 const run={snapshot,status:'RUNNING',kind:'FRIENDLY',startedAt:1000,endsAt:2000,commands:[],createdBy:'secret-owner',lastWorkerError:'secret-error',lockIds:['secret-lock']};
 return memoryDB({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'matchRuns/game':run});
}
test('sporting projection keeps replay identical while excluding private and future fields',async()=>{
 const db=seed(),run=db.values.get('matchRuns/game');
 const before=simulateMatch(run.snapshot,{summaryOnly:true});
 run.snapshot.password='secret-snapshot';run.snapshot.home.email='secret-email';run.snapshot.home.lineup[0].password='secret-password';
 run.snapshot.home.lineup[0].attributes.secret='secret-attribute';
 const record=await readMatch(db,'viewer',{matchId:'game'});
 assert.equal(record.serverOwned,true);assert.equal(record.result,null);
 assert.equal(JSON.stringify(record).includes('secret-'),false);
 const after=simulateMatch(record.snapshot,{summaryOnly:true});
 for(const key of ['score','stats','ratings','possession','penaltyShootout'])assert.deepEqual(after[key],before[key]);
});
test('commands preserve simulation inputs but hide Firebase identity and receipt metadata',async()=>{
 const db=seed(),run=db.values.get('matchRuns/game');
 run.commands=[{id:'secret-uid_request',createdBy:'secret-uid',receivedAt:123,side:0,at:1,kind:'tactics',formation:'4-3-3 OFENSIVO',posture:'neutral'}];
 const record=await readMatch(db,'viewer',{matchId:'game'});
 assert.equal(JSON.stringify(record).includes('secret-'),false);
 assert.equal(record.commands[0].formation,run.commands[0].formation);
 assert.equal(record.commands[0].at,1);
 assert.equal(record.commands[0].id,(await readMatch(db,'viewer',{matchId:'game'})).commands[0].id);
});
test('result is confirmed only after finished marker, and never exposes audits or daily allowance',async()=>{
 const db=seed();db.values.set('matchResults/game',{kind:'FRIENDLY',score:[1,0],revision:1,finishedAt:2000,actor:'secret-admin',reason:'secret-reason',rows:{h0:{xp:3,energyApplied:5,dailyAllocation:3,stats:{goals:1,password:'secret-stats'}}}});
 assert.equal((await readMatch(db,'viewer',{matchId:'game'})).result,null);
 db.values.get('matchRuns/game').status='FINISHED';
 const result=(await readMatch(db,'viewer',{matchId:'game'})).result;
 assert.deepEqual(result.rows.h0,{xp:3,energyApplied:5,stats:{goals:1}});
 assert.equal(JSON.stringify(result).includes('secret-'),false);
});
test('recent list has fixed ten-match bound and omits rosters, seeds and commands',async()=>{
 const db=seed(),run=db.values.get('matchRuns/game');
 for(let i=1;i<=12;i++)db.values.set('matchRuns/g'+i,{...run,startedAt:1000+i});
 const {matches}=await listMatches(db,'viewer',{});
 assert.equal(matches.length,10);assert.equal(matches[0].id,'g12');
 assert.deepEqual(matches[0].snapshot.home,{id:'h',name:'Casa'});
 assert.equal(matches[0].commands,undefined);assert.equal(matches[0].snapshot.seed,undefined);
 await assert.rejects(listMatches(db,'viewer',{limit:1000}));
});
test('invalid subjects, extra fields, missing matches and disabled gate fail closed without writes',async()=>{
 const db=seed(),before=structuredClone([...db.values]);
 for(const [uid,input] of [[null,{matchId:'game'}],['v',{matchId:'../game'}],['v',{matchId:'game',uid:'admin'}],['v',{matchId:'missing'}]])await assert.rejects(readMatch(db,uid,input));
 assert.deepEqual([...db.values],before);
 db.values.get('serverConfig/matchAutomation').enabled=false;
 await assert.rejects(readMatch(db,'v',{matchId:'game'}));await assert.rejects(listMatches(db,'v',{}));
});
