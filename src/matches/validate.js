import {COUNTERS,KINDS} from './policy.js';

export function validDocumentId(value) {
 return typeof value==='string' && /^[\w-]{1,128}$/.test(value);
}

// Defense in depth for trusted callers. Authentication, fixture membership and
// derivation of XP from real match events must happen BEFORE this boundary.
export function validateReport(report) {
 if(!report || !KINDS.includes(report.kind))throw Error('Tipo de partida inválido.');
 if(!Array.isArray(report.score)||report.score.length!==2||report.score.some(n=>!Number.isSafeInteger(n)||n<0))throw Error('Placar inválido.');
 if(!report.rows||typeof report.rows!=='object'||Array.isArray(report.rows))throw Error('Participações inválidas.');
 if(Object.keys(report.rows).length>50)throw Error('Participantes demais.');
 for(const [id,row] of Object.entries(report.rows)) {
  if(!validDocumentId(id)||!row||typeof row!=='object')throw Error('Jogador inválido.');
  if(!Number.isSafeInteger(row.baseXP)||!Number.isFinite(row.energy)||row.energy<0||row.energy>100)throw Error('XP ou cansaço inválido.');
  const s=row.stats;
  if(!s||COUNTERS.some(k=>!Number.isFinite(s[k])||s[k]<0))throw Error('Estatísticas inválidas.');
  if(COUNTERS.filter(k=>k!=='ratingSum').some(k=>!Number.isSafeInteger(s[k])))throw Error('Contadores inválidos.');
  if(s.appearances!==1||s.seconds<=0||s.seconds>10800||s.ratingCount!==1||s.ratingSum>10||s.yellows>2||s.reds>1)throw Error('Participação inválida.');
 }
}
