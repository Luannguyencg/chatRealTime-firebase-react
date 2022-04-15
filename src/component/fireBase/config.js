import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';


// import 'firebase/analytics'
// import 'firebase/auth'
// import 'firebase/firestore'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCqiLchjqJxXkQ3U2qTNCi4orBM3Rhri0w",
    authDomain: "chat-app-db35f.firebaseapp.com",
    projectId: "chat-app-db35f",
    storageBucket: "chat-app-db35f.appspot.com",
    messagingSenderId: "397898600255",
    appId: "1:397898600255:web:e5f9680b37da82764d4d8a",
    measurementId: "G-DVHQDJX8V5"
});
// Initialize Firebase

const analytics = getAnalytics(firebaseApp);

const auth = getAuth()
const db = getFirestore(firebaseApp)


// auth.useEmulator('http://localhost:9099')
if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
}

export { db, auth };
