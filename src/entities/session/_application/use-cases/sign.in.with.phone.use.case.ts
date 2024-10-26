import { phoneAuthService } from "@/shared/api/auth";

export class SignInWithPhoneUseCase {
  async exec(phoneNumber: string) {
    await phoneAuthService.sendPhone(phoneNumber)

  }
}

export const signInWithPhoneUseCase = new SignInWithPhoneUseCase();
