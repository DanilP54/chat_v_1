import { authClient } from "@/shared/api/auth";

export class VerifyCodeUseCase {
  async exec(otp: string) {
    await authClient.phoneProvider.verify(otp);
  }
}

export const verifyCodeUseCase = new VerifyCodeUseCase();
