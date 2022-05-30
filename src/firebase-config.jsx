// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATm8o43f7tUDy04yYyX2jPSVoLgfwaVh4",
  authDomain: "pokedex-92d3f.firebaseapp.com",
  projectId: "pokedex-92d3f",
  storageBucket: "pokedex-92d3f.appspot.com",
  messagingSenderId: "655082409950",
  appId: "1:655082409950:web:aa309b22a065ff77c9974f",
  measurementId: "G-RTVG452KE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);