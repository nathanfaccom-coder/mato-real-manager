import React, { useEffect, useRef, useState } from "react";
import { audibleEvents } from "./audio-events.js";
export function MatchAudio({ match, time, playing, seek }) {
  const [enabled, setEnabled] = useState(false),
    [error, setError] = useState("");
  const context = useRef(null),
    cursor = useRef(time),
    current = useRef(match),
    lastSeek = useRef(seek),
    voices = useRef([]);
  const stop = () => {
    for (const o of voices.current) {
      try {
        o.stop();
      } catch {}
    }
    voices.current = [];
  };
  const whistle = (double = false) => {
    const c = context.current;
    if (!c || c.state !== "running") return;
    stop();
    for (let i = 0; i < (double ? 2 : 1); i++) {
      const o = c.createOscillator(),
        g = c.createGain(),
        t = c.currentTime + i * 0.22;
      o.type = "sine";
      o.frequency.setValueAtTime(2400, t);
      o.frequency.linearRampToValueAtTime(2900, t + 0.08);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.055, t + 0.02);
      g.gain.setValueAtTime(0.055, t + 0.13);
      g.gain.linearRampToValueAtTime(0, t + 0.2);
      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + 0.21);
      voices.current.push(o);
      o.onended = () => {
        o.disconnect();
        g.disconnect();
      };
    }
  };
  useEffect(() => {
    if (lastSeek.current !== seek) {
      lastSeek.current = seek;
      cursor.current = time;
      stop();
      return;
    }
    if (current.current !== match) {
      current.current = match;
      cursor.current = time;
      if (enabled && playing && time < 2) whistle(true);
      return;
    }
    const cues = audibleEvents(match.events, cursor.current, time);
    cursor.current = time;
    if (enabled && playing && cues.length) whistle(cues.at(-1).type !== "foul");
    if (!playing) stop();
  }, [match, time, enabled, playing, seek]);
  useEffect(
    () => () => {
      stop();
      context.current?.close();
    },
    [],
  );
  async function toggle() {
    if (enabled) {
      stop();
      setEnabled(false);
      return;
    }
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw Error();
      if (!context.current) context.current = new Audio();
      await context.current.resume();
      cursor.current = time;
      setEnabled(true);
      setError("");
      whistle();
    } catch {
      setError("O navegador não liberou o áudio. Tente tocar novamente.");
    }
  }
  return (
    <div>
      <button className="btn btn-ghost" aria-pressed={enabled} onClick={toggle}>
        {enabled ? "APITO: LIGADO" : "ATIVAR APITO"}
      </button>
      <small>Toque para liberar o som no celular.</small>
      {error && <p role="status">{error}</p>}
    </div>
  );
}
