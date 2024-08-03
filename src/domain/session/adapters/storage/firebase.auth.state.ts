import {onAuthStateChanged, Unsubscribe, User} from "firebase/auth";
import {auth} from "@/shared/config/firebase.ts";

type GetAuthStateType<ResponseType> = () => ResponseType

export const getAuthState: GetAuthStateType<{ unsubscribe: Unsubscribe, currentUser: User | null }> = () => {

    let currentUser: User | null = null

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user
        } else {
            currentUser = null
        }
    })


    const authState = {
        unsubscribe,
        currentUser
    }

    return authState
}