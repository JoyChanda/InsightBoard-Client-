// src/firebase/firebase.config.jsx

// Import Firebase SDK
import { initializeApp } from "firebase/app";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1RNyIvbptJDtDpQtVggmaSVtHFPzfgBk",
  authDomain: "insightboard-client.firebaseapp.com",
  projectId: "insightboard-client",
  storageBucket: "insightboard-client.firebasestorage.app",
  messagingSenderId: "513430991106",
  appId: "1:513430991106:web:05adc9f64c7192a85dd21b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
