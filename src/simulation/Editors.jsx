import React, { useRef, useEffect, useState } from "react";
import { db } from "../services/firebase.js";
import {
  appearance,
  drawPlayer,
  SKIN,
  HAIR,
  BOOTS,
  STYLES,
} from "./appearance.js";
import { clubKits, kit, PATTERNS } from "./kits.js";
export function SpritePreview({ look, uniform }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current.getContext("2d");
    c.clearRect(0, 0, 180, 180);
    c.fillStyle = "#102b25";
    c.fillRect(0, 0, 180, 180);
    drawPlayer(c, 90, 155, look, uniform, 0, 5);
  }, [look, uniform]);
  return (
    <canvas
      ref={ref}
      width="180"
      height="180"
      style={{ imageRendering: "pixelated", maxWidth: "100%" }}
      aria-label="Prévia do personagem com uniforme"
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
      <SpritePreview look={look} uniform={uniform} />
      <p>
        {team
          ? `Uniforme atual: ${team.name}${player.position === "GOL" ? " — goleiro" : ""}`
          : "Sem clube: uniforme neutro"}
        . O uniforme acompanha seu clube; a aparência continua com você.
      </p>
      {[
        [SKIN, "skin", "Tom de pele"],
        [HAIR, "hair", "Cor do cabelo"],
        [BOOTS, "boots", "Chuteiras"],
      ].map(([values, key, label]) => (
        <label key={key} style={{ display: "block", margin: "12px 0" }}>
          {label}
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
      <label>
        Número preferido
        <input
          className="input-field"
          type="number"
          min="1"
          max="99"
          value={look.number}
          onChange={(e) => field("number", e.target.value)}
        />
      </label>
      <p>
        Se dois titulares escolherem o mesmo número, o amistoso atribui um
        número livre ao segundo.
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
