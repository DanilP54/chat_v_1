import { Dispatch, SetStateAction, useState } from "react";
import { signInWithPhoneUseCase } from "@/entities/session/_application/use-cases/sign.in.with.phone.use.case";
import { TwoFAState } from "../types";

export const useSignInWithPhone = ({
  onSuccess,
}: {
  onSuccess: Dispatch<SetStateAction<TwoFAState>>;
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handle = async (phoneNumber: string) => {
    try {
      setIsPending(true);
      setIsError(false);
      setErrorMessage("");

      await signInWithPhoneUseCase.exec(phoneNumber);
      
      onSuccess("verify code entry");
    } catch (err) {
      
      setIsError(true);

      if (err instanceof Error) {
        return setErrorMessage(err.message);
      }

      return setErrorMessage("An error occurred sign in phone");
    
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
