import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";
import { firebase, db } from "../services/firebase.js";
import { fmt } from "../game/fmt.js";

export const ProductForm = ({ initial, onSave, onDelete, user }) => {
  const [p, setP] = useState(
    initial || {
      name: "",
      cat: "energy",
      power: 10,
      price: "",
      stock: 1,
      desc: "",
    },
  );

  const isEditing = !!initial?.id;

  // =========================
  // 1️⃣ BASE ECONÔMICA POR CATEGORIA
  // =========================
  const getCategoryBaseCost = (cat) => {
    if (cat === "energy") return 100;
    if (cat === "training") return 500;
    if (cat === "luxury") return 2000;
    return 100;
  };

  const getPowerMultiplier = (cat) => {
    if (cat === "energy") return 12;
    if (cat === "training") return 80;
    if (cat === "luxury") return 400;
    return 10;
  };

  // =========================
  // 2️⃣ CÁLCULO UNITÁRIO INTELIGENTE
  // =========================
  const calculateUnitCost = (cat, power, quantity) => {
    const base = getCategoryBaseCost(cat);
    const multiplier = getPowerMultiplier(cat);
    const pwr = parseInt(power) || 0;

    let rawCost = base + pwr * multiplier;

    // 🔥 Escalonamento por lote
    const escalationSteps = Math.floor(quantity / 10);
    const escalationPercent = escalationSteps * 0.02; // +2% a cada 10 unidades

    rawCost = rawCost * (1 + escalationPercent);

    return Math.ceil(rawCost);
  };

  // =========================
  // 3️⃣ QUANTIDADE SEGURA
  // =========================
  const quantityToProduce = Math.max(1, parseInt(p.stock) || 1);

  const unitCost = calculateUnitCost(p.cat, p.power, quantityToProduce);
  const totalProductionCost = unitCost * quantityToProduce;

  const companyBalance = user.data?.balance || 0;
  const hasEnoughMoney = companyBalance >= totalProductionCost;

  // =========================
  // 4️⃣ CONTROLES + / -
  // =========================
  const increaseQty = () => {
    if (quantityToProduce < 500) {
      setP({ ...p, stock: quantityToProduce + 1 });
    }
  };

  const decreaseQty = () => {
    if (quantityToProduce > 1) {
      setP({ ...p, stock: quantityToProduce - 1 });
    }
  };

  // =========================
  // 5️⃣ PRODUÇÃO SEGURA
  // =========================
  const handleProduction = async () => {
    if (!p.name || !p.price) return alert("Preencha Nome e Preço de Venda!");

    if (quantityToProduce <= 0) return alert("Quantidade inválida.");

    if (!hasEnoughMoney)
      return alert(
        `Saldo insuficiente! Necessário: ${fmt(totalProductionCost)}`,
      );

    try {
      if (totalProductionCost > 0) {
        await db
          .collection("companies")
          .doc(user.data.id)
          .update({
            balance:
              firebase.firestore.FieldValue.increment(-totalProductionCost),
          });
      }

      const finalStockCount = isEditing
        ? parseInt(initial.stock || 0) + quantityToProduce
        : quantityToProduce;

      onSave({
        ...p,
        stock: finalStockCount,
        productionCost: unitCost,
        lastProductionTotal: totalProductionCost,
      });
    } catch (e) {
      alert("Erro ao processar produção: " + e.message);
    }
  };

  return (
    <div className="modal-bg">
      <div
        className="modal-content"
        style={{
          border: "2px solid var(--purple)",
          boxShadow: "0 0 20px rgba(213,0,249,0.3)",
        }}
      >
        <h2 style={{ marginTop: 0, color: "var(--purple)" }}>
          🏭 FÁBRICA DA EMPRESA
        </h2>

        {/* CONFIG ITEM */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <label>Nome do Produto</label>
          <input
            className="input-field"
            value={p.name}
            onChange={(e) => setP({ ...p, name: e.target.value })}
            disabled={isEditing}
          />

          <label>Categoria</label>
          <select
            className="input-field"
            value={p.cat}
            onChange={(e) => setP({ ...p, cat: e.target.value })}
            disabled={isEditing}
          >
            <option value="energy">⚡ Energia</option>
            <option value="training">👟 Treino / XP</option>
            <option value="luxury">💎 Luxo / Fama</option>
          </select>

          <label>
            Potência: <b style={{ color: "gold" }}>{p.power}</b>
          </label>

          <input
            type="range"
            min="1"
            max="100"
            value={p.power}
            onChange={(e) => setP({ ...p, power: parseInt(e.target.value) })}
            disabled={isEditing}
          />
        </div>

        {/* QUANTIDADE */}
        <div
          style={{
            background: "rgba(213, 0, 249, 0.08)",
            padding: 20,
            borderRadius: 12,
            border: "1px solid var(--purple)",
            marginBottom: 20,
          }}
        >
          <h4 style={{ marginTop: 0 }}>📦 PRODUÇÃO</h4>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 15,
              marginBottom: 15,
            }}
          >
            <button className="btn btn-ghost" onClick={decreaseQty}>
              −
            </button>
            <div style={{ fontSize: 22, fontWeight: "bold" }}>
              {quantityToProduce}
            </div>
            <button className="btn btn-ghost" onClick={increaseQty}>
              +
            </button>
          </div>

          <input
            type="number"
            min="1"
            max="500"
            className="input-field"
            value={quantityToProduce}
            onChange={(e) =>
              setP({ ...p, stock: Math.max(1, parseInt(e.target.value) || 1) })
            }
          />

          <div
            style={{
              marginTop: 20,
              fontSize: 13,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Custo por unidade:</span>
              <b>{fmt(unitCost)}</b>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 18,
                marginTop: 10,
              }}
            >
              <span>💰 TOTAL:</span>
              <b
                style={{
                  color: hasEnoughMoney ? "#00E676" : "#FF1744",
                }}
              >
                {fmt(totalProductionCost)}
              </b>
            </div>
          </div>
        </div>

        <label>Preço de Venda (₣)</label>
        <MoneyInput

          className="input-field"
          value={p.price}
          onChange={(e) => setP({ ...p, price: e.target.value })}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button
            className="btn btn-green"
            disabled={!hasEnoughMoney}
            onClick={handleProduction}
            style={{ flex: 2 }}
          >
            {isEditing
              ? `REPOR (+${quantityToProduce})`
              : `PRODUZIR (-${fmt(totalProductionCost)})`}
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => onSave(null)}
            style={{ flex: 1 }}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};
