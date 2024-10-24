
import { getAdditionalUserInfo } from "firebase/auth"
import { usePhoneAuth } from "../services/phone.auth.adapter"
import { PhoneAuthService } from "./ports"

export function useAuth() {

    const phoneProvider: PhoneAuthService = usePhoneAuth()

    async function signInWithPhone(phone: string): Promise<boolean> {
        return await phoneProvider.signIn(phone)
    }

    async function verificationCode(code: string) {
        const result = await phoneProvider.verifyCode(code)

        if (!result) return

        const isNewUser = getAdditionalUserInfo(result)?.isNewUser

        return {
            isNewUser,
        }
    }

    return {
        signInWithPhone,
        verificationCode
    }
}