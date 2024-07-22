import { auth } from "@/shared/config/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


auth.settings.appVerificationDisabledForTesting = true;


export class AuthClient {
    private readonly auth = auth

    async signInWithPhone(phoneNumber: string, recaptcha: RecaptchaVerifier) {
        return await signInWithPhoneNumber(this.auth, phoneNumber, recaptcha)
    }

    async verifyCode(code: string, confirmation: ConfirmationResult) {
        return await confirmation.confirm(code)
    }
}