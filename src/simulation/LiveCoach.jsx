import React, { useState } from 'react';
import { db } from '../services/firebase.js';
import { FORMATIONS } from '../game/FORMATIONS.js';
import { POSTURES, controlsTeam } from './live-tactics.js';
import { timeAtElapsed, timelineDurationMs } from './timeline.js';
export function LiveCoach({ user, record, match, time }) {
  const [formation,setFormation] = useState('');
  const [posture,setPosture] = useState('neutral');
  const [playerId,setPlayerId] = useState('');
  const [changes,setChanges] = useState([]);
  const [outId,setOutId] = useState('');
  const [inId,setInId] = useState('');
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState('');
  const side = [record.snapshot.home,record.snapshot.away].findIndex(t => controlsTeam(user,t.id));
  if (side < 0 || record.snapshot.version < 8 || record.playbackIntroAt) return null;
  const team = record.snapshot[side === 0 ? 'home' : 'away'];
  const frame = match.frames[Math.min(match.frames.length-1,Math.floor(time))];
  const penalty = match.events.findLast(e => e.type === 'penalty' && e.side === side && e.t <= time && e.deadline > time);
  const pending = (record.commands || []).filter(c => c.side === side && c.kind === 'tactics' && !match.events.some(e => e.commandId === c.id && e.t <= time));
  const playedEvents = match.events.filter(e => e.t <= time);
  const unavailable = new Set(playedEvents.filter(e => ['red','injury','substitution'].includes(e.type)).map(e => e.actor));
  const usedReserves = new Set(playedEvents.filter(e => e.type === 'substitution').map(e => e.incoming));
  const bench = match.people.map((p,i)=>({...p,index:i})).filter(p => p.side === side && p.reserve && !usedReserves.has(p.index) && !unavailable.has(p.index));
  const outgoing = match.people.map((p,i)=>({...p,index:i})).filter(p => p.side === side && !playedEvents.some(e => (e.type==='red' || e.type==='substitution') && e.actor===p.index) && (frame.positions[p.index]?.[2] || playedEvents.some(e => e.type==='injury' && e.actor===p.index)));
  const subPending = (record.commands || []).filter(c => c.kind==='substitutions' && c.side===side && !playedEvents.some(e=>e.type==='substitutions-processed' && e.commandId===c.id));
  const remaining = 5 - (frame.substitutions?.[side] || 0);
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
        const clock = timeAtElapsed(match,elapsed);
        const at = Math.ceil(clock.time) + (kind === 'substitutions' && clock.stage.startsWith('halftime') ? 1 : 3);
        if (['ended','fulltime-exit','penalty-shootout'].includes(clock.stage)) throw Error('As substituições encerraram nesta partida.');
        const commands = current.commands || [];
        if (commands.length >= 120) throw Error('Limite de comandos desta partida atingido.');
        if (commands.some(c => c.side === side && at - c.at < 6)) throw Error('Aguarde dois segundos entre os comandos.');
        const command = { id: crypto.randomUUID(), side, at, kind, author: user.data.id };
        if (kind === 'tactics') Object.assign(command,{formation: formation || frame.formations?.[side] || team.formation,posture});
        else if (kind === 'substitutions') {
          if (current.snapshot.version < 9 || !changes.length || changes.length > remaining) throw Error('Confira as trocas e o limite disponível.');
          if (commands.some(c=>c.kind==='substitutions' && c.side===side && !playedEvents.some(e=>e.type==='substitutions-processed' && e.commandId===c.id))) throw Error('Aguarde o pedido anterior ser processado.');
          Object.assign(command,{changes});
        }
        else {
          if (!penalty || at > penalty.deadline || !playerId) throw Error('Escolha o cobrador antes do fim do prazo.');
          Object.assign(command,{penaltyAt:penalty.t,playerId});
        }
        tx.update(ref,{ commands: [...commands,command] });
      });
      if (kind === 'substitutions') setChanges([]);
      setMessage(kind === 'substitutions' ? 'Trocas enviadas. Aguardando a próxima paralisação.' : kind === 'tactics' ? 'Comando enviado. Aplicação na próxima saída de bola.' : 'Escolha enviada para esta cobrança.');
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
    {record.snapshot.version >= 9 && <div style={{marginTop:20,borderTop:'1px solid #456057',paddingTop:14}}>
      <h4>Substituições</h4>
      <p>{remaining} de 5 trocas disponíveis · {Math.max(0,3-(frame.substitutionWindows?.[side] || 0))} de 3 janelas disponíveis</p>
      <p style={{fontSize:12}}>Trocas na próxima paralisação: lateral, falta, escanteio, tiro de meta, pênalti ou intervalo. Várias trocas na mesma parada usam uma janela. O intervalo não gasta janela. Quem saiu não retorna.</p>
      <label>Sai<select value={outId} onChange={e=>{setOutId(e.target.value);setInId('');}}><option value="">Escolha quem sai</option>{outgoing.filter(p=>!changes.some(c=>c.outId===p.id)).map(p=><option key={p.id} value={p.id}>#{p.pixelAppearance.number} {p.name} · {p.position}{unavailable.has(p.index)?' · lesionado':''}</option>)}</select></label>
      <label>Entra<select value={inId} onChange={e=>setInId(e.target.value)}><option value="">Escolha um reserva</option>{bench.filter(p=>!changes.some(c=>c.inId===p.id) && (p.position==='GOL')===(outgoing.find(p=>p.id===outId)?.slot===0)).map(p=><option key={p.id} value={p.id}>#{p.pixelAppearance.number} {p.name} · {p.position}</option>)}</select></label>
      <button type="button" disabled={!outId || !inId || changes.length>=remaining || !!subPending.length} onClick={()=>{setChanges([...changes,{outId,inId}]);setOutId('');setInId('');}}>Adicionar troca ao pedido</button>
      {changes.map((c,i)=><p key={c.outId}>{match.people.find(p=>p.id===c.outId)?.name} → {match.people.find(p=>p.id===c.inId)?.name} <button type="button" onClick={()=>setChanges(changes.filter((_,j)=>i!==j))}>Remover</button></p>)}
      <button type="button" className="btn btn-green" disabled={busy || !changes.length || !!subPending.length} onClick={()=>send('substitutions')}>Confirmar {changes.length || ''} troca(s)</button>
      {!!subPending.length && <p role="status">Pedido aguardando paralisação.</p>}
      {!bench.length && <p>Não há reservas disponíveis.</p>}
      <p style={{fontSize:12}}>Após seu primeiro pedido, você assume as substituições deste time nesta partida.</p>
    </div>}
    {penalty && <div style={{marginTop:14}}><strong>Pênalti! Escolha em {Math.max(0,Math.ceil((penalty.deadline-time)/3))} s</strong>
      <select aria-label="Cobrador do pênalti" value={playerId} onChange={e=>setPlayerId(e.target.value)}><option value="">Automático: melhor finalizador disponível</option>{match.people.map((p,i)=>p.side===side && frame.positions[i]?.[2] ? <option value={p.id} key={p.id}>{p.name} · Finalização {p.attributes.shot}</option>:null)}</select>
      <button type="button" disabled={busy || !playerId} onClick={()=>send('penalty')}>Confirmar cobrador</button></div>}
    {message && <p role="status">{message}</p>}
  </section>;
}
