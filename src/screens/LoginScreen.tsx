import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { globalStyles } from '../styles/global';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { login } = authContext;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
    >
      <View style={globalStyles.centered}>
        <Text style={globalStyles.title}>ParkSmart</Text>

        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', marginTop: 16 }}>
          ¿No tienes cuenta?{' '}
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Regístrate</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
