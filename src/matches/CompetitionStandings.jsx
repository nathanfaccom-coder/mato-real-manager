import React,{useEffect,useState} from 'react';
import {matchApi} from '../services/game-auth.js';
import {competitionLinks} from './competition-links.js';

export function CompetitionStandings({competitionId,seasonId,teams=[],onInspectTeam}) {
 const [data,setData]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[refresh,setRefresh]=useState(0);
 useEffect(()=>{
  let cancelled=false;setData(null);setError('');setLoading(true);
  matchApi().standings({competitionId,seasonId}).then(value=>{if(!cancelled)setData(value);}).catch(e=>{if(!cancelled)setError(e.message);}).finally(()=>{if(!cancelled)setLoading(false);});
  return()=>{cancelled=true;};
 },[competitionId,seasonId,refresh]);
 return <section className="card" aria-label="Classificação registrada" style={{overflowWrap:'anywhere',minWidth:0}}>
  <h3>{data?.name||'Classificação da competição'}</h3>
  <p>{seasonId} · Resultados oficiais registrados pelo jogo</p>
  <button className="btn btn-ghost" disabled={loading} onClick={()=>setRefresh(n=>n+1)}>ATUALIZAR CLASSIFICAÇÃO</button>
  {loading&&<p role="status">Carregando classificação…</p>}
  {error&&<p role="alert">{error}</p>}
  {data&&<>
   {!data.registeredTeamsIncluded&&<p>Exibindo os clubes que já possuem resultados registrados nesta competição.</p>}
   {data.rows.length===0?<p>Nenhum resultado registrado nesta competição.</p>:<table style={{width:'100%',tableLayout:'fixed',borderCollapse:'collapse',fontSize:12}}>
    <caption style={{textAlign:'left',marginBottom:10}}>Pontos, vitórias e saldo de gols. Clubes empatados nesses critérios compartilham a posição.</caption>
    <thead><tr><th style={{width:'52%',textAlign:'left'}}>Time</th><th title="Pontos">P</th><th title="Jogos">J</th><th title="Vitórias">V</th><th title="Saldo de gols">SG</th></tr></thead>
    <tbody>{data.rows.map(row=>{
     const team=teams.find(t=>t.id===row.teamId);
     return <tr key={row.teamId} style={{borderTop:'1px solid #444'}}>
      <td style={{padding:'10px 2px'}}>{row.position}. {team&&onInspectTeam?<button type="button" onClick={()=>onInspectTeam(team)} style={{border:0,background:'transparent',color:'inherit',font:'inherit',textAlign:'left',padding:0,overflowWrap:'anywhere'}}>{row.name}</button>:row.name}</td>
      <td style={{textAlign:'center'}}>{row.pts}</td><td style={{textAlign:'center'}}>{row.played}</td><td style={{textAlign:'center'}}>{row.wins}</td><td style={{textAlign:'center'}}>{row.gf-row.ga}</td>
     </tr>;
    })}</tbody>
   </table>}
  </>}
 </section>;
}

export function LinkedCompetitionStandings({matches,serie,estado,teams,onInspectTeam}) {
 const links=competitionLinks(matches,serie,estado);
 const [selected,setSelected]=useState('');
 const current=links.find(([id])=>id===selected)||links[0];
 if(!current)return <div className="card"><p>Nenhuma competição vinculada a esta tabela. O ADM precisa conferir o calendário oficial.</p></div>;
 return <div>
  {links.length>1&&<label>Competição e temporada<select className="input-field" value={current[0]} onChange={e=>setSelected(e.target.value)}>{links.map(([id,c])=><option key={id} value={id}>{c.competitionId} · {c.seasonId}</option>)}</select></label>}
  <CompetitionStandings key={current[0]} {...current[1]} teams={teams} onInspectTeam={onInspectTeam}/>
 </div>;
}
