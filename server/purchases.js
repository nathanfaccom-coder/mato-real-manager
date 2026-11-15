import {randomUUID} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {brazilDay} from '../src/matches/policy.js';
const collections={TEAM:'teams',PLAYER:'players',COACH:'users',DOCTOR:'users',SCOUT:'users',ASSISTANT:'users'};
const fameCats=new Set(['VEICULO','IMOVEL','TECNOLOGIA','LUXO']);
const cents=value=>{if(typeof value!=='number'||!Number.isFinite(value)||!Number.isSafeInteger(Math.round(value*100))||Math.abs(value*100-Math.round(value*100))>0.00001)throw Error('Valor monetário inválido.');return Math.round(value*100);};
export async function purchase(db,uid,input,{now=Date.now()}={}){
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['requestId','productId','sellerId','giftPlayerId','expectedPrice'].includes(k))||!['requestId','productId','sellerId'].every(k=>validDocumentId(input[k]))||(input.giftPlayerId!==null&&!validDocumentId(input.giftPlayerId)))throw Error('Compra inválida.');
 const expected=cents(input.expectedPrice);if(expected<0)throw Error('Preço inválido.');
 const saleId=randomUUID(),newsId=randomUUID(),today=brazilDay(now);
 const d=new Date(`${today}T12:00:00Z`).toUTCString().slice(0,16).replace(',','').split(' '),legacyDate=`${d[0]} ${d[2]} ${d[1]} ${d[3]}`;
 return db.runTransaction(async tx=>{
  const ref=(c,id)=>db.collection(c).doc(id),read=async r=>{const s=await tx.get(r);return s.exists?s.data():null;};
  const gate=await read(ref('serverConfig','matchAutomation'));if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração desativada.');
  const account=await read(ref('authAccounts',uid));
  if(account?.active!==true||!Object.hasOwn(collections,account.type)||!validDocumentId(account.entityId)||!Number.isSafeInteger(account.revision)||account.revision<1)throw Error('Vínculo inválido.');
  const collection=collections[account.type],owner=await read(ref('accountEntityOwners',`${collection}_${account.entityId}`));
  if(owner?.uid!==uid||owner.type!==account.type||owner.entityId!==account.entityId)throw Error('Titular inválido.');
  const buyerRef=ref(collection,account.entityId),buyer=await read(buyerRef);
  if(buyer?.status!=='ACTIVE'||(collection==='users'&&buyer.type!==account.type))throw Error('Comprador indisponível.');
  const receiptRef=ref(`serverConfig/purchase_${uid}/operations`,input.requestId),receipt=await read(receiptRef);
  const signature=JSON.stringify([account.type,account.entityId,input.productId,input.sellerId,input.giftPlayerId,expected]);
  if(receipt){if(receipt.signature!==signature)throw Error('Pedido já utilizado.');return {...receipt.result,duplicate:true};}
  const productRef=ref('products',input.productId),product=await read(productRef),sellerRef=ref('companies',input.sellerId),seller=await read(sellerRef);
  const recipientRef=input.giftPlayerId?ref('players',input.giftPlayerId):buyerRef,recipient=input.giftPlayerId?await read(recipientRef):buyer;
  if(!product||seller?.status!=='ACTIVE'||product.companyId!==input.sellerId||recipient?.status!=='ACTIVE')throw Error('Produto, loja ou destinatário indisponível.');
  for(const [kind,id] of [[collection==='players'?'player':collection==='teams'?'team':null,account.entityId],['team',collection==='teams'?null:buyer.teamId],['player',input.giftPlayerId],['team',input.giftPlayerId?recipient.teamId:null]]){
   if(kind&&id&&id!=='FREE'){if(!validDocumentId(id))throw Error('Vínculo de clube inválido.');if(await read(ref('matchParticipantLocks',`${kind}_${id}`)))throw Error('Compra indisponível durante partida.');}
  }
  const price=cents(product.price),balance=cents(buyer.balance??0),sellerBalance=cents(seller.balance??0);
  if(price<0||price!==expected)throw Error('O preço mudou. Confira o produto novamente.');
  if(!Number.isSafeInteger(product.stock)||product.stock<1)throw Error('Produto esgotado.');
  if(balance<price)throw Error('Saldo insuficiente.');
  if(!Number.isSafeInteger(balance-price)||!Number.isSafeInteger(sellerBalance+price))throw Error('Saldo inválido.');
  const raw=product.power??0,power=typeof raw==='number'?raw:typeof raw==='string'&&/^\d+$/.test(raw)?Number(raw):NaN;
  if(!Number.isSafeInteger(power)||power<0||typeof product.name!=='string'||typeof product.cat!=='string')throw Error('Produto inválido.');
  const tracker=buyer.giftTracker??{},count=[today,legacyDate].includes(tracker.date)?tracker.count??0:0;
  if(input.giftPlayerId&&(!Number.isSafeInteger(count)||count<0||count>=7))throw Error('Limite diário de presentes atingido.');
  const fameBonus=fameCats.has(product.cat)?power*100:0,fame=recipient.fame??0;
  if(!Number.isSafeInteger(fameBonus)||!Number.isSafeInteger(fame)||!Number.isSafeInteger(fame+fameBonus))throw Error('Fama inválida.');
  const updates={balance:(balance-price)/100};if(input.giftPlayerId)updates.giftTracker={date:today,count:count+1};
  // Merge self-gift effects so no update can overwrite the debit.
  if(input.giftPlayerId&&fameBonus>0&&collection==='players'&&input.giftPlayerId===account.entityId)updates.fame=fame+fameBonus;
  tx.update(buyerRef,updates);tx.update(sellerRef,{balance:(sellerBalance+price)/100});tx.update(productRef,{stock:product.stock-1});
  if(input.giftPlayerId&&fameBonus>0&&!(collection==='players'&&input.giftPlayerId===account.entityId))tx.update(recipientRef,{fame:fame+fameBonus});
  tx.set(ref('sales',saleId),{companyId:input.sellerId,buyerId:input.giftPlayerId??account.entityId,buyerType:input.giftPlayerId?'PLAYER':account.type,buyerName:recipient.name||'',giftedBy:input.giftPlayerId?buyer.name||'':null,productOriginalId:input.productId,productName:product.name,price:price/100,cost:0,profit:price/100,img:product.img||null,cat:product.cat,power,fameGained:fameBonus,date:now,purchaseRequestId:input.requestId});
  if(input.giftPlayerId&&(fameBonus>0||price>50000000))tx.set(ref('news',newsId),{text:`🎁 **MIMO DE LUXO!**\nO ${buyer.name||'Comprador'} acabou de enviar um(a) **${product.name}** caríssimo(a) de presente para **${recipient.name||'Jogador'}**! O que será que está por trás dessa generosidade? 👀`,type:'biz',date:now,likes:[]});
  const result={saleId,fameBonus,balance:updates.balance,duplicate:false};tx.set(receiptRef,{signature,createdAt:now,result});return result;
 });
}
