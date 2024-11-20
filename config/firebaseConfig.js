// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "brainbox-e3042.firebaseapp.com",
  projectId: "brainbox-e3042",
  storageBucket: "brainbox-e3042.firebasestorage.app",
  messagingSenderId: "637761253865",
  appId: "1:637761253865:web:7516a16c697cb5ee925b78",
  measurementId: "G-EXEPHKCS96"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
const analytics = getAnalytics(app);