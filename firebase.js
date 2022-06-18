import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtlkoMC8KVDeHC_qqgG3MvCvQooWaZQok",
  authDomain: "whatsapp-400e8.firebaseapp.com",
  projectId: "whatsapp-400e8",
  storageBucket: "whatsapp-400e8.appspot.com",
  messagingSenderId: "256547952749",
  appId: "1:256547952749:web:108bea69f2a5eb8ae20764",
  measurementId: "G-H56F5YZK3H",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
