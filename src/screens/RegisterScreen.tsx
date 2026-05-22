import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  useState,
} from 'react';

import RegisterForm from '../components/auth/RegisterForm';

import {
  registerUser,
} from '../services/authService';

export default function RegisterScreen() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const register = async () => {

    try {

      await registerUser(
        email,
        password
      );

      Alert.alert(
        'Éxito',
        'Cuenta creada'
      );

    } catch (error: any) {

      Alert.alert(
        'Error',
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Crear cuenta
      </Text>

      <RegisterForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onRegister={register}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    padding: 30,

    backgroundColor: '#111827',
  },

  title: {

    fontSize: 42,

    color: 'white',

    fontWeight: '700',

    marginBottom: 30,
  },
});