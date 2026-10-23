import React, { useRef, useEffect } from "react";
import { drawPlayer } from "./appearance.js";
import { frameAt } from "./engine.js";
export function Pitch({ match, time, camera = "tv" }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = ref.current.getContext("2d"),
      { a, b, mix } = frameAt(match, time),
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
    const zoom = camera === "tv" ? 1.25 : 1;
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-Math.max(384, Math.min(576, X(ball[0]))), -H / 2);
    ctx.fillStyle = "#1b6846";
    ctx.fillRect(38, 40, 884, 520);
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = i % 2 ? "#30834e" : "#2b7948";
      ctx.fillRect(X(i * 10), Y(0), 84, Y(64) - Y(0));
    }
    ctx.strokeStyle = "#d4e4c8";
    ctx.lineWidth = 2;
    ctx.strokeRect(X(0), Y(0), 840, Y(64) - Y(0));
    const line = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(X(x1), Y(y1));
      ctx.lineTo(X(x2), Y(y2));
      ctx.stroke();
    };
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
      }))
      .sort((v, w) => v.y - w.y);
    for (const { p, i, x, y } of people) {
      if (!a.positions[i][2]) continue;
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
        moving ? time * 3 + i : 0,
        1.2,
        p.side === a.period,
      );
      if (i === a.owner) {
        ctx.fillStyle = "#0d1825cc";
        ctx.fillRect(X(x) - 45, Y(y) + 6, 90, 13);
        ctx.fillStyle = "#fff";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(p.name.slice(0, 16), X(x), Y(y) + 16);
      }
    }
    ctx.fillStyle = "#0005";
    ctx.fillRect(X(ball[0]) - 3, Y(ball[1]) + 2, 8, 3);
    ctx.fillStyle = "#fff";
    ctx.fillRect(X(ball[0]) - 3, Y(ball[1]) - 4, 7, 7);
    ctx.fillStyle = "#17202c";
    ctx.fillRect(X(ball[0]) - 1, Y(ball[1]) - 2, 3, 3);
    ctx.restore();
    ctx.fillStyle = "#f7f2dc";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "right";
    ctx.fillText("MATO REAL • TV", 935, 25);
  }, [match, time, camera]);
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
