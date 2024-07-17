import { userService } from "@/entities/user/interfaces/user.services";
import { useState } from "react";
import { AuthorizationError, AuthorizationSteps } from "@/shared/types";
import { useDispatchContext } from "@/entities/session/ui/auth-provider.tsx";

export const useSubmitProfileData = () => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | undefined>(undefined)
    const authorizationDispatch = useDispatchContext()

    const createProfile = {
        submit,
        isPending,
        isError,
        error
    }

    async function submit(values, userId) {

        setError(undefined)
        setIsError(false)
        setIsPending(true)

        await userService.setViewerToDB({
            id: userId,
            firstName: values.firstname,
            lastName: values.lastname,
            avatar: 'https' || undefined
        }).then(() => {
            authorizationDispatch({
                type: AuthorizationSteps.AUTH_IN_PROGRESS
            })
        }).catch((error: Error) => {
            setIsError(true)
            setError({
                title: 'Ошибка регистрации номера телефона',
                message: error.message
            })
        }).finally(() => {
            setIsPending(false)
        })
    }


    return createProfile
}