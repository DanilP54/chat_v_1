import { useState } from "react";
import { useAuth } from "@/entities/session/application/authenticate";
import { useAuthContext } from "@/entities/session/ui/session-provider";

export const useConfirmationCode = () => {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const authService = useAuth()
    const { updateSessionStatus } = useAuthContext()


    const confirm = async (otp: string) => {

        setIsError(false)
        setIsPending(true)

        await authService.verificationCode(otp)
            .then((response) => {

                // if(response?.isNewUser) {

                // }
                updateSessionStatus('SESSION_INITIALIZING')
            })
            .catch(() => {
                setIsError(true)
            })
            .finally(() => {
                setIsPending(false)
            })
    }

    return {
        confirm,
        isPending,
        isError,

    }
}