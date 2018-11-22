import * as firebase from 'firebase';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBg-TRP0W8yJDDi9OIQgg9JCgq5Wccww0U",
    authDomain: "pdnmx-48676.firebaseapp.com",
    databaseURL: "https://pdnmx-48676.firebaseio.com",
    projectId: "pdnmx-48676",
    storageBucket: "pdnmx-48676.appspot.com",
    messagingSenderId: "81621159902"
});

export default app;