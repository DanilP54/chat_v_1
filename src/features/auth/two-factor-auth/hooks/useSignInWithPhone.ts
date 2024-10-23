import { useState } from "react";
import { useAuth } from "@/entities/session/application/authenticate";

export const useSignInWithPhone = () => {

    const [isPending, setIsPending] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false)

    const authService = useAuth();

    const signIn = async (phoneNumber: string) => {

        // setIsPending(true)

        return await authService.signInWithPhone(phoneNumber)
            // .then(() => {
            //     setIsSuccess(true)
            // })
            // .catch(() => {
            //     setIsSuccess(false)
            // })
            // .finally(() => {
            //     setIsPending(false)
            // })


    }

    return {
        isPending,
        isSuccess,
        signIn
    }
}