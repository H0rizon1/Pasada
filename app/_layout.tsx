import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { LanguageProvider } from "../constants/langcontext";
import { ThemeProvider } from "../constants/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#1a1a2e",
              borderTopColor: "#FF8C42",
            },
            tabBarItemStyle: {
              justifyContent: "center",
              alignItems: "center",
            },
            tabBarActiveTintColor: "#FF8C42",
            tabBarInactiveTintColor: "#888",
            headerStyle: { backgroundColor: "#1a1a2e" },
            headerTintColor: "#ffffff",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="planner"
            options={{
              title: "Plan Trip",
              tabBarIcon: ({ color }) => (
                <Ionicons name="map" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              title: "Map",
              tabBarIcon: ({ color }) => (
                <Ionicons name="navigate" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="routes"
            options={{
              title: "Routes",
              tabBarIcon: ({ color }) => (
                <Ionicons name="bus" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="compare"
            options={{
              tabBarButton: () => null,
            }}
          />
        </Tabs>
      </LanguageProvider>
    </ThemeProvider>
  );
}
