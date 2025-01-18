// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0y80LYZYjHEshbiFjWO0D3RwyNs-pv24",
  authDomain: "tourvista-8d760.firebaseapp.com",
  projectId: "tourvista-8d760",
  storageBucket: "tourvista-8d760.firebasestorage.app",
  messagingSenderId: "134272761189",
  appId: "1:134272761189:web:14d704d7bdb3d2070d358c",
  measurementId: "G-7S2XL6MWC6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);