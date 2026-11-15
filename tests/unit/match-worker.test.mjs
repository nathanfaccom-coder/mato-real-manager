import test from 'node:test';import assert from 'node:assert/strict';
import {makeSnapshot} from '../../src/simulation/engine.js';
import {finalizeDueMatch} from '../../server/match-worker.js';
import {memoryDB} from '../helpers/memory-db.mjs';
test('worker finalizes without an open viewer and repeated work never duplicates rewards',async()=>{
 const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE'];
 const players=[0,1].flatMap(side=>roles.map((position,i)=>({id:`p${side}_${i}`,teamId:`t${side}`,name:'Jogador',position,overall:60,energy:100})));
 const snapshot=makeSnapshot({id:'t0',name:'A'},{id:'t1',name:'B'},players,144);
 const db=memoryDB(Object.fromEntries(players.map(p=>[`players/${p.id}`,p])));
 const endsAt=Date.parse('2026-10-25T18:00:00Z');
 db.values.set('matchRuns/a',{status:'RUNNING',kind:'FRIENDLY',snapshot,endsAt,seasonId:'s1'});
 assert.deepEqual(await finalizeDueMatch(db,'a',endsAt-1),{pending:true});
 await finalizeDueMatch(db,'a',endsAt);
 const first=structuredClone(db.values.get('players/p0_0'));
 assert.ok(first.career.friendly.appearances===1);assert.ok(first.energy<100);
 assert.equal(db.values.get('matchRuns/a').status,'FINISHED');
 assert.deepEqual(await finalizeDueMatch(db,'a',endsAt+60000),{duplicate:true});
 assert.deepEqual(db.values.get('players/p0_0'),first);
});
