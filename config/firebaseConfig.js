// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
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
  measurementId: "G-EXEPHKCS96",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Wrap analytics initialization to ensure it only runs in supported environments
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized successfully.");
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  }).catch((error) => {
    console.error("Error initializing Firebase Analytics:", error);
  });
}
