import { useState } from "react";
// ui
import { Button } from "@/shared/ui/button.tsx";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/ui/input-otp";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner.tsx";
// hooks
import { useConfirmationCode } from "../hooks/useConfirmationCode.ts";
import { useShowToast } from "../hooks/useShowToast.ts";
import { useAppSession } from "@/entities/session/_ui/session.provider.tsx";

const MAX_LENGTH_OTP = 6;

export default function VerifyCodeEntry() {

  const [otp, setOtp] = useState("");

  const {changeSessionStatus} = useAppSession()
  const {showVerifyCodeError} = useShowToast()
  const {confirmOtpFn, isPending, error, isSuccess} = useConfirmationCode();


  console.log(isSuccess)

  const handleChangeOtp = (value: string) => {
    setOtp(value);
  };

  const handleVerifyCodeSubmit = async (otp: string) => {
    
    await confirmOtpFn(otp);
    
    // if (!isSuccess) {
    //   showVerifyCodeError(error)
    //   return
    // }

    changeSessionStatus('authentication in progress')

    }


  if (isPending) {
    return <FullPageSpinner />;
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
          onClick={() => handleVerifyCodeSubmit(otp)}
          className="bg-emerald-700"
        >
          Активировать
        </Button>
      </div>
    </div>
  );
}
