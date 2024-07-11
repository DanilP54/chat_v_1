import {authService} from "@/entities/session/services/auth.service.ts";
import {Dispatch, useState} from "react";
import {AuthenticationActions, AuthenticationSteps, AuthorizationError} from "@/shared/types";



export const useSignInPhoneNumber = (dispatch: Dispatch<AuthenticationActions>) => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | undefined>(undefined)

    console.log(isPending)
    const submitPhoneNumber = async (phoneNumber: string) => {
        setError(undefined)
        setIsError(false)
        setIsPending(true)

        await authService.signInWithPhone(phoneNumber)
            .then(() => {
                dispatch({
                    type: AuthenticationSteps.VERIFY_CODE_ENTRY
                })
            }).catch(error => {
                setIsError(true)
                setError({
                    title: 'Ошибка регистрации номера телефона',
                    message: error.message
                })
            }).finally(() => {
                setIsPending(false)
            })
    }


    return {
        isPending,
        isError,
        error,
        submitPhoneNumber
    }
}