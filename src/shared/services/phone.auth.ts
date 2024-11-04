import { ConfirmationResult,  RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth"
import { auth } from '@/shared/config/firebase'


auth.settings.appVerificationDisabledForTesting = true;

export interface PhoneAuthProvider<T, E> {
    sendPhone(phone: string): Promise<T>
    sendOtp(otp: string): Promise<E>
}


export class PhoneAuthService  {
    
    private confirmation: ConfirmationResult | null = null

    async sendPhone(phone: string) {
        
        const appVerify = new RecaptchaVerifier(auth, 'recaptcha_container', {})

        const result = await signInWithPhoneNumber(auth, phone, appVerify)

        if(!result) {
            throw new Error('Error with signInWithPhoneNumber')
        }
        
        this.confirmation = result
        
        return result
    }
    async sendOtp(otp: string) {

        if (!this.confirmation) {
            throw new Error('No confirmation result')
        }

       const result = await this.confirmation.confirm(otp)

       if(!result) {
        throw new Error('Error with confirm')
       }

       this.confirmation = null
       return result
    }
}
