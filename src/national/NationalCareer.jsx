import React from "react";
import { flag, nationName, nationalityOf } from "./catalog.js";
export function NationalCareer({ player }) {
  const id = nationalityOf(player),
    s = player.nationalStats || {};
  return (
    <div
      className="card national-career"
      style={{ border: "1px solid var(--primary)" }}
    >
      <b>
        {flag(id)} {nationName(id)}
      </b>
      <p>
        {player.nationalTeamId
          ? "✅ Convocado para " + nationName(player.nationalTeamId)
          : "Aguardando convocação"}
      </p>
      <small>
        Seleção: {s.caps || 0} jogos • {s.goals || 0} gols • {s.assists || 0}{" "}
        assistências
      </small>
      {(player.nationalTrophies || []).map((t, i) => (
        <p key={t.competitionId || i}>
          🏆 {t.name} — {t.date}
        </p>
      ))}
    </div>
  );
}
