import { ViewerModel } from "..";
import { useViewerProfile } from "../services/viewer.profile.adapter"
import { useAvatar } from "@/entities/avatar/services/avatar.adapter.ts";

export type ViewerFieldFromFormDto = {
    avatar?: File,
    first_name: string,
    last_name: string,
    phone_number: string,

}

export const useCreateViewerProfile = () => {

    const viewerProfile = useViewerProfile()
    const avatarStorage = useAvatar()

    async function execute(viewerId: string, data: ViewerFieldFromFormDto) {

        console.log('data: ', data)

        if (data.avatar) {
            await avatarStorage.save(data.avatar, viewerId)
        }

        // если есть аватар, создать его, сохранить в storage, url добавить в подколлекцию users

        const newProfile = ViewerModel.createViewerProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
        }, viewerId)

        // убрать chat room из модели viewer profile и из firestore
        await viewerProfile.save(viewerId, newProfile)
        // создать нового viewer и сохранить его в базу данных


    }


    return { execute }
}