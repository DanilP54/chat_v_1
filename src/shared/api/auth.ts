import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, UserCredential } from "firebase/auth"
import { auth } from '@/shared/config/firebase'

declare global {
    interface Window {
        confirmationResult: ConfirmationResult,
        appVerify: RecaptchaVerifier
    }
}

auth.settings.appVerificationDisabledForTesting = true;

export interface PhoneAuthProvider<T, E> {
    sendPhone(phone: string): Promise<T>
    sendOtp(otp: string): Promise<E>
}


export class PhoneAuthService implements PhoneAuthProvider<ConfirmationResult, UserCredential> {
    
    async sendPhone(phone: string) {
        
        const appVerify = new RecaptchaVerifier(auth, 'recaptcha_container', {})

        const result = await signInWithPhoneNumber(auth, phone, appVerify)

        if(!result) {
            throw new Error('Error with signInWithPhoneNumber')
        }

        window.confirmationResult = result

        return result
    }
    async sendOtp(otp: string) {
        
        if (!window.confirmationResult) {
            throw new Error('No confirmation result')
        }

       return await window.confirmationResult.confirm(otp)

    }
}

export const phoneAuthService = new PhoneAuthService()