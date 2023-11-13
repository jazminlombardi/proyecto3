import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAyau_h6F58bZLm_QNQQ4fB2E5Lz9DfEMs",
    authDomain: "proyectoprueba1-9c3c2.firebaseapp.com",
    projectId: "proyectoprueba1-9c3c2",
    storageBucket: "proyectoprueba1-9c3c2.appspot.com",
    messagingSenderId: "1047170761563",
    appId: "1:1047170761563:web:25abb211efda1c2c4b507e"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();