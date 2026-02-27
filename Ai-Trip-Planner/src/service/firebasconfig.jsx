// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg4mH_E5e9U7dYSQLkangRZ0kKIC9SaDo",
  authDomain: "ai-trip-planner-c64d6.firebaseapp.com",
  projectId: "ai-trip-planner-c64d6",
  storageBucket: "ai-trip-planner-c64d6.firebasestorage.app",
  messagingSenderId: "116455497556",
  appId: "1:116455497556:web:811cb720b04848da4db2c1",
  measurementId: "G-W5ELSF2KW0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);