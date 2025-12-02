// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC3wslkPqq-MAPKQjQJtG6CtXYrUktrYrs',
  authDomain: 'chiefgmedia-8de2c.firebaseapp.com',
  projectId: 'chiefgmedia-8de2c',
  storageBucket: 'chiefgmedia-8de2c.firebasestorage.app',
  messagingSenderId: '197290809526',
  appId: '1:197290809526:web:b3499bb44732261186ee17',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
