import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';
import { openGoogleMaps, generateMockParkings, filterNearbyParkings } from '../utils/googleMapsUtils';
import { useUserLocation } from '../hooks/useUserLocation';
import { createParking, getParkings, ParkingItem } from '../services/parkingService';
import { getFavoriteParkings, toggleFavoriteParking } from '../services/favoritesService';
import ParkingCard from '../components/ParkingCard';
import CreateParkingForm from '../components/CreateParkingForm';

const MIN_RADIUS_KM = 1;
const MAX_RADIUS_KM = 10;
const DEFAULT_RADIUS_KM = 4;
const FALLBACK_LOCATION = {
  latitude: -34.6037,
  longitude: -58.3816,
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const authContext = useContext(AuthContext);
  const { location, loading: locationLoading, error: locationError } = useUserLocation();
  const [radiusKm, setRadiusKm] = useState(DEFAULT_RADIUS_KM);
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

  const allParkings = [...generateMockParkings(), ...parkings];

  const nearbyParkings = filterNearbyParkings(
    allParkings,
    resolvedLocation.latitude,
    resolvedLocation.longitude,
    radiusKm,
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
          <TouchableOpacity
            style={{
              backgroundColor: '#F1F5F9',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 6,
            }}
            onPress={() => navigation.navigate('UserConfig')}
          >
            <Text style={{ color: '#0F172A', fontWeight: '600', fontSize: 12 }}>Config</Text>
          </TouchableOpacity>
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
        <CreateParkingForm
          parkingName={parkingName}
          parkingFee={parkingFee}
          parkingVehicles={parkingVehicles}
          isSaving={isSaving}
          onChangeName={setParkingName}
          onChangeFee={setParkingFee}
          onToggleVehicle={toggleVehicle}
          onSave={handleCreateParking}
        />
      )}

      <View
        style={{
          backgroundColor: '#F7F9FC',
          borderRadius: 12,
          padding: 14,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', color: '#1F2937' }}>Radio de búsqueda</Text>
          <Text style={{ fontWeight: '700', color: '#007AFF' }}>{radiusKm} km</Text>
        </View>
        <Slider
          minimumValue={MIN_RADIUS_KM}
          maximumValue={MAX_RADIUS_KM}
          step={1}
          value={radiusKm}
          onValueChange={(value) => setRadiusKm(Math.round(value))}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#D9EAFD"
          thumbTintColor="#007AFF"
        />
      </View>

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
              No hay parkings en {radiusKm} km, pero estos son los más cercanos
            </Text>
          </View>
        )}

        {displayParkings.length > 0 ? (
          displayParkings.map((parking) => {
            const isFavorite = favoriteIds.includes(String(parking.id));
            const isProcessing = favoriteLoadingId === String(parking.id);

            return (
              <ParkingCard
                key={parking.id}
                parking={parking}
                isFavorite={isFavorite}
                isProcessing={isProcessing}
                onToggleFavorite={() => handleToggleFavorite(parking)}
                onOpenMaps={() => handleOpenMaps(parking.lat, parking.lon, parking.name)}
              />
            );
          })
        ) : (
          <View style={[globalStyles.card, { alignItems: 'center', paddingVertical: 40 }]}> 
            <Text style={{ fontSize: 32, marginBottom: 12 }}>📍</Text>
            <Text style={globalStyles.subtitle}>Sin parkings cercanos</Text>
            <Text style={globalStyles.textSecondary}>
              No hay parkings en un radio de {radiusKm} km
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
