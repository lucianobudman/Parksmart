import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ParkingList from './ParkingList';

import {
  Parking,
} from '../types/parking';

import {
  getDistance,
} from '../utils/distance';

export default function ParkingBottomSheet(
  props: any
) {

  return (
    <View style={styles.bottomSheet}>

      <Text style={styles.title}>
        🚗 Estacionamientos
      </Text>

      <ParkingList
        parkings={props.parkings}

        selectedParking={
          props.selectedParking
        }

        location={props.location}

        getDistance={
          getDistance
        }

        onSelect={(
          parking: Parking
        ) => {

          props.setSelectedParking(
            parking
          );

          props.setNavigationMode(
            true
          );

          props.getRoute(parking);

        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  bottomSheet: {
    position: 'absolute',

    bottom: 0,

    width: '100%',

    backgroundColor: 'white',

    borderTopLeftRadius: 25,

    borderTopRightRadius: 25,

    paddingVertical: 20,

    minHeight: 220,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    marginLeft: 20,

    marginBottom: 15,
  },
});