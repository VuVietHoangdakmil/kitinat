// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVCGVT4-UiTP9WFJzwSRKj_Fpm6Az-QX4",
  authDomain: "webbanquanaoreactandphp.firebaseapp.com",
  projectId: "webbanquanaoreactandphp",
  storageBucket: "webbanquanaoreactandphp.appspot.com",
  messagingSenderId: "4526904490",
  appId: "1:4526904490:web:ccf6831bf53d6d6af96cd3",
  measurementId: "G-RZ5Q9T74QK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Khởi tạo Firestore
const db = getFirestore(app);
export { db };
