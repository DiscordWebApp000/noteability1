// src/firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbVIUfx56oow-OERFGTEvaHshNeyhuyq8",
  authDomain: "noteability-2d5e3.firebaseapp.com",
  projectId: "noteability-2d5e3",
  storageBucket: "noteability-2d5e3.firebasestorage.app",
  messagingSenderId: "999459422851",
  appId: "1:999459422851:web:d708684a7cdf61324c91b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 