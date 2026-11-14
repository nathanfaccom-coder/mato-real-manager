import {OWNER_UID} from '../src/admin/permissions.js';
import {validDocumentId} from '../src/matches/validate.js';
export const GAME_ACCOUNTS=Object.freeze({TEAM:'teams',PLAYER:'players',COMPANY:'companies',PRESS:'newspapers',PRESS_WORKER:'journalists',COACH:'users',DOCTOR:'users',SCOUT:'users',ASSISTANT:'users'});
const own=(obj,key)=>Object.hasOwn(obj,key);
function only(input,keys){
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!keys.includes(k)))throw Error('Pedido inválido.');
}
function requireOwner(uid){if(uid!==OWNER_UID)throw Error('Somente o ADM principal pode vincular contas.');}
async function gate(tx,db){
 const doc=await tx.get(db.collection('serverConfig').doc('accountMigration'));
 if(!doc.exists||doc.data().enabled!==true||doc.data().schemaVersion!==1)throw Error('Migração de contas ainda não liberada.');
}
function eligible(type,profile){return profile?.status==='ACTIVE'&&(type!=='PLAYER'||!profile.isBot)&&(GAME_ACCOUNTS[type]!=='users'||profile.type===type);}

// Owner-only preview; returns no credentials or arbitrary profile fields.
export async function reviewGameAccount(db,auth,actor,input){
 requireOwner(actor);only(input,['uid','type','entityId']);
 const {uid}=input;
 if(!validDocumentId(uid)||uid===OWNER_UID)throw Error('Conta inválida.');
 const explicit=own(input,'type')||own(input,'entityId');
 if(explicit&&(typeof input.type!=='string'||!own(GAME_ACCOUNTS,input.type)||!validDocumentId(input.entityId)))throw Error('Perfil inválido.');
 const identity=await auth.getUser(uid);
 return db.runTransaction(async tx=>{
  await gate(tx,db);
  const admin=await tx.get(db.collection('adminProfiles').doc(uid));
  if(admin.exists)throw Error('Identidade administrativa não permitida.');
  const doc=await tx.get(db.collection('authAccounts').doc(uid));
  const old=doc.exists?doc.data():null;
  if(old&&(typeof old.type!=='string'||!own(GAME_ACCOUNTS,old.type)||!validDocumentId(old.entityId)||typeof old.active!=='boolean'||!Number.isSafeInteger(old.revision)||old.revision<1))throw Error('Vínculo inválido.');
  const binding=old?{type:old.type,entityId:old.entityId,active:old.active,revision:old.revision}:null;
  const target=explicit?input:binding;
  let profile=null;
  if(target){
   const {type,entityId}=target;
   const entity=await tx.get(db.collection(GAME_ACCOUNTS[type]).doc(entityId));
   const owner=await tx.get(db.collection('accountEntityOwners').doc(`${GAME_ACCOUNTS[type]}_${entityId}`));
   const available=old
    ? owner.exists&&owner.data().uid===uid&&owner.data().type===type&&owner.data().entityId===entityId
    : !owner.exists;
   profile={type,entityId,name:entity.exists?String(entity.data().name||entityId).slice(0,160):entityId,eligible:entity.exists&&eligible(type,entity.data()),available};
  }
  const ready=identity.emailVerified===true&&!identity.disabled&&!!identity.email;
  return {uid,email:identity.email||null,emailVerified:identity.emailVerified===true,disabled:identity.disabled===true,binding,profile,
   canBind:!!(ready&&profile?.eligible&&profile.available&&!binding)};
 });
}

// Owner explicitly links an independently authenticated, verified email identity.
// Never claim an existing game account by checking its exposed legacy password.
// No passwords/emails/tokens are written into public game documents or audit logs.
export async function bindGameAccount(db,auth,actor,input,{now=Date.now()}={}){
 requireOwner(actor);only(input,['uid','type','entityId']);
 const {uid,type,entityId}=input;
 if(!validDocumentId(uid)||uid===OWNER_UID||typeof type!=='string'||!own(GAME_ACCOUNTS,type)||!validDocumentId(entityId))throw Error('Conta inválida.');
 const identity=await auth.getUser(uid);
 if(identity.disabled||identity.emailVerified!==true||!identity.email)throw Error('Confirme o e-mail da conta antes do vínculo.');
 return db.runTransaction(async tx=>{
  await gate(tx,db);
  const bindingRef=db.collection('authAccounts').doc(uid);
  const entityKey=`${GAME_ACCOUNTS[type]}_${entityId}`;
  const ownerRef=db.collection('accountEntityOwners').doc(entityKey);
  const [admin,old,owner,entity]=await Promise.all([
   tx.get(db.collection('adminProfiles').doc(uid)),tx.get(bindingRef),tx.get(ownerRef),tx.get(db.collection(GAME_ACCOUNTS[type]).doc(entityId))
  ]);
  if(admin.exists)throw Error('Use uma identidade separada da conta administrativa.');
  if(!entity.exists||!eligible(type,entity.data()))throw Error('Perfil de jogo indisponível.');
  if(old.exists){
   const binding=old.data();
   if(binding.type!==type||binding.entityId!==entityId||!owner.exists||owner.data().uid!==uid)throw Error('Identidade já vinculada ou vínculo inconsistente.');
   return {uid,type,entityId,active:binding.active,revision:binding.revision,duplicate:true};
  }
  if(owner.exists)throw Error('Perfil já pertence a outra identidade.');
  const binding={type,entityId,active:true,revision:1,createdAt:now,updatedAt:now,createdBy:actor};
  tx.set(bindingRef,binding);tx.set(ownerRef,{uid,type,entityId,createdAt:now});
  tx.set(db.collection('accountBindingAudit').doc(`${uid}_1`),{uid,type,entityId,active:true,revision:1,actor,changedAt:now,action:'BIND'});
  return {uid,type,entityId,active:true,revision:1,duplicate:false};
 });
}

