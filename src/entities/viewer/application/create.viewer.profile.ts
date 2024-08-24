import {AvatarModel} from "@/entities/avatar";
import {ViewerModel} from "..";
import {useViewerProfile} from "../services/viewer.profile.adapter"
import {useAvatar} from "@/entities/avatar/services/avatar.adapter.ts";

export type ViewerFieldsFromFormDto = {
    avatar?: File,
    first_name: string,
    last_name: string,
    phone_number: string,

}

export const useCreateViewerProfile = () => {

    const viewerProfile = useViewerProfile()
    const viewerAvatar = useAvatar()

    async function execute(viewerId: string, data: ViewerFieldsFromFormDto) {

        const {first_name, last_name, phone_number, avatar} = data

        const newProfile = ViewerModel.createViewerProfile({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
        }, viewerId)

        await viewerProfile.save(viewerId, newProfile)

        if (avatar) {
            let url = await viewerAvatar.uploadAvatar(avatar, viewerId)

            const newAvatar = AvatarModel.createViewerAvatar({
                primary: true,
                url,
            }, viewerId)

            await viewerAvatar.save(viewerId, newAvatar)
        }

    }

    return {execute}
}