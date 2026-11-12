// Real action + dashboard, isolated API and throwing database stub: no live writes.
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {chromium} from '@playwright/test';
const harness=`import React from 'react';
import {AssistantDashboard} from './components/AssistantDashboard.jsx';
import {AssistantPerks} from './components/AssistantPerks.jsx';
import {createPlayersActions} from './actions/players.js';
const assistant={id:'s',type:'ASSISTANT',name:'Auxiliar',teamId:'t',energy:10,xp:0,level:1,perks:[{id:'COFFEE_LOVER'}]};
const team={id:'t',name:'Clube'},players=[{id:'p',name:'Atleta',teamId:'t',energy:90}];
window.__calls=[];window.__alerts=[];window.alert=text=>window.__alerts.push(text);
export function App(){
 if(location.search==='?perks')return React.createElement(AssistantPerks,{staffId:'s',pendingPerks:1});
 const recoveryRequestRef=React.useRef(null);
 const {handleAssistantRegen}=createPlayersActions({automaticMatches:true,user:{type:'ASSISTANT',data:assistant},players,teams:[team],setLoading:()=>{},recoveryRequestRef,recoverPlayers:async input=>{window.__calls.push(input);await new Promise(r=>setTimeout(r,100));if(window.__calls.length===1)throw Error('Resposta perdida');return {cost:10,rows:[{playerId:'p',name:'Atleta',energyRecovered:10,xp:2}]};}},{});
 window.__recover=handleAssistantRegen;
 return React.createElement(AssistantDashboard,{assistant,team,players,offers:[],sales:[],onTrainRegen:handleAssistantRegen});
}`;
let browser;
const server=await createServer({server:{host:'127.0.0.1',port:0,open:false},plugins:[{name:'isolated-recovery',enforce:'pre',transform(code,id){
 if(id.endsWith('/src/App.jsx'))return harness;
 if(id.endsWith('/src/services/game-auth.js'))return `export const secureGameLogin=true;export const matchApi=()=>({assistantPerks:async()=>window.__chosen?{revision:null,options:[]}:{revision:7,options:[{id:'ICE_BATH',name:'Crioterapia',desc:'Recupera energia.'},{id:'GOOD_VIBES',name:'Resenha',desc:'Melhora humor.'}]},chooseAssistantPerk:async input=>{window.__choices=window.__choices||[];window.__choices.push(input);if(window.__choices.length===1)throw Error('Resposta de escolha perdida');window.__chosen=true;return {pendingPerks:0};},study:async input=>{window.__studies=window.__studies||[];window.__studies.push(input);await new Promise(r=>setTimeout(r,100));if(window.__studies.length===1)throw Error('Resposta de estudo perdida');return {gain:12,cost:20,level:3,leveledUp:true};}});`;
 if(id.endsWith('/src/services/firebase.js'))return `const deny=()=>{window.__writes=(window.__writes||0)+1;throw Error('Unexpected database access');};export const db=new Proxy({},{get:()=>deny});export const firebase={firestore:deny};`;
}}]});
try{
 await server.listen();browser=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/app.html`);
 await page.getByText('Atleta',{exact:true}).click();
 const button=page.getByRole('button',{name:/INICIAR REGENERATIVO/});
 await button.click();await page.waitForFunction(()=>window.__alerts.length===1);
 assert.match((await page.evaluate(()=>window.__alerts))[0],/Resposta perdida/);
 // Selection stays checked on uncertain failure; the retry must reuse its ID.
 await button.click();await page.waitForFunction(()=>window.__alerts.length===2);
 const calls=await page.evaluate(()=>window.__calls);assert.equal(calls.length,2);assert.deepEqual(calls[0],calls[1]);assert.deepEqual(calls[0].playerIds,['p']);
 assert.match((await page.evaluate(()=>window.__alerts))[1],/\+10⚡/);
 await button.click();assert.match((await page.evaluate(()=>window.__alerts)).at(-1),/Selecione/);
 await page.evaluate(()=>Promise.all([window.__recover(['p']),window.__recover(['p'])]));
 assert.equal((await page.evaluate(()=>window.__calls)).length,3);
 await page.getByRole('button',{name:'ESTUDAR',exact:true}).click();
 await page.getByRole('button',{name:/ASSISTIR VÍDEOS/}).click();
 await page.waitForFunction(()=>window.__alerts.some(a=>a.includes('Resposta de estudo perdida')));
 await page.getByRole('button',{name:/ASSISTIR VÍDEOS/}).click();
 await page.waitForFunction(()=>window.__alerts.some(a=>a.includes('Estudo confirmado')));
 const studies=await page.evaluate(()=>window.__studies);assert.equal(studies.length,2);assert.deepEqual(studies[0],studies[1]);
 assert.equal(await page.evaluate(()=>window.__writes||0),0);assert.deepEqual(errors,[]);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=390),true);
 await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/app.html?perks`);
 await page.getByRole('button',{name:/Crioterapia/}).click();
 await page.getByRole('alert').filter({hasText:'Resposta de escolha perdida'}).waitFor();
 await page.getByRole('button',{name:/Crioterapia/}).click();
 await page.getByText('Nenhuma habilidade disponível para escolher.').waitFor();
 const choices=await page.evaluate(()=>window.__choices);assert.deepEqual(choices,[{revision:7,perkId:'ICE_BATH'},{revision:7,perkId:'ICE_BATH'}]);
 assert.equal(await page.evaluate(()=>window.__writes||0),0);assert.deepEqual(errors,[]);
 console.log('PASS: mobile recovery and study use API only, preserve request IDs after lost responses, recovery selection clears only on confirmation, duplicate clicks prevented.');
}finally{await browser?.close();await server.close();}
