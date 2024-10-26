import { ConfirmationResult, UserCredential } from "firebase/auth";
import { SessionRepository } from "../_application/ports";
import { phoneAuthService } from "@/shared/api/auth";

export class SessionRepositoryImpl implements SessionRepository<ConfirmationResult, UserCredential> {

    async signInWithPhone(phone: string) {
        return await phoneAuthService.sendPhone(phone)
    }
    async verifyCode(otp: string) {
        return await phoneAuthService.sendOtp(otp)
    }
}


export const sessionRepository = new SessionRepositoryImpl() 