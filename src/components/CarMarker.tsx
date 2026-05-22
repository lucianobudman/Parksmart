import { Marker } from 'react-native-maps';

import {
  Image,
} from 'react-native';

export default function CarMarker({
  location,
  heading,
}: any) {

  if (!location) return null;

  return (
    <Marker
      coordinate={location}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
      flat
      rotation={heading}
    >
      <Image
        source={require('../assets/car.png')}
        style={{
          width: 40,
          height: 40,
        }}
        resizeMode="contain"
      />
    </Marker>
  );
}