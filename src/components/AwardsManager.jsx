import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";

export const AwardsManager = ({ awards, teams, players, coaches, onClose }) => {
  const [tab, setTab] = useState("LIST");
  const [newA, setNewA] = useState({
    name: "",
    desc: "",
    type: "PLAYER",
    img: null,
  });
  const [awardToGive, setAwardToGive] = useState(null);
  const [targetId, setTargetId] = useState("");
  const [tournName, setTournName] = useState("");

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 150; // Compressor pesado para não pesar o banco
        let w = img.width,
          h = img.height;
        if (w > h) {
          if (w > MAX_SIZE) {
            h *= MAX_SIZE / w;
            w = MAX_SIZE;
          }
        } else {
          if (h > MAX_SIZE) {
            w *= MAX_SIZE / h;
            h = MAX_SIZE;
          }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        setNewA({ ...newA, img: canvas.toDataURL("image/webp", 0.6) });
      };
    };
  };

  const handleCreateAward = async () => {
    if (!newA.name || !newA.img)
      return alert("Preencha nome e adicione uma imagem!");
    await firebase.firestore().collection("awards").add(newA);
    alert("Troféu/Prêmio criado na estante da Federação!");
    setTab("LIST");
    setNewA({ name: "", desc: "", type: "PLAYER", img: null });
  };

  const handleGiveAward = async () => {
    if (!targetId) return alert("Selecione quem vai receber o prêmio!");

    const payload = {
      awardId: awardToGive.id,
      name: awardToGive.name,
      desc: awardToGive.desc,
      img: awardToGive.img,
      tournament: tournName || "Premiação de Gala",
      date: Date.now(),
    };

    const col =
      awardToGive.type === "TEAM"
        ? "teams"
        : awardToGive.type === "PLAYER"
          ? "players"
          : "users";

    await firebase
      .firestore()
      .collection(col)
      .doc(targetId)
      .update({
        trophies: firebase.firestore.FieldValue.arrayUnion(payload),
      });

    alert(
      "🏆 Prêmio entregue com sucesso! Já está na Sala de Troféus do vencedor.",
    );
    setAwardToGive(null);
    setTargetId("");
    setTournName("");
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }}>
      <div
        className="modal-content"
        style={{ border: "2px solid gold", maxWidth: "500px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <h3 style={{ color: "gold", margin: 0 }}>🏆 Central de Premiações</h3>
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
            className={`btn ${tab === "LIST" ? "btn-gold" : "btn-ghost"}`}
            onClick={() => setTab("LIST")}
          >
            ESTANTE
          </button>
          <button
            className={`btn ${tab === "CREATE" ? "btn-blue" : "btn-ghost"}`}
            onClick={() => setTab("CREATE")}
          >
            + CRIAR TAÇA/MEDALHA
          </button>
        </div>

        {tab === "CREATE" && (
          <div className="animate-in">
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              {newA.img ? (
                <img
                  src={newA.img}
                  style={{ width: 80, height: 80, objectFit: "contain" }}
                />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "#222",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                >
                  📷
                </div>
              )}
              <label
                className="btn btn-ghost"
                style={{
                  display: "block",
                  width: "fit-content",
                  margin: "10px auto",
                  fontSize: 10,
                }}
              >
                UPLOAD DA IMAGEM
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImgUpload}
                />
              </label>
            </div>
            <input
              className="input-field"
              placeholder="Nome (Ex: Bola de Ouro, Taça Libertadores)"
              value={newA.name}
              onChange={(e) => setNewA({ ...newA, name: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="Descrição Opcional"
              value={newA.desc}
              onChange={(e) => setNewA({ ...newA, desc: e.target.value })}
            />
            <label style={{ fontSize: 10, color: "#aaa" }}>
              Quem pode receber?
            </label>
            <select
              className="input-field"
              value={newA.type}
              onChange={(e) => setNewA({ ...newA, type: e.target.value })}
            >
              <option value="TEAM">Clubes</option>
              <option value="PLAYER">Jogadores</option>
              <option value="COACH">Técnicos</option>
            </select>
            <button className="btn btn-green" onClick={handleCreateAward}>
              SALVAR PRÊMIO NO SISTEMA
            </button>
          </div>
        )}

        {tab === "LIST" && (
          <div className="animate-in">
            {awardToGive ? (
              <div
                className="card"
                style={{ border: "1px solid var(--primary)" }}
              >
                <h4 style={{ marginTop: 0, color: "var(--primary)" }}>
                  Entregar: {awardToGive.name}
                </h4>
                <input
                  className="input-field"
                  placeholder="Nome do Campeonato/Evento (Ex: Série A 2026)"
                  value={tournName}
                  onChange={(e) => setTournName(e.target.value)}
                />
                <select
                  className="input-field"
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                >
                  <option value="">-- Selecione o Vencedor --</option>
                  {awardToGive.type === "TEAM" &&
                    teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  {awardToGive.type === "PLAYER" &&
                    players.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (
                        {teams.find((x) => x.id === p.teamId)?.name || "Livre"})
                      </option>
                    ))}
                  {awardToGive.type === "COACH" &&
                    coaches.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  <button className="btn btn-green" onClick={handleGiveAward}>
                    ENTREGAR 🏆
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => setAwardToGive(null)}
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  maxHeight: "350px",
                  overflowY: "auto",
                }}
              >
                {awards.map((a) => (
                  <div
                    key={a.id}
                    className="card"
                    style={{ textAlign: "center", padding: 10 }}
                  >
                    <img
                      src={a.img}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                        marginBottom: 5,
                      }}
                    />
                    <div style={{ fontWeight: "bold", fontSize: 11 }}>
                      {a.name}
                    </div>
                    <div
                      style={{ fontSize: 9, color: "#888", margin: "5px 0" }}
                    >
                      {a.type === "TEAM"
                        ? "Para Clubes"
                        : a.type === "PLAYER"
                          ? "Para Jogadores"
                          : "Para Técnicos"}
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button
                        className="btn btn-gold"
                        style={{ fontSize: 9, padding: "5px" }}
                        onClick={() => setAwardToGive(a)}
                      >
                        PREMIAR ALGUÉM
                      </button>
                      <button
                        className="btn btn-red"
                        style={{ fontSize: 9, padding: "5px", width: "30px" }}
                        onClick={async () => {
                          if (confirm("Apagar molde do prêmio?"))
                            await firebase
                              .firestore()
                              .collection("awards")
                              .doc(a.id)
                              .delete();
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
                {awards.length === 0 && (
                  <p
                    style={{
                      gridColumn: "span 2",
                      textAlign: "center",
                      color: "#666",
                      fontSize: 11,
                    }}
                  >
                    Nenhum prêmio criado ainda.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
