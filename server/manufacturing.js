import {randomUUID} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {PROD_CATS} from '../src/game/PROD_CATS.js';
import {getProdCost} from '../src/game/getProdCost.js';
import {fmt} from '../src/game/fmt.js';
const cents=n=>{if(typeof n!=='number'||!Number.isFinite(n)||!Number.isSafeInteger(Math.round(n*100))||Math.abs(n*100-Math.round(n*100))>0.00001)throw Error('Valor inválido.');return Math.round(n*100);};
export async function manufacture(db,uid,input,{now=Date.now()}={}){
 const keys=['requestId','productId','name','desc','img','cat','power','price','quantity'];
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!keys.includes(k))||!validDocumentId(input.requestId)||(input.productId!==null&&!validDocumentId(input.productId)))throw Error('Produção inválida.');
 if(typeof input.name!=='string'||!input.name.trim()||input.name.length>200||typeof input.desc!=='string'||input.desc.length>10000||typeof input.img!=='string'||input.img.length>500000||!Object.hasOwn(PROD_CATS,input.cat)||!Number.isSafeInteger(input.power)||input.power<0||input.power>100||!Number.isSafeInteger(input.quantity)||input.quantity<1||input.quantity>200)throw Error('Dados do produto inválidos.');
 const price=cents(input.price),unitCost=cents(getProdCost(input.cat,input.power)),cost=unitCost*input.quantity;
 if(price<unitCost||!Number.isSafeInteger(cost))throw Error('Preço abaixo do custo de produção.');
 const productId=input.productId??randomUUID(),newsId=randomUUID();
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));if(account?.active!==true||account.type!=='COMPANY'||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const owner=await read(ref('accountEntityOwners',`companies_${account.entityId}`));if(owner?.uid!==uid||owner.type!=='COMPANY'||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const companyRef=ref('companies',account.entityId),company=await read(companyRef);if(company?.status!=='ACTIVE')throw Error('Empresa indisponível.');
  const receiptRef=ref(`serverConfig/manufacture_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  const signature=JSON.stringify([account.entityId,...keys.filter(k=>k!=='requestId').map(k=>input[k])]);
  if(receipt){if(receipt.signature!==signature)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  const productRef=ref('products',productId),old=await read(productRef);
  if(input.productId&&(!old||old.companyId!==account.entityId))throw Error('Produto não pertence à empresa.');
  if(!input.productId&&old)throw Error('Identificador indisponível.');
  const stock=old?.stock??0;if(!Number.isSafeInteger(stock)||stock<0||!Number.isSafeInteger(stock+input.quantity))throw Error('Estoque inválido.');
  if(stock>0&&(old.cat!==input.cat||Number(old.power)!==input.power))throw Error('Esgote o estoque ou crie outro produto para alterar categoria ou poder.');
  const balance=cents(company.balance??0);if(balance<cost||!Number.isSafeInteger(balance-cost))throw Error('Saldo insuficiente para produzir.');
  if(old)cents(old.price);
  const data={name:input.name,desc:input.desc,img:input.img,cat:input.cat,power:input.power,price:price/100,stock:stock+input.quantity,companyId:account.entityId,productionCost:unitCost/100};
  tx.update(companyRef,{balance:(balance-cost)/100});tx.set(productRef,{...(old??{}),...data});
  const text=!old?`🛍️ **NOVIDADE**\nA **${company.name||'Empresa'}** lançou: **${input.name}** (${PROD_CATS[input.cat]}) por ${fmt(input.price)}.`:input.price<old.price?`🚨 **PROMOÇÃO!**\nA **${company.name||'Empresa'}** baixou o preço de **${input.name}**!\nDe: ${fmt(old.price)} ➝ Por: ${fmt(input.price)}`:null;
  if(text)tx.set(ref('news',newsId),{text,type:'biz',date:now,likes:[]});
  const result={productId,quantity:input.quantity,stock:data.stock,cost:cost/100,duplicate:false};tx.set(receiptRef,{signature,createdAt:now,result});return result;
 });
}
