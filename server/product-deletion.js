import {validDocumentId} from '../src/matches/validate.js';
import {OWNER_UID} from '../src/admin/permissions.js';
export async function deleteProduct(db,uid,input,{admin=false,now=Date.now()}={}){
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['requestId','productId'].includes(k))||!validDocumentId(input.requestId)||!validDocumentId(input.productId))throw Error('Pedido inválido.');
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  let companyId=null;
  if(admin){
   if(uid!==OWNER_UID){const profile=await read(ref('adminProfiles',uid));if(profile?.active!==true||!Array.isArray(profile.permissions)||!profile.permissions.includes('companies'))throw Error('Permissão de empresas necessária.');}
  }else{
   const account=await read(ref('authAccounts',uid));if(account?.active!==true||account.type!=='COMPANY'||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
   companyId=account.entityId;const owner=await read(ref('accountEntityOwners',`companies_${companyId}`));if(owner?.uid!==uid||owner.type!=='COMPANY'||owner.entityId!==companyId)throw Error('Titular inválido.');
   if((await read(ref('companies',companyId)))?.status!=='ACTIVE')throw Error('Empresa indisponível.');
  }
  const receiptRef=ref(`serverConfig/${admin?'adminProductDelete':'productDelete'}_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  if(receipt){if(receipt.productId!==input.productId||receipt.companyId!==companyId)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  const productRef=ref('products',input.productId),product=await read(productRef);
  if(!product||(!admin&&product.companyId!==companyId))throw Error('Produto indisponível ou de outra empresa.');
  const result={productId:input.productId,deleted:true,duplicate:false};
  tx.delete(productRef);tx.set(receiptRef,{productId:input.productId,companyId,actorUid:uid,admin,createdAt:now,removed:{companyId:product.companyId??null,name:typeof product.name==='string'?product.name:'',stock:product.stock??null},result});return result;
 });
}
