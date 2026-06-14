import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const FALLBACK_LOCATION = {
  latitude: -34.6037,
  longitude: -58.3816,
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(FALLBACK_LOCATION);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocation(FALLBACK_LOCATION);
          setError('Permiso de ubicación denegado. Se muestran parkings de referencia');
          setLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
        setError(null);
      } catch (err) {
        setLocation(FALLBACK_LOCATION);
        setError('No se pudo obtener ubicación. Se muestran parkings de referencia');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, error, loading };
};
