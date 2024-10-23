import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyDokmSQFKlbID5QzkafWABDlAjAN4lFtiw",
    authDomain: "talkwave-bf8ef.firebaseapp.com",
    projectId: "talkwave-bf8ef",
    databaseURL: "https://talkwave-bf8ef-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "talkwave-bf8ef.appspot.com",
    messagingSenderId: "612820534306",
    appId: "1:612820534306:web:2dc8681f6cb0886475b67b"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)



