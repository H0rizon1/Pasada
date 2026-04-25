import { View, StyleSheet } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 14.5995,
                    longitude: 120.9842,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
     },
     map: {
        width: '100%',
        height: '100%',
     },
});