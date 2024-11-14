import { useState } from "react";
import { signInWithPhoneUseCase } from "@/entities/session/_application/use-cases/sign.in.with.phone.use.case";

export const useSignInWithPhone = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (phoneNumber: string) => {
    setIsPending(true);
    setError(null);

    try {
      await signInWithPhoneUseCase.exec(phoneNumber);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred sign in phone");
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    isSuccess,
    error,
    signIn,
  };
};
