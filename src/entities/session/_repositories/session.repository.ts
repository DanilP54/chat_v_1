import { ConfirmationResult, UserCredential } from "firebase/auth";
import { SessionRepository } from "../_application/ports";
import { authClient } from "@/shared/api/auth";

export class SessionRepositoryImpl
  implements SessionRepository<ConfirmationResult, UserCredential>
{
  async signInWithPhone(phone: string) {
    return await authClient.phoneProvider.signIn(phone);
  }
  async verifyCode(otp: string) {
    return await authClient.phoneProvider.verify(otp);
  }
}

export const sessionRepository = new SessionRepositoryImpl();
