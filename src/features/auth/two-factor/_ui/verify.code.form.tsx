import { useState } from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";
import { FullPageLoader } from "@/shared/ui/full-page-loader.tsx";

import { useConfirmationCode } from "../hooks/use.confirmatio.code.ts";
import { useShowToast } from "../hooks/use.show.toast.ts";
import { MAX_LENGTH_OTP } from "../_constant/index.ts";
import { AuthSubmitButton } from "./auth.button.tsx";

export const VerifyCodeForm = () => {
  const [otp, setOtp] = useState("");

  const toast = useShowToast();

  const confirm = useConfirmationCode();

  const handleOtpSubmit = async (otp: string) => {
    await confirm.handle(otp);

    if (confirm.isError) {
      return toast.showVerifyCodeError(confirm.errorMessage);
    }
  };

  if (confirm.isPending) {
    return <FullPageLoader />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" text-lg text-white font-bold">
          Введите код подтверждения:
        </h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        <InputOTP value={otp} onChange={setOtp} maxLength={MAX_LENGTH_OTP}>
          <InputOTPGroup>
            {Array.from({ length: MAX_LENGTH_OTP }, (_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <AuthSubmitButton
          text="Подтвердить"
          disabled={otp.length < MAX_LENGTH_OTP}
          onClick={() => handleOtpSubmit(otp)}
        />
      </div>
    </div>
  );
};
