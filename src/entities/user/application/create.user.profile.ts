import { createUserProfile } from "../user.model"
import { useUserAdapter } from "../sevices/user.adapter"
import { UserFormProfileData } from "@/entities/viewer/application/create.viewer.profile"
import { useAvatarStorage } from "@/entities/avatar/services/avatar.adapter"
import { User } from "../user.model"

export const useCreateUserProfile = () => {

    const { saveUserProfile } = useUserAdapter()
    const { uploadFile } = useAvatarStorage()


    const uploadAvatar = async (avatar: File | undefined, userId: string) => {

        if (!avatar) return

        return uploadFile(avatar, userId)
    }


    const execute = async (currentUser: User, formProfileData: UserFormProfileData) => {

        const { first_name, last_name, avatar } = formProfileData
        const { id, phone_number } = currentUser

        const avatar_url = await uploadAvatar(avatar, id)

        const userProfile = createUserProfile({
            first_name,
            last_name,
            phone_number,
            avatar_url: avatar_url ?? null
        }, id)


        await saveUserProfile(id, userProfile)

    }


    return { execute }
}