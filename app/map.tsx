import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { db } from "../constants/firebase";
import { useLanguage } from "../constants/langcontext";
import { useTheme } from "../constants/ThemeContext";

type Stop = {
  name: string;
  lat: number | null;
  lng: number | null;
};

type Route = {
  id: string;
  name: string;
  type: string;
  fare: number;
  duration: string;
  stops: Stop[];
  path?: { lat: number; lng: number }[];
  operator?: string;
  schedule?: string;
};

// Makati city-center default view
const MAKATI_REGION = {
  latitude: 14.5547,
  longitude: 121.0244,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export default function MapScreen() {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "routes"));
      const data: Route[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Route);
      });
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { key: "all", label: language === "en" ? "All" : "Lahat" },
    { key: "jeepney", label: "Jeepney" },
    { key: "ejeepney", label: "E-Jeepney" },
    { key: "p2p", label: "P2P" },
  ];

  // Case-insensitive match so "P2P" in Firestore matches the "p2p" filter key
  const filteredRoutes =
    selectedType === "all"
      ? routes
      : routes.filter(
          (r) => r.type?.toLowerCase() === selectedType.toLowerCase()
        );

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "jeepney":
        return "#FF8C42";
      case "ejeepney":
        return "#4caf50";
      case "p2p":
        return "#5ba3e0";
      default:
        return "#FF8C42";
    }
  };

  // Only stops with real, valid numeric coordinates can be drawn.
  // Guards against nulls, missing fields, and values stored as text in Firestore
  // (e.g. "14.5605" instead of 14.5605), which is what caused the native crash.
  const validStops = (route: Route) =>
    (route.stops || []).filter(
      (s) =>
        typeof s?.lat === "number" &&
        typeof s?.lng === "number" &&
        isFinite(s.lat) &&
        isFinite(s.lng)
    );

  // Prefer the road-following path (from OSRM) if we have one; otherwise
  // fall back to straight lines between stops so the route still draws.
  const getDrawablePath = (route: Route) => {
    const validPath = (route.path || []).filter(
      (p) =>
        typeof p?.lat === "number" &&
        typeof p?.lng === "number" &&
        isFinite(p.lat) &&
        isFinite(p.lng)
    );
    if (validPath.length >= 2) {
      return validPath.map((p) => ({ latitude: p.lat, longitude: p.lng }));
    }
    return validStops(route).map((s) => ({
      latitude: s.lat as number,
      longitude: s.lng as number,
    }));
  };

  const handleSelectRoute = (route: Route) => {
    const isDeselecting = selectedRouteId === route.id;
    setSelectedRouteId(isDeselecting ? null : route.id);

    if (!isDeselecting && mapRef) {
      const stops = validStops(route);
      if (stops.length > 0) {
        mapRef.fitToCoordinates(
          stops.map((s) => ({
            latitude: s.lat as number,
            longitude: s.lng as number,
          })),
          {
            edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
            animated: true,
          }
        );
      }
    }
  };

  const routesToDraw = selectedRouteId
    ? filteredRoutes.filter((r) => r.id === selectedRouteId)
    : filteredRoutes;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.mapWrapper}>
        <MapView
          ref={setMapRef}
          style={styles.map}
          initialRegion={MAKATI_REGION}
        >
          {routesToDraw.map((route) => {
            const stops = validStops(route);
            if (stops.length < 2) return null;

            const color = getTypeColor(route.type);
            const drawablePath = getDrawablePath(route);

            return (
              <View key={route.id}>
                <Polyline
                  coordinates={drawablePath}
                  strokeColor={color}
                  strokeWidth={4}
                />
                {stops.map((stop, index) => (
                  <Marker
                    key={`${route.id}-${index}`}
                    coordinate={{
                      latitude: stop.lat as number,
                      longitude: stop.lng as number,
                    }}
                    title={stop.name}
                    description={route.name}
                    pinColor={
                      index === 0
                        ? "#4caf50"
                        : index === stops.length - 1
                          ? "#e94560"
                          : color
                    }
                  />
                ))}
              </View>
            );
          })}
        </MapView>

        {loading && (
          <View style={styles.mapLoadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.filterRow, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedType === filter.key
                    ? colors.heading
                    : colors.cardSecondary,
              },
            ]}
            onPress={() => {
              setSelectedType(filter.key);
              setSelectedRouteId(null);
            }}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedType === filter.key ? "#fff" : colors.subtitle,
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Route chips - tap to focus map on that route */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.routeRow, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.filterContent}
      >
        {filteredRoutes.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={[
              styles.routeChip,
              {
                backgroundColor: colors.cardSecondary,
                borderColor:
                  selectedRouteId === route.id
                    ? getTypeColor(route.type)
                    : "transparent",
              },
            ]}
            onPress={() => handleSelectRoute(route)}
          >
            <Ionicons
              name="bus"
              size={14}
              color={getTypeColor(route.type)}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[styles.routeChipText, { color: colors.text }]}
              numberOfLines={1}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapWrapper: { flex: 1 },
  map: { width: "100%", height: "100%" },
  mapLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  filterRow: { maxHeight: 50, flexGrow: 0 },
  routeRow: { maxHeight: 50, flexGrow: 0, borderTopWidth: 1, borderTopColor: "#222" },
  filterContent: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: { fontSize: 13, fontWeight: "600" },
  routeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    maxWidth: 200,
  },
  routeChipText: { fontSize: 12, fontWeight: "600" },
});
