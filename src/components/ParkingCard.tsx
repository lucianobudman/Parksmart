import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default function ParkingCard({
  item,
  selected,
  onPress,
  distance,
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected &&
          styles.selectedCard,
      ]}
      onPress={onPress}
    >
      <Text style={styles.name}>
        {item.tags?.name}
      </Text>

      <Text>
        {item.tags?.fee === 'yes'
          ? '💰 Pago'
          : '✅ Gratis'}
      </Text>

      <Text style={styles.distance}>
        {distance} km
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 20,
  },

  selectedCard: {
    backgroundColor: '#2563eb',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
  },

  distance: {
    marginTop: 10,
    fontWeight: '700',
  },
});