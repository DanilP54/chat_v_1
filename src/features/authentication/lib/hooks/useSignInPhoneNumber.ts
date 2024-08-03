import {Dispatch, useState} from "react";
import {AuthenticationActions, AuthenticationSteps, AuthorizationError} from "@/shared/types";
import {authWithPhoneService} from "@/domain/session";


export const useSignInPhoneNumber = (dispatch: Dispatch<AuthenticationActions>) => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | undefined>(undefined)

    const submitPhoneNumber = async (phoneNumber: string) => {
        try {
            setError(undefined)
            setIsError(false)
            setIsPending(true)

            const response = await authWithPhoneService.signIn(phoneNumber)

            if (!response) {
                throw new Error('Ошибка при регистрации номера телефона')
            }
            dispatch({type: AuthenticationSteps.VERIFY_CODE_ENTRY})
        } catch (error: unknown) {
            setIsError(true)
            setError({
                title: 'Ошибка регистрации номера телефона',
                message: error.message
            })
        } finally {
            setIsPending(false)
        }
    }

    return {
        isPending,
        isError,
        error,
        submitPhoneNumber
    }
}