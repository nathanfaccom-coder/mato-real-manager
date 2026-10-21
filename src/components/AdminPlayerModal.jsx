import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { generateAttributes } from "../game/generateAttributes.js";
import { POS } from "../game/POS.js";

export const AdminPlayerModal = ({ player, teams, onClose }) => {
  const isNew = !player || !player.id;
  const [formData, setFormData] = useState({
    name: player?.name || "",
    position: player?.position || "ATA",
    teamId: player?.teamId || "FREE",
    overall: player?.overall || 45,
    energy: player?.energy !== undefined ? player.energy : 100,
    fame: player?.fame || 0,
    xp: player?.xp || 0,
    value: player?.value || 0,
    salary: player?.salary || 1500,
    password: player?.password || "",
    balance: player?.balance || 0,
    clause: player?.clause || 0,
    contract: player?.contract || 0,
    status: player?.status || "NAO_A_VENDA",
    mood: player?.mood || "😐",
    rating: player?.rating || "",
    stats: player?.stats || {
      goals: 0,
      assists: 0,
      tackles: 0,
      saves: 0,
      yellows: 0,
      reds: 0,
    },
  });

  const handleSave = async () => {
    if (!formData.name) return alert("O nome é obrigatório!");
    const db = firebase.firestore();
    try {
      const payload = { ...formData };
      // Conversões de segurança (Anti-Bug de Texto)
      payload.salary = parseFloat(payload.salary) || 0;
      payload.value = parseFloat(payload.value) || 0;
      payload.balance = parseFloat(payload.balance) || 0;
      payload.clause = parseFloat(payload.clause) || 0;
      payload.contract = parseInt(payload.contract) || 0;
      payload.overall = parseInt(payload.overall) || 45;

      if (isNew) {
        payload.attributes = generateAttributes(
          payload.position,
          payload.overall,
        );
        await db.collection("players").add(payload);
        alert("Jogador criado com sucesso!");
        onClose(); // Só fecha se for criação nova
      } else {
        await db.collection("players").doc(player.id).update(payload);
        alert("Dados atualizados com sucesso!");
        // Removemos o onClose() daqui! A janela continuará aberta para facilitar edições seguidas.
      }
    } catch (e) {
      alert("Erro ao salvar: " + e.message);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: "550px",
          padding: "20px",
          background: "#121212",
          border: "1px solid var(--primary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, color: "var(--primary)" }}>
          {isNew ? "✨ Criar Novo Jogador" : `✏️ Editando: ${player.name}`}
        </h3>

        <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: 5 }}>
          {/* INFO BÁSICA */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <label style={{ fontSize: 11, color: "#aaa" }}>Nome</label>
              <input
                className="input-field"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#aaa" }}>Posição</label>
              <select
                className="input-field"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              >
                {POS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <label style={{ fontSize: 11, color: "#aaa" }}>Clube</label>
              <select
                className="input-field"
                value={formData.teamId}
                onChange={(e) =>
                  setFormData({ ...formData, teamId: e.target.value })
                }
              >
                <option value="FREE">Agente Livre (Sem Clube)</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#aaa" }}>
                Overall Base
              </label>
              <input
                className="input-field"
                type="number"
                value={formData.overall}
                onChange={(e) =>
                  setFormData({ ...formData, overall: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              border: "1px solid #444",
            }}
          >
            <label style={{ color: "var(--secondary)", fontSize: 11 }}>
              🔐 Senha de Acesso
            </label>
            <input
              className="input-field"
              type="text"
              placeholder="Senha do Jogador"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              style={{ marginBottom: 0 }}
            />
          </div>

          {/* FINANÇAS E CONTRATO */}
          <div
            style={{
              border: "1px solid var(--primary)",
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
              background: "rgba(0,255,0,0.02)",
            }}
          >
            <h4
              style={{
                marginTop: 0,
                color: "var(--primary)",
                marginBottom: 10,
              }}
            >
              💼 Contrato & Finanças
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div>
                <label style={{ fontSize: 10 }}>💰 Saldo em Conta</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.balance}
                  onChange={(e) =>
                    setFormData({ ...formData, balance: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={{ fontSize: 10 }}>💵 Salário Semanal</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={{ fontSize: 10 }}>🏷️ Valor de Passe</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={{ fontSize: 10 }}>🔒 Multa Rescisória</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.clause}
                  onChange={(e) =>
                    setFormData({ ...formData, clause: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={{ fontSize: 10 }}>📅 Anos de Contrato</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.contract}
                  onChange={(e) =>
                    setFormData({ ...formData, contract: e.target.value })
                  }
                  style={{ marginBottom: 0 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 10 }}>Status no Mercado</label>
                <select
                  className="input-field"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  style={{ marginBottom: 0 }}
                >
                  <option value="NAO_A_VENDA">Não Listado</option>
                  <option value="VENDA">À Venda</option>
                  <option value="EMPRESTIMO">Empréstimo</option>
                  <option value="INTRANSFERIVEL">Bloqueado</option>
                </select>
              </div>
            </div>
          </div>

          {/* ESTATÍSTICAS E NOTA */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 15,
            }}
          >
            <div>
              <label style={{ fontSize: 10 }}>Humor</label>
              <select
                className="input-field"
                value={formData.mood}
                onChange={(e) =>
                  setFormData({ ...formData, mood: e.target.value })
                }
              >
                <option>🤩</option>
                <option>😐</option>
                <option>😡</option>
              </select>
            </div>
            <div>
              {" "}
              <label style={{ fontSize: 10, color: "var(--purple)" }}>
                Nota Oficial da Federação
              </label>{" "}
              <div style={{ fontSize: 9, color: "#888", marginBottom: 4 }}>
                Média dos Jornalistas:{" "}
                <b style={{ color: "cyan" }}>
                  {player?.pressRatingAvg
                    ? player.pressRatingAvg.toFixed(1)
                    : "Sem avaliações"}
                </b>
              </div>{" "}
              <input
                className="input-field"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              />{" "}
            </div>
          </div>

          {/* XP, ENERGIA E FAMA */}
          <div
            style={{
              background: "rgba(255,165,0,0.1)",
              borderLeft: "4px solid orange",
              padding: 10,
              borderRadius: 5,
              marginBottom: 15,
            }}
          >
            <b style={{ color: "orange", fontSize: 12 }}>
              ⚠️ Módulo Físico e Mídia
            </b>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 5,
                marginTop: 10,
              }}
            >
              <div>
                <label style={{ fontSize: 10, color: "orange" }}>
                  XP Atual
                </label>
                <input
                  className="input-field"
                  type="number"
                  style={{ borderColor: "orange", padding: "8px" }}
                  value={formData.xp}
                  onChange={(e) =>
                    setFormData({ ...formData, xp: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label style={{ fontSize: 10, color: "lime" }}>
                  ⚡ Energia
                </label>
                <input
                  className="input-field"
                  type="number"
                  min="0"
                  max="100"
                  style={{ borderColor: "lime", padding: "8px" }}
                  value={formData.energy}
                  onChange={(e) =>
                    setFormData({ ...formData, energy: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label style={{ fontSize: 10, color: "cyan" }}>💎 Fama</label>
                <input
                  className="input-field"
                  type="number"
                  style={{ borderColor: "cyan", padding: "8px" }}
                  value={formData.fame}
                  onChange={(e) =>
                    setFormData({ ...formData, fame: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          {/* ESTATÍSTICAS EM CAMPO */}
          <div
            style={{
              border: "1px solid #444",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <label
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 10,
                display: "block",
              }}
            >
              📊 Estatísticas de Jogo
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              <div>
                <small style={{ color: "#aaa" }}>⚽ Gols</small>
                <input
                  className="input-field"
                  type="number"
                  value={formData.stats.goals}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        goals: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  style={{ padding: "6px" }}
                />
              </div>
              <div>
                <small style={{ color: "#aaa" }}>👟 Assis</small>
                <input
                  className="input-field"
                  type="number"
                  value={formData.stats.assists}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        assists: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  style={{ padding: "6px" }}
                />
              </div>
              <div>
                <small style={{ color: "#aaa" }}>🛡️ Desar</small>
                <input
                  className="input-field"
                  type="number"
                  value={formData.stats.tackles}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        tackles: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  style={{ padding: "6px" }}
                />
              </div>
              <div>
                <small style={{ color: "#aaa" }}>🧤 Defes</small>
                <input
                  className="input-field"
                  type="number"
                  value={formData.stats.saves}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        saves: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  style={{ padding: "6px" }}
                />
              </div>
              <div>
                <small style={{ color: "yellow" }}>🟨 Amar</small>
                <input
                  className="input-field"
                  type="number"
                  value={formData.stats.yellows}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        yellows: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  style={{ padding: "6px" }}
                />
              </div>
              <div>
                <small style={{ color: "red" }}>🟥 Verm</small>
                <input
                  className="input-field"
                  type="number"
                  value={formData.stats.reds}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        reds: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  style={{ padding: "6px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button className="btn btn-green" onClick={handleSave}>
            💾 SALVAR DADOS
          </button>
          {isNew ? null : (
            <button
              className="btn btn-red"
              onClick={() => {
                if (confirm("Excluir " + player.name + " permanentemente?")) {
                  firebase
                    .firestore()
                    .collection("players")
                    .doc(player.id)
                    .delete();
                  onClose();
                }
              }}
            >
              🗑️ EXCLUIR
            </button>
          )}
          <button className="btn btn-ghost" onClick={onClose}>
            {isNew ? "CANCELAR" : "FECHAR JANELA"}
          </button>
        </div>
      </div>
    </div>
  );
};
