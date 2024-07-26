import { auth } from "@/shared/config/firebase.ts";
import {
    ConfirmationResult,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    Unsubscribe
} from "firebase/auth";



auth.settings.appVerificationDisabledForTesting = true;


export class AuthClient {

    private readonly auth = auth

    constructor(
        private readonly recaptchaContainerOrId: string | HTMLElement
    ) { }

    async signInWithPhone(phoneNumber: string) {

        const recaptcha = new RecaptchaVerifier(this.auth, this.recaptchaContainerOrId, {
            size: 'invisible'
        })

        return await signInWithPhoneNumber(this.auth, phoneNumber, recaptcha)
    }

    async verifyCode(code: string, confirmation: ConfirmationResult) {
        return await confirmation.confirm(code)
    }

    subscribe(observer: any): Unsubscribe {
        return onAuthStateChanged(this.auth, observer)
    }
}