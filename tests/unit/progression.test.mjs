import test from 'node:test';import assert from 'node:assert/strict';
import {evolveSeason,overallFor} from '../../src/game/progression.js';
test('small XP remainders and negative XP are preserved symmetrically',()=>{
 for(const xp of [20,-20])assert.equal(evolveSeason({overall:45,position:'ATA',attributes:{shot:45},xp}).xp,xp);
});
test('capped targets do not waste XP; eligible attribute grows instead',()=>{
 const r=evolveSeason({overall:45,position:'ATA',attributes:{shot:99,speed:45},xp:100},()=>0);
 assert.equal(r.attributes.speed,47);assert.equal(r.xp,0);
 assert.equal(evolveSeason({overall:99,position:'ATA',attributes:{shot:99},xp:2000}).xp,2000);
});
test('overall always recalculates even without XP; unknown attributes excluded',()=>{
 assert.equal(overallFor('ATA',{shot:60,gk:99,strength:99}),60);
 assert.equal(evolveSeason({overall:45,position:'ATA',attributes:{shot:60},xp:0}).overall,60);
});
test('position bonuses only once per distinct position',()=>{
 const r=evolveSeason({position:'ATA',attributes:{shot:50,shotPower:50,header:50},pendingPosBoosts:['ATA','ATA']});
 assert.equal(r.attributes.shot,53);assert.deepEqual(r.pendingPosBoosts,[]);
});
