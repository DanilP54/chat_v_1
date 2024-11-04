import { authClient } from "@/shared/api/auth";

export class SignInWithPhoneUseCase {
  async exec(phoneNumber: string) {
    await authClient.phoneProvider.sendPhone(phoneNumber)
  }
}

export const signInWithPhoneUseCase = new SignInWithPhoneUseCase();
