import {AvatarModel} from "@/entities/avatar";
import {ViewerModel} from "@/entities/viewer";

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

    async function execute(viewerId: string, data: ViewerFieldsFromFormDto) {

        const {first_name, last_name, phone_number, avatar} = data

        const newProfile = ViewerModel.createViewerProfile({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
        }, viewerId)

        await viewerProfile.saveViewerProfile(viewerId, newProfile)

        if (avatar) {

            const url = await avatarStorage.uploadFile(avatar, viewerId)

            const newAvatar = AvatarModel.createViewerAvatar({
                primary: true,
                url,
            })

            await viewerProfile.saveAvatarOfViewer(viewerId, newAvatar)
        }

    }

    return {execute}
}