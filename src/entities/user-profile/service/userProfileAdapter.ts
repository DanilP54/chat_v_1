import { UserProfile } from "../profile.model";
import { UserProfileService } from "../application/ports";
import { DatabaseCollections } from "@/shared/api";
import { DatabaseAPI } from "@/shared/api/database.api";
import { userProfileConverter } from "../mapper/userProfileConverter";

export function useUserProfileAdapter(): UserProfileService {

    const viewerDbApi = new DatabaseAPI(DatabaseCollections.USERS, new userProfileConverter())

    return {
        async getUserProfileById(viewerId): Promise<UserProfile | undefined> {
            try {

                const viewerProfile = await viewerDbApi.getDocById(viewerId)

                if (viewerProfile.exists()) {
                    return viewerProfile.data()
                }

            } catch (e) {
                console.error(e)
            }
        },

        // async saveUserProfile(viewerId, data): Promise<void> {
        //     try {
        //         await viewerDbApi.updateDocById(viewerId, data)
        //     } catch (e) {
        //         console.error(e)
        //     }
        // },

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