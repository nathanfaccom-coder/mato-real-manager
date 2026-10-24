import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { audibleEvents } from "./audio-events.js";
import { StadiumAudio } from "./stadium-audio.js";
export const MatchAudio = forwardRef(function MatchAudio(
  { match, time, playing, seek, ended },
  ref,
) {
  const [enabled, setEnabled] = useState(false),
    [error, setError] = useState(""),
    [whistle, setWhistle] = useState(65),
    [crowd, setCrowd] = useState(40);
  const audio = useRef(null),
    muted = useRef(false),
    cursor = useRef(time),
    current = useRef(match),
    lastSeek = useRef(seek);
  async function activate(manual = false) {
    if (muted.current && !manual) return;
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) throw Error();
      if (!audio.current) audio.current = new StadiumAudio(Context);
      // Must run directly from the start/watch/toggle button's user gesture.
      await audio.current.unlock();
      muted.current = false;
      setEnabled(true);
      setError("");
    } catch {
      setEnabled(false);
      setError("Som bloqueado pelo navegador. Toque em ATIVAR SOM.");
    }
  }
  useImperativeHandle(ref, () => ({ activate }));
  useEffect(() => {
    audio.current?.setVolumes(whistle / 100, crowd / 100);
  }, [whistle, crowd, enabled]);
  useEffect(() => {
    audio.current?.setPlaying(Boolean(enabled && playing && match && !ended));
  }, [enabled, playing, match, ended]);
  useEffect(() => {
    if (lastSeek.current !== seek) {
      lastSeek.current = seek;
      cursor.current = time;
      audio.current?.stopWhistles();
      return;
    }
    if (current.current !== match) {
      current.current = match;
      cursor.current = time < 2 ? -1 : time;
    }
    if (!match) return;
    // Keep kickoff pending while the user gesture is finishing AudioContext.resume().
    if (!enabled) {
      if (time >= 2) cursor.current = time;
      return;
    }
    const cues = audibleEvents(match.events, cursor.current, time);
    cursor.current = time;
    if (playing && cues.length) {
      const e = cues.at(-1);
      if (e.type === "goal") audio.current?.cheer();
      else audio.current?.whistle(e.type);
    }
  }, [match, time, playing, enabled, seek]);
  useEffect(
    () => () => {
      audio.current?.close();
    },
    [],
  );
  return (
    <section
      aria-label="Som da transmissão"
      style={{
        padding: "10px 12px",
        background: "#102329",
        borderRadius: 10,
        margin: "12px 0",
      }}
    >
      <button
        className="btn btn-ghost"
        aria-pressed={enabled}
        onClick={() => {
          if (enabled) {
            muted.current = true;
            setEnabled(false);
            audio.current?.setPlaying(false);
          } else activate(true);
        }}
      >
        {enabled ? "SOM: LIGADO" : "ATIVAR SOM"}
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <label>
          Volume do apito{" "}
          <input
            aria-label="Volume do apito"
            type="range"
            min="0"
            max="100"
            value={whistle}
            onChange={(e) => setWhistle(+e.target.value)}
          />
        </label>
        <label>
          Volume da torcida{" "}
          <input
            aria-label="Volume da torcida"
            type="range"
            min="0"
            max="100"
            value={crowd}
            onChange={(e) => setCrowd(+e.target.value)}
          />
        </label>
      </div>
      <small>
        O som é liberado ao iniciar ou abrir a partida. Se necessário, toque em
        ATIVAR SOM e confira o volume de mídia do celular.
      </small>
      {error && <p role="status">{error}</p>}
    </section>
  );
});
