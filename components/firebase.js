// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnsebrNUW8oLOS4SDX0aq8yVIvJenmLzo",
  authDomain: "yuunblog.firebaseapp.com",
  projectId: "yuunblog",
  storageBucket: "yuunblog.appspot.com",
  messagingSenderId: "344706034118",
  appId: "1:344706034118:web:6bd99ba57392b39cb96ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db; 
