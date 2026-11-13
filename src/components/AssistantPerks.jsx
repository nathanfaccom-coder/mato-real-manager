import React, {useEffect,useRef,useState} from 'react';
import {matchApi} from '../services/game-auth.js';
export function AssistantPerks({staffId,pendingPerks,staffRole="ASSISTANT"}) {
 const [offer,setOffer]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const lock=useRef(false),generation=useRef(0);
 const load=async()=>{
  const current=++generation.current;setOffer(null);setError('');
  try {const result=await (staffRole==='ASSISTANT'?matchApi().assistantPerks():matchApi().staffPerks());if(current===generation.current)setOffer(result);}
  catch(e){if(current===generation.current)setError(e.message);}
 };
 useEffect(()=>{load();return()=>{generation.current++;};},[staffId,pendingPerks,staffRole]);
 const choose=async perkId=>{
  if(lock.current||!offer)return;
  lock.current=true;setBusy(true);setError('');const current=generation.current;
  try {await (staffRole==='ASSISTANT'?matchApi().chooseAssistantPerk({revision:offer.revision,perkId}):matchApi().chooseStaffPerk({revision:offer.revision,perkId}));if(current===generation.current)await load();}
  catch(e){if(current===generation.current)setError(e.message+' Tente a mesma escolha novamente; ela não consumirá outro ponto.');}
  finally {lock.current=false;setBusy(false);}
 };
 return <section className="card" aria-label="Habilidades da comissão técnica">
  <h3>✨ ESPECIALIZAÇÃO TÉCNICA!</h3>
  {error&&<p role="alert">{error}</p>}
  {!offer&&!error&&<p>Carregando habilidades…</p>}
  {offer?.options.length===0&&<p>Nenhuma habilidade disponível para escolher.</p>}
  {offer?.options.map(p=><button key={p.id} className="btn" disabled={busy} onClick={()=>choose(p.id)} style={{display:'block',width:'100%',whiteSpace:'normal',marginBottom:8,textAlign:'left'}}><b>{p.name}</b><br/><small>{p.desc}</small></button>)}
  <button className="btn" disabled={busy} onClick={load}>ATUALIZAR OPÇÕES</button>
 </section>;
}
