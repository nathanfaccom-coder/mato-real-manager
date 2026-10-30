import test from 'node:test';
import assert from 'node:assert/strict';
import {makeSnapshot,simulateMatch} from '../../src/simulation/engine.js';
import {reportFromSimulation} from '../../src/matches/policy.js';
test('summary simulation preserves events, scores, XP and fatigue while dropping replay-only frames',()=>{
 const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE','GOL','ZAG','LD','VOL','MC','MEI','ATA','PTD','PTE'];
 for(const seed of [1,2,5,17,30,144,2048,99999]){
  const players=[0,1].flatMap(side=>roles.map((position,i)=>({id:`p${side}_${i}`,teamId:`t${side}`,name:'P',position,overall:40+(seed+i)%60,energy:25+(seed+i)%76})));
  const snapshot=makeSnapshot({id:'t0',name:'A'},{id:'t1',name:'B'},players,seed);
  snapshot.penaltiesOnDraw=true;
  snapshot.commands=Array.from({length:120},(_,i)=>({id:`cmd${i}`,at:i*45,side:i%2,kind:'tactics',formation:'4-3-3 OFENSIVO',posture:['neutral','offensive','allAttack','defensive','allDefense'][i%5]}));
  const full=simulateMatch(snapshot),summary=simulateMatch(snapshot,{summaryOnly:true});
  for(const k of ['score','stats','events','ratings','people','possession','penaltyShootout'])assert.deepEqual(summary[k],full[k],`${k}, seed ${seed}`);
  assert.deepEqual(reportFromSimulation(summary,'OFFICIAL'),reportFromSimulation(full,'OFFICIAL'));
  assert.deepEqual(summary.frames,full.frames.filter(f=>f.t%30===0));
  assert.ok(summary.frames.length<full.frames.length/29);
 }
});
