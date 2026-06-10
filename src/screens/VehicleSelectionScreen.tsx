import React, { useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';

interface VehicleOption {
  type: 'auto' | 'moto' | 'camioneta';
  label: string;
  emoji: string;
  description: string;
}

const vehicles: VehicleOption[] = [
  { type: 'auto', label: 'Auto', emoji: '🚗', description: 'Automóvil compacto o mediano' },
  { type: 'moto', label: 'Moto', emoji: '🏍️', description: 'Motocicleta o scooter' },
  { type: 'camioneta', label: 'Camioneta', emoji: '🚙', description: 'SUV o camioneta grande' },
];

export default function VehicleSelectionScreen() {
  const navigation = useNavigation() as any;
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { setVehicleType } = authContext;

  const handleSelectVehicle = (type: 'auto' | 'moto' | 'camioneta') => {
    setVehicleType(type);
    Alert.alert('✓ Listo', `Vehículo: ${type.charAt(0).toUpperCase() + type.slice(1)}`, [
      {
        text: 'Ir a Home',
        onPress: () => navigation.navigate('HomeTab'),
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Text style={[globalStyles.title, { fontSize: 36, marginBottom: 8 }]}>🚗</Text>
        <Text style={globalStyles.title}>Tu Vehículo</Text>
        <Text style={globalStyles.textSecondary}>Selecciona tu tipo de vehículo</Text>
      </View>

      <Text style={{ fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 16 }}>
        Esto nos ayudará a mostrarte parkings disponibles para tu vehículo
      </Text>

      {vehicles.map((vehicle) => (
        <TouchableOpacity
          key={vehicle.type}
          onPress={() => handleSelectVehicle(vehicle.type)}
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 2,
            borderLeftWidth: 4,
            borderLeftColor: '#007AFF',
          }}
        >
          <Text style={{ fontSize: 40, marginRight: 16 }}>{vehicle.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 4 }}>
              {vehicle.label}
            </Text>
            <Text style={{ fontSize: 12, color: '#999' }}>
              {vehicle.description}
            </Text>
          </View>
          <Text style={{ fontSize: 20 }}>→</Text>
        </TouchableOpacity>
      ))}

      <View style={{ marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' }}>
        <Text style={[globalStyles.textSecondary, { textAlign: 'center' }]}>
          Puedes cambiar esto después en configuración
        </Text>
      </View>
    </View>
  );
}
