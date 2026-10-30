import test from 'node:test';import assert from 'node:assert/strict';
import {guardAdminActions,allowAdminModal,OWNER_UID} from '../../src/admin/permissions.js';
test('press cannot launch results, tables, matches or fixtures; editorial actions remain',()=>{
 for(const type of ['PRESS','PRESS_WORKER','USER','PLAYER']) {
  let calls=0;const user={type,data:{}};
  const actions=guardAdminActions({saveMatchStats:()=>calls++,updateTeamStats:()=>calls++,handleSaveMatch:()=>calls++,postNews:()=>calls++},user,()=>{});
  actions.saveMatchStats();actions.updateTeamStats();actions.handleSaveMatch();assert.equal(calls,0);
  actions.postNews();assert.equal(calls,1);
  assert.equal(allowAdminModal(user,{type:'MATCH_PERFORMANCE'}),false);
 }
});
test('owner and competition subadmin retain results, press-only subadmin does not',()=>{
 for(const [user,allowed] of [[{type:'ADMIN',data:{id:OWNER_UID}},true],[{type:'ADMIN',data:{id:'sub',permissions:['competitions']}},true],[{type:'ADMIN',data:{id:'press',permissions:['press']}},false]]){
  let calls=0;guardAdminActions({saveMatchStats:()=>calls++},user,()=>{}).saveMatchStats();assert.equal(calls,Number(allowed));
 }
});
test('automatic mode blocks legacy XP and table writers even for the owner, without blocking unrelated actions',()=>{
 for(const user of [{type:'ADMIN',data:{id:OWNER_UID}},{type:'ADMIN',data:{id:'sub',permissions:['competitions']}},{type:'PRESS',data:{}}]){
  const calls=[],messages=[];
  const actions=guardAdminActions({saveMatchStats:()=>calls.push('xp'),updateTeamStats:()=>calls.push('table'),saveTactics:()=>calls.push('tactics')},user,message=>messages.push(message),{automaticMatches:true});
  actions.saveMatchStats({xpOverride:999});actions.updateTeamStats('team',{pts:999});
  assert.deepEqual(calls,[]);assert.equal(messages.length,2);assert.ok(messages.every(m=>m.includes('súmula registrada')));
 }
});
test('automatic mode preserves authorized unrelated calendar actions',()=>{
 let count=0;guardAdminActions({handleSaveMatch:()=>count++},{type:'ADMIN',data:{id:OWNER_UID}},()=>{},{automaticMatches:true}).handleSaveMatch();assert.equal(count,1);
});
test('ordinary build retains authorized legacy result processing until rollout',()=>{
 let count=0;const actions=guardAdminActions({saveMatchStats:()=>count++,updateTeamStats:()=>count++},{type:'ADMIN',data:{id:OWNER_UID}},()=>{},{automaticMatches:false});
 actions.saveMatchStats();actions.updateTeamStats();assert.equal(count,2);
});
