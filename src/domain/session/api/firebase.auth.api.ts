import {ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "@/shared/config/firebase.ts";

type Result<T> = {
    error: boolean,
    result?: T
    message?: string
}


async function signInWithPhone(phone: string): Promise<Result<ConfirmationResult>> {
    try {
        const recaptcha = new RecaptchaVerifier(auth, 'send-phone-number', {
            size: 'invisible'
        })

        const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)

        if (!confirmation) {
            throw new Error('Ошибка регистрации номера телефона')
        }
        return {result: confirmation, error: false}

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {error: true, message: error.message}
        }
        console.error(error)
        return {error: true, message: 'Неизвестная ошибка'}
    }
}

async function verifyCode(code: string, confirmation: ConfirmationResult): Promise<boolean | ErrorResponse> {
    try {
        const userCredential = confirmation.confirm(code)

        if (!userCredential) {
            throw new Error('Ошибка при верификации кода')
        }

        return true

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {error: true, message: error.message}
        }
        console.error(error)
        return {error: true, message: 'Неизвестная ошибка'}
    }
}



export type SignInWithPhoneType<ResponseType> = (phone: string) => Promise<Result<ResponseType>>
export type VerifyCodeType<DataType, ResponseType> = (code: string, confirmation: DataType) => Promise<Result<ResponseType>>

export const signInWithPhoneFn: SignInWithPhoneType<ConfirmationResult> = signInWithPhone
export const verifyCodeFn: VerifyCodeType<ConfirmationResult, boolean> = verifyCode
