import { Dispatch, SetStateAction } from "react";
import { signInWithPhoneUseCase } from "@/entities/session/_application/use-cases/sign.in.with.phone.use.case";
import { TwoFAState } from "../types";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithPhone = ({
  onSuccess,
  onFailure,
}: {
  onSuccess: Dispatch<SetStateAction<TwoFAState>>;
  onFailure: (error: Error) => void
}) => {


  const { isPending, mutate } = useMutation({
    mutationFn: async (phone: string) => {
      return await signInWithPhoneUseCase.exec(phone);
    },
    onSuccess: () => {
      onSuccess("verify code entry");
    },
    onError: (error: Error) => {
      onFailure(error);
  }});

  return {
    isPending,
    mutate,
  }
};
