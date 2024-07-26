import {Viewer} from "@/core/models/viewer/viewer.entity";
import {ViewerRepository} from "@/core/models/viewer/viewer.repository";
import {FirestoreClient} from "../firestore.sdk.client";
import {FirestoreCollections} from "../enum";
import {ApiViewer} from "./api.viewer";

function isViewerType(value: unknown): value is ApiViewer {
    return value instanceof ApiViewer
}

export class ViewerResource implements ViewerRepository {

    constructor(
        private readonly firestoreClient: FirestoreClient
    ) {
    }

    async getViewer(id: string): Promise<Viewer | undefined> {
        try {
            const data = await this.firestoreClient.get<ApiViewer>(id, FirestoreCollections.Users)

            if (isViewerType(data)) {
                return data.toDomain(id)
            }

        } catch (e) {
            console.log(e)
        }
    }

    async save(id: string, data: any): Promise<void> {

    }
}