import assert from 'node:assert/strict';
export async function verifySoloTraining({db,auth,handle}){
 await auth.createUser({uid:'solo-user',email:'solo@example.test',emailVerified:true});
 const signed=await fetch('http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('solo-user'),returnSecureToken:true})});const {idToken}=await signed.json();assert.ok(idToken);
 await db.doc('authAccounts/solo-user').set({active:true,type:'PLAYER',entityId:'solo-player',revision:1});await db.doc('accountEntityOwners/players_solo-player').set({uid:'solo-user',type:'PLAYER',entityId:'solo-player'});
 await db.doc('players/solo-player').set({status:'ACTIVE',teamId:'FREE',position:'ATA',energy:70,xp:0,attributes:{shot:60},equippedItem:{id:'equipped',power:50}});
 const request=body=>handle(new Request('https://example.test/solo-training',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));
 const input={requestId:'solo-once',type:'CHUTE'};
 assert.equal((await request({...input,xp:999})).status,400);
 await db.doc('matchParticipantLocks/player_solo-player').set({runId:'blocked'});assert.equal((await request(input)).status,400);await db.doc('matchParticipantLocks/player_solo-player').delete();
 const responses=await Promise.all([request(input),request(input)]);for(const r of responses)assert.equal(r.status,200,await r.clone().text());const results=await Promise.all(responses.map(r=>r.json()));assert.deepEqual(results.map(r=>r.duplicate).sort(),[false,true]);assert.deepEqual({...results[0],duplicate:false},{...results[1],duplicate:false});
 const p=(await db.doc('players/solo-player').get()).data();assert.equal(p.energy,70-results[0].energyCost);assert.equal(p.xp,results[0].xp);assert.equal(!!p.equippedItem,results[0].injured);assert.equal((await db.collection('serverConfig/solo_solo-user/operations').get()).size,1);
 console.log('PASS: authenticated solo training locks, forged rewards denied, concurrent retry charges once, equipment consumed only on completed training.');
}
