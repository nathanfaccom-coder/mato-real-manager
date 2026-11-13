import test from 'node:test';
import assert from 'node:assert/strict';
import {purchase} from '../../server/purchases.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const now=Date.parse('2026-11-13T15:00:00Z');
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'PLAYER',entityId:'p',revision:1},'accountEntityOwners/players_p':{uid:'u',type:'PLAYER',entityId:'p'},'players/p':{status:'ACTIVE',balance:100.10,name:'Comprador'},'players/g':{status:'ACTIVE',name:'Presenteado',fame:2},'products/item':{companyId:'seller',name:'Chuteira',cat:'CHUTEIRA',power:'50',price:20.05,stock:1},'companies/seller':{status:'ACTIVE',balance:10.05}});
const input={requestId:'r',productId:'item',sellerId:'seller',giftPlayerId:null,expectedPrice:20.05};
test('atomic purchase uses exact cents and creates one canonical item on concurrent retry',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([purchase(db,'u',input,{now}),purchase(db,'u',input,{now})]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(r[0].saleId,r[1].saleId);assert.equal(db.values.get('players/p').balance,80.05);assert.equal(db.values.get('companies/seller').balance,30.10);assert.equal(db.values.get('products/item').stock,0);const sales=[...db.values].filter(([k])=>k.startsWith('sales/'));assert.equal(sales.length,1);assert.equal(sales[0][1].power,50);assert.equal(sales[0][1].buyerType,'PLAYER');
 await assert.rejects(purchase(db,'u',{...input,giftPlayerId:'g'},{now}),/utilizado/);
});
test('gift preserves fame, news, canonical recipient and daily limit including legacy date',async()=>{
 const s=seed();s['products/item'].cat='LUXO';s['products/item'].stock=2;s['players/p'].giftTracker={date:'Fri Nov 13 2026',count:6};const db=memoryDB(s);await purchase(db,'u',{...input,giftPlayerId:'g'},{now});assert.equal(db.values.get('players/g').fame,5002);assert.equal(db.values.get('players/p').giftTracker.count,7);assert.equal([...db.values.keys()].filter(k=>k.startsWith('news/')).length,1);await assert.rejects(purchase(db,'u',{...input,requestId:'next',giftPlayerId:'g'},{now}),/Limite/);
});
test('self gift retains debit and adds fame; ordinary luxury purchase leaves fame to existing use action',async()=>{
 for(const giftPlayerId of [null,'p']){const s=seed();s['products/item'].cat='LUXO';const db=memoryDB(s);await purchase(db,'u',{...input,giftPlayerId},{now});assert.equal(db.values.get('players/p').balance,80.05);assert.equal(db.values.get('players/p').fame,giftPlayerId?5000:undefined);}
});
test('competing purchases cannot oversell; invalid identity, lock, money, price and product fail without writes',async()=>{
 const db=memoryDB(seed());const r=await Promise.allSettled(['a','b'].map(requestId=>purchase(db,'u',{...input,requestId},{now})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);
 for(const [path,patch] of [['authAccounts/u',{type:'ADM'}],['accountEntityOwners/players_p',{uid:'other'}],['players/p',{balance:1}],['products/item',{price:21}],['products/item',{price:20.051}],['products/item',{stock:0.5}],['products/item',{companyId:'other'}],['products/item',{power:-1}],['companies/seller',{status:'PENDING'}],['matchParticipantLocks/player_p',{runId:'m'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(purchase(db,'u',input,{now}));assert.deepEqual([...db.values],before);}
 await assert.rejects(purchase(memoryDB(seed()),'u',{...input,power:900},{now}));
});
test('team and all staff buyers resolve balance from verified identity rather than client role',async()=>{
 for(const role of ['USER','COACH','DOCTOR','SCOUT','ASSISTANT']){const s=seed(),collection=role==='USER'?'teams':'users';s['authAccounts/u'].type=role;delete s['accountEntityOwners/players_p'];s[`accountEntityOwners/${collection}_p`]={uid:'u',type:role,entityId:'p'};s[`${collection}/p`]={status:'ACTIVE',type:role,balance:100.10};const db=memoryDB(s);const r=await purchase(db,'u',input,{now});assert.equal(db.values.get(`${collection}/p`).balance,80.05);assert.equal(db.values.get('players/p').balance,100.10);assert.equal(db.values.get('sales/'+r.saleId).buyerType,role);}
});
