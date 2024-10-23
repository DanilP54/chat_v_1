import {StorageService} from "../application/ports";
import {
    UploadTaskSnapshot,
    StorageError,
} from "firebase/storage";
import {BaseStoragePath} from "@/shared/api";
import {StorageApi} from "@/shared/api/storage.api.ts";

type Observes<SnapshotType, ErrorType> = {
    onProgress: (snapshot: SnapshotType) => void
    onError?: (err: ErrorType) => void
    onSuccess?: () => void
}

export function useAvatarStorage(): StorageService {

    const avatarStorage = new StorageApi(BaseStoragePath.AVATARS)

    return {

        async uploadFileResumable(file, viewerId, observes: Observes<UploadTaskSnapshot, StorageError>): Promise<string | undefined> {

            const uploadTask = avatarStorage.resumableUpload(
                `${viewerId}/${file.name}`,
                file
            )

            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    observes.onProgress,
                    observes.onError,
                    async () => {
                        try {
                            const url = await avatarStorage.getUrl(uploadTask.snapshot.ref)
                            resolve(url)
                        } catch (e) {
                            reject(e)
                        }
                    }
                )
            })
        },
        async uploadFile(file: File, viewerId: string): Promise<string> {

            return await avatarStorage.uploadAndGetUrl(
                `${viewerId}/${file.name}`,
                file
            )

        },
    }
}