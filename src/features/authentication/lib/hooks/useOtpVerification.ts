import {authService} from "@/entities/session/services/auth.service.ts";
import {useState} from "react";
import {ActionAuthInProgress, AuthorizationError, AuthorizationSteps} from "@/shared/types";
import {useDispatchContext} from "@/entities/session/ui/auth-provider.tsx";

export const useOtpVerification = () => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | undefined>(undefined)
    const authorizationDispatch = useDispatchContext()

    const submitOtp = async (otp: string) => {
        setIsError(false)
        setIsPending(true)
        setError(undefined)

        await authService.verifyCode(otp)
            .then(() => {
                authorizationDispatch({
                    type: AuthorizationSteps.AUTH_IN_PROGRESS
                } as ActionAuthInProgress)
            }).catch((error: Error) => {
                setIsError(true)
                setError({
                    title: 'Возникла ошибка при вводе пароля',
                    message: error.message
                })
            }).finally(() => {
                setIsPending(false)
            })
    }

    return {
        submitOtp,
        isPending,
        error,
        isError
    }
}