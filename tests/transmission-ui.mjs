// Isolated component interaction test. No live Firebase/Supabase requests.
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {chromium} from '@playwright/test';
import {makeSnapshot} from '../src/simulation/engine.js';
import {publicMatch} from '../server/match-view.js';
const roles=['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PTD','ATA','PTE'];
const teams=[{id:'h',name:'Casa',status:'ACTIVE'},{id:'a',name:'Fora',status:'ACTIVE'}];
const players=teams.flatMap(t=>roles.map((position,i)=>({id:t.id+i,teamId:t.id,name:'Atleta '+i,position,overall:60,energy:100})));
const snapshot=makeSnapshot(...teams,players,42);
const record=publicMatch({snapshot,status:'FINISHED',kind:'OFFICIAL',commands:[],startedAt:1,preMatchMs:28000,durationMs:1800000,endsAt:1800001,timelineVersion:2},'official_f1',{detail:true});
record.result={score:[2,1],revision:1,rows:{}};
const harness=`import React from 'react';
import {Broadcast} from './simulation/Broadcast.jsx';
import {MatchCenter} from './components/MatchCenter.jsx';
import {FixtureApprovalPanel} from './admin/FixtureApprovalPanel.jsx';
const mode=new URLSearchParams(location.search).get('mode');
const teams=${JSON.stringify(teams)},players=${JSON.stringify(players)};
export function App(){return mode==='approval'?React.createElement(FixtureApprovalPanel,{fixtureId:'f1',onClose:()=>{}}):mode==='center'?React.createElement(MatchCenter,{matches:[{id:'f1',homeName:'Casa',awayName:'Fora',serie:'A',round:1,status:'PENDING'}],teams,isAdmin:false,onReportMatch:()=>{throw Error('press must not report')}}):React.createElement(Broadcast,{user:{type:'ADMIN',data:{id:'NEXLYzsJfLPsTxzp3LKHKwaPhEZ2'}},teams,players,onBack:()=>{}});}`;
const api=`export const secureGameLogin=true;
export const reauthenticateMatchAdministrator=async()=>{};
const record=${JSON.stringify(record)};
window.__calls=[];
export const matchApi=()=>({
reviewFixture:async()=>({fixtureId:'f1',homeId:'h',awayId:'a',homeName:'Casa',awayName:'Fora',competitionId:'cup',competitionName:'Copa',seasonId:'season_1',expectedRevision:0,approved:false,canApprove:true,canRevoke:false,problems:[]}),
approveFixture:async(input)=>{window.__calls.push({route:'approve',input});return {revision:1};},
list:async()=>({matches:[record]}),
read:async(id)=>{window.__calls.push({route:'read',id});return record;},
start:async(input)=>{window.__calls.push({route:'start',input});return {matchId:record.id};},
command:async(input)=>{window.__calls.push({route:'command',input});return {ok:true};}
});`;
let browser;
const server=await createServer({server:{host:'127.0.0.1',port:0,open:false},plugins:[{name:'isolated-transmission-harness',enforce:'pre',transform(code,id){
 if(id.endsWith('/src/App.jsx'))return harness;
 if(id.endsWith('/src/services/game-auth.js'))return api;
}}]});
try {
 await server.listen();
 browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 const url=`http://127.0.0.1:${server.httpServer.address().port}/app.html`;
 await page.goto(url+'?mode=center');
 await page.getByText('Central de Jogos',{exact:true}).waitFor();
 assert.equal(await page.getByText('LANÇAR SÚMULA',{exact:false}).count(),0);
 await page.goto(url);
 await page.getByRole('button',{name:/Casa × Fora/}).click();
 await page.getByText('Resultado registrado: 2 × 1. XP e cansaço aplicados.',{exact:true}).waitFor();
 assert.equal(await page.locator('canvas').count()>0,true);
 assert.equal(await page.evaluate(()=>window.__calls[0].route),'read');
 await page.getByRole('button',{name:'PAUSAR',exact:true}).click();
 await page.getByLabel('Momento da partida',{exact:true}).fill('1200');
 await page.getByRole('button',{name:'CONTINUAR',exact:true}).click();
 await page.waitForFunction(()=>/^20:0[1-9]$/.test(document.querySelector('[data-testid="match-clock"]')?.textContent||''),null,{timeout:5000});

 await page.getByText('Preparar amistoso',{exact:true}).click();
 await page.getByLabel('Mandante',{exact:true}).selectOption('h');
 await page.getByLabel('Visitante',{exact:true}).selectOption('a');
 await page.getByRole('button',{name:'TRANSMITIR AMISTOSO',exact:true}).click();
 await page.waitForFunction(()=>window.__calls.some(c=>c.route==='start'));
 const call=await page.evaluate(()=>window.__calls.find(c=>c.route==='start').input);
 assert.equal(call.homeId,'h');assert.equal(call.awayId,'a');assert.ok(call.requestId);
 assert.equal(call.snapshot,undefined);assert.equal(call.kind,undefined);
 await page.goto(url+'?mode=approval');
 await page.getByLabel('Confirme sua senha de ADM').fill('local-test-password');
 await page.getByRole('button',{name:'CONFIRMAR IDENTIDADE E CONFERIR'}).click();
 await page.getByText('Este calendário não tem aprovação válida.',{exact:true}).waitFor();
 await page.getByLabel('Motivo da decisão').fill('Calendário revisado');
 await page.getByRole('button',{name:'APROVAR CALENDÁRIO',exact:true}).click();
 await page.waitForFunction(()=>window.__calls.some(c=>c.route==='approve'));
 const approval=await page.evaluate(()=>window.__calls.find(c=>c.route==='approve').input);
 assert.equal(approval.homeId,'h');assert.equal(approval.fixtureId,'f1');assert.equal(approval.expectedRevision,0);
 assert.equal(await page.getByLabel('Confirme sua senha de ADM').inputValue(),'');
 assert.deepEqual(errors,[]);
 console.log('PASS: mobile broadcast replay renders, server result shown, friendly creation uses API, press has no report button.');
}finally{await browser?.close();await server.close();}
