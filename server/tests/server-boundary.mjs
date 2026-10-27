import {OAuth2Client} from 'google-auth-library';
import {generateKeyPairSync} from 'node:crypto';
import assert from 'node:assert/strict';
import {initializeApp,deleteApp,cert} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {initializeFirestore} from 'firebase-admin/firestore';
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
const protectedCollections=['authAccounts','accountEntityOwners','accountBindingAudit','serverConfig','matchRuns','matchResults','matchResultAudit','matchParticipantLocks','friendlyDailyXP','playerSeasons','playerCompetitions','competitionStandings'];
try{
 const base=`http://${process.env.FIRESTORE_EMULATOR_HOST}/v1/projects/${projectId}/databases/(default)/documents`;
 const tokens=[null];
 for(const uid of ['ordinary','press',OWNER_UID]){
  await auth.createUser({uid});
  const response=await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken(uid),returnSecureToken:true})});
  assert.equal(response.status,200);tokens.push((await response.json()).idToken);
 }
 const batch=db.batch();
 for(const name of protectedCollections){batch.set(db.doc(`${name}/one`),{active:true,revision:1});batch.set(db.doc(`${name}/one/nested/one`),{secret:'test-only'});}
 batch.set(db.doc('teams/legacy'),{name:'Legacy',password:'test-only'});
 batch.set(db.doc('adminProfiles/ordinary'),{name:'Auxiliar',login:'auxiliar',permissions:['teams'],active:true,createdAt:1});
 await batch.commit();
 let rejected=0;
 for(const token of tokens){
  const headers={'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})};
  for(const name of protectedCollections){
   const attempts=[
    [`${name}/one`,{method:'GET'}],
    [`${name}`,{method:'GET'}],
    [`${name}/fresh`,{method:'PATCH',body:JSON.stringify({fields:{active:{booleanValue:true},role:{stringValue:'ADMIN'}}})}],
    [`${name}/one`,{method:'PATCH',body:JSON.stringify({fields:{revision:{stringValue:'bad'},secret:{stringValue:'x'.repeat(10000)}}})}],
    [`${name}/one`,{method:'DELETE'}],
    [`${name}/one/nested/one`,{method:'GET'}],
    [`${name}/one/nested/forged`,{method:'PATCH',body:JSON.stringify({fields:{ownerId:{stringValue:'victim'}}})}],
   ];
   for(const [path,options]of attempts){const response=await fetch(`${base}/${path}`,{...options,headers});assert.equal(response.status,403,`${name}: ${options.method} unexpectedly returned ${response.status}`);rejected++;}
  }
 }
 // Protected root collections cannot be reopened by the legacy recursive rule.
 assert.equal((await db.doc('matchResults/one').get()).data().revision,1);
 await db.doc('matchResults/one').update({revision:2});
 assert.equal((await db.doc('matchResults/one').get()).data().revision,2);
 // Existing admin boundary remains intact: self-read is allowed, self-promotion denied.
 const ownHeaders={Authorization:`Bearer ${tokens[1]}`,'Content-Type':'application/json'};
 assert.equal((await fetch(`${base}/adminProfiles/ordinary`,{headers:ownHeaders})).status,200);
 assert.equal((await fetch(`${base}/adminProfiles/ordinary`,{method:'PATCH',headers:ownHeaders,body:JSON.stringify({fields:{active:{booleanValue:true}}})})).status,403);
 assert.equal((await fetch(`${base}/adminProfiles`)).status,403);
 // Deliberately expose the remaining risk in this test; it is not a full lockdown.
 assert.equal((await fetch(`${base}/teams/legacy`)).status,200);
 assert.equal((await fetch(`${base}/teams/legacy`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:{balance:{integerValue:'999999999'}}})})).status,200);
 console.log(`PASS: ${rejected} client namespace attacks denied, Admin SDK writes work, existing admin boundary retained.`);
 console.log('KNOWN CRITICAL LIMITATION: legacy team read and balance forgery remain public; do not activate rewards or present these rules as complete game security.');
}finally{await app.delete();}
