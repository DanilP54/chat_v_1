import { Button } from "@/shared/ui/button";
import {
  InputOTP as InputOtpBox,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/ui/input-otp";

import { formatTime } from "../lib/formatTime";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ActionCreators, Actions } from "@/shared/types";
import { getAdditionalUserInfo } from 'firebase/auth';
import { register } from "@/entities/session/services/auth.service";



type OTPVarificationProps = {
  dispatch: React.Dispatch<Actions>
  actions: ActionCreators
  isPending: boolean
}

const DEFAULT_TIME = 60
const MAX_LENGTH_OTP = 6


export default function OTPVarification({
  dispatch,
  actions,
  isPending
}: OTPVarificationProps) {

  const [timer, setTimer] = useState(DEFAULT_TIME)
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
    
    const res = await register.verifyCode(otp)

    if (res) {
      // const result = getAdditionalUserInfo(res)
      // console.log(result?.isNewUser)
      const { user } = res
      dispatch(actions.setTempUserCedential({
        userId: user.uid,
        phone: user.phoneNumber
      }))
      dispatch(actions.nextStep())
    }
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
          className={clsx('text-blue-600 font-thin', timer < 11 && 'text-red-900 font-bold')}
        >{formatTime(timer)}</span>
        {timer === 0 && <span onClick={handlePrevStep}>Время истекло, повторить попытку</span>}
      </div>
      <div className="flex flex-col items-center gap-8">
        <InputOtpBox value={otp} onChange={handleChangeOtp} maxLength={MAX_LENGTH_OTP}>
          <InputOTPGroup>
            {
              Array.from({ length: MAX_LENGTH_OTP }, (_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))
            }
          </InputOTPGroup>
        </InputOtpBox>
        <Button
          disabled={otp.length < MAX_LENGTH_OTP}
          onClick={handleNextStep} variant="default" className="bg-emerald-700">Активировать</Button>
      </div>
    </div>

  )
}
