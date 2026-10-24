import { actorPresentation } from "./presentation.js";
import React, { useRef, useEffect } from "react";
import { drawPlayer } from "./appearance.js";
import { frameAt } from "./engine.js";
function presentationPositions(match, presentation) {
  const elapsed = presentation.elapsedMs;
  const smooth = (value) => {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  };
  return match.people.map((player) => {
    if (player.reserve) return [50, 32, 0];
    const rowY = 8 + player.slot * 4.8;
    if (presentation.stage === "walkout") {
      const progress = smooth(elapsed / 4500),
        target = player.side === 0 ? 43 : 57,
        entrance = player.side === 0 ? -7 : 107;
      return [entrance + (target - entrance) * progress, rowY, 1];
    }
    if (presentation.stage === "handshake") {
      const progress = smooth((elapsed - 4500) / 4500),
        start = player.side === 0 ? 43 : 57,
        target = player.side === 0 ? 53 : 47;
      return [start + (target - start) * progress, rowY, 1];
    }
    return [
      player.side === 0
        ? 4 + player.anchor.x * 42
        : 96 - player.anchor.x * 42,
      5 + player.anchor.y * 54,
      1,
    ];
  });
}

export function Pitch({ match, time, camera = "wide", presentation = null }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = ref.current.getContext("2d"),
      sampled = frameAt(match, time),
      a = presentation
        ? {
            ...sampled.a,
            positions: presentationPositions(match, presentation),
            owner: -1,
            ball: [50, 32],
          }
        : sampled.a,
      b = presentation ? a : sampled.b,
      mix = presentation ? 0 : sampled.mix,
      lerp = (v, w) => v + (w - v) * mix;
    const ball = a.ball.map((v, i) => lerp(v, b.ball[i]));
    const W = 960,
      H = 600,
      X = (x) => 60 + x * 8.4,
      Y = (y) => 54 + y * 7.65;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#132028";
    ctx.fillRect(0, 0, W, H);
    // Pixel terraces and advertising boards.
    for (let y = 8; y < 40; y += 9)
      for (let x = 12; x < W - 12; x += 10) {
        ctx.fillStyle = ["#526072", "#c1b88f", "#294450", "#687060"][
          (Math.floor(x / 10) + y) % 4
        ];
        ctx.fillRect(x, y, 5, 5);
      }
    ctx.save();
    const zoom = camera === "tv" ? 1.65 : 1;
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(
      camera === "tv"
        ? -Math.max(W / (2 * zoom), Math.min(W - W / (2 * zoom), X(ball[0])))
        : -W / 2,
      -H / 2,
    );
    ctx.fillStyle = "#1b6846";
    ctx.fillRect(38, 40, 884, 520);
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = i % 2 ? "#30834e" : "#2b7948";
      ctx.fillRect(X(i * 10), Y(0), 84, Y(64) - Y(0));
    }
    // Stable pixel grass texture, without per-frame randomness or image downloads.
    for (let i = 0; i < 650; i++) {
      ctx.fillStyle = i % 2 ? "#ffffff08" : "#082f2510";
      ctx.fillRect(61 + ((i * 137) % 835), 55 + ((i * 73) % 485), 3, 2);
    }
    ctx.strokeStyle = "#e6edd1";
    ctx.lineWidth = 2;
    ctx.strokeRect(X(0), Y(0), 840, Y(64) - Y(0));
    const line = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(X(x1), Y(y1));
      ctx.lineTo(X(x2), Y(y2));
      ctx.stroke();
    };
    for (const cx of [0, 100])
      for (const cy of [0, 64]) {
        ctx.fillStyle = "#f6e8c3";
        ctx.fillRect(X(cx) - 1, Y(cy) - 23, 2, 23);
        ctx.fillStyle = "#ffbd4a";
        ctx.fillRect(X(cx), Y(cy) - 23, cx === 0 ? 11 : -11, 7);
      }
    line(50, 0, 50, 64);
    ctx.beginPath();
    ctx.ellipse(X(50), Y(32), 77, 70, 0, 0, Math.PI * 2);
    ctx.stroke();
    for (const side of [0, 1]) {
      const x = side ? 83.5 : 0;
      ctx.strokeRect(X(x), Y(12), 16.5 * 8.4, 40 * 7.65);
      ctx.strokeRect(X(side ? 94.5 : 0), Y(23), 5.5 * 8.4, 18 * 7.65);
      ctx.fillStyle = "#e0e9db";
      ctx.fillRect(X(side ? 89 : 11) - 2, Y(32) - 2, 4, 4);
      ctx.strokeRect(X(side ? 100 : -2.5), Y(27), 2.5 * 8.4, 10 * 7.65);
      for (let j = 1; j < 10; j++)
        line(side ? 100 : 0, 27 + j, side ? 102.5 : -2.5, 27 + j);
    }
    const people = match.people
      .map((p, i) => ({
        p,
        i,
        x: lerp(a.positions[i][0], b.positions[i][0]),
        y: lerp(a.positions[i][1], b.positions[i][1]),
        pose: presentation
          ? {
              x: a.positions[i][0],
              y: a.positions[i][1],
              visible: Boolean(a.positions[i][2]),
              action:
                presentation.stage === "walkout"
                  ? "walk"
                  : presentation.stage === "handshake"
                    ? "greet"
                    : "idle",
              facing: p.side === 0 ? 1 : -1,
            }
          : actorPresentation(match, a, i, time),
      }))
      .sort((v, w) => v.y - w.y);
    for (const { p, i, x: baseX, y: baseY, pose } of people) {
      if (!pose.visible) continue;
      const departing = !a.positions[i][2] || pose.action === "walk";
      const x = departing ? pose.x : baseX,
        y = departing ? pose.y : baseY;
      const key =
        p.side === 0
          ? p.slot === 0
            ? "homeGK"
            : "home"
          : p.slot === 0
            ? "awayGK"
            : "away";
      const moving =
        Math.hypot(
          a.positions[i][0] - b.positions[i][0],
          a.positions[i][1] - b.positions[i][1],
        ) > 0.1;
      drawPlayer(
        ctx,
        X(x),
        Y(y),
        p.pixelAppearance,
        match.snapshot.kits[key],
        moving || departing ? time * (pose.action === "limp" ? 1 : 2.2) + i : 0,
        1.55,
        b.positions[i][1] < a.positions[i][1] - 0.1,
        pose,
      );
      if (i === a.owner) {
        ctx.fillStyle = "#65ffcf";
        ctx.beginPath();
        ctx.moveTo(X(x) - 5, Y(y) - 60);
        ctx.lineTo(X(x) + 5, Y(y) - 60);
        ctx.lineTo(X(x), Y(y) - 54);
        ctx.fill();
        ctx.fillStyle = "#0d1825cc";
        ctx.fillRect(X(x) - 45, Y(y) + 6, 90, 13);
        ctx.fillStyle = "#fff";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(p.name.slice(0, 16), X(x), Y(y) + 16);
      }
    }
    const stoppage = match.events.findLast(
      (e) =>
        e.t <= time &&
        time - e.t < 18 &&
        [
          "yellow",
          "red",
          "foul",
          "offside",
          "substitution",
          "injury",
          "throwin",
          "corner",
          "goalkick",
        ].includes(e.type),
    );
    const rx = stoppage?.at
      ? Math.max(8, Math.min(92, stoppage.at[0] + 5))
      : 25 + ball[0] * 0.5;
    const ry = stoppage?.at
      ? Math.max(6, Math.min(58, stoppage.at[1] - 5))
      : Math.max(10, Math.min(54, ball[1] - 9));
    drawPlayer(
      ctx,
      X(rx),
      Y(ry),
      { skin: "#cf9367", hair: "#171717", style: "short", number: 0 },
      {
        shirt: "#ffe133",
        shorts: "#111827",
        socks: "#111827",
        detail: "#222222",
      },
      stoppage ? 0 : time * 1.8,
      1.55,
      false,
      {
        referee: true,
        card: ["yellow", "red"].includes(stoppage?.type) ? stoppage.type : null,
      },
    );
    if (["throwin", "corner", "goalkick"].includes(stoppage?.type)) {
      ctx.fillStyle = "#0c1b24dd";
      ctx.fillRect(X(50) - 65, Y(4), 130, 22);
      ctx.fillStyle = "#ffe19a";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        { throwin: "LATERAL", corner: "ESCANTEIO", goalkick: "TIRO DE META" }[
          stoppage.type
        ],
        X(50),
        Y(4) + 16,
      );
    }
    if (stoppage?.type === "offside") {
      ctx.strokeStyle = "#ffdb52";
      ctx.lineWidth = 3;
      line(stoppage.line, 0, stoppage.line, 64);
      ctx.fillStyle = "#0c1b24";
      ctx.fillRect(X(stoppage.line) - 42, Y(4), 84, 18);
      ctx.fillStyle = "#ffdb52";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText("IMPEDIMENTO", X(stoppage.line), Y(4) + 13);
    }
    if (stoppage?.type === "substitution") {
      ctx.fillStyle = "#101820";
      ctx.fillRect(X(50) - 32, Y(64) - 18, 64, 22);
      ctx.fillStyle = "#ff6977";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        String(match.people[stoppage.actor].pixelAppearance.number),
        X(50) - 14,
        Y(64) - 2,
      );
      ctx.fillStyle = "#52ffb3";
      ctx.fillText(
        String(match.people[stoppage.incoming].pixelAppearance.number),
        X(50) + 14,
        Y(64) - 2,
      );
    }
    if (presentation) {
      const label =
        presentation.stage === "walkout"
          ? "OS TIMES ENTRAM EM CAMPO"
          : presentation.stage === "handshake"
            ? "CUMPRIMENTOS"
            : presentation.stage === "lineups"
              ? "FORMAÇÕES INICIAIS"
              : `BOLA ROLANDO EM ${Math.max(1, Math.ceil((20000 - presentation.elapsedMs) / 1000))}`;
      ctx.fillStyle = "#0b1722e8";
      ctx.fillRect(315, 44, 330, 24);
      ctx.fillStyle = presentation.stage === "countdown" ? "#50dfac" : "#fff";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText(label, 480, 61);
    }
    const cornerKick = match.events.findLast(
      (e) =>
        e.t <= time &&
        time - e.t < 5 &&
        e.type === "restart" &&
        e.restartType === "corner",
    );
    const loft =
      cornerKick && a.owner === -1
        ? Math.sin(Math.min(1, (time - cornerKick.t) / 5) * Math.PI) * 26
        : 0;
    ctx.strokeStyle = "#fff9";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(X(ball[0]), Y(ball[1]), 8, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#0005";
    ctx.fillRect(X(ball[0]) - 3, Y(ball[1]) + 2, 8, 3);
    ctx.fillStyle = "#fff";
    ctx.fillRect(X(ball[0]) - 3, Y(ball[1]) - 4 - loft, 7, 7);
    ctx.fillStyle = "#17202c";
    ctx.fillRect(X(ball[0]) - 1, Y(ball[1]) - 2 - loft, 3, 3);
    ctx.restore();
    if (camera === "tv") {
      const mx = 390,
        my = 488,
        mw = 180,
        mh = 100;
      ctx.fillStyle = "#10231ee6";
      ctx.fillRect(mx - 6, my - 6, mw + 12, mh + 12);
      ctx.strokeStyle = "#c5ddbb";
      ctx.lineWidth = 1;
      ctx.strokeRect(mx, my, mw, mh);
      ctx.beginPath();
      ctx.moveTo(mx + mw / 2, my);
      ctx.lineTo(mx + mw / 2, my + mh);
      ctx.stroke();
      for (const { p, i, x, y } of people) {
        if (!a.positions[i][2]) continue;
        ctx.fillStyle = p.side === 0 ? "#53d5ff" : "#ff8c6f";
        ctx.fillRect(mx + (x * mw) / 100 - 2, my + (y * mh) / 64 - 2, 4, 4);
      }
      ctx.fillStyle = "#fff";
      ctx.fillRect(
        mx + (ball[0] * mw) / 100 - 2,
        my + (ball[1] * mh) / 64 - 2,
        4,
        4,
      );
    }
    ctx.fillStyle = "#f7f2dc";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "right";
    ctx.fillText("MATO REAL • TV", 935, 25);
  }, [match, time, camera, presentation?.stage, presentation?.elapsedMs]);
  return (
    <canvas
      ref={ref}
      width="960"
      height="600"
      aria-label="Transmissão completa da partida em pixel art"
      style={{ display: "block", width: "100%", imageRendering: "pixelated" }}
    />
  );
}
