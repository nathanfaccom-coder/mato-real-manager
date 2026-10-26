import test from 'node:test';
import assert from 'node:assert/strict';
import {createMatchHandler} from '../../server/match-http.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const req=(body='{}',headers={})=>new Request('https://example.test/matches/start',{method:'POST',headers:{authorization:'Bearer token','content-type':'application/json',...headers},body});
test('API is disabled by default and never invokes auth or database',async()=>{
 const handler=createMatchHandler({auth:{verifyIdToken(){throw Error('must not call');}}});
 assert.equal((await handler(req())).status,503);
});
test('missing and revoked tokens fail closed and revocation check is enabled',async()=>{
 let calls=0;const handler=createMatchHandler({enabled:true,auth:{verifyIdToken(token,revoked){calls++;assert.equal(token,'token');assert.equal(revoked,true);throw Error('revoked');}}});
 assert.equal((await handler(req('{}',{authorization:''}))).status,401);
 assert.equal(calls,0);assert.equal((await handler(req())).status,401);assert.equal(calls,1);
});
test('HTTP boundary rejects malformed, excessive and non-JSON requests',async()=>{
 const handler=createMatchHandler({enabled:true,auth:{verifyIdToken:async()=>({uid:'u'})}});
 assert.equal((await handler(req('null'))).status,400);
 assert.equal((await handler(req('[]'))).status,400);
 assert.equal((await handler(req('{'))).status,400);
 assert.equal((await handler(req(' '.repeat(8193)))).status,413);
 assert.equal((await handler(req('{}',{'content-type':'text/plain'}))).status,415);
 assert.equal((await handler(req('{}',{origin:'https://evil.example'}))).status,403);
});
test('verified identity cannot be replaced with a client-supplied administrator uid',async()=>{
 const db=memoryDB({});const handler=createMatchHandler({db,enabled:true,auth:{verifyIdToken:async()=>({uid:'press'})}});
 const response=await handler(req(JSON.stringify({uid:'NEXLYzsJfLPsTxzp3LKHKwaPhEZ2',requestId:'one',homeId:'h',awayId:'a'})));
 assert.equal(response.status,400);assert.equal(db.values.size,0);
 assert.equal((await handler(req(JSON.stringify({requestId:'one',homeId:'h',awayId:'a'})))).status,400);
});
