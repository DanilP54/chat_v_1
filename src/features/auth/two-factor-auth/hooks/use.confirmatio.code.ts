import { useState } from "react";
import { verifyCodeUseCase } from "@/entities/session/_application/use-cases/verify.code.use.case";

export const useConfirmationCode = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmOtpFn = async (otp: string) => {
    setIsPending(true);
    setError(null);

    try {
      await verifyCodeUseCase.exec(otp);
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err?.message || "An error occurred otp");
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    isSuccess,
    error,
    confirmOtpFn,
  };
};
