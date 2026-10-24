import React, { useState } from 'react';
import { db } from '../services/firebase.js';
import { FORMATIONS } from '../game/FORMATIONS.js';
import { POSTURES, controlsTeam } from './live-tactics.js';
import { timeAtElapsed, timelineDurationMs } from './timeline.js';
export function LiveCoach({ user, record, match, time }) {
  const [formation,setFormation] = useState('');
  const [posture,setPosture] = useState('neutral');
  const [playerId,setPlayerId] = useState('');
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState('');
  const side = [record.snapshot.home,record.snapshot.away].findIndex(t => controlsTeam(user,t.id));
  if (side < 0 || record.snapshot.version < 8 || record.playbackIntroAt) return null;
  const team = record.snapshot[side === 0 ? 'home' : 'away'];
  const frame = match.frames[Math.min(match.frames.length-1,Math.floor(time))];
  const penalty = match.events.findLast(e => e.type === 'penalty' && e.side === side && e.t <= time && e.deadline > time);
  const pending = (record.commands || []).filter(c => c.side === side && c.kind === 'tactics' && !match.events.some(e => e.commandId === c.id && e.t <= time));
  async function send(kind) {
    setBusy(true);setMessage('');
    try {
      await db.runTransaction(async tx => {
        const ref = db.collection('friendlyBroadcasts').doc(record.id);
        const doc = await tx.get(ref);
        if (!doc.exists) throw Error('Partida indisponível.');
        const current = doc.data();
        if (!controlsTeam(user,current.snapshot[side === 0 ? 'home' : 'away'].id)) throw Error('Você não controla este time.');
        const elapsed = Date.now() - current.startedAt - (current.preMatchMs || 0);
        if (elapsed < 0 || elapsed >= timelineDurationMs(match)) throw Error('Aguarde o início ou escolha uma partida em andamento.');
        const at = Math.ceil(timeAtElapsed(match,elapsed).time) + 3;
        const commands = current.commands || [];
        if (commands.length >= 120) throw Error('Limite de comandos desta partida atingido.');
        if (commands.some(c => c.side === side && at - c.at < 6)) throw Error('Aguarde dois segundos entre os comandos.');
        const command = { id: crypto.randomUUID(), side, at, kind, author: user.data.id };
        if (kind === 'tactics') Object.assign(command,{formation: formation || frame.formations?.[side] || team.formation,posture});
        else {
          if (!penalty || at > penalty.deadline || !playerId) throw Error('Escolha o cobrador antes do fim do prazo.');
          Object.assign(command,{penaltyAt:penalty.t,playerId});
        }
        tx.update(ref,{ commands: [...commands,command] });
      });
      setMessage(kind === 'tactics' ? 'Comando enviado. Aplicação na próxima saída de bola.' : 'Escolha enviada para esta cobrança.');
    } catch(e) {setMessage(e.message);} finally {setBusy(false);}
  }
  return <section className="card" style={{marginTop:14,padding:14,border:'1px solid #50dfac'}}>
    <h3 style={{marginTop:0}}>Área técnica • {team.name}</h3>
    <p style={{fontSize:12}}>Em campo: {frame.formations?.[side] || team.formation} · {POSTURES[frame.postures?.[side] || 'neutral'].label}</p>
    <label>Formação<select value={formation || frame.formations?.[side] || team.formation} onChange={e=>setFormation(e.target.value)}>{Object.keys(FORMATIONS).map(f=><option key={f}>{f}</option>)}</select></label>
    <label>Postura<select value={posture} onChange={e=>setPosture(e.target.value)}>{Object.entries(POSTURES).map(([key,p])=><option key={key} value={key}>{p.label}</option>)}</select></label>
    <p style={{fontSize:12,color:'#afc9c0'}}>Mais ataque adianta as linhas e aumenta a pressão e o risco de faltas. Mais defesa recua o time e reduz as finalizações. O goleiro mantém sua função.</p>
    <button type="button" className="btn btn-green" disabled={busy} onClick={()=>send('tactics')}>Enviar para a próxima saída de bola</button>
    {pending.length > 0 && <p role="status">Aguardando saída da bola: {pending.at(-1).formation} · {POSTURES[pending.at(-1).posture]?.label}</p>}
    {penalty && <div style={{marginTop:14}}><strong>Pênalti! Escolha em {Math.max(0,Math.ceil((penalty.deadline-time)/3))} s</strong>
      <select aria-label="Cobrador do pênalti" value={playerId} onChange={e=>setPlayerId(e.target.value)}><option value="">Automático: melhor finalizador disponível</option>{match.people.map((p,i)=>p.side===side && frame.positions[i]?.[2] ? <option value={p.id} key={p.id}>{p.name} · Finalização {p.attributes.shot}</option>:null)}</select>
      <button type="button" disabled={busy || !playerId} onClick={()=>send('penalty')}>Confirmar cobrador</button></div>}
    {message && <p role="status">{message}</p>}
  </section>;
}
