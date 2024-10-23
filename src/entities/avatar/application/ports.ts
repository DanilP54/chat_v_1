import { ViewerAvatar } from "../avatar.model"

type ViewerProfileId = string

type Observes = {
    onProgress: (snapshot: any) => void
    onError: (err: any) => void
    onSuccess: () => void
}

export interface StorageService {
    uploadFileResumable(file: File, viewerId: string, observes: Observes): Promise<string | undefined>
    uploadFile(file: File | undefined, viewerId: string): Promise<string>
}