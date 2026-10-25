import { MoneyInput } from '../money/MoneyInput.jsx';
import React, { useState, useEffect } from "react";
import { firebase, db } from "../services/firebase.js";
import { PROD_CATS } from "../game/PROD_CATS.js";
import { fmt } from "../game/fmt.js";
import { COMPANY_TYPES } from "../game/COMPANY_TYPES.js";
import { getProdCost } from "../game/getProdCost.js";

export const CompanyDashboard = ({
  company,
  products,
  sps,
  sales,
  teams,
  onSaveProd,
  onDeleteProd,
  onProcessSpons,
}) => {
  const [tab, setTab] = useState("PRODS");
  // Estado do Produto em Edição (Inicia com Power 0 e Stock 1)
  const [editP, setEditP] = useState(null);

  // --- 1. COMPRESSOR DE LOGO (ULTRA-LEVE) ---
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // TAMANHO REDUZIDO PARA 150px (Suficiente para Logo)
        const MAX_SIZE = 150;
        let width = img.width,
          height = img.height;
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
        ctx.drawImage(img, 0, 0, width, height);

        // FORMATO WEBP + QUALIDADE 60% (Extremamente leve)
        const dataUrl = canvas.toDataURL("image/webp", 0.6);

        if (confirm("Atualizar logo da empresa?")) {
          await db
            .collection("companies")
            .doc(company.id)
            .update({ logo: dataUrl });
          alert("Logo atualizado!");
        }
      };
    };
  };

  // --- 2. COMPRESSOR DE PRODUTO (ULTRA-LEVE) ---
  const handleProductImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // TAMANHO OTIMIZADO 180px (Bom para ver detalhes, mas leve)
        const MAX_SIZE = 180;
        let width = img.width,
          height = img.height;
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
        ctx.drawImage(img, 0, 0, width, height);

        // FORMATO WEBP + QUALIDADE 0.6
        const dataUrl = canvas.toDataURL("image/webp", 0.6);

        setEditP((prev) => ({ ...prev, img: dataUrl }));
      };
    };
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 15,
          background: "rgba(0,0,0,0.2)",
          padding: 10,
          borderRadius: 8,
        }}
      >
        {company.logo ? (
          <img
            src={company.logo}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--purple)",
            }}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              background: "#333",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
            }}
          >
            🏢
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>{company.name}</h3>
          <label
            className="btn btn-ghost"
            style={{
              fontSize: 9,
              padding: "2px 5px",
              width: "auto",
              display: "inline-block",
              margin: 0,
            }}
          >
            📷 ALTERAR LOGO{" "}
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          className={`btn ${tab === "PRODS" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setTab("PRODS")}
        >
          PRODUTOS
        </button>
        <button
          className={`btn ${tab === "FIN" ? "btn-purple" : "btn-ghost"}`}
          onClick={() => setTab("FIN")}
        >
          FINANÇAS
        </button>
      </div>

      {tab === "PRODS" && (
        <div>
          <button
            className="btn btn-green"
            onClick={() =>
              setEditP({
                name: "",
                price: "",
                img: "",
                desc: "",
                cat: "CHUTEIRA",
                power: 0,
                stock: 1,
              })
            }
          >
            + NOVO PRODUTO
          </button>

          {products.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ display: "flex", gap: 10, textAlign: "left" }}
            >
              {p.img ? (
                <img
                  src={p.img}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 6,
                    border: "1px solid #444",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "#222",
                    borderRadius: 6,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  📦
                </div>
              )}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: 10,
                    background: "#333",
                    padding: "2px 6px",
                    borderRadius: 4,
                    color: "#aaa",
                  }}
                >
                  {PROD_CATS[p.cat] || p.cat}
                </span>
                <div style={{ fontWeight: "bold", marginTop: 2 }}>{p.name}</div>
                <div
                  style={{ fontSize: 11, color: p.power > 0 ? "gold" : "#888" }}
                >
                  {p.power > 0
                    ? `Poder: ${p.power}`
                    : "✨ Sem Efeito (Decorativo)"}
                </div>
                <div style={{ fontSize: 10, color: "#888" }}>
                  📦 Estoque: <b>{p.stock || 0}</b>
                </div>
                <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
                  {fmt(p.price)}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <button
                  className="btn btn-blue"
                  style={{ width: "auto", padding: "5px 10px" }}
                  onClick={() => setEditP({ ...p, stock: 1 })}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-red"
                  style={{ width: "auto", padding: "5px 10px" }}
                  onClick={() => onDeleteProd(p.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "FIN" && (
        <div>
          <div className="highlight-card">
            <h3>Saldo: {fmt(company.balance)}</h3>
            <small>
              Imposto Semanal:{" "}
              {fmt((COMPANY_TYPES[company.companyType] || {}).tax || 0)}
            </small>
          </div>
          <h4 style={{ marginTop: 20, color: "#ddd" }}>Histórico de Vendas</h4>
          <div
            style={{
              maxHeight: 200,
              overflowY: "auto",
              background: "rgba(0,0,0,0.3)",
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
              border: "1px solid #333",
            }}
          >
            {(!sales ||
              sales.filter((s) => s.companyId === company.id).length === 0) && (
              <p
                style={{
                  color: "#666",
                  textAlign: "center",
                  fontSize: 11,
                  margin: 0,
                }}
              >
                Nenhuma venda recente.
              </p>
            )}
            {(sales || [])
              .filter((s) => s.companyId === company.id)
              .map((s, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid #444",
                    padding: "8px 0",
                    fontSize: 11,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <b style={{ color: "var(--primary)" }}>+ {fmt(s.price)}</b>
                    <span style={{ color: "#888" }}>
                      {new Date(s.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ marginTop: 2 }}>
                    Custo:{" "}
                    <span style={{ color: "var(--danger)" }}>
                      -{fmt(s.cost || 0)}
                    </span>{" "}
                    | Lucro:{" "}
                    <span style={{ color: "lime" }}>
                      {fmt(s.price - (s.cost || 0))}
                    </span>
                  </div>
                  <div style={{ marginTop: 2 }}>
                    👤{" "}
                    <span style={{ color: "#fff", fontWeight: "bold" }}>
                      {s.buyerName}
                    </span>{" "}
                    comprou 1x{" "}
                    <span style={{ color: "var(--purple)" }}>
                      {s.productName}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <h4>Solicitações</h4>
          {sps.filter((s) => s.status === "PENDING").length === 0 && (
            <p style={{ color: "#666" }}>Nenhuma.</p>
          )}
          {sps
            .filter((s) => s.status === "PENDING")
            .map((s) => (
              <div key={s.id} className="card">
                <b>{s.teamName}</b> pede patrocínio.
                <br />
                Valor:{" "}
                <span style={{ color: "var(--warning)" }}>{fmt(s.value)}</span>
                <br />
                <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                  <button
                    className="btn btn-green"
                    onClick={() => onProcessSpons(s, "ACTIVE")}
                  >
                    ACEITAR
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => onProcessSpons(s, "REJECTED")}
                  >
                    RECUSAR
                  </button>
                </div>
              </div>
            ))}
          <h4>Contratos Ativos</h4>
          {sps.filter((s) => s.status === "ACTIVE").length === 0 && (
            <p style={{ color: "#666" }}>Nenhum.</p>
          )}
          {sps
            .filter((s) => s.status === "ACTIVE")
            .map((s) => (
              <div
                key={s.id}
                className="card"
                style={{ borderLeft: "4px solid var(--primary)" }}
              >
                <b>{s.teamName}</b>
                <br />
                Pagamento: {fmt(s.value)}
                <button
                  className="btn btn-red"
                  style={{ marginTop: 5 }}
                  onClick={() => onProcessSpons(s, "CANCELLED")}
                >
                  CANCELAR
                </button>
              </div>
            ))}
        </div>
      )}

      {editP && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ border: "2px solid var(--purple)" }}
          >
            <h3>
              {editP.id
                ? "🏭 Repor Estoque / Editar"
                : "🏭 Nova Linha de Produção"}
            </h3>

            <div style={{ textAlign: "center", marginBottom: 10 }}>
              {editP.img ? (
                <img
                  src={editP.img}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    objectFit: "cover",
                    border: "2px solid var(--primary)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "#222",
                    borderRadius: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #444",
                  }}
                >
                  📦
                </div>
              )}
              <br />
              <label
                className="btn btn-blue"
                style={{
                  display: "inline-block",
                  width: "auto",
                  fontSize: 11,
                  padding: "5px 10px",
                  marginTop: 5,
                }}
              >
                📷 ESCOLHER FOTO DO PRODUTO
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleProductImage}
                />
              </label>
            </div>

            <label>Categoria</label>
            <select
              className="input-field"
              value={editP.cat || "CHUTEIRA"}
              onChange={(e) => setEditP({ ...editP, cat: e.target.value })}
              disabled={editP.id}
            >
              {Object.keys(PROD_CATS).map((key) => (
                <option key={key} value={key}>
                  {PROD_CATS[key]}
                </option>
              ))}
            </select>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
                border: "1px solid #444",
              }}
            >
              <label style={{ color: editP.power > 0 ? "gold" : "#aaa" }}>
                {editP.power > 0
                  ? `⚡ Poder / Intensidade: ${editP.power}`
                  : "✨ Sem Efeito Especial"}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="input-field"
                value={editP.power || 0}
                onChange={(e) =>
                  setEditP({ ...editP, power: parseInt(e.target.value) })
                }
                disabled={editP.id}
              />
              <small style={{ color: "#aaa", display: "block" }}>
                {editP.power === 0
                  ? "🚫 Item Decorativo (Grátis para produzir)"
                  : ["SAUDE", "CONSUMIVEL"].includes(editP.cat)
                    ? `Recupera ${editP.power}% Energia`
                    : ["CHUTEIRA", "LUVAS"].includes(editP.cat)
                      ? `Bônus de +${editP.power}% XP no treino`
                      : `Gera +${(editP.power || 0) * 100} Fama`}
              </small>
            </div>

            {/* --- ÁREA DE FÁBRICA (QUANTIDADE) --- */}
            <div
              style={{
                background: "#222",
                padding: 15,
                borderRadius: 10,
                margin: "10px 0",
                borderLeft: "4px solid var(--purple)",
              }}
            >
              <h4
                style={{
                  marginTop: 0,
                  marginBottom: 10,
                  color: "var(--purple)",
                }}
              >
                📦 Ordem de Produção
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <label style={{ margin: 0 }}>Quantidade a produzir:</label>
                <b style={{ fontSize: 20, color: "#fff" }}>
                  {editP.stock || 1} un.
                </b>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                className="input-field"
                value={editP.stock || 1}
                onChange={(e) =>
                  setEditP({ ...editP, stock: parseInt(e.target.value) })
                }
                style={{ accentColor: "var(--purple)" }}
              />
              <div
                style={{
                  marginTop: 15,
                  paddingTop: 10,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 12,
                }}
              >
                {(() => {
                  const uCost = getProdCost(editP.cat, editP.power);
                  const tCost = uCost * (parseInt(editP.stock) || 1);
                  const canAfford = (company.balance || 0) >= tCost;
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 5,
                        }}
                      >
                        <span>Custo Unitário:</span>
                        <b>{fmt(uCost)}</b>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 16,
                          borderTop: "1px dashed #444",
                          paddingTop: 5,
                        }}
                      >
                        <span>VALOR TOTAL A PAGAR:</span>
                        <b style={{ color: canAfford ? "#00E676" : "#FF1744" }}>
                          {fmt(tCost)}
                        </b>
                      </div>
                      {!canAfford && (
                        <div
                          style={{
                            color: "#FF1744",
                            textAlign: "right",
                            fontWeight: "bold",
                            marginTop: 5,
                            fontSize: 10,
                          }}
                        >
                          ⚠️ SALDO INSUFICIENTE
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            <label>Nome</label>
            <input
              className="input-field"
              value={editP.name}
              onChange={(e) => setEditP({ ...editP, name: e.target.value })}
              disabled={editP.id}
            />
            <label>Preço de Venda (₣)</label>
            <MoneyInput
              className="input-field"

              value={editP.price}
              onChange={(e) => setEditP({ ...editP, price: e.target.value })}
            />
            <label>Descrição</label>
            <textarea
              className="input-field"
              value={editP.desc}
              onChange={(e) => setEditP({ ...editP, desc: e.target.value })}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn btn-green"
                onClick={async () => {
                  const uCost = getProdCost(editP.cat, editP.power);
                  const qty = parseInt(editP.stock) || 1;
                  const tCost = uCost * qty;
                  const price = parseFloat(editP.price);

                  if (uCost > 0 && price < uCost)
                    return alert(
                      `🚫 ANTI-CHEAT: O preço (${fmt(price)}) não pode ser menor que o custo de produção (${fmt(uCost)})!`,
                    );
                  if ((company.balance || 0) < tCost)
                    return alert("A empresa não tem saldo para esta produção!");

                  try {
                    // 1. Debita o valor total do saldo da empresa no Firebase
                    if (tCost > 0) {
                      await db
                        .collection("companies")
                        .doc(company.id)
                        .update({
                          balance:
                            firebase.firestore.FieldValue.increment(-tCost),
                        });
                    }

                    // 2. Calcula o estoque final somando com o que já existe se for edição
                    const oldProd = products.find((x) => x.id === editP.id);
                    const finalStock = editP.id
                      ? parseInt(oldProd.stock || 0) + qty
                      : qty;

                    // 3. Salva o produto
                    onSaveProd({
                      ...editP,
                      stock: finalStock,
                      productionCost: uCost,
                    });

                    setEditP(null);
                  } catch (e) {
                    alert("Erro ao produzir: " + e.message);
                  }
                }}
              >
                {editP.id
                  ? `FABRICAR (+${editP.stock})`
                  : `PAGAR E LANÇAR (-${fmt(getProdCost(editP.cat, editP.power) * (editP.stock || 1))})`}
              </button>
              <button className="btn" onClick={() => setEditP(null)}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
