import { verifyCodeUseCase } from "@/entities/session/_application/use-cases/verify.code.use.case";
import { SessionStatus } from "@/entities/session/_ui/session.provider";
import { useState } from "react";
type HookProps = {
  next: (status: SessionStatus) => void
}

export const useConfirmationCode = ({next}: HookProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
 

  const handle = async (otp: string) => {
    try {
      setIsPending(true);
      setIsError(false);
      setErrorMessage("");

      await verifyCodeUseCase.exec(otp);

      next("authentication in progress")
    } catch (err) {
      setIsError(true);

      if (err instanceof Error) {
        return setErrorMessage(err.message);
      }

      setErrorMessage("An error occurred otp");
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    isError,
    errorMessage,
    handle,
  };
};
