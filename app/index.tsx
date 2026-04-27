import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../constants/langcontext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { t, language, toggleLanguage } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.morning;
    if (hour < 18) return t.afternoon;
    return t.evening;
  };


  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          {/* Language Toggle */}
          <TouchableOpacity style={styles.langToggle} onPress={toggleLanguage}>
            <Text style={styles.langToggleText}>
              {language === 'en' ? '🇵🇭 FIL' : '🇬🇧 EN'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Pasada</Text>
        <Text style={styles.subtitle}>{t.app}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t.search}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>{t.quick_actions}</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="map" size={28} color="#e94560" />
          <Text style={styles.actionText}>{t.plan}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="bus" size={28} color="#e94560" />
          <Text style={styles.actionText}>{t.routes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="location" size={28} color="#e94560" />
          <Text style={styles.actionText}>{t.near_me}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="cash" size={28} color="#e94560" />
          <Text style={styles.actionText}>{t.compare}</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Trips */}
      <Text style={styles.sectionTitle}>{t.recents}</Text>
      <View style={styles.recentCard}>
        <Text style={styles.recentRoute}>Makati → Quezon City</Text>
        <Text style={styles.recentDetails}>LRT-1 → MRT-3 → Jeepney · ₱45</Text>
      </View>
      <View style={styles.recentCard}>
        <Text style={styles.recentRoute}>Taguig → Manila</Text>
        <Text style={styles.recentDetails}>E-trike → LRT-1 · ₱28</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 14,
    color: '#888',
  },
  langToggle: {
    backgroundColor: '#16213e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e94560',
  },
  langToggleText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#e94560',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#16213e',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#e94560',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 24,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '45%',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  recentCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  recentRoute: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recentDetails: {
    color: '#888',
    fontSize: 13,
  },
});