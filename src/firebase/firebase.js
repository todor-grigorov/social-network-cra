import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC428VyUHH0jhuKftLrNN-mw9u_tPJAODw",
    authDomain: "social-network-cra.firebaseapp.com",
    projectId: "social-network-cra",
    storageBucket: "social-network-cra.appspot.com",
    messagingSenderId: "44275772299",
    appId: "1:44275772299:web:604a0341f18e3fa29f1d8e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth, storage };