import { trimChat } from "../services/chat.js";
import { firebase } from "../services/firebase.js";
import { db } from "../services/firebase.js";

export function createSocialActions(context, actions) {
  const { user, posts, setChatMessages } = context;

  const postNews = (text, type = "normal") => {
    return db.collection("news").add({
      text,
      type,
      date: Date.now(),
    });
  };

  const handleSocialPost = async (text, img) => {
    const b = db.batch();
    const newPostRef = db.collection("posts").doc();

    // 1. Cria o post
    b.set(newPostRef, {
      authorId: user.data.id,
      authorName: user.data.name,
      authorLogo: user.data.logo || user.data.face || null,
      text: text,
      img: img,
      date: Date.now(),
      likes: [],
    });

    // 2. Trava de Segurança (FIFO - Limite 50)
    if (posts.length >= 50) {
      const oldestPost = posts[posts.length - 1]; // O último da lista é o mais velho
      if (oldestPost) {
        const oldRef = db.collection("posts").doc(oldestPost.id);
        b.delete(oldRef);
      }
    }

    await b.commit();
  };

  const handleSocialLike = async (post) => {
    const uid = user.data.id;
    const isLiked = (post.likes || []).includes(uid);

    if (isLiked) {
      await db
        .collection("posts")
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      await db
        .collection("posts")
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  };

  const handleSocialDelete = async (pid) => {
    if (confirm("Apagar esta publicação?")) {
      await db.collection("posts").doc(pid).delete();
    }
  };

  const subscribeToChat = (chatId) => {
    return db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("date", "desc")
      .limit(50) // Só as últimas 50
      .onSnapshot((snap) => {
        const msgs = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .reverse(); // Inverte para ficar cronológico
        setChatMessages(msgs);
      });
  };

  const sendChatMessage = async (chatId, text) => {
    if (!text.trim()) return;
    const msgRef = db.collection("chats").doc(chatId).collection("messages");

    await msgRef.add({
      text: text,
      authorId: user.data.id,
      authorName: user.data.name,
      authorType: user.type, // Para colorir o nome (Admin, Jogador, etc)
      date: Date.now(),
    });

    // Cleanup failure must not make a successfully sent message look unsent.
    trimChat(msgRef, db).catch((error) =>
      console.warn("Limpeza do chat adiada:", error.code),
    );
  };

  const toggleFollow = async (targetId) => {
    const myRef =
      user.type === "USER"
        ? db.collection("teams").doc(user.data.id)
        : db.collection("players").doc(user.data.id);
    const myFollowing = user.data.following || [];

    if (myFollowing.includes(targetId)) {
      // Deixar de Seguir
      await myRef.update({
        following: firebase.firestore.FieldValue.arrayRemove(targetId),
      });
      alert("Deixou de seguir.");
    } else {
      // Seguir
      await myRef.update({
        following: firebase.firestore.FieldValue.arrayUnion(targetId),
      });
      alert("Seguindo!");
    }
  };
  return {
    postNews,
    handleSocialPost,
    handleSocialLike,
    handleSocialDelete,
    subscribeToChat,
    sendChatMessage,
    toggleFollow,
  };
}
