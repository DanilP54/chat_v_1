// import {AvatarModel} from "@/entities/avatar";
import {ViewerEntity} from "@/entities/viewer";

import {useViewerProfile} from "../services/viewer.profile.adapter"
import {useAvatarStorage} from "@/entities/avatar/services/avatar.adapter.ts";


export type ViewerFieldsFromFormDto = {
    avatar?: File,
    first_name: string,
    last_name: string,
    phone_number: string
}

export const useCreateViewerProfile = () => {

    const viewerProfile = useViewerProfile()
    const avatarStorage = useAvatarStorage()


    const uploadAvatar = async (avatar: File | undefined, viewerId: string): Promise<string | null> => {

        if (!avatar) return null

        return await avatarStorage.uploadFile(avatar, viewerId)

    }

    async function execute(viewerId: string, data: ViewerFieldsFromFormDto) {

        const {first_name, last_name, phone_number, avatar} = data

        const avatarUrl = await uploadAvatar(avatar, viewerId)

        const newViewerProfile = ViewerEntity.createViewerProfile({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            avatar: avatarUrl
        }, viewerId)

        await viewerProfile.saveViewerProfile(viewerId, newViewerProfile)

    }

    return {execute}
}