import { Button } from "@/shared/ui/button";
import {
    InputOTP as InputOtpBox,
    InputOTPGroup,
    InputOTPSlot,
} from "@/shared/ui/input-otp";

import { formatTime } from "../lib/formatTime";
import React, { SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import { ActionCreators, Actions } from "@/shared/types";
import { authService } from "@/entities/session/services/auth.service";
import { useAuthState } from "@/entities/session";
import { Step, useActionsContext } from "@/entities/session/ui/auth-provider";
import { Loader } from "@/shared/ui/loader";

export enum AuthorizationSteps {
    AUTH_IN_PROGRESS = 'AUTHORIZATION_IN_PROGRESS',
    NOT_AUTH = 'NOT_AUTHORIZED',
    AUTH_WITHOUT_ACCOUNT_DATA = 'AUTH_WITHOUT_ACCOUNT_DATA',
    AUTH_SUCCESS = 'AUTHORIZATION_SUCCESS'
}

type ActionPhoneNumber = { type: AuthenticationSteps.PHONE_NUMBER_ENTRY }
type ActionVerifyCode = { type: AuthenticationSteps.VERIFY_CODE_ENTRY }
type Actions = ActionPhoneNumber | ActionVerifyCode

export enum AuthenticationSteps {
    PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
    VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
}

type StatePhoneNumber = {
    step: AuthenticationSteps.PHONE_NUMBER_ENTRY
}

type StateVerifyCode = {
    step: AuthenticationSteps.VERIFY_CODE_ENTRY
}


type State = StatePhoneNumber | StateVerifyCode

type OTPVerificationProps = {
    state: State
    // dispatch: React.Dispatch<Actions>
}

const DEFAULT_TIME = 60
const MAX_LENGTH_OTP = 6


export default function OTPVerification({ state }: OTPVerificationProps) {

    const dispatch = useActionsContext()
    const [isPending, setIsPending] = useState(false)

    // const [timer, setTimer] = useState(DEFAULT_TIME)
    const [otp, setOtp] = useState('')
    // console.log(otp)
    // const { setIsProcessingAuth} = useAuthState()
    // useEffect(() => {
    //     if (!timer) return
    //     const id = setInterval(() => {
    //         setTimer(t => t - 1)
    //     }, 1000)
    //     return () => {
    //         clearInterval(id)
    //     }
    // }, [timer])

    const handleNextStep = async () => {
        setIsPending(true)
        const data = await authService.verifyCode(otp)

        if (data?.user) {
            // dispatch(actions.setTempUserCredential({
            //     userId: user.uid,
            //     phone: user.phoneNumber
            // }))
            // setIsProcessingAuth(true)
            // dispatch(actions.nextStep())
            dispatch()
        }
        setIsPending(false)
    }

    const handlePrevStep = () => {
        // dispatch()
    }

    const handleChangeOtp = (value: string) => {
        setOtp(value)
    }


    if (isPending) <Loader />

    return (
        <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
            {/* <div className="flex flex-col items-center gap-2">
                <h2 className=" font-thin text-lg text-gray-400">Активация учётная записи</h2>
                <span
                    className={clsx('text-blue-600 font-thin', timer < 11 && 'text-red-900 font-bold')}
                >{formatTime(timer)}</span>
                {timer === 0 && <span onClick={handlePrevStep}>Время истекло, повторить попытку</span>}
            </div> */}
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
