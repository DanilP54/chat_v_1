import {AuthRepository} from "@/core/session/domain/auth.interface.repo.ts";
import {AuthClient} from "./firebase.auth.client.ts";
import {ConfirmationResult, Unsubscribe} from "firebase/auth";

export class AuthResource implements AuthRepository {

    private _confirmationResult: ConfirmationResult | null = null

    constructor(
        private readonly authClient: AuthClient
    ) {
    }


    private set confirmationResult(confirmation: ConfirmationResult) {
        this._confirmationResult = confirmation
    }

    private get confirmationResult() {
        if (this._confirmationResult) {
            return this._confirmationResult
        }
        throw new Error('confirmation result is undefined')
    }

    private cleanConfirmationResult() {
        this._confirmationResult = null
    }


    async signIn(phoneNumber: string): Promise<boolean> {
        try {
            const confirmationResult = await this.authClient.signInWithPhone(phoneNumber)

            if (confirmationResult) {
                this.confirmationResult = confirmationResult
            }
            return true
        } catch (error) {
            return false
        }
    }

    async verify(code: string): Promise<void> {
        try {
            const confirmation = this.confirmationResult

            if (!confirmation) {
                throw new Error('Ошибка в confirmation')
            }

            const confirm = await this.authClient.verifyCode(code, confirmation)

            if (confirm) this.cleanConfirmationResult()

        } catch (e: unknown) {
            console.log(e)
        }
    }

    subscribeAuthState(observer: any): Unsubscribe {
        return this.authClient.subscribe(observer)
    }
}
