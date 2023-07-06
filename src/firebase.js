// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH7lx-gNCXBiBl80sjKIz861gsp0lES6Q",
  authDomain: "chatapp-moonlight.firebaseapp.com",
  projectId: "chatapp-moonlight",
  storageBucket: "chatapp-moonlight.appspot.com",
  messagingSenderId: "312121347565",
  appId: "1:312121347565:web:7a0ef08cc138537d75abe4",
  measurementId: "G-ML1WNFLS9M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);