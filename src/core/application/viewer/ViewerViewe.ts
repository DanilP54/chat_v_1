import { Viewer } from "@/core/domain/viewer/viewer.entity";


export class ViewerView {
    private constructor(
        private readonly id: string,
        private readonly fullname: string,
        private readonly avatar: string | null,
        private readonly chats: object[],
        private readonly blockedUsers: UniqueId[],
    ) { }

    static fromDomain(viewer: Viewer): ViewerView {

        const { firstName, lastName, avatar, chatCollection, blockedUsers } = viewer.data
        const viewerId = viewer.id

        return new ViewerView(viewerId.toString(), `${firstName} ${lastName}`, avatar, chatCollection, blockedUsers)
    }

    get data(): ViewerView {
        return this
    }
}