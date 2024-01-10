// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDphjj5nD7B52bGv38F1BMV4TcUZUsy2O4",
  authDomain: "money-app-a59bf.firebaseapp.com",
  projectId: "money-app-a59bf",
  storageBucket: "money-app-a59bf.appspot.com",
  messagingSenderId: "751721053608",
  appId: "1:751721053608:web:0a78762e2fe0ace246b19d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth  = getAuth();
const db = getFirestore();
export {auth, db};