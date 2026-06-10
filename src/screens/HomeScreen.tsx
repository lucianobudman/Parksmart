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
import { openGoogleMaps, generateMockParkings, filterNearbyParkings } from '../utils/googleMapsUtils';
import { useUserLocation } from '../hooks/useUserLocation';

const RADIUS_KM = 4;

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const { location, loading: locationLoading, error: locationError } = useUserLocation();
  
  const allParkings = generateMockParkings();
  const nearbyParkings = location
    ? filterNearbyParkings(allParkings, location.latitude, location.longitude, RADIUS_KM)
    : [];

  if (!authContext) {
    return null;
  }

  const { user, loading, logout } = authContext;

  if (loading || locationLoading) {
    return (
      <View style={[globalStyles.container, globalStyles.centered]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 12 }}>Obteniendo ubicación...</Text>
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

      {locationError ? (
        <View style={globalStyles.card}>
          <Text style={{ color: '#FF3B30', fontWeight: '600' }}>{locationError}</Text>
          <Text style={{ color: '#666', marginTop: 8 }}>Por favor habilita los permisos de ubicación</Text>
        </View>
      ) : location ? (
        <Text style={{ marginBottom: 12, color: '#007AFF', fontWeight: '600' }}>
          Parkings cercanos ({nearbyParkings.length})
        </Text>
      ) : null}

      <ScrollView>
        {nearbyParkings.length > 0 ? (
          nearbyParkings.map((parking) => (
            <View key={parking.id} style={globalStyles.card}>
              <Text style={globalStyles.subtitle}>{parking.name}</Text>
              <Text style={{ color: '#666', marginBottom: 8 }}>
                Tarifa: {parking.fee === 'yes' ? 'Pago' : 'Gratuito'}
              </Text>
              <Text style={{ color: '#999', fontSize: 12, marginBottom: 12 }}>
                Distancia: {parking.distance.toFixed(2)} km
              </Text>
              <TouchableOpacity
                style={globalStyles.button}
                onPress={() => handleOpenMaps(parking.lat, parking.lon, parking.name)}
              >
                <Text style={globalStyles.buttonText}>Abrir en Google Maps</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={globalStyles.card}>
            <Text style={{ textAlign: 'center', color: '#999' }}>
              No hay parkings cercanos en un radio de {RADIUS_KM} km
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
