import { useState } from "react";
import { AuthorizationError, AuthorizationSteps } from "@/shared/types";
import { useDispatchContext } from "@/entities/session/ui/auth-provider";
import { useCreateViewerProfile } from "@/entities/viewer";
import { ViewerFieldsFromFormDto } from "@/entities/viewer/application/create.viewer.profile";


export const useCreateProfileData = () => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<AuthorizationError | null>(null)
    const authorizationDispatch = useDispatchContext()

    const createProfileDb = useCreateViewerProfile()

    async function create(values: ViewerFieldsFromFormDto, userId: string) {

        try {
            setIsPending(true)
            setIsError(false)
            setError(null)


            await createProfileDb.execute(userId, {
                first_name: values.first_name,
                last_name: values.last_name,
                phone_number: values.phone_number,
                avatar: values.avatar
            })

            authorizationDispatch({ type: AuthorizationSteps.AUTH_IN_PROGRESS })

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