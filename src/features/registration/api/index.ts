import { auth } from "@/shared/config/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, } from "firebase/auth";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier
        confirmationResult: ConfirmationResult
    }
}

auth.settings.appVerificationDisabledForTesting = true;


export const anyFn = async (phoneNumber: string): Promise<boolean> => {
    try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-phone-number', {
            size: 'invisible'
        });

        const appVerifier = window.recaptchaVerifier

        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)

        if (confirmationResult) {
            window.confirmationResult = confirmationResult
            return true
        }

        throw new Error('Failed to send OTP')

    } catch (error) {
        console.log(error)
        return false
    }
}


export const sendOtp = async (code: string): Promise<boolean> => {
    try {
        const confirum = await window.confirmationResult.confirm(code)
        
        console.log(confirum)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
// const confirum = await response.confirm(TEST_VERIFICATION_CODE);
// const newDoc = await registrationUser(confirum.user.uid)