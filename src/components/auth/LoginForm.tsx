import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default function LoginForm(
  props: any
) {

  return (
    <View>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        style={styles.input}
        value={props.email}
        onChangeText={props.setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        style={styles.input}
        value={props.password}
        onChangeText={props.setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={props.onLogin}
      >

        <Text style={styles.buttonText}>
          Ingresar
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  input: {

    backgroundColor: 'white',

    padding: 15,

    borderRadius: 12,

    marginBottom: 15,
  },

  button: {

    backgroundColor: '#2563eb',

    padding: 18,

    borderRadius: 15,

    alignItems: 'center',
  },

  buttonText: {

    color: 'white',

    fontWeight: '700',
  },
});