// Temporary hosted import/init probe. No credentials, database calls or game data.
import {initializeApp,deleteApp} from 'npm:firebase-admin@14.5.0/app';
import {initializeFirestore} from 'npm:firebase-admin@14.5.0/firestore';
import {getAuth} from 'npm:firebase-admin@14.5.0/auth';
const digestExpected='__PROBE_DIGEST__';
const expiry=Number('__PROBE_EXPIRY__');
Deno.serve(async request=>{
 if(!Number.isFinite(expiry)||Date.now()>expiry)return new Response(null,{status:410});
 const token=request.headers.get('x-probe-token')||'';
 if(token.length!==64)return new Response(null,{status:401});
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))),b=>b.toString(16).padStart(2,'0')).join('');
 if(digest!==digestExpected)return new Response(null,{status:401});
 const app=initializeApp({projectId:'demo-mato-real'},crypto.randomUUID());
 try {
  const db=initializeFirestore(app,{preferRest:true});
  const auth=getAuth(app);
  return Response.json({sdk:'firebase-admin@14.5.0',firestoreInitialized:!!db,authInitialized:!!auth,databaseRequests:0});
 }finally{await deleteApp(app);}
});
