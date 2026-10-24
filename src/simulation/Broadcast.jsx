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
const durationOf = (record) => record?.durationMs || 360000;
const newDuration = 1800000;
const minute = (t) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
export function Broadcast({ user, teams, players, onBack }) {
  const [home, setHome] = useState(""),
    [away, setAway] = useState(""),
    [record, setRecord] = useState(null),
    [records, setRecords] = useState([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [time, setTime] = useState(0),
    [seek, setSeek] = useState(0),
    [playing, setPlaying] = useState(true),
    [rate, setRate] = useState(1),
    [camera, setCamera] = useState("wide"),
    [kitTeam, setKitTeam] = useState("");
  const audio = useRef(null);
  const surface = useRef(null),
    clock = useRef(0);
  const creator = canAdmin(user, "competitions");
  useEffect(
    () =>
      db
        .collection("friendlyBroadcasts")
        .orderBy("startedAt", "desc")
        .limit(10)
        .onSnapshot(
          (s) => setRecords(s.docs.map((d) => ({ ...d.data(), id: d.id }))),
          () => setError("Não foi possível carregar as transmissões."),
        ),
    [],
  );
  const prepared = useMemo(() => {
    if (!record) return {};
    try {
      return { match: simulateMatch(record.snapshot) };
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
  const duration = record ? durationOf(record) : newDuration;
  const live = record?.id && now < record.startedAt + duration;
  useEffect(() => {
    if (!match) return;
    let id,
      last = performance.now(),
      lastDraw = 0;
    const tick = (t) => {
      const elapsed = Math.max(0, t - last);
      last = t;
      if (live)
        clock.current = Math.min(
          5400,
          Math.max(0, ((Date.now() - record.startedAt) / duration) * 5400),
        );
      else if (playing)
        clock.current = Math.min(
          5400,
          clock.current + elapsed * (5400 / newDuration) * rate,
        );
      if (t - lastDraw > 33) {
        setTime(clock.current);
        lastDraw = t;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [match, live, playing, rate, record]);
  function watch(r) {
    audio.current?.activate();
    setRecord(r);
    clock.current = r.id
      ? Math.min(
          5400,
          Math.max(0, ((Date.now() - r.startedAt) / durationOf(r)) * 5400),
        )
      : 0;
    if (r.id && Date.now() >= r.startedAt + durationOf(r)) clock.current = 0;
    setTime(clock.current);
    setPlaying(true);
    setError("");
  }
  function prepare() {
    return makeSnapshot(
      teams.find((t) => t.id === home),
      teams.find((t) => t.id === away),
      players,
      crypto.getRandomValues(new Uint32Array(1))[0],
    );
  }
  async function start(shared) {
    audio.current?.activate();
    setBusy(true);
    setError("");
    try {
      const snapshot = prepare();
      const r = {
        snapshot,
        startedAt: Date.now(),
        durationMs: newDuration,
        createdBy: user.data.id,
      };
      simulateMatch(snapshot);
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
  const current = match?.frames[Math.min(5400, Math.floor(time))],
    events = match?.events.filter((e) => e.t <= time) || [],
    last = events.at(-1),
    ended = time >= 5400;
  return (
    <section data-testid="broadcast">
      <button className="btn btn-ghost" onClick={onBack}>
        ← VOLTAR AO PAINEL
      </button>
      <MatchAudio
        ref={audio}
        match={match}
        time={time}
        seek={seek}
        playing={Boolean(live || playing)}
        ended={ended}
      />
      <h2>
        Mato Real TV{" "}
        <small style={{ fontSize: 12, color: "#53d8a2" }}>
          AMISTOSOS • EXPERIMENTAL
        </small>
      </h2>
      <p>
        Partida inteira em pixel art, com os atletas e uniformes atuais. Nesta
        etapa, o amistoso gera sua própria súmula; não altera campeonatos,
        energia ou overall.
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
      {canAdmin(user, "teams") && (
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
          <div
            ref={surface}
            className="mr-broadcast-screen"
            style={{
              background: "#101c24",
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 18,
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
                {live ? "● AO VIVO" : record.id ? "REPLAY" : "PRÉVIA"}
              </strong>
              <span>
                {match.snapshot.home.name}{" "}
                <b data-testid="broadcast-score">
                  {current.score[0]} × {current.score[1]}
                </b>{" "}
                {match.snapshot.away.name}
              </span>
              <b data-testid="match-clock">{minute(time)}</b>
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
            <div
              data-testid="corner-count"
              style={{ padding: "8px 12px", color: "#ffe19a" }}
            >
              🚩 Escanteios:{" "}
              {events.filter((e) => e.type === "corner" && e.side === 0).length}{" "}
              ×{" "}
              {events.filter((e) => e.type === "corner" && e.side === 1).length}
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
            <Pitch match={match} time={time} camera={camera} />
            <p style={{ minHeight: 24, padding: "0 12px" }} aria-live="off">
              {last?.text}
            </p>
          </div>
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
                max="5400"
                value={time}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSeek((v) => v + 1);
                  clock.current = Number(e.target.value);
                  setTime(clock.current);
                }}
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
                    {minute(e.t)} — {e.text}
                    {e.type === "corner" && !live && (
                      <button
                        className="btn btn-ghost"
                        onClick={() => {
                          setSeek((v) => v + 1);
                          clock.current = e.t;
                          setTime(e.t);
                          setPlaying(true);
                        }}
                      >
                        REVER ESCANTEIO {minute(e.t)}
                      </button>
                    )}
                  </li>
                ))}
            </ul>
            {ended && (
              <>
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
      <h3>Transmissões recentes</h3>
      {records.length === 0 && <p>Nenhum amistoso transmitido ainda.</p>}
      {records.map((r) => (
        <button
          key={r.id}
          className="btn btn-ghost"
          style={{ display: "block", width: "100%", marginBottom: 8 }}
          onClick={() => watch(r)}
        >
          {r.snapshot?.home?.name} × {r.snapshot?.away?.name} ·{" "}
          {now < r.startedAt + durationOf(r) ? "AO VIVO" : "REVER PARTIDA"}
        </button>
      ))}
    </section>
  );
}
