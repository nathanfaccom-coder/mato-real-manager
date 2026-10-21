const BUYER_COLLECTIONS = {
  USER: "teams",
  PLAYER: "players",
  COACH: "users",
  DOCTOR: "users",
  SCOUT: "users",
  ASSISTANT: "users",
};
const FAME_CATEGORIES = new Set(["VEICULO", "IMOVEL", "TECNOLOGIA", "LUXO"]);

export async function purchaseProduct(
  db,
  fieldValue,
  { user, productId, sellerId, giftTarget, expectedPrice, now = Date.now() },
) {
  const collection = BUYER_COLLECTIONS[user?.type];
  if (!collection || !user.data?.id)
    throw new Error("Entre em uma conta para comprar.");
  const buyerRef = db.collection(collection).doc(user.data.id);
  const productRef = db.collection("products").doc(productId);
  const sellerRef = db.collection("companies").doc(sellerId);
  const saleRef = db.collection("sales").doc();
  const newsRef = db.collection("news").doc();
  const recipientRef = giftTarget
    ? db.collection("players").doc(giftTarget.id)
    : buyerRef;
  const today = new Date(now).toDateString();

  return db.runTransaction(async (tx) => {
    // Every decision uses the same transaction snapshot, including retries.
    const [buyerSnap, productSnap, sellerSnap, recipientSnap] =
      await Promise.all([
        tx.get(buyerRef),
        tx.get(productRef),
        tx.get(sellerRef),
        tx.get(recipientRef),
      ]);
    if (
      ![buyerSnap, productSnap, sellerSnap, recipientSnap].every(
        (doc) => doc.exists,
      )
    )
      throw new Error("Conta, produto ou destinatário não encontrado.");
    const buyer = buyerSnap.data();
    const prod = productSnap.data();
    const seller = sellerSnap.data();
    const recipient = recipientSnap.data();
    const price = Number(prod.price);
    const stock = Number(prod.stock);
    const balance = Number(buyer.balance || 0);
    if (!Number.isFinite(price) || price < 0 || !Number.isFinite(balance))
      throw new Error("Preço ou saldo inválido.");
    if (price !== Number(expectedPrice))
      throw new Error(
        "O preço mudou. Abra o produto novamente antes de comprar.",
      );
    if (prod.companyId !== sellerId || seller.status !== "ACTIVE")
      throw new Error("Esta loja não está disponível.");
    if (!Number.isFinite(stock) || stock < 1)
      throw new Error("Produto Esgotado!");
    if (balance < price) throw new Error("Saldo insuficiente!");
    const tracker = buyer.giftTracker || { date: "", count: 0 };
    const count = tracker.date === today ? Number(tracker.count) || 0 : 0;
    if (giftTarget && count >= 7)
      throw new Error(
        "Você atingiu o limite máximo de 7 presentes enviados por dia!",
      );
    const fameBonus = FAME_CATEGORIES.has(prod.cat)
      ? (parseInt(prod.power) || 0) * 100
      : 0;
    const updates = { balance: fieldValue.increment(-price) };
    if (giftTarget) updates.giftTracker = { date: today, count: count + 1 };
    tx.update(buyerRef, updates);
    tx.update(sellerRef, { balance: fieldValue.increment(price) });
    tx.update(productRef, { stock: fieldValue.increment(-1) });
    if (giftTarget && fameBonus > 0)
      tx.update(recipientRef, { fame: fieldValue.increment(fameBonus) });
    tx.set(saleRef, {
      companyId: sellerId,
      buyerId: recipientRef.id,
      buyerName: recipient.name || "",
      giftedBy: giftTarget ? buyer.name || "" : null,
      productOriginalId: productId,
      productName: prod.name || "",
      price,
      cost: 0,
      profit: price,
      img: prod.img || null,
      cat: prod.cat || "",
      power: parseInt(prod.power) || 0,
      fameGained: fameBonus,
      date: now,
    });
    if (giftTarget && (fameBonus > 0 || price > 500000)) {
      tx.set(newsRef, {
        text: `🎁 **MIMO DE LUXO!**\nO ${buyer.name} acabou de enviar um(a) **${prod.name}** caríssimo(a) de presente para **${recipient.name}**! O que será que está por trás dessa generosidade? 👀`,
        type: "biz",
        date: now,
        likes: [],
      });
    }
    return {
      fameBonus,
      balance: balance - price,
      giftTracker: updates.giftTracker || buyer.giftTracker,
    };
  });
}
