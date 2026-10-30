import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {submitMatchCommand} from '../../server/match-commands.js';
function fixture(){return memoryDB({
 'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},
 'authAccounts/u':{active:true,type:'TEAM',entityId:'h',revision:1},
 'accountEntityOwners/teams_h':{uid:'u',type:'TEAM',entityId:'h'},
 'teams/h':{status:'ACTIVE'},
 'matchRuns/m':{status:'RUNNING',startedAt:1000,preMatchMs:28000,endsAt:2000000,commands:[],snapshot:{addedTime:[0,0],home:{id:'h',lineup:[{id:'h1'}],bench:[{id:'h2'}]},away:{id:'a',lineup:[{id:'a1'}],bench:[]}}}
});}
const input={matchId:'m',requestId:'one',kind:'tactics',formation:'4-3-3 OFENSIVO',posture:'offensive'};
test('command identity, side and tick are assigned by server; retry is idempotent',async()=>{
 const db=fixture(),r=await submitMatchCommand(db,'u',input,{now:30000});
 assert.equal(r.at,4);const command=db.values.get('matchRuns/m').commands[0];
 assert.equal(command.side,0);assert.equal(command.createdBy,'u');
 assert.equal((await submitMatchCommand(db,'u',input,{now:40000})).duplicate,true);
 assert.equal(db.values.get('matchRuns/m').commands.length,1);
 await assert.rejects(submitMatchCommand(db,'u',{...input,posture:'defensive'},{now:40000}),/outro comando/);
});
test('client cannot forge controller, side, past timestamp or XP',async()=>{
 for(const extra of [{uid:'other'},{side:1},{at:0},{receivedAt:0},{xp:1000}])await assert.rejects(submitMatchCommand(fixture(),'u',{...input,...extra},{now:30000}));
});
test('unauthenticated, press, inactive and unrelated club accounts are denied',async()=>{
 for(const account of [null,{active:true,type:'PRESS',entityId:'h'},{active:false,type:'TEAM',entityId:'h'},{active:true,type:'TEAM',entityId:'other'}]){
  const db=fixture();db.values.set('authAccounts/u',account);db.values.set('teams/other',{status:'ACTIVE'});
  await assert.rejects(submitMatchCommand(db,'u',input,{now:30000}));
  assert.equal(db.values.get('matchRuns/m').commands.length,0);
 }
 await assert.rejects(submitMatchCommand(fixture(),null,input,{now:30000}));
});
test('coach authorization follows current employment, not client claims',async()=>{
 const db=fixture();db.values.set('accountEntityOwners/users_c',{uid:'u',type:'COACH',entityId:'c'});db.values.set('authAccounts/u',{active:true,type:'COACH',entityId:'c',revision:1});db.values.set('users/c',{status:'ACTIVE',type:'COACH',teamId:'h'});
 await submitMatchCommand(db,'u',input,{now:30000});
 db.values.set('users/c',{status:'ACTIVE',type:'COACH',teamId:'other'});
 await assert.rejects(submitMatchCommand(db,'u',{...input,requestId:'two'},{now:40000}),/não controla/);
});
test('pre-match, full-time, disabled gate, excessive and rapid commands are rejected',async()=>{
 for(const now of [29000-1,1845000,2000000])await assert.rejects(submitMatchCommand(fixture(),'u',input,{now}));
 const db=fixture();await submitMatchCommand(db,'u',input,{now:30000});
 await assert.rejects(submitMatchCommand(db,'u',{...input,requestId:'two'},{now:30500}),/Aguarde/);
 db.values.delete('serverConfig/matchAutomation');await assert.rejects(submitMatchCommand(db,'u',input,{now:40000}),/não liberada/);
 const capped=fixture();capped.values.get('matchRuns/m').commands=Array.from({length:120},(_,i)=>({id:String(i)}));
 await assert.rejects(submitMatchCommand(capped,'u',input,{now:40000}),/Limite/);
});
test('substitution rejects opponents, duplicated players and extra fields',async()=>{
 for(const changes of [[{outId:'h1',inId:'a1'}],[{outId:'h1',inId:'h2'},{outId:'h1',inId:'h2'}],[{outId:'h1',inId:'h2',at:0}]])await assert.rejects(submitMatchCommand(fixture(),'u',{matchId:'m',requestId:'sub',kind:'substitutions',changes},{now:30000}));
 const db=fixture();await submitMatchCommand(db,'u',{matchId:'m',requestId:'sub',kind:'substitutions',changes:[{outId:'h1',inId:'h2'}]},{now:30000});
 assert.equal(db.values.get('matchRuns/m').commands.length,1);
});

test('commands require boolean active, revision and matching server-owned identity lock',async()=>{
 for(const mutate of [db=>db.values.get('authAccounts/u').active='true',db=>delete db.values.get('authAccounts/u').revision,db=>db.values.delete('accountEntityOwners/teams_h'),db=>db.values.get('accountEntityOwners/teams_h').uid='other']){
  const db=fixture();mutate(db);await assert.rejects(submitMatchCommand(db,'u',input,{now:30000}));assert.equal(db.values.get('matchRuns/m').commands.length,0);
 }
});
