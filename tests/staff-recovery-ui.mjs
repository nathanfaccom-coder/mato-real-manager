// Real action + dashboard, isolated API and throwing database stub: no live writes.
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {chromium} from '@playwright/test';
const harness=`import React from 'react';
import {AssistantDashboard} from './components/AssistantDashboard.jsx';
import {createPlayersActions} from './actions/players.js';
const assistant={id:'s',type:'ASSISTANT',name:'Auxiliar',teamId:'t',energy:10,xp:0,level:1,perks:[{id:'COFFEE_LOVER'}]};
const team={id:'t',name:'Clube'},players=[{id:'p',name:'Atleta',teamId:'t',energy:90}];
window.__calls=[];window.__alerts=[];window.alert=text=>window.__alerts.push(text);
export function App(){
 const recoveryRequestRef=React.useRef(null);
 const {handleAssistantRegen}=createPlayersActions({automaticMatches:true,user:{type:'ASSISTANT',data:assistant},players,teams:[team],setLoading:()=>{},recoveryRequestRef,recoverPlayers:async input=>{window.__calls.push(input);await new Promise(r=>setTimeout(r,100));if(window.__calls.length===1)throw Error('Resposta perdida');return {cost:10,rows:[{playerId:'p',name:'Atleta',energyRecovered:10,xp:2}]};}},{});
 window.__recover=handleAssistantRegen;
 return React.createElement(AssistantDashboard,{assistant,team,players,offers:[],sales:[],onTrainRegen:handleAssistantRegen});
}`;
let browser;
const server=await createServer({server:{host:'127.0.0.1',port:0,open:false},plugins:[{name:'isolated-recovery',enforce:'pre',transform(code,id){
 if(id.endsWith('/src/App.jsx'))return harness;
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
 assert.equal(await page.evaluate(()=>window.__writes||0),0);assert.deepEqual(errors,[]);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=390),true);
 console.log('PASS: mobile recovery uses API only, preserves selection/request ID after lost response, clears confirmed selection, prevents duplicate clicks.');
}finally{await browser?.close();await server.close();}
