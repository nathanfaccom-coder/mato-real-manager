// Run with Node or Deno: local measurements are NOT hosted Edge certification.
import process from 'node:process';
import {makeSnapshot,simulateMatch} from '../src/simulation/engine.js';
import {reportFromSimulation} from '../src/matches/policy.js';
const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE','GOL','ZAG','LD','VOL','MC','MEI','ATA','PTD','PTE'];
const samples=[];
for(let seed=1;seed<=30;seed++){
 const players=[0,1].flatMap(side=>roles.map((position,i)=>({id:`p${side}_${i}`,teamId:`t${side}`,name:'Jogador',position,overall:40+(seed*7+i*3)%60,energy:25+(seed*11+i)%76})));
 const snapshot=makeSnapshot({id:'t0',name:'Casa'},{id:'t1',name:'Fora'},players,seed);
 snapshot.commands=Array.from({length:120},(_,i)=>({id:`c${i}`,side:i%2,at:45*i,kind:'tactics',formation:'4-3-3 OFENSIVO',posture:['neutral','offensive','allAttack','defensive','allDefense'][i%5]}));
 const before=process.cpuUsage(),start=performance.now();
 const match=simulateMatch(snapshot,{summaryOnly:true});
 const report=reportFromSimulation(match,'OFFICIAL');
 const cpu=process.cpuUsage(before);
 const memory=process.memoryUsage();
 samples.push({seed,wallMs:performance.now()-start,cpuMs:(cpu.user+cpu.system)/1000,heapMiB:memory.heapUsed/1024/1024,rssMiB:memory.rss/1024/1024,players:match.people.length,frames:match.frames.length,participants:Object.keys(report.rows).length});
}
const sorted=samples.map(s=>s.cpuMs).sort((a,b)=>a-b);
console.log(JSON.stringify({runtime:typeof Deno==='undefined'?`Node ${process.version}`:`Deno ${Deno.version.deno}`,scope:'Local summary simulation + report only. Excludes authentication, database, retries and hosted platform overhead.',samples:samples.length,cpuMs:{median:sorted[15],p95:sorted[28],max:sorted[29]},maxWallMs:Math.max(...samples.map(s=>s.wallMs)),maxHeapMiB:Math.max(...samples.map(s=>s.heapMiB)),maxRssMiB:Math.max(...samples.map(s=>s.rssMiB)),all:samples},null,2));
