import assert from 'node:assert/strict';
export async function verifyEquipment({db,auth,handle}){
 await auth.createUser({uid:'equip-user',email:'equip@example.test',emailVerified:true});
 const signed=await fetch('http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('equip-user'),returnSecureToken:true})});const {idToken}=await signed.json();assert.ok(idToken);
 await db.doc('authAccounts/equip-user').set({active:true,type:'PLAYER',entityId:'equip-player',revision:1});await db.doc('accountEntityOwners/players_equip-player').set({uid:'equip-user',type:'PLAYER',entityId:'equip-player'});
 await db.doc('players/equip-player').set({status:'ACTIVE',teamId:'FREE'});
 await db.doc('sales/equip-item').set({buyerId:'equip-player',cat:'CHUTEIRA',productName:'Chuteira',power:'50'});
 await db.doc('sales/equip-foreign').set({buyerId:'foreign',cat:'LUVAS',productName:'Luvas',power:20});
 const request=body=>handle(new Request('https://example.test/equip-item',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));
 const input={requestId:'equip-once',itemId:'equip-item'};
 assert.equal((await request({...input,power:999})).status,400);assert.equal((await request({...input,itemId:'equip-foreign'})).status,400);
 await db.doc('matchParticipantLocks/player_equip-player').set({runId:'blocked'});assert.equal((await request(input)).status,400);await db.doc('matchParticipantLocks/player_equip-player').delete();
 const responses=await Promise.all([request(input),request(input)]);for(const r of responses)assert.equal(r.status,200,await r.clone().text());const results=await Promise.all(responses.map(r=>r.json()));assert.deepEqual(results.map(r=>r.duplicate).sort(),[false,true]);
 assert.equal((await db.doc('sales/equip-item').get()).exists,false);assert.equal((await db.doc('sales/equip-foreign').get()).exists,true);
 assert.deepEqual((await db.doc('players/equip-player').get()).data().equippedItem,{id:'equip-item',name:'Chuteira',cat:'CHUTEIRA',power:50});
 assert.equal((await request({...input,requestId:'another'})).status,400);
 assert.equal((await db.collection('serverConfig/equip_equip-user/operations').get()).size,1);
 console.log('PASS: authenticated equip rejects forged/foreign items and locks, concurrent retry moves inventory exactly once.');
}
