import { View, Text, StyleSheet } from 'react-native';

export default function RoutesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Routes</Text>
            <Text style={styles.sub}>Coming Soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 28, fontWeight: 'bold', color: '#e94560' },
    sub: { fontSize: 14, color: '#888', marginTop: 8 },
});