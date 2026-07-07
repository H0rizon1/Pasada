import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { writeFileSync } from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyDzCAistcWJ89qi404pW0s6T7ELGYjeQu0",
  authDomain: "pasada-f7132.firebaseapp.com",
  projectId: "pasada-f7132",
  storageBucket: "pasada-f7132.firebasestorage.app",
  messagingSenderId: "631496588455",
  appId: "1:631496588455:web:578bf9514eb7a072b9af82",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "routes"));
const data = [];
querySnapshot.forEach((doc) => {
  data.push({ id: doc.id, ...doc.data() });
});

writeFileSync("routes-export.json", JSON.stringify(data, null, 2));
console.log(`Exported ${data.length} routes to routes-export.json`);
