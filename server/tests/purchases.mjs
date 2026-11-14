import assert from 'node:assert/strict';
export async function verifyPurchases({db,auth,handle,ownerToken}){
 await auth.createUser({uid:'buyer-user',email:'buyer@example.test',emailVerified:true});
 const signed=await fetch('http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('buyer-user'),returnSecureToken:true})});const {idToken}=await signed.json();assert.ok(idToken);
 await db.doc('authAccounts/buyer-user').set({active:true,type:'PLAYER',entityId:'buyer-player',revision:1});await db.doc('accountEntityOwners/players_buyer-player').set({uid:'buyer-user',type:'PLAYER',entityId:'buyer-player'});await db.doc('players/buyer-player').set({status:'ACTIVE',balance:100.10});await db.doc('companies/shop').set({status:'ACTIVE',balance:10.05});await db.doc('products/product').set({companyId:'shop',price:20.05,stock:1,cat:'CHUTEIRA',name:'Chuteira',power:50});
 const request=body=>handle(new Request('https://example.test/purchase',{method:'POST',headers:{Authorization:`Bearer ${idToken}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));const input={requestId:'once',productId:'product',sellerId:'shop',giftPlayerId:null,expectedPrice:20.05};
 assert.equal((await request({...input,power:999})).status,400);assert.equal((await request({...input,expectedPrice:1})).status,400);
 const rs=await Promise.all([request(input),request(input)]);for(const r of rs)assert.equal(r.status,200,await r.clone().text());const results=await Promise.all(rs.map(r=>r.json()));assert.deepEqual(results.map(r=>r.duplicate).sort(),[false,true]);assert.equal(results[0].saleId,results[1].saleId);assert.equal((await db.doc('players/buyer-player').get()).data().balance,80.05);assert.equal((await db.doc('companies/shop').get()).data().balance,30.10);assert.equal((await db.doc('products/product').get()).data().stock,0);assert.equal((await db.doc('sales/'+results[0].saleId).get()).data().buyerType,'PLAYER');assert.equal((await request({...input,requestId:'next'})).status,400);
 // Obtain TEAM binding through the actual owner-only migration endpoint. The
 // trusted-session UI maps TEAM to USER, but backend actions must use TEAM.
 await auth.createUser({uid:'team-buyer',email:'team-buyer@example.test',emailVerified:true});
 await db.doc('teams/shopper-club').set({status:'ACTIVE',name:'Clube comprador',balance:100.10});
 const bound=await handle(new Request('https://example.test/account-bind',{method:'POST',headers:{Authorization:`Bearer ${ownerToken}`,'Content-Type':'application/json'},body:JSON.stringify({uid:'team-buyer',type:'TEAM',entityId:'shopper-club'})}));
 assert.equal(bound.status,200,await bound.clone().text());assert.equal((await db.doc('authAccounts/team-buyer').get()).data().type,'TEAM');
 const teamSigned=await fetch('http://127.0.0.1:19099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:await auth.createCustomToken('team-buyer'),returnSecureToken:true})});const teamToken=(await teamSigned.json()).idToken;assert.ok(teamToken);
 const teamRequest=body=>handle(new Request('https://example.test/purchase',{method:'POST',headers:{Authorization:`Bearer ${teamToken}`,'Content-Type':'application/json'},body:JSON.stringify(body)}));
 await db.doc('products/product').update({stock:1});
 await db.doc('matchParticipantLocks/team_shopper-club').set({runId:'blocked'});assert.equal((await teamRequest(input)).status,400);await db.doc('matchParticipantLocks/team_shopper-club').delete();
 const teamResponses=await Promise.all([teamRequest(input),teamRequest(input)]);for(const response of teamResponses)assert.equal(response.status,200,await response.clone().text());
 const teamResults=await Promise.all(teamResponses.map(r=>r.json()));assert.deepEqual(teamResults.map(r=>r.duplicate).sort(),[false,true]);
 assert.equal((await db.doc('teams/shopper-club').get()).data().balance,80.05);assert.equal((await db.doc('companies/shop').get()).data().balance,50.15);assert.equal((await db.doc('products/product').get()).data().stock,0);
 const teamSale=(await db.doc('sales/'+teamResults[0].saleId).get()).data();assert.equal(teamSale.buyerId,'shopper-club');assert.equal(teamSale.buyerType,'TEAM');
 console.log('PASS: real owner-migrated TEAM account purchases once, team match lock enforced, inventory typed TEAM and exact payment preserved.');
 console.log('PASS: authenticated purchase rejects forged effects/price; concurrent retry charges exact cents and creates inventory only once.');
}
