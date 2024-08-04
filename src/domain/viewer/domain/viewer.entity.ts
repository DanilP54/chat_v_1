import {ViewerProfile} from "@/domain/viewer-profile/domain/viewer.profile.entity.ts";

type ViewerId = string
type ViewerPhoneNumber = string

// Aggregate

export type CurrentViewer = {
    id: ViewerId,
    phone_number: ViewerPhoneNumber,
    profile: ViewerProfile | null,
}







