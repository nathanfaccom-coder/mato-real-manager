import {requireMatchAdmin} from './match-admin.js';
import {validDocumentId} from '../src/matches/validate.js';

const fields=['homeId','awayId','competitionId','seasonId'];
export function fixtureMatchesApproval(fixture,approval) {
 return approval?.approved===true && approval.schemaVersion===1 &&
  Number.isSafeInteger(approval.revision) && approval.revision>0 &&
  fields.every(key=>validDocumentId(approval[key])&&fixture[key]===approval[key]);
}

// Approval is stored under the server-only namespace, never trusted from the
// legacy public fixture. The caller explicitly reviews each sporting identifier.
export async function approveFixture(db,uid,input,{now=Date.now()}={}) {
 if(!input||Array.isArray(input)||Object.keys(input).some(k=>!['fixtureId',...fields,'approved','expectedRevision','reason'].includes(k))||
  !validDocumentId(input.fixtureId)||!fields.every(k=>validDocumentId(input[k]))||input.homeId===input.awayId||
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
