import React from 'react';
const format=value=>Number.isFinite(value)?value.toLocaleString('pt-BR',{maximumFractionDigits:1}):'—';
// Read only: rewards and ratings come from the committed ledger, never the replay.
export function RecordedMatchSummary({record}) {
 if(!record?.serverOwned||!record.result)return null;
 const {result,snapshot}=record;
 const teams=[snapshot.home,snapshot.away];
 const roster=new Map(teams.flatMap((team,side)=>[...(team.lineup||[]),...(team.bench||[])].map(p=>[p.id,{...p,side}])));
 return <section className="card" aria-label="Súmula registrada" data-testid="recorded-match-summary" style={{overflowWrap:'anywhere'}}>
  <h3>Súmula registrada — {result.kind==='OFFICIAL'?'oficial':'amistoso'}</h3>
  <p><strong>{teams[0].name} {result.score[0]} × {result.score[1]} {teams[1].name}</strong> · Revisão {result.revision}</p>
  <p>Estes são os dados confirmados da partida. Correções do ADM atualizam esta súmula; o replay preserva os lances originais.</p>
  {result.kind==='FRIENDLY'&&<p>Amistosos rendem XP reduzido e respeitam o limite diário. Os valores abaixo já consideram esse limite.</p>}
  {[0,1].map(side=><div key={side}>
   <h4>{teams[side].name}</h4>
   {Object.entries(result.rows).filter(([id])=>roster.get(id)?.side===side).map(([id,row])=>{
    const player=roster.get(id),s=row.stats,minutes=Math.ceil(s.seconds/60);
    const rating=s.ratingCount>0?s.ratingSum/s.ratingCount:null;
    return <article key={id} aria-label={`Registro de ${player.name}`} style={{background:'#172631',borderRadius:8,padding:12,marginBottom:10}}>
     <div style={{display:'flex',gap:12,justifyContent:'space-between',alignItems:'center'}}><strong style={{minWidth:0}}>{player.name}</strong><strong aria-label={`Nota registrada de ${player.name}`} style={{fontSize:22,flexShrink:0,color:'#54e6ad'}}>{format(rating)}</strong></div>
     <p>{player.position} · {format(minutes)} min · {format(s.goals)} gols · {format(s.assists)} assistências</p>
     <p>{format(s.tackles)} desarmes · {format(s.saves)} defesas · {format(s.yellows)} amarelos · {format(s.reds)} vermelhos</p>
     <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
      <strong>XP aplicado: {row.xp>0?'+':''}{format(row.xp)}</strong>
      <span>Energia descontada: {format(row.energyApplied)} pontos</span>
     </div>
    </article>;
   })}
  </div>)}
  <p>O desconto mostra apenas o efeito desta partida. A energia atual pode ter mudado com descanso ou outros jogos.</p>
 </section>;
}
