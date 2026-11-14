import assert from 'node:assert/strict';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {createIdentityAccess} from '../../src/services/identity-access.js';

export async function verifyIdentityLifecycle(adminAuth){
  assert.equal(process.env.FIREBASE_AUTH_EMULATOR_HOST,'127.0.0.1:19099');
  const projectId='demo-mato-real',email='migration@example.test';
  let sequence=0;
  const createApp=()=>{
    const app=firebase.initializeApp({projectId,apiKey:'fake',authDomain:'demo-mato-real.firebaseapp.com'},`identity-emulator-${++sequence}`);
    app.auth().useEmulator('http://127.0.0.1:19099',{disableWarnings:true});
    return app;
  };
  const service=createIdentityAccess({createApp});
  const codes=async()=>{
    const response=await fetch(`http://127.0.0.1:19099/emulator/v1/projects/${projectId}/oobCodes`);
    assert.equal(response.status,200);
    return (await response.json()).oobCodes;
  };
  const created=await service.register(email,'first-password-123');
  assert.equal(created.emailSent,true);assert.equal(created.verified,false);
  assert.equal((await adminAuth.getUser(created.uid)).emailVerified,false);
  const verification=(await codes()).find(c=>c.email===email&&c.requestType==='VERIFY_EMAIL');
  assert.ok(verification?.oobCode);
  const actionApp=createApp();
  try{await actionApp.auth().applyActionCode(verification.oobCode);}finally{await actionApp.delete();}
  assert.equal((await adminAuth.getUser(created.uid)).emailVerified,true);
  assert.deepEqual(await service.verify(email,'first-password-123'),{uid:created.uid,verified:true,emailSent:false});
  await service.recover(email);
  const recovery=(await codes()).find(c=>c.email===email&&c.requestType==='PASSWORD_RESET');
  assert.ok(recovery?.oobCode);
  const resetApp=createApp();
  try{await resetApp.auth().confirmPasswordReset(recovery.oobCode,'replacement-password-123');}finally{await resetApp.delete();}
  await assert.rejects(service.verify(email,'first-password-123'));
  assert.equal((await service.verify(email,'replacement-password-123')).uid,created.uid);
  assert.equal(firebase.apps.length,0);
  await adminAuth.deleteUser(created.uid);
  console.log('PASS: client SDK identity registration, email verification, password recovery, old-password rejection, isolated app cleanup (emulator only).');
}
