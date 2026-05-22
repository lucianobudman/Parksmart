import { Parking } from '../types/parking';

export const fetchFakeParkings = (
  lat: number,
  lon: number
): Parking[] => {
  return [
    {
      id: 1,
      lat: lat + 0.005,
      lon: lon + 0.005,
      tags: {
        name: 'Parking Norte',
        fee: 'yes',
      },
    },

    {
      id: 2,
      lat: lat - 0.004,
      lon: lon + 0.003,
      tags: {
        name: 'Parking Centro',
        fee: 'no',
      },
    },

    {
      id: 3,
      lat: lat + 0.002,
      lon: lon - 0.006,
      tags: {
        name: 'Parking Premium',
        fee: 'yes',
      },
    },
  ];
};