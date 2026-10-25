import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";

export const PrizeEditor = ({ initialData, onSave, onClose }) => {
  const [prizes, setPrizes] = useState(initialData);

  const updateVal = (serie, field, val) => {
    setPrizes((prev) => ({
      ...prev,
      [serie]: { ...prev[serie], [field]: parseFloat(val) || 0 },
    }));
  };

  const renderInputs = (serie, title, fields) => (
    <div
      style={{
        marginBottom: 15,
        background: "rgba(255,255,255,0.05)",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #333",
      }}
    >
      <h4 style={{ color: "gold", marginTop: 0 }}>{title}</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {fields.map((f) => (
          <div key={f.key}>
            <label style={{ fontSize: 10 }}>{f.label}</label>
            <MoneyInput
              className="input-field"

              value={prizes[serie][f.key]}
              onChange={(e) => updateVal(serie, f.key, e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="modal-bg">
      <div
        className="modal-content"
        style={{
          maxHeight: "85vh",
          overflowY: "auto",
          border: "2px solid gold",
        }}
      >
        <h3 style={{ color: "gold", marginTop: 0 }}>
          💰 Configurar Premiações Finais
        </h3>
        <p style={{ fontSize: 11, color: "#aaa", marginBottom: 15 }}>
          Estes valores serão pagos automaticamente aos clubes quando a
          temporada for encerrada.
        </p>

        {renderInputs("A", "Série A (Elite)", [
          { key: "champ", label: "Campeão" },
          { key: "vice", label: "Vice" },
          { key: "third", label: "3º Lugar" },
          { key: "mid", label: "Meio Tabela" },
          { key: "rel", label: "Rebaixados" },
        ])}
        {renderInputs("B", "Série B", [
          { key: "champ", label: "Campeão" },
          { key: "vice", label: "Vice" },
          { key: "mid", label: "Meio Tabela" },
          { key: "rel", label: "Rebaixados" },
        ])}
        {renderInputs("C", "Série C", [
          { key: "champ", label: "Campeão" },
          { key: "vice", label: "Vice" },
          { key: "mid", label: "Meio Tabela" },
          { key: "rel", label: "Rebaixados" },
        ])}
        {renderInputs("D", "Série D", [
          { key: "champ", label: "Campeão" },
          { key: "vice", label: "Vice" },
          { key: "mid", label: "Meio Tabela" },
          { key: "rel", label: "Rebaixados" },
        ])}
        {renderInputs("VARZEA", "O Terrão (Várzea)", [
          { key: "champ", label: "Campeão" },
          { key: "vice", label: "Vice" },
          { key: "third", label: "3º Lugar" },
          { key: "mid", label: "Demais (Meio)" },
        ])}

        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button className="btn btn-green" onClick={() => onSave(prizes)}>
            SALVAR VALORES
          </button>
          <button className="btn btn-red" onClick={onClose}>
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};
