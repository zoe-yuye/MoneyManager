import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
};

initializeApp(firebaseConfig);
const auth  = getAuth();
const db = getFirestore();
export {auth, db};