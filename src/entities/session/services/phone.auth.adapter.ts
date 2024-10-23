import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, UserCredential } from "firebase/auth"
import { auth } from '@/shared/config/firebase'
import { PhoneAuthService } from "../application/ports"
import { safe } from "@/shared/lib/error.handler";

declare global {
    interface Window {
        confirmationResult: ConfirmationResult,
        appVerify: RecaptchaVerifier
    }
}

auth.settings.appVerificationDisabledForTesting = true;

export function usePhoneAuth(): PhoneAuthService {

    return {
        async signIn(phone): Promise<boolean> {

            const appVerify = new RecaptchaVerifier(auth, 'recaptcha_container', {})

            const response = await safe(signInWithPhoneNumber(auth, phone, appVerify))


            if (response.success) {
                window.confirmationResult = response.data
                return true
            }

            return false

        },

        async verifyCode(code): Promise<UserCredential | undefined> {

            if (!window.confirmationResult) {
                throw new Error('No confirmation result')
            }

            const confirmation = window.confirmationResult

            const result = await safe<UserCredential>(confirmation.confirm(code))

            if (result.success) {
                return result.data
            }
        },
    }
}


