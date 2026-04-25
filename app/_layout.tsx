import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#e94560',
        },
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#888',
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#ffffff',
      }}>
      <Tabs.Screen name="index" options={{ title: "Home" }}/>
      <Tabs.Screen name="planner" options={{ title: "Plan Trip" }}/>
      <Tabs.Screen name="map" options={{ title: "Map" }}/>
      <Tabs.Screen name="routes" options={{ title: "Routes" }}/>
    </Tabs>
  );
}
