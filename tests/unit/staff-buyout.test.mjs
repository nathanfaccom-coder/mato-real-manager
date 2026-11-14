import test from 'node:test';
import assert from 'node:assert/strict';
import {buyoutStaff} from '../../server/staff-buyout.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'COACH',entityId:'c',revision:1},'accountEntityOwners/users_c':{uid:'u',type:'COACH',entityId:'c'},'teams/t':{status:'ACTIVE',name:'Clube',balance:10.05},'users/c':{status:'ACTIVE',type:'COACH',teamId:'t',salary:2500.01,clause:10000.04,balance:20000.10,contract:2}});
const review=db=>buyoutStaff(db,'u',{}),execute=(db,quote,requestId='r')=>buyoutStaff(db,'u',{requestId,quote},{execute:true});
test('buyout derives own identity, pays exact clause and frees contract once despite retries',async()=>{
 const db=memoryDB(seed()),q=await review(db);assert.equal(q.fine,10000.04);assert.equal(q.staffBalance,undefined);const r=await Promise.all([execute(db,q.quote),execute(db,q.quote)]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(db.values.get('teams/t').balance,10010.09);const c=db.values.get('users/c');assert.equal(c.balance,10000.06);assert.equal(c.teamId,'FREE');assert.equal(c.contract,0);assert.equal(c.salary,2500);await assert.rejects(execute(db,q.quote,'new'));
});
test('all staff roles preserve fallback of ten salaries and zero clause fallback',async()=>{
 for(const type of ['DOCTOR','SCOUT','ASSISTANT']){const s=seed();for(const k of ['authAccounts/u','accountEntityOwners/users_c','users/c'])s[k].type=type;s['users/c'].clause=0;s['users/c'].balance=30000.10;const db=memoryDB(s),q=await review(db);assert.equal(q.fine,25000.10);const r=await Promise.allSettled(['a','b'].map(id=>execute(db,q.quote,id)));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('users/c').balance,5000);}
});
test('changed clause or balances require another review without payment',async()=>{
 for(const [path,patch] of [['users/c',{clause:5000}],['users/c',{balance:1}],['teams/t',{balance:100}]]){const db=memoryDB(seed()),q=await review(db);Object.assign(db.values.get(path),patch);const before=structuredClone([...db.values]);await assert.rejects(execute(db,q.quote),e=>e.code==='STAFF_BUYOUT_REVIEW_REQUIRED');assert.deepEqual([...db.values],before);}
});
test('forged identity/fine, invalid ownership, role and match locks fail without writes',async()=>{
 for(const body of [{staffId:'other'},{fine:0},{teamId:'other'}])await assert.rejects(buyoutStaff(memoryDB(seed()),'u',body));
 for(const [path,patch] of [['authAccounts/u',{type:'TEAM'}],['accountEntityOwners/users_c',{uid:'other'}],['users/c',{type:'DOCTOR'}],['users/c',{teamId:'FREE'}],['users/c',{clause:-1}],['teams/t',{status:'PENDING'}],['matchParticipantLocks/team_t',{runId:'m'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(review(db));assert.deepEqual([...db.values],before);}
});
