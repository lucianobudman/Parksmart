import React, { createContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { AuthContextType, User } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const data = userDoc.data();
          const role =
            data?.role === 'admin'
              ? 'admin'
              : data?.role === 'user'
              ? 'user'
              : data?.isAdmin || data?.admin
              ? 'admin'
              : firebaseUser.email?.toLowerCase().includes('admin')
              ? 'admin'
              : 'user';

          const vehicleType = data?.vehicleType as 'auto' | 'moto' | 'camioneta' | undefined;
          const hasVehicle = typeof data?.hasVehicle === 'boolean' ? data.hasVehicle : Boolean(vehicleType);
          const needsVehicleSelection = !hasVehicle;

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            vehicleType,
            hasVehicle,
            needsVehicleSelection,
            role,
          });
        } catch (error) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            vehicleType: (firebaseUser.displayName as any) || undefined,
            hasVehicle: false,
            needsVehicleSelection: false,
            role: firebaseUser.email?.toLowerCase().includes('admin') ? 'admin' : 'user',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        role: 'user',
        hasVehicle: false,
      }, { merge: true });
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        needsVehicleSelection: true,
        hasVehicle: false,
        role: 'user',
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser || !currentUser.email) {
        throw new Error('No hay una sesión activa para cambiar la contraseña');
      }

      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const setVehicleType = (type: 'auto' | 'moto' | 'camioneta') => {
    if (user) {
      const nextUser = {
        ...user,
        vehicleType: type,
        hasVehicle: true,
        needsVehicleSelection: false,
      };

      setUser(nextUser);
      setDoc(doc(db, 'users', user.uid), {
        vehicleType: type,
        hasVehicle: true,
      }, { merge: true });
    }
  };

  const setUserRole = async (role: 'admin' | 'user') => {
    if (!user) {
      return;
    }

    await setDoc(doc(db, 'users', user.uid), { role }, { merge: true });
    setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        changePassword,
        setVehicleType,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


