import { Tabs } from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import { LanguageProvider } from './constants/langcontext';

export default function Layout() {
    return (
      <LanguageProvider>
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#1a1a2e',
              borderTopColor: '#1a1a2e',
            },
            tabBarActiveTintColor: '#e94560',
            tabBarInactiveTintColor: '#888',
            headerStyle: { backgroundColor: '#1a1a2e' },
            headerTintColor: '#ffffff',
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="planner"
            options={{
              title: 'Plan Trip',
              tabBarIcon: ({ color }) => (
                <Ionicons name="map" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              title: 'Map',
              tabBarIcon: ({ color }) => (
                <Ionicons name="navigate" size={22} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="routes"
            options={{
              title: 'Routes',
              tabBarIcon: ({ color }) => (
                <Ionicons name="bus" size={22} color={color} />
              ),
            }}
          />
          </Tabs>
      </LanguageProvider>
    );
}