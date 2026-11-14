import {requireMatchAdmin} from './match-admin.js';
import {validDocumentId} from '../src/matches/validate.js';

const fields=['homeId','awayId','competitionId','seasonId'];
export function fixtureMatchesApproval(fixture,approval) {
 return approval?.approved===true && approval.schemaVersion===1 &&
  Number.isSafeInteger(approval.revision) && approval.revision>0 &&
  fields.every(key=>validDocumentId(approval[key])&&fixture[key]===approval[key]);
}

export async function reviewFixture(db,uid,input) {
 if(!input||Array.isArray(input)||Object.keys(input).some(k=>k!=='fixtureId')||!validDocumentId(input.fixtureId))throw Error('Calendário inválido.');
 return db.runTransaction(async tx=>{
  await requireMatchAdmin(tx,db,uid);
  const gate=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
  if(!gate.exists||gate.data().enabled!==true||gate.data().schemaVersion!==1)throw Error('Integração automática ainda não liberada.');
  const doc=await tx.get(db.collection('matches').doc(input.fixtureId));
  if(!doc.exists)throw Error('Partida indisponível.');
  const fixture=doc.data();
  const approvalDoc=await tx.get(db.collection('serverConfig').doc('fixture_'+input.fixtureId));
  const approval=approvalDoc.exists?approvalDoc.data():null;
  const run=await tx.get(db.collection('matchRuns').doc('official_'+input.fixtureId));
  const config=await tx.get(db.collection('config').doc('system'));
  const revision=approval?.revision??0;
  if(!Number.isSafeInteger(revision)||revision<0)throw Error('Revisão indisponível.');
  const validIds=fields.every(k=>validDocumentId(fixture[k]))&&fixture.homeId!==fixture.awayId&&validDocumentId('official_'+input.fixtureId);
  const read=async(collection,id)=>validDocumentId(id)?await tx.get(db.collection(collection).doc(id)):null;
  const [home,away,competition]=await Promise.all([read('teams',fixture.homeId),read('teams',fixture.awayId),read('competitions',fixture.competitionId)]);
  const season=config.exists?config.data().season:null;
  const problems=[];
  if(!validIds)problems.push('O calendário precisa de clubes, competição e temporada válidos.');
  const editable=!run.exists&&!fixture.played&&fixture.status==='PENDING';
  if(!editable)problems.push('Esta partida já começou, terminou ou não está pendente.');
  if(!home?.exists||!away?.exists||home.data().status!=='ACTIVE'||away.data().status!=='ACTIVE')problems.push('Os dois clubes precisam estar ativos.');
  if(!competition?.exists||competition.data().active!==true||competition.data().seasonId!==fixture.seasonId)problems.push('A competição precisa estar ativa na temporada da partida.');
  if(!Number.isSafeInteger(season)||season<1||fixture.seasonId!==`season_${season}`)problems.push('A partida precisa pertencer à temporada atual.');
  const label=(snap,fallback)=>String(snap?.exists?snap.data().name||fallback:fallback).slice(0,80);
  return {
   fixtureId:input.fixtureId,...Object.fromEntries(fields.map(k=>[k,validDocumentId(fixture[k])?fixture[k]:null])),
   homeName:label(home,'Clube indisponível'),awayName:label(away,'Clube indisponível'),competitionName:label(competition,'Competição indisponível'),
   expectedRevision:revision,approved:fixtureMatchesApproval(fixture,approval),
   canApprove:problems.length===0,canRevoke:validIds&&editable&&approval?.approved===true,
   problems,
  };
 });
}

// Approval is stored under the server-only namespace, never trusted from the
// legacy public fixture. The caller explicitly reviews each sporting identifier.
export async function approveFixture(db,uid,input,{now=Date.now()}={}) {
 if(!input||Array.isArray(input)||Object.keys(input).some(k=>!['fixtureId',...fields,'approved','expectedRevision','reason'].includes(k))||
  !validDocumentId(input.fixtureId)||!validDocumentId('official_'+input.fixtureId)||!fields.every(k=>validDocumentId(input[k]))||input.homeId===input.awayId||
  typeof input.approved!=='boolean'||!Number.isSafeInteger(input.expectedRevision)||input.expectedRevision<0||
  typeof input.reason!=='string'||input.reason.trim().length<3||input.reason.length>500)throw Error('Aprovação inválida.');
 const reason=input.reason.trim();
 return db.runTransaction(async tx=>{
  await requireMatchAdmin(tx,db,uid);
  const gate=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
  if(!gate.exists||gate.data().enabled!==true||gate.data().schemaVersion!==1)throw Error('Integração automática ainda não liberada.');
  const ref=db.collection('serverConfig').doc('fixture_'+input.fixtureId),previous=await tx.get(ref);
  const old=previous.exists?previous.data():null;
  if(old&&old.revision===input.expectedRevision+1&&old.actor===uid&&old.reason===reason&&old.approved===input.approved&&fields.every(k=>old[k]===input[k]))
   return {fixtureId:input.fixtureId,revision:old.revision,approved:old.approved,duplicate:true};
  if((old?.revision??0)!==input.expectedRevision)throw Error('Aprovação alterada. Consulte novamente.');
  const fixtureRef=db.collection('matches').doc(input.fixtureId),doc=await tx.get(fixtureRef);
  const run=await tx.get(db.collection('matchRuns').doc('official_'+input.fixtureId));
  if(run.exists||!doc.exists||doc.data().played||doc.data().status!=='PENDING')throw Error('Partida indisponível para aprovação.');
  if(!fields.every(k=>doc.data()[k]===input[k]))throw Error('O calendário mudou. Confira os participantes.');
  if(input.approved){
   const config=await tx.get(db.collection('config').doc('system'));
   const competition=await tx.get(db.collection('competitions').doc(input.competitionId));
   const teams=await Promise.all([input.homeId,input.awayId].map(id=>tx.get(db.collection('teams').doc(id))));
   const season=config.exists?config.data().season:null;
   if(!Number.isSafeInteger(season)||season<1||input.seasonId!==`season_${season}`||!competition.exists||competition.data().active!==true||competition.data().seasonId!==input.seasonId||teams.some(t=>!t.exists||t.data().status!=='ACTIVE'))throw Error('Competição, temporada ou clubes indisponíveis.');
  }
  const revision=input.expectedRevision+1;
  const record={schemaVersion:1,fixtureId:input.fixtureId,approved:input.approved,revision,actor:uid,reason,updatedAt:now};
  for(const key of fields)record[key]=input[key];
  tx.set(ref,record);
  tx.set(db.collection(`serverConfig/fixture_${input.fixtureId}/audit`).doc(String(revision)),record);
  tx.update(fixtureRef,{serverVerified:input.approved});
  return {fixtureId:input.fixtureId,revision,approved:input.approved,duplicate:false};
 });
}
