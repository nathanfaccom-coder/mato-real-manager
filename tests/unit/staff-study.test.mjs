import test from 'node:test';
import assert from 'node:assert/strict';
import {studyStaff} from '../../server/staff-study.js';
import {recoverPlayers} from '../../server/staff-recovery.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'ASSISTANT',entityId:'s',revision:1},'accountEntityOwners/users_s':{uid:'u',entityId:'s',type:'ASSISTANT'},'users/s':{status:'ACTIVE',type:'ASSISTANT',teamId:'t',energy:20,xp:190,level:2},'teams/t':{status:'ACTIVE'},'players/p':{teamId:'t',energy:10,xp:0}});
const options={draw:()=>24,now:1},input={requestId:'r'};
test('study derives XP, energy, level and perk; concurrent retry applies once',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([studyStaff(db,'u',input,options),studyStaff(db,'u',input,{draw:()=>10})]);
 assert.deepEqual(r.map(v=>v.duplicate),[false,true]);assert.equal(r[1].gain,24);
 assert.deepEqual(db.values.get('users/s'),{status:'ACTIVE',type:'ASSISTANT',teamId:'t',energy:0,xp:14,level:3,pendingPerks:1});
});
test('study rejects forged rewards, revoked role, wrong owner, inactive staff, lock and invalid numbers without writes',async()=>{
 for(const [path,patch] of [['authAccounts/u',{active:false}],['authAccounts/u',{type:'COACH'}],['authAccounts/u',{revision:0}],['accountEntityOwners/users_s',{uid:'other'}],['users/s',{status:'BLOCKED'}],['users/s',{energy:19}],['users/s',{xp:Infinity}],['users/s',{level:0}],['users/s',{pendingPerks:-1}],['matchParticipantLocks/team_t',{runId:'m'}],['serverConfig/matchAutomation',{enabled:false}]]){
  const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=[...db.values];await assert.rejects(studyStaff(db,'u',input,options));assert.deepEqual([...db.values],before);
 }
 for(const bad of [{...input,xp:900},{...input,uid:'admin'},{requestId:'../r'},{}])await assert.rejects(studyStaff(memoryDB(seed()),'u',bad,options));
});
test('study and recovery share staff energy transactionally and cannot overspend',async()=>{
 const db=memoryDB(seed());const results=await Promise.allSettled([studyStaff(db,'u',input,options),recoverPlayers(db,'u',{requestId:'recover',playerIds:['p']})]);
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(db.values.get('users/s').energy,0);assert.equal(db.values.get('players/p').energy,10);
});
test('unemployed assistant can study; existing above-30 study progression is preserved',async()=>{
 const s=seed();s['users/s']={...s['users/s'],teamId:'FREE',level:30,xp:2995};const db=memoryDB(s);await studyStaff(db,'u',input,{draw:()=>10});assert.equal(db.values.get('users/s').level,31);assert.equal(db.values.get('users/s').xp,5);
 db.values.set('users/s',{...db.values.get('users/s'),teamId:'t',energy:20});
 await recoverPlayers(db,'u',{requestId:'after-study',playerIds:['p']});assert.equal(db.values.get('users/s').level,31);assert.equal(db.values.get('users/s').xp,25);
});
