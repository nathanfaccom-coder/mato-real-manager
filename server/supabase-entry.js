import {timingSafeEqual} from 'node:crypto';
import {createFirebaseRuntime} from './firebase-runtime.js';
import {processNextDueMatch} from './match-scheduler.js';

// Deployment must keep Supabase verify_jwt=false: clients carry FIREBASE ID
// tokens, verified by Admin Auth in match-http; cron uses a separate secret.
// Keep disabled until legacy auth/data migration and security rules are verified.
let runtime;
function getRuntime(){
 if(runtime)return runtime;
 const raw=Deno.env.get('MATO_REAL_FIREBASE_SERVICE_ACCOUNT');
 if(!raw)throw Error('Server credential missing');
 runtime=createFirebaseRuntime({serviceAccount:JSON.parse(raw),enabled:true});
 return runtime;
}
export async function handleEdgeRequest(request){
 const unavailable=()=>Response.json({error:'Integração automática ainda não liberada.'},{status:503});
 if(Deno.env.get('MATO_REAL_MATCHES_ENABLED')!=='true')return unavailable();
 let current;try{current=getRuntime();}catch{return unavailable();}
 if(new URL(request.url).pathname.split('/').filter(Boolean).at(-1)!=='finalize')return current.fetch(request);
 if(request.method!=='POST')return new Response(null,{status:405});
 const expected=Deno.env.get('MATO_REAL_WORKER_SECRET')||'';
 const actual=request.headers.get('x-worker-key')||'';
 const encoder=new TextEncoder(),a=encoder.encode(actual),b=encoder.encode(expected);
 if(b.length<32||a.length!==b.length||!timingSafeEqual(a,b))return new Response(null,{status:401});
 try{return Response.json(await processNextDueMatch(current.db),{headers:{'Cache-Control':'no-store'}});}
 catch{return Response.json({error:'Falha temporária ao processar a fila.'},{status:503});}
}
if(import.meta.main)Deno.serve(handleEdgeRequest);
