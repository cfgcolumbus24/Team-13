// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "team-13-cfg.firebaseapp.com",
  databaseURL: "https://team-13-cfg-default-rtdb.firebaseio.com",
  projectId: "team-13-cfg",
  storageBucket: "team-13-cfg.firebasestorage.app",
  messagingSenderId: "1057549171332",
  appId: "1:1057549171332:web:83adfb0b7bc935630020d1",
  measurementId: "G-8PN2XE26H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)