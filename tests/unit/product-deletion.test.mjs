import test from 'node:test';
import assert from 'node:assert/strict';
import {deleteProduct} from '../../server/product-deletion.js';
import {purchase} from '../../server/purchases.js';
import {manufacture} from '../../server/manufacturing.js';
import {memoryDB} from '../helpers/memory-db.mjs';
import {OWNER_UID} from '../../src/admin/permissions.js';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'COMPANY',entityId:'c',revision:1},'accountEntityOwners/companies_c':{uid:'u',type:'COMPANY',entityId:'c'},'companies/c':{status:'ACTIVE',balance:10000},'products/p':{companyId:'c',name:'Chuteira',cat:'CHUTEIRA',power:10,price:1200,stock:2},'sales/owned':{productOriginalId:'p',buyerId:'player'}});
const input={requestId:'r',productId:'p'};
test('company deletion is once-only audited and preserves purchased inventory and balance',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([deleteProduct(db,'u',input),deleteProduct(db,'u',input)]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(db.values.has('products/p'),false);assert.ok(db.values.has('sales/owned'));assert.equal(db.values.get('companies/c').balance,10000);assert.equal(db.values.get('serverConfig/productDelete_u/operations/r').removed.stock,2);await assert.rejects(deleteProduct(db,'u',{...input,productId:'other'}));
});
test('foreign product, invalid owner/role and forged admin flag reject without mutation',async()=>{
 for(const [path,patch] of [['products/p',{companyId:'foreign'}],['authAccounts/u',{type:'PLAYER'}],['accountEntityOwners/companies_c',{uid:'other'}],['companies/c',{status:'PENDING'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(deleteProduct(db,'u',input));assert.deepEqual([...db.values],before);}
 await assert.rejects(deleteProduct(memoryDB(seed()),'u',{...input,admin:true}));await assert.rejects(deleteProduct(memoryDB(seed()),'u',input,{admin:true}));
});
test('only owner or active companies ADM can delete other company catalog; revoked permissions block replay',async()=>{
 for(const uid of [OWNER_UID,'adm']){const s=seed();s['adminProfiles/adm']={active:true,permissions:['companies']};const db=memoryDB(s);await deleteProduct(db,uid,input,{admin:true});assert.equal(db.values.has('products/p'),false);}
 const s=seed();s['adminProfiles/adm']={active:true,permissions:['finance']};await assert.rejects(deleteProduct(memoryDB(s),'adm',input,{admin:true}));s['adminProfiles/adm'].permissions=['companies'];const db=memoryDB(s);await deleteProduct(db,'adm',input,{admin:true});db.values.get('adminProfiles/adm').active=false;await assert.rejects(deleteProduct(db,'adm',input,{admin:true}));
});
test('restocking a deleted product cannot recreate it or debit a failed manufacturing',async()=>{
 const db=memoryDB(seed());await deleteProduct(db,'u',input);await assert.rejects(manufacture(db,'u',{requestId:'m',productId:'p',name:'Chuteira',desc:'',img:'',cat:'CHUTEIRA',power:10,price:1200,quantity:1}));assert.equal(db.values.get('companies/c').balance,10000);assert.equal(db.values.has('products/p'),false);
});
test('catalog deletion blocks later checkout without touching buyer funds',async()=>{
 const s=seed();s['authAccounts/b']={active:true,type:'PLAYER',entityId:'buyer',revision:1};s['accountEntityOwners/players_buyer']={uid:'b',type:'PLAYER',entityId:'buyer'};s['players/buyer']={status:'ACTIVE',balance:2000};const db=memoryDB(s);await deleteProduct(db,'u',input);await assert.rejects(purchase(db,'b',{requestId:'buy',productId:'p',sellerId:'c',giftPlayerId:null,expectedPrice:1200}));assert.equal(db.values.get('players/buyer').balance,2000);
});
