import { phoneAuthService } from "@/shared/api/auth";

export class VerifyCodeUseCase {
  async exec(otp: string) {
    await phoneAuthService.sendOtp(otp)

  }
}

export const verifyCodeUseCase = new VerifyCodeUseCase();
