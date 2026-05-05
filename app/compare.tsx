import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../constants/langcontext";

export default function CompareScreen() {
  const { language } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === "en" ? "Cost Comparison" : "Paghahambing ng Gastos"}
        </Text>
        <Text style={styles.subtitle}>
          {language === "en"
            ? "Public transit | Private Car"
            : "Pampublikong sasakyan | Sariling sasakyan"}
        </Text>
      </View>

      <View style={styles.routeLabel}>
        <Ionicons name="navigate" size={16} color="#e94560" />
        <Text style={styles.routeLabelText}>Makati → Quezon City</Text>
      </View>

      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.cardLeft]}>
          <Ionicons name="bus" size={32} color="#4caf50" />
          <Text style={styles.cardTitle}>
            {language === "en" ? "Public Transit" : "Pampubliko"}
          </Text>
          <View style={styles.stat}>
            <Text style={styles.statValue}>₱45</Text>
            <Text style={styles.statLabel}>
              {language === "en" ? "Cost" : "Gastos"}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>42 mins</Text>
            <Text style={styles.statLabel}>
              {language === "en" ? "Travel Time" : "Oras ng Biyahe"}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>Low 🌿</Text>
            <Text style={styles.statLabel}>CO₂</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {language === "en" ? "✅ Recommended" : "✅ Inirerekomenda"}
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.cardRight]}>
          <Ionicons name="car" size={32} color="#e94560" />
          <Text style={styles.cardTitle}>
            {language === "en" ? "Private Car" : "Sariling Sasakyan"}
          </Text>
          <View style={styles.stat}>
            <Text style={styles.statValue}>₱320</Text>
            <Text style={styles.statLabel}>
              {language === "en" ? "Cost" : "Gastos"}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>1hr 10mins</Text>
            <Text style={styles.statLabel}>
              {language === "en" ? "Travel Time" : "Oras ng Biyahe"}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>High 🏭</Text>
            <Text style={styles.statLabel}>CO₂</Text>
          </View>
          <View style={[styles.badge, styles.badgeRed]}>
            <Text style={styles.badgeText}>
              {language === "en" ? "❌ Costly" : "❌ Mahal"}
            </Text>
          </View>
        </View>
      </View>

      {/* Savings Summary */}
      <View style={styles.savingsCard}>
        <Text style={styles.savingsTitle}>
          {language === "en"
            ? "🎉 You save with public transit!"
            : "🎉 Makatipid ka sa pampublikong sasakyan!"}
        </Text>
        <View style={styles.savingsRow}>
          <View style={styles.savingsStat}>
            <Text style={styles.savingsValue}>₱275</Text>
            <Text style={styles.savingsLabel}>
              {language === "en" ? "Money Saved" : "Natipid na Pera"}
            </Text>
          </View>
          <View style={styles.savingsStat}>
            <Text style={styles.savingsValue}>28 mins</Text>
            <Text style={styles.savingsLabel}>
              {language === "en" ? "Time Saved" : "Natipid na Oras"}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  header: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  routeLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 24,
    backgroundColor: "#16213e",
    padding: 12,
    borderRadius: 12,
  },
  routeLabelText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  cardsRow: {
    flexDirection: "row",
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  cardLeft: {
    backgroundColor: "#1a2e1a",
    borderWidth: 1,
    borderColor: "#4caf50",
  },
  cardRight: {
    backgroundColor: "#2e1a1a",
    borderWidth: 1,
    borderColor: "#e94560",
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#4caf5033",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeRed: {
    backgroundColor: "#e9456033",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  savingsCard: {
    backgroundColor: "#16213e",
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#e94560",
  },
  savingsTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  savingsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  savingsStat: {
    alignItems: "center",
  },
  savingsValue: {
    color: "#e94560",
    fontSize: 24,
    fontWeight: "bold",
  },
  savingsLabel: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
});
