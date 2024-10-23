// import { ViewerAvatar } from "@/entities/avatar/avatar.model"
import { ViewerProfile } from "../current.user.entity.ts"

type ViewerProfileId = string

export interface ViewerProfileService {
    getViewerProfileById(viewerId: ViewerProfileId): Promise<ViewerProfile | undefined>
    saveViewerProfile(viewerId: ViewerProfileId, data: ViewerProfile): Promise<void>
    // saveAvatarOfViewer(viewerId: string, data: ViewerAvatar): Promise<void>
}