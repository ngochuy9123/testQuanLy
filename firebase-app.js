
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {doc,deleteDoc,collection,getFirestore} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC98g5HGNdXkr5rtFrFidKl9Ap_zL9nVfk",
  authDomain: "my-first-firebase-projec-2a8eb.firebaseapp.com",
  projectId: "my-first-firebase-projec-2a8eb",
  storageBucket: "my-first-firebase-projec-2a8eb.appspot.com",
  messagingSenderId: "157155422111",
  appId: "1:157155422111:web:c63c9783854bd240ced7aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
