import { readFileSync, writeFileSync } from "fs";

const routes = JSON.parse(readFileSync("routes-with-coords.json", "utf-8"));

// Manually verified coordinates for stops Nominatim couldn't find.
// ⚠️ Double-check the ones marked "verify" — these are generic/ambiguous
// names and the coordinate is a reasonable estimate, not a confirmed pin.
const manualOverrides = {
  "Makati Ave/North Dr": { lat: 14.5605, lng: 121.0290 }, // verify
  "JP Rizal Ave": { lat: 14.5620, lng: 121.0400 }, // verify - generic avenue name, used at multiple points
  "Don Chino Roces Ave/Pryce Center": { lat: 14.5665, lng: 121.0135 },
  "Ayala Ave/B. Yakal": { lat: 14.5665, lng: 121.0130 }, // verify
  "EDSA/Buendia (MRT Buendia)": { lat: 14.5563, lng: 121.0038 },
  "Mandaluyong City Hall": { lat: 14.5766, lng: 121.0347 },
  "Alabang Town Center": { lat: 14.4188, lng: 121.0393 },
  "Cartimar": { lat: 14.5460, lng: 120.9958 },
  "EDSA/Buendia": { lat: 14.5563, lng: 121.0038 },
  "Brgy. Buting": { lat: 14.5679, lng: 121.0729 }, // verify - assuming Buting, Pasig
  "JP Rizal Extension": { lat: 14.5650, lng: 121.0420 }, // verify
  "L. Guinto": { lat: 14.5670, lng: 121.0700 }, // verify
  "JP Rizal": { lat: 14.5620, lng: 121.0400 }, // verify - same as JP Rizal Ave
  "Quezon City Terminal": { lat: 14.6760, lng: 121.0437 }, // verify - generic name, ambiguous location
};

let filledCount = 0;
let stillMissing = [];

const finalRoutes = routes.map((route) => {
  const stops = route.stops.map((stop) => {
    if (stop.lat !== null && stop.lng !== null) return stop;

    const override = manualOverrides[stop.name];
    if (override) {
      filledCount++;
      return { ...stop, ...override };
    }

    stillMissing.push(stop.name);
    return stop;
  });
  return { ...route, stops };
});

writeFileSync("routes-final.json", JSON.stringify(finalRoutes, null, 2));

console.log(`Filled ${filledCount} missing coordinates.`);
if (stillMissing.length > 0) {
  console.log(`Still missing (need manual lookup):`, stillMissing);
} else {
  console.log(`All stops now have coordinates. Saved to routes-final.json`);
}
