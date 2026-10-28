import {createHash} from 'node:crypto';
import {validDocumentId} from '../src/matches/validate.js';
import {COUNTERS} from '../src/matches/policy.js';
import {appearance} from '../src/simulation/appearance.js';
import {kit} from '../src/simulation/kits.js';

const pick=(value,keys)=>Object.fromEntries(keys.filter(k=>value?.[k]!==undefined).map(k=>[k,value[k]]));
const player=p=>({...pick(p,['id','name','position','role','overall','energy']),
 attributes:pick(p.attributes,['shot','attack','gk','defense','shortPass','speed','stamina','aggression','dribble']),
 anchor:pick(p.anchor,['x','y']),pixelAppearance:appearance(p.pixelAppearance)});
const team=t=>({...pick(t,['id','name','formation']),lineup:t.lineup.map(player),bench:(t.bench||[]).map(player)});
export function publicMatch(run,id,{detail=false}={}) {
 const record={id,serverOwned:true,...pick(run,['status','kind','fixtureId','competitionId','seasonId','startedAt','preMatchMs','durationMs','timelineVersion','endsAt'])};
 record.snapshot={home:pick(run.snapshot.home,['id','name']),away:pick(run.snapshot.away,['id','name'])};
 if(detail){
  record.snapshot={...pick(run.snapshot,['version','seed','addedTime','kickoffSide','penaltiesOnDraw']),home:team(run.snapshot.home),away:team(run.snapshot.away),
   kits:{...Object.fromEntries(['home','away','homeGK','awayGK'].map(k=>[k,kit(run.snapshot.kits?.[k])])),notes:(run.snapshot.kits?.notes||[]).filter(n=>typeof n==='string').slice(0,8)}};
  record.commands=(run.commands||[]).map(c=>({
   ...pick(c,['kind','side','at','formation','posture','playerId','penaltyAt']),
   id:createHash('sha256').update(c.id).digest('hex'),
   ...(c.changes?{changes:c.changes.map(p=>pick(p,['outId','inId']))}:{}),
  }));
 }
 return record;
}
async function enabled(tx,db) {
 const gate=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
 if(!gate.exists||gate.data().enabled!==true||gate.data().schemaVersion!==1)throw Error('Integração indisponível.');
}
// Caller verifies Firebase token including disabled/revoked users. This is only
// a sporting projection: never return actor, audit reason, locks or worker errors.
export async function readMatch(db,uid,input) {
 if(!validDocumentId(uid)||!input||Object.keys(input).some(k=>k!=='matchId')||!validDocumentId(input.matchId))throw Error('Pedido inválido.');
 return db.runTransaction(async tx=>{
  await enabled(tx,db);
  const doc=await tx.get(db.collection('matchRuns').doc(input.matchId));
  if(!doc.exists)throw Error('Partida indisponível.');
  const run=doc.data(),record=publicMatch(run,doc.id,{detail:true});
  const result=await tx.get(db.collection('matchResults').doc(input.matchId));
  record.result=null;
  if(run.status==='FINISHED'&&result.exists){
   const value=result.data();
   record.result={...pick(value,['kind','score','revision','finishedAt']),rows:Object.fromEntries(Object.entries(value.rows||{}).map(([id,row])=>[id,{
    ...pick(row,['xp','energyApplied']),stats:pick(row.stats,COUNTERS),
   }]))};
  }
  return record;
 });
}
export async function listMatches(db,uid,input) {
 if(!validDocumentId(uid)||!input||Object.keys(input).length)throw Error('Pedido inválido.');
 return db.runTransaction(async tx=>{
  await enabled(tx,db);
  const docs=await tx.get(db.collection('matchRuns').orderBy('startedAt','desc').limit(10));
  return {matches:docs.docs.map(doc=>publicMatch(doc.data(),doc.id))};
 });
}
