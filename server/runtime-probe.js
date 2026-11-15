// Synthetic-only, short-lived feasibility probe. No database or game credentials.
import {makeSnapshot,simulateMatch} from '../src/simulation/engine.js';
import {reportFromSimulation} from '../src/matches/policy.js';
// Build replaces these placeholders with a SHA-256 digest and a short expiry.
const expectedDigest = '__PROBE_DIGEST__';
const expiresAt = Number('__PROBE_EXPIRY__');
const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE','GOL','ZAG','LD','VOL','MC','MEI','ATA','PTD','PTE'];
export async function handleProbe(req) {
 if (!Number.isFinite(expiresAt) || Date.now()>expiresAt) return new Response('Expired',{status:410});
 const token=req.headers.get('x-probe-token') || '';
 if(token.length!==64) return new Response('Unauthorized',{status:401});
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))),b=>b.toString(16).padStart(2,'0')).join('');
 if(digest!==expectedDigest) return new Response('Unauthorized',{status:401});
 if(req.method!=='POST') return new Response('Method not allowed',{status:405});
 const seed=Number(new URL(req.url).searchParams.get('seed'));
 if(!Number.isInteger(seed)||seed<1||seed>30) return new Response('Invalid seed',{status:400});
 const players=[0,1].flatMap(side=>roles.map((position,i)=>({id:`p${side}_${i}`,teamId:`t${side}`,name:'Synthetic',position,overall:40+(seed*7+i*3)%60,energy:25+(seed*11+i)%76})));
 const snapshot=makeSnapshot({id:'t0',name:'Synthetic home'},{id:'t1',name:'Synthetic away'},players,seed);
 snapshot.commands=Array.from({length:120},(_,i)=>({id:`c${i}`,side:i%2,at:45*i,kind:'tactics',formation:'4-3-3 OFENSIVO',posture:['neutral','offensive','allAttack','defensive','allDefense'][i%5]}));
 const start=performance.now();
 const match=simulateMatch(snapshot,{summaryOnly:true});
 const report=reportFromSimulation(match,'OFFICIAL');
 return Response.json({seed,wallMs:performance.now()-start,participants:Object.keys(report.rows).length,frames:match.frames.length,report}, {headers:{'Cache-Control':'no-store'}});
}
if(import.meta.main) Deno.serve(handleProbe);
