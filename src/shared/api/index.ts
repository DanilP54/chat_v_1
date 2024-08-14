import auth from '@/shared/config/firebase.ts';
import {signInWithPhoneNumber} from "firebase/auth";

// Auth

const signInWithPhone = async (phone: string) => {
    return signInWithPhoneNumber(auth, phone)
} 