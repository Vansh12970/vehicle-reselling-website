// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

// Initialize Firebase app (avoid multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ---------------- Admin helper ----------------
// You can set a custom claim for admin users using Firebase Admin SDK
// This code runs only in server-side Node.js, NOT in browser
/*
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

// Example: Set admin claim for a user
const uid = "FIREBASE_USER_UID"; // get from Firebase Auth user UID
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => console.log("Admin claim set!"))
  .catch(console.error);
*/

// ---------------- Usage Notes ----------------
// 1. Use `auth.createUserWithEmailAndPassword(email, password)` for registration
// 2. Use `auth.signInWithEmailAndPassword(email, password)` for login
// 3. After login, you can check admin claim via custom token
//    or store a flag in Firestore (e.g., /admins/{uid})
// 4. For vehicle add/delete, use Firestore collection e.g., "vehicles"
//    - Admins can add docs
//    - Admins can delete docs
