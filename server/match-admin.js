import {OWNER_UID} from '../src/admin/permissions.js';
import {validDocumentId} from '../src/matches/validate.js';

export async function requireMatchAdmin(tx,db,uid) {
 if(!validDocumentId(uid))throw Error('Entre na sua conta.');
 if(uid===OWNER_UID)return;
 const snap=await tx.get(db.collection('adminProfiles').doc(uid));
 const p=snap.exists?snap.data():null;
 if(p?.active!==true||!Array.isArray(p.permissions)||!p.permissions.includes('competitions'))throw Error('Apenas ADM de competições podem registrar partidas.');
}
