import { auth } from "@/shared/config/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, } from "firebase/auth";


declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier
        confirmationResult: ConfirmationResult
    }
}

auth.settings.appVerificationDisabledForTesting = true;



const signInWithPhone = async (phone: string) => {
    try {

        const formatPhone = `+${phone}`

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-phone-number', {
            size: 'invisible'
        });

        const appVerifier = window.recaptchaVerifier

        const confirmationResult = await signInWithPhoneNumber(auth, formatPhone, appVerifier)

        if (confirmationResult) {
            window.confirmationResult = confirmationResult;
            return confirmationResult
        }
    }
    catch (e: unknown) {
        throw new Error('Возникла какая-то ошибка в регистрации номера телефона')
    }
}


const confirmPhone = async (code: string) => {
    try {
        const confirm = await window.confirmationResult.confirm(code)
        
        if (confirm) {
            return confirm
        }

    } catch (e: unknown) {
        throw new Error('Возникла ошибка в подтверждении номера телефона')
    }
}



const uploadAvatar = async (file: File) => {
    try {

    } catch (e: unknown) {
        throw new Error('Возникла ошибка в установке автарке')
    }
}

const setUserInfo = async (formData: FormData) => {
    try {

    } catch (e: unknown) {
        throw new Error('Возникла ошибка в установке данных о пользователе')
    }
}


export { signInWithPhone, confirmPhone }