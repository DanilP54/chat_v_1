import { useViewerProfile } from "../services/viewer.profile.adapter"
import { useAvatarStorage } from "@/entities/avatar/services/avatar.adapter.ts";
import { createUserProfile } from "@/entities/user/user.model";


export type UserFormProfileData = {
    avatar?: File,
    first_name: string,
    last_name: string,
}

type CurrentUser = {
    id: string,
    phoneNumber: string
}


export const useCreateViewerProfile = () => {

    const viewerProfile = useViewerProfile()
    const avatarStorage = useAvatarStorage()

    const uploadAvatarAndGetUrl = async (avatar: File | undefined, viewerId: string): Promise<string | null> => {

        if (!avatar) return null

        return avatarStorage.uploadFile(avatar, viewerId)

    }

f    async function execute(currentUser: CurrentUser, formProfileData: ViewerFieldsFromFormDto) {


        const { id, phoneNumber } = currentUser
        const { first_name, last_name, avatar } = formProfileData

        const avatarUrl = await uploadAvatarAndGetUrl(avatar, id)

        const newViewerProfile = createUserProfile({
            first_name: first_name,
            last_name: last_name,
            phone_number: phoneNumber,
            avatar: avatarUrl
        }, id)

        await viewerProfile.saveViewerProfile(id, newViewerProfile)

    }

    return { execute }
}