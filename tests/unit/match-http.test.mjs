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

test('account changes require recent authentication before reading or writing the database',async()=>{
 for(const route of ['fixture-review','fixture-approve','account-bind','account-state','account-review','player-application-review','player-application-decide'])for(const auth_time of [undefined,NaN,Date.now()/1000-301,Date.now()/1000+60]){
  const handler=createMatchHandler({enabled:true,auth:{verifyIdToken:async()=>({uid:'u',auth_time})}});
  const response=await handler(new Request(`https://example.test/matches/${route}`,{method:'POST',headers:{authorization:'Bearer token','content-type':'application/json'},body:'{}'}));
  assert.equal(response.status,401);
 }
});
test('session endpoint uses only verified uid and rejects client-selected identity or role',async()=>{
 const db=memoryDB({'serverConfig/accountMigration':{enabled:true,schemaVersion:1},'authAccounts/u':{active:true,type:'TEAM',entityId:'h',revision:1},'accountEntityOwners/teams_h':{uid:'u',type:'TEAM',entityId:'h'},'teams/h':{status:'ACTIVE',password:'legacy-secret'}});
 const handler=createMatchHandler({db,enabled:true,auth:{verifyIdToken:async()=>({uid:'u'})}});
 const session=body=>handler(new Request('https://example.test/matches/session',{method:'POST',headers:{authorization:'Bearer token','content-type':'application/json'},body:JSON.stringify(body)}));
 const good=await session({});assert.equal(good.status,200);assert.deepEqual(await good.json(),{type:'USER',entityId:'h',revision:1});
 for(const body of [{uid:'other'},{type:'ADMIN'},{entityId:'other'}])assert.equal((await session(body)).status,400);
 db.values.get('authAccounts/u').active=false;
 assert.equal((await session({})).status,400);
});
