import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { ParkingItem } from '../services/parkingService';

type ParkingCardProps = {
  parking: ParkingItem & { distance?: number };
  isFavorite: boolean;
  isProcessing: boolean;
  onToggleFavorite: () => void;
  onOpenMaps: () => void;
};

export default function ParkingCard({
  parking,
  isFavorite,
  isProcessing,
  onToggleFavorite,
  onOpenMaps,
}: ParkingCardProps) {
  return (
    <View style={parking.fee === 'yes' ? globalStyles.cardPremium : globalStyles.card}>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            disabled={isProcessing}
            onPress={onToggleFavorite}
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
              {parking.distance?.toFixed(1) ?? '0.0'} km
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={onOpenMaps}>
        <Text style={globalStyles.buttonText}>📍 Abrir en Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}
