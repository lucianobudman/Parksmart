import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export type VehicleType = 'auto' | 'moto' | 'camioneta';

export interface ParkingItem {
  id: string | number;
  name: string;
  lat: number;
  lon: number;
  fee: 'yes' | 'no';
  availableFor: VehicleType[];
}

export const getParkings = async (): Promise<ParkingItem[]> => {
  const snapshot = await getDocs(collection(db, 'parkings'));

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<ParkingItem, 'id'>),
    id: doc.id,
  })) as ParkingItem[];
};

export const createParking = async (parking: Omit<ParkingItem, 'id'>): Promise<ParkingItem> => {
  const docRef = await addDoc(collection(db, 'parkings'), {
    ...parking,
    createdAt: serverTimestamp(),
  });

  return {
    ...parking,
    id: docRef.id,
  };
};
