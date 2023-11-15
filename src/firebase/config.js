import app from 'firebase/app';
import firebase from 'firebase';


//simo
// const firebaseConfig = {
//     apiKey: "AIzaSyAyau_h6F58bZLm_QNQQ4fB2E5Lz9DfEMs",
//     authDomain: "proyectoprueba1-9c3c2.firebaseapp.com",
//     projectId: "proyectoprueba1-9c3c2",
//     storageBucket: "proyectoprueba1-9c3c2.appspot.com",
//     messagingSenderId: "1047170761563",
//     appId: "1:1047170761563:web:25abb211efda1c2c4b507e"
// };

const firebaseConfig = {
  apiKey: "AIzaSyD5b2OiZa-u1uJNkUkkxOp8UwaFHp5DiPA",
  authDomain: "prog3-993f2.firebaseapp.com",
  projectId: "prog3-993f2",
  storageBucket: "prog3-993f2.appspot.com",
  messagingSenderId: "415169779542",
  appId: "1:415169779542:web:ed704a4b964c17980ae8f7"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();




