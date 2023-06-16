import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRrQtJ2CREQ5AEW2d30TtJn9g2PsCI48k",
  authDomain: "portofolio-da5ad.firebaseapp.com",
  projectId: "portofolio-da5ad",
  storageBucket: "portofolio-da5ad.appspot.com",
  messagingSenderId: "338237408810",
  appId: "1:338237408810:web:d8384eaf90ede4770f2553",
  measurementId: "G-FBTW0D7NPX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
