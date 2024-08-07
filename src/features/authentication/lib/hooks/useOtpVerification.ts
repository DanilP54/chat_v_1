import {useState} from "react";
import {ActionAuthInProgress, AuthorizationError, AuthorizationSteps} from "@/shared/types";
import {useDispatchContext} from "@/core/session/ui/auth-provider.tsx";
import {authWithPhoneService} from "@/domain/session";

export const useOtpVerification = () => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | undefined>(undefined)

    const authorizationDispatch = useDispatchContext()

    const submitOtp = async (otp: string) => {
        try {
            setIsError(false)
            setIsPending(true)
            setError(undefined)

            const response = await authWithPhoneService.verify(otp)

            if (!response) {
                throw new Error('Возникла ошибка при ферификации номера телефона по коду')
            }

            authorizationDispatch({type: AuthorizationSteps.AUTH_IN_PROGRESS} as ActionAuthInProgress)

        } catch (error) {
            setIsError(true)
            setError({
                title: 'Возникла ошибка при вводе пароля',
                message: error.message
            })
        } finally {
            setIsPending(false)
        }
    }

    return {
        submitOtp,
        isPending,
        error,
        isError
    }
}