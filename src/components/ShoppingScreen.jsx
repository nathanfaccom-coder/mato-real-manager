import React, { useState, useEffect } from "react";
import { COMPANY_TYPES } from "../game/COMPANY_TYPES.js";
import { fmt } from "../game/fmt.js";

export const ShoppingScreen = ({
  products,
  companies,
  user,
  onBuy,
  onDeleteProd,
  players,
  teams,
}) => {
  const [view, setView] = useState("MALL"); // MALL ou STORE
  const [selComp, setSelComp] = useState(null);
  const [inspectItem, setInspectItem] = useState(null); // Estado para o modal de Zoom do produto
  const [giftTarget, setGiftTarget] = useState(""); // Alvo do presente

  // --- 1. VISÃO GERAL (SHOPPING CENTER - LISTA DE LOJAS) ---
  if (view === "MALL")
    return (
      <div>
        <h3>Shopping Center</h3>
        <p style={{ color: "#aaa", fontSize: 12, marginBottom: 15 }}>
          Escolha uma loja para ver os produtos.
        </p>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {companies
            .filter((c) => c.status === "ACTIVE")
            .map((c) => (
              <div
                key={c.id}
                className="card"
                onClick={() => {
                  setSelComp(c);
                  setView("STORE");
                }}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  borderLeft: "4px solid var(--purple)",
                  padding: "15px 5px",
                }}
              >
                {c.logo ? (
                  <img
                    src={c.logo}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: 10,
                      border: "2px solid #444",
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 30, marginBottom: 10 }}>🏢</div>
                )}
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  {String(c.name)}
                </div>
                <small style={{ color: "#888" }}>
                  {(COMPANY_TYPES[c.companyType] || {}).label}
                </small>
              </div>
            ))}
        </div>
        {companies.filter((c) => c.status === "ACTIVE").length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Nenhuma loja aberta.
          </p>
        )}
      </div>
    );

  // --- 2. VISÃO DA LOJA (VITRINE DE PRODUTOS) ---
  const storeProducts = products.filter((p) => p.companyId === selComp.id);
  const brandAmbassadors = (players || []).filter(
    (p) => p.personalSponsor && p.personalSponsor.companyId === selComp.id,
  );
  const isAdmin = user && user.type === "ADMIN";
  const userTeam =
    user &&
    (user.type === "USER" || user.type === "PLAYER" || user.type === "COACH");

  return (
    <div>
      <button
        className="btn"
        style={{ background: "#333", marginBottom: 10, width: "auto" }}
        onClick={() => {
          setView("MALL");
          setSelComp(null);
        }}
      >
        ⬅ VOLTAR AO SHOPPING
      </button>
      {/* VITRINE DE GAROTOS PROPAGANDA */}
      {brandAmbassadors.length > 0 && (
        <div
          style={{
            marginBottom: 20,
            padding: 10,
            background: "rgba(213,0,249,0.05)",
            borderRadius: 8,
            border: "1px solid var(--purple)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "var(--purple)",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            📸 Garotos Propaganda da Marca
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 5,
            }}
          >
            {brandAmbassadors.map((amb) => (
              <div
                key={amb.id}
                style={{ textAlign: "center", minWidth: "70px" }}
              >
                {amb.face ? (
                  <img
                    src={amb.face}
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
                      borderRadius: "50%",
                      background: "#333",
                      margin: "0 auto",
                    }}
                  ></div>
                )}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {amb.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* CABEÇALHO DA LOJA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          background: "rgba(0,0,0,0.3)",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #333",
        }}
      >
        {selComp.logo && (
          <img
            src={selComp.logo}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <div>
          <h2 style={{ margin: 0 }}>{String(selComp.name)}</h2>
          <div style={{ fontSize: 11, color: "#aaa" }}>
            Proprietário: <b>{selComp.owner || "Empresa"}</b>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {storeProducts.map((p) => {
          const powerVal = parseInt(p.power) || 0;
          const stock = parseInt(p.stock) || 0;
          const isSoldOut = stock <= 0;

          return (
            <div
              key={p.id}
              className="card"
              style={{
                padding: 0,
                position: "relative",
                border: isSoldOut
                  ? "1px solid #444"
                  : "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              {/* --- IMAGEM CLICÁVEL (ABRE ZOOM) --- */}
              <div
                style={{
                  width: "100%",
                  height: 120,
                  background: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid #333",
                  cursor: "pointer",
                }}
                onClick={() => setInspectItem(p)}
              >
                {p.img ? (
                  <img
                    src={p.img}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 30 }}>📦</div>
                )}
                {/* Ícone de Zoom Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                  }}
                >
                  🔍
                </div>
              </div>

              <div style={{ padding: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      color: "#888",
                      background: "#222",
                      padding: "2px 4px",
                      borderRadius: 3,
                    }}
                  >
                    {p.cat.toUpperCase()}
                  </span>
                  <small
                    style={{
                      fontSize: 9,
                      fontWeight: "bold",
                      color: isSoldOut ? "red" : "lime",
                    }}
                  >
                    {isSoldOut ? "🔴 ESGOTADO" : `📦 ${stock} un.`}
                  </small>
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    marginBottom: 2,
                    lineHeight: "1.2em",
                    cursor: "pointer",
                  }}
                  onClick={() => setInspectItem(p)}
                >
                  {String(p.name)}
                </div>

                <div
                  style={{
                    fontSize: 10,
                    color: "gold",
                    marginBottom: 8,
                    background: "rgba(255,215,0,0.05)",
                    padding: 3,
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                >
                  {["energy", "SAUDE", "CONSUMIVEL"].includes(p.cat) &&
                    `⚡ Energia: +${powerVal}%`}
                  {["training", "CHUTEIRA", "LUVAS"].includes(p.cat) &&
                    `👟 Treino: +${powerVal}% XP`}
                  {[
                    "vehicle",
                    "real_estate",
                    "luxury",
                    "VEICULO",
                    "IMOVEL",
                    "TECNOLOGIA",
                  ].includes(p.cat) && `💎 Fama: +${powerVal * 100}`}
                </div>

                <div
                  style={{
                    color: "var(--primary)",
                    fontWeight: "900",
                    fontSize: 15,
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  {fmt(p.price)}
                </div>

                {userTeam && (
                  <button
                    className={`btn ${isSoldOut ? "btn-ghost" : "btn-green"}`}
                    style={{
                      fontSize: 10,
                      padding: 10,
                      opacity: isSoldOut ? 0.4 : 1,
                    }}
                    onClick={() => !isSoldOut && onBuy(p, selComp)}
                    disabled={isSoldOut}
                  >
                    {isSoldOut ? "SEM ESTOQUE" : "COMPRAR"}
                  </button>
                )}

                {isAdmin && (
                  <button
                    className="btn btn-red"
                    style={{ marginTop: 5, padding: 5, fontSize: 9 }}
                    onClick={() => onDeleteProd(p.id)}
                  >
                    EXCLUIR
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {storeProducts.length === 0 && (
        <div style={{ textAlign: "center", padding: 20, color: "#666" }}>
          <i
            className="fas fa-box-open"
            style={{ fontSize: 30, marginBottom: 10 }}
          ></i>
          <p>Esta loja ainda não tem produtos na vitrine.</p>
        </div>
      )}

      {/* --- MODAL DE INSPEÇÃO DO PRODUTO (ZOOM) --- */}
      {inspectItem && (
        <div className="modal-overlay" onClick={() => setInspectItem(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ textAlign: "center", border: "1px solid var(--primary)" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  background: "#333",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 10,
                }}
              >
                {inspectItem.cat}
              </span>
              <button
                className="btn btn-red"
                style={{
                  width: "auto",
                  padding: "2px 8px",
                  fontSize: 12,
                  margin: 0,
                }}
                onClick={() => setInspectItem(null)}
              >
                X
              </button>
            </div>

            {/* IMAGEM GRANDE E COMPLETA */}
            <div
              style={{
                background: "#111",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
                border: "1px solid #333",
              }}
            >
              {inspectItem.img ? (
                <img
                  src={inspectItem.img}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div style={{ fontSize: 50 }}>📦</div>
              )}
            </div>

            <h2 style={{ margin: 0, color: "white" }}>{inspectItem.name}</h2>
            <div
              style={{
                fontSize: 14,
                color: "#aaa",
                margin: "10px 0",
                fontStyle: "italic",
                lineHeight: "1.4",
              }}
            >
              {inspectItem.desc || "Sem descrição disponível."}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                margin: "15px 0",
              }}
            >
              <div
                style={{
                  background: "rgba(255,215,0,0.1)",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid gold",
                }}
              >
                <div style={{ fontSize: 10, color: "#aaa" }}>PODER / BÔNUS</div>
                <div
                  style={{ color: "gold", fontWeight: "bold", fontSize: 14 }}
                >
                  {["energy", "SAUDE", "CONSUMIVEL"].includes(
                    inspectItem.cat,
                  ) && `⚡ +${parseInt(inspectItem.power) || 0}%`}
                  {["training", "CHUTEIRA", "LUVAS"].includes(
                    inspectItem.cat,
                  ) && `👟 +${parseInt(inspectItem.power) || 0}% XP`}
                  {[
                    "vehicle",
                    "real_estate",
                    "luxury",
                    "VEICULO",
                    "IMOVEL",
                    "TECNOLOGIA",
                  ].includes(inspectItem.cat) &&
                    `💎 +${(parseInt(inspectItem.power) || 0) * 100} Fama`}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(0,230,118,0.1)",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid var(--primary)",
                }}
              >
                <div style={{ fontSize: 10, color: "#aaa" }}>PREÇO</div>
                <div
                  style={{
                    color: "var(--primary)",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {fmt(inspectItem.price)}
                </div>
              </div>
            </div>

            {userTeam && (
              <>
                <select
                  className="input-field"
                  style={{ marginBottom: 10, borderColor: "var(--secondary)" }}
                  value={giftTarget}
                  onChange={(e) => setGiftTarget(e.target.value)}
                  disabled={(parseInt(inspectItem.stock) || 0) <= 0}
                >
                  <option value="">🛒 COMPRAR PARA MIM MESMO</option>
                  <optgroup label="🎁 Enviar Presente (Elenco)">
                    {/* Se for clube, lista os próprios jogadores. Se for jogador, lista os colegas de time */}
                    {players
                      .filter(
                        (p) => p.teamId !== "FREE" && p.id !== user.data.id,
                      )
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((p) => (
                        <option key={p.id} value={`PLAYER_${p.id}`}>
                          🎁 Para: {p.name} ({p.position} - OV {p.overall}) |{" "}
                          {teams.find((t) => t.id === p.teamId)?.name ||
                            "Sem Clube"}
                        </option>
                      ))}
                  </optgroup>
                </select>

                <button
                  className={`btn ${(parseInt(inspectItem.stock) || 0) <= 0 ? "btn-ghost" : "btn-green"}`}
                  style={{
                    padding: 15,
                    fontSize: 14,
                    fontWeight: "bold",
                    width: "100%",
                    margin: 0,
                  }}
                  onClick={() => {
                    if ((parseInt(inspectItem.stock) || 0) > 0) {
                      let targetObj = null;
                      if (giftTarget) {
                        const tId = giftTarget.replace("PLAYER_", "");
                        targetObj = players.find((p) => p.id === tId);
                      }
                      onBuy(inspectItem, selComp, targetObj);
                      setInspectItem(null);
                      setGiftTarget("");
                    }
                  }}
                  disabled={(parseInt(inspectItem.stock) || 0) <= 0}
                >
                  {(parseInt(inspectItem.stock) || 0) <= 0
                    ? "🔴 ESGOTADO"
                    : giftTarget
                      ? "🎁 ENVIAR PRESENTE"
                      : "🛒 COMPRAR AGORA"}
                </button>
              </>
            )}
            <div
              style={{
                marginTop: 5,
                fontSize: 10,
                color: (parseInt(inspectItem.stock) || 0) > 0 ? "lime" : "red",
              }}
            >
              Estoque disponível: {inspectItem.stock || 0} unidades
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
