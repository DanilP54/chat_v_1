import { Button } from "@/shared/ui/button";
import {
    InputOTP as InputOtpBox,
    InputOTPGroup,
    InputOTPSlot,
} from "@/shared/ui/input-otp";
// import {formatTime} from "../lib/formatTime";
import { useEffect, useState } from "react";
// import clsx from "clsx";
import { authService } from "@/entities/session/services/auth.service";
// import { useDispatchContext} from "@/entities/session/ui/auth-provider";
import { Loader } from "@/shared/ui/loader";
import { formatTime } from "@/features/authentication/lib/formatTime.ts";
import { clsx } from "clsx";
import { ActionAuthInProgress, AuthorizationSteps } from "@/shared/types";
import { useDispatchContext } from "@/entities/session/ui/auth-provider";


const DEFAULT_TIME = 60
const MAX_LENGTH_OTP = 6


export default function Verification() {

    const dispatch = useDispatchContext()
    const [isPending, setIsPending] = useState(false)

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
        // setIsPending(true)
        const data = await authService.verifyCode(otp)

        if (data?.user) {
            dispatch({type: AuthorizationSteps.AUTH_IN_PROGRESS} as ActionAuthInProgress)
            // setIsPending(false)
        }
        // setIsPending(false)
    }

    // const handlePrevStep = () => {
    //     // dispatch()
    // }

    const handleChangeOtp = (value: string) => {
        setOtp(value)
    }


    if (isPending) {
        return <Loader />
    }

    return (
        <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
            <div className="flex flex-col items-center gap-2">
                <h2 className=" font-thin text-lg text-gray-400">Активация учётная записи</h2>
                <span
                    className={clsx('text-blue-600 font-thin', timer < 11 && 'text-red-900 font-bold')}
                >{formatTime(timer)}</span>
                {timer === 0 && <span>Время истекло, повторить попытку</span>}
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
