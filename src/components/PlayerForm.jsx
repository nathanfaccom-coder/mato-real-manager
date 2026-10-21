import React, { useState, useEffect } from "react";
import { getSalaryLimits } from "../game/getSalaryLimits.js";
import { fmt } from "../game/fmt.js";
import { generateAttributes } from "../game/generateAttributes.js";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";

export const PlayerForm = ({
  initial,
  onSave,
  onDelete,
  isAdmin,
  teams,
  onRenew,
  isOwner,
}) => {
  // 1. Definição dos dados padrão
  const defaultState = {
    name: "",
    position: "ATA",
    overall: 45,
    value: "",
    salary: "",
    clause: "",
    contract: "",
    mood: "😐",
    status: "NAO_A_VENDA",
    password: "",
    balance: 0,
    rating: "",
    stats: { goals: 0, assists: 0, tackles: 0, saves: 0, yellows: 0, reds: 0 },
    attributes: null,
  };

  const [f, setF] = useState({ ...defaultState, ...(initial || {}) });
  const isEditing = f.id ? true : false;

  // Calcula limites em tempo real baseado no Overall digitado
  const limits = getSalaryLimits(f.overall);

  const calculateRealOverall = (position, attrs) => {
    let sum = 0;
    let count = 0;
    const safePos = position || "ATA";
    const ignoreList =
      safePos === "GOL"
        ? [
            "shot",
            "attack",
            "dribble",
            "curve",
            "freeKick",
            "weakFootAcc",
            "weakFootFreq",
          ]
        : ["gk"];
    Object.entries(attrs).forEach(([key, val]) => {
      if (!ignoreList.includes(key)) {
        sum += val;
        count++;
      }
    });
    return count === 0 ? 0 : Math.round(sum / count);
  };

  const handleSave = () => {
    try {
      const dataToSave = { ...f };
      const safePos = dataToSave.position || "ATA";
      const ovr = parseInt(dataToSave.overall) || 50;

      // --- CORREÇÃO CRÍTICA: CONVERSÃO DE TIPOS ---
      // Isso impede que o saldo vire texto e cause o bug do negativo
      dataToSave.salary = parseFloat(dataToSave.salary) || 0;
      dataToSave.balance = parseFloat(dataToSave.balance) || 0; // <--- AQUI ESTAVA O PROBLEMA
      dataToSave.value = parseFloat(dataToSave.value) || 0;
      dataToSave.clause = parseFloat(dataToSave.clause) || 0;
      dataToSave.contract = parseInt(dataToSave.contract) || 0;

      // Trava de Salário (Lei do Teto)
      if (
        dataToSave.salary < limits.minSal ||
        dataToSave.salary > limits.maxSal
      ) {
        return alert(
          `🚫 SALÁRIO IRREGULAR!\n\nCategoria: ${limits.label} (Over ${ovr})\nPermitido: ${fmt(limits.minSal)} - ${fmt(limits.maxSal)}\nTentativa: ${fmt(dataToSave.salary)}`,
        );
      }

      if (
        !dataToSave.attributes ||
        Object.keys(dataToSave.attributes).length === 0
      ) {
        const targetOv = parseInt(dataToSave.overall) || 60;
        const newAttrs = generateAttributes(safePos, targetOv);
        const realAvg = calculateRealOverall(safePos, newAttrs);

        dataToSave.attributes = newAttrs;
        dataToSave.overall = realAvg;
        dataToSave.position = safePos;
        alert(`Atributos gerados!\nOverall Real: ${realAvg}`);
      }

      onSave(dataToSave);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar: " + error.message);
    }
  };

  return (
    <div className="modal-bg">
      <div
        className="modal-content"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* SE FOR APENAS O DONO DO TIME (NÃO ADMIN), MOSTRA O PAINEL RESUMIDO DE MERCADO */}
        {!isAdmin && isOwner ? (
          <div>
            <h3 style={{ color: "var(--primary)" }}>
              🏷️ Gerenciar Mercado: {f.name}
            </h3>
            <p style={{ fontSize: 11, color: "#aaa", marginBottom: 15 }}>
              Altere o status do jogador e o valor exigido para compra.
            </p>

            <label>Status no Mercado</label>
            <select
              className="input-field"
              value={f.status}
              onChange={(e) => setF({ ...f, status: e.target.value })}
            >
              <option value="NAO_A_VENDA">🔒 Não Listado (Privado)</option>
              <option value="VENDA">🛒 À Venda</option>
              <option value="EMPRESTIMO">🤝 Disponível para Empréstimo</option>
            </select>

            <label>Valor Exigido (₣)</label>
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 5 }}>
              Valor Justo (Federação):{" "}
              <b style={{ color: "#00E676" }}>
                {fmt(getRecommendedPrice(f.overall, f.position))}
              </b>
            </div>
            <input
              className="input-field"
              type="number"
              value={f.value}
              onChange={(e) => setF({ ...f, value: e.target.value })}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
              <button className="btn btn-green" onClick={handleSave}>
                SALVAR NO MERCADO
              </button>
              <button className="btn btn-ghost" onClick={() => setF(null)}>
                CANCELAR
              </button>
            </div>
          </div>
        ) : (
          /* SE CAIR AQUI POR ENGANO, FECHA (Admin já usa o AdminPlayerModal) */
          <div style={{ textAlign: "center" }}>
            <p>Use o Painel de Administração para editar jogadores.</p>
            <button className="btn btn-ghost" onClick={() => setF(null)}>
              FECHAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
