import { OWNER_UID } from "../src/admin/permissions.js";
import { validDocumentId } from "../src/matches/validate.js";
import { POS } from "../src/game/POS.js";
import { NATION_BY_ID } from "../src/national/catalog.js";
import { generateAttributes } from "../src/game/generateAttributes.js";
import { appearance } from "../src/simulation/appearance.js";
const only = (value, keys) => {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.keys(value).some((k) => !keys.includes(k))
  )
    throw Error("Pedido inválido.");
};
const owner = (uid) => {
  if (uid !== OWNER_UID)
    throw Error("Somente o ADM principal pode decidir inscrições.");
};
async function verified(auth, uid) {
  if (!validDocumentId(uid) || uid === OWNER_UID)
    throw Error("Identidade inválida.");
  const identity = await auth.getUser(uid);
  if (identity.disabled || identity.emailVerified !== true || !identity.email)
    throw Error("Confirme o e-mail antes da inscrição.");
}
async function gate(db, tx) {
  for (const id of ["accountMigration", "playerRegistration"]) {
    const doc = await tx.get(db.collection("serverConfig").doc(id));
    if (
      !doc.exists ||
      doc.data().enabled !== true ||
      doc.data().schemaVersion !== 1
    )
      throw Error("Inscrições ainda não liberadas.");
  }
}
function profileOf(input) {
  only(input, [
    "name",
    "nationality",
    "position",
    "instagram",
    "pixelAppearance",
    "expectedRevision",
  ]);
  if (
    typeof input.name !== "string" ||
    input.name.trim().length < 2 ||
    input.name.length > 80 ||
    /[\x00-\x1f\x7f]/.test(input.name)
  )
    throw Error("Nome inválido.");
  if (
    typeof input.nationality !== "string" ||
    !Object.hasOwn(NATION_BY_ID, input.nationality) ||
    !POS.includes(input.position)
  )
    throw Error("Nacionalidade ou posição inválida.");
  if (
    typeof input.instagram !== "string" ||
    !/^@?[A-Za-z0-9._]{1,30}$/.test(input.instagram)
  )
    throw Error("Informe o usuário do Instagram, sem endereço ou espaços.");
  const look = input.pixelAppearance ?? {};
  only(look, [
    "skin",
    "hair",
    "eyes",
    "boots",
    "style",
    "beard",
    "sleeves",
    "number",
  ]);
  if (
    Object.values(look).some(
      (v) =>
        (typeof v !== "string" && typeof v !== "number") ||
        String(v).length > 30,
    )
  )
    throw Error("Aparência inválida.");
  if (
    !Number.isSafeInteger(input.expectedRevision) ||
    input.expectedRevision < 0
  )
    throw Error("Revisão inválida.");
  return {
    name: input.name.trim(),
    nationality: input.nationality,
    position: input.position,
    instagram: input.instagram.replace(/^@/, ""),
    pixelAppearance: appearance(look),
  };
}
const summary = (uid, row) => ({
  uid,
  status: row.status,
  revision: row.revision,
  playerId: row.playerId,
  name: row.profile.name,
  reason: row.decision?.reason || null,
});

