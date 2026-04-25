import { Text, View, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pasada</Text>
      <Text style={styles.subtitle}>Your Smart Way Through the City</Text>
    </View>
  );
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#e94560",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    opacity: 0.7,
  },
 });
