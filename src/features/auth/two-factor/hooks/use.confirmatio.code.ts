import { useState } from "react";
import { verifyCodeUseCase } from "@/entities/session/_application/use-cases/verify.code.use.case";
import { useAppSession } from "@/entities/session/_ui/session.provider";

export const useConfirmationCode = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { changeSessionStatus } = useAppSession();

  const handle = async (otp: string) => {
    try {
      setIsPending(true);
      setIsError(false);
      setErrorMessage("");

      await verifyCodeUseCase.exec(otp);

      changeSessionStatus("authentication in progress");
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
