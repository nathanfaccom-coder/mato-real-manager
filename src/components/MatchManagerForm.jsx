import React, { useState, useEffect } from "react";
import { SERIES } from "../game/SERIES.js";

export const MatchManagerForm = ({
  initialData,
  teams,
  tournaments,
  onSave,
  onDelete,
}) => {
  const [f, setF] = useState(
    initialData
      ? {
          ...initialData,
          hasPenalties: initialData.hasPenalties || false,
          penaltiesHome: initialData.penaltiesHome || 0,
          penaltiesAway: initialData.penaltiesAway || 0,
        }
      : {
          homeId: "",
          awayId: "",
          serie: "A",
          round: 1,
          scoreHome: 0,
          scoreAway: 0,
          status: "PENDING",
          hasPenalties: false,
          penaltiesHome: 0,
          penaltiesAway: 0,
        },
  );

  const handleSubmit = () => {
    if (!f.homeId || !f.awayId) return alert("Selecione os dois times!");
    if (f.homeId === f.awayId)
      return alert("O time não pode jogar contra si mesmo!");

    const homeTeam = teams.find((t) => t.id === f.homeId);
    const awayTeam = teams.find((t) => t.id === f.awayId);

    const payload = {
      ...f,
      homeName: homeTeam.name,
      homeLogo: homeTeam.logo || null,
      awayName: awayTeam.name,
      awayLogo: awayTeam.logo || null,
      round: isNaN(parseInt(f.round)) ? f.round : parseInt(f.round),
      scoreHome: parseInt(f.scoreHome) || 0,
      scoreAway: parseInt(f.scoreAway) || 0,
      hasPenalties: f.hasPenalties || false,
      penaltiesHome: f.hasPenalties ? parseInt(f.penaltiesHome) || 0 : 0,
      penaltiesAway: f.hasPenalties ? parseInt(f.penaltiesAway) || 0 : 0,
    };

    onSave(payload);
  };

  const isCustomTourn =
    tournaments && tournaments.some((t) => t.id === f.serie);
  const availableTeams = isCustomTourn
    ? teams.filter((t) =>
        tournaments.find((x) => x.id === f.serie)?.teams.includes(t.id),
      )
    : teams.filter((t) => t.serie === f.serie && t.status !== "PENDING");

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <h3>{f.id ? "Editar Partida" : "Criar Partida Manual"}</h3>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Série / Liga / Copa</label>
            <select
              className="input-field"
              value={f.serie}
              onChange={(e) => {
                setF({ ...f, serie: e.target.value, homeId: "", awayId: "" });
              }}
            >
              <optgroup label="Ligas Oficiais">
                {SERIES.map((s) => (
                  <option key={s} value={s}>
                    {s === "VARZEA" ? "Várzea (Terrão)" : `Série ${s}`}
                  </option>
                ))}
                <option value="GUEST">Times Convidados</option>
              </optgroup>
              {tournaments && tournaments.length > 0 && (
                <optgroup label="Copas e Campeonatos">
                  {tournaments
                    .filter((t) => t.status === "ACTIVE")
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Rodada/Fase</label>
            <input
              className="input-field"
              type="text"
              placeholder="Ex: 1, Quartas, Final"
              value={f.round}
              onChange={(e) => setF({ ...f, round: e.target.value })}
            />
          </div>
        </div>

        <label>Mandante (Casa)</label>
        <select
          className="input-field"
          value={f.homeId}
          onChange={(e) => setF({ ...f, homeId: e.target.value })}
        >
          <option value="">-- Selecione --</option>
          {availableTeams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <label>Visitante (Fora)</label>
        <select
          className="input-field"
          value={f.awayId}
          onChange={(e) => setF({ ...f, awayId: e.target.value })}
        >
          <option value="">-- Selecione --</option>
          {availableTeams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <hr style={{ borderColor: "#333", margin: "15px 0" }} />

        <label>Status</label>
        <select
          className="input-field"
          value={f.status}
          onChange={(e) => setF({ ...f, status: e.target.value })}
        >
          <option value="PENDING">Agendado (Não jogado)</option>
          <option value="FINISHED">Finalizado (Exibir Placar)</option>
        </select>

        {f.status === "FINISHED" && (
          <div style={{ background: "#222", padding: 10, borderRadius: 8 }}>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <input
                className="input-field"
                type="number"
                style={{ width: 50, textAlign: "center", marginBottom: 0 }}
                value={f.scoreHome}
                onChange={(e) => setF({ ...f, scoreHome: e.target.value })}
              />
              <b>X</b>
              <input
                className="input-field"
                type="number"
                style={{ width: 50, textAlign: "center", marginBottom: 0 }}
                value={f.scoreAway}
                onChange={(e) => setF({ ...f, scoreAway: e.target.value })}
              />
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
                justifyContent: "center",
                color: "gold",
                fontSize: 12,
              }}
            >
              <input
                type="checkbox"
                checked={f.hasPenalties}
                onChange={(e) => setF({ ...f, hasPenalties: e.target.checked })}
              />
              Decidido nos Pênaltis?
            </label>

            {f.hasPenalties && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <input
                  className="input-field"
                  type="number"
                  style={{
                    width: 40,
                    textAlign: "center",
                    marginBottom: 0,
                    borderColor: "gold",
                  }}
                  value={f.penaltiesHome}
                  onChange={(e) =>
                    setF({ ...f, penaltiesHome: e.target.value })
                  }
                />
                <b style={{ color: "gold" }}>(PÊNALTIS)</b>
                <input
                  className="input-field"
                  type="number"
                  style={{
                    width: 40,
                    textAlign: "center",
                    marginBottom: 0,
                    borderColor: "gold",
                  }}
                  value={f.penaltiesAway}
                  onChange={(e) =>
                    setF({ ...f, penaltiesAway: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button className="btn btn-green" onClick={handleSubmit}>
            SALVAR
          </button>
          {f.id && (
            <button className="btn btn-red" onClick={() => onDelete(f.id)}>
              EXCLUIR
            </button>
          )}
          <button className="btn" onClick={() => onSave(null)}>
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};
