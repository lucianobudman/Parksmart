import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
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
        setError('Error al obtener ubicación');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, error, loading };
};
