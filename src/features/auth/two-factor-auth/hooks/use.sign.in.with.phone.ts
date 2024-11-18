import {toast } from "@/shared/ui/use-toast"
import { Dispatch, SetStateAction, useState } from "react";
import { signInWithPhoneUseCase } from "@/entities/session/_application/use-cases/sign.in.with.phone.use.case";
import { TwoFAState } from "../types";

type SignInProps = {
  onSuccess: Dispatch<SetStateAction<TwoFAState>>
  onError: (message: string | null) => ReturnType<typeof toast>
}
export const useSignInWithPhone = ({
  onSuccess,
  onError
}: SignInProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handle = async (phoneNumber: string) => {
    
    setIsPending(true);

    try {
      await signInWithPhoneUseCase.exec(phoneNumber);
      onSuccess('verify code entry');
    } catch (err) {
      
      if(err instanceof Error) {
        return onError(err.message)
      };

      return onError("An error occurred sign in phone")
      
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    handle,
  };
};
