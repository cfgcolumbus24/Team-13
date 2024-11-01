// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import dotenv from 'dotenv';

dotenv.config();

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: process.env.FB_API_KEY,

  authDomain: "team-13-cfg.firebaseapp.com",

  projectId: "team-13-cfg",

  storageBucket: "team-13-cfg.firebasestorage.app",

  messagingSenderId: process.env.FB_MSG_SENGER_ID,

  appId: process.env.FB_APP_ID,

  measurementId: process.env.FB_MEASUREMENT_ID,

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
