import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";
import { FullPageLoader } from "@/shared/ui/full-page-loader.tsx";
import { useConfirmationCode } from "../hooks/use.confirmatio.code.ts";

import { AuthSubmitButton } from "./auth.button.tsx";
import { useNotfication } from "@/shared/lib/notification.ts";
import { TwoFAState } from "../types.ts";

export const MAX_LENGTH_OTP = 6;


type ComponentProps = {
  setPrevStep: React.Dispatch<React.SetStateAction<TwoFAState>>;
};

export const VerifyCodeForm = ({
  setPrevStep 
}: ComponentProps) => {
  
  const [otp, setOtp] = useState("");

  const {showNotification} = useNotfication()

  const {isError, isPending, mutate: confirm} = useConfirmationCode({
    onFailure: (error: Error) => {
      showNotification({
        title: error?.message,
      }, 'error')
    }
  });

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    confirm(otp)
  };

  if (isPending) {
    return <FullPageLoader />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" text-lg text-white font-bold">
          Введите код подтверждения:
        </h2>
        {isError && <span onClick={() => setPrevStep('phone number entry')} className="cursor-pointer text-sm font-mono underline  text-red-500 hover:text-red-400">Ввести номер заново</span>}
      </div>
      <form onSubmit={handleOtpSubmit} className="flex flex-col items-center gap-8">
        <InputOTP name="opt" data-testid="otp-container" value={otp} onChange={setOtp} maxLength={MAX_LENGTH_OTP}>
          <InputOTPGroup>
            {Array.from({ length: MAX_LENGTH_OTP }, (_, index) => (
              <InputOTPSlot data-testid="otp-slot" key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <AuthSubmitButton
          text="Подтвердить"
          disabled={otp.length < MAX_LENGTH_OTP}
        />
      </form>
    </div>
  );
};
