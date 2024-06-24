import { Button } from "@/shared/ui/button";
import {
  InputOTP as InputOtpBox,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui/input-otp";
import { formatTime } from "../lib/formatTime";
import React, { useEffect, useState } from "react";
import { Action } from "../model";

type OTPVarificationProps = {
  dispatch: React.Dispatch<Action>
}

export default function OTPVarification({
  dispatch,
}: OTPVarificationProps) {

  const [time, setTime] = useState(60)
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (time > 0) {
      var timeoutId = setTimeout(() => {
        setTime(t => t - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [time])

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-thin text-lg">Активация учётная записи</h2>
        <span className="text-gray-900 font-thin">{formatTime(time)}</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <InputOtpBox value={otp} onChange={(v) => setOtp(v)} maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOtpBox>
        <Button disabled={otp.length < 6} onClick={() => dispatch({ type: 'NEXT_STEP' })} variant="default" className="bg-yellow-100">Активировать</Button>
      </div>
    </div>

  )
}
