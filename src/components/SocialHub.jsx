import React, { useState, useEffect } from "react";

export const SocialHub = ({
  user,
  posts,
  onPost,
  onLike,
  onDeletePost,
  onSendChat,
  onSubChat,
  messages,
  onFollow,
}) => {
  const [tab, setTab] = useState("FEED"); // FEED, PERFIL, CHAT
  const [subChat, setSubChat] = useState("GLOBAL"); // GLOBAL, TEAM

  // Estados de input
  const [newText, setNewText] = useState("");
  const [newImg, setNewImg] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [zoomedImg, setZoomedImg] = useState(null); // Guarda a URL da imagem clicada
  // Efeito para ligar o Chat quando muda a aba
  useEffect(() => {
    if (tab === "CHAT") {
      const chatId =
        subChat === "GLOBAL"
          ? "GLOBAL_CHAT"
          : `TEAM_${user.data.teamId || "FREE"}`;
      if (
        subChat === "TEAM" &&
        (!user.data.teamId || user.data.teamId === "FREE")
      )
        return; // Sem time não tem chat de time

      const unsub = onSubChat(chatId);
      return () => unsub && unsub(); // Desliga ao sair
    }
  }, [tab, subChat, user.data.teamId]);

  // Compressão de Imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_W = 600;
        let w = img.width;
        let h = img.height;
        if (w > MAX_W) {
          h *= MAX_W / w;
          w = MAX_W;
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        setNewImg(canvas.toDataURL("image/jpeg", 0.7));
      };
    };
  };

  const submitPost = async () => {
    if (!newText && !newImg) return alert("Escreva algo!");
    setLoading(true);
    await onPost(newText, newImg);
    setNewText("");
    setNewImg(null);
    setLoading(false);
    setTab("FEED"); // Volta pro feed ao postar
  };

  const handleChatSubmit = () => {
    const chatId =
      subChat === "GLOBAL" ? "GLOBAL_CHAT" : `TEAM_${user.data.teamId}`;
    onSendChat(chatId, chatInput);
    setChatInput("");
  };

  // Filtros de Posts
  const myPosts = posts.filter((p) => p.authorId === user.data.id);

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* CABEÇALHO DE NAVEGAÇÃO SOCIAL */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 15,
          background: "#222",
          padding: 10,
          borderRadius: 10,
          justifyContent: "space-around",
        }}
      >
        <button
          className={`btn btn-ghost ${tab === "FEED" ? "active-tab" : ""}`}
          style={{
            border: "none",
            color: tab === "FEED" ? "var(--primary)" : "#666",
          }}
          onClick={() => setTab("FEED")}
        >
          <i className="fas fa-home"></i> FEED
        </button>
        <button
          className={`btn btn-ghost ${tab === "CHAT" ? "active-tab" : ""}`}
          style={{ border: "none", color: tab === "CHAT" ? "cyan" : "#666" }}
          onClick={() => setTab("CHAT")}
        >
          <i className="fas fa-comments"></i> CHAT
        </button>
        <button
          className={`btn btn-ghost ${tab === "PERFIL" ? "active-tab" : ""}`}
          style={{ border: "none", color: tab === "PERFIL" ? "gold" : "#666" }}
          onClick={() => setTab("PERFIL")}
        >
          <i className="fas fa-user"></i> PERFIL
        </button>
      </div>

      {/* --- ABA 1: FEED GERAL --- */}
      {tab === "FEED" && (
        <div>
          {/* ÁREA DE POSTAR (Compacta) */}
          <div
            className="card"
            style={{
              marginBottom: 15,
              border: "1px solid #444",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={() => document.getElementById("feed-img").click()}
            >
              📷
            </div>
            <input
              className="input-field"
              placeholder="No que você está pensando?"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              style={{ marginBottom: 0, borderRadius: 20 }}
            />
            <button
              className="btn btn-purple"
              style={{ width: "auto", borderRadius: 20, marginBottom: 0 }}
              onClick={submitPost}
              disabled={loading}
            >
              ➤
            </button>
            <input
              id="feed-img"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          {newImg && (
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <img src={newImg} style={{ height: 100, borderRadius: 10 }} />
              <button
                className="btn btn-red"
                style={{ width: "auto" }}
                onClick={() => setNewImg(null)}
              >
                X
              </button>
            </div>
          )}

          {posts.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ padding: 0, overflow: "hidden", marginBottom: 15 }}
            >
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                {p.authorLogo ? (
                  <img
                    src={p.authorLogo}
                    style={{ width: 30, height: 30, borderRadius: "50%" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      background: "#333",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
                <div>
                  <b style={{ fontSize: 13 }}>{p.authorName}</b>
                  <div style={{ fontSize: 9, color: "#888" }}>
                    {new Date(p.date).toLocaleString()}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                  {/* Botão Seguir (Se não for eu) */}
                  {user.data.id !== p.authorId && (
                    <button
                      className="btn btn-ghost"
                      style={{
                        padding: "2px 8px",
                        fontSize: 10,
                        border: "1px solid #555",
                      }}
                      onClick={() => onFollow(p.authorId)}
                    >
                      {(user.data.following || []).includes(p.authorId)
                        ? "Seguindo"
                        : "Seguir"}
                    </button>
                  )}
                  {(user.type === "ADMIN" || user.data.id === p.authorId) && (
                    <i
                      className="fas fa-trash"
                      style={{ color: "#666", cursor: "pointer" }}
                      onClick={() => onDeletePost(p.id)}
                    ></i>
                  )}
                </div>
              </div>
              {p.img && (
                <img
                  src={p.img}
                  onClick={() => setZoomedImg(p.img)}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  title="Clique para ampliar"
                />
              )}
              {p.text && (
                <div style={{ padding: "10px 10px 5px 10px", fontSize: 13 }}>
                  {p.text}
                </div>
              )}
              <div
                style={{
                  padding: 10,
                  borderTop: "1px solid #333",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: (p.likes || []).includes(user.data.id)
                      ? "red"
                      : "#ccc",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                  onClick={() => onLike(p)}
                >
                  ❤
                </button>
                <span style={{ fontSize: 12, fontWeight: "bold" }}>
                  {(p.likes || []).length}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- ABA 2: CHAT --- */}
      {tab === "CHAT" && (
        <div>
          <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
            <button
              className={`btn ${subChat === "GLOBAL" ? "btn-blue" : "btn-ghost"}`}
              onClick={() => setSubChat("GLOBAL")}
            >
              🌍 GLOBAL
            </button>
            <button
              className={`btn ${subChat === "TEAM" ? "btn-green" : "btn-ghost"}`}
              onClick={() => setSubChat("TEAM")}
            >
              🛡️ TIME
            </button>
          </div>

          {subChat === "TEAM" &&
          (!user.data.teamId || user.data.teamId === "FREE") ? (
            <div className="card" style={{ textAlign: "center", padding: 30 }}>
              🚫 Você precisa estar em um time para acessar o vestiário.
            </div>
          ) : (
            <div
              className="card"
              style={{
                height: "60vh",
                display: "flex",
                flexDirection: "column",
                padding: 0,
                overflow: "hidden",
                background: "#121212",
              }}
            >
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf:
                        m.authorId === user.data.id ? "flex-end" : "flex-start",
                      maxWidth: "80%",
                    }}
                  >
                    <small
                      style={{
                        display: "block",
                        fontSize: 9,
                        color: "#888",
                        marginBottom: 2,
                        textAlign:
                          m.authorId === user.data.id ? "right" : "left",
                      }}
                    >
                      {m.authorName} {m.authorType === "ADMIN" && "👑"}
                    </small>
                    <div
                      style={{
                        background:
                          m.authorId === user.data.id
                            ? "var(--primary)"
                            : "#333",
                        color: m.authorId === user.data.id ? "#000" : "#fff",
                        padding: "8px 12px",
                        borderRadius: 10,
                        fontSize: 13,
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#444",
                      marginTop: 50,
                    }}
                  >
                    Nenhuma mensagem aqui...
                  </p>
                )}
              </div>
              <div
                style={{
                  padding: 10,
                  background: "#1e1e1e",
                  display: "flex",
                  gap: 10,
                }}
              >
                <input
                  className="input-field"
                  placeholder="Mensagem..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{ marginBottom: 0, borderRadius: 20 }}
                  onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
                />
                <button
                  className="btn btn-blue"
                  style={{
                    marginBottom: 0,
                    borderRadius: "50%",
                    height: 40,
                    width: 40,
                    padding: 0,
                  }}
                  onClick={handleChatSubmit}
                >
                  ➤
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- ABA 3: PERFIL (MatoGram) --- */}
      {tab === "PERFIL" && (
        <div>
          <div
            className="card"
            style={{
              textAlign: "center",
              background: "linear-gradient(180deg, #1e1e1e 0%, #000 100%)",
            }}
          >
            {user.data.face || user.data.logo ? (
              <img
                src={user.data.face || user.data.logo}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "3px solid var(--gold)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#333",
                  margin: "0 auto",
                }}
              ></div>
            )}
            <h2>{user.data.name}</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                margin: "15px 0",
              }}
            >
              <div>
                <b>{myPosts.length}</b>
                <br />
                <small style={{ color: "#888" }}>Posts</small>
              </div>
              <div>
                <b>{(user.data.followers || []).length || 0}</b>
                <br />
                <small style={{ color: "#888" }}>Seguidores</small>
              </div>
              <div>
                <b>{(user.data.following || []).length || 0}</b>
                <br />
                <small style={{ color: "#888" }}>Seguindo</small>
              </div>
            </div>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 10 }}
              onClick={() => {
                alert(
                  "Para editar sua foto ou nome, volte à tela INÍCIO e clique no ícone de Câmera 📷 (Jogadores/Técnicos) ou na Engrenagem ⚙️ (Clubes).",
                );
              }}
            >
              EDITAR PERFIL
            </button>
          </div>

          <h4 style={{ marginLeft: 5, marginTop: 20 }}>📸 Minhas Fotos</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
            }}
          >
            {myPosts.map((p) => (
              <div
                key={p.id}
                style={{
                  aspectRatio: "1/1",
                  background: "#222",
                  position: "relative",
                }}
              >
                {p.img ? (
                  <img
                    src={p.img}
                    onClick={() => setZoomedImg(p.img)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    title="Clique para ampliar"
                  />
                ) : (
                  <div
                    style={{
                      display: "grid",
                      placeItems: "center",
                      height: "100%",
                      fontSize: 20,
                    }}
                  >
                    📝
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    fontSize: 10,
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  ❤ {p.likes ? p.likes.length : 0}
                </div>
              </div>
            ))}
          </div>
          {myPosts.length === 0 && (
            <p style={{ textAlign: "center", color: "#666", marginTop: 30 }}>
              Você ainda não postou nada.
            </p>
          )}
        </div>
      )}

      {/* --- MODAL DE ZOOM DA IMAGEM --- */}
      {zoomedImg && (
        <div
          className="modal-overlay"
          style={{ zIndex: 99999, background: "rgba(0,0,0,0.9)" }}
          onClick={() => setZoomedImg(null)}
        >
          <div
            className="animate-in"
            style={{
              position: "relative",
              maxWidth: "95vw",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de Fechar flutuante */}
            <button
              className="btn btn-red"
              style={{
                position: "absolute",
                top: -15,
                right: -15,
                width: 40,
                height: 40,
                borderRadius: "50%",
                padding: 0,
                margin: 0,
                zIndex: 10,
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
              onClick={() => setZoomedImg(null)}
            >
              X
            </button>

            {/* Imagem Grande (contain para não cortar nada) */}
            <img
              src={zoomedImg}
              style={{
                width: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
