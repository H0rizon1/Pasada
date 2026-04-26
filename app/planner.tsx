import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from './constants/langcontext';

type Trip = {
  id: string;
  origin: string;
  destination: string;
  date: string;
};

export default function PlannerScreen() {
  const { language } = useLanguage();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const addTrip = () => {
    if (!origin || !destination) return;
    const newTrip: Trip = {
      id: Date.now().toString(),
      origin,
      destination,
      date: new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    setTrips(prev => [newTrip, ...prev]);
    setOrigin('');
    setDestination('');
    setModalVisible(false);
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'en' ? 'My Trips' : 'Mga Biyahe Ko'}
        </Text>
        <Text style={styles.subtitle}>
          {language === 'en' ? 'Plan your route ahead of time' : 'Planuhin ang iyong ruta nang maaga'}
        </Text>
      </View>

      {/* Trip List */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {trips.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="map-outline" size={60} color="#333" />
            <Text style={styles.emptyText}>
              {language === 'en' ? 'No trips planned yet' : 'Wala pang naplanong biyahe'}
            </Text>
            <Text style={styles.emptySubtext}>
              {language === 'en' ? 'Tap the + button to add one!' : 'I-tap ang + para magdagdag!'}
            </Text>
          </View>
        ) : (
          trips.map(trip => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripInfo}>
                {/* Origin */}
                <View style={styles.tripRow}>
                  <View style={styles.dotGreen} />
                  <Text style={styles.tripLocation}>{trip.origin}</Text>
                </View>
                {/* Dotted Line */}
                <View style={styles.dottedLine} />
                {/* Destination */}
                <View style={styles.tripRow}>
                  <View style={styles.dotRed} />
                  <Text style={styles.tripLocation}>{trip.destination}</Text>
                </View>
                <Text style={styles.tripDate}>{trip.date}</Text>
              </View>
              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTrip(trip.id)}>
                <Ionicons name="trash-outline" size={20} color="#e94560" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Trip FAB Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Add Trip Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language === 'en' ? 'Plan a Trip' : 'Mag-plano ng Biyahe'}
            </Text>

            {/* Origin Input */}
            <Text style={styles.inputLabel}>
              {language === 'en' ? 'From' : 'Mula sa'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={language === 'en' ? 'Enter origin...' : 'Ilagay ang simula...'}
              placeholderTextColor="#888"
              value={origin}
              onChangeText={setOrigin}
            />

            {/* Destination Input */}
            <Text style={styles.inputLabel}>
              {language === 'en' ? 'To' : 'Patungo sa'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={language === 'en' ? 'Enter destination...' : 'Ilagay ang patutunguhan...'}
              placeholderTextColor="#888"
              value={destination}
              onChangeText={setDestination}
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>
                  {language === 'en' ? 'Cancel' : 'Kanselahin'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={addTrip}>
                <Text style={styles.confirmText}>
                  {language === 'en' ? 'Add Trip' : 'Idagdag'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    gap: 12,
  },
  emptyText: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: '#444',
    fontSize: 14,
  },
  tripCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  tripInfo: {
    flex: 1,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4caf50',
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e94560',
  },
  dottedLine: {
    width: 2,
    height: 16,
    backgroundColor: '#333',
    marginLeft: 4,
    marginVertical: 2,
  },
  tripLocation: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  tripDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  deleteButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: '#e94560',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  inputLabel: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#888',
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#e94560',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});