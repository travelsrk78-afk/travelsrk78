import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

export const ADMIN_EMAIL = env.VITE_ADMIN_EMAIL || "";
export const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app = null;
export const db = configured ? getFirestore((app = initializeApp(firebaseConfig))) : null;
// Auth is created lazily so the public site never pulls it in unless the admin page asks.
export const getAuthLazy = () => (configured ? getAuth(app) : null);
