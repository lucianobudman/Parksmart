import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Parking } from '../utils/googleMapsUtils';

const DEFAULT_PARKINGS: Parking[] = [
  {
    id: 1,
    name: 'Parking Norte',
    lat: -34.597,
    lon: -58.37,
    fee: 'yes',
    availableSpots: { auto: 1, moto: 1, camioneta: 1 },
  },
  {
    id: 2,
    name: 'Parking Centro',
    lat: -34.603,
    lon: -58.381,
    fee: 'no',
    availableSpots: { auto: 1, moto: 1, camioneta: 1 },
  },
  {
    id: 3,
    name: 'Parking Premium',
    lat: -34.6,
    lon: -58.375,
    fee: 'yes',
    availableSpots: { auto: 1, moto: 1, camioneta: 1 },
  },
];

interface ParkingContextType {
  parkings: Parking[];
  loadingParkings: boolean;
  refreshParkings: () => Promise<void>;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parkings, setParkings] = useState<Parking[]>(DEFAULT_PARKINGS);
  const [loadingParkings, setLoadingParkings] = useState(true);

  const loadParkings = async () => {
    try {
      setLoadingParkings(true);
      const snapshot = await getDocs(collection(db, 'parkings'));

      const firebaseParkings = snapshot.docs
        .map((doc, index) => {
          const data = doc.data() as Record<string, any>;
          const rawSpots = data.availableSpots ?? {
            auto: data.auto ?? 0,
            moto: data.moto ?? 0,
            camioneta: data.camioneta ?? 0,
          };

          return {
            id: Number(doc.id) || Date.now() + index,
            name: data.name ?? 'Parking',
            lat: Number(data.lat ?? data.latitude ?? 0),
            lon: Number(data.lon ?? data.longitude ?? 0),
            fee: data.fee === 'yes' ? 'yes' : 'no',
            availableSpots: {
              auto: Number(rawSpots.auto ?? 0),
              moto: Number(rawSpots.moto ?? 0),
              camioneta: Number(rawSpots.camioneta ?? 0),
            },
          } as Parking;
        })
        .filter((parking) => Number.isFinite(parking.lat) && Number.isFinite(parking.lon));

      setParkings(firebaseParkings.length > 0 ? firebaseParkings : DEFAULT_PARKINGS);
    } catch (error) {
      console.error('Error cargando parkings desde Firebase', error);
      setParkings(DEFAULT_PARKINGS);
    } finally {
      setLoadingParkings(false);
    }
  };

  useEffect(() => {
    loadParkings();
  }, []);

  return (
    <ParkingContext.Provider value={{ parkings, loadingParkings, refreshParkings: loadParkings }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParkings = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParkings debe usarse dentro de ParkingProvider');
  }
  return context;
};
