import React, { useState, useEffect } from "react";

export const StatsEditor = ({ players, teams, onSave }) => {
  const [search, setSearch] = useState("");
  const [selP, setSelP] = useState(null);
  const [s, setS] = useState({});
  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (selP)
    return (
      <div>
        <h3>Editando: {selP.name}</h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <div>
            <label>Gols</label>
            <input
              className="input-field"
              type="number"
              value={s.goals}
              onChange={(e) => setS({ ...s, goals: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label>Assistências</label>
            <input
              className="input-field"
              type="number"
              value={s.assists}
              onChange={(e) =>
                setS({ ...s, assists: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Desarmes</label>
            <input
              className="input-field"
              type="number"
              value={s.tackles}
              onChange={(e) =>
                setS({ ...s, tackles: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Defesas</label>
            <input
              className="input-field"
              type="number"
              value={s.saves}
              onChange={(e) => setS({ ...s, saves: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label>Amarelos</label>
            <input
              className="input-field"
              type="number"
              value={s.yellows}
              onChange={(e) =>
                setS({ ...s, yellows: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Vermelhos</label>
            <input
              className="input-field"
              type="number"
              value={s.reds}
              onChange={(e) => setS({ ...s, reds: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <button className="btn btn-green" onClick={() => onSave(selP.id, s)}>
          SALVAR ESTATÍSTICAS
        </button>
        <button className="btn" onClick={() => setSelP(null)}>
          VOLTAR
        </button>
      </div>
    );
  return (
    <div>
      <input
        className="input-field"
        placeholder="Buscar jogador..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {search.length > 0 &&
          filtered.map((p) => (
            <div
              key={p.id}
              className="card"
              onClick={() => {
                setSelP(p);
                setS(
                  p.stats || {
                    goals: 0,
                    assists: 0,
                    tackles: 0,
                    saves: 0,
                    yellows: 0,
                    reds: 0,
                  },
                );
              }}
            >
              <b>
                {p.name} {p.recoveryLeft > 0 ? "❌" : ""}
              </b>{" "}
              <small>({teams.find((t) => t.id === p.teamId)?.name})</small>
            </div>
          ))}
      </div>
    </div>
  );
};
