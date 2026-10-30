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

test('calendar review and decision force refreshed tokens and discard client privileges',async()=>{
 const calls=[],refresh=[];const auth={currentUser:{getIdToken:async force=>{refresh.push(force);return 'fresh';}}};
 const client=createMatchClient({auth,endpoint:'https://example.test',fetchImpl:async(url,opts)=>{calls.push(JSON.parse(opts.body));return Response.json({});}});
 await client.reviewFixture('f1');
 await client.approveFixture({fixtureId:'f1',homeId:'h',awayId:'a',competitionId:'cup',seasonId:'season_1',approved:true,expectedRevision:2,reason:'Revisado',uid:'forged',canApprove:true});
 assert.deepEqual(refresh,[true,true]);assert.deepEqual(calls[0],{fixtureId:'f1'});
 assert.equal(calls[1].uid,undefined);assert.equal(calls[1].canApprove,undefined);assert.equal(calls[1].expectedRevision,2);
});

test('correction requests refresh identity and strip XP, participation and private fields',async()=>{
 const calls=[],refresh=[];const auth={currentUser:{getIdToken:async force=>{refresh.push(force);return 'fresh';}}};
 const client=createMatchClient({auth,endpoint:'https://example.test',fetchImpl:async(url,opts)=>{calls.push(JSON.parse(opts.body));return Response.json({});}});
 await client.reviewCorrection('m');
 await client.correct({matchId:'m',expectedRevision:2,reason:'Revisado',score:[0,0],ownGoals:[0,0],uid:'forged',players:{p:{name:'private',side:1,seconds:9999,xp:999,goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,rating:6}}});
 assert.deepEqual(refresh,[true,true]);assert.deepEqual(calls[0],{matchId:'m'});
 assert.deepEqual(calls[1].players.p,{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,rating:6});assert.equal(calls[1].uid,undefined);
});
