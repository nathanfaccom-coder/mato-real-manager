import React, { useState } from 'react';
import { FORMATION_COORDINATES } from '../game/FORMATION_COORDINATES.js';
import './lineup-presentation.css';
export function LineupPresentation({ snapshot, elapsed }) {
  const [selected, setSelected] = useState(null);
  const side = selected ?? (elapsed < 19250 ? 0 : 1);
  const team = side === 0 ? snapshot.home : snapshot.away;
  const coordinates = FORMATION_COORDINATES[team.formation] || [];
  return <div className="lineup-showcase">
    <div className="lineup-tabs" role="group" aria-label="Escolher escalação">
      {[snapshot.home, snapshot.away].map((t, i) => <button type="button" key={i} aria-pressed={side === i} onClick={() => setSelected(i)}>{t.name}</button>)}
    </div>
    <div className="lineup-heading"><div><small>{side === 0 ? 'MANDANTE' : 'VISITANTE'} • TITULARES</small><h3>{team.name}</h3></div><b>{team.formation}</b></div>
    <div className="lineup-layout" key={side}>
      <ol className="lineup-roster">{team.lineup.map((p, i) => <li key={p.id}><span className="lineup-number">{p.pixelAppearance?.number ?? i + 1}</span><span className="lineup-name">{p.name}</span><span className="lineup-role">{p.role || p.position}</span></li>)}</ol>
      <div className="lineup-board"><div className="lineup-pitch" role="img" aria-label={`Distribuição da formação ${team.formation}`}>
        <div className="lineup-half"/><div className="lineup-circle"/><div className="lineup-box top"/><div className="lineup-box bottom"/>
        {team.lineup.map((p, i) => <div className="lineup-marker" key={p.id} style={{top: coordinates[i]?.t || `${90 - (p.anchor?.x ?? .5) * 80}%`,left: coordinates[i]?.l || `${(p.anchor?.y ?? .5) * 100}%`}}><b>{p.pixelAppearance?.number ?? i + 1}</b><small>{p.role || p.position}</small></div>)}
      </div><small className="lineup-caption">Números correspondem à lista</small></div>
    </div>
    <p className="lineup-kickoff">⚽ {snapshot[(snapshot.kickoffSide ?? 0) === 1 ? 'away' : 'home'].name} começa com a bola</p>
  </div>;
}
