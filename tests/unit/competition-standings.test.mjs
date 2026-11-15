import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {readCompetitionStandings} from '../../server/competition-standings.js';
import {settleMatch} from '../../src/matches/settle.js';
import {competitionLinks} from '../../src/matches/competition-links.js';
const input={competitionId:'cup',seasonId:'season_1'};
function seed(){return memoryDB({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'competitions/cup':{name:'Copa',seasonId:'season_1',teamIds:['h','a','b']},'teams/h':{name:'Casa',password:'secret',stats:{pts:999}},'teams/a':{name:'Fora'},'teams/b':{name:'Sem jogo'},'matches/f':{runId:'m',homeId:'h',awayId:'a',...input}});}
const options={matchId:'m',finishedAt:1000,...input,fixture:{id:'f',homeId:'h',awayId:'a'},report:{kind:'OFFICIAL',score:[2,0],rows:{}}};
test('official completion and correction update displayed standings once, without using legacy totals',async()=>{
 const db=seed();await settleMatch(db,options);await settleMatch(db,options);
 let table=await readCompetitionStandings(db,'viewer',input);
 assert.equal(table.rows[0].teamId,'h');assert.equal(table.rows[0].pts,3);assert.equal(table.rows[0].played,1);assert.equal(table.rows.find(r=>r.teamId==='b').played,0);assert.equal(JSON.stringify(table).includes('secret'),false);
 await settleMatch(db,{...options,report:{...options.report,score:[0,2]},reason:'Placar conferido',expectedRevision:1});
 table=await readCompetitionStandings(db,'viewer',input);assert.equal(table.rows[0].teamId,'a');assert.equal(table.rows.find(r=>r.teamId==='h').pts,0);assert.equal(table.rows.find(r=>r.teamId==='h').played,1);
});
test('standings isolate seasons and competitions; ties share rank',async()=>{
 const db=seed();await settleMatch(db,{...options,report:{...options.report,score:[0,0]}});
 db.values.set('competitionStandings/other_season_1_h',{competitionId:'other',seasonId:'season_1',teamId:'h',pts:999});
 db.values.set('competitionStandings/cup_season_2_h',{competitionId:'cup',seasonId:'season_2',teamId:'h',pts:999});
 const before=structuredClone([...db.values]),table=await readCompetitionStandings(db,'viewer',input);
 assert.equal(table.rows[0].position,1);assert.equal(table.rows[1].position,1);assert.equal(table.rows[2].position,3);assert.deepEqual([...db.values],before);
});
test('invalid identity, client filters, disabled gate and inconsistent counters fail closed',async()=>{
 const db=seed();await assert.rejects(readCompetitionStandings(db,null,input));
 for(const patch of [{seasonId:'season_2'},{competitionId:'../bad'},{limit:999},{uid:'admin'}])await assert.rejects(readCompetitionStandings(db,'viewer',{...input,...patch}));
 await settleMatch(db,options);db.values.get('competitionStandings/cup_season_1_h').pts=999;
 await assert.rejects(readCompetitionStandings(db,'viewer',input),/inconsistente/);
 db.values.get('serverConfig/matchAutomation').enabled=false;await assert.rejects(readCompetitionStandings(db,'viewer',input));
});
test('bounded competition never silently truncates the table',async()=>{
 const db=seed();db.values.get('competitions/cup').teamIds=Array.from({length:65},(_,i)=>'t'+i);
 await assert.rejects(readCompetitionStandings(db,'viewer',input));
});
test('league selectors exclude state fixtures and never mix states or invent competition IDs',()=>{
 const matches=[{competitionId:'league',seasonId:'s1',serie:'A'},{competitionId:'stateGO',seasonId:'s1',isEstadual:true,estado:'GO'},{competitionId:'stateSP',seasonId:'s1',isEstadual:true,estado:'SP'},{serie:'A'},{competitionId:'league',seasonId:'s1',serie:'A'}];
 assert.deepEqual(competitionLinks(matches,'A').map(([id])=>id),['league/s1']);
 assert.deepEqual(competitionLinks(matches,'ESTADUAL','GO').map(([id])=>id),['stateGO/s1']);
 assert.deepEqual(competitionLinks(matches,'B'),[]);
});
