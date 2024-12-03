// import {initializeApp} from "firebase/app";
// import {connectStorageEmulator,getStorage} from "firebase/storage";
// import {connectFirestoreEmulator,getFirestore} from "firebase/firestore";
// import {getAuth,connectAuthEmulator} from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.APP_API_KEY,
//     authDomain: process.env.APP_AUTH_DOMAIN,
//     projectId: process.env.APP_PROJECT_ID,
//     databaseURL: process.env.APP_DATABASE_URL,
//     storageBucket: process.env.APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
//     appId: process.env.APP_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// auth.settings.appVerificationDisabledForTesting = true;

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// connectFirestoreEmulator(db, '127.0.0.1', 8080);
// connectStorageEmulator(storage, '127.0.0.1', 9199);
    
// export {auth, db, storage};