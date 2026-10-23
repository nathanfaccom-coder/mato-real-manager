import React, { useState } from "react";
import { db } from "../services/firebase.js";
import { assignNumbers } from "./rules.js";
export function CoachNumbers({ coach, team, players }) {
  const roster = (players || []).filter((p) => p.teamId === team?.id);
  const [numbers, setNumbers] = useState(() => {
    try {
      return Object.fromEntries(
        assignNumbers(roster, team?.shirtNumbers).map((p) => [
          p.id,
          p.pixelAppearance.number,
        ]),
      );
    } catch {
      return { ...team?.shirtNumbers };
    }
  });
  const [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  if (!team || coach.teamId !== team.id) return null;
  return (
    <section className="card" data-testid="coach-numbers">
      <h3>Números das camisas</h3>
      <p>
        O técnico define a numeração do elenco, de 1 a 99, sem repetição. Vale
        para as próximas partidas.
      </p>
      {roster.map((p) => (
        <label
          key={p.id}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ flex: 1 }}>
            {p.name} · {p.position}
          </span>
          <input
            className="input-field"
            style={{ width: 80, margin: 0 }}
            aria-label={`Número de ${p.name}`}
            type="number"
            min="1"
            max="99"
            value={numbers[p.id] ?? ""}
            onChange={(e) => setNumbers({ ...numbers, [p.id]: e.target.value })}
          />
        </label>
      ))}
      <button
        className="btn btn-green"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setMessage("");
          try {
            const values = roster.map((p) => Number(numbers[p.id]));
            if (
              values.some((n) => !Number.isInteger(n) || n < 1 || n > 99) ||
              new Set(values).size !== values.length
            )
              throw Error("Escolha números de 1 a 99, sem repetição.");
            await db.runTransaction(async (tx) => {
              const staff = await tx.get(db.collection("users").doc(coach.id));
              const club = await tx.get(db.collection("teams").doc(team.id));
              if (
                !staff.exists ||
                staff.data().teamId !== team.id ||
                (staff.data().type || staff.data().role) !== "COACH" ||
                !club.exists
              )
                throw Error(
                  "Somente o técnico contratado pode salvar a numeração.",
                );
              tx.update(db.collection("teams").doc(team.id), {
                shirtNumbers: Object.fromEntries(
                  roster.map((p) => [p.id, Number(numbers[p.id])]),
                ),
              });
            });
            setMessage("Numeração salva pelo técnico.");
          } catch (e) {
            setMessage(e.message);
          } finally {
            setBusy(false);
          }
        }}
      >
        SALVAR NUMERAÇÃO
      </button>
      <p role="status">{message}</p>
    </section>
  );
}
