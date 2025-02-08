// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: "anglerkit-8e19c.firebaseapp.com",
  projectId: "anglerkit-8e19c",
  storageBucket: "anglerkit-8e19c.firebasestorage.app",
  messagingSenderId: "546441646135",
  appId: "1:546441646135:web:783aa06b00ef2577a82fb2",
  measurementId: "G-NEWRGHLFBX"
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
/*
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };*/