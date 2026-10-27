import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {bindGameAccount,setGameAccountActive,resolveGameAccount} from '../../server/account-bindings.js';
import {OWNER_UID} from '../../src/admin/permissions.js';
const auth={getUser:async()=>({email:'verified@example.test',emailVerified:true,disabled:false})};
const input={uid:'u',type:'TEAM',entityId:'h'};
function fixture(){return memoryDB({'serverConfig/accountMigration':{enabled:true,schemaVersion:1},'teams/h':{name:'Club',status:'ACTIVE',password:'legacy-secret'}});}
test('binding requires owner, verified target identity and explicit enabled migration',async()=>{
 for(const actor of [null,'press','club','subadmin'])await assert.rejects(bindGameAccount(fixture(),auth,actor,input));
 for(const user of [{emailVerified:false},{disabled:true,emailVerified:true},{emailVerified:true}])await assert.rejects(bindGameAccount(fixture(),{getUser:async()=>user},OWNER_UID,input));
 const db=fixture();db.values.delete('serverConfig/accountMigration');await assert.rejects(bindGameAccount(db,auth,OWNER_UID,input));
});
test('owner binds once without copying passwords or email into binding/audit; session returns trusted ids only',async()=>{
 const db=fixture();const result=await bindGameAccount(db,auth,OWNER_UID,input,{now:1000});assert.equal(result.revision,1);
 assert.equal((await bindGameAccount(db,auth,OWNER_UID,input)).duplicate,true);
 const binding=db.values.get('authAccounts/u');assert.equal(binding.entityId,'h');assert.equal(binding.password,undefined);assert.equal(binding.email,undefined);
 const audit=db.values.get('accountBindingAudit/u_1');assert.equal(audit.password,undefined);assert.equal(audit.email,undefined);
 assert.deepEqual(await resolveGameAccount(db,'u'),{type:'USER',entityId:'h',revision:1});
});
test('concurrent claims cannot assign one club to two identities',async()=>{
 const db=fixture();const attempts=await Promise.allSettled([bindGameAccount(db,auth,OWNER_UID,input),bindGameAccount(db,auth,OWNER_UID,{...input,uid:'other'})]);
 assert.equal(attempts.filter(r=>r.status==='fulfilled').length,1);
 assert.equal([...db.values.keys()].filter(k=>k.startsWith('authAccounts/')).length,1);
});
test('binding cannot silently move identity to another account or attach administrator/bot',async()=>{
 const db=fixture();await bindGameAccount(db,auth,OWNER_UID,input);db.values.set('teams/a',{status:'ACTIVE'});
 await assert.rejects(bindGameAccount(db,auth,OWNER_UID,{...input,entityId:'a'}));
 await assert.rejects(bindGameAccount(db,auth,OWNER_UID,{...input,uid:OWNER_UID}));
 const adm=fixture();adm.values.set('adminProfiles/u',{active:true});await assert.rejects(bindGameAccount(adm,auth,OWNER_UID,input));
 const bot=fixture();bot.values.set('players/p',{status:'ACTIVE',isBot:true});await assert.rejects(bindGameAccount(bot,auth,OWNER_UID,{...input,type:'PLAYER',entityId:'p'}));
});
test('disable is revision-checked, reserves ownership and immediately blocks session resolution',async()=>{
 const db=fixture();await bindGameAccount(db,auth,OWNER_UID,input);
 assert.equal((await setGameAccountActive(db,OWNER_UID,{uid:'u',active:false,expectedRevision:1,reason:'Lost access'})).revision,2);
 await assert.rejects(resolveGameAccount(db,'u'));
 await assert.rejects(bindGameAccount(db,auth,OWNER_UID,{...input,uid:'other'}));
 await assert.rejects(setGameAccountActive(db,OWNER_UID,{uid:'u',active:true,expectedRevision:1,reason:'Restore access'}));
 assert.equal((await bindGameAccount(db,auth,OWNER_UID,input)).active,false);
 await setGameAccountActive(db,OWNER_UID,{uid:'u',active:true,expectedRevision:2,reason:'Verified identity'});
 assert.equal((await resolveGameAccount(db,'u')).revision,3);
});
test('staff role and account status checked against current profile; client role escalation is rejected',async()=>{
 const db=fixture();db.values.set('users/c',{status:'ACTIVE',type:'COACH'});
 await bindGameAccount(db,auth,OWNER_UID,{uid:'coach',type:'COACH',entityId:'c'});
 db.values.set('users/c',{status:'ACTIVE',type:'DOCTOR'});await assert.rejects(resolveGameAccount(db,'coach'));
 for(const extra of [{active:true},{permissions:['competitions']},{password:'secret'}])await assert.rejects(bindGameAccount(fixture(),auth,OWNER_UID,{...input,...extra}));
});

test('malformed roles and inconsistent ownership fail closed',async()=>{
 for(const type of [['TEAM'],{toString:'TEAM'},null,'__proto__'])await assert.rejects(bindGameAccount(fixture(),auth,OWNER_UID,{...input,type}));
 for(const mutate of [
  db=>db.values.get('authAccounts/u').active='true',
  db=>db.values.get('authAccounts/u').revision=0,
  db=>db.values.delete('accountEntityOwners/teams_h'),
  db=>db.values.get('accountEntityOwners/teams_h').uid='other',
  db=>db.values.get('accountEntityOwners/teams_h').type='PLAYER'
 ]){
  const db=fixture();await bindGameAccount(db,auth,OWNER_UID,input);mutate(db);
  await assert.rejects(resolveGameAccount(db,'u'));
 }
});
