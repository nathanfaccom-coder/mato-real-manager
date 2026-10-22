import { canAdmin } from "../admin/permissions.js";
import React, { useEffect, useState } from "react";
import { readNavigation, saveNavigation } from "../services/session.js";
import { db } from "../services/firebase.js";
import { NATIONS, flag, nationName, nationalityOf } from "./catalog.js";
import { FORMATIONS } from "../game/FORMATIONS.js";
import { eligible, standings } from "./rules.js";
import * as api from "./service.js";
import { NationalitySelect } from "./NationalitySelect.jsx";
const label = (id) => `${flag(id)} ${nationName(id)}`;
function useRows(collection, filter = null, enabled = true) {
  const [rows, setRows] = useState([]),
    [error, setError] = useState(""),
    [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled) {
      setRows([]);
      return;
    }
    setReady(false);
    setError("");
    let q = db.collection(collection);
    if (filter) q = q.where("competitionId", "==", filter);
    else if (collection !== "nationalTeams")
      q = q.orderBy("date", "desc").limit(200);
    return q.onSnapshot(
      (s) => {
        setRows(s.docs.map((d) => ({ ...d.data(), id: d.id })));
        setReady(true);
      },
      (e) => {
        setError("Não foi possível carregar as seleções. " + e.message);
      },
    );
  }, [collection, filter, enabled]);
  return [rows, error, ready];
}
export function NationalTeams({ user, players, coaches, onBack }) {
  const [teams, error, ready] = useRows("nationalTeams");
  const [id, setId] = useState(() => {
    const saved = readNavigation(user, "nationalTeam");
    return NATIONS.some((n) => n.id === saved)
      ? saved
      : user.data?.nationalTeamId || nationalityOf(user.data);
  });
  const [search, setSearch] = useState("");
  const selected = teams.find((t) => t.id === id) || {
    id,
    squadIds: [],
    lineup: [],
  };
  return (
    <section data-testid="national-teams">
      <button className="btn" onClick={onBack} style={{ marginBottom: 12 }}>
        ←{" "}
        {user.type === "ADMIN"
          ? "VOLTAR AO PAINEL ADM"
          : "VOLTAR AO MEU PAINEL"}
      </button>
      <h2>🌍 Seleções</h2>
      <p>212 seleções • uma carreira além do clube</p>
      {error && (
        <p role="alert" style={{ color: "#ff6666" }}>
          {error}
        </p>
      )}
      <input
        className="input-field"
        aria-label="Buscar seleção"
        placeholder="Buscar seleção..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="input-field"
        aria-label="Seleção"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
          saveNavigation(user, "nationalTeam", e.target.value);
        }}
      >
        {NATIONS.filter(
          (n) =>
            n.id === id ||
            n.name
              .toLocaleLowerCase("pt-BR")
              .includes(search.toLocaleLowerCase("pt-BR")),
        ).map((n) => (
          <option key={n.id} value={n.id}>
            {label(n.id)} • {n.confederation}
          </option>
        ))}
      </select>
      {ready && (
        <TeamDetail
          key={id}
          id={id}
          team={selected}
          user={user}
          players={players}
          coaches={coaches}
        />
      )}
      <CompetitionCenter user={user} teams={teams} players={players} />
    </section>
  );
}
function TeamDetail({ id, team, user, players, coaches }) {
  const adm = canAdmin(user, "nationalTeams"),
    manage = adm || (user.type === "COACH" && team.coachId === user.data.id);
  const [coach, setCoach] = useState(team.coachId || ""),
    [squad, setSquad] = useState(team.squadIds || []),
    [formation, setFormation] = useState(team.formation || "4-3-3 OFENSIVO"),
    [lineup, setLineup] = useState(team.lineup || Array(11).fill(""));
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [query, setQuery] = useState(""),
    [playerId, setPlayerId] = useState(""),
    [nationality, setNationality] = useState(id);
  useEffect(() => {
    setCoach(team.coachId || "");
    setSquad(team.squadIds || []);
    setFormation(team.formation || "4-3-3 OFENSIVO");
    setLineup(team.lineup || Array(11).fill(""));
  }, [
    team.coachId,
    JSON.stringify(team.squadIds),
    JSON.stringify(team.lineup),
    team.formation,
  ]);
  const run = async (fn, success) => {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      await fn();
      setMessage(success);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  };
  const available = players.filter((p) => eligible(p, id));
  const currentCoach = coaches.find((c) => c.id === team.coachId);
  return (
    <div className="card">
      <h3>{label(id)}</h3>
      <p>Técnico: {currentCoach?.name || "Não nomeado"}</p>
      <p>
        {available.length} jogadores elegíveis • {(team.squadIds || []).length}
        /23 convocados
      </p>
      {message && (
        <p role="status" style={{ color: "var(--primary)" }}>
          {message}
        </p>
      )}
      {adm && (
        <fieldset
          disabled={busy}
          style={{ border: "1px solid #444", padding: 10 }}
        >
          <legend>Gestão ADM</legend>
          <label>
            Técnico da seleção
            <select
              className="input-field"
              aria-label="Técnico da seleção"
              value={coach}
              onChange={(e) => setCoach(e.target.value)}
            >
              <option value="">Sem técnico</option>
              {coaches
                .filter(
                  (c) =>
                    c.type === "COACH" &&
                    !["PENDING", "BLOCKED"].includes(c.status),
                )
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.nationalTeamId && c.nationalTeamId !== id
                      ? " — " + nationName(c.nationalTeamId)
                      : ""}
                  </option>
                ))}
            </select>
          </label>
          <button
            className="btn btn-green"
            onClick={() =>
              run(
                () => api.appointCoach(db, user, id, coach),
                "Nomeação atualizada.",
              )
            }
          >
            SALVAR TÉCNICO
          </button>
          <button
            className="btn btn-ghost"
            onClick={() =>
              run(
                () => api.appointCoach(db, user, id, null),
                "Técnico removido.",
              )
            }
          >
            REMOVER TÉCNICO
          </button>
          <details>
            <summary>Cadastros e NPCs</summary>
            <p>
              NPCs são opcionais. Cada seleção pode gerar um grupo de 23
              reservas uma única vez.
            </p>
            <button
              className="btn btn-blue"
              onClick={() => {
                if (
                  confirm(
                    `Gerar 23 NPCs de nível inicial para ${nationName(id)}?`,
                  )
                )
                  run(
                    () => api.generateReserves(db, user, id),
                    "NPCs criados. Faça a convocação abaixo.",
                  );
              }}
            >
              GERAR NPCs DE APOIO
            </button>
            <label>
              Jogador
              <select
                className="input-field"
                aria-label="Jogador para nacionalidade"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              >
                <option value="">Escolha...</option>
                {players.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {nationName(nationalityOf(p))}
                  </option>
                ))}
              </select>
            </label>
            <NationalitySelect value={nationality} onChange={setNationality} />
            <button
              className="btn btn-ghost"
              disabled={!playerId}
              onClick={() =>
                run(
                  () => api.setNationality(db, user, playerId, nationality),
                  "Nacionalidade atualizada.",
                )
              }
            >
              CORRIGIR NACIONALIDADE
            </button>
          </details>
        </fieldset>
      )}
      <h4>Convocação</h4>
      {manage && (
        <input
          className="input-field"
          placeholder="Filtrar jogadores..."
          aria-label="Filtrar convocados"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <div style={{ maxHeight: 330, overflowY: "auto" }}>
        {(manage
          ? available
          : players.filter((p) => (team.squadIds || []).includes(p.id))
        )
          .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
          .map((p) => (
            <label
              key={p.id}
              style={{
                display: "block",
                padding: "8px 0",
                borderBottom: "1px solid #333",
              }}
            >
              {manage && (
                <input
                  type="checkbox"
                  aria-label={`Convocar ${p.name}`}
                  checked={squad.includes(p.id)}
                  disabled={
                    busy || (!squad.includes(p.id) && squad.length >= 23)
                  }
                  onChange={(e) =>
                    setSquad(
                      e.target.checked
                        ? [...squad, p.id]
                        : squad.filter((x) => x !== p.id),
                    )
                  }
                />
              )}{" "}
              {p.name} • {p.position} • OV {p.overall} • ⚡{p.energy ?? 100}
              {p.recoveryLeft > 0 ? " • LESIONADO" : ""}
            </label>
          ))}
      </div>
      {manage && (
        <button
          className="btn btn-green"
          disabled={busy}
          onClick={() =>
            run(
              () => api.saveSquad(db, user, id, squad),
              "Convocação publicada.",
            )
          }
        >
          PUBLICAR CONVOCAÇÃO ({squad.length}/23)
        </button>
      )}
      <h4>Escalação</h4>
      <select
        className="input-field"
        aria-label="Formação da seleção"
        value={formation}
        disabled={!manage || busy}
        onChange={(e) => {
          setFormation(e.target.value);
          setLineup(Array(11).fill(""));
        }}
      >
        {Object.keys(FORMATIONS).map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
      {manage ? (
        <>
          {(FORMATIONS[formation] || []).map((pos, i) => (
            <label
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ minWidth: 45 }}>{pos}</span>
              <select
                className="input-field"
                aria-label={`Titular ${i + 1}`}
                value={lineup[i] || ""}
                disabled={busy}
                onChange={(e) =>
                  setLineup(
                    Array.from({ length: 11 }, (_, j) =>
                      i === j ? e.target.value : lineup[j] || "",
                    ),
                  )
                }
              >
                <option value="">Escolher titular</option>
                {players
                  .filter((p) => (team.squadIds || []).includes(p.id))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.position})
                    </option>
                  ))}
              </select>
            </label>
          ))}
          <button
            className="btn btn-green"
            disabled={busy}
            onClick={() =>
              run(
                () => api.saveLineup(db, user, id, formation, lineup),
                "Escalação salva.",
              )
            }
          >
            SALVAR ESCALAÇÃO
          </button>
        </>
      ) : (
        <ol>
          {(team.lineup || []).map((pid, i) => (
            <li key={i}>
              {players.find((p) => p.id === pid)?.name || "Vaga aberta"}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
function CompetitionCenter({ user, teams, players }) {
  const adm = canAdmin(user, "nationalTeams");
  const [recent, error] = useRows("nationalMatches");
  const [cups, cupError] = useRows("nationalCompetitions");
  const [cupId, setCupId] = useState("");
  const [cupGames, gameError] = useRows(
    "nationalMatches",
    cupId || null,
    Boolean(cupId),
  );
  const [home, setHome] = useState("MTR"),
    [away, setAway] = useState("BR"),
    [date, setDate] = useState(""),
    [name, setName] = useState("Copa das Seleções"),
    [ids, setIds] = useState(["MTR", "BR"]);
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [editing, setEditing] = useState(null);
  const run = async (fn, success) => {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      await fn();
      setMessage(success);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  };
  const cup = cups.find((c) => c.id === cupId);
  const games = cupId ? cupGames : recent;
  return (
    <div className="card">
      <h3>🏆 Jogos e copas de seleções</h3>
      {(error || cupError || gameError) && (
        <p role="alert">{error || cupError || gameError}</p>
      )}
      {message && <p role="status">{message}</p>}
      {adm && (
        <details>
          <summary>Organizar partidas e copas (ADM)</summary>
          <fieldset disabled={busy} style={{ border: 0, padding: 0 }}>
            <NationalitySelect
              label="Mandante"
              value={home}
              onChange={setHome}
            />
            <NationalitySelect
              label="Visitante"
              value={away}
              onChange={setAway}
            />
            <label>
              Data
              <input
                aria-label="Data das seleções"
                className="input-field"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <button
              className="btn btn-green"
              onClick={() =>
                run(
                  () => api.scheduleFriendly(db, user, home, away, date),
                  "Amistoso agendado.",
                )
              }
            >
              AGENDAR AMISTOSO
            </button>
            <hr />
            <input
              className="input-field"
              aria-label="Nome da copa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>
              2 a 16 participantes. Todos contra todos, rodadas semanais e final
              entre os dois melhores. Desempate: pontos, vitórias, saldo, gols e
              código da seleção.
            </p>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              {NATIONS.map((n) => (
                <label key={n.id} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={ids.includes(n.id)}
                    disabled={!ids.includes(n.id) && ids.length >= 16}
                    onChange={(e) =>
                      setIds(
                        e.target.checked
                          ? [...ids, n.id]
                          : ids.filter((id) => id !== n.id),
                      )
                    }
                  />{" "}
                  {label(n.id)}
                </label>
              ))}
            </div>
            <button
              className="btn btn-blue"
              onClick={() =>
                run(
                  () => api.createCup(db, user, name, ids, date),
                  "Copa criada.",
                )
              }
            >
              CRIAR COPA ({ids.length})
            </button>
          </fieldset>
        </details>
      )}
      <label>
        Competição
        <select
          className="input-field"
          aria-label="Competição de seleções"
          value={cupId}
          onChange={(e) => setCupId(e.target.value)}
        >
          <option value="">Jogos recentes</option>
          {cups.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      {cup && (
        <>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: 12 }}>
              <thead>
                <tr>
                  <th>Seleção</th>
                  <th>PTS</th>
                  <th>J</th>
                  <th>V</th>
                  <th>SG</th>
                </tr>
              </thead>
              <tbody>
                {standings(cup.teamIds, cupGames).map((t) => (
                  <tr key={t.id}>
                    <td>{label(t.id)}</td>
                    <td>{t.pts}</td>
                    <td>{t.played}</td>
                    <td>{t.wins}</td>
                    <td>{t.gf - t.ga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {cup.winnerId && <p>🏆 Campeã: {label(cup.winnerId)}</p>}
          {adm && !cup.finalId && (
            <>
              <label>
                Data da final
                <input
                  type="date"
                  className="input-field"
                  aria-label="Data da final"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <button
                className="btn btn-blue"
                disabled={busy}
                onClick={() =>
                  run(
                    () => api.createFinal(db, user, cup.id, date),
                    "Final agendada.",
                  )
                }
              >
                GERAR FINAL
              </button>
            </>
          )}
        </>
      )}
      {!games.length && <p>Nenhuma partida cadastrada.</p>}
      {[...games]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((m) => (
          <div className="card" key={m.id}>
            <small>
              {m.date} • {m.competitionName}{" "}
              {m.stage === "FINAL" ? "• FINAL" : ""}
            </small>
            <p>
              {label(m.homeId)}{" "}
              {m.status === "FINISHED"
                ? `${m.homeScore} × ${m.awayScore}`
                : "×"}{" "}
              {label(m.awayId)}
            </p>
            {m.winnerId && m.stage === "FINAL" && (
              <p>🏆 {nationName(m.winnerId)}</p>
            )}
            {adm && m.status === "PENDING" && (
              <button className="btn btn-green" onClick={() => setEditing(m)}>
                LANÇAR SÚMULA
              </button>
            )}
          </div>
        ))}
      {editing && (
        <MatchReport
          key={editing.id}
          match={editing}
          teams={teams}
          players={players}
          busy={busy}
          onClose={() => setEditing(null)}
          onSave={(h, a, s, w) =>
            run(async () => {
              await api.finishMatch(db, user, editing.id, h, a, s, w);
              setEditing(null);
            }, "Súmula registrada. Estatísticas da seleção atualizadas.")
          }
        />
      )}
    </div>
  );
}
function MatchReport({ match, teams, players, busy, onClose, onSave }) {
  const [scores, setScores] = useState([0, 0]),
    [stats, setStats] = useState({}),
    [winner, setWinner] = useState("");
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
      >
        <h3>Súmula de seleções</h3>
        <p>
          Os 11 titulares salvos de cada seleção recebem uma partida e gastam 25
          de energia. Gols contra podem ficar sem autor.
        </p>
        {[match.homeId, match.awayId].map((id, i) => (
          <div key={id}>
            <h4>{label(id)}</h4>
            <input
              className="input-field"
              aria-label={`Gols ${id}`}
              type="number"
              min="0"
              max="99"
              value={scores[i]}
              onChange={(e) =>
                setScores(
                  scores.map((s, j) => (i === j ? Number(e.target.value) : s)),
                )
              }
            />
            {(teams.find((t) => t.id === id)?.lineup || []).map((pid) => (
              <div key={pid}>
                <small>
                  {players.find((p) => p.id === pid)?.name ||
                    "Jogador indisponível"}
                </small>
                <div style={{ display: "flex", gap: 8 }}>
                  {["goals", "assists"].map((key) => (
                    <label key={key}>
                      {key === "goals" ? "Gols" : "Assist."}
                      <input
                        className="input-field"
                        aria-label={`${pid} ${key}`}
                        type="number"
                        min="0"
                        value={stats[pid]?.[key] || 0}
                        onChange={(e) =>
                          setStats({
                            ...stats,
                            [pid]: {
                              ...stats[pid],
                              [key]: Number(e.target.value),
                            },
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        {match.stage === "FINAL" && scores[0] === scores[1] && (
          <select
            className="input-field"
            aria-label="Vencedor dos pênaltis"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
          >
            <option value="">Vencedor nos pênaltis</option>
            {[match.homeId, match.awayId].map((id) => (
              <option key={id} value={id}>
                {nationName(id)}
              </option>
            ))}
          </select>
        )}
        <button
          className="btn btn-green"
          disabled={busy}
          onClick={() => onSave(scores[0], scores[1], stats, winner || null)}
        >
          CONFIRMAR SÚMULA
        </button>
        <button className="btn btn-ghost" disabled={busy} onClick={onClose}>
          FECHAR
        </button>
      </div>
    </div>
  );
}
