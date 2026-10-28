import React,{useState} from 'react';
import {matchApi,reauthenticateMatchAdministrator} from '../services/game-auth.js';

export function FixtureApprovalPanel({fixtureId,onClose}) {
 const [review,setReview]=useState(null),[password,setPassword]=useState(''),[reason,setReason]=useState('');
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 async function execute(task){
  if(busy)return;
  setBusy(true);setError('');setMessage('');
  try{await task();}catch(e){setReview(null);setError(e.message);}finally{setBusy(false);}
 }
 async function load(){setReview(null);setReview(await matchApi().reviewFixture(fixtureId));}
 async function confirmIdentity(event){
  event.preventDefault();
  const entered=password;setPassword('');
  await execute(async()=>{await reauthenticateMatchAdministrator(entered);await load();});
 }
 async function decide(approved){
  await execute(async()=>{
   await matchApi().approveFixture({...review,approved,reason});
   await load();setReason('');
   setMessage(approved?'Calendário aprovado. O jogo oficial pode ser iniciado pela Central de Jogos.':'Aprovação retirada. Esta partida não pode começar como oficial.');
  });
 }
 return <section className="card" aria-label="Aprovação do calendário" style={{overflowWrap:'anywhere'}}>
  <h3>Conferir jogo oficial</h3>
  <p>A aprovação autoriza esta combinação de clubes, competição e temporada a valer experiência oficial.</p>
  <form onSubmit={confirmIdentity}>
   <fieldset disabled={busy} style={{border:0,padding:0,minWidth:0}}>
    <label>Confirme sua senha de ADM
     <input className="input-field" type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} maxLength={128}/>
    </label>
    <button className="btn btn-blue" disabled={!password}>CONFIRMAR IDENTIDADE E CONFERIR</button>
    <button type="button" className="btn btn-ghost" onClick={()=>execute(load)}>ATUALIZAR CONFERÊNCIA</button>
   </fieldset>
  </form>
  {review&&<div>
   <p><strong>{review.homeName} × {review.awayName}</strong></p>
   <p>Competição: {review.competitionName} · {review.competitionId||'não vinculada'}</p>
   <p>Temporada: {review.seasonId||'não vinculada'}</p>
   <p>{review.approved?'Aprovação válida para este calendário.':'Este calendário não tem aprovação válida.'}</p>
   {review.problems.length>0&&<ul>{review.problems.map(problem=><li key={problem}>{problem}</li>)}</ul>}
   <fieldset disabled={busy} style={{border:0,padding:0,minWidth:0}}>
    <label>Motivo da decisão
     <textarea className="input-field" maxLength={500} value={reason} onChange={e=>setReason(e.target.value)}/>
    </label>
    <button className="btn btn-green" disabled={!review.canApprove||reason.trim().length<3} onClick={()=>decide(true)}>APROVAR CALENDÁRIO</button>
    <button className="btn btn-red" disabled={!review.canRevoke||reason.trim().length<3} onClick={()=>decide(false)}>RETIRAR APROVAÇÃO</button>
   </fieldset>
  </div>}
  {busy&&<p role="status">Conferindo…</p>}
  {error&&<p role="alert">{error}</p>}
  {message&&<p role="status">{message}</p>}
  <button className="btn btn-ghost" disabled={busy} onClick={onClose}>FECHAR CONFERÊNCIA</button>
 </section>;
}
