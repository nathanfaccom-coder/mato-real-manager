import React,{useState} from 'react';
import {careerOf,addStats} from '../matches/policy.js';
const labels={appearances:'Jogos',seconds:'Minutos',goals:'Gols',assists:'Assistências',tackles:'Desarmes',saves:'Defesas',yellows:'Amarelos',reds:'Vermelhos'};
export function MatchCareer({player}) {
 const [tab,setTab]=useState('total');const c=careerOf(player);
 const current=addStats(c.official,c.friendly),stats=tab==='total'?addStats(current,c.legacy):c[tab];
 const unknown=tab==='total'&&Object.keys(c.legacy).length&&!Object.hasOwn(c.legacy,'appearances');
 return <section className="card" aria-label="Carreira por tipo de partida" style={{padding:14}}>
  <h3>Carreira</h3><div role="tablist" aria-label="Categoria" style={{display:'flex',gap:6}}>
  {[['official','Oficial'],['friendly','Amistoso'],['total','Total']].map(([key,label])=><button type="button" key={key} role="tab" aria-selected={tab===key} className={`btn ${tab===key?'btn-green':'btn-ghost'}`} onClick={()=>setTab(key)}>{label}</button>)}
  </div><dl style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
  {Object.entries(labels).map(([key,label])=><div key={key}><dt>{label}</dt><dd style={{margin:0,fontWeight:700}}>{(key==='seconds'?Math.round(stats[key]/60):stats[key]).toLocaleString('pt-BR')}{unknown&&['appearances','seconds'].includes(key)?' + histórico desconhecido':''}</dd></div>)}
  <div><dt>Nota média</dt><dd style={{margin:0}}>{stats.ratingCount?(stats.ratingSum/stats.ratingCount).toFixed(1):'—'}</dd></div></dl>
  {tab==='total'&&Object.keys(c.legacy).length>0&&<p style={{fontSize:12}}>Inclui os números antigos disponíveis, sem classificação entre oficial e amistoso. Temporadas apagadas anteriormente não foram reconstruídas.</p>}
  {!player.career&&<p style={{fontSize:12}}>Os registros anteriores estão preservados no Total. A classificação começa com as novas súmulas processadas.</p>}
 </section>;
}
