import { initializeApp } from '@firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAf10Ek640MlkZ2UQR1Sakl8CcZwXhhdew",
  authDomain: "e-analogy-376310.firebaseapp.com",
  projectId: "e-analogy-376310",
  storageBucket: "e-analogy-376310.appspot.com",
  messagingSenderId: "759112845995",
  appId: "1:759112845995:web:23be0db53f3696c26445ee",
  measurementId: "G-1B2W05R9E2"
};


  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)
  export const rtdb = getDatabase(app)
  
  export default app;