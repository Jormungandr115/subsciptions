import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyD8Whv7Hr9CMRgeoRXnaD2nRcDDTfbpEDM",
    authDomain: "subscriptions-54982.firebaseapp.com",
    projectId: "subscriptions-54982",
    storageBucket: "subscriptions-54982.firebasestorage.app",
    messagingSenderId: "670412814289",
    appId: "1:670412814289:web:80c6b88b3649d0778912f0"
  };
  const db = firebase.initializeApp(firebaseConfig);
export default db.firestore();
