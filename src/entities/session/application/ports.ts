import { UserCredential } from "firebase/auth";


export interface PhoneAuthService {
    signIn(phone: string): Promise<boolean>,
    verifyCode(code: string): Promise<UserCredential | undefined>
}F
