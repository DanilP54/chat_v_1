import { userService } from "@/entities/user/interfaces/user.services";
import { useState } from "react";
import { AuthorizationError, AuthorizationSteps } from "@/shared/types";
import { useDispatchContext } from "@/entities/session/ui/auth-provider.tsx";

export const useCreateProfileData = () => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isErrorCreatePD, setIsErrorCreatePD] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | null>(null)
    const authorizationDispatch = useDispatchContext()

    const createProfile = {
        create,
        isPending,
        isErrorCreatePD,
        error
    }

    async function create(values, userId) {

        setError(null)
        setIsErrorCreatePD(false)
        setIsPending(true)

        await userService.setUserToDB(userId, {
            firstName: values.firstname,
            lastName: values.lastname,
            avatar: 'https' || undefined,
        }).then(() => {
            authorizationDispatch({
                type: AuthorizationSteps.AUTH_IN_PROGRESS
            })
        }).catch((error: Error) => {
            setIsErrorCreatePD(true)
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