import React, { useState, useEffect } from "react";
import { firebase } from "../services/firebase.js";
import { STADIUM_DB } from "../game/STADIUM_DB.js";
import { fmt } from "../game/fmt.js";
import { calculateSocios } from "../game/calculateSocios.js";

export const StadiumManager = ({ team, players, onClose }) => {
  const lvl = team.stadiumLevel || 1;
  const db = STADIUM_DB[lvl];
  const nextDb = STADIUM_DB[lvl + 1];

  const [tab, setTab] = useState("ARENA");
  const [socioPrice, setSocioPrice] = useState(team.socioPrice || 40);
  const [ticPrice, setTicPrice] = useState(team.ticketPrice || db.minTic);

  // Estados da Loja
  const storeBal = team.storeBalance || 0;
  const [editP, setEditP] = useState(null);
  const [buyStock, setBuyStock] = useState(10);

  const handleSaveTicket = async () => {
    await firebase
      .firestore()
      .collection("teams")
      .doc(team.id)
      .update({ ticketPrice: ticPrice });
    alert("Preço do ingresso atualizado para o próximo jogo em casa!");
  };

  const handleUpgrade = async () => {
    if (!nextDb) return;
    if ((team.balance || 0) < db.upgCost)
      return alert("Saldo insuficiente do clube!");
    if (
      confirm(
        `Evoluir para ${nextDb.name} por ${fmt(db.upgCost)}?\n\nA manutenção semanal passará a ser de ${fmt(nextDb.maint)}.`,
      )
    ) {
      await firebase
        .firestore()
        .collection("teams")
        .doc(team.id)
        .update({
          balance: firebase.firestore.FieldValue.increment(-db.upgCost),
          stadiumLevel: lvl + 1,
          ticketPrice: nextDb.minTic,
        });
      alert("Estádio evoluído com sucesso!");
      onClose();
    }
  };

  const handleFinanceStadium = async () => {
    if (!nextDb) return;
    if (team.stadiumLoan && team.stadiumLoan.installments > 0)
      return alert(
        "🚫 Você já possui um financiamento de estádio em andamento. Quite-o antes de fazer outra obra.",
      );

    const upgCost = db.upgCost;
    const totalOwed = upgCost * 1.1;
    const weekly = totalOwed / 10;

    if (
      confirm(
        `🏦 FINANCIAMENTO CAIXA\n\nO banco pagará a construtora diretamente e seu estádio evoluirá AGORA!\n\nValor da Obra: ${fmt(upgCost)}\nCondições: 10x de ${fmt(weekly)}\nTotal com juros (10%): ${fmt(totalOwed)}\n\nAssinar contrato e iniciar obras?`,
      )
    ) {
      await firebase
        .firestore()
        .collection("teams")
        .doc(team.id)
        .update({
          stadiumLevel: lvl + 1,
          ticketPrice: nextDb.minTic,
          stadiumLoan: {
            amountBorrowed: upgCost,
            totalOwed: totalOwed,
            weeklyPayment: weekly,
            installments: 10,
          },
        });
      alert(
        "✅ Contrato assinado! A construtora já terminou as obras e seu novo estádio está pronto.",
      );
      onClose();
    }
  };

  const handleWithdrawStore = async () => {
    if (storeBal <= 0) return alert("A loja não tem lucros para sacar.");
    if (
      confirm(
        `Transferir todo o lucro da loja (${fmt(storeBal)}) para o cofre do Clube?`,
      )
    ) {
      await firebase
        .firestore()
        .collection("teams")
        .doc(team.id)
        .update({
          balance: firebase.firestore.FieldValue.increment(storeBal),
          storeBalance: 0,
        });
      alert("Lucro sacado para o clube!");
    }
  };

  const handleStadiumPicUpload = (e) => {
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
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);

        if (confirm("Salvar esta foto como a imagem oficial da sua Arena?")) {
          await firebase
            .firestore()
            .collection("teams")
            .doc(team.id)
            .update({ stadiumPic: dataUrl });
          alert("Foto da Arena atualizada com sucesso!");
        }
      };
    };
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "500px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", gap: 5, marginBottom: 15 }}>
          <button
            className={`btn ${tab === "ARENA" ? "btn-blue" : "btn-ghost"}`}
            onClick={() => setTab("ARENA")}
            style={{ flex: 1 }}
          >
            🏟️ ARENA
          </button>
          <button
            className={`btn ${tab === "LOJA" ? "btn-purple" : "btn-ghost"}`}
            onClick={() => setTab("LOJA")}
            style={{ flex: 1 }}
          >
            🛍️ LOJA OFICIAL
          </button>
          <button
            className={`btn ${tab === "SOCIO" ? "btn-gold" : "btn-ghost"}`}
            onClick={() => setTab("SOCIO")}
            style={{ flex: 1 }}
          >
            🎟️ SÓCIO
          </button>
        </div>

        {tab === "ARENA" && (
          <div className="animate-in">
            <div
              style={{
                position: "relative",
                height: 150,
                background: "#111",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: 15,
                border: "2px solid cyan",
                boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              {team.stadiumPic ? (
                <img
                  src={team.stadiumPic}
                  alt="Estádio"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.6,
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "#555",
                  }}
                >
                  <i className="fas fa-image fa-3x"></i>
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.95))",
                  padding: "30px 10px 10px 10px",
                }}
              >
                <b
                  style={{
                    color: "cyan",
                    fontSize: 15,
                    display: "block",
                    marginBottom: 4,
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  {db.name} <small style={{ color: "gold" }}>(Nvl {lvl})</small>
                </b>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "#ddd",
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  <span>
                    👥 Cap:{" "}
                    <b style={{ color: "#fff" }}>
                      {db.cap.toLocaleString("pt-BR")}
                    </b>
                  </span>
                  <span>
                    🎫 Ingresso:{" "}
                    <b style={{ color: "#00E676" }}>{fmt(ticPrice)}</b>
                  </span>
                  <span>
                    💸 Mnt:{" "}
                    <b style={{ color: "var(--danger)" }}>{fmt(db.maint)}/s</b>
                  </span>
                </div>
              </div>
              <label
                className="btn btn-ghost"
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  padding: 5,
                  width: "auto",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  fontSize: 10,
                  cursor: "pointer",
                  margin: 0,
                  zIndex: 10,
                }}
              >
                <i className="fas fa-camera"></i> Trocar Foto
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleStadiumPicUpload}
                />
              </label>
            </div>

            <div
              style={{
                background: "rgba(213, 0, 249, 0.1)",
                border: "1px dashed #D500F9",
                padding: 10,
                borderRadius: 8,
                marginBottom: 15,
              }}
            >
              <b style={{ color: "#D500F9", fontSize: 11 }}>
                <i className="fas fa-robot"></i> Gerador de Imagem IA:
              </b>
              <p style={{ fontSize: 10, color: "#aaa", margin: "5px 0" }}>
                Copie o texto abaixo e cole no seu gerador de IA favorito para
                criar a foto ideal do seu estádio atual:
              </p>
              <code
                style={{
                  display: "block",
                  background: "#000",
                  padding: 8,
                  borderRadius: 4,
                  fontSize: 9,
                  color: "#00E676",
                  userSelect: "all",
                }}
              >
                {db.prompt}
              </code>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <div
                style={{
                  background: "#111",
                  padding: 10,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#888", fontSize: 10 }}>
                  Capacidade Máxima
                </span>
                <br />
                <b style={{ color: "#fff", fontSize: 14 }}>
                  {db.cap.toLocaleString("pt-BR")}
                </b>
              </div>
              <div
                style={{
                  background: "#111",
                  padding: 10,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#888", fontSize: 10 }}>
                  Custo de Manutenção
                </span>
                <br />
                <b style={{ color: "var(--danger)", fontSize: 14 }}>
                  {fmt(db.maint)}/sem
                </b>
              </div>
            </div>

            <div className="card" style={{ borderLeft: "4px solid cyan" }}>
              <h4 style={{ marginTop: 0, color: "cyan" }}>
                🎫 Valor do Ingresso
              </h4>
              <p style={{ fontSize: 10, color: "#aaa", marginBottom: 10 }}>
                Ajuste o preço do ingresso. Preços muito altos espantam a
                torcida.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <label
                  style={{ color: "cyan", fontSize: 12, fontWeight: "bold" }}
                >
                  Preço da Entrada
                </label>
                <b style={{ color: "#fff" }}>{fmt(ticPrice)}</b>
              </div>
              <input
                type="range"
                min={db.minTic}
                max={db.maxTic}
                step="5"
                value={ticPrice}
                onChange={(e) => setTicPrice(Number(e.target.value))}
                style={{ width: "100%", accentColor: "cyan", marginBottom: 10 }}
              />
              <div
                style={{
                  background: "rgba(0,0,0,0.5)",
                  padding: 8,
                  borderRadius: 5,
                  fontSize: 11,
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span>Renda Máxima (Casa Cheia):</span>{" "}
                <b style={{ color: "#00E676" }}>{fmt(ticPrice * db.cap)}</b>
              </div>
              <button
                className="btn btn-blue"
                onClick={handleSaveTicket}
                disabled={ticPrice === team.ticketPrice}
              >
                SALVAR PREÇO
              </button>
            </div>

            {nextDb && (
              <div
                style={{
                  marginTop: 15,
                  padding: 15,
                  border: "1px dashed gold",
                  borderRadius: 8,
                  textAlign: "center",
                  background: "rgba(255,215,0,0.05)",
                }}
              >
                <b style={{ color: "gold" }}>Próximo Nível: {nextDb.name}</b>
                <p style={{ fontSize: 10, color: "#aaa", marginBottom: 10 }}>
                  Capacidade sobe para {nextDb.cap.toLocaleString("pt-BR")}.
                  Manutenção subirá para {fmt(nextDb.maint)}/sem.
                </p>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className="btn btn-gold"
                    onClick={handleUpgrade}
                    style={{ color: "#000", margin: 0, flex: 1, fontSize: 10 }}
                  >
                    PAGAR À VISTA
                    <br />({fmt(db.upgCost)})
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={handleFinanceStadium}
                    style={{
                      margin: 0,
                      flex: 1,
                      fontSize: 10,
                      borderColor: "cyan",
                      color: "cyan",
                    }}
                  >
                    FINANCIAR OBRA
                    <br />
                    (10x de {fmt((db.upgCost * 1.1) / 10)})
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "LOJA" && (
          <div className="animate-in">
            <div
              style={{
                background: "linear-gradient(45deg, #1b5e20, #000)",
                padding: 15,
                borderRadius: 8,
                marginBottom: 15,
                border: "1px solid #00E676",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <small style={{ color: "#888" }}>Caixa da Loja (Lucro)</small>
                <br />
                <b style={{ fontSize: 20, color: "#00E676" }}>
                  {fmt(storeBal)}
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <small style={{ color: "#888" }}>Nível da Loja</small>
                <br />
                <b style={{ fontSize: 16, color: "gold" }}>⭐ Nvl {lvl}</b>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
              <button
                className="btn btn-green"
                style={{ flex: 2 }}
                onClick={handleWithdrawStore}
                disabled={storeBal <= 0}
              >
                💸 SACAR LUCROS
              </button>
              <button
                className="btn btn-purple"
                style={{ flex: 1 }}
                onClick={() => {
                  if ((team.storeProducts || []).length >= 6)
                    return alert(
                      "Sua vitrine está cheia! Máximo de 6 produtos.",
                    );
                  setEditP({
                    id: Date.now().toString(),
                    name: "",
                    price: 50,
                    stock: 0,
                    img: null,
                  });
                }}
              >
                + CRIAR ITEM
              </button>
            </div>

            {editP && (
              <div
                className="card"
                style={{ border: "2px solid var(--purple)", marginBottom: 15 }}
              >
                <h4 style={{ marginTop: 0, color: "var(--purple)" }}>
                  {editP.stock === undefined || editP.stock === 0
                    ? "Novo Produto"
                    : "Repor Estoque"}
                </h4>

                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "#222",
                      borderRadius: 8,
                      border: "1px dashed #666",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {editP.img ? (
                      <img
                        src={editP.img}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          placeItems: "center",
                          height: "100%",
                          fontSize: 24,
                        }}
                      >
                        📷
                      </div>
                    )}
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        cursor: "pointer",
                      }}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (ev) => {
                          const img = new Image();
                          img.src = ev.target.result;
                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const MAX_W = 300;
                            let w = img.width,
                              h = img.height;
                            if (w > MAX_W) {
                              h *= MAX_W / w;
                              w = MAX_W;
                            }
                            canvas.width = w;
                            canvas.height = h;
                            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                            setEditP({
                              ...editP,
                              img: canvas.toDataURL("image/jpeg", 0.8),
                            });
                          };
                        };
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      className="input-field"
                      placeholder="Nome (Ex: Copo Térmico)"
                      value={editP.name}
                      onChange={(e) =>
                        setEditP({ ...editP, name: e.target.value })
                      }
                      disabled={editP.stock > 0}
                      style={{ marginBottom: 5 }}
                    />
                    <input
                      className="input-field"
                      type="number"
                      placeholder="Preço de Venda (₣)"
                      value={editP.price}
                      onChange={(e) =>
                        setEditP({ ...editP, price: e.target.value })
                      }
                      disabled={editP.stock > 0}
                      style={{ marginBottom: 0 }}
                    />
                    <small style={{ color: "#aaa", fontSize: 9 }}>
                      Custo de fabricação: 30% do valor.
                    </small>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                    }}
                  >
                    <span>
                      Produzir: <b>{buyStock} un.</b>
                    </span>
                    <span>
                      Custo:{" "}
                      <b style={{ color: "var(--danger)" }}>
                        {fmt(buyStock * (editP.price * 0.3))}
                      </b>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={buyStock}
                    onChange={(e) => setBuyStock(Number(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "var(--purple)",
                      margin: "10px 0",
                    }}
                  />

                  <div style={{ display: "flex", gap: 5 }}>
                    <button
                      className="btn btn-green"
                      onClick={async () => {
                        if (!editP.name || !editP.price)
                          return alert("Preencha nome e preço!");
                        const cost = Math.floor(buyStock * (editP.price * 0.3));
                        if ((team.balance || 0) < cost)
                          return alert(
                            "O clube não tem saldo para fabricar este lote!",
                          );

                        if (
                          confirm(
                            `Pagar ${fmt(cost)} para fabricar ${buyStock}x ${editP.name}?`,
                          )
                        ) {
                          let currentProducts = team.storeProducts || [];
                          const existingIdx = currentProducts.findIndex(
                            (p) => p.id === editP.id,
                          );
                          if (existingIdx >= 0) {
                            currentProducts[existingIdx].stock += buyStock;
                          } else {
                            currentProducts.push({
                              ...editP,
                              stock: buyStock,
                              price: Number(editP.price),
                            });
                          }

                          await firebase
                            .firestore()
                            .collection("teams")
                            .doc(team.id)
                            .update({
                              balance:
                                firebase.firestore.FieldValue.increment(-cost),
                              storeProducts: currentProducts,
                            });
                          alert("Produção enviada para o estoque!");
                          setEditP(null);
                          setBuyStock(10);
                        }
                      }}
                    >
                      FABRICAR
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        setEditP(null);
                        setBuyStock(10);
                      }}
                    >
                      CANCELAR
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {(team.storeProducts || []).map((p) => (
                <div
                  key={p.id}
                  className="card"
                  style={{
                    padding: 10,
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <i
                    className="fas fa-trash"
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      color: "#ff1744",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                    onClick={async () => {
                      if (
                        confirm(
                          `Excluir ${p.name}? O estoque atual será perdido sem reembolso.`,
                        )
                      ) {
                        const newProds = team.storeProducts.filter(
                          (x) => x.id !== p.id,
                        );
                        await firebase
                          .firestore()
                          .collection("teams")
                          .doc(team.id)
                          .update({ storeProducts: newProds });
                      }
                    }}
                  ></i>

                  <div
                    style={{
                      width: 50,
                      height: 50,
                      margin: "0 auto",
                      borderRadius: 5,
                      overflow: "hidden",
                      background: "#222",
                      marginBottom: 5,
                    }}
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
                      <span style={{ fontSize: 20, lineHeight: "50px" }}>
                        📦
                      </span>
                    )}
                  </div>
                  <b
                    style={{
                      fontSize: 11,
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.name}
                  </b>
                  <div
                    style={{
                      color: "var(--primary)",
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  >
                    {fmt(p.price)}
                  </div>

                  <div
                    style={{
                      fontSize: 9,
                      color: p.stock > 0 ? "lime" : "red",
                      margin: "5px 0",
                    }}
                  >
                    Estoque: {p.stock} un.
                  </div>

                  <button
                    className="btn btn-ghost"
                    style={{
                      fontSize: 9,
                      padding: 5,
                      margin: 0,
                      borderColor: "var(--purple)",
                      color: "white",
                    }}
                    onClick={() => {
                      setEditP(p);
                      setBuyStock(10);
                    }}
                  >
                    REPOR ESTOQUE
                  </button>
                </div>
              ))}
            </div>
            {(team.storeProducts || []).length === 0 && !editP && (
              <p style={{ textAlign: "center", color: "#666", fontSize: 11 }}>
                Sua vitrine está vazia. Crie produtos para vender em dias de
                jogo!
              </p>
            )}
          </div>
        )}
        {/* --- NOVA ABA: PROGRAMA SÓCIO TORCEDOR --- */}
        {tab === "SOCIO" && (
          <div className="animate-in">
            <div
              style={{
                background: "linear-gradient(45deg, #FFD700, #FF8F00)",
                padding: 15,
                borderRadius: 8,
                marginBottom: 15,
                border: "1px solid #fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <small style={{ color: "#000", fontWeight: "bold" }}>
                  Sócios Ativos (Em tempo real)
                </small>
                <br />
                <b style={{ fontSize: 24, color: "#000" }}>
                  {/* A MÁGICA DO TEMPO REAL AQUI */}
                  {calculateSocios(
                    { ...team, socioPrice: socioPrice }, // Simula a mudança antes de salvar
                    players.filter((p) => p.teamId === team.id),
                  ).toLocaleString("pt-BR")}{" "}
                  👤
                </b>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <div
                className="card"
                style={{ padding: 10, textAlign: "center" }}
              >
                <span style={{ fontSize: 10, color: "#aaa" }}>
                  Renda Semanal Projetada
                </span>
                <br />
                <b style={{ color: "lime", fontSize: 14 }}>
                  {fmt(
                    calculateSocios(
                      { ...team, socioPrice: socioPrice },
                      players.filter((p) => p.teamId === team.id),
                    ) * socioPrice,
                  )}
                </b>
              </div>
              <div
                className="card"
                style={{ padding: 10, textAlign: "center" }}
              >
                <span style={{ fontSize: 10, color: "#aaa" }}>
                  Fase do Time (Últ. 5)
                </span>
                <br />
                <b style={{ color: "#fff", fontSize: 14, letterSpacing: 2 }}>
                  {(team.recentForm || []).length > 0
                    ? team.recentForm
                        .map((r) =>
                          r === "VITORIA" ? "🟢" : r === "EMPATE" ? "⚪" : "🔴",
                        )
                        .join("")
                    : "➖"}
                </b>
              </div>
            </div>

            <div className="card" style={{ borderLeft: "4px solid gold" }}>
              <h4 style={{ marginTop: 0, color: "gold" }}>
                💳 Mensalidade do Sócio
              </h4>
              <p style={{ fontSize: 10, color: "#aaa", marginBottom: 10 }}>
                Defina o valor da assinatura. Se cobrar muito caro, a massa
                torcedora cancelará o plano!
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <label
                  style={{ color: "gold", fontSize: 12, fontWeight: "bold" }}
                >
                  Preço Cobrado
                </label>
                <b style={{ color: "#fff" }}>{fmt(socioPrice)}</b>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={socioPrice}
                onChange={(e) => setSocioPrice(Number(e.target.value))}
                style={{ width: "100%", accentColor: "gold", marginBottom: 15 }}
              />

              <button
                className="btn btn-green"
                onClick={async () => {
                  await firebase
                    .firestore()
                    .collection("teams")
                    .doc(team.id)
                    .update({ socioPrice: socioPrice });
                  alert(
                    "Valor da mensalidade atualizado! Os sócios atuais já reagiram à mudança.",
                  );
                }}
                disabled={socioPrice === team.socioPrice}
              >
                SALVAR NOVA MENSALIDADE
              </button>
            </div>
          </div>
        )}
        <button
          className="btn btn-red"
          style={{ marginTop: 15 }}
          onClick={onClose}
        >
          FECHAR
        </button>
      </div>
    </div>
  );
};
