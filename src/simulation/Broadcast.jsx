import React, { useState, useMemo, useEffect, useRef } from "react";
import { db } from "../services/firebase.js";
import { canAdmin } from "../admin/permissions.js";
import {
  makeSnapshot,
  selectTeam,
  simulateMatch,
  highlights,
} from "./engine.js";
import { Pitch } from "./Pitch.jsx";
import { KitEditor } from "./Editors.jsx";
const duration = 360000;
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
    [playing, setPlaying] = useState(true),
    [rate, setRate] = useState(1),
    [camera, setCamera] = useState("tv"),
    [kitTeam, setKitTeam] = useState("");
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
        clock.current = Math.min(5400, clock.current + elapsed * 0.015 * rate);
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
    setRecord(r);
    clock.current = r.id
      ? Math.min(
          5400,
          Math.max(0, ((Date.now() - r.startedAt) / duration) * 5400),
        )
      : 0;
    if (r.id && Date.now() >= r.startedAt + duration) clock.current = 0;
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
    setBusy(true);
    setError("");
    try {
      const snapshot = prepare();
      const r = { snapshot, startedAt: Date.now(), createdBy: user.data.id };
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
              </details>
            ))}
            <p>
              90 minutos de jogo são exibidos em 6 minutos reais. Quem abrir uma
              transmissão em andamento acompanha o minuto correspondente ao
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
                {[1, 2, 4].map((v) => (
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
          {now < r.startedAt + duration ? "AO VIVO" : "REVER PARTIDA"}
        </button>
      ))}
    </section>
  );
}
