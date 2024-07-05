import { Viewer, ViewerMap, ViewerRepos, ViewerRepository } from "@/entities/viewer/viewer.model";
import { auth } from "@/shared/config/firebase";
import { Auth, ConfirmationResult, RecaptchaVerifier, Unsubscribe, User as ViewerDto, UserCredential, onAuthStateChanged, signInWithPhoneNumber } from "firebase/auth";

auth.settings.appVerificationDisabledForTesting = true;

class AuthService {
    private recaptchaVerifier: RecaptchaVerifier | null = null
    private confirmationResult: ConfirmationResult | null = null
    private readonly viewerRepository: ViewerRepository = new ViewerRepos()
    private readonly auth: Auth = auth

    // constructor(auth: Auth) {
    //     this.auth = auth
    // }

    // private getRecaptchaVerifier(): RecaptchaVerifier {
    //     if (this.recaptchaVerifier) {
    //         return this.recaptchaVerifier
    //     }
    //     throw new Error('Отсутствует recaptcha')
    // }

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

    public async verifyCode(code: string): Promise<UserCredential | undefined> {
        try {
            const confirmation = this.getConfirmationResult()
            const confirm = await confirmation.confirm(code)

            if (confirm) {
                this.cleanRecaptchaAndConfirmation()
                return confirm
            }

        } catch (e: unknown) {
            throw new Error('Возникла ошибка в подтверждении номера телефона')
        }
    }

    public async onAuthState(): Promise<{ unsubscribe: Unsubscribe | null, currentViewer: Viewer | null }> {

        let currentViewer: Viewer | null = null

        const unsubscribe = onAuthStateChanged(this.auth, (viewer: ViewerDto | null) => {
            if (viewer) {
                return currentViewer
            }
        })

        console.log(unsubscribe)



        // return await new Promise(resolve => {
        //     let currentViewer: Viewer | null = null
        //     const unsubscribe = onAuthStateChanged(this.auth, async (viewer: ViewerDto | null) => {
        //         if (viewer) {
        //             const viewerData = await this.viewerRepository.getViewer(viewer.uid)
        //             if (viewerData) {
        //                 currentViewer = viewerData
        //             }
        //         }
        //         resolve({
        //             unsubscribe,
        //             currentViewer,
        //         })
        //     })
    })


}
}

export const register = new AuthService()
