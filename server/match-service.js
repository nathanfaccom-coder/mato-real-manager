import {randomInt} from 'node:crypto';
import {OWNER_UID} from '../src/admin/permissions.js';
import {makeSnapshot} from '../src/simulation/engine.js';
import {timelineDurationMs} from '../src/simulation/timeline.js';
import {validDocumentId} from '../src/matches/validate.js';

export async function requireMatchAdmin(tx,db,uid) {
 if(!validDocumentId(uid))throw Error('Entre na sua conta.');
 if(uid===OWNER_UID)return;
 const snap=await tx.get(db.collection('adminProfiles').doc(uid));
 const p=snap.exists?snap.data():null;
 if(!p?.active||!p.permissions?.includes('competitions'))throw Error('Apenas ADM de competições podem registrar partidas.');
}

// Called only with a Firebase-verified uid; never pass request.data.uid here.
// Activation must follow auth migration + protected rules deployment.
export async function startMatch(db,uid,input,{now=Date.now(),seed=randomInt(0,0x100000000)}={}) {
 if(!input||Object.keys(input).some(k=>!['requestId','fixtureId','homeId','awayId'].includes(k)))throw Error('Pedido de partida inválido.');
 const official=input.fixtureId!==undefined;
 if(!validDocumentId(input.requestId)||(official&&!validDocumentId(input.fixtureId)))throw Error('Identificador inválido.');
 if(!official&&(!validDocumentId(input.homeId)||!validDocumentId(input.awayId)))throw Error('Clubes inválidos.');
 const matchId=official?`official_${input.fixtureId}`:`friendly_${uid}_${input.requestId}`;
 if(!validDocumentId(matchId))throw Error('Identificador de pedido muito longo.');
 return db.runTransaction(async tx=>{
  await requireMatchAdmin(tx,db,uid);
  const gate=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
  if(!gate.exists||gate.data().enabled!==true||gate.data().schemaVersion!==1)throw Error('Integração automática ainda não liberada.');
  const ref=db.collection('matchRuns').doc(matchId),existing=await tx.get(ref);
  if(existing.exists){
   const old=existing.data();
   if(!official&&(old.snapshot.home.id!==input.homeId||old.snapshot.away.id!==input.awayId))throw Error('Pedido já utilizado para outra partida.');
   return {matchId,duplicate:true};
  }
  let fixture=null;
  if(official){
   const doc=await tx.get(db.collection('matches').doc(input.fixtureId));
   fixture=doc.exists?doc.data():null;
   // Legacy public fixtures cannot silently become XP-bearing official games.
   if(!fixture||fixture.serverVerified!==true||fixture.played||fixture.status!=='PENDING'||!validDocumentId(fixture.competitionId)||!validDocumentId(fixture.seasonId))throw Error('Partida oficial precisa de calendário validado pelo ADM.');
   const comp=await tx.get(db.collection('competitions').doc(fixture.competitionId));
   if(!comp.exists||comp.data().active!==true||comp.data().seasonId!==fixture.seasonId)throw Error('Competição inativa ou temporada incorreta.');
  }
  const homeId=fixture?.homeId||input.homeId,awayId=fixture?.awayId||input.awayId;
  if(!validDocumentId(homeId)||!validDocumentId(awayId)||homeId===awayId)throw Error('Clubes inválidos.');
  const config=await tx.get(db.collection('config').doc('system'));
  const season=config.exists?config.data().season:null;
  if(!Number.isSafeInteger(season)||season<1)throw Error('Temporada indisponível.');
  const seasonId=`season_${season}`;
  if(official&&fixture.seasonId!==seasonId)throw Error('A partida pertence a outra temporada.');
  const teamDocs=await Promise.all([homeId,awayId].map(id=>tx.get(db.collection('teams').doc(id))));
  if(teamDocs.some(d=>!d.exists||d.data().status!=='ACTIVE'))throw Error('Clube indisponível.');
  const roster=await tx.get(db.collection('players').where('teamId','in',[homeId,awayId]));
  const players=roster.docs.map(d=>({...d.data(),id:d.id}));
  const snapshot=makeSnapshot(...teamDocs.map(d=>({...d.data(),id:d.id})),players,seed);
  const participantIds=[snapshot.home,snapshot.away].flatMap(t=>[...t.lineup,...t.bench].map(p=>p.id));
  if(new Set(participantIds).size!==participantIds.length)throw Error('Participante repetido.');
  const lockIds=[`team_${homeId}`,`team_${awayId}`,...participantIds.map(id=>`player_${id}`)];
  const locks=lockIds.map(id=>db.collection('matchParticipantLocks').doc(id));
  const lockDocs=await Promise.all(locks.map(ref=>tx.get(ref)));
  if(lockDocs.some(d=>d.exists))throw Error('Clube ou jogador ainda participa de outra partida.');
  const preMatchMs=28000,durationMs=timelineDurationMs({snapshot});
  const endsAt=now+preMatchMs+durationMs;
  const run={status:'RUNNING',kind:official?'OFFICIAL':'FRIENDLY',fixtureId:official?input.fixtureId:null,competitionId:fixture?.competitionId||null,seasonId,snapshot,commands:[],startedAt:now,preMatchMs,durationMs,timelineVersion:2,endsAt,createdBy:uid,participantIds,lockIds};
  tx.set(ref,run);
  for(const lock of locks)tx.set(lock,{matchId,createdAt:now});
  if(official)tx.update(db.collection('matches').doc(input.fixtureId),{status:'RUNNING',runId:matchId});
  return {matchId,duplicate:false};
 });
}
