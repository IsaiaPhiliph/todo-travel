// Firebase App (the core Firebase SDK) is always required and must be listed first
import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseFirestore, getFirestore } from "firebase/firestore";

// Add the Firebase products that you want to use

// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "./config";
let firebaseApp: FirebaseApp, db: FirebaseFirestore;
try {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore();
} catch (err) {
  console.log(err);
}
export { db };
export { firebaseApp };
