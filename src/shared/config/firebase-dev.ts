import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


export const initializeFirebaseDev = () => {
    
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
    
    return {auth, db, storage}

}




