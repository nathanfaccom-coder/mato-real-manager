import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";

export const TournamentManagerModal = ({
  tournaments,
  teams,
  awards,
  onClose,
}) => {
  const [tab, setTab] = useState("LIST");

  const [f, setF] = useState({
    name: "",
    format: "MATA-MATA",
    matchType: "IDA_VOLTA",
    trophyId: "",
    selectedTeams: [],
    prize: "",
    finalType: "UNICO",
    neutralFinal: true,
  });

  const [guest, setGuest] = useState({ name: "", logo: null });

  const teamAwards = awards.filter((a) => a.type === "TEAM");
  const activeTeams = teams.filter((t) => t.status === "ACTIVE");

  const toggleTeam = (id) => {
    if (f.selectedTeams.includes(id))
      setF({ ...f, selectedTeams: f.selectedTeams.filter((x) => x !== id) });
    else setF({ ...f, selectedTeams: [...f.selectedTeams, id] });
  };

  const addSerie = (serie) => {
    const sIds = activeTeams.filter((t) => t.serie === serie).map((t) => t.id);
    setF({ ...f, selectedTeams: [...new Set([...f.selectedTeams, ...sIds])] });
  };

  const handleGuestUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 150;
        let w = img.width,
          h = img.height;
        if (w > h) {
          if (w > MAX) {
            h *= MAX / w;
            w = MAX;
          }
        } else {
          if (h > MAX) {
            w *= MAX / h;
            h = MAX;
          }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        setGuest({ ...guest, logo: canvas.toDataURL("image/webp", 0.8) });
      };
    };
  };

  const createGuestTeam = async () => {
    if (!guest.name) return alert("Digite o nome do Time Convidado!");
    const docRef = await firebase.firestore().collection("teams").add({
      name: guest.name,
      logo: guest.logo,
      serie: "GUEST",
      status: "ACTIVE",
      balance: 0,
      stadiumLevel: 1,
    });
    setF({ ...f, selectedTeams: [...f.selectedTeams, docRef.id] });
    setGuest({ name: "", logo: null });
    alert("Time de Fora criado e adicionado à lista do Campeonato!");
  };

  const handleSave = async () => {
    if (!f.name) return alert("Falta o nome do Campeonato!");
    if (!f.trophyId) return alert("Selecione a Taça Oficial!");
    if (f.selectedTeams.length < 2) return alert("Mínimo de 2 times!");
    if (!f.prize || f.prize <= 0)
      return alert("Defina o prêmio base do Campeão!");

    await firebase
      .firestore()
      .collection("tournaments")
      .add({
        name: f.name,
        format: f.format,
        matchType: f.matchType,
        finalType: f.finalType,
        neutralFinal: f.neutralFinal,
        prize: parseFloat(f.prize),
        trophyId: f.trophyId,
        trophyImg: teamAwards.find((a) => a.id === f.trophyId)?.img || null,
        teams: f.selectedTeams,
        status: "ACTIVE",
        createdAt: Date.now(),
      });

    alert(
      "🎉 Campeonato Oficializado!\nO sistema fará a distribuição automática dos prêmios nas eliminações (Fase 3).",
    );
    setTab("LIST");
    setF({
      name: "",
      format: "MATA-MATA",
      matchType: "IDA_VOLTA",
      trophyId: "",
      selectedTeams: [],
      prize: "",
      finalType: "UNICO",
      neutralFinal: true,
    });
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }}>
      <div
        className="modal-content"
        style={{ maxWidth: "600px", border: "2px solid cyan" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <h3 style={{ color: "cyan", margin: 0 }}>
            🏆 Criador de Campeonatos
          </h3>
          <button
            className="btn btn-red"
            style={{ width: "auto", padding: "2px 8px" }}
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div style={{ display: "flex", gap: 5, marginBottom: 15 }}>
          <button
            className={`btn ${tab === "LIST" ? "btn-blue" : "btn-ghost"}`}
            onClick={() => setTab("LIST")}
          >
            TORNEIOS ATIVOS
          </button>
          <button
            className={`btn ${tab === "CREATE" ? "btn-green" : "btn-ghost"}`}
            onClick={() => setTab("CREATE")}
          >
            + FUNDAR NOVA COPA
          </button>
        </div>

        {tab === "CREATE" && (
          <div
            className="animate-in"
            style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: 5 }}
          >
            <label>Nome da Competição</label>
            <input
              className="input-field"
              placeholder="Ex: Copa do Brasil, Champions League..."
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <div>
                <label>Estilo do Torneio</label>
                <select
                  className="input-field"
                  value={f.format}
                  onChange={(e) => setF({ ...f, format: e.target.value })}
                >
                  <option value="MATA-MATA">⚔️ Mata-Mata</option>
                  <option value="PONTOS_CORRIDOS">📊 Pontos Corridos</option>
                  <option value="GRUPOS_MATA">🔀 Grupos + Mata-Mata</option>
                </select>
              </div>
              <div>
                <label>Jogos (Fases Normais)</label>
                <select
                  className="input-field"
                  value={f.matchType}
                  onChange={(e) => setF({ ...f, matchType: e.target.value })}
                >
                  <option value="IDA_VOLTA">🔁 Ida e Volta</option>
                  <option value="IDA">⏭️ Só Ida (Jogo Único)</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 5,
              }}
            >
              <div>
                <label style={{ color: "gold" }}>Formato da Grande Final</label>
                <select
                  className="input-field"
                  value={f.finalType}
                  onChange={(e) => setF({ ...f, finalType: e.target.value })}
                  style={{ borderColor: "gold" }}
                >
                  <option value="UNICO">🏟️ Jogo Único</option>
                  <option value="IDA_VOLTA">🔁 Ida e Volta</option>
                </select>
              </div>
              <div>
                <label style={{ color: "gold" }}>Local da Final</label>
                <select
                  className="input-field"
                  value={f.neutralFinal}
                  onChange={(e) =>
                    setF({ ...f, neutralFinal: e.target.value === "true" })
                  }
                  disabled={f.finalType === "IDA_VOLTA"}
                  style={{
                    borderColor: "gold",
                    opacity: f.finalType === "IDA_VOLTA" ? 0.5 : 1,
                  }}
                >
                  <option value="true">🏳️ Campo Neutro</option>
                  <option value="false">🏠 Sorteio de Mandante</option>
                </select>
              </div>
            </div>

            <div
              style={{
                background: "rgba(0, 230, 118, 0.1)",
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
                marginBottom: 10,
                border: "1px solid var(--primary)",
              }}
            >
              <label style={{ color: "var(--primary)", fontWeight: "bold" }}>
                💰 Prêmio Base do Campeão (₣)
              </label>
              <MoneyInput
                className="input-field"

                placeholder="Ex: 100.000"
                value={f.prize}
                onChange={(e) => setF({ ...f, prize: e.target.value })}
                style={{ marginBottom: 5 }}
              />
            </div>

            <label>Taça Oficial (Criada na Central de Gala)</label>
            <select
              className="input-field"
              value={f.trophyId}
              onChange={(e) => setF({ ...f, trophyId: e.target.value })}
            >
              <option value="">-- Selecione o Troféu --</option>
              {teamAwards.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            {/* FÁBRICA DE TIMES CONVIDADOS */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
                border: "1px dashed #666",
              }}
            >
              <label style={{ color: "gold", fontSize: 11 }}>
                🌍 Adicionar Time de Fora / Convidado
              </label>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <label
                  className="btn btn-ghost"
                  style={{
                    width: "50px",
                    height: "50px",
                    padding: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    margin: 0,
                  }}
                >
                  {guest.logo ? (
                    <img
                      src={guest.logo}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 20 }}>📷</span>
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleGuestUpload}
                  />
                </label>
                <input
                  className="input-field"
                  placeholder="Nome do Convidado"
                  value={guest.name}
                  onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                  style={{ marginBottom: 0, flex: 1 }}
                />
                <button
                  className="btn btn-gold"
                  style={{ width: "auto", marginBottom: 0, padding: "0 15px" }}
                  onClick={createGuestTeam}
                >
                  +
                </button>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <label style={{ color: "cyan" }}>
                Times Participantes ({f.selectedTeams.length})
              </label>

              <div
                style={{
                  display: "flex",
                  gap: 5,
                  overflowX: "auto",
                  marginBottom: 10,
                  paddingBottom: 5,
                }}
              >
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 9, padding: "5px" }}
                  onClick={() => addSerie("A")}
                >
                  + SÉRIE A
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 9, padding: "5px" }}
                  onClick={() => addSerie("B")}
                >
                  + SÉRIE B
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 9, padding: "5px" }}
                  onClick={() => addSerie("C")}
                >
                  + SÉRIE C
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: 9, padding: "5px" }}
                  onClick={() => addSerie("D")}
                >
                  + SÉRIE D
                </button>
                <button
                  className="btn btn-ghost"
                  style={{
                    fontSize: 9,
                    padding: "5px",
                    color: "gold",
                    borderColor: "gold",
                  }}
                  onClick={() => addSerie("VARZEA")}
                >
                  + VÁRZEA
                </button>
                <button
                  className="btn btn-ghost"
                  style={{
                    fontSize: 9,
                    padding: "5px",
                    color: "cyan",
                    borderColor: "cyan",
                  }}
                  onClick={() => addSerie("GUEST")}
                >
                  + CONVIDADOS
                </button>
                <button
                  className="btn btn-red"
                  style={{ fontSize: 9, padding: "5px" }}
                  onClick={() => setF({ ...f, selectedTeams: [] })}
                >
                  LIMPAR
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 5,
                  maxHeight: "180px",
                  overflowY: "auto",
                }}
              >
                {activeTeams.map((t) => (
                  <label
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      background: "#111",
                      padding: 5,
                      borderRadius: 4,
                      cursor: "pointer",
                      border: f.selectedTeams.includes(t.id)
                        ? "1px solid cyan"
                        : "1px solid #333",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={f.selectedTeams.includes(t.id)}
                      onChange={() => toggleTeam(t.id)}
                    />
                    {t.logo ? (
                      <img
                        src={t.logo}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 10 }}>🛡️</span>
                    )}
                    <span
                      style={{
                        fontSize: 11,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {t.name}{" "}
                      <small style={{ color: "#888" }}>({t.serie})</small>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className="btn btn-green"
              style={{ marginTop: 15, padding: 15, fontSize: 14 }}
              onClick={handleSave}
            >
              🚀 INAUGURAR CAMPEONATO
            </button>
          </div>
        )}

        {tab === "LIST" && (
          <div
            className="animate-in"
            style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 5 }}
          >
            {tournaments.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                Nenhuma copa ou liga extra foi criada ainda.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {tournaments.map((t) => (
                  <div
                    key={t.id}
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderLeft: "4px solid cyan",
                    }}
                  >
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      {t.trophyImg ? (
                        <img
                          src={t.trophyImg}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                            filter: "drop-shadow(0 0 5px rgba(0,255,255,0.4))",
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: 30 }}>🏆</div>
                      )}
                      <div>
                        <b style={{ fontSize: 15 }}>{t.name}</b>
                        <div style={{ fontSize: 10, color: "#aaa" }}>
                          Fases:{" "}
                          {t.matchType === "IDA" ? "Jogo Único" : "Ida e Volta"}
                          <br />
                          Final:{" "}
                          <span style={{ color: "gold" }}>
                            {t.finalType === "UNICO"
                              ? "Jogo Único"
                              : "Ida e Volta"}{" "}
                            {t.finalType === "UNICO" && t.neutralFinal
                              ? "(Neutro)"
                              : ""}
                          </span>
                          <br />
                          Prêmio Maior:{" "}
                          <span style={{ color: "lime" }}>{fmt(t.prize)}</span>
                        </div>
                        <div
                          style={{ fontSize: 11, color: "cyan", marginTop: 2 }}
                        >
                          <b>{(t.teams || []).length} Clubes Participantes</b>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-red"
                      style={{ width: "auto", padding: "10px" }}
                      onClick={async () => {
                        if (
                          confirm(
                            `Excluir a ${t.name} permanentemente do sistema?`,
                          )
                        )
                          await firebase
                            .firestore()
                            .collection("tournaments")
                            .doc(t.id)
                            .delete();
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
