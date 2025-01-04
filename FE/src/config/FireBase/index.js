import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2Po4cwaT3ieePWGyZfzD1W7Pps2BC5ao",
    authDomain: "blogsport-d488d.firebaseapp.com",
    projectId: "blogsport-d488d",
    storageBucket: "blogsport-d488d.appspot.com",
    messagingSenderId: "472839538992",
    appId: "1:472839538992:web:5b6211da50ba2087d0e0f5",
    measurementId: "G-9NRKV3NPR7"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
    