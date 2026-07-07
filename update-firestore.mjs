import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf-8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const routes = JSON.parse(readFileSync("./routes-with-paths.json", "utf-8"));

async function updateRoutes() {
  for (const route of routes) {
    const { id, ...fields } = route;

    // Also clean up the old "stop " (typo) field if it still exists on this doc
    delete fields["stop "];
    delete fields["stop"];

    await db.collection("routes").doc(id).set(fields, { merge: true });
    console.log(`✓ Updated ${id} - ${route.name}`);
  }
  console.log(`\nDone. Updated ${routes.length} routes.`);
}

updateRoutes().catch((err) => {
  console.error("Failed:", err);
});
