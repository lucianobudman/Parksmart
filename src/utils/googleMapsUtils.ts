import { Linking } from 'react-native';

export const openGoogleMaps = (lat: number, lon: number, label: string) => {
  const url = `https://maps.google.com/?q=${lat},${lon}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export const generateMockParkings = () => [
  { id: 1, name: 'Parking Norte', lat: -34.597, lon: -58.370, fee: 'yes' },
  { id: 2, name: 'Parking Centro', lat: -34.603, lon: -58.381, fee: 'no' },
  { id: 3, name: 'Parking Premium', lat: -34.600, lon: -58.375, fee: 'yes' },
  { id: 4, name: 'Parking Sur', lat: -34.610, lon: -58.368, fee: 'no' },
];
