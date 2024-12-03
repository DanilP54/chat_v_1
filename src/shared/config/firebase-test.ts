import {initializeApp} from "firebase/app";
import {
    getStorage,
    connectStorageEmulator
} from "firebase/storage";
import {
    getFirestore,
    connectFirestoreEmulator
} from "firebase/firestore";
import {
    getAuth,
    connectAuthEmulator
} from "firebase/auth";



export const initializeFirebaseTest = () => {
    
    const firebaseConfig = {
        apiKey: process.env.APP_API_KEY,
        authDomain: process.env.APP_AUTH_DOMAIN,
        projectId: process.env.APP_PROJECT_ID,
        databaseURL: process.env.APP_DATABASE_URL,
        storageBucket: process.env.APP_STORAGE_BUCKET,
        messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
        appId: process.env.APP_APP_ID,
    };

    console.log(firebaseConfig)
    
    const app = initializeApp(firebaseConfig);
    
    const auth = getAuth(app);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    
    auth.settings.appVerificationDisabledForTesting = true;
    
    const db = getFirestore(app);
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
    
    
    const storage = getStorage(app);
    connectStorageEmulator(storage, '127.0.0.1', 9199)
    
    
    return {auth, db, storage}
}

