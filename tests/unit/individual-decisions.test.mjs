import test from 'node:test';
import assert from 'node:assert/strict';
import {shotDecision,passValue,penaltyPositions} from '../../src/simulation/individual-decisions.js';
import {makeSnapshot,simulateMatch} from '../../src/simulation/engine.js';
import {simulateMatch as v9} from '../../src/simulation/engine-v9.js';
import {FORMATIONS} from '../../src/game/FORMATIONS.js';
const players=[0,1].flatMap(s=>Object.values(FORMATIONS)[0].map((position,i)=>({id:`${s}-${i}`,teamId:String(s),position,overall:70,name:`P${s}-${i}`,attributes:{aggression:95}})));
const snap=()=>makeSnapshot({id:'0',name:'Home'},{id:'1',name:'Away'},players,143);
test('clear chance is taken even with low overall and defensive posture, both directions',()=>{
 for(const overall of [25,60,95]) for(const dir of [-1,1]) assert.equal(shotDecision([dir>0?91:9,32],{x:dir>0?100:0,y:32},dir,0,overall,overall,0,.7),1);
 assert.ok(shotDecision([80,45],{x:98,y:32},1,3,90,90,0)>shotDecision([80,45],{x:98,y:32},1,3,30,30,0));
});
test('passes prefer clear scoring support over backwards recycling or offside',()=>{
 const base={from:{x:84,y:40},dir:1,pressure:0,space:7,overall:85,receiverShot:80,ownChance:.6,returnPass:false,noise:.5};
 const good=passValue({...base,to:{x:87,y:32},receiverChance:1});
 assert.ok(good>passValue({...base,to:{x:60,y:40},receiverChance:0}));
 assert.ok(good>passValue({...base,to:{x:90,y:32},receiverChance:1,offside:true}));
 assert.ok(good>passValue({...base,to:{x:87,y:32},receiverChance:1,pressure:4}));
});
test('penalty layout respects area, mark and radius in both directions',()=>{
 const people=players.map((p,i)=>({...p,slot:i%11}));
 for(const dir of [-1,1]) {
 const layout=penaltyPositions(people,()=>true,9,11,dir),mark=dir>0?89:11;
 assert.equal(layout[11].x,dir>0?100:0);
 layout.forEach((p,i)=>{if(i===9||i===11)return;assert.ok((p.x-mark)*dir<0);assert.ok(Math.hypot(p.x-mark,p.y-32)>=9.15);assert.ok(dir>0?p.x<83.5:p.x>16.5);});
 }
});
test('penalty waits for legal positions and runup; keeper stays on line at contact',()=>{
 const m=simulateMatch(snap());const kicks=m.events.filter(e=>e.type==='penalty-kick');assert.ok(kicks.length);
 for(const kick of kicks){
 const ready=m.events.findLast(e=>e.type==='penalty-ready' && e.t<kick.t);assert.ok(ready && kick.t-ready.t>=5);
 const f=m.frames[kick.t],dir=kick.side===f.period?1:-1,mark=dir>0?89:11;
 assert.equal(f.positions[kick.keeper][0],dir>0?100:0);
 assert.deepEqual(f.ball,[mark,32]);
 f.positions.forEach(([x,y,on],i)=>{if(!on||i===kick.actor||i===kick.keeper)return;assert.ok((x-mark)*dir<0);assert.ok(Math.hypot(x-mark,y-32)>=9.15);assert.ok(dir>0?x<83.5:x>16.5);});
 assert.ok(m.events.some(e=>['goal','save','miss'].includes(e.type)&&e.t===kick.t+3));
 }
});
test('v9 replay is preserved and new simulations remain deterministic',()=>{
 const s=snap();assert.deepEqual(simulateMatch({...s,version:9}),v9({...s,version:9}));
 assert.deepEqual(simulateMatch(s).events,simulateMatch(s).events);
});
