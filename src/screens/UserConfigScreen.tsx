import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';

export default function UserConfigScreen() {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (!authContext) {
    return null;
  }

  const { user, logout, changePassword } = authContext;

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Completa todos los campos', 'Ingresa tu contraseña actual, nueva y confirmación');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Contraseña inválida', 'La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('No coincide', 'La nueva contraseña y su confirmación deben ser iguales');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Éxito', 'Tu contraseña se cambió correctamente');
    } catch (error: any) {
      const message =
        error?.code === 'auth/wrong-password'
          ? 'La contraseña actual es incorrecta'
          : error?.code === 'auth/too-many-requests'
          ? 'Demasiados intentos. Intenta más tarde'
          : 'No se pudo cambiar la contraseña';
      Alert.alert('Error', message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View>
          <Text style={[globalStyles.title, { marginBottom: 4 }]}>⚙️ Configuración</Text>
          <Text style={globalStyles.textSecondary}>Tu cuenta</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#E5E7EB',
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#111827', fontWeight: '700', fontSize: 13 }}>Volver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.card}>
          <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>Correo</Text>
          <View style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10 }}>
            <Text style={{ color: '#0F172A', fontWeight: '600' }}>{user?.email || 'Sin correo'}</Text>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 12 }}>Cambiar contraseña</Text>
          <TextInput
            style={[globalStyles.input, { marginTop: 0 }]}
            placeholder="Contraseña actual"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={[globalStyles.button, { marginTop: 6, marginBottom: 0 }]}
            onPress={handleChangePassword}
            disabled={isChangingPassword}
          >
            <Text style={globalStyles.buttonText}>
              {isChangingPassword ? 'Guardando...' : 'Actualizar contraseña'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF3B30',
            borderRadius: 12,
            paddingVertical: 14,
            marginTop: 8,
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
