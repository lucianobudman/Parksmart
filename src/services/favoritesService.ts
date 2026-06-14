import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ParkingItem } from './parkingService';

export type FavoriteParkingItem = ParkingItem;

export const getFavoriteParkings = async (uid: string): Promise<FavoriteParkingItem[]> => {
  const snapshot = await getDocs(collection(db, 'users', uid, 'favorites'));

  return snapshot.docs.map((docSnapshot) => ({
    ...(docSnapshot.data() as Omit<FavoriteParkingItem, 'id'>),
    id: docSnapshot.id,
  })) as FavoriteParkingItem[];
};

export const toggleFavoriteParking = async (uid: string, parking: FavoriteParkingItem): Promise<boolean> => {
  const favoriteRef = doc(db, 'users', uid, 'favorites', String(parking.id));
  const snapshot = await getDoc(favoriteRef);

  if (snapshot.exists()) {
    await deleteDoc(favoriteRef);
    return false;
  }

  await setDoc(favoriteRef, {
    ...parking,
    id: String(parking.id),
  });

  return true;
};

export const removeFavoriteParking = async (uid: string, parkingId: string | number): Promise<void> => {
  await deleteDoc(doc(db, 'users', uid, 'favorites', String(parkingId)));
};
