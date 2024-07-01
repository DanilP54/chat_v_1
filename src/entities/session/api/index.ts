// Получить все необходимые данные о текущем пользователя и получить аватар, если он есть

import { auth } from "@/shared/config/firebase";
import { RecaptchaVerifier } from "firebase/auth";


const signInWithPhone = (phone: string) => {
    try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-phone-number', {
            size: 'invisible'
        });
    }
    catch (e: unknown) {

    }
}


export { signInWithPhone }