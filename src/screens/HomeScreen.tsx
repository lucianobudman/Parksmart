import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';
import { openGoogleMaps, generateMockParkings } from '../utils/googleMapsUtils';

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const parkings = generateMockParkings();

  if (!authContext) {
    return null;
  }

  const { user, loading, logout } = authContext;

  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.centered]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  const handleOpenMaps = (lat: number, lon: number, name: string) => {
    openGoogleMaps(lat, lon, name);
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text style={globalStyles.title}>Parkings</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FF3B30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }}
          onPress={handleLogout}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginBottom: 12, color: '#666' }}>Sesión: {user?.email}</Text>

      <ScrollView>
        {parkings.map((parking) => (
          <View key={parking.id} style={globalStyles.card}>
            <Text style={globalStyles.subtitle}>{parking.name}</Text>
            <Text style={{ color: '#666', marginBottom: 8 }}>
              Tarifa: {parking.fee === 'yes' ? 'Pago' : 'Gratuito'}
            </Text>
            <Text style={{ color: '#999', fontSize: 12, marginBottom: 12 }}>
              Coordenadas: {parking.lat}, {parking.lon}
            </Text>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => handleOpenMaps(parking.lat, parking.lon, parking.name)}
            >
              <Text style={globalStyles.buttonText}>Abrir en Google Maps</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
