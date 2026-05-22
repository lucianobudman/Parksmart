import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size="large"
        color="#2563eb"
      />

      <Text
        style={{
          marginTop: 20,
        }}
      >
        Obteniendo ubicación...
      </Text>
    </View>
  );
}