import {verifyPlayerRegistration} from './player-registration.mjs';
import {verifyIdentityLifecycle} from './identity-lifecycle.mjs';
import {OAuth2Client} from 'google-auth-library';
import {generateKeyPairSync} from 'node:crypto';
import assert from 'node:assert/strict';
import {initializeApp,deleteApp,cert} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {initializeFirestore} from 'firebase-admin/firestore';
import {createMatchHandler} from '../match-http.js';
import {processNextDueMatch} from '../match-scheduler.js';
import {finalizeDueMatch} from '../match-worker.js';
import {OWNER_UID} from '../../src/admin/permissions.js';
const projectId='demo-mato-real';
assert.equal(process.env.FIRESTORE_EMULATOR_HOST,'127.0.0.1:18080');
assert.equal(process.env.FIREBASE_AUTH_EMULATOR_HOST,'127.0.0.1:19099');
// Ephemeral local-only credential avoids probing cloud metadata in the sandbox.
const {privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
const credential=cert({projectId,clientEmail:'emulator@demo-mato-real.iam.gserviceaccount.com',privateKey:privateKey.export({type:'pkcs8',format:'pem'})});
const app=initializeApp({projectId,credential}),db=initializeFirestore(app,{preferRest:true}),auth=getAuth(app);
// Only local emulators: REST auth must carry the emulator's owner token.
const emulatorAuth=new OAuth2Client();emulatorAuth.setCredentials({access_token:'owner'});
db.settings({authClient:emulatorAuth});
try {
 await verifyIdentityLifecycle(auth);
 const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE'];
 const batch=db.batch();
 batch.set(db.doc('serverConfig/matchAutomation'),{enabled:true,schemaVersion:1});
 batch.set(db.doc('config/system'),{season:1});
 batch.set(db.doc('serverConfig/accountMigration'),{enabled:true,schemaVersion:1});
 for(const team of ['h','a']){
  batch.set(db.doc(`teams/${team}`),{name:team,status:'ACTIVE'});
  roles.forEach((position,i)=>batch.set(db.doc(`players/${team}${i}`),{name:`P${i}`,position,teamId:team,overall:60,energy:100}));
 }
 await batch.commit();
 await auth.createUser({uid:OWNER_UID});
 const customToken=await auth.createCustomToken(OWNER_UID);
 const signed=await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:customToken,returnSecureToken:true})});
 assert.equal(signed.status,200);const {idToken}=await signed.json();
 const handle=createMatchHandler({db,auth,enabled:true});
 await verifyPlayerRegistration({db,auth,handle,ownerToken:idToken});
 await auth.createUser({uid:'club-owner',email:'club@example.test',emailVerified:true});
 const reviewRequest=(token,payload)=>new Request('https://example.test/account-review',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});
 const preview=await handle(reviewRequest(idToken,{uid:'club-owner',type:'TEAM',entityId:'h'}));assert.equal(preview.status,200);
 const previewBody=await preview.json();assert.equal(previewBody.email,'club@example.test');assert.equal(previewBody.canBind,true);assert.equal(previewBody.profile.name,'h');
 const bindRequest=new Request('https://example.test/account-bind',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify({uid:'club-owner',type:'TEAM',entityId:'h'})});
 const bound=await handle(bindRequest);assert.equal(bound.status,200,await bound.clone().text());
 const clubSignIn=await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('club-owner'),returnSecureToken:true})});
 const {idToken:clubToken}=await clubSignIn.json();
 const deniedPreview=await handle(reviewRequest(clubToken,{uid:'club-owner'}));assert.equal(deniedPreview.status,400);assert.equal((await deniedPreview.text()).includes('club@example.test'),false);
 const boundPreview=await handle(reviewRequest(idToken,{uid:'club-owner'}));assert.equal((await boundPreview.json()).binding.revision,1);
 console.log('PASS: owner-only review exposes sanitized target and current binding; player review denied without email disclosure.');
 const sessionRequest=()=>new Request('https://example.test/session',{method:'POST',headers:{Authorization:`Bearer ${clubToken}`,'Content-Type':'application/json'},body:'{}'});
 assert.deepEqual(await (await handle(sessionRequest())).json(),{type:'USER',entityId:'h',revision:1});
 const disableRequest=new Request('https://example.test/account-state',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify({uid:'club-owner',active:false,expectedRevision:1,reason:'Test revocation'})});
 assert.equal((await handle(disableRequest)).status,200);
 assert.equal((await handle(sessionRequest())).status,400);
 console.log('PASS: owner binds verified identity, session resolves only own profile, binding revocation blocks session immediately.');
 const request=(requestId='one')=>new Request('https://example.test/start',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify({requestId,homeId:'h',awayId:'a'})});
 const started=await handle(request());
 assert.equal(started.status,200,await started.clone().text());
 const {matchId}=await started.json();
 const retry=await handle(request());assert.equal((await retry.json()).duplicate,true);
 const run=(await db.doc(`matchRuns/${matchId}`).get()).data();
 const pair=await Promise.all([finalizeDueMatch(db,matchId,run.endsAt),finalizeDueMatch(db,matchId,run.endsAt)]);
 assert.ok(pair.some(r=>r.revision===1));
 const result=(await db.doc(`matchResults/${matchId}`).get()).data();assert.equal(result.revision,1);
 for(const [id,row] of Object.entries(result.rows)){
  const p=(await db.doc(`players/${id}`).get()).data();assert.equal(p.pendingXP,row.xp);assert.equal(p.energy,100-row.energyApplied);
 }
 assert.equal((await db.collection('matchResultAudit').get()).size,1);
 assert.equal((await db.collection('matchParticipantLocks').get()).size,0);
 const rest=`http://${process.env.FIRESTORE_EMULATOR_HOST}/v1/projects/${projectId}/databases/(default)/documents/matchResults/${matchId}`;
 assert.equal((await fetch(rest)).status,403);
 assert.equal((await fetch(rest,{method:'PATCH',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify({fields:{revision:{integerValue:'999'}}})})).status,403);
 const nextResponse=await handle(request('two'));assert.equal(nextResponse.status,200);
 const {matchId:nextId}=await nextResponse.json();
 const nextRun=(await db.doc(`matchRuns/${nextId}`).get()).data();
 await assert.rejects(processNextDueMatch(db,{now:nextRun.endsAt,finalize:async()=>{throw Error('synthetic transient failure');}}),/synthetic/);
 assert.deepEqual(await processNextDueMatch(db,{now:nextRun.endsAt+1}),{idle:true});
 await processNextDueMatch(db,{now:nextRun.endsAt+30000});
 assert.equal((await db.doc(`matchRuns/${nextId}`).get()).data().status,'FINISHED');
 assert.equal((await db.collection('matchResultAudit').get()).size,2);
 await auth.updateUser(OWNER_UID,{disabled:true});
 assert.equal((await handle(request())).status,401);
 console.log('PASS: real Auth emulator token, REST SDK transactions, retry deduplication, simultaneous settlement, exact XP/energy, lock release, deny-all fixture, disabled-user rejection.');
}finally{await db.terminate();await deleteApp(app);}
