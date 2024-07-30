import {SignInWithPhoneUseCaseImpl} from "@/domain/session/application/use-cases/signin.with.phone.ts";
import {VerifyCodeUseCaseImpl} from "@/domain/session/application/use-cases/verify.code.ts";
import {ConfirmationResult} from "firebase/auth";

export class AuthWithPhoneService {

    private _confirmationResult: ConfirmationResult | null = null;


    constructor(
        private readonly signInWithPhone: SignInWithPhoneUseCaseImpl,
        private readonly verifyCode: VerifyCodeUseCaseImpl,
    ) {
    }


    private get confirmationResult() {
        return this._confirmationResult
    }

    private setConfirmationResult(confirmationResult: ConfirmationResult): void {
        this._confirmationResult = confirmationResult
    }

    private clearConfirmationResult() {
        this._confirmationResult = null
    }

    async signIn(phone: string) {
        const confirmationResult = await this.signInWithPhone.execute(phone)

        if (confirmationResult) {
            this.setConfirmationResult(confirmationResult)
        }
    }

    async verify(code: string) {

        if (!this.confirmationResult) {
            throw new Error('Отсутствует confirmationResult')
        }

        await this.verifyCode.execute(code, this.confirmationResult)

        this.clearConfirmationResult()
    }

}