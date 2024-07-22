import { User } from "firebase/auth"

export type AuthResult =
    {
        user: User,
        isNewUser: boolean | undefined
    } 