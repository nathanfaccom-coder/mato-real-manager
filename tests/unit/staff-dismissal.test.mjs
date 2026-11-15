import test from 'node:test';
import assert from 'node:assert/strict';
import {dismissStaff} from '../../server/staff-dismissal.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'TEAM',entityId:'t',revision:1},'accountEntityOwners/teams_t':{uid:'u',type:'TEAM',entityId:'t'},'teams/t':{status:'ACTIVE',balance:20000.10},'users/c':{status:'ACTIVE',type:'COACH',teamId:'t',salary:2500.01,balance:10.05,contract:2,name:'Técnico'}});
const review=db=>dismissStaff(db,'u',{staffId:'c'});
const execute=(db,quote,requestId='r')=>dismissStaff(db,'u',{staffId:'c',quote,requestId},{execute:true});
test('review derives fine without exposing balances; dismissal pays once and frees contract',async()=>{
 const db=memoryDB(seed()),q=await review(db);assert.equal(q.fine,10000.04);assert.equal(q.balance,undefined);const r=await Promise.all([execute(db,q.quote),execute(db,q.quote)]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(db.values.get('teams/t').balance,10000.06);const c=db.values.get('users/c');assert.equal(c.balance,10010.09);assert.equal(c.teamId,'FREE');assert.equal(c.contract,0);assert.equal(c.salary,2500);await assert.rejects(execute(db,q.quote,'new'));
});
test('changed salary or balances require new review with no debit',async()=>{
 for(const [path,patch] of [['users/c',{salary:3000}],['users/c',{balance:100}],['teams/t',{balance:500}]]){const db=memoryDB(seed()),q=await review(db);Object.assign(db.values.get(path),patch);const before=structuredClone([...db.values]);await assert.rejects(execute(db,q.quote),e=>e.code==='STAFF_DISMISS_REVIEW_REQUIRED');assert.deepEqual([...db.values],before);}
});
test('foreign staff, role, ownership, lock and forged fine are denied',async()=>{
 for(const [path,patch] of [['authAccounts/u',{type:'USER'}],['accountEntityOwners/teams_t',{uid:'other'}],['users/c',{teamId:'other'}],['users/c',{type:'PLAYER'}],['users/c',{salary:-1}],['matchParticipantLocks/team_t',{runId:'m'}]]){const s=seed();s[path]={...s[path],...patch};await assert.rejects(review(memoryDB(s)));}
 await assert.rejects(dismissStaff(memoryDB(seed()),'u',{staffId:'c',fine:0}));
});
test('all staff roles preserve four-salary default and competing different requests pay only once',async()=>{
 for(const type of ['DOCTOR','SCOUT','ASSISTANT']){const s=seed();s['users/c'].type=type;s['users/c'].salary=0;const db=memoryDB(s),q=await review(db);assert.equal(q.fine,10000);const r=await Promise.allSettled(['a','b'].map(id=>execute(db,q.quote,id)));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('teams/t').balance,10000.10);}
});
