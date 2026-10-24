import test from 'node:test';
import assert from 'node:assert/strict';
import {makeSnapshot,simulateMatch} from '../../src/simulation/engine.js';
import {simulateMatch as old} from '../../src/simulation/engine-v7.js';
import {FORMATIONS} from '../../src/game/FORMATIONS.js';
import {controlsTeam} from '../../src/simulation/live-tactics.js';
const roles=Object.values(FORMATIONS)[0];
const players=[0,1].flatMap(side=>roles.map((position,i)=>({id:`${side}-${i}`,teamId:String(side),position,overall:70,name:`Player ${side}-${i}`,attributes:{aggression:95}})));
const snap=()=>makeSnapshot({id:'0',name:'Home'},{id:'1',name:'Away'},players,143);
test('shared commands preserve played history and apply only at boundary restart',()=>{
 const s=snap();const base=simulateMatch(s);const command={id:'a',side:0,at:200,kind:'tactics',formation:Object.keys(FORMATIONS)[2],posture:'allAttack'};
 const m=simulateMatch({...s,commands:[command]});
 assert.deepEqual(m.frames.slice(0,200),base.frames.slice(0,200));
 const e=m.events.find(e=>e.commandId==='a');assert.ok(e && e.t>=200);
 assert.ok(m.events.some(x=>x.t===e.t && ['corner','throwin','goalkick'].includes(x.type)));
 assert.equal(m.frames[e.t].postures[0],'allAttack');
 assert.deepEqual(m.events,simulateMatch({...s,commands:[command]}).events);
});
test('old saved simulations still use version seven',()=>{
 const s={...snap(),version:7};assert.deepEqual(simulateMatch(s).score,old(s).score);
});
test('only owning team and assigned coach get controls',()=>{
 assert.equal(controlsTeam({type:'USER',data:{id:'0'}},'0'),true);
 assert.equal(controlsTeam({type:'COACH',data:{teamId:'0'}},'0'),true);
 assert.equal(controlsTeam({type:'COACH',data:{teamId:'1'}},'0'),false);
 assert.equal(controlsTeam({type:'VISITOR',data:{id:'0'}},'0'),false);
});
test('penalty selection uses deadline and preserves earlier frames',()=>{
 const s=snap(),base=simulateMatch(s);const p=base.events.find(e=>e.type==='penalty');assert.ok(p);
 const frame=base.frames[p.t];const i=base.people.findIndex((x,i)=>x.side===p.side && i!==p.actor && frame.positions[i][2]);
 const c={id:'p',kind:'penalty',side:p.side,penaltyAt:p.t,at:p.t+3,playerId:base.people[i].id};
 const m=simulateMatch({...s,commands:[c]});assert.deepEqual(m.frames.slice(0,p.t+1),base.frames.slice(0,p.t+1));
 assert.equal(m.events.find(e=>e.type==='penalty-kick' && e.t>p.t).actor,i);
 const late=simulateMatch({...s,commands:[{...c,at:p.deadline+1}]});assert.equal(late.events.find(e=>e.type==='penalty-kick' && e.t>p.t).actor,p.actor);
});
