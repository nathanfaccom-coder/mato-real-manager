import {secureGameLogin,matchApi} from '../services/game-auth.js';
import {MatchCorrectionPanel} from '../admin/MatchCorrectionPanel.jsx';
import { LiveCoach } from "./LiveCoach.jsx";
import { LineupPresentation } from './LineupPresentation.jsx';
import React, { useState, useMemo, useEffect, useRef } from "react";
import { db } from "../services/firebase.js";
import { canAdmin } from "../admin/permissions.js";
import {
  makeSnapshot,
  selectTeam,
  simulateMatch,
  highlights,
} from "./engine.js";
import { MatchAudio } from "./MatchAudio.jsx";
import { Pitch } from "./Pitch.jsx";
import { KitEditor } from "./Editors.jsx";
import {
  elapsedAtTime,
  formatMatchClock,
  matchDurationSeconds,
  timeAtElapsed,
  timelineDurationMs,
} from "./timeline.js";
const durationOf = (record) =>
  (record?.timelineVersion === 2
    ? record.durationMs || timelineDurationMs({ snapshot: record.snapshot })
    : record?.durationMs || 360000) + (record?.preMatchMs || 0);
const PREMATCH_MS = 28000;
const minute = (t, match, stage) => formatMatchClock(t, match, stage);
export function Broadcast({ user, teams, players, onBack, watchOnly = false, initialMatchId = null }) {
  const startRequest = useRef(null);
  const [correctionId,setCorrectionId]=useState(null);
  const [home, setHome] = useState(""),
    [away, setAway] = useState(""),
    [record, setRecord] = useState(null),
    [records, setRecords] = useState([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [time, setTime] = useState(0),
    [animationNow, setAnimationNow] = useState(Date.now()),
    [playbackElapsed, setPlaybackElapsed] = useState(0),
    [presentationSkipped, setPresentationSkipped] = useState(false),
    [seek, setSeek] = useState(0),
    [playing, setPlaying] = useState(true),
    [rate, setRate] = useState(1),
    [camera, setCamera] = useState("wide"),
    [kitTeam, setKitTeam] = useState("");
  const [screenMode, setScreenMode] = useState("live");
  const [penaltiesOnDraw, setPenaltiesOnDraw] = useState(false);
  const audio = useRef(null);
  const surface = useRef(null),
    clock = useRef(0),
    elapsedClock = useRef(0);
  const creator = canAdmin(user, "competitions") && !watchOnly;
  async function refreshMatches() {
    try { setRecords((await matchApi().list()).matches); }
    catch(e) { setError(e.message); }
  }
  useEffect(() => {
    if (secureGameLogin) {
      let cancelled=false;
      matchApi().list().then(data=>{if(!cancelled)setRecords(data.matches);}).catch(e=>{if(!cancelled)setError(e.message);});
      return ()=>{cancelled=true;};
    }
    return db.collection('friendlyBroadcasts').orderBy('startedAt','desc').limit(10)
      .onSnapshot(s=>setRecords(s.docs.map(d=>({...d.data(),id:d.id}))),()=>setError('Não foi possível carregar as transmissões.'));
  }, []);
  useEffect(() => {
    if(!secureGameLogin || !initialMatchId)return;
    let cancelled=false;
    matchApi().read(initialMatchId).then(data=>{if(!cancelled)watch(data);}).catch(e=>{if(!cancelled)setError(e.message);});
    return ()=>{cancelled=true;};
  }, [initialMatchId]);
  useEffect(() => {
    if (!record?.id) return;
    if(record.serverOwned){
      let cancelled=false,timer;
      async function poll(){
        if(cancelled)return;
        if(document.visibilityState==='hidden'){timer=setTimeout(poll,15000);return;}
        try {
          const updated=await matchApi().read(record.id);
          if(cancelled)return;
          setRecord(previous=>previous?.id!==updated.id?previous:
            previous.status===updated.status && previous.commands?.length===updated.commands.length && previous.result?.revision===updated.result?.revision?previous:{...previous,...updated});
          if(updated.result)return;
        } catch(e){if(!cancelled)setError(e.message);}
        if(!cancelled)timer=setTimeout(poll,15000);
      }
      timer=setTimeout(poll,15000);
      return ()=>{cancelled=true;clearTimeout(timer);};
    }
    if(secureGameLogin || record.playbackIntroAt)return;
    return db.collection('friendlyBroadcasts').doc(record.id).onSnapshot(doc => {
      if (doc.exists) setRecord(previous => previous?.id === doc.id ? {...previous,...doc.data(),id:doc.id} : previous);
    }, () => setError('Conexão com os comandos ao vivo interrompida.'));
  }, [record?.id, record?.serverOwned, record?.playbackIntroAt]);
  async function openRecord(r) {
    setBusy(true);
    try { watch(r.serverOwned ? await matchApi().read(r.id) : r); }
    catch(e){setError(e.message);}finally{setBusy(false);}
  }
  const prepared = useMemo(() => {
    if (!record) return {};
    try {
      return { match: simulateMatch({ ...record.snapshot, commands: record.commands || [] }) };
    } catch (e) {
      return { failure: e.message };
    }
  }, [record]);
  const match = prepared.match;
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const duration = record ? durationOf(record) : 1800000;
  const live = record?.id && now < record.startedAt + duration;
  const introStart = record?.playbackIntroAt ?? record?.startedAt ?? 0;
  const introDuration = record?.playbackPreMatchMs ?? record?.preMatchMs ?? 0;
  const presentationElapsed = Math.max(0, animationNow - introStart);
  const presenting = Boolean(
    match &&
      !presentationSkipped &&
      introDuration > 0 &&
      presentationElapsed < introDuration,
  );
  const introStage =
    presentationElapsed < 8500
      ? "walkout"
      : presentationElapsed < 14500
        ? "handshake"
        : presentationElapsed < 24000
          ? "lineups"
          : "countdown";
  const elapsedFromStart = playbackElapsed;
  const timeline = match ? timeAtElapsed(match, elapsedFromStart) : { time: 0, stage: "playing" };
  const presentationStage = presenting ? introStage : timeline.stage;
  const phasePresentation = ["halftime-exit", "halftime-entry", "fulltime-exit"].includes(presentationStage);
  const presentationActive = presenting || phasePresentation;
  const presentationLabel =
    presentationStage === "walkout"
      ? "As equipes saem do túnel e entram em campo"
      : presentationStage === "handshake"
        ? "Cumprimentos entre os jogadores"
        : presentationStage === "lineups"
          ? "Formações iniciais"
          : presentationStage === "halftime-exit"
            ? "Intervalo — os times vão para o vestiário"
            : presentationStage === "halftime-entry"
              ? "Segundo tempo — as equipes voltam ao campo"
              : presentationStage === "fulltime-exit"
                ? "Fim de jogo — jogadores deixam o campo"
                : presentationStage === "ended"
                  ? "Partida encerrada"
                  : `A partida começa em ${Math.max(1, Math.ceil((introDuration - presentationElapsed) / 1000))}…`;
  useEffect(() => {
    if (!match || !introDuration || presentationSkipped) return;
    let frame;
    const update = () => {
      const current = Date.now();
      setAnimationNow(current);
      if (current < introStart + introDuration)
        frame = requestAnimationFrame(update);
    };
    if (Date.now() < introStart + introDuration)
      frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [match, introStart, introDuration, presentationSkipped]);
  useEffect(() => {
    if (!match) return;
    let id,
      last = performance.now(),
      lastDraw = 0;
    const tick = (t) => {
      const elapsed = Math.max(0, t - last);
      last = t;
      const preMatchMs = record?.playbackPreMatchMs ?? record?.preMatchMs ?? 0;
      const kickoffAt = (record?.playbackIntroAt ?? record?.startedAt ?? 0) + preMatchMs;
      if (record?.id && !record?.playbackIntroAt)
        elapsedClock.current = Math.max(0, Date.now() - record.startedAt - preMatchMs);
      else if (playing && (presentationSkipped || Date.now() >= kickoffAt))
        elapsedClock.current += elapsed * rate;
      const next = timeAtElapsed(match, elapsedClock.current);
      clock.current = next.time;
      if (t - lastDraw > 33) {
        setPlaybackElapsed(elapsedClock.current);
        setTime(next.time);
        lastDraw = t;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [match, playing, rate, record, duration, presentationSkipped]);
  function watch(r) {
    audio.current?.activate();
    const ended = Boolean(r.id && Date.now() >= r.startedAt + durationOf(r));
    const playback = ended
      ? {
          ...r,
          playbackIntroAt: Date.now(),
          playbackPreMatchMs: PREMATCH_MS,
        }
      : r;
    setRecord(playback);
    clock.current = 0;
    elapsedClock.current = 0;
    setPlaybackElapsed(0);
    setTime(clock.current);
    setPlaying(true);
    setPresentationSkipped(false);
    setAnimationNow(Date.now());
    setError("");
  }
  function prepare() {
    const snapshot = makeSnapshot(
      teams.find((t) => t.id === home),
      teams.find((t) => t.id === away),
      players,
      crypto.getRandomValues(new Uint32Array(1))[0],
    );
    snapshot.penaltiesOnDraw = penaltiesOnDraw;
    return snapshot;
  }
  async function start(shared) {
    audio.current?.activate();
    setBusy(true);
    setError("");
    try {
      if(shared && secureGameLogin){
        const pairing=JSON.stringify([home,away]);
        if(startRequest.current?.pairing!==pairing)startRequest.current={pairing,requestId:crypto.randomUUID()};
        const created=await matchApi().start({requestId:startRequest.current.requestId,homeId:home,awayId:away});
        const saved=await matchApi().read(created.matchId);
        startRequest.current=null;
        watch(saved);
        await refreshMatches();
        return;
      }
      const snapshot = prepare();
      const r = {
        snapshot,
        startedAt: Date.now(),
        preMatchMs: PREMATCH_MS,
        timelineVersion: 2,
        createdBy: user.data.id,
      };
      const simulation = simulateMatch(snapshot);
      r.durationMs = timelineDurationMs(simulation);
      if (shared) {
        const doc = await db.collection("friendlyBroadcasts").add(r);
        r.id = doc.id;
      }
      watch(r);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  function seekMatch(value) {
    if (presenting) setPresentationSkipped(true);
    setSeek((v) => v + 1);
    clock.current = Number(value);
    elapsedClock.current = elapsedAtTime(match, clock.current);
    setPlaybackElapsed(elapsedClock.current);
    setTime(clock.current);
  }
  const lineup = useMemo(
    () =>
      [home, away].map((id) => {
        try {
          return selectTeam(
            teams.find((t) => t.id === id),
            players,
          );
        } catch (e) {
          return { error: e.message };
        }
      }),
    [home, away, teams, players],
  );
  const durationSeconds = matchDurationSeconds(match),
    current = match?.frames[Math.min(durationSeconds, Math.floor(time))],
    events = match?.events.filter((e) => e.t <= time) || [],
    last = events.at(-1),
    ended = match?.snapshot?.addedTime
      ? timeline.stage === "ended"
      : time >= 5400;
  const recentBroadcasts = (
    <>
      <h3>Transmissões recentes</h3>
      {secureGameLogin && <button className="btn btn-ghost" onClick={refreshMatches}>Atualizar lista</button>}
      {records.length === 0 && <p>Nenhum amistoso transmitido ainda.</p>}
      {records.map((r) => (
        <button
          key={r.id}
          className="btn btn-ghost"
          style={{ display: "block", width: "100%", marginBottom: 8 }}
          disabled={busy}
          onClick={() => openRecord(r)}
        >
          {r.snapshot?.home?.name} × {r.snapshot?.away?.name} ·{" "}
          {now < r.startedAt + durationOf(r) ? "AO VIVO" : "REVER PARTIDA"}
        </button>
      ))}
    </>
  );
  return (
    <section data-testid="broadcast">
      <button className="btn btn-ghost" onClick={onBack}>
        ← VOLTAR AO PAINEL
      </button>
      {record?.serverOwned && <div className="card" role="status">
        <strong>{record.kind==='OFFICIAL'?'Jogo oficial':'Amistoso'}</strong>
        <p>{record.result ? `Resultado registrado: ${record.result.score[0]} × ${record.result.score[1]}. XP e cansaço aplicados.` : now>=record.endsAt ? 'Partida encerrada. Aguardando o registro do resultado pelo jogo.' : 'Partida em andamento. Resultado e recompensas serão registrados ao final.'}</p>
      </div>}
      {secureGameLogin && record?.result && canAdmin(user,'competitions') && <button className="btn btn-blue" onClick={()=>setCorrectionId(record.id)}>CORRIGIR SÚMULA</button>}
      {secureGameLogin && correctionId && canAdmin(user,'competitions') && <MatchCorrectionPanel key={correctionId} matchId={correctionId} onClose={()=>setCorrectionId(null)} onSaved={async()=>{const fresh=await matchApi().read(correctionId);setRecord(current=>current?.id===fresh.id?fresh:current);}}/>}
      <MatchAudio
        ref={audio}
        match={match}
        time={time}
        seek={seek}
        playing={Boolean(live || playing)}
        ended={ended}
        presentation={presentationActive}
        presentationKey={introStart}
      />
      {watchOnly && (
        <>
          <h2>Assistir jogos</h2>
          <p>Amistosos transmitidos e replays disponíveis.</p>
          {recentBroadcasts}
        </>
      )}
      <h2>
        Mato Real TV{" "}
        <small style={{ fontSize: 12, color: "#53d8a2" }}>
          {secureGameLogin ? 'OFICIAIS E AMISTOSOS' : 'AMISTOSOS • EXPERIMENTAL'}
        </small>
      </h2>
      <p>
        {secureGameLogin ? 'Partidas transmitidas registram resultado, experiência e cansaço pelo jogo. Amistosos rendem experiência reduzida. A prévia local não gera recompensas.' : 'Partida inteira em pixel art, com os atletas e uniformes atuais. Nesta etapa, o amistoso gera sua própria súmula; não altera campeonatos, energia ou overall.'}
      </p>
      <p>
        <small>
          Novos amistosos têm juiz, impedimento do receptor e substituições
          automáticas por cansaço ou lesão, com até cinco trocas e reservas
          disponíveis. As lesões ficam apenas nesta partida.
        </small>
      </p>
      {creator && (
        <details open={!record}>
          <summary>Preparar amistoso</summary>
          <div className="card">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                ["Mandante", home, setHome],
                ["Visitante", away, setAway],
              ].map(([label, value, set]) => (
                <label key={label} style={{ flex: 1, minWidth: 180 }}>
                  {label}
                  <select
                    className="input-field"
                    aria-label={label}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                  >
                    <option value="">Escolha o clube</option>
                    {teams
                      .filter((t) => t.status !== "PENDING")
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>
                </label>
              ))}
            </div>
            <p>
              Usa os titulares salvos pelo técnico. Vagas inválidas são
              preenchidas com atletas disponíveis, priorizando a posição e o
              overall. Confira os 11 antes de iniciar.
            </p>
            <label style={{ display: "flex", gap: 8, alignItems: "center", margin: "12px 0" }}>
              <input type="checkbox" checked={penaltiesOnDraw} onChange={(e) => setPenaltiesOnDraw(e.target.checked)} />
              {secureGameLogin ? 'Decidir nos pênaltis (somente na prévia local)' : 'Se terminar empatado, decidir nos pênaltis'}
            </label>
            {lineup.map((team, i) => (
              <details key={i}>
                <summary>{team.name || `Escalação ${i + 1}`}</summary>
                {team.error ? (
                  <p>{team.error}</p>
                ) : (
                  <ol>
                    {team.lineup.map((p) => (
                      <li key={p.id}>
                        #{p.pixelAppearance.number} {p.name} — {p.role} · OV{" "}
                        {p.overall}
                      </li>
                    ))}
                  </ol>
                )}
                {team.bench?.length > 0 && (
                  <p>
                    Banco:{" "}
                    {team.bench
                      .map((p) => `#${p.pixelAppearance.number} ${p.name}`)
                      .join(", ")}
                  </p>
                )}
              </details>
            ))}
            <p>
              90 minutos de jogo são exibidos em 30 minutos reais. Quem abrir
              uma transmissão em andamento acompanha o minuto correspondente ao
              relógio do dispositivo.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                className="btn btn-blue"
                disabled={busy}
                onClick={() => start(false)}
              >
                PRÉVIA LOCAL
              </button>
              <button
                className="btn btn-green"
                disabled={busy}
                onClick={() => start(true)}
              >
                TRANSMITIR AMISTOSO
              </button>
            </div>
          </div>
        </details>
      )}
      {!watchOnly && canAdmin(user, "teams") && (
        <details>
          <summary>Editar uniformes de um clube</summary>
          <select
            aria-label="Clube para uniformes"
            className="input-field"
            value={kitTeam}
            onChange={(e) => setKitTeam(e.target.value)}
          >
            <option value="">Escolha</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {kitTeam && teams.find((t) => t.id === kitTeam) && (
            <KitEditor
              key={kitTeam}
              team={teams.find((t) => t.id === kitTeam)}
            />
          )}
        </details>
      )}
      {(error || prepared.failure) && (
        <p role="alert">{error || prepared.failure}</p>
      )}
      {match && (
        <>
          {live && <LiveCoach key={record.id} user={user} record={record} match={match} time={time} />}
          {presenting && (
            <section
              data-testid="prematch-presentation"
              aria-live="polite"
              className="card"
              style={{ marginTop: 14, padding: 12, borderColor: "#50dfac" }}
            >
              <strong style={{ color: "#50dfac" }}>{presentationLabel}</strong>
              {presentationStage === "lineups" && (
                <LineupPresentation snapshot={match.snapshot} elapsed={presentationElapsed} />
              )}
            </section>
          )}
          <div
            role="group"
            aria-label="Alternar transmissão"
            style={{ display: "flex", gap: 8, marginTop: 18 }}
          >
            <button
              className={screenMode === "live" ? "btn btn-green" : "btn btn-ghost"}
              style={{ flex: 1, minWidth: 0, marginBottom: 0 }}
              aria-pressed={screenMode === "live"}
              onClick={() => setScreenMode("live")}
            >
              JOGO AO VIVO
            </button>
            <button
              className={screenMode === "stats" ? "btn btn-green" : "btn btn-ghost"}
              style={{ flex: 1, minWidth: 0, marginBottom: 0 }}
              aria-pressed={screenMode === "stats"}
              onClick={() => setScreenMode("stats")}
            >
              ESTATÍSTICAS AO VIVO
            </button>
          </div>
          <div
            ref={surface}
            className="mr-broadcast-screen"
            style={{
              background: "#101c24",
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 18,
              display: screenMode === "live" ? "block" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 12,
                gap: 8,
                fontFamily: "monospace",
              }}
            >
              <strong style={{ color: "#50dfac" }}>
                {presenting
                  ? "APRESENTAÇÃO"
                  : live
                    ? "● AO VIVO"
                    : record.id
                      ? "REPLAY"
                      : "PRÉVIA"}
              </strong>
              <span>
                {match.snapshot.home.name}{" "}
                <b data-testid="broadcast-score">
                  {current.score[0]} × {current.score[1]}
                </b>{" "}
                {match.snapshot.away.name}
              </span>
              <b data-testid="match-clock">
                {presenting ? "00:00" : minute(time, match, timeline.stage)}
              </b>
            </div>
            <div
              data-testid="on-field-count"
              style={{ padding: "4px 12px", fontSize: 13, color: "#b8dacc" }}
            >
              Em campo:{" "}
              {
                current.positions.filter(
                  (p, i) => p[2] && match.people[i].side === 0,
                ).length
              }{" "}
              ×{" "}
              {
                current.positions.filter(
                  (p, i) => p[2] && match.people[i].side === 1,
                ).length
              }{" "}
              ·{" "}
              {camera === "wide"
                ? "Campo inteiro"
                : "Câmera TV — visão geral no minimapa"}
            </div>
            {events.findLast((e) => e.type === "corner" && time - e.t < 22) && (
              <div
                data-testid="corner-banner"
                style={{
                  padding: 12,
                  background: "#e5bd45",
                  color: "#132028",
                  fontWeight: 900,
                }}
              >
                🚩 ESCANTEIO —{" "}
                {
                  events.findLast((e) => e.type === "corner" && time - e.t < 22)
                    .text
                }
              </div>
            )}
            {match.snapshot.addedTime && ["first-stoppage", "second-stoppage"].includes(timeline.stage) && (
              <div data-testid="added-time-banner" style={{ padding: 8, background: "#f2c14e", color: "#132028", fontWeight: 900 }}>
                ⏱️ ACRÉSCIMOS DO {timeline.stage === "first-stoppage" ? "1º" : "2º"} TEMPO: +{match.snapshot.addedTime[timeline.stage === "first-stoppage" ? 0 : 1]} MIN
              </div>
            )}
            <Pitch
              match={match}
              time={time}
              camera={camera}
              presentation={
                presentationActive
                  ? {
                      stage: presentationStage,
                      time,
                      durationMs: introDuration,
                      elapsedMs: presenting
                        ? presentationElapsed
                        : timeline.stageElapsedMs ?? timeline.halftimeElapsed ?? 0,
                    }
                  : null
              }
            />
            <p style={{ minHeight: 24, padding: "0 12px" }} aria-live="off">
              {presentationActive ? presentationLabel : last?.text}
            </p>
          </div>
          {screenMode === "stats" && (
            <section data-testid="live-statistics" aria-label="Estatísticas ao vivo" className="card" style={{ marginTop: 18, padding: 16 }}>
              <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", fontFamily: "monospace" }}>
                <strong>{match.snapshot.home.name}</strong>
                <b data-testid="broadcast-score-stats" style={{ fontSize: 24 }}>{current.score[0]} × {current.score[1]}</b>
                <strong>{match.snapshot.away.name}</strong>
                <span data-testid="match-clock-stats">
                {presenting ? "00:00" : minute(time, match, timeline.stage)}
                </span>
              </header>
              <p style={{ color: "#b8dacc" }}>Números atualizados conforme a partida avança.</p>
              <div data-testid="corner-count" style={{ padding: "10px 12px", color: "#ffe19a", background: "#172631", borderRadius: 8 }}>
                🚩 Escanteios:{" "}
                {events.filter((e) => e.type === "corner" && e.side === 0).length}{" "}
                ×{" "}
                {events.filter((e) => e.type === "corner" && e.side === 1).length}
              </div>
              <div style={{ overflowX: "auto", marginTop: 12 }}>
                <table style={{ width: "100%", minWidth: 320, textAlign: "center" }}>
                  <thead><tr><th>{match.snapshot.home.name}</th><th>Indicador</th><th>{match.snapshot.away.name}</th></tr></thead>
                  <tbody>
                    {[
                      ["Finalizações", (side) => events.filter((e) => e.type === "shot" && e.side === side).length],
                      ["No alvo", (side) => events.filter((e) => (e.type === "goal" || e.type === "save") && e.side === side).length],
                      ["Gols", (side) => events.filter((e) => e.type === "goal" && e.side === side).length],
                      ["Defesas", (side) => events.filter((e) => e.type === "save" && e.side === side).length],
                      ["Faltas", (side) => events.filter((e) => e.type === "foul" && e.side === side).length],
                    ].map(([label, count]) => (
                      <tr key={label}><td>{count(0)}</td><th scope="row">{label}</th><td>{count(1)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              margin: "12px 0",
            }}
          >
            <button
              className="btn btn-blue"
              disabled={Boolean(live)}
              onClick={() => setPlaying((v) => !v)}
            >
              {playing ? "PAUSAR" : "CONTINUAR"}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setCamera((v) => (v === "tv" ? "wide" : "tv"))}
            >
              {camera === "tv" ? "VER CAMPO INTEIRO" : "CÂMERA TV"}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                if (surface.current.requestFullscreen)
                  surface.current
                    .requestFullscreen()
                    .catch(() =>
                      setError("Tela cheia indisponível neste navegador."),
                    );
                else setError("Tela cheia indisponível neste navegador.");
              }}
            >
              TELA CHEIA
            </button>
            <label>
              Velocidade
              <select
                aria-label="Velocidade do replay"
                disabled={Boolean(live)}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              >
                {[0.25, 0.5, 1, 2, 4].map((v) => (
                  <option key={v} value={v}>
                    {v}×
                  </option>
                ))}
              </select>
            </label>
          </div>
          {!live && (
            <label>
              Momento da partida
              <input
                aria-label="Momento da partida"
                type="range"
                min="0"
                max={durationSeconds}
                value={time}
                style={{ width: "100%" }}
                onChange={(e) => seekMatch(e.target.value)}
              />
            </label>
          )}
          {match.snapshot.kits.notes.map((n) => (
            <p key={n}>
              <small>{n}</small>
            </p>
          ))}
          {ended && (
            <section
              data-testid="player-ratings"
              aria-label="Notas dos jogadores"
            >
              <h3>Notas finais dos jogadores</h3>
              <p>Notas de 0 a 10, referentes apenas a este amistoso.</p>
              {[0, 1].map((side) => (
                <div key={side}>
                  <h4>
                    {side === 0
                      ? match.snapshot.home.name
                      : match.snapshot.away.name}
                  </h4>
                  {match.people.map(
                    (p, i) =>
                      p.side === side &&
                      (match.stats[i].seconds === undefined ||
                        match.stats[i].seconds > 0) && (
                        <div
                          key={p.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "12px",
                            marginBottom: 6,
                            background: "#172631",
                            borderRadius: 8,
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <b>{p.name}</b>
                            <br />
                            <small>
                              {p.position} ·{" "}
                              {Math.ceil((match.stats[i].seconds ?? 5400) / 60)}{" "}
                              min · {match.stats[i].goals} gols ·{" "}
                              {match.stats[i].assists} assist. ·{" "}
                              {match.stats[i].saves} defesas
                              {match.stats[i].red
                                ? " · EXPULSO"
                                : match.stats[i].injured
                                  ? " · LESIONADO"
                                  : match.stats[i].substituted
                                    ? " · SUBSTITUÍDO"
                                    : ""}
                            </small>
                          </div>
                          <strong
                            style={{
                              fontSize: 24,
                              color: "#54e6ad",
                              flexShrink: 0,
                            }}
                            aria-label={`Nota de ${p.name}`}
                          >
                            {match.ratings[i]}
                          </strong>
                        </div>
                      ),
                  )}
                </div>
              ))}
            </section>
          )}
          <details open={ended}>
            <summary>
              Súmula e melhores momentos{" "}
              {ended ? "— encerrada" : "— em andamento"}
            </summary>
            <ul>
              {highlights(match)
                .filter((e) => e.t <= time)
                .map((e, i) => (
                  <li key={i}>
                    {minute(e.t, match)} — {e.text}
                    {(e.type === "corner" || e.type === "goal") && !live && (
                      <button
                        className="btn btn-ghost"
                        onClick={() => {
                          seekMatch(Math.max(0, e.t - (e.type === "goal" ? 8 : 0)));
                          setPlaying(true);
                        }}
                      >
                        {e.type === "goal" ? "REVER GOL" : "REVER ESCANTEIO"} {minute(e.t, match)}
                      </button>
                    )}
                  </li>
                ))}
            </ul>
            {ended && (
              <>
                {match.penaltyShootout && <p><b>Decisão por pênaltis:</b> {match.snapshot.home.name} {match.penaltyShootout.score[0]} × {match.penaltyShootout.score[1]} {match.snapshot.away.name}{match.penaltyShootout.winner !== null ? ` — ${match.snapshot[match.penaltyShootout.winner === 0 ? "home" : "away"].name} venceu` : ""}</p>}
                <p>
                  Posse:{" "}
                  {Math.round(
                    (match.possession[0] /
                      Math.max(1, match.possession[0] + match.possession[1])) *
                      100,
                  )}
                  % /{" "}
                  {Math.round(
                    (match.possession[1] /
                      Math.max(1, match.possession[0] + match.possession[1])) *
                      100,
                  )}
                  %. Notas experimentais, sem efeito no overall.
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {[
                          "Atleta",
                          "Time",
                          "Gols",
                          "Assist.",
                          "Chutes",
                          "Defesas",
                          "Amarelos",
                          "Vermelhos",
                          "Nota",
                        ].map((x) => (
                          <th key={x}>{x}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {match.people.map((p, i) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>
                            {p.side === 0
                              ? match.snapshot.home.name
                              : match.snapshot.away.name}
                          </td>
                          {[
                            "goals",
                            "assists",
                            "shots",
                            "saves",
                            "yellow",
                            "red",
                          ].map((k) => (
                            <td key={k}>{match.stats[i][k]}</td>
                          ))}
                          <td>{match.ratings[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </details>
        </>
      )}
      <p>
        <small>
          Novas partidas: 30 minutos reais em 1×. Na prévia e no replay, use
          0,5× ou 0,25× para acompanhar os lances com mais calma.
        </small>
      </p>
      {!watchOnly && recentBroadcasts}
    </section>
  );
}
