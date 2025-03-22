// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBw1C5i41xtDX9Vji5KXehZ-rOgLDs8zTg",
  authDomain: "stock-b81fc.firebaseapp.com",
  projectId: "stock-b81fc",
  storageBucket: "stock-b81fc.firebasestorage.app",
  messagingSenderId: "195218638690",
  appId: "1:195218638690:web:abcf2c531ae6d9b37d0e3b",
  measurementId: "G-TJTB92M3QG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
