import { useState } from "react";
import { AuthorizationError } from "@/shared/types";
import { UserFormProfileData } from "@/entities/viewer/application/create.viewer.profile";
import { useAuthContext } from "@/entities/session/ui/session-provider";
import { useCreateUserProfile } from "@/entities/user/application/create.user.profile";


export const useCreateProfileData = () => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | null>(null)

    const createUserProfileUseCase = useCreateUserProfile()

    const { getUserCredentials, updateSessionStatus } = useAuthContext()


    async function create(formData: UserFormProfileData) {

        try {
            setIsPending(true)
            setIsError(false)
            setError(null)


            const userCreds = getUserCredentials()

            await createUserProfileUseCase.execute(userCreds, formData)

            updateSessionStatus('USER_PROFILE_LOADING')

        } catch (e) {
            setIsError(true)
            setError({
                title: 'Ошибка регистрации номера телефона',
                message: e.message
            })
        } finally {
            setIsPending(false)
        }
    }

    return {
        create,
        isPending,
        isError,
        error
    }
}