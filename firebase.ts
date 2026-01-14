
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqsFgUtxpxxmiWKQDKqTJ_Meu08cJbI68",
  authDomain: "visum-ai-fa5f6.firebaseapp.com",
  projectId: "visum-ai-fa5f6",
  storageBucket: "visum-ai-fa5f6.firebasestorage.app",
  messagingSenderId: "712919694622",
  appId: "1:712919694622:web:6745c05ae293c831115d0f",
  measurementId: "G-CVCMMYQG4M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
