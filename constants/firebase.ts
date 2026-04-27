import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzCAistcWJ89qi404pW0s6T7ELGYjeQu0",
  authDomain: "pasada-f7132.firebaseapp.com",
  projectId: "pasada-f7132",
  storageBucket: "pasada-f7132.firebasestorage.app",
  messagingSenderId: "631496588455",
  appId: "1:631496588455:web:578bf9514eb7a072b9af82"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);