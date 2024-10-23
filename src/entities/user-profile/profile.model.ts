import { User } from "../user/user.model"
import { UserDbModel } from "@/shared/types/firestore.type"

export interface UserProfile extends User {
    firstName: string
    lastName: string
    avatar?: string
}

export function createUserProfile(userDto: UserDbModel, id: string): UserProfile {

    const { first_name, last_name, avatar_url, phone_number } = userDto
    return {
        id,
        firstName: first_name,
        lastName: last_name,
        avatar: avatar_url,
        phoneNumber: phone_number
    }
}   
