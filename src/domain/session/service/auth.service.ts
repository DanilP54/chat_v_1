import {ConfirmationResult} from "firebase/auth";
import type {SignInWithPhoneFn, VerifyCodeFn} from "@/domain/session/api/firebase.auth.api.ts";

export class AuthWithPhoneService {

    private _signInConfirmation: ConfirmationResult | null = null;


    constructor(
        private readonly signInWithPhone: SignInWithPhoneFn,
        private readonly verifyCode: VerifyCodeFn,
    ) {
    }
 

    private get signInConfirmation() {
        return this._signInConfirmation
    }


    private setSignInConfirmation(confirmationResult: ConfirmationResult): void {
        this._signInConfirmation = confirmationResult
    }

    private clearSignInConfirmation() {
        this._confirmationResult = null
    }

    async signIn(phone: string) {

        const result = await this.signInWithPhone(phone)

        if (result.error) {
            return result.message
        }


        if (result.result) {
            this.setSignInConfirmation(result.result)
            return result.result
        }


    }

    verify(code: string) {

        if (this.signInConfirmation) {
            return this.verifyCode(code, this.signInConfirmation)
        }

        this.clearSignInConfirmation()

    }


}