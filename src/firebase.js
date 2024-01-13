import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDphjj5nD7B52bGv38F1BMV4TcUZUsy2O4",
  authDomain: "money-app-a59bf.firebaseapp.com",
  projectId: "money-app-a59bf",
  storageBucket: "money-app-a59bf.appspot.com",
  messagingSenderId: "751721053608",
  appId: "1:751721053608:web:0a78762e2fe0ace246b19d"
};

initializeApp(firebaseConfig);
const auth  = getAuth();
const db = getFirestore();
export {auth, db};