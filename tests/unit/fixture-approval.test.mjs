import test from 'node:test';
import assert from 'node:assert/strict';
import {memoryDB} from '../helpers/memory-db.mjs';
import {approveFixture,fixtureMatchesApproval,reviewFixture} from '../../server/fixture-approval.js';
import {OWNER_UID} from '../../src/admin/permissions.js';
const input={fixtureId:'f1',homeId:'h',awayId:'a',competitionId:'cup',seasonId:'season_1',approved:true,expectedRevision:0,reason:'Calendário conferido'};
function seed(){return memoryDB({
 'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'config/system':{season:1},
 'teams/h':{status:'ACTIVE'},'teams/a':{status:'ACTIVE'},'competitions/cup':{active:true,seasonId:'season_1'},
 'matches/f1':{homeId:'h',awayId:'a',competitionId:'cup',seasonId:'season_1',status:'PENDING',played:false}
});}
test('approval atomically stores reviewed identity and immutable revision audit; concurrent retry is idempotent',async()=>{
 const db=seed();const results=await Promise.all([approveFixture(db,OWNER_UID,input),approveFixture(db,OWNER_UID,input)]);
 assert.deepEqual(results.map(r=>r.duplicate),[false,true]);
 const approval=db.values.get('serverConfig/fixture_f1');
 assert.equal(approval.revision,1);assert.equal(approval.actor,OWNER_UID);
 assert.deepEqual(db.values.get('serverConfig/fixture_f1/audit/1'),approval);
 assert.ok(fixtureMatchesApproval(db.values.get('matches/f1'),approval));
});
test('public marker cannot authorize official play; altered identifiers invalidate protected approval',async()=>{
 const db=seed();await approveFixture(db,OWNER_UID,input);
 const fixture=db.values.get('matches/f1'),approval=db.values.get('serverConfig/fixture_f1');
 assert.equal(fixtureMatchesApproval(fixture,{serverVerified:true}),false);
 for(const key of ['homeId','awayId','competitionId','seasonId'])assert.equal(fixtureMatchesApproval({...fixture,[key]:'forged'},approval),false);
});
test('only active competition administrators may approve; truthy flags and string permissions fail',async()=>{
 for(const profile of [null,{active:false,permissions:['competitions']},{active:'true',permissions:['competitions']},{active:true,permissions:'competitions'},{active:true,permissions:['press']}]){
  const db=seed();if(profile)db.values.set('adminProfiles/press',profile);
  await assert.rejects(approveFixture(db,'press',input));assert.equal(db.values.has('serverConfig/fixture_f1'),false);
 }
 const db=seed();db.values.set('adminProfiles/adm',{active:true,permissions:['competitions']});
 assert.equal((await approveFixture(db,'adm',input)).approved,true);
});
test('approval cannot silently accept changed calendar, inactive competition, season, club or running match',async()=>{
 for(const [path,patch] of [['matches/f1',{homeId:'other'}],['matches/f1',{played:true}],['matches/f1',{status:'RUNNING'}],['competitions/cup',{active:false}],['config/system',{season:2}],['teams/a',{status:'INACTIVE'}],['matchRuns/official_f1',{status:'FINISHED'}],['serverConfig/matchAutomation',{enabled:false}]]){
  const db=seed();db.values.set(path,{...db.values.get(path),...patch});const before=structuredClone([...db.values]);
  await assert.rejects(approveFixture(db,OWNER_UID,input));assert.deepEqual([...db.values],before);
 }
});
test('revocation and reapproval require current revision; cannot revoke a running match',async()=>{
 const db=seed();await approveFixture(db,OWNER_UID,input);
 await assert.rejects(approveFixture(db,OWNER_UID,{...input,approved:false,reason:'Cancelar calendário'}));
 await approveFixture(db,OWNER_UID,{...input,approved:false,expectedRevision:1,reason:'Cancelar calendário'});
 assert.equal(fixtureMatchesApproval(db.values.get('matches/f1'),db.values.get('serverConfig/fixture_f1')),false);
 await approveFixture(db,OWNER_UID,{...input,expectedRevision:2});
 assert.equal(db.values.get('serverConfig/fixture_f1').revision,3);
 db.values.set('matchRuns/official_f1',{status:'RUNNING'});
 await assert.rejects(approveFixture(db,OWNER_UID,{...input,expectedRevision:3,approved:false}));
 assert.equal(db.values.get('serverConfig/fixture_f1').revision,3);
});
test('approval rejects injected identity, classification, reward and invalid revision',async()=>{
 for(const patch of [{uid:OWNER_UID},{kind:'OFFICIAL'},{xp:9000},{expectedRevision:-1},{expectedRevision:0.5},{approved:1},{reason:' '},{homeId:'a'}]){
  await assert.rejects(approveFixture(seed(),OWNER_UID,{...input,...patch}));
 }
});

test('review reads authoritative identities and exposes eligibility without private fields',async()=>{
 const db=seed();db.values.get('teams/h').password='secret';db.values.get('teams/h').name='Casa';
 db.values.get('competitions/cup').name='Copa';
 const before=structuredClone([...db.values]),review=await reviewFixture(db,OWNER_UID,{fixtureId:'f1'});
 assert.equal(review.homeName,'Casa');assert.equal(review.competitionName,'Copa');assert.equal(review.expectedRevision,0);
 assert.equal(review.canApprove,true);assert.equal(review.canRevoke,false);assert.deepEqual(review.problems,[]);
 assert.equal(JSON.stringify(review).includes('secret'),false);assert.deepEqual([...db.values],before);
 await approveFixture(db,OWNER_UID,input);
 const approved=await reviewFixture(db,OWNER_UID,{fixtureId:'f1'});
 assert.equal(approved.approved,true);assert.equal(approved.canRevoke,true);assert.equal(approved.expectedRevision,1);
 assert.equal(approved.actor,undefined);assert.equal(approved.reason,undefined);
});
test('review cannot disclose calendar to press, inactive ADM or forged input',async()=>{
 const db=seed();
 for(const uid of ['press',null])await assert.rejects(reviewFixture(db,uid,{fixtureId:'f1'}));
 await assert.rejects(reviewFixture(db,OWNER_UID,{fixtureId:'f1',uid:OWNER_UID}));
 db.values.get('serverConfig/matchAutomation').enabled=false;
 await assert.rejects(reviewFixture(db,OWNER_UID,{fixtureId:'f1'}));
});
test('review explains invalid legacy identifiers, inactive clubs and started games without enabling approval',async()=>{
 for(const [path,patch] of [['matches/f1',{competitionId:null,seasonId:null}],['teams/h',{status:'INACTIVE'}],['competitions/cup',{active:false}],['config/system',{season:2}],['matchRuns/official_f1',{status:'RUNNING'}]]){
  const db=seed();db.values.set(path,{...db.values.get(path),...patch});
  const review=await reviewFixture(db,OWNER_UID,{fixtureId:'f1'});
  assert.equal(review.canApprove,false);assert.ok(review.problems.length>0);
 }
});
test('review does not authorize stale pairing or approval revision',async()=>{
 const db=seed(),review=await reviewFixture(db,OWNER_UID,{fixtureId:'f1'});
 db.values.get('matches/f1').homeId='changed';
 await assert.rejects(approveFixture(db,OWNER_UID,{...input,homeId:review.homeId,expectedRevision:review.expectedRevision}));
 assert.equal(db.values.has('serverConfig/fixture_f1'),false);
 db.values.get('matches/f1').homeId='h';await approveFixture(db,OWNER_UID,input);
 await assert.rejects(approveFixture(db,OWNER_UID,{...input,approved:false,expectedRevision:review.expectedRevision}));
});
