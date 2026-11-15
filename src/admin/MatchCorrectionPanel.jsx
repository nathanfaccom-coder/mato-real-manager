import React,{useState} from 'react';
import {matchApi,reauthenticateMatchAdministrator} from '../services/game-auth.js';
const fields={goals:'Gols',assists:'Assistências',tackles:'Desarmes',saves:'Defesas',yellows:'Amarelos',reds:'Vermelhos',rating:'Nota'};
export function MatchCorrectionPanel({matchId,onClose,onSaved}) {
 const [review,setReview]=useState(null),[draft,setDraft]=useState(null),[password,setPassword]=useState(''),[reason,setReason]=useState('');
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 async function execute(task){if(busy)return;setBusy(true);setError('');setMessage('');try{await task();}catch(e){setReview(null);setDraft(null);setError(e.message);}finally{setBusy(false);}}
 async function load(){setReview(null);setDraft(null);const value=await matchApi().reviewCorrection(matchId);setReview(value);setDraft(structuredClone(value));setReason('');}
 async function authenticate(e){e.preventDefault();const entered=password;setPassword('');await execute(async()=>{await reauthenticateMatchAdministrator(entered);await load();});}
 async function save(e){e.preventDefault();await execute(async()=>{
  const payload={matchId,expectedRevision:review.expectedRevision,reason:reason.trim(),score:draft.score.map(Number),ownGoals:draft.ownGoals.map(Number),players:Object.fromEntries(Object.entries(draft.players).map(([id,p])=>[id,Object.fromEntries(Object.keys(fields).map(k=>[k,Number(p[k])]))]))};
  await matchApi().correct(payload);await load();setMessage('Correção registrada. Resultado, carreira e XP atualizados; cansaço preservado.');
  if(onSaved)await onSaved();
 });}
 function number(label,value,change,max=100,step=1){return <label style={{display:'grid',gap:4,minWidth:0}}>{label}<input className="input-field" aria-label={label} type="number" required min="0" max={max} step={step} value={value} onChange={e=>change(e.target.value)} style={{width:'100%',minWidth:0,boxSizing:'border-box'}}/></label>;}
 return <section className="card" aria-label="Correção de resultado" style={{overflowWrap:'anywhere'}}>
  <h3>Corrigir súmula registrada</h3>
  <p>Corrija os fatos da partida. O jogo recalcula o XP e mantém os participantes, o tempo jogado e o cansaço.</p>
  <form onSubmit={authenticate}><fieldset disabled={busy} style={{border:0,padding:0,minWidth:0}}>
   <label>Confirme sua senha de ADM<input className="input-field" type="password" autoComplete="current-password" maxLength={128} value={password} onChange={e=>setPassword(e.target.value)}/></label>
   <button className="btn btn-blue" disabled={!password}>CONFIRMAR IDENTIDADE E CARREGAR SÚMULA</button>
   <button type="button" className="btn btn-ghost" onClick={()=>execute(load)}>RECARREGAR SÚMULA</button>
  </fieldset></form>
  {review&&draft&&<form onSubmit={save}>
   <p><strong>{review.homeName} × {review.awayName}</strong></p>
   <p>{review.kind==='OFFICIAL'?'Oficial':'Amistoso'} · {review.seasonId} · Revisão {review.expectedRevision}</p>
   {!review.canCorrect&&<p role="alert">{review.problem}</p>}
   <fieldset disabled={busy||!review.canCorrect} style={{border:0,padding:0,minWidth:0}}>
    {[0,1].map(side=><div key={side} className="card">
     <h4>{side===0?review.homeName:review.awayName}</h4>
     {number(side===0?'Placar mandante':'Placar visitante',draft.score[side],v=>setDraft(d=>({...d,score:d.score.map((n,i)=>i===side?v:n)})))}
     {number(side===0?'Gols contra a favor do mandante':'Gols contra a favor do visitante',draft.ownGoals[side],v=>setDraft(d=>({...d,ownGoals:d.ownGoals.map((n,i)=>i===side?v:n)})))}
     {Object.entries(draft.players).filter(([,p])=>p.side===side).map(([id,p])=><details key={id}>
      <summary style={{padding:'12px 0'}}>{p.name} · {Math.round(p.seconds/60)} min</summary>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10}}>{Object.entries(fields).map(([key,label])=><React.Fragment key={key}>{number(`${label} — ${p.name} (${id})`,p[key],v=>setDraft(d=>({...d,players:{...d.players,[id]:{...d.players[id],[key]:v}}})),key==='rating'?10:key==='yellows'?2:key==='reds'?1:100,key==='rating'?0.1:1)}</React.Fragment>)}</div>
     </details>)}
    </div>)}
    <label>Motivo da correção<textarea className="input-field" required minLength={3} maxLength={1000} value={reason} onChange={e=>setReason(e.target.value)}/></label>
    <button className="btn btn-green" disabled={reason.trim().length<3}>SALVAR CORREÇÃO</button>
   </fieldset>
  </form>}
  {busy&&<p role="status">Conferindo súmula…</p>}{error&&<p role="alert">{error} Recarregue a súmula antes de tentar novamente.</p>}{message&&<p role="status">{message}</p>}
  <button className="btn btn-ghost" disabled={busy} onClick={onClose}>FECHAR CORREÇÃO</button>
 </section>;
}
