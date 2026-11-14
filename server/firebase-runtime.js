import process from 'node:process';
import {initializeApp,cert,deleteApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {initializeFirestore} from 'firebase-admin/firestore';
import {createMatchHandler} from './match-http.js';
export const FIREBASE_PROJECT='gerenciador-de-times-matoreal';

// Server-side secrets only. Never import this module from the browser bundle.
// Uses the official SDK's REST transport rather than a custom transaction client.
export function createFirebaseRuntime({serviceAccount,enabled=false,appName='mato-real-match-server'}={}) {
 if(!serviceAccount||serviceAccount.project_id!==FIREBASE_PROJECT||typeof serviceAccount.client_email!=='string'||typeof serviceAccount.private_key!=='string')throw Error('Credencial de servidor inválida para Mato Real.');
 if(process.env.FIRESTORE_EMULATOR_HOST||process.env.FIREBASE_AUTH_EMULATOR_HOST)throw Error('Emulador não permitido no runtime de produção.');
 const app=initializeApp({projectId:FIREBASE_PROJECT,credential:cert(serviceAccount)},appName);
 const db=initializeFirestore(app,{preferRest:true});
 const auth=getAuth(app);
 return {db,auth,fetch:createMatchHandler({db,auth,enabled}),close:()=>deleteApp(app)};
}
