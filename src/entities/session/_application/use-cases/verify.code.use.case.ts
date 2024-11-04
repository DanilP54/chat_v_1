import { authClient } from "@/shared/api/auth";

export class VerifyCodeUseCase {
  async exec(otp: string) {
    await authClient.phoneProvider.sendOtp(otp)

  }
}

export const verifyCodeUseCase = new VerifyCodeUseCase();
