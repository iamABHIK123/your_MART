// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBK7Slog8dfQy0_sgIG53_5yz1S7-mpEPM",
  authDomain: "yourmart-16aed.firebaseapp.com",
  databaseURL: "https://yourmart-16aed-default-rtdb.firebaseio.com",
  projectId: "yourmart-16aed",
  storageBucket: "yourmart-16aed.appspot.com",
  messagingSenderId: "293873656437",
  appId: "1:293873656437:web:d8b8daea318fd699814e3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);