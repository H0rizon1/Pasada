import { readFileSync, writeFileSync } from "fs";

// Load the routes you exported earlier
const routes = JSON.parse(readFileSync("routes-export.json", "utf-8"));

// Collect every unique stop name across all routes
const uniqueStops = new Set();
for (const route of routes) {
  const stops = route.stops || route["stop "] || route["stop"] || [];
  for (const stop of stops) uniqueStops.add(stop);
}

console.log(`Found ${uniqueStops.size} unique stops. Geocoding...`);

const coordCache = {};

async function geocode(stopName) {
  // Bias search toward Makati / Metro Manila, Philippines for accuracy
  const query = encodeURIComponent(`${stopName}, Makati, Metro Manila, Philippines`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": "PasadaApp/1.0 (route mapping feature)" },
  });
  const data = await res.json();

  if (data.length === 0) {
    console.warn(`  ⚠ No result for "${stopName}" — will need manual coordinates`);
    return null;
  }

  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

// Nominatim requires max 1 request/second — geocode sequentially with a delay
for (const stop of uniqueStops) {
  const coords = await geocode(stop);
  coordCache[stop] = coords;
  console.log(`  ${coords ? "✓" : "✗"} ${stop}`, coords || "");
  await new Promise((r) => setTimeout(r, 1100)); // respect rate limit
}

// Now rebuild routes with coordinates attached to each stop
const routesWithCoords = routes.map((route) => {
  const stopNames = route.stops || route["stop "] || route["stop"] || [];
  const stopsWithCoords = stopNames.map((name) => ({
    name,
    lat: coordCache[name]?.lat ?? null,
    lng: coordCache[name]?.lng ?? null,
  }));
  return { ...route, stops: stopsWithCoords };
});

writeFileSync("routes-with-coords.json", JSON.stringify(routesWithCoords, null, 2));
console.log("\nDone. Saved to routes-with-coords.json");
console.log("Check for any 'null' lat/lng values — those need manual fixing.");
