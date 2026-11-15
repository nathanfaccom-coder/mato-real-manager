export function competitionLinks(matches,serie,estado) {
 return [...new Map(matches.filter(m=>
  m.competitionId&&m.seasonId&&(serie==='ESTADUAL'
   ?m.isEstadual===true&&m.estado===estado
   :!m.isEstadual&&(m.serie||'A')===serie)
 ).map(m=>[`${m.competitionId}/${m.seasonId}`,{competitionId:m.competitionId,seasonId:m.seasonId}])).entries()];
}
