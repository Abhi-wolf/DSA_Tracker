// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAtSBVubWpH04TLVudTymVIPf01pe8g6vo",
//   authDomain: "worldwise-b8f2c.firebaseapp.com",
//   projectId: "worldwise-b8f2c",
//   storageBucket: "worldwise-b8f2c.appspot.com",
//   messagingSenderId: "1094094338224",
//   appId: "1:1094094338224:web:771f04a8173db2762fa375",
//   measurementId: "G-TBW4T7DF72",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const STORAGE_FOLDER_PATH = "gs://worldwise-b8f2c.appspot.com";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, STORAGE_FOLDER_PATH);
// const analytics = getAnalytics(app);

export default app;
