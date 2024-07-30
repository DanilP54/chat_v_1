import {Phone2FAuthRepository} from "@/domain/session/domain/auth.repository.ts";
import {Auth, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";


export class FirebaseAuthRepositoryImpl implements Phone2FAuthRepository {

    constructor(private readonly _firebaseAuthService: Auth) {}

    private get auth() {
        return this._firebaseAuthService
    }

    async signInWithPhone(phone: string) {

        const recaptcha = new RecaptchaVerifier(this.auth, 'send-phone-number', {
            size: 'invisible'
        })

        return await signInWithPhoneNumber(this.auth, phone, recaptcha)
    }

    async verifyOtp(code: string, confirmation: ConfirmationResult) {
        return await confirmation.confirm(code)
    }
}