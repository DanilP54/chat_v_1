import { viewerRepoInstance, ViewerRepository } from "@/entities/viewer/interfaces/repository";
import { auth } from "@/shared/config/firebase";
import {
    Auth,
    ConfirmationResult,
    getAdditionalUserInfo,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    Unsubscribe,
    User
} from "firebase/auth";

auth.settings.appVerificationDisabledForTesting = true;

class AuthService {
    private recaptchaVerifier: RecaptchaVerifier | null = null
    private confirmationResult: ConfirmationResult | null = null
    private readonly viewerRepository: ViewerRepository = viewerRepoInstance
    private readonly auth: Auth = auth

    private setRecaptchaVerifier(recaptcha: RecaptchaVerifier) {
        this.recaptchaVerifier = recaptcha
    }

    private getConfirmationResult(): ConfirmationResult {
        if (this.confirmationResult) {
            return this.confirmationResult
        }
        throw new Error('Отсутствует confirmation result')
    }

    private setConfirmationResult(confirmation: ConfirmationResult) {
        this.confirmationResult = confirmation
    }

    private cleanRecaptchaAndConfirmation() {
        this.confirmationResult = null
        this.recaptchaVerifier = null
    }

    public async signInWithPhone(phoneNumber: string): Promise<ConfirmationResult | undefined> {
        try {
            const recaptcha = new RecaptchaVerifier(this.auth, 'send-phone-number', {
                size: 'invisible'
            })

            if (recaptcha) this.setRecaptchaVerifier(recaptcha)

            const appVerifier = recaptcha
            const confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)

            if (confirmationResult) this.setConfirmationResult(confirmationResult)

            return confirmationResult
        }
        catch (error: unknown) {
            throw new Error(`Возникла какая-то ошибка в регистрации номера телефона: ${error}`)
        }
    }

    public async verifyCode(code: string): Promise<{ user: User, isNewUser: boolean | undefined } | undefined> {
        try {
            const confirmation = this.getConfirmationResult()
            const confirm = await confirmation.confirm(code)

            if (confirm) {
                const authInfo = getAdditionalUserInfo(confirm)
                this.cleanRecaptchaAndConfirmation()
                return {
                    user: confirm.user,
                    isNewUser: authInfo?.isNewUser,
                }
            }

        } catch (e: unknown) {
            throw new Error('Возникла ошибка в подтверждении номера телефона')
        }
    }

    public onAuthState(callback: any): Unsubscribe {
        return onAuthStateChanged(this.auth, callback)
    }
}

export const authService = new AuthService()
