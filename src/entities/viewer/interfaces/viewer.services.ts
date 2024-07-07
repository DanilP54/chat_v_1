import { ViewerMap } from "./mapper"
import { ViewerRepository, viewerRepoInstance } from "./repository"

interface ViewerDto {
    id: UniqueId,
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | undefined
}

export class ViewerService {

    private readonly firebase: ViewerRepository = viewerRepoInstance

    async getViewerById(viewerId: string) {
        const data = this.firebase.getViewer(viewerId)
        return ViewerMap.toDomain(data, viewerId)

    }

    async setViewerToDB(viewer: ViewerDto) {
        const data = ViewerMap.toPersistence(viewer)
        const res = await this.firebase.save(viewer.id, data)
        console.log(res)
    }

}

export const viewerService = new ViewerService()