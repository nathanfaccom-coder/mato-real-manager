import assert from 'node:assert/strict';
export async function verifyStaffConsumables({db,auth,handle}){
 await auth.createUser({uid:'staff-consume-user',email:'staff-consume@example.test',emailVerified:true});
 const signed=await fetch('http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('staff-consume-user'),returnSecureToken:true})});const {idToken}=await signed.json();assert.ok(idToken);
 await db.doc('authAccounts/staff-consume-user').set({active:true,type:'COACH',entityId:'staff-consumer',revision:1});await db.doc('accountEntityOwners/users_staff-consumer').set({uid:'staff-consume-user',type:'COACH',entityId:'staff-consumer'});
 await db.doc('users/staff-consumer').set({status:'ACTIVE',type:'COACH',teamId:'staff-consumer-team',energy:70});
 await db.doc('teams/staff-consumer-team').set({status:'ACTIVE'});
 await db.doc('sales/consume-item').set({buyerId:'staff-consumer',cat:'CONSUMIVEL',power:'30'});
 await db.doc('sales/consume-foreign').set({buyerId:'foreign',cat:'LUVAS',productName:'Luvas',power:20});
 const request=body=>handle(new Request('https://example.test/staff-consume',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));
 const input={requestId:'consume-once',itemId:'consume-item'};
 assert.equal((await request({...input,power:999})).status,400);assert.equal((await request({...input,itemId:'consume-foreign'})).status,400);
 await db.doc('matchParticipantLocks/team_staff-consumer-team').set({runId:'blocked'});assert.equal((await request(input)).status,400);await db.doc('matchParticipantLocks/team_staff-consumer-team').delete();
 const responses=await Promise.all([request(input),request(input)]);for(const r of responses)assert.equal(r.status,200,await r.clone().text());const results=await Promise.all(responses.map(r=>r.json()));assert.deepEqual(results.map(r=>r.duplicate).sort(),[false,true]);
 assert.equal((await db.doc('sales/consume-item').get()).exists,false);assert.equal((await db.doc('sales/consume-foreign').get()).exists,true);
 assert.equal((await db.doc('users/staff-consumer').get()).data().energy,100);
 assert.equal((await db.doc('users/staff-consumer').get()).data().toxicity,1);
 assert.equal((await request({...input,requestId:'another'})).status,400);
 assert.equal((await db.collection('serverConfig/staffConsume_staff-consume-user/operations').get()).size,1);
 console.log('PASS: authenticated staff consumption rejects forged/foreign items and locks, concurrent retry consumes inventory and restores energy exactly once.');
}
