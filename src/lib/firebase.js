import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH8BiBb-SjDi-J2iEQWygMDTEcmi0-e1M",
  authDomain: "barbachos-4a0dd.firebaseapp.com",
  projectId: "barbachos-4a0dd",
  storageBucket: "barbachos-4a0dd.firebasestorage.app",
  messagingSenderId: "206139196271",
  appId: "1:206139196271:web:6582a093acf4e683d09e9a",
  measurementId: "G-FZ0KYXGL47"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
