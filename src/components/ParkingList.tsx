import {
  FlatList,
} from 'react-native';

import ParkingCard from './ParkingCard';

export default function ParkingList({
  parkings,
  selectedParking,
  onSelect,
  getDistance,
  location,
}: any) {

  return (
    <FlatList
      horizontal
      data={parkings}
      keyExtractor={(item) =>
        item.id.toString()
      }
      renderItem={({ item }) => (
        <ParkingCard
          item={item}
          selected={
            selectedParking?.id ===
            item.id
          }
          onPress={() =>
            onSelect(item)
          }
          distance={getDistance(
            location.latitude,
            location.longitude,
            item.lat,
            item.lon
          )}
        />
      )}
      showsHorizontalScrollIndicator={
        false
      }
    />
  );
}