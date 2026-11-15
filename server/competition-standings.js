import {validDocumentId} from '../src/matches/validate.js';
import {TABLE_COUNTERS} from '../src/matches/standings.js';

export async function readCompetitionStandings(db,uid,input) {
 if(!validDocumentId(uid)||!input||Array.isArray(input)||Object.keys(input).some(k=>!['competitionId','seasonId'].includes(k))||!validDocumentId(input.competitionId)||!validDocumentId(input.seasonId))throw Error('Competição inválida.');
 return db.runTransaction(async tx=>{
  const gate=(await tx.get(db.collection('serverConfig').doc('matchAutomation'))).data();
  if(gate?.enabled!==true||gate.schemaVersion!==1)throw Error('Integração indisponível.');
  const comp=(await tx.get(db.collection('competitions').doc(input.competitionId))).data();
  if(!comp||comp.seasonId!==input.seasonId)throw Error('Competição ou temporada indisponível.');
  const docs=await tx.get(db.collection('competitionStandings').where('competitionId','==',input.competitionId).where('seasonId','==',input.seasonId).limit(65));
  if(docs.docs.length>64)throw Error('Competição excede o limite da classificação.');
  const aggregates=new Map();
  for(const doc of docs.docs){
   const row=doc.data();
   if(!validDocumentId(row.teamId)||aggregates.has(row.teamId)||doc.id!==`${input.competitionId}_${input.seasonId}_${row.teamId}`||TABLE_COUNTERS.some(k=>!Number.isSafeInteger(row[k])||row[k]<0))throw Error('Classificação inconsistente.');
   if(row.played!==row.wins+row.draws+row.losses||row.pts!==row.wins*3+row.draws)throw Error('Classificação inconsistente.');
   aggregates.set(row.teamId,row);
  }
  const registered=comp.teamIds===undefined?[]:comp.teamIds;
  if(!Array.isArray(registered)||registered.length>64||registered.some(id=>!validDocumentId(id))||new Set(registered).size!==registered.length)throw Error('Inscrições inconsistentes.');
  const ids=[...new Set([...registered,...aggregates.keys()])];
  if(ids.length>64)throw Error('Competição excede o limite da classificação.');
  const clubs=await Promise.all(ids.map(id=>tx.get(db.collection('teams').doc(id))));
  const rows=ids.map((teamId,index)=>({teamId,name:String(clubs[index].data()?.name||teamId).slice(0,80),...Object.fromEntries(TABLE_COUNTERS.map(k=>[k,aggregates.get(teamId)?.[k]||0]))}));
  const sporting=(a,b)=>b.pts-a.pts||b.wins-a.wins||(b.gf-b.ga)-(a.gf-a.ga);
  rows.sort((a,b)=>sporting(a,b)||a.teamId.localeCompare(b.teamId));
  rows.forEach((row,index)=>{row.position=index&&sporting(rows[index-1],row)===0?rows[index-1].position:index+1;});
  return {competitionId:input.competitionId,seasonId:input.seasonId,name:String(comp.name||input.competitionId).slice(0,120),registeredTeamsIncluded:registered.length>0,rows};
 });
}
