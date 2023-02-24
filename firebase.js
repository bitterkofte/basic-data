// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";

import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcx8_57CxADH9PqqgB3iXadoU9aY0bxhI",
  authDomain: "basic-data2.firebaseapp.com",
  projectId: "basic-data2",
  storageBucket: "basic-data2.appspot.com",
  messagingSenderId: "539739903231",
  appId: "1:539739903231:web:6d454290be06cf7adda8ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

// const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const collUser = collection(db, 'users');
// const q = query(collUser, where("email", "==", auth.currentUser.email))


export { db, collUser, auth };