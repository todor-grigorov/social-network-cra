import firebase from 'firebase';
import "firebase/storage";

console.log(process.env);
console.log(process.env.API_KEY);
const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_APP_ID, REACT_APP_FIREBASE_MESSENGING_SENDER_ID } = process.env;
const firebaseConfig = {
    // apiKey: "AIzaSyC428VyUHH0jhuKftLrNN-mw9u_tPJAODw",
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: "social-network-cra.firebaseapp.com",
    projectId: "social-network-cra",
    storageBucket: "social-network-cra.appspot.com",
    messagingSenderId: REACT_APP_FIREBASE_MESSENGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth, storage };