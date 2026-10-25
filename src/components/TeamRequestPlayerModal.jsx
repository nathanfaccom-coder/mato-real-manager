import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";
import { getSalaryLimits } from "../game/getSalaryLimits.js";
import { getRecommendedPrice } from "../game/getRecommendedPrice.js";
import { fmt } from "../game/fmt.js";
import { POS } from "../game/POS.js";

export const TeamRequestPlayerModal = ({ team, onClose, onSubmit }) => {
  const [f, setF] = useState({
    name: "",
    instagram: "",
    position: "ATA",
    overall: 45,
    password: "",
    contract: 1,
    salary: 1500,
    value: 40000,
    mood: "😐",
    status: "NAO_A_VENDA",
  });

  const limits = getSalaryLimits(f.overall);
  const recPrice = getRecommendedPrice(f.overall, f.position);

  const handleSubmit = () => {
    if (!f.name || !f.instagram || !f.password)
      return alert("Preencha Nome, Instagram e Senha!");

    const payload = {
      ...f,
      overall: parseInt(f.overall) || 45,
      salary: parseFloat(f.salary) || 0,
      value: parseFloat(f.value) || 0,
      contract: parseInt(f.contract) || 1,
      teamId: team.id, // Amarra o jogador ao time que pediu
    };

    if (payload.salary < limits.minSal || payload.salary > limits.maxSal) {
      return alert(
        `Salário fora do teto da Federação!\nPermitido para Over ${payload.overall}: ${fmt(limits.minSal)} até ${fmt(limits.maxSal)}`,
      );
    }

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }}>
      <div
        className="modal-content animate-in"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          border: "2px solid cyan",
        }}
      >
        <h3 style={{ color: "cyan", marginTop: 0 }}>
          📝 Inscrever Novo Atleta
        </h3>
        <p style={{ fontSize: 11, color: "#aaa", marginBottom: 15 }}>
          Preencha os dados reais do jogador. O perfil irá para análise da
          Federação antes de ser liberado no seu elenco.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <div>
            <label>Nome no Jogo</label>
            <input
              className="input-field"
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
              placeholder="Ex: João Silva"
            />
          </div>
          <div>
            <label>@ Instagram (Real)</label>
            <input
              className="input-field"
              value={f.instagram}
              onChange={(e) => setF({ ...f, instagram: e.target.value })}
              placeholder="@joaosilva"
            />
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <div>
            <label>Posição</label>
            <select
              className="input-field"
              value={f.position}
              onChange={(e) => setF({ ...f, position: e.target.value })}
            >
              {POS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Overall Solicitado</label>
            <input
              className="input-field"
              type="number"
              min="0"
              max="99"
              value={f.overall}
              onChange={(e) => setF({ ...f, overall: e.target.value })}
            />
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <label style={{ color: "gold", fontSize: 11 }}>
            Senha de Acesso do Jogador
          </label>
          <input
            className="input-field"
            type="text"
            style={{ marginBottom: 0 }}
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            placeholder="Crie uma senha inicial"
          />
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <div>
            <label>Salário Semanal (₣)</label>
            <div style={{ fontSize: 9, color: "cyan", marginBottom: 5 }}>
              Permitido: {fmt(limits.minSal)} a {fmt(limits.maxSal)}
            </div>
            <MoneyInput
              className="input-field"

              value={f.salary}
              onChange={(e) => setF({ ...f, salary: e.target.value })}
            />
          </div>
          <div>
            <label>Valor de Mercado (₣)</label>
            <div style={{ fontSize: 9, color: "cyan", marginBottom: 5 }}>
              Sugerido: {fmt(recPrice)}
            </div>
            <MoneyInput
              className="input-field"

              value={f.value}
              onChange={(e) => setF({ ...f, value: e.target.value })}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <div>
            <label>Contrato (Anos)</label>
            <input
              className="input-field"
              type="number"
              value={f.contract}
              onChange={(e) => setF({ ...f, contract: e.target.value })}
            />
          </div>
          <div>
            <label>Humor</label>
            <select
              className="input-field"
              value={f.mood}
              onChange={(e) => setF({ ...f, mood: e.target.value })}
            >
              <option>🤩</option>
              <option>😐</option>
              <option>😡</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              className="input-field"
              value={f.status}
              onChange={(e) => setF({ ...f, status: e.target.value })}
            >
              <option value="NAO_A_VENDA">Privado</option>
              <option value="VENDA">À Venda</option>
              <option value="EMPRESTIMO">Empréstimo</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button className="btn btn-green" onClick={handleSubmit}>
            ENVIAR PARA APROVAÇÃO
          </button>
          <button className="btn btn-red" onClick={onClose}>
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};
