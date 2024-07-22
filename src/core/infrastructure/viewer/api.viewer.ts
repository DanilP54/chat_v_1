import { Viewer } from "@/core/domain/viewer/viewer.entity"

export class ApiViewer {

    constructor(
        private readonly firstname: string,
        private readonly lastname: string,
        private readonly avatar: string | null,
        private readonly chats: object[],
        private readonly blockedUsers: UniqueId[]
    ) { }


    toDomain(uid: UniqueId): Viewer {

        const viewerOrError = Viewer.create({
            firstName: this.firstname,
            lastName: this.lastname,
            avatar: this.avatar,
            chatCollection: this.chats,
            blockedUsers: this.blockedUsers,
        }, uid)

        if (!viewerOrError.isSuccess) {
            throw new Error('Возникла ошибка при мапинге объекта из хранилища в user domain')
        }

        return viewerOrError.getValue()

    }
}