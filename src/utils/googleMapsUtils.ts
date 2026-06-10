import { Linking } from 'react-native';

export const openGoogleMaps = (lat: number, lon: number, label: string) => {
  const url = `https://maps.google.com/?q=${lat},${lon}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const generateMockParkings = () => [
  {
    id: 1,
    name: 'Parking Norte',
    lat: -34.597,
    lon: -58.370,
    fee: 'yes' as const,
    availableFor: ['auto', 'moto', 'camioneta'] as const,
  },
  {
    id: 2,
    name: 'Parking Centro',
    lat: -34.603,
    lon: -58.381,
    fee: 'no' as const,
    availableFor: ['auto', 'moto'] as const,
  },
  {
    id: 3,
    name: 'Parking Premium',
    lat: -34.600,
    lon: -58.375,
    fee: 'yes' as const,
    availableFor: ['auto', 'camioneta'] as const,
  },
  {
    id: 4,
    name: 'Parking Sur',
    lat: -34.610,
    lon: -58.368,
    fee: 'no' as const,
    availableFor: ['auto', 'moto', 'camioneta'] as const,
  },
  {
    id: 5,
    name: 'Parking Este',
    lat: -34.605,
    lon: -58.365,
    fee: 'yes' as const,
    availableFor: ['moto'] as const,
  },
  {
    id: 6,
    name: 'Parking Oeste',
    lat: -34.602,
    lon: -58.385,
    fee: 'no' as const,
    availableFor: ['auto', 'camioneta'] as const,
  },
];

export const filterNearbyParkings = (parkings: any[], userLat: number, userLon: number, radiusKm: number, userVehicle?: string) => {
  return parkings
    .map((parking) => ({
      ...parking,
      distance: calculateDistance(userLat, userLon, parking.lat, parking.lon),
    }))
    .filter((parking) => parking.distance <= radiusKm)
    .filter((parking) => !userVehicle || parking.availableFor.includes(userVehicle))
    .sort((a, b) => a.distance - b.distance);
};


