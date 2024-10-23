import {ViewerProfile} from "../current.user.entity.ts";
import {ViewerConverter} from "@/entities/viewer/mappers/viewer.converter.ts";
import {ViewerProfileService} from "../application/ports";
import {DatabaseCollections} from "@/shared/api";
// import {AvatarConverter} from "@/entities/avatar/mappers/avatar.converter";
import {DatabaseAPI} from "@/shared/api/database.api";
// import {ViewerAvatar} from "@/entities/avatar/avatar.model";
// import {UserAvatarDbModel} from "@/shared/types/firestore.type";

export function useViewerProfile(): ViewerProfileService {

    const viewerDbApi = new DatabaseAPI(DatabaseCollections.USERS, new ViewerConverter())

    return {
        async getViewerProfileById(viewerId): Promise<ViewerProfile | undefined> {
            try {

                const viewerProfile = await viewerDbApi.getDocById(viewerId)

                if (viewerProfile.exists()) {
                    return viewerProfile.data()
                }

            } catch (e) {
                console.error(e)
            }
        },

        async saveViewerProfile(viewerId, data): Promise<void> {
            try {
                await viewerDbApi.updateDocById(viewerId, data)
            } catch (e) {
                console.error(e)
            }
        },

        // async saveAvatarOfViewer(viewerId, data): Promise<void> {
        //     try {
        //
        //         if (data.id) {
        //             await viewerDbApi.updateDocInSubCollectionsById<ViewerAvatar, UserAvatarDbModel>(
        //                 data,
        //                 viewerId,
        //                 [{path: DatabaseCollections.AVATARS, id: data.id}],
        //                 new AvatarConverter()
        //             )
        //
        //             return
        //         }
        //
        //         await viewerDbApi.setNewDocInSubCollections<ViewerAvatar, UserAvatarDbModel>(
        //             data,
        //             viewerId,
        //             [{path: DatabaseCollections.AVATARS}],
        //             new AvatarConverter()
        //         )
        //
        //
        //     } catch (e) {
        //         console.error(e)
        //     }
        //
        // }
    }
}