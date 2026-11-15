import test from 'node:test';
import assert from 'node:assert/strict';
import {makeSnapshot,simulateMatch} from '../../src/simulation/engine.js';
import {settleMatch} from '../../src/matches/settle.js';
import {emptyStats} from '../../src/matches/policy.js';
import {memoryDB} from '../helpers/memory-db.mjs';
const teams=[{id:'h',name:'Casa'},{id:'a',name:'Fora'}];
const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE'];
const players=()=>teams.flatMap(t=>roles.map((position,i)=>({id:t.id+i,teamId:t.id,name:t.id+i,position,overall:60,energy:100})));
test('settled fatigue carries into the next snapshot, without replay mutating stored energy',async()=>{
 const roster=players(),db=memoryDB(Object.fromEntries(roster.map(p=>['players/'+p.id,p])));
 const report={kind:'OFFICIAL',score:[0,0],rows:{h1:{side:0,energy:25,baseXP:40,stats:{...emptyStats(),appearances:1,seconds:5400,ratingSum:6,ratingCount:1}}}};
 await settleMatch(db,{matchId:'previous',report,finishedAt:Date.parse('2026-10-29T12:00:00Z'),seasonId:'season_1'});
 const current=roster.map(p=>({...db.values.get('players/'+p.id)}));
 const snapshot=makeSnapshot(...teams,current,42),before=structuredClone(snapshot);
 assert.equal(snapshot.home.lineup.find(p=>p.id==='h1').energy,75);
 simulateMatch(snapshot,{summaryOnly:true});assert.deepEqual(snapshot,before);assert.equal(db.values.get('players/h1').energy,75);
});
test('below minimum energy cannot play, while tired eligible athletes alter simulation performance',()=>{
 const roster=players(),fresh=makeSnapshot(...teams,roster,42);
 roster.find(p=>p.id==='h1').energy=24;
 assert.throws(()=>makeSnapshot(...teams,roster,42),/energia mínima 25/);
 roster.find(p=>p.id==='h1').energy=25;
 const tired=makeSnapshot(...teams,roster,42);
 const a=simulateMatch(fresh,{summaryOnly:true}),b=simulateMatch(tired,{summaryOnly:true});
 assert.notDeepEqual(a.frames,b.frames);
 assert.equal(tired.home.lineup.find(p=>p.id==='h1').energy,25);
});