export async function setGameAccountActive(db,actor,input,{now=Date.now(),auth}={}){
 requireOwner(actor);only(input,['uid','active','expectedRevision','reason']);
 const {uid,active,expectedRevision,reason}=input;
 if(!validDocumentId(uid)||typeof active!=='boolean'||!Number.isSafeInteger(expectedRevision)||expectedRevision<1||typeof reason!=='string'||reason.trim().length<3||reason.length>500)throw Error('Revisão ou motivo inválido.');
 if(active){
  if(!auth)throw Error('Verificação da identidade indisponível.');
  const identity=await auth.getUser(uid);
  if(identity.disabled||identity.emailVerified!==true||!identity.email)throw Error('Identidade indisponível para reativação.');
 }
 return db.runTransaction(async tx=>{
  await gate(tx,db);
  const ref=db.collection('authAccounts').doc(uid),doc=await tx.get(ref);
  if(!doc.exists)throw Error('Vínculo não encontrado.');
  const binding=doc.data();
  if(binding.revision!==expectedRevision)throw Error('Vínculo mudou. Recarregue antes de continuar.');
  if(active){
   if(typeof binding.type!=='string'||!own(GAME_ACCOUNTS,binding.type)||!validDocumentId(binding.entityId))throw Error('Vínculo inválido.');
   const entity=await tx.get(db.collection(GAME_ACCOUNTS[binding.type]).doc(binding.entityId));
   const owner=await tx.get(db.collection('accountEntityOwners').doc(`${GAME_ACCOUNTS[binding.type]}_${binding.entityId}`));
   const admin=await tx.get(db.collection('adminProfiles').doc(uid));
   if(uid===OWNER_UID||admin.exists||!entity.exists||!eligible(binding.type,entity.data())||!owner.exists||owner.data().uid!==uid||owner.data().type!==binding.type||owner.data().entityId!==binding.entityId)throw Error('Perfil ou vínculo indisponível para reativação.');
  }
  if(binding.active===active)return {uid,revision:binding.revision,duplicate:true};
  const revision=binding.revision+1;
  tx.update(ref,{active,revision,updatedAt:now});
  tx.set(db.collection('accountBindingAudit').doc(`${uid}_${revision}`),{uid,type:binding.type,entityId:binding.entityId,active,revision,actor,changedAt:now,action:active?'ENABLE':'DISABLE',reason:reason.trim()});
  // Ownership remains reserved when disabled; another UID cannot claim it.
  return {uid,revision,duplicate:false};
 });
}

export async function resolveGameAccount(db,uid){
 if(!validDocumentId(uid))throw Error('Sessão inválida.');
 return db.runTransaction(async tx=>{
  await gate(tx,db);
  const doc=await tx.get(db.collection('authAccounts').doc(uid));
  const binding=doc.exists?doc.data():null;
  if(binding?.active!==true||typeof binding.type!=='string'||!own(GAME_ACCOUNTS,binding.type)||!validDocumentId(binding.entityId)||!Number.isSafeInteger(binding.revision)||binding.revision<1)throw Error('Nenhum perfil autorizado.');
  const owner=await tx.get(db.collection('accountEntityOwners').doc(`${GAME_ACCOUNTS[binding.type]}_${binding.entityId}`));
  if(!owner.exists||owner.data().uid!==uid||owner.data().type!==binding.type||owner.data().entityId!==binding.entityId)throw Error('Vínculo inconsistente.');
  const entity=await tx.get(db.collection(GAME_ACCOUNTS[binding.type]).doc(binding.entityId));
  if(!entity.exists||!eligible(binding.type,entity.data()))throw Error('Perfil indisponível.');
  return {type:binding.type==='TEAM'?'USER':binding.type,entityId:binding.entityId,revision:binding.revision};
 });
}
