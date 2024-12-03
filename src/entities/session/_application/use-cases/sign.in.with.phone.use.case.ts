import { authClient } from "@/shared/api/auth";

export class SignInWithPhoneUseCase {
  async exec(phoneNumber: string) {
    await authClient.phoneProvider.signIn(phoneNumber);
  }
}

export const signInWithPhoneUseCase = new SignInWithPhoneUseCase();
