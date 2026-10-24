import test from 'node:test';
import assert from 'node:assert/strict';
import {makeSnapshot,simulateMatch} from '../../src/simulation/engine.js';
import {simulateMatch as v8} from '../../src/simulation/engine-v8.js';
import {FORMATIONS} from '../../src/game/FORMATIONS.js';
const roles=Object.values(FORMATIONS)[0];
function snap(){
 const players=[0,1].flatMap(side=>[...roles,'GOL',...Array(8).fill('ATA')].map((position,i)=>({id:`${side}-${i}`,teamId:String(side),position,overall:70,name:`Player ${side}-${i}`,attributes:{aggression:95}})));
 return makeSnapshot({id:'0',name:'Home'},{id:'1',name:'Away'},players,143);
}
const command=(id,at,changes)=>({id,at,side:0,kind:'substitutions',changes});
const pairs=s=>s.home.lineup.slice(1,8).map((p,i)=>({outId:p.id,inId:s.home.bench.filter(p=>p.position!=='GOL')[i].id}));
test('batch waits for stoppage, preserves history and uses one window for five changes',()=>{
 const s=snap(), base=simulateMatch(s), c=command('batch',200,pairs(s).slice(0,5));
 const m=simulateMatch({...s,commands:[c]});
 assert.deepEqual(m.frames.slice(0,200),base.frames.slice(0,200));
 const events=m.events.filter(e=>e.type==='substitution' && e.commandId==='batch');
 assert.equal(events.length,5);assert.equal(new Set(events.map(e=>e.t)).size,1);
 const t=events[0].t;assert.ok(base.events.some(e=>e.t<=t && t-e.t<=30 && ['freekick','penalty','throwin','corner','goalkick','goal'].includes(e.type)));
 assert.equal(m.frames[t].substitutions[0],5);assert.equal(m.frames[t].substitutionWindows[0],1);
 for(const e of events){assert.equal(m.frames[t].positions[e.actor][2],0);assert.equal(m.frames[t].positions[e.incoming][2],1);}
 assert.deepEqual(m.events,simulateMatch({...s,commands:[c]}).events);
});
test('three windows block a fourth, with halftime still available',()=>{
 const s=snap(), p=pairs(s), half=2700+s.addedTime[0]*60;
 const commands=[command('a',200,[p[0]]),command('b',700,[p[1]]),command('c',1300,[p[2]]),command('d',2000,[p[3]]),command('half',half+1,[p[3],p[4]])];
 const m=simulateMatch({...s,commands});
 assert.equal(m.events.find(e=>e.type==='substitutions-processed' && e.commandId==='d').count,0);
 const halftime=m.events.filter(e=>e.type==='substitution' && e.commandId==='half');assert.equal(halftime.length,2);assert.ok(halftime.every(e=>e.halftime));
 assert.equal(m.frames[half+1].substitutionWindows[0],3);assert.equal(m.frames[half+1].substitutions[0],5);
});
test('duplicate incoming, opponent and reentry are rejected',()=>{
 const s=snap(),p=pairs(s);const m=simulateMatch({...s,commands:[command('a',200,[p[0],{...p[1],inId:p[0].inId},{outId:s.away.lineup[1].id,inId:p[2].inId}]),command('b',700,[{outId:p[0].inId,inId:p[0].outId}])]});
 assert.equal(m.events.filter(e=>e.type==='substitution' && e.commandId==='a').length,1);
 assert.equal(m.events.find(e=>e.type==='substitutions-processed' && e.commandId==='b').count,0);
});
test('version eight replay remains unchanged',()=>{const s={...snap(),version:8};assert.deepEqual(simulateMatch(s),v8(s));});
