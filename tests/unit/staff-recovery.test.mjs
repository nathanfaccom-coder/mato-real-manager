import test from 'node:test';
import assert from 'node:assert/strict';
import {recoverPlayers} from '../../server/staff-recovery.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({
 'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},
 'authAccounts/u':{active:true,type:'ASSISTANT',entityId:'s',revision:1},
 'accountEntityOwners/users_s':{uid:'u',type:'ASSISTANT',entityId:'s'},
 'users/s':{status:'ACTIVE',type:'ASSISTANT',teamId:'t',energy:20,xp:190,level:2,perks:[]},
 'teams/t':{status:'ACTIVE',trainingLogs:[]},
 'players/p':{teamId:'t',name:'Jogador',energy:90,xp:10},
 'players/q':{teamId:'t',name:'Lesionado',energy:30,xp:20,recoveryLeft:2}
});
const input={requestId:'r',playerIds:['p','q']};
const options={now:123,draw:(min)=>min};
test('recovery derives perks, capped energy, XP and career level atomically; skips injured',async()=>{
 const s=seed();s['users/s'].perks=['COFFEE_LOVER','ICE_BATH','LIGHT_WORK','GOOD_VIBES'].map(id=>({id}));
 const db=memoryDB(s),r=await recoverPlayers(db,'u',input,options);
 assert.equal(r.cost,10);assert.equal(r.level,3);assert.deepEqual(r.rows[0],{playerId:'p',name:'Jogador',skipped:false,energyRecovered:10,xp:6,happy:true});
 assert.equal(db.values.get('players/p').energy,100);assert.equal(db.values.get('players/p').xp,16);assert.equal(db.values.get('players/p').mood,'🤩');
 assert.deepEqual(db.values.get('players/q'),s['players/q']);
 assert.equal(db.values.get('users/s').energy,10);assert.equal(db.values.get('users/s').xp,10);assert.equal(db.values.get('users/s').pendingPerks,1);
 assert.match(db.values.get('teams/t').trainingLogs[0].report,/\+10⚡/);
});
test('simultaneous retries return the receipt once, and cannot change selection',async()=>{
 const db=memoryDB(seed());const results=await Promise.all([recoverPlayers(db,'u',input,options),recoverPlayers(db,'u',{...input,playerIds:['q','p']},{draw:()=>3})]);
 assert.deepEqual(results.map(r=>r.duplicate),[false,true]);assert.deepEqual(results[0].rows,results[1].rows);
 assert.equal(db.values.get('players/p').xp,11);assert.equal(db.values.get('users/s').energy,0);assert.equal(db.values.get('teams/t').trainingLogs.length,1);
 await assert.rejects(recoverPlayers(db,'u',{...input,playerIds:['p']},options));
});
test('recovery denies invalid roles, revoked bindings, ownership, employment, locks and foreign players',async()=>{
 const modifications=[['authAccounts/u',{active:false}],['authAccounts/u',{active:'true'}],['authAccounts/u',{type:'COACH'}],['authAccounts/u',{revision:0}],['accountEntityOwners/users_s',{uid:'other'}],['users/s',{status:'BLOCKED'}],['users/s',{teamId:'FREE'}],['teams/t',{status:'BLOCKED'}],['players/p',{teamId:'other'}],['players/p',{xp:NaN}],['players/p',{energy:101}],['serverConfig/matchAutomation',{enabled:false}],['matchParticipantLocks/team_t',{runId:'m'}],['matchParticipantLocks/player_p',{runId:'m'}]];
 for(const [path,patch] of modifications){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(recoverPlayers(db,'u',input,options),path);assert.deepEqual([...db.values],before);}
});
test('recovery rejects forged rewards and malformed or oversized selections',async()=>{
 for(const payload of [{...input,xp:1000},{...input,uid:'other'},{...input,playerIds:['p','p']},{...input,playerIds:[]},{...input,playerIds:['a','b','c','d','e','f']},{...input,playerIds:['../p']},{...input,requestId:'../r'}])await assert.rejects(recoverPlayers(memoryDB(seed()),'u',payload,options));
});
test('concurrent distinct requests cannot overspend; all-injured session has no charge or staff XP',async()=>{
 const db=memoryDB(seed());const r=await Promise.allSettled(['r1','r2'].map(requestId=>recoverPlayers(db,'u',{requestId,playerIds:['p']},options)));
 assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('users/s').energy,0);assert.equal(db.values.get('players/p').xp,11);
 const s=seed(),injured=memoryDB(s);const result=await recoverPlayers(injured,'u',{requestId:'skip',playerIds:['q']},options);
 assert.equal(result.cost,0);assert.deepEqual(injured.values.get('users/s'),s['users/s']);assert.deepEqual(injured.values.get('teams/t'),s['teams/t']);
});
