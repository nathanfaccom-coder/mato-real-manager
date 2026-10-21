import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBrtJFfWAqT0AZYHlm4it-noB5h9jIPJEI",
  authDomain: "gerenciador-de-times-matoreal.firebaseapp.com",
  projectId: "gerenciador-de-times-matoreal",
  storageBucket: "gerenciador-de-times-matoreal.firebasestorage.app",
  messagingSenderId: "29096266740",
  appId: "1:29096266740:web:ec48e7225c18c20dbc07a1",
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true }).catch((error) => {
  if (!["failed-precondition", "unimplemented"].includes(error.code))
    console.warn("Cache indisponível:", error.code);
});
export { firebase, db };
