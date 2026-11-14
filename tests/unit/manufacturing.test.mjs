import test from 'node:test';
import assert from 'node:assert/strict';
import {manufacture} from '../../server/manufacturing.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const seed=()=>({'serverConfig/matchAutomation':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'COMPANY',entityId:'c',revision:1},'accountEntityOwners/companies_c':{uid:'u',type:'COMPANY',entityId:'c'},'companies/c':{status:'ACTIVE',balance:10000,name:'Loja'}});
const input={requestId:'r',productId:null,name:'Chuteira',desc:'Teste',img:'',cat:'CHUTEIRA',power:10,price:1200,quantity:2};
test('manufacturing debits canonical cost and creates stock/news once under duplicate requests',async()=>{
 const db=memoryDB(seed());const r=await Promise.all([manufacture(db,'u',input),manufacture(db,'u',input)]);assert.deepEqual(r.map(x=>x.duplicate),[false,true]);assert.equal(r[0].productId,r[1].productId);assert.equal(db.values.get('companies/c').balance,8000);assert.equal(db.values.get('products/'+r[0].productId).stock,2);assert.equal([...db.values.keys()].filter(k=>k.startsWith('news/')).length,1);await assert.rejects(manufacture(db,'u',{...input,quantity:3}),/utilizado/);
});
test('restocking uses current stock and preserves ownership while promotion is atomic',async()=>{
 const s=seed();s['products/p']={companyId:'c',cat:'CHUTEIRA',power:10,price:1500,stock:3};const db=memoryDB(s);const r=await Promise.all(['a','b'].map(requestId=>manufacture(db,'u',{...input,requestId,productId:'p'})));assert.equal(db.values.get('products/p').stock,7);assert.equal(db.values.get('companies/c').balance,6000);assert.equal([...db.values.keys()].filter(k=>k.startsWith('news/')).length,1);assert.equal(r.length,2);
});
test('invalid production, ownership, price floor and free upgrade fail without debit',async()=>{
 for(const body of [{...input,cost:0},{...input,quantity:201},{...input,power:101},{...input,price:999},{...input,cat:'__proto__'}])await assert.rejects(manufacture(memoryDB(seed()),'u',body));
 for(const [path,patch] of [['authAccounts/u',{type:'PLAYER'}],['accountEntityOwners/companies_c',{uid:'other'}],['companies/c',{balance:1999}],['companies/c',{status:'PENDING'}]]){const s=seed();s[path]={...s[path],...patch};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(manufacture(db,'u',input));assert.deepEqual([...db.values],before);}
 for(const companyId of ['c','other']){const s=seed();s['products/p']={companyId,cat:'CHUTEIRA',power:0,price:1,stock:10};const db=memoryDB(s),before=structuredClone([...db.values]);await assert.rejects(manufacture(db,'u',{...input,productId:'p'}));assert.deepEqual([...db.values],before);}
});
test('sold-out product can change effects; competing production cannot overspend',async()=>{
 const s=seed();s['companies/c'].balance=2000;s['products/p']={companyId:'c',stock:0,cat:'SAUDE',power:1,price:15};const db=memoryDB(s);const r=await Promise.allSettled(['a','b'].map(requestId=>manufacture(db,'u',{...input,requestId,productId:'p'})));assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(db.values.get('companies/c').balance,0);assert.equal(db.values.get('products/p').cat,'CHUTEIRA');
});
