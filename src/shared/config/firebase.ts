import {initializeApp} from "firebase/app";
import {
    connectStorageEmulator,
    getStorage} from "firebase/storage";
import {
    connectFirestoreEmulator,
    getFirestore} from "firebase/firestore";
import {
    getAuth,
    connectAuthEmulator
} from "firebase/auth";


const firebaseConfig = {
      apiKey: import.meta.env.APP_API_KEY,
      authDomain: import.meta.env.APP_AUTH_DOMAIN,
      projectId: import.meta.env.APP_PROJECT_ID,
      databaseURL: import.meta.env.APP_DATABASE_URL,
      storageBucket: import.meta.env.APP_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.APP_MESSAGING_SENDER_ID,
      appId: import.meta.env.APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

auth.settings.appVerificationDisabledForTesting = true;

if(import.meta.env.MODE === 'testing') {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectStorageEmulator(storage, '127.0.0.1', 9199);
}

export {auth, db, storage};