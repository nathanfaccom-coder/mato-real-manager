import {startMatch} from './match-service.js';
import {submitMatchCommand} from './match-commands.js';

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
  if(!['start','command'].includes(route))return respond(404,{error:'Operação não encontrada.'});
  const bearer=request.headers.get('authorization')||'';
  if(!/^Bearer [^\s]{1,8192}$/.test(bearer))return respond(401,{error:'Entre na sua conta.'});
  let identity;
  try {identity=await auth.verifyIdToken(bearer.slice(7),true);} // check revocation/disabled users
  catch {return respond(401,{error:'Sessão inválida ou expirada.'});}
  if(!identity?.uid)return respond(401,{error:'Sessão inválida.'});
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
   const result=route==='start'?await startMatch(db,identity.uid,input):await submitMatchCommand(db,identity.uid,input);
   return respond(200,result);
  } catch {
   // Avoid reflecting database paths, credentials or arbitrary internal errors.
   return respond(400,{error:'Não foi possível aplicar o pedido. Verifique sua permissão e o estado da partida.'});
  }
 };
}
