import test from 'node:test';
import assert from 'node:assert/strict';
import {createMatchClient} from '../../src/services/match-client.js';
test('client sends identity token and allowlisted sporting requests, never client author or clock',async()=>{
 const calls=[],auth={currentUser:{getIdToken:async()=> 'token'}};
 const client=createMatchClient({auth,endpoint:'https://example.test/api',fetchImpl:async(url,options)=>{calls.push({url,options});return Response.json({ok:true});}});
 await client.command({matchId:'m',requestId:'r',kind:'substitutions',uid:'admin',at:100,side:0,changes:[{outId:'a',inId:'b',xp:900}]});
 assert.deepEqual(JSON.parse(calls[0].options.body),{matchId:'m',requestId:'r',kind:'substitutions',changes:[{outId:'a',inId:'b'}]});
 assert.equal(calls[0].options.headers.Authorization,'Bearer token');assert.equal(calls[0].options.redirect,'error');assert.equal(calls[0].options.credentials,'omit');
 await client.start({requestId:'r',fixtureId:'f',homeId:'forged',kind:'OFFICIAL'});
 assert.deepEqual(JSON.parse(calls[1].options.body),{requestId:'r',fixtureId:'f'});
 await client.list();assert.equal(calls[2].options.body,'{}');
});
test('client rejects absent identity, expired session and account switch during network operation',async()=>{
 await assert.rejects(createMatchClient({auth:{},endpoint:''}).read('m'),/Entre/);
 const auth={currentUser:{getIdToken:async()=> 'token'}};
 await assert.rejects(createMatchClient({auth,endpoint:'https://example.test',fetchImpl:async()=>new Response('',{status:401})}).read('m'),/expirada/);
 await assert.rejects(createMatchClient({auth,endpoint:'https://example.test',fetchImpl:async()=>{auth.currentUser=null;return Response.json({id:'m'});}}).read('m'),/sessão mudou/);
});
