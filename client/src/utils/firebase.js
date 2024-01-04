// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBV5M57TFmLkc46zHqYAmGU0kDV2QYqT7w",
  authDomain: "nestease-bb9a4.firebaseapp.com",
  projectId: "nestease-bb9a4",
  storageBucket: "nestease-bb9a4.appspot.com",
  messagingSenderId: "272922334683",
  appId: "1:272922334683:web:3d5b5908d493990e3243fe",
  measurementId: "G-TW71GQL5JX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)
