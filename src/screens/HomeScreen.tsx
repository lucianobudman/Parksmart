import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';
import { openGoogleMaps, generateMockParkings, filterNearbyParkings } from '../utils/googleMapsUtils';
import { useUserLocation } from '../hooks/useUserLocation';
import { createParking, getParkings, ParkingItem } from '../services/parkingService';
import { getFavoriteParkings, toggleFavoriteParking } from '../services/favoritesService';

const RADIUS_KM = 4;
const FALLBACK_LOCATION = {
  latitude: -34.6037,
  longitude: -58.3816,
};

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const { location, loading: locationLoading, error: locationError } = useUserLocation();
  const [showTestParking, setShowTestParking] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [parkingName, setParkingName] = useState('');
  const [parkingFee, setParkingFee] = useState<'yes' | 'no'>('no');
  const [parkingVehicles, setParkingVehicles] = useState<string[]>(['auto']);
  const [isSaving, setIsSaving] = useState(false);
  const [parkings, setParkings] = useState<ParkingItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteLoadingId, setFavoriteLoadingId] = useState<string | null>(null);

  if (!authContext) {
    return null;
  }

  const { user, loading, logout } = authContext;
  const resolvedLocation = location ?? FALLBACK_LOCATION;

  useEffect(() => {
    const loadParkings = async () => {
      try {
        const remoteParkings = await getParkings();
        setParkings(remoteParkings);
      } catch (error) {
        console.log('No se pudieron cargar parkings', error);
      }
    };

    loadParkings();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.uid) {
        setFavoriteIds([]);
        return;
      }

      try {
        const favorites = await getFavoriteParkings(user.uid);
        setFavoriteIds(favorites.map((favorite) => String(favorite.id)));
      } catch (error) {
        console.log('No se pudieron cargar favoritos', error);
      }
    };

    loadFavorites();
  }, [user?.uid]);

  const allParkings = [
    ...generateMockParkings(),
    ...parkings,
    ...(showTestParking
      ? [
          {
            id: 999,
            name: '🧪 Parking Test',
            lat: resolvedLocation.latitude,
            lon: resolvedLocation.longitude,
            fee: 'no' as const,
            availableFor: ['auto', 'moto', 'camioneta'] as const,
          },
        ]
      : []),
  ];

  const nearbyParkings = filterNearbyParkings(
    allParkings,
    resolvedLocation.latitude,
    resolvedLocation.longitude,
    RADIUS_KM,
    user?.vehicleType,
  );

  const fallbackParkings = filterNearbyParkings(
    allParkings,
    resolvedLocation.latitude,
    resolvedLocation.longitude,
    20,
    user?.vehicleType,
  );

  const displayParkings = nearbyParkings.length > 0 ? nearbyParkings : fallbackParkings;
  const showFallbackMessage = nearbyParkings.length === 0 && fallbackParkings.length > 0;

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

  const toggleVehicle = (vehicle: string) => {
    setParkingVehicles((prev) =>
      prev.includes(vehicle) ? prev.filter((item) => item !== vehicle) : [...prev, vehicle],
    );
  };

  const handleToggleFavorite = async (parking: ParkingItem) => {
    if (!user?.uid) {
      Alert.alert('Sesión requerida', 'Inicia sesión para guardar favoritos');
      return;
    }

    setFavoriteLoadingId(String(parking.id));

    try {
      const isFavorite = await toggleFavoriteParking(user.uid, parking);
      setFavoriteIds((prev) =>
        isFavorite ? [...prev, String(parking.id)] : prev.filter((id) => id !== String(parking.id)),
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el favorito');
    } finally {
      setFavoriteLoadingId(null);
    }
  };

  const handleCreateParking = async () => {
    if (!parkingName.trim()) {
      Alert.alert('Completa el nombre', 'Ingresa un nombre para el parking');
      return;
    }

    if (user?.role !== 'admin') {
      Alert.alert('Acceso denegado', 'Solo los administradores pueden crear parkings');
      return;
    }

    setIsSaving(true);
    try {
      const created = await createParking({
        name: parkingName.trim(),
        lat: resolvedLocation.latitude,
        lon: resolvedLocation.longitude,
        fee: parkingFee,
        availableFor: parkingVehicles as Array<'auto' | 'moto' | 'camioneta'>,
      });

      setParkings((prev) => [created, ...prev]);
      setParkingName('');
      setParkingFee('no');
      setParkingVehicles(['auto']);
      setShowCreateForm(false);
      Alert.alert('Éxito', 'Parking creado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el parking');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View>
          <Text style={[globalStyles.title, { marginBottom: 4 }]}>🅿️ Parkings</Text>
          <Text style={globalStyles.textSecondary}>{displayParkings.length} encontrados</Text>
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

      <View style={[globalStyles.card, { borderLeftColor: '#50C878', marginBottom: 16 }]}> 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ color: '#50C878', fontWeight: '600', marginBottom: 4 }}>✓ Sesión Activa</Text>
            <Text style={globalStyles.textSecondary}>{user?.email}</Text>
            {user?.vehicleType && (
              <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>
                  {user.vehicleType === 'auto'
                    ? '🚗'
                    : user.vehicleType === 'moto'
                    ? '🏍️'
                    : '🚙'}
                </Text>
                <Text style={{ marginLeft: 6, color: '#007AFF', fontWeight: '600', fontSize: 12 }}>
                  {user.vehicleType.charAt(0).toUpperCase() + user.vehicleType.slice(1)}
                </Text>
              </View>
            )}
          </View>
          {user?.vehicleType && (
            <TouchableOpacity
              style={{
                backgroundColor: '#E3F2FD',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 6,
              }}
              onPress={() => Alert.alert('Cambiar vehículo', 'Esta función se agregará pronto')}
            >
              <Text style={{ color: '#007AFF', fontWeight: '600', fontSize: 12 }}>Cambiar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {user?.role === 'admin' ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            borderRadius: 12,
            paddingVertical: 12,
            marginBottom: 12,
            elevation: 2,
          }}
          onPress={() => setShowCreateForm((prev) => !prev)}
        >
          <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: 14 }}>
            {showCreateForm ? '✕ Cerrar formulario' : '+ Crear parking'}
          </Text>
        </TouchableOpacity>
      ) : null}

      {showCreateForm && user?.role === 'admin' && (
        <View style={[globalStyles.card, { marginBottom: 16 }]}> 
          <Text style={globalStyles.subtitle}>Nuevo parking</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Nombre del parking"
            value={parkingName}
            onChangeText={setParkingName}
          />
          <Text style={{ marginTop: 4, marginBottom: 6, fontWeight: '600' }}>¿Tiene costo?</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: parkingFee === 'yes' ? '#007AFF' : '#E8E8E8',
              }}
              onPress={() => setParkingFee('yes')}
            >
              <Text style={{ textAlign: 'center', color: parkingFee === 'yes' ? '#fff' : '#333', fontWeight: '700' }}>Pago</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: parkingFee === 'no' ? '#4CAF50' : '#E8E8E8',
              }}
              onPress={() => setParkingFee('no')}
            >
              <Text style={{ textAlign: 'center', color: parkingFee === 'no' ? '#fff' : '#333', fontWeight: '700' }}>Gratuito</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: 12, marginBottom: 6, fontWeight: '600' }}>Disponible para</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {['auto', 'moto', 'camioneta'].map((vehicle) => {
              const selected = parkingVehicles.includes(vehicle);
              return (
                <TouchableOpacity
                  key={vehicle}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 999,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: selected ? '#007AFF' : '#F1F1F1',
                  }}
                  onPress={() => toggleVehicle(vehicle)}
                >
                  <Text style={{ color: selected ? '#fff' : '#333', fontWeight: '700' }}>
                    {vehicle === 'auto' ? '🚗 Auto' : vehicle === 'moto' ? '🏍️ Moto' : '🚙 Camioneta'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={[globalStyles.button, { marginBottom: 0 }]} onPress={handleCreateParking} disabled={isSaving}>
            {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={globalStyles.buttonText}>Guardar parking</Text>}
          </TouchableOpacity>
        </View>
      )}

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

      {locationError && (
        <View style={[globalStyles.card, { borderLeftColor: '#FF3B30', marginBottom: 16 }]}> 
          <Text style={{ color: '#FF3B30', fontWeight: '600', marginBottom: 4 }}>⚠️ {locationError}</Text>
          <Text style={globalStyles.textSecondary}>Habilita los permisos de ubicación en configuración</Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {showFallbackMessage && (
          <View style={[globalStyles.card, { borderLeftColor: '#FF9800', marginBottom: 8 }]}> 
            <Text style={{ color: '#FF9800', fontWeight: '700', marginBottom: 4 }}>
              No hay parkings en 4 km, pero estos son los más cercanos
            </Text>
          </View>
        )}

        {displayParkings.length > 0 ? (
          displayParkings.map((parking) => {
            const isFavorite = favoriteIds.includes(String(parking.id));
            const isProcessing = favoriteLoadingId === String(parking.id);

            return (
              <View
                key={parking.id}
                style={[
                  parking.fee === 'yes' ? globalStyles.cardPremium : globalStyles.card,
                ]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={globalStyles.subtitle}>{parking.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 6, flexWrap: 'wrap' }}>
                      {parking.fee === 'yes' ? (
                        <View style={globalStyles.badge}>
                          <Text style={globalStyles.badgeText}>💳 Pago</Text>
                        </View>
                      ) : (
                        <View style={[globalStyles.badge, { backgroundColor: '#E8F5E9' }]}> 
                          <Text style={[globalStyles.badgeText, { color: '#4CAF50' }]}>✓ Gratuito</Text>
                        </View>
                      )}
                      {parking.availableFor && parking.availableFor.includes('auto') && (
                        <View style={[globalStyles.badge, { backgroundColor: '#F3E5F5' }]}> 
                          <Text style={[globalStyles.badgeText, { color: '#9C27B0' }]}>🚗 Auto</Text>
                        </View>
                      )}
                      {parking.availableFor && parking.availableFor.includes('moto') && (
                        <View style={[globalStyles.badge, { backgroundColor: '#FCE4EC' }]}> 
                          <Text style={[globalStyles.badgeText, { color: '#E91E63' }]}>🏍️ Moto</Text>
                        </View>
                      )}
                      {parking.availableFor && parking.availableFor.includes('camioneta') && (
                        <View style={[globalStyles.badge, { backgroundColor: '#E0F2F1' }]}> 
                          <Text style={[globalStyles.badgeText, { color: '#009688' }]}>🚙 Camioneta</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      disabled={isProcessing}
                      onPress={() => handleToggleFavorite(parking)}
                      style={{
                        backgroundColor: isFavorite ? '#FFF3CD' : '#F1F1F1',
                        borderRadius: 999,
                        padding: 10,
                        marginRight: 8,
                      }}
                    >
                      {isProcessing ? (
                        <ActivityIndicator size="small" color="#007AFF" />
                      ) : (
                        <Text style={{ fontSize: 16 }}>{isFavorite ? '⭐' : '☆'}</Text>
                      )}
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#E3F2FD', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 }}>
                      <Text style={{ color: '#007AFF', fontWeight: '700', fontSize: 14 }}>
                        {parking.distance.toFixed(1)} km
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={globalStyles.button}
                  onPress={() => handleOpenMaps(parking.lat, parking.lon, parking.name)}
                >
                  <Text style={globalStyles.buttonText}>📍 Abrir en Google Maps</Text>
                </TouchableOpacity>
              </View>
            );
          })
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
    </SafeAreaView>
  );
}
