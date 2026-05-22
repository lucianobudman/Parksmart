import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  useState,
} from 'react';

import LoginForm from '../components/auth/LoginForm';

import {
  loginUser,
} from '../services/authService';

export default function LoginScreen({
  navigation,
}: any) {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const login = async () => {

    try {

      await loginUser(
        email,
        password
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
        ParkSmart
      </Text>

      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onLogin={login}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Register'
          )
        }
      >

        <Text style={styles.link}>
          Crear cuenta
        </Text>

      </TouchableOpacity>

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

  link: {

    color: '#60a5fa',

    marginTop: 20,

    textAlign: 'center',
  },
});