import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 💡 โหลดค่า Firebase Config ทั้งหมดจาก Environment Variables (.env.local และ Vercel)
// โค้ดนี้จะดึงค่าจาก VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, ฯลฯ
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Services
export const auth = getAuth(app); // สำหรับ Login/Logout
export const db = getFirestore(app); // สำหรับ Database (Credit Management)
export const googleProvider = new GoogleAuthProvider(); // สำหรับ Google Login Popup