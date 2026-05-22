import * as Location from 'expo-location';

export const startLocationTracking =
  async (
    callback: any
  ) => {

    return await Location.watchPositionAsync(
      {
        accuracy:
          Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 5,
      },
      callback
    );
  };