import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;