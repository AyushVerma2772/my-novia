import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCgZC4KAbBV0tlZKvPmPr0SQSPS0Qkr5KU",
    authDomain: "my-novia.firebaseapp.com",
    projectId: "my-novia",
    storageBucket: "my-novia.appspot.com",
    messagingSenderId: "267002076509",
    appId: "1:267002076509:web:115ed80057091af4b0dcb4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);