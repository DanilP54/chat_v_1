import { ViewerMap } from "./mapper"
import { ViewerRepository, viewerRepoInstance } from "./repository"
import {Viewer} from "@/entities/viewer/viewer.model.ts";

interface ViewerDto {
    id: UniqueId,
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | undefined
}

export class ViewerService {

    private readonly firebase: ViewerRepository = viewerRepoInstance

    async getViewerProfileData(userId: string): Promise<Viewer | undefined> {
        const data = await this.firebase.get(userId)
        return data ? ViewerMap.toDomain(data, userId) : undefined
    }

    async setViewerToDB(viewer: ViewerDto) {
        const data = ViewerMap.toPersistence(viewer)
        const res = await this.firebase.save(viewer.id, data)
        console.log(res)
    }

}

export const viewerService = new ViewerService()