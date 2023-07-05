// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries //
import * as Firebase from "firebase/app";
import * as Analytics from "firebase/analytics";
import * as Auth from "firebase/auth";
import * as Firestore from "firebase/firestore";
import * as Storage from "firebase/storage";
import * as Functions from "firebase/functions";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKC11J6gbGP7IB8p7641C9ck5_XswEPNY",
  authDomain: "tallernuevo-897dc.firebaseapp.com",
  projectId: "tallernuevo-897dc",
  storageBucket: "tallernuevo-897dc.appspot.com",
  messagingSenderId: "420126894687",
  appId: "1:420126894687:web:fd1a84ee0c4e983c4e49ea",
  measurementId: "G-JVYC2BLG0J",
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const Database = Firestore.getFirestore(App);
// Initialize Firestore References
const UsersCollection = Firestore.collection(Database, "users");
const UsersDoc = (userId) => Firestore.doc(Database, "users", userId);

export {
  Firebase,
  App,
  Analytics,
  Auth,
  Firestore,
  Database,
  Storage,
  Functions,
  UsersCollection,
  UsersDoc,
};
