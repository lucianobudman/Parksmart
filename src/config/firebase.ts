import { initializeApp } from 'firebase/app';

import {
  getAuth,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAZv3aVBor2hswdML0Ghl5ht1CjqrIEaYY",
  authDomain: "parkingsmart-2d5c0.firebaseapp.com",
  projectId: "parkingsmart-2d5c0",
  storageBucket: "parkingsmart-2d5c0.firebasestorage.app",
  messagingSenderId: "591985736711",
  appId: "1:591985736711:web:effbfa9929945205bffea2",
  measurementId: "G-3956BKXZ0D"
};

const app = initializeApp(firebaseConfig);

export const auth =
  getAuth(app);