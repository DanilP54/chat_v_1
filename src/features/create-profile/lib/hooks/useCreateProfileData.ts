import { userService } from "@/entities/user/interfaces/user.services";
import { useState } from "react";
import { AuthorizationError, AuthorizationSteps } from "@/shared/types";
import { useDispatchContext } from "@/core/session/ui/auth-provider.tsx";

interface UserDTO {
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | null
}



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

    async function create(values: any, userId: any) {
        try {
            setIsPending(true)
            setIsErrorCreatePD(false)
            setError(null)

            await userService.setUserToDB(userId, {
                firstName: values.firstname,
                lastName: values.lastname,
                avatar: null,
            })

            authorizationDispatch({ type: AuthorizationSteps.AUTH_IN_PROGRESS })

        } catch (error: any) {
            setIsErrorCreatePD(true)
            setError({
                title: 'Ошибка регистрации номера телефона',
                message: error.message
            })
        } finally {
            setIsPending(false)
        }
    }
    //         firstName: values.firstname,
    //         lastName: values.lastname,
    //         avatar: null,
    //     } as UserDTO).then(() => {
    //         authorizationDispatch({
    //             type: AuthorizationSteps.AUTH_IN_PROGRESS
    //         })
    //     }).catch((error: Error) => {
    //         setIsErrorCreatePD(true)
    //         setError({
    //             title: 'Ошибка регистрации номера телефона',
    //             message: error.message
    //         })
    //     }).finally(() => {
    //         setIsPending(false)
    //     })
    // }


    return createProfile
}