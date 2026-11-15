import {validDocumentId} from '../src/matches/validate.js';
import {validCommand} from '../src/simulation/live-tactics.js';
import {timeAtElapsed} from '../src/simulation/timeline.js';

// uid MUST come from verified Firebase authentication. authAccounts is a
// server-owned binding created during migration, never a client profile.
export async function submitMatchCommand(db,uid,input,{now=Date.now()}={}) {
 if(!validDocumentId(uid))throw Error('Entre na sua conta.');
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Comando inválido.');
 const keys=['matchId','requestId','kind',...(input.kind==='tactics'?['formation','posture']:input.kind==='substitutions'?['changes']:input.kind==='penalty'?['playerId','penaltyAt']:[])];
 if(Object.keys(input).some(k=>!keys.includes(k))||!validDocumentId(input.matchId)||!validDocumentId(input.requestId))throw Error('Comando inválido.');
 if(input.kind==='substitutions'&&(!Array.isArray(input.changes)||input.changes.some(p=>!p||Object.keys(p).some(k=>!['outId','inId'].includes(k))||!validDocumentId(p.outId)||!validDocumentId(p.inId))))throw Error('Troca inválida.');
 if(!validCommand({...input,id:input.requestId,side:0,at:0}))throw Error('Comando inválido.');
 return db.runTransaction(async tx=>{
  const gate=await tx.get(db.collection('serverConfig').doc('matchAutomation'));
  if(!gate.exists||gate.data().enabled!==true||gate.data().schemaVersion!==1)throw Error('Integração automática ainda não liberada.');
  const identity=await tx.get(db.collection('authAccounts').doc(uid));
  const account=identity.exists?identity.data():null;
  if(account?.active!==true||!Number.isSafeInteger(account.revision)||account.revision<1||!['TEAM','COACH'].includes(account.type)||!validDocumentId(account.entityId))throw Error('Conta sem autorização para comandar clubes.');
  const owner=await tx.get(db.collection('accountEntityOwners').doc(`${account.type==='TEAM'?'teams':'users'}_${account.entityId}`));
  if(!owner.exists||owner.data().uid!==uid||owner.data().type!==account.type||owner.data().entityId!==account.entityId)throw Error('Vínculo de controle indisponível.');
  const profile=await tx.get(db.collection(account.type==='TEAM'?'teams':'users').doc(account.entityId));
  if(!profile.exists||profile.data().status!=='ACTIVE'||(account.type==='COACH'&&profile.data().type!=='COACH'))throw Error('Conta indisponível.');
  const teamId=account.type==='TEAM'?account.entityId:profile.data().teamId;
  const ref=db.collection('matchRuns').doc(input.matchId),doc=await tx.get(ref);
  if(!doc.exists)throw Error('Partida não encontrada.');
  const run=doc.data();
  const side=run.snapshot.home.id===teamId?0:run.snapshot.away.id===teamId?1:-1;
  if(side<0)throw Error('Você não controla um clube desta partida.');
  const id=`${uid}_${input.requestId}`;
  const payload=Object.fromEntries(Object.entries(input).filter(([k])=>!['matchId','requestId'].includes(k)));
  const commands=run.commands||[];
  const previous=commands.find(c=>c.id===id);
  if(previous){
   const same=Object.keys(payload).every(k=>JSON.stringify(previous[k])===JSON.stringify(payload[k]));
   if(!same||previous.side!==side)throw Error('Pedido já utilizado para outro comando.');
   return {id,at:previous.at,duplicate:true};
  }
  if(run.status!=='RUNNING'||now>=run.endsAt||now<run.startedAt+run.preMatchMs)throw Error('Partida fora do período de comandos.');
  const clock=timeAtElapsed({snapshot:run.snapshot},now-run.startedAt-run.preMatchMs);
  if(['ended','fulltime-exit','penalty-shootout'].includes(clock.stage))throw Error('Partida encerrada.');
  // The next simulation tick prevents a new command from rewriting the past.
  const at=Math.floor(clock.time)+1;
  const command={...payload,id,side,at,createdBy:uid,receivedAt:now};
  if(!validCommand(command))throw Error('Comando inválido.');
  const team=side===0?run.snapshot.home:run.snapshot.away;
  const roster=new Set([...team.lineup,...team.bench].map(p=>p.id));
  if(command.kind==='substitutions'){
   const ids=command.changes.flatMap(p=>[p.outId,p.inId]);
   if(ids.some(id=>!roster.has(id))||new Set(ids).size!==ids.length)throw Error('Jogador inválido para troca.');
  }
  if(command.kind==='penalty'&&(!roster.has(command.playerId)||command.penaltyAt<0||command.penaltyAt>=at))throw Error('Cobrança inválida.');
  // The engine remains responsible for active lineups, substitution windows,
  // sent-off players and the actual penalty/deadline. Invalid choices have no effect.
  if(commands.length>=120)throw Error('Limite de comandos atingido.');
  const last=commands.filter(c=>c.side===side).at(-1);
  if(last&&now-last.receivedAt<1000)throw Error('Aguarde antes do próximo comando.');
  tx.update(ref,{commands:[...commands,command]});
  return {id,at,duplicate:false};
 });
}
