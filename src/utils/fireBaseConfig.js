import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOIfXEU6d--_dwaX7iMLf5lu_PiQLoPaw",
  authDomain: "e-commerce-app-43767.firebaseapp.com",
  projectId: "e-commerce-app-43767",
  storageBucket: "e-commerce-app-43767.firebasestorage.app",
  messagingSenderId: "66813717128",
  appId: "1:66813717128:web:856dfd5319eb3cf9054d3d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
