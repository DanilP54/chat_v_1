import { useState } from "react";
// ui
import { Button } from "@/shared/ui/button.tsx";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";
import { FullPageLoader } from "@/shared/ui/full-page-loader.tsx";
// hooks
import { useConfirmationCode } from "../hooks/use.confirmatio.code.ts";
import { useShowToast } from "../hooks/use.show.toast.ts";
import { MAX_LENGTH_OTP } from "../_constant/index.ts";

export default function VerifyCodeEntry() {
  
  const [otp, setOtp] = useState("");

  const toast = useShowToast();

  const confirm = useConfirmationCode({
    onError: toast.showVerifyCodeError
  });

  const handleChangeOtp = (value: string) => {
    setOtp(value);
  };

  const handleConfirmationSubmit = async (otp: string) => {
    await confirm.handle(otp);
  };

  if (confirm.isPending) {
    return <FullPageLoader />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-thin text-lg text-gray-400">
          Введите код подтверждения:
        </h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        <InputOTP
          value={otp}
          onChange={handleChangeOtp}
          maxLength={MAX_LENGTH_OTP}
        >
          <InputOTPGroup>
            {Array.from({ length: MAX_LENGTH_OTP }, (_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button
          disabled={otp.length < MAX_LENGTH_OTP}
          onClick={() => handleConfirmationSubmit(otp)}
          className="bg-emerald-700"
        >
          Активировать
        </Button>
      </div>
    </div>
  );
}
