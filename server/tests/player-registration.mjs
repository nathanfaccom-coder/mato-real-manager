import assert from 'node:assert/strict';
export async function verifyPlayerRegistration({db,auth,handle,ownerToken}){
 assert.equal(process.env.FIREBASE_AUTH_EMULATOR_HOST,'127.0.0.1:19099');
 await db.doc('serverConfig/playerRegistration').set({enabled:true,schemaVersion:1});
 await auth.createUser({uid:'prospect',email:'prospect@example.test',emailVerified:true});
 const response=await fetch(`http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('prospect'),returnSecureToken:true})});
 const {idToken}=await response.json();assert.ok(idToken);
 const request=(route,token,body)=>handle(new Request(`https://example.test/${route}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));
 const input={name:'Prospect',position:'ATA',nationality:'MTR',instagram:'private.prospect',expectedRevision:0};
 assert.equal((await request('player-apply',idToken,{...input,balance:999})).status,400);
 const submitted=await request('player-apply',idToken,input);assert.equal(submitted.status,200,await submitted.clone().text());
 const pending=await submitted.json();assert.equal(pending.status,'PENDING');
 const retry=await request('player-apply',idToken,input);assert.equal(retry.status,200);assert.equal((await retry.json()).duplicate,true);
 assert.equal((await db.doc(`players/${pending.playerId}`).get()).exists,false);
 assert.equal((await request('player-application',idToken,{uid:'club-owner'})).status,400);
 assert.equal((await request('player-application-review',idToken,{uid:'prospect'})).status,400);
 const review=await request('player-application-review',ownerToken,{uid:'prospect'});assert.equal(review.status,200);
 assert.equal((await review.json()).application.profile.instagram,'private.prospect');
 const decision={uid:'prospect',approve:true,expectedRevision:1,reason:'Checked in emulator'};
 const approvals=await Promise.all([request('player-application-decide',ownerToken,decision),request('player-application-decide',ownerToken,decision)]);
 for(const approval of approvals)assert.equal(approval.status,200,await approval.clone().text());
 const player=(await db.doc(`players/${pending.playerId}`).get()).data();
 assert.equal(player.overall,45);assert.equal(player.balance,0);assert.equal(player.pendingXP,0);assert.equal(player.instagram,undefined);assert.equal(player.password,undefined);
 const session=await request('session',idToken,{});assert.equal(session.status,200);assert.deepEqual(await session.json(),{type:'PLAYER',entityId:pending.playerId,revision:1});
 assert.equal((await db.doc('playerApplications/prospect').get()).data().revision,2);
 console.log('PASS: authenticated private player application, forged fields/identity denied, owner review, concurrent atomic approval, clean public profile and trusted player session.');
}
