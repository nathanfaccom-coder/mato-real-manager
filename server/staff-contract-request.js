import {validDocumentId} from '../src/matches/validate.js';
const reject = message => Object.assign(Error(message), {code: 'STAFF_CONTRACT_REQUEST_REJECTED'});

// Creates a proposal only. Salary and employment change only through a decision.
export async function requestStaffContract(db, uid, input, {now = Date.now()} = {}) {
  const salary = input?.requestedSalary;
  if (!validDocumentId(uid) || !input || Array.isArray(input) ||
      Object.keys(input).some(k => !['requestId', 'kind', 'requestedSalary'].includes(k)) ||
      !validDocumentId(input.requestId) || !['RAISE', 'RESIGN_REQ'].includes(input.kind) ||
      (input.kind === 'RAISE' ? typeof salary !== 'number' || !Number.isFinite(salary) || salary <= 0 ||
        !Number.isSafeInteger(Math.round(salary * 100)) || Math.abs(salary * 100 - Math.round(salary * 100)) > 0.00001 : salary !== null)) {
    throw reject('Pedido inválido.');
  }
  const offerRef = db.collection('offers').doc();
  return db.runTransaction(async tx => {
    const ref = (c, id) => db.collection(c).doc(id);
    const read = async r => { const s = await tx.get(r); return s.exists ? s.data() : null; };
    const gate = await read(ref('serverConfig', 'matchAutomation'));
    if (gate?.enabled !== true || gate.schemaVersion !== 1) throw reject('Integração desativada.');
    const account = await read(ref('authAccounts', uid));
    if (account?.active !== true || !['COACH', 'DOCTOR', 'SCOUT', 'ASSISTANT'].includes(account.type) ||
        !validDocumentId(account.entityId) || !Number.isSafeInteger(account.revision) || account.revision < 1) throw reject('Vínculo inválido.');
    const owner = await read(ref('accountEntityOwners', `users_${account.entityId}`));
    if (owner?.uid !== uid || owner.type !== account.type || owner.entityId !== account.entityId) throw reject('Titular inválido.');
    const staff = await read(ref('users', account.entityId));
    if (staff?.status !== 'ACTIVE' || staff.type !== account.type) throw reject('Profissional indisponível.');
    const receiptRef = ref(`serverConfig/staffContractRequest_${uid}/operations`, input.requestId);
    const receipt = await read(receiptRef);
    if (receipt) {
      if (receipt.staffId !== account.entityId || receipt.role !== account.type || receipt.kind !== input.kind || receipt.requestedSalary !== salary) throw reject('Pedido já utilizado.');
      return {...receipt.result, duplicate: true};
    }
    if (!validDocumentId(staff.teamId) || staff.teamId === 'FREE') throw reject('Profissional sem clube.');
    const team = await read(ref('teams', staff.teamId));
    if (team?.status !== 'ACTIVE') throw reject('Clube indisponível.');
    if (await read(ref('matchParticipantLocks', `team_${staff.teamId}`))) throw reject('Clube em partida.');
    if (input.kind === 'RAISE' && (typeof staff.salary !== 'number' || !Number.isFinite(staff.salary) || salary <= staff.salary)) throw reject('O valor deve ser maior que o salário atual.');
    const teamName = typeof team.name === 'string' ? team.name : 'Clube';
    const coachName = typeof staff.name === 'string' ? staff.name : 'Profissional';
    const money = n => n.toLocaleString('pt-BR', {maximumFractionDigits: 2});
    const offer = {type: input.kind === 'RAISE' ? 'COACH_RAISE' : 'COACH_RESIGN',
      recipientId: staff.teamId, senderId: account.entityId, teamName, coachName,
      status: 'PENDING', date: now, serverCreated: true,
      description: input.kind === 'RAISE' ? `💰 **PEDIDO DE AUMENTO**\nO técnico **${coachName}** pede um reajuste salarial.\nAtual: ${money(staff.salary)} ➝ Pedido: ${money(salary)}` : `👋 **PEDIDO DE DESLIGAMENTO**\nO técnico **${coachName}** deseja rescindir o contrato amigavelmente (sem multa).`};
    if (input.kind === 'RAISE') Object.assign(offer, {currentSalary: staff.salary, requestedSalary: salary});
    const result = {offerId: offerRef.id, duplicate: false};
    tx.set(offerRef, offer);
    tx.set(receiptRef, {staffId: account.entityId, role: account.type, kind: input.kind, requestedSalary: salary, createdAt: now, result});
    return result;
  });
}
