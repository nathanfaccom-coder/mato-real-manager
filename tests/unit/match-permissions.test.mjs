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
