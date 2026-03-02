// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Glh-z3JdSV24l8G8LS0CfBz8YgOSYQk",
  authDomain: "products-showcase-c4a87.firebaseapp.com",
  projectId: "products-showcase-c4a87",
  storageBucket: "products-showcase-c4a87.firebasestorage.app",
  messagingSenderId: "169508916353",
  appId: "1:169508916353:web:3968d22a53dfe9fee91180",
  measurementId: "G-WE683XG2R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { db, auth }