import { promptMoney } from '../money/promptMoney.jsx';
import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";
import { SERIES } from "../game/SERIES.js";
import { ESTADOS } from "../game/ESTADOS.js";

export const SettingsForm = ({
  team,
  isAdmin,
  onUp,
  onUpgrade,
  onReq,
  onWithdraw,
}) => {
  const [form, setF] = useState({
    name: team.name,
    logo: team.logo,
    balance: team.balance,
    serie: team.serie,
    estado: team.estado || "",
  });

  useEffect(() => {
    setF({
      name: team.name,
      logo: team.logo,
      balance: team.balance,
      serie: team.serie,
      estado: team.estado || "",
    });
  }, [team]);

  // --- FUNÇÃO PARA UPLOAD E COMPRESSÃO DO LOGO (NOVO!) ---
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        // Cria um Canvas para redimensionar (Compressão)
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Define tamanho máximo para logo (200px é suficiente e leve)
        const MAX_SIZE = 200;
        let width = img.width;
        let height = img.height;

        // Redimensiona mantendo a proporção
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenha a imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Converte para Texto Base64 leve (JPEG qualidade 0.8)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

        // Atualiza o estado do formulário imediatamente com a nova imagem
        setF({ ...form, logo: dataUrl });
      };
    };
  };

  return (
    <div>
      <h3>Configurações do Time</h3>
      <label>Nome do Clube</label>
      <input
        className="input-field"
        value={form.name}
        onChange={(e) => setF({ ...form, name: e.target.value })}
      />

      <label>Escudo / Logo</label>
      {/* --- ÁREA DE PRÉ-VISUALIZAÇÃO E UPLOAD --- */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 15,
          background: "rgba(0,0,0,0.2)",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <div style={{ marginBottom: 10 }}>
          {form.logo ? (
            <img
              src={form.logo}
              style={{
                width: 100,
                height: 100,
                objectFit: "contain",
                borderRadius: "50%",
                border: "3px solid var(--primary)",
                background: "#fff",
              }}
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                margin: "0 auto",
                background: "#333",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                border: "3px solid #555",
              }}
            >
              🛡️
            </div>
          )}
        </div>

        {/* Botão de Arquivo Escondido dentro de um botão bonito */}
        <label
          className="btn btn-blue"
          style={{
            display: "block",
            margin: "0 auto",
            width: "fit-content",
            cursor: "pointer",
            padding: "10px 20px",
          }}
        >
          <i className="fas fa-upload" style={{ marginRight: 5 }}></i> ESCOLHER
          ARQUIVO
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </label>
        <small style={{ color: "#aaa", marginTop: 5, display: "block" }}>
          Recomendado: Imagem quadrada ou redonda.
        </small>
      </div>
      {/* ------------------------------------------------- */}

      {isAdmin && <label>Saldo (ADM)</label>}
      {isAdmin && (
        <MoneyInput allowNegative
          className="input-field"

          value={form.balance}
          onChange={(e) =>
            setF({ ...form, balance: parseFloat(e.target.value) || 0 })
          }
        />
      )}
      {isAdmin && <label>Série (ADM)</label>}
      {isAdmin && (
        <select
          className="input-field"
          value={form.serie}
          onChange={(e) => setF({ ...form, serie: e.target.value })}
        >
          {SERIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
      {isAdmin && <label>Estado / Federação (ADM)</label>}
      {isAdmin && (
        <select
          className="input-field"
          value={form.estado}
          onChange={(e) => setF({ ...form, estado: e.target.value })}
        >
          <option value="">-- Sem Estado --</option>
          {ESTADOS.map((est) => (
            <option key={est} value={est}>
              {est}
            </option>
          ))}
        </select>
      )}

      <button
        className="btn btn-green"
        style={{ marginTop: 10, padding: 15, fontSize: 14 }}
        onClick={() => onUp(form)}
      >
        SALVAR ALTERAÇÕES
      </button>

      <hr style={{ borderColor: "#444", margin: "20px 0" }} />

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <p style={{ marginTop: 0, color: "#aaa", fontSize: 12 }}>
          <b>Operações Financeiras</b>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 5,
          }}
        >
          <button
            className="btn btn-green"
            onClick={async () => {
              const v = await promptMoney("Valor");
              if (v === null) return;
              const m = prompt("Motivo");
              if (v) onReq("INJECTION", v, m);
            }}
          >
            PEDIR INJEÇÃO
          </button>
          <button
            className="btn btn-gold"
            onClick={async () => {
              const v = await promptMoney("Valor");
              if (v === null) return;
              const m = prompt("Empresa");
              if (v) onReq("SPONSORSHIP", v, m);
            }}
          >
            PEDIR PATROCÍNIO
          </button>
        </div>
        <button
          className="btn btn-red"
          style={{ marginTop: 10 }}
          onClick={async () => {
            const v = await promptMoney("Valor a retirar:");
            if (v) {
              const m = prompt("Motivo:");
              if (m) onWithdraw(v, m);
            }
          }}
        >
          RETIRAR DINHEIRO
        </button>
      </div>
    </div>
  );
};
