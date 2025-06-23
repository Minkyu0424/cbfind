// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 로그인 연동 예정이면 포함
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 이미지 업로드용
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGd2PvYnnZK2Izq6P-vHZ8O2NpxKWpWhI",
  authDomain: "foundyourlost-d53fa.firebaseapp.com",
  projectId: "foundyourlost-d53fa",
  storageBucket: "foundyourlost-d53fa.firebasestorage.app",
  messagingSenderId: "197656765016",
  appId: "1:197656765016:web:88c7877bfb624830f8a02d",
  measurementId: "G-1YH2FFTZR7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//FireBase services
export const db = getFirestore(app); // 🔥 Firestore DB
export const auth = getAuth(app); // 🔐 인증 (학번 로그인용)
export const storage = getStorage(app); // 🖼 Storage (사진 업로드용)
//const analytics = getAnalytics(app);
