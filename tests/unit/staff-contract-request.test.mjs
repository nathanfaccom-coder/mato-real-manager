import test from 'node:test';
import assert from 'node:assert/strict';
import {requestStaffContract} from '../../server/staff-contract-request.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'COACH',entityId:'c',revision:1},'accountEntityOwners/users_c':{uid:'u',type:'COACH',entityId:'c'},'teams/t':{status:'ACTIVE',name:'Clube',balance:100},'users/c':{status:'ACTIVE',type:'COACH',name:'Técnico',teamId:'t',salary:2500,balance:10,contract:2}});
const input={requestId:'r',kind:'RAISE',requestedSalary:3000.01};
test('contract request derives identities and current salary, creates only one offer on concurrent retries',async()=>{
 const db=memoryDB(seed()),before=structuredClone(db.values.get('users/c'));
 const results=await Promise.all([requestStaffContract(db,'u',input),requestStaffContract(db,'u',input)]);
 assert.deepEqual(results.map(r=>r.duplicate),[false,true]);assert.equal(results[0].offerId,results[1].offerId);
 const offers=[...db.values].filter(([p])=>p.startsWith('offers/'));assert.equal(offers.length,1);
 assert.equal(offers[0][1].currentSalary,2500);assert.equal(offers[0][1].requestedSalary,3000.01);assert.equal(offers[0][1].recipientId,'t');assert.equal(offers[0][1].senderId,'c');assert.deepEqual(db.values.get('users/c'),before);assert.equal(db.values.get('teams/t').balance,100);
 await assert.rejects(requestStaffContract(db,'u',{...input,requestedSalary:4000}));
});
test('all staff roles can request amicable release without changing contract',async()=>{
 for(const type of ['COACH','DOCTOR','SCOUT','ASSISTANT']){const s=seed();for(const k of ['authAccounts/u','accountEntityOwners/users_c','users/c'])s[k].type=type;const db=memoryDB(s);const r=await requestStaffContract(db,'u',{requestId:'r',kind:'RESIGN_REQ',requestedSalary:null});assert.equal(db.values.get('offers/'+r.offerId).type,'COACH_RESIGN');assert.equal(db.values.get('users/c').teamId,'t');}
});
test('staff proposal descriptions use the actual role for every supported profession',async()=>{
 const labels={COACH:'técnico',DOCTOR:'médico',SCOUT:'olheiro',ASSISTANT:'auxiliar'};
 for(const [type,label] of Object.entries(labels)){
  for(const kind of ['RAISE','RESIGN_REQ']){
   const s=seed();for(const k of ['authAccounts/u','accountEntityOwners/users_c','users/c'])s[k].type=type;
   const db=memoryDB(s);
   const request={requestId:'role-description',kind,requestedSalary:kind==='RAISE'?3000.01:null};
   const {offerId}=await requestStaffContract(db,'u',request);
   const description=db.values.get('offers/'+offerId).description;
   assert.ok(description.includes(`O ${label} **Técnico**`),`${type} ${kind}: ${description}`);
  }
 }
});

test('invalid amounts, forged identity and changed ownership or club lock never create proposals',async()=>{
 for(const patch of [{requestedSalary:2500},{requestedSalary:NaN},{requestedSalary:3000.001},{staffId:'other'},{kind:'BUYOUT'},{kind:'RESIGN_REQ'}]){const db=memoryDB(seed()),before=structuredClone([...db.values]);await assert.rejects(requestStaffContract(db,'u',{...input,...patch}));assert.deepEqual([...db.values],before);}
 for(const [path,patch] of [['authAccounts/u',{active:false}],['accountEntityOwners/users_c',{uid:'other'}],['users/c',{teamId:'FREE'}],['users/c',{type:'PLAYER'}],['teams/t',{status:'PENDING'}],['matchParticipantLocks/team_t',{runId:'m'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(requestStaffContract(db,'u',input));assert.deepEqual([...db.values],before);}
});

test('raise rejects corrupt persisted salaries instead of issuing an invalid proposal', async()=>{
 for(const salary of [NaN, Infinity, -1, 2500.001, Number.MAX_SAFE_INTEGER]){
  const state=seed();state['users/c'].salary=salary;
  const db=memoryDB(state),before=structuredClone([...db.values]);
  await assert.rejects(requestStaffContract(db,'u',{requestId:'corrupt-salary',kind:'RAISE',requestedSalary:3000.01}));
  assert.deepEqual([...db.values],before);
 }
});

test('confirmed request receipt survives dismissal or salary change without a second offer',async()=>{
 for(const patch of [{status:'FREE',teamId:'FREE'}, {salary:9999}, {type:'PLAYER'}]){
  const db=memoryDB(seed());
  const first=await requestStaffContract(db,'u',input);
  db.values.set('users/c',{...db.values.get('users/c'),...patch});
  const before=structuredClone([...db.values]);
  const replay=await requestStaffContract(db,'u',input);
  assert.deepEqual(replay,{offerId:first.offerId,duplicate:true});
  assert.deepEqual([...db.values],before);
  assert.equal([...db.values.keys()].filter(p=>p.startsWith('offers/')).length,1);
 }
});

test('request replay still rejects revoked account or transferred entity owner',async()=>{
 for(const [path,patch] of [['authAccounts/u',{active:false}],['accountEntityOwners/users_c',{uid:'other'}]]){
  const db=memoryDB(seed());
  await requestStaffContract(db,'u',input);
  db.values.set(path,{...db.values.get(path),...patch});
  const before=structuredClone([...db.values]);
  await assert.rejects(requestStaffContract(db,'u',input));
  assert.deepEqual([...db.values],before);
 }
});
