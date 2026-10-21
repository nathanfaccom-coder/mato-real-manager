export const CHAT_VISIBLE_LIMIT = 50;
export const CHAT_RETAIN_LIMIT = 60;

export async function trimChat(messagesRef, db) {
  // The UI only sees 50 messages: query the actual tail rather than its local count.
  // Use a document cursor so messages with the same date are handled correctly.
  const retained = await messagesRef
    .orderBy("date", "desc")
    .limit(CHAT_RETAIN_LIMIT)
    .get();
  if (retained.docs.length < CHAT_RETAIN_LIMIT) return;
  const tail = await messagesRef
    .orderBy("date", "desc")
    .startAfter(retained.docs.at(-1))
    .limit(100)
    .get();
  if (tail.empty) return;
  const batch = db.batch();
  tail.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
}
