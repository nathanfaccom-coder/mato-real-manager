import React, { useRef, useState } from "react";
import { firebase } from "../services/firebase.js";
import { canAdmin } from "./permissions.js";
import { fillTeamWithBots, planBotRoster } from "./botRosters.js";

export function BotRosterManager({ user, teams, players }) {
  const [selection, setSelection] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const locked = useRef(false);
  if (!canAdmin(user, "teams")) return null;
  const active = (teams || [])
    .filter((t) => t.status !== "PENDING")
    .sort((a, b) => a.name.localeCompare(b.name));
  const chosen =
    selection === "ALL" ? active : active.filter((t) => t.id === selection);
  const count = chosen.reduce(
    (sum, t) => sum + planBotRoster(t.id, players || []).length,
    0,
  );
  const fill = async () => {
    if (locked.current || !chosen.length || !canAdmin(user, "teams")) return;
    if (
      !confirm(
        `Completar ${chosen.length} time(s) até 22 jogadores?\nEstimativa: ${count} bots.\nCada bot terá overall 45 e salário de $500, seguindo as regras de pagamento do jogo. Jogadores existentes serão mantidos.`,
      )
    )
      return;
    locked.current = true;
    setBusy(true);
    let total = 0;
    let completed = 0;
    try {
      for (const team of chosen) {
        setMessage(
          `Preenchendo ${team.name} (${completed + 1}/${chosen.length})…`,
        );
        total += await fillTeamWithBots(firebase.firestore(), user, team.id);
        completed++;
      }
      setMessage(
        `${total} bots criados. ${completed} time(s) verificado(s). Elencos que já tinham 22 jogadores foram mantidos.`,
      );
    } catch (e) {
      setMessage(
        `${total} bots criados em ${completed} time(s). Erro: ${e.message} Você pode tentar novamente para completar os times restantes.`,
      );
    } finally {
      locked.current = false;
      setBusy(false);
    }
  };
  return (
    <div className="card">
      <h4>🤖 Preencher elencos com bots</h4>
      <p>
        Completa até 22 jogadores, priorizando as posições que faltam. Mantém os
        jogadores existentes. Bots têm overall 45, salário de $500 e não possuem
        login.
      </p>
      <label htmlFor="bot-team">Time para preencher</label>
      <select
        id="bot-team"
        className="input-field"
        value={selection}
        disabled={busy}
        onChange={(e) => setSelection(e.target.value)}
      >
        <option value="">Selecione um time</option>
        <option value="ALL">Todos os clubes ativos</option>
        {active.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      {chosen.length > 0 && (
        <p>
          Previsão: {count} bots · acréscimo de ${count * 500} na folha
          salarial.
        </p>
      )}
      <button
        className="btn btn-green"
        disabled={busy || !chosen.length || !count}
        onClick={fill}
      >
        {busy ? "PREENCHENDO…" : "🤖 PREENCHER COM BOTS"}
      </button>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
