import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function NavigationPanel({
  instruction,
  eta,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🧭 Navegación
      </Text>

      <Text style={styles.instruction}>
        {instruction}
      </Text>

      {eta && (
        <Text style={styles.eta}>
          ⏱ {eta} min
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 999,
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 20,
  },

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  instruction: {
    color: 'white',
    marginTop: 10,
  },

  eta: {
    color: '#60a5fa',
    marginTop: 10,
  },
});