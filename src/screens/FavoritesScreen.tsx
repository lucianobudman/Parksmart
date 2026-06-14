import React, { useCallback, useContext, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';
import { openGoogleMaps } from '../utils/googleMapsUtils';
import { getFavoriteParkings, removeFavoriteParking } from '../services/favoritesService';
import { ParkingItem } from '../services/parkingService';

export default function FavoritesScreen() {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState<ParkingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    if (!authContext?.user?.uid) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getFavoriteParkings(authContext.user.uid);
      setFavorites(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar tus favoritos');
    } finally {
      setLoading(false);
    }
  }, [authContext?.user?.uid]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const handleRemoveFavorite = async (parkingId: string | number) => {
    if (!authContext?.user?.uid) {
      return;
    }

    try {
      await removeFavoriteParking(authContext.user.uid, parkingId);
      setFavorites((prev) => prev.filter((item) => item.id !== parkingId));
    } catch (error) {
      Alert.alert('Error', 'No se pudo quitar el favorito');
    }
  };

  if (!authContext?.user) {
    return null;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[globalStyles.title, { marginBottom: 4 }]}>⭐ Favoritos</Text>
          <Text style={globalStyles.textSecondary}>Parkings guardados para volver después</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>Volver</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={[globalStyles.centered, { flex: 1 }]}> 
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10 }}>Cargando favoritos...</Text>
        </View>
      ) : favorites.length === 0 ? (
        <View style={[globalStyles.card, { alignItems: 'center', paddingVertical: 32 }]}> 
          <Text style={{ fontSize: 32, marginBottom: 10 }}>☆</Text>
          <Text style={globalStyles.subtitle}>Aún no tienes favoritos</Text>
          <Text style={globalStyles.textSecondary}>Guarda un parking desde la lista principal para verlo aquí.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {favorites.map((parking) => (
            <View key={parking.id} style={parking.fee === 'yes' ? globalStyles.cardPremium : globalStyles.card}>
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
                    {parking.availableFor?.includes('auto') && (
                      <View style={[globalStyles.badge, { backgroundColor: '#F3E5F5' }]}> 
                        <Text style={[globalStyles.badgeText, { color: '#9C27B0' }]}>🚗 Auto</Text>
                      </View>
                    )}
                    {parking.availableFor?.includes('moto') && (
                      <View style={[globalStyles.badge, { backgroundColor: '#FCE4EC' }]}> 
                        <Text style={[globalStyles.badgeText, { color: '#E91E63' }]}>🏍️ Moto</Text>
                      </View>
                    )}
                    {parking.availableFor?.includes('camioneta') && (
                      <View style={[globalStyles.badge, { backgroundColor: '#E0F2F1' }]}> 
                        <Text style={[globalStyles.badgeText, { color: '#009688' }]}>🚙 Camioneta</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  style={[globalStyles.button, { flex: 1, marginVertical: 0 }]}
                  onPress={() => openGoogleMaps(parking.lat, parking.lon, parking.name)}
                >
                  <Text style={globalStyles.buttonText}>📍 Abrir en Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF3B30',
                    borderRadius: 12,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    marginVertical: 0,
                  }}
                  onPress={() => handleRemoveFavorite(parking.id)}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Quitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
