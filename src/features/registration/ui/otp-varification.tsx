import { Button } from "@/shared/ui/button";
import {
  InputOTP as InputOtpBox,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui/input-otp";
import { formatTime } from "../lib/formatTime";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { confirmPhone } from "../api/requests";
import { ActionCreators, Actions } from "@/shared/types";

type OTPVarificationProps = {
  dispatch: React.Dispatch<Actions>
  actions: ActionCreators
  isPending: boolean
}

export default function OTPVarification({
  dispatch,
  actions,
  isPending
}: OTPVarificationProps) {

  const [timer, setTimer] = useState(10)
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (!timer) return
    const id = setInterval(() => {
      setTimer(t => t - 1)
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [timer])

  const handleNextStep = async () => {
    const res = await confirmPhone(otp)
    console.log(res?.user.uid)
  }

  const handlePrevStep = () => {
    // dispatch()
  }

  const handleChangeOtp = (value: string) => {
    setOtp(value)
  }

  if (isPending) {
    return (
      <div></div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-thin text-lg text-gray-400">Активация учётная записи</h2>
        <span
          className={clsx('text-yellow-600 font-thin', timer < 11 && 'text-red-900 font-bold')}
        >{formatTime(timer)}</span>
        {timer === 0 && <span onClick={handlePrevStep}>Время истекло, повторить попытку</span>}
      </div>
      <div className="flex flex-col items-center gap-8">
        <InputOtpBox value={otp} onChange={handleChangeOtp} maxLength={6}>
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
        <Button disabled={otp.length < 6} onClick={handleNextStep} variant="default" className="bg-emerald-700">Активировать</Button>
      </div>
    </div>

  )
}
