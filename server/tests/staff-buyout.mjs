import assert from 'node:assert/strict';
export async function verifyStaffBuyout({db,auth,handle}){
 await auth.createUser({uid:'buyout-user',email:'buyout@example.test',emailVerified:true});await db.doc('authAccounts/buyout-user').set({active:true,type:'COACH',entityId:'buyout-staff',revision:1});await db.doc('accountEntityOwners/users_buyout-staff').set({uid:'buyout-user',type:'COACH',entityId:'buyout-staff'});await db.doc('teams/buyout-team').set({status:'ACTIVE',balance:10.05});await db.doc('users/buyout-staff').set({status:'ACTIVE',type:'COACH',teamId:'buyout-team',salary:2500,clause:10000.04,balance:20000.10,contract:2});
 const signed=await fetch('http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('buyout-user'),returnSecureToken:true})});const {idToken}=await signed.json();assert.ok(idToken);
 const call=(route,body)=>handle(new Request('https://example.test/'+route,{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));assert.equal((await call('staff-buyout-review',{staffId:'other'})).status,400);
 const proposal={requestId:'proposal-once',kind:'RAISE',requestedSalary:3000.01};
 assert.equal((await call('staff-contract-request',{...proposal,staffId:'other'})).status,409);
 const proposals=await Promise.all([call('staff-contract-request',proposal),call('staff-contract-request',proposal)]);
 for(const r of proposals)assert.equal(r.status,200,await r.clone().text());
 const results=await Promise.all(proposals.map(r=>r.json()));assert.equal(results[0].offerId,results[1].offerId);assert.deepEqual(results.map(r=>r.duplicate).sort(),[false,true]);
 const offer=(await db.doc('offers/'+results[0].offerId).get()).data();assert.equal(offer.recipientId,'buyout-team');assert.equal(offer.senderId,'buyout-staff');assert.equal(offer.requestedSalary,3000.01);assert.equal((await db.doc('users/buyout-staff').get()).data().salary,2500);
 console.log('PASS: authenticated contract proposal derives staff/club, rejects injection and replays concurrent submission without changing salary.');
 const q=await call('staff-buyout-review',{});assert.equal(q.status,200);const review=await q.json(),input={requestId:'once',quote:review.quote};assert.equal(review.fine,10000.04);
 await db.doc('users/buyout-staff').update({clause:9000});assert.equal((await call('staff-buyout',input)).status,409);await db.doc('users/buyout-staff').update({clause:10000.04});
 await db.doc('matchParticipantLocks/team_buyout-team').set({runId:'m'});assert.equal((await call('staff-buyout',input)).status,400);await db.doc('matchParticipantLocks/team_buyout-team').delete();
 const rs=await Promise.all([call('staff-buyout',input),call('staff-buyout',input)]);for(const r of rs)assert.equal(r.status,200,await r.clone().text());assert.deepEqual((await Promise.all(rs.map(r=>r.json()))).map(r=>r.duplicate).sort(),[false,true]);assert.equal((await db.doc('teams/buyout-team').get()).data().balance,10010.09);const staff=(await db.doc('users/buyout-staff').get()).data();assert.equal(staff.balance,10000.06);assert.equal(staff.teamId,'FREE');assert.equal(staff.contract,0);
 console.log('PASS: authenticated buyout derives subject, rejects stale quote/locks, pays club once and releases contract atomically.');
}
