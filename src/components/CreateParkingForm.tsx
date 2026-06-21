import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';

type CreateParkingFormProps = {
  parkingName: string;
  parkingFee: 'yes' | 'no';
  parkingVehicles: string[];
  isSaving: boolean;
  onChangeName: (value: string) => void;
  onChangeFee: (value: 'yes' | 'no') => void;
  onToggleVehicle: (vehicle: string) => void;
  onSave: () => void;
};

export default function CreateParkingForm({
  parkingName,
  parkingFee,
  parkingVehicles,
  isSaving,
  onChangeName,
  onChangeFee,
  onToggleVehicle,
  onSave,
}: CreateParkingFormProps) {
  return (
    <View style={[globalStyles.card, { marginBottom: 16 }]}> 
      <Text style={globalStyles.subtitle}>Nuevo parking</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Nombre del parking"
        value={parkingName}
        onChangeText={onChangeName}
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
          onPress={() => onChangeFee('yes')}
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
          onPress={() => onChangeFee('no')}
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
              onPress={() => onToggleVehicle(vehicle)}
            >
              <Text style={{ color: selected ? '#fff' : '#333', fontWeight: '700' }}>
                {vehicle === 'auto' ? '🚗 Auto' : vehicle === 'moto' ? '🏍️ Moto' : '🚙 Camioneta'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={[globalStyles.button, { marginBottom: 0 }]} onPress={onSave} disabled={isSaving}>
        {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={globalStyles.buttonText}>Guardar parking</Text>}
      </TouchableOpacity>
    </View>
  );
}