export async function submitPlayerApplication(
  db,
  auth,
  uid,
  input,
  { now = Date.now(), newId = () => `p_${crypto.randomUUID()}` } = {},
) {
  const profile = profileOf(input);
  await verified(auth, uid);
  const playerId = newId();
  if (!validDocumentId(playerId)) throw Error("Identificador inválido.");
  return db.runTransaction(async (tx) => {
    await gate(db, tx);
    const ref = db.collection("playerApplications").doc(uid);
    const [doc, binding, admin] = await Promise.all([
      tx.get(ref),
      tx.get(db.collection("authAccounts").doc(uid)),
      tx.get(db.collection("adminProfiles").doc(uid)),
    ]);
    if (admin.exists)
      throw Error("Use uma identidade separada da conta administrativa.");
    const old = doc.exists ? doc.data() : null;
    if (
      old &&
      ["PENDING", "APPROVED"].includes(old.status) &&
      JSON.stringify(profileOf({...old.profile,expectedRevision:0})) === JSON.stringify(profile)
    )
      return { ...summary(uid, old), duplicate: true };
    if (binding.exists) throw Error("Essa identidade já possui um perfil.");
    if (
      old &&
      (old.status !== "REJECTED" || old.revision !== input.expectedRevision)
    )
      throw Error("Consulte a inscrição atual antes de reenviar.");
    if (!old && input.expectedRevision !== 0) throw Error("Revisão inválida.");
    const row = {
      profile,
      status: "PENDING",
      revision: (old?.revision || 0) + 1,
      playerId: old?.playerId || playerId,
      createdAt: old?.createdAt || now,
      updatedAt: now,
      decision: null,
    };
    tx.set(ref, row);
    tx.set(
      db.collection("playerApplicationAudit").doc(`${uid}_${row.revision}`),
      {
        uid,
        status: row.status,
        revision: row.revision,
        actor: uid,
        changedAt: now,
        action: "SUBMIT",
      },
    );
    return { ...summary(uid, row), duplicate: false };
  });
}
export async function readPlayerApplication(
  db,
  auth,
  actor,
  input,
  { administrator = false } = {},
) {
  only(input, administrator ? ["uid"] : []);
  const uid = administrator ? input.uid : actor;
  if (administrator) {
    owner(actor);
    if (!validDocumentId(uid)) throw Error("Identificador inválido.");
  } else await verified(auth, uid);
  return db.runTransaction(async (tx) => {
    await gate(db, tx);
    const doc = await tx.get(db.collection("playerApplications").doc(uid));
    if (!doc.exists) return { uid, application: null };
    const row = doc.data();
    return { uid, application: { ...summary(uid, row), profile: row.profile } };
  });
}
export async function decidePlayerApplication(
  db,
  auth,
  actor,
  input,
  { now = Date.now() } = {},
) {
  owner(actor);
  only(input, ["uid", "approve", "expectedRevision", "reason"]);
  const { uid, approve, expectedRevision, reason } = input;
  if (
    !validDocumentId(uid) ||
    typeof approve !== "boolean" ||
    !Number.isSafeInteger(expectedRevision) ||
    expectedRevision < 1 ||
    typeof reason !== "string" ||
    reason.trim().length < 3 ||
    reason.length > 500
  )
    throw Error("Decisão inválida.");
  if (approve) await verified(auth, uid);
  return db.runTransaction(async (tx) => {
    await gate(db, tx);
    const ref = db.collection("playerApplications").doc(uid),
      doc = await tx.get(ref);
    if (!doc.exists) throw Error("Inscrição não encontrada.");
    const row = doc.data(),
      status = approve ? "APPROVED" : "REJECTED";
    if (
      row.status === status &&
      row.revision === expectedRevision + 1 &&
      row.decision?.actor === actor &&
      row.decision?.reason === reason.trim()
    )
      return { ...summary(uid, row), duplicate: true };
    if (row.status !== "PENDING" || row.revision !== expectedRevision)
      throw Error("Inscrição mudou. Consulte novamente.");
    const revision = row.revision + 1;
    let playerRef, bindingRef, ownerRef;
    if (approve) {
      // All input is revalidated before public profile creation; no raw spread.
      const profile = profileOf({ ...row.profile, expectedRevision: 0 });
      if (!validDocumentId(row.playerId))
        throw Error("Inscrição inconsistente.");
      playerRef = db.collection("players").doc(row.playerId);
      bindingRef = db.collection("authAccounts").doc(uid);
      ownerRef = db
        .collection("accountEntityOwners")
        .doc(`players_${row.playerId}`);
      const snapshots = await Promise.all([
        tx.get(playerRef),
        tx.get(bindingRef),
        tx.get(ownerRef),
        tx.get(db.collection("adminProfiles").doc(uid)),
      ]);
      if (snapshots.some((d) => d.exists))
        throw Error("Perfil ou identidade já vinculados.");
      const overall = profile.position === "GOL" ? 60 : 45;
      tx.set(playerRef, {
        name: profile.name,
        nationality: profile.nationality,
        pixelAppearance: profile.pixelAppearance,
        position: profile.position,
        overall,
        attributes: generateAttributes(profile.position, overall),
        teamId: "FREE",
        status: "ACTIVE",
        balance: 0,
        salary: 1500,
        value: 40000,
        contract: 0,
        mood: "😐",
        fame: 0,
        energy: 100,
        pendingXP: 0,
        stats: {
          goals: 0,
          assists: 0,
          tackles: 0,
          saves: 0,
          yellows: 0,
          reds: 0,
        },
      });
      tx.set(bindingRef, {
        type: "PLAYER",
        entityId: row.playerId,
        active: true,
        revision: 1,
        createdAt: now,
        updatedAt: now,
        createdBy: actor,
      });
      tx.set(ownerRef, {
        uid,
        type: "PLAYER",
        entityId: row.playerId,
        createdAt: now,
      });
      tx.set(db.collection("accountBindingAudit").doc(`${uid}_1`), {
        uid,
        type: "PLAYER",
        entityId: row.playerId,
        active: true,
        revision: 1,
        actor,
        changedAt: now,
        action: "APPROVE_APPLICATION",
      });
    }
    tx.update(ref, {
      status,
      revision,
      updatedAt: now,
      decision: { actor, reason: reason.trim() },
    });
    tx.set(db.collection("playerApplicationAudit").doc(`${uid}_${revision}`), {
      uid,
      status,
      revision,
      actor,
      changedAt: now,
      reason: reason.trim(),
      action: approve ? "APPROVE" : "REJECT",
    });
    return {
      ...summary(uid, {
        ...row,
        status,
        revision,
        decision: { reason: reason.trim() },
      }),
      duplicate: false,
    };
  });
}
