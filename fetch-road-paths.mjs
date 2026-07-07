import { readFileSync, writeFileSync } from "fs";

const routes = JSON.parse(readFileSync("routes-final.json", "utf-8"));

async function getRoadPath(stops) {
  // OSRM expects "lng,lat;lng,lat;..." in travel order
  const coords = stops.map((s) => `${s.lng},${s.lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.code !== "Ok" || !data.routes?.[0]) {
    console.warn(`  ⚠ Routing failed for this route, will fall back to straight lines`);
    return null;
  }

  // GeoJSON coordinates come as [lng, lat] - flip to {lat, lng} for react-native-maps
  return data.routes[0].geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
}

async function processRoutes() {
  const output = [];

  for (const route of routes) {
    const validStops = route.stops.filter(
      (s) => typeof s.lat === "number" && typeof s.lng === "number"
    );

    console.log(`Routing: ${route.name}`);

    if (validStops.length < 2) {
      console.warn(`  ⚠ Not enough valid stops, skipping`);
      output.push(route);
      continue;
    }

    const path = await getRoadPath(validStops);
    output.push({ ...route, path: path || undefined });

    // Be polite to the free public OSRM server
    await new Promise((r) => setTimeout(r, 1000));
  }

  writeFileSync("routes-with-paths.json", JSON.stringify(output, null, 2));
  console.log("\nDone. Saved to routes-with-paths.json");
}

processRoutes();
