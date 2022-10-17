import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTEwGM6cUMEKZ12UHvBtvVE7SlKcFrt48",
  authDomain: "jessbook-19e60.firebaseapp.com",
  projectId: "jessbook-19e60",
  storageBucket: "jessbook-19e60.appspot.com",
  messagingSenderId: "806875365045",
  appId: "1:806875365045:web:12eeddc819fa9c875e48fc",
  measurementId: "G-R4KQLSX8GT",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
