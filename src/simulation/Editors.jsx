import React, { useRef, useEffect, useState } from "react";
import { db } from "../services/firebase.js";
import {
  appearance,
  drawPlayer,
  SKIN,
  HAIR,
  EYES,
  BOOTS,
  STYLES,
} from "./appearance.js";
import { clubKits, kit, PATTERNS } from "./kits.js";
export function SpritePreview({ look, uniform }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current.getContext("2d");
    let frame,
      last = 0;
    const render = (t) => {
      if (t - last > 65) {
        c.clearRect(0, 0, 300, 260);
        c.fillStyle = "#102b25";
        c.fillRect(0, 0, 300, 260);
        c.fillStyle = "#1b443b";
        c.fillRect(20, 213, 260, 3);
        drawPlayer(c, 150, 224, look, uniform, t / 150, 5.5, false);
        last = t;
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [look, uniform]);
  return (
    <canvas
      ref={ref}
      width="300"
      height="260"
      style={{ imageRendering: "pixelated", maxWidth: "100%" }}
      aria-label="Prévia do personagem com uniforme"
    />
  );
}
function HairThumb({ look, style, uniform }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current.getContext("2d");
    c.clearRect(0, 0, 80, 72);
    drawPlayer(c, 40, 83, { ...look, style }, uniform, 0, 2.2);
  }, [look, style, uniform]);
  return (
    <canvas
      ref={ref}
      width="80"
      height="72"
      aria-hidden="true"
      style={{ imageRendering: "pixelated", display: "block" }}
    />
  );
}
export function AppearanceEditor({ player, team, onChange }) {
  const [look, setLook] = useState(() => appearance(player.pixelAppearance)),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const uniforms = clubKits(team),
    uniform = team
      ? uniforms[player.position === "GOL" ? "goalkeeper" : "home"]
      : kit({ shirt: "#7c8798" });
  const field = (key, value) => {
    const next = { ...look, [key]: value };
    setLook(next);
    onChange?.(appearance(next));
  };
  return (
    <section className="card" data-testid="appearance-editor">
      <h3>Meu personagem em campo</h3>
      <SpritePreview
        look={{
          ...look,
          number: team?.shirtNumbers?.[player.id] || look.number,
        }}
        uniform={uniform}
      />
      <p>
        {team
          ? `Uniforme atual: ${team.name}${player.position === "GOL" ? " — goleiro" : ""}`
          : "Sem clube: uniforme neutro"}
        . O uniforme acompanha seu clube; a aparência continua com você.
      </p>
      {[
        [SKIN, "skin", "Tom de pele"],
        [HAIR, "hair", "Cor do cabelo"],
        [EYES, "eyes", "Cor dos olhos"],
        [BOOTS, "boots", "Chuteiras"],
      ].map(([values, key, label]) => (
        <label key={key} style={{ display: "block", margin: "12px 0" }}>
          {label}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              margin: "8px 0",
            }}
          >
            {values.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`${label}: ${c}`}
                aria-pressed={look[key] === c}
                onClick={() => field(key, c)}
                style={{
                  width: 38,
                  height: 38,
                  background: c,
                  border:
                    look[key] === c ? "3px solid #54e6ad" : "2px solid #667",
                  borderRadius: 6,
                }}
              />
            ))}
          </div>
          <select
            className="input-field"
            aria-label={label}
            value={look[key]}
            onChange={(e) => field(key, e.target.value)}
          >
            {values.map((c, i) => (
              <option key={c} value={c}>
                {label} {i + 1} ({c})
              </option>
            ))}
          </select>
        </label>
      ))}
      <label>
        Cabelo
        <select
          className="input-field"
          aria-label="Cabelo"
          value={look.style}
          onChange={(e) => field("style", e.target.value)}
        >
          {Object.entries(STYLES).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "10px 0",
        }}
      >
        {Object.entries(STYLES).map(([key, label]) => (
          <button
            type="button"
            key={key}
            onClick={() => field("style", key)}
            aria-label={`Escolher cabelo ${label}`}
            aria-pressed={look.style === key}
            style={{
              minWidth: 100,
              padding: 10,
              border:
                look.style === key ? "2px solid #54e6ad" : "1px solid #456",
              background: "#18332e",
              color: "#fff",
              borderRadius: 8,
            }}
          >
            <HairThumb look={look} style={key} uniform={uniform} />
            {label}
          </button>
        ))}
      </div>
      <label>
        Barba
        <select
          className="input-field"
          aria-label="Barba"
          value={look.beard}
          onChange={(e) => field("beard", e.target.value)}
        >
          <option value="none">Sem barba</option>
          <option value="short">Curta</option>
          <option value="full">Cheia</option>
        </select>
      </label>
      <label>
        Mangas
        <select
          className="input-field"
          aria-label="Mangas"
          value={look.sleeves}
          onChange={(e) => field("sleeves", e.target.value)}
        >
          <option value="short">Curtas</option>
          <option value="long">Longas</option>
        </select>
      </label>
      <p>
        Número da camisa:{" "}
        <b>{team?.shirtNumbers?.[player.id] || "aguardando definição"}</b>. A
        numeração é definida pelo técnico do clube.
      </p>
      {!onChange && (
        <button
          className="btn btn-green"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const value = appearance(look);
              await db
                .collection("players")
                .doc(player.id)
                .update({ pixelAppearance: value });
              setLook(value);
              setMessage("Aparência salva. Será usada nas próximas partidas.");
            } catch {
              setMessage("Não foi possível salvar. Tente novamente.");
            } finally {
              setBusy(false);
            }
          }}
        >
          SALVAR APARÊNCIA
        </button>
      )}
      <p role="status">{message}</p>
    </section>
  );
}
export function KitEditor({ team }) {
  const [kits, setKits] = useState(() => clubKits(team)),
    [tab, setTab] = useState("home"),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <section className="card" data-testid="kit-editor">
      <h3>Uniformes do clube</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {[
          ["home", "CASA"],
          ["away", "FORA"],
          ["goalkeeper", "GOLEIRO"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`btn ${tab === key ? "btn-green" : "btn-ghost"}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <SpritePreview look={{}} uniform={kits[tab]} />
      {Object.entries({
        shirt: "Camisa",
        detail: "Detalhes",
        shorts: "Calção",
        socks: "Meião",
      }).map(([key, label]) => (
        <label key={key} style={{ display: "block", margin: 12 }}>
          {label}{" "}
          <input
            aria-label={label}
            type="color"
            value={kits[tab][key]}
            onChange={(e) =>
              setKits({
                ...kits,
                [tab]: { ...kits[tab], [key]: e.target.value },
              })
            }
          />
        </label>
      ))}
      <label>
        Modelo
        <select
          className="input-field"
          value={kits[tab].pattern}
          onChange={(e) =>
            setKits({
              ...kits,
              [tab]: { ...kits[tab], pattern: e.target.value },
            })
          }
        >
          {Object.entries(PATTERNS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <p>
        As mudanças valem para as próximas partidas. Replays preservam os
        uniformes originais.
      </p>
      <button
        className="btn btn-green"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await db
              .collection("teams")
              .doc(team.id)
              .update({ kits: clubKits({ kits }) });
            setMessage("Os três uniformes foram salvos.");
          } catch {
            setMessage("Não foi possível salvar os uniformes.");
          } finally {
            setBusy(false);
          }
        }}
      >
        SALVAR UNIFORMES
      </button>
      <p role="status">{message}</p>
    </section>
  );
}
