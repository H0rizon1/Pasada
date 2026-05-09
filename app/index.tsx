import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../constants/langcontext";
import { useTheme } from "../constants/ThemeContext";

export default function HomeScreen() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme, colors } = useTheme();
  const [compareVisible, setCompareVisible] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.morning;
    if (hour < 18) return t.afternoon;
    return t.evening;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.greeting, { color: colors.subtitle }]}>
            {getGreeting()}
          </Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={toggleTheme}
            >
              <Ionicons
                name={theme === "dark" ? "sunny" : "moon"}
                size={16}
                color={colors.heading}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={toggleLanguage}
            >
              <Text style={[styles.langToggleText, { color: colors.text }]}>
                {language === "en" ? "🇵🇭" : "🇬🇧"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.title, { color: colors.heading }]}>Pasada</Text>
        <Text style={[styles.subtitle, { color: colors.subtitle }]}>
          {t.app}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder={t.search}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.heading }]}
        >
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.quick_actions}
      </Text>
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.card }]}
          onPress={() => router.push("/planner")}
        >
          <View style={[styles.iconCircle, { borderColor: colors.cardBorder }]}>
            <Ionicons name="map" size={28} color={colors.heading} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t.plan}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.card }]}
          onPress={() => router.push("/routes")}
        >
          <View style={[styles.iconCircle, { borderColor: colors.cardBorder }]}>
            <Ionicons name="bus" size={28} color={colors.heading} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t.routes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.card }]}
        >
          <View style={[styles.iconCircle, { borderColor: colors.cardBorder }]}>
            <Ionicons name="location" size={28} color={colors.heading} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t.near_me}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.card }]}
          onPress={() => setCompareVisible(true)}
        >
          <View style={[styles.iconCircle, { borderColor: colors.cardBorder }]}>
            <Ionicons name="wallet" size={28} color={colors.heading} />
          </View>
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t.compare}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recent Trips */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.recents}
      </Text>
      <View
        style={[
          styles.recentCard,
          {
            backgroundColor: colors.cardSecondary,
            borderLeftColor: colors.heading,
          },
        ]}
      >
        <Text style={[styles.recentRoute, { color: colors.text }]}>
          Makati → Quezon City
        </Text>
        <Text style={[styles.recentDetails, { color: colors.subtitle }]}>
          LRT-1 → MRT-3 → Jeepney · ₱45
        </Text>
      </View>
      <View
        style={[
          styles.recentCard,
          {
            backgroundColor: colors.cardSecondary,
            borderLeftColor: colors.heading,
          },
        ]}
      >
        <Text style={[styles.recentRoute, { color: colors.text }]}>
          Taguig → Manila
        </Text>
        <Text style={[styles.recentDetails, { color: colors.subtitle }]}>
          E-trike → LRT-1 · ₱28
        </Text>
      </View>

      {/* Compare Modal */}
      <Modal
        visible={compareVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCompareVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.heading }]}>
                {language === "en"
                  ? "Cost Comparison"
                  : "Paghahambing ng Gastos"}
              </Text>
              <TouchableOpacity onPress={() => setCompareVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtitle, { color: colors.subtitle }]}>
              {language === "en"
                ? "Public transit vs private car"
                : "Pampublikong sasakyan vs sariling sasakyan"}
            </Text>

            <View
              style={[
                styles.routeLabel,
                { backgroundColor: colors.cardSecondary },
              ]}
            >
              <Ionicons name="navigate" size={16} color={colors.heading} />
              <Text style={[styles.routeLabelText, { color: colors.text }]}>
                Makati → Quezon City
              </Text>
            </View>

            <View style={styles.cardsRow}>
              <View
                style={[
                  styles.compareCard,
                  {
                    backgroundColor: colors.cardSecondary,
                    borderColor: "#4caf50",
                  },
                ]}
              >
                <Ionicons name="bus" size={28} color="#4caf50" />
                <Text style={[styles.compareCardTitle, { color: colors.text }]}>
                  {language === "en" ? "Public Transit" : "Pampubliko"}
                </Text>
                <Text style={[styles.compareValue, { color: colors.text }]}>
                  ₱45
                </Text>
                <Text style={[styles.compareLabel, { color: colors.subtitle }]}>
                  {language === "en" ? "Cost" : "Gastos"}
                </Text>
                <Text style={[styles.compareValue, { color: colors.text }]}>
                  42 mins
                </Text>
                <Text style={[styles.compareLabel, { color: colors.subtitle }]}>
                  {language === "en" ? "Travel Time" : "Oras"}
                </Text>
                <Text style={[styles.compareBadge, { color: "#4caf50" }]}>
                  ✅ {language === "en" ? "Recommended" : "Inirerekomenda"}
                </Text>
              </View>

              <View
                style={[
                  styles.compareCard,
                  {
                    backgroundColor: colors.cardSecondary,
                    borderColor: "#e94560",
                  },
                ]}
              >
                <Ionicons name="car" size={28} color={colors.heading} />
                <Text style={[styles.compareCardTitle, { color: colors.text }]}>
                  {language === "en" ? "Private Car" : "Sariling Sasakyan"}
                </Text>
                <Text style={[styles.compareValue, { color: colors.text }]}>
                  ₱320
                </Text>
                <Text style={[styles.compareLabel, { color: colors.subtitle }]}>
                  {language === "en" ? "Cost" : "Gastos"}
                </Text>
                <Text style={[styles.compareValue, { color: colors.text }]}>
                  1hr 10mins
                </Text>
                <Text style={[styles.compareLabel, { color: colors.subtitle }]}>
                  {language === "en" ? "Travel Time" : "Oras"}
                </Text>
                <Text style={[styles.compareBadge, { color: "#e94560" }]}>
                  ❌ {language === "en" ? "Costly" : "Mahal"}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.savingsCard,
                {
                  backgroundColor: colors.cardSecondary,
                  borderColor: colors.heading,
                },
              ]}
            >
              <Text style={[styles.savingsTitle, { color: colors.text }]}>
                🎉{" "}
                {language === "en"
                  ? "You save with public transit!"
                  : "Makatipid ka sa pampublikong sasakyan!"}
              </Text>
              <View style={styles.savingsRow}>
                <View style={styles.savingsStat}>
                  <Text
                    style={[styles.savingsValue, { color: colors.heading }]}
                  >
                    ₱275
                  </Text>
                  <Text
                    style={[styles.savingsLabel, { color: colors.subtitle }]}
                  >
                    {language === "en" ? "Money Saved" : "Natipid na Pera"}
                  </Text>
                </View>
                <View style={styles.savingsStat}>
                  <Text
                    style={[styles.savingsValue, { color: colors.heading }]}
                  >
                    28 mins
                  </Text>
                  <Text
                    style={[styles.savingsLabel, { color: colors.subtitle }]}
                  >
                    {language === "en" ? "Time Saved" : "Natipid na Oras"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingTop: 30 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  greeting: { fontSize: 14 },
  toggleRow: { flexDirection: "row", gap: 8 },
  toggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  langToggleText: { fontSize: 14 },
  title: { fontSize: 42, fontWeight: "bold" },
  subtitle: { fontSize: 14, marginTop: 4 },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  searchButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 24,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "45%",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: { fontSize: 14, fontWeight: "600", marginTop: 8 },
  recentCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  recentRoute: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  recentDetails: { fontSize: 13 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 12,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: { fontSize: 24, fontWeight: "bold" },
  modalSubtitle: { fontSize: 13 },
  routeLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  routeLabelText: { fontSize: 15, fontWeight: "600" },
  cardsRow: { flexDirection: "row", gap: 12 },
  compareCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
  },
  compareCardTitle: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
  compareValue: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  compareLabel: { fontSize: 11 },
  compareBadge: { fontSize: 11, fontWeight: "bold", marginTop: 8 },
  savingsCard: { borderRadius: 16, padding: 16, borderWidth: 1 },
  savingsTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  savingsRow: { flexDirection: "row", justifyContent: "space-around" },
  savingsStat: { alignItems: "center" },
  savingsValue: { fontSize: 22, fontWeight: "bold" },
  savingsLabel: { fontSize: 12, marginTop: 4 },
});
