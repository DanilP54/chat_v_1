import {ConfirmationResult} from "firebase/auth";
import {
    SignInWithPhoneType,
    VerifyCodeType,
} from "@/domain/session/adapters/firebase.phone.auth.api.ts";
import {AuthPhoneService} from "@/domain/session/application/input.ports.ts";


export class AuthPhoneServiceImpl implements AuthPhoneService {

    private _signInConfirmation: ConfirmationResult | null = null;


    constructor(
        private readonly signInWithPhone: SignInWithPhoneType,
        private readonly verifyCode: VerifyCodeType,
    ) {
    }

    private get signInConfirmation() {
        if (!this._signInConfirmation) {
            throw new Error('Отсутствует свойства для подтверждения регистрации')
        }
        return this._signInConfirmation
    }

    private setSignInConfirmation(confirmationResult: ConfirmationResult): void {
        this._signInConfirmation = confirmationResult
    }

    private clearSignInConfirmation() {
        this._signInConfirmation = null
    }

    async signIn(phone: string): Promise<boolean> {

        const result = await this.signInWithPhone(phone)

        if (result.isFailure) {
            console.log(result.errorValue())
            return false
        }

        if (result.isSuccess) {
            this.setSignInConfirmation(result.getValue())
        }

        return true
    }

    async verify(code: string) {
        if (!this.signInConfirmation) {
            return false
        }

        const result = await this.verifyCode(code, this.signInConfirmation)

        if (result.isSuccess) {
            this.clearSignInConfirmation()
            return true
        }

        if (result.isFailure) {
            this.clearSignInConfirmation()
            return false
        }

        return false

    }
}