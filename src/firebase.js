
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDl3g1ExNqixugxLUrFCm0WAhQOj1UzlcU",
  authDomain: "storly-d2eee.firebaseapp.com",
  databaseURL:
    "https://storly-d2eee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "storly-d2eee",
  storageBucket: "storly-d2eee.appspot.com",
  messagingSenderId: "513456852856",
  appId: "1:513456852856:web:31da6fcaefabc4c243828d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
