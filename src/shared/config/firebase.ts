import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDokmSQFKlbID5QzkafWABDlAjAN4lFtiw",
    authDomain: "talkwave-bf8ef.firebaseapp.com",
    projectId: "talkwave-bf8ef",
    storageBucket: "talkwave-bf8ef.appspot.com",
    messagingSenderId: "612820534306",
    appId: "1:612820534306:web:2dc8681f6cb0886475b67b"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, database, storage, db }


// Models - user, chats...

// алгоритм создания юзера

// 1. содаём учётную запись с помощью createUserWithEmailAndPassword - auth;
// 2. записываем User в Doc Firestore через setDoc() + загружаем аватар, если он есть и если это предусмотрено;
// 3. установить юзеру поле чаты тоже через setDoc();

