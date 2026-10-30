import {readMatch,listMatches} from './match-view.js';
import {readCompetitionStandings} from './competition-standings.js';
import {correctMatch,reviewCorrection} from './match-correction.js';
import {approveFixture,reviewFixture} from './fixture-approval.js';
import {startMatch} from './match-service.js';
import {submitMatchCommand} from './match-commands.js';
import {bindGameAccount,setGameAccountActive,resolveGameAccount,reviewGameAccount} from './account-bindings.js';
import {submitPlayerApplication,readPlayerApplication,decidePlayerApplication} from './player-registration.js';

// Wire only to a server-owned Firestore client and Firebase Admin Auth instance.
// Never expose credentials or use client-supplied uid/type as authorization.
export function createMatchHandler({db,auth,enabled=false,origin='https://nathanfaccom-coder.github.io'}) {
 return async request=>{
  const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};
  const callerOrigin=request.headers.get('origin');
  if(callerOrigin===origin)Object.assign(headers,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization, content-type','Access-Control-Allow-Methods':'POST, OPTIONS'});
  const respond=(status,value)=>new Response(JSON.stringify(value),{status,headers});
  if(callerOrigin&&callerOrigin!==origin)return respond(403,{error:'Origem não permitida.'});
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(request.method!=='POST')return respond(405,{error:'Método não permitido.'});
  if(!enabled)return respond(503,{error:'Integração automática ainda não liberada.'});
  const route=new URL(request.url).pathname.split('/').filter(Boolean).at(-1);
  if(!['competition-standings','match-correction-review','match-correct','match-view','match-list','fixture-review','fixture-approve','start','command','account-bind','account-state','account-review','player-apply','player-application','player-application-review','player-application-decide','session'].includes(route))return respond(404,{error:'Operação não encontrada.'});
  const bearer=request.headers.get('authorization')||'';
  if(!/^Bearer [^\s]{1,8192}$/.test(bearer))return respond(401,{error:'Entre na sua conta.'});
  let identity;
  try {identity=await auth.verifyIdToken(bearer.slice(7),true);} // check revocation/disabled users
  catch {return respond(401,{error:'Sessão inválida ou expirada.'});}
  if(!identity?.uid)return respond(401,{error:'Sessão inválida.'});
  if(['match-correction-review','match-correct','fixture-review','fixture-approve','account-bind','account-state','account-review','player-application-review','player-application-decide'].includes(route)){
   const age=Date.now()/1000-identity.auth_time;
   if(!Number.isFinite(age)||age<0||age>300)return respond(401,{error:'Entre novamente para administrar os vínculos.'});
  }
  if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return respond(415,{error:'Envie JSON.'});
  let input;
  try {
   const reader=request.body?.getReader();if(!reader)throw Error();
   const chunks=[];let size=0;
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>8192){await reader.cancel();return respond(413,{error:'Pedido muito grande.'});}chunks.push(value);}
   const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
   input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
   if(!input||typeof input!=='object'||Array.isArray(input))throw Error();
  } catch {return respond(400,{error:'Pedido inválido.'});}
  try {
   let result;
   if(route==='competition-standings')result=await readCompetitionStandings(db,identity.uid,input);
   else if(route==='match-correction-review')result=await reviewCorrection(db,identity.uid,input);
   else if(route==='match-correct')result=await correctMatch(db,identity.uid,input);
   else if(route==='match-view')result=await readMatch(db,identity.uid,input);
   else if(route==='match-list')result=await listMatches(db,identity.uid,input);
   else if(route==='fixture-review')result=await reviewFixture(db,identity.uid,input);
   else if(route==='fixture-approve')result=await approveFixture(db,identity.uid,input);
   else if(route==='start')result=await startMatch(db,identity.uid,input);
   else if(route==='command')result=await submitMatchCommand(db,identity.uid,input);
   else if(route==='account-bind')result=await bindGameAccount(db,auth,identity.uid,input);
   else if(route==='account-state')result=await setGameAccountActive(db,identity.uid,input,{auth});
   else if(route==='account-review')result=await reviewGameAccount(db,auth,identity.uid,input);
   else if(route==='player-apply')result=await submitPlayerApplication(db,auth,identity.uid,input);
   else if(route==='player-application')result=await readPlayerApplication(db,auth,identity.uid,input);
   else if(route==='player-application-review')result=await readPlayerApplication(db,auth,identity.uid,input,{administrator:true});
   else if(route==='player-application-decide')result=await decidePlayerApplication(db,auth,identity.uid,input);
   else {
    if(Object.keys(input).length)throw Error('Pedido inválido.');
    result=await resolveGameAccount(db,identity.uid);
   }
   return respond(200,result);
  } catch {
   // Avoid reflecting database paths, credentials or arbitrary internal errors.
   return respond(400,{error:'Não foi possível aplicar o pedido. Verifique sua permissão e o estado da partida.'});
  }
 };
}
