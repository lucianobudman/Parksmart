import React, { useContext, useState } from 'react';
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
  const [showTestParking, setShowTestParking] = useState(false);
  
  let allParkings = generateMockParkings();
  
  if (showTestParking && location) {
    allParkings = [
      ...allParkings,
      {
        id: 999,
        name: '🧪 Parking Test',
        lat: location.latitude,
        lon: location.longitude,
        fee: 'no',
      },
    ];
  }
  
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
      <View style={globalStyles.header}>
        <View>
          <Text style={[globalStyles.title, { marginBottom: 4 }]}>🅿️ Parkings</Text>
          <Text style={globalStyles.textSecondary}>{nearbyParkings.length} encontrados</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF3B30',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 2,
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Sesión info */}
      <View style={[globalStyles.card, { borderLeftColor: '#50C878', marginBottom: 16 }]}>
        <Text style={{ color: '#50C878', fontWeight: '600', marginBottom: 4 }}>✓ Sesión Activa</Text>
        <Text style={globalStyles.textSecondary}>{user?.email}</Text>
      </View>

      {/* Test parking button */}
      {location && (
        <TouchableOpacity
          style={{
            backgroundColor: showTestParking ? '#4CAF50' : '#FF9800',
            borderRadius: 12,
            paddingVertical: 12,
            marginBottom: 16,
            elevation: 2,
          }}
          onPress={() => setShowTestParking(!showTestParking)}
        >
          <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: 14 }}>
            {showTestParking ? '✓ Parking Test Activo' : '+ Agregar Parking Test'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Error handling */}
      {locationError && (
        <View style={[globalStyles.card, { borderLeftColor: '#FF3B30', marginBottom: 16 }]}>
          <Text style={{ color: '#FF3B30', fontWeight: '600', marginBottom: 4 }}>⚠️ {locationError}</Text>
          <Text style={globalStyles.textSecondary}>Habilita los permisos de ubicación en configuración</Text>
        </View>
      )}

      {/* Parkings list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {nearbyParkings.length > 0 ? (
          nearbyParkings.map((parking) => (
            <View
              key={parking.id}
              style={[
                parking.fee === 'yes' ? globalStyles.cardPremium : globalStyles.card,
              ]}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={globalStyles.subtitle}>{parking.name}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 6 }}>
                    {parking.fee === 'yes' ? (
                      <View style={globalStyles.badge}>
                        <Text style={globalStyles.badgeText}>💳 Pago</Text>
                      </View>
                    ) : (
                      <View style={[globalStyles.badge, { backgroundColor: '#E8F5E9' }]}>
                        <Text style={[globalStyles.badgeText, { color: '#4CAF50' }]}>✓ Gratuito</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={{ backgroundColor: '#E3F2FD', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 }}>
                  <Text style={{ color: '#007AFF', fontWeight: '700', fontSize: 14 }}>
                    {parking.distance.toFixed(1)} km
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={globalStyles.button}
                onPress={() => handleOpenMaps(parking.lat, parking.lon, parking.name)}
              >
                <Text style={globalStyles.buttonText}>📍 Abrir en Google Maps</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={[globalStyles.card, { alignItems: 'center', paddingVertical: 40 }]}>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>📍</Text>
            <Text style={globalStyles.subtitle}>Sin parkings cercanos</Text>
            <Text style={globalStyles.textSecondary}>
              No hay parkings en un radio de {RADIUS_KM}km
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

