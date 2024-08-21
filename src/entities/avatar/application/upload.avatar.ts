import {AvatarService} from "@/entities/avatar/application/ports.ts";
import {useAvatar} from "@/entities/avatar/services/avatar.adapter.ts";

export function useUploadAvatar() {

    const avatar: AvatarService = useAvatar()

    const execute = async (file: File, id: string) => {
        if(!file) {
            return new Error('Загрузите файл')
        }

        await avatar.save(file, id)

    }

    return {execute}

}