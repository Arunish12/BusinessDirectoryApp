// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOnT--AGw_q5K0sXJCBFX4Lvue3RubQdA",
  authDomain: "react-native-6864b.firebaseapp.com",
  projectId: "react-native-6864b",
  storageBucket: "react-native-6864b.appspot.com",
  messagingSenderId: "456147883087",
  appId: "1:456147883087:web:1fce8930a979b3f3e7c63a",
  measurementId: "G-3QKCZ4P8RC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);