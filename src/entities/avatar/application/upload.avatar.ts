import {AvatarService} from "@/entities/avatar/application/ports.ts";
import {useAvatar} from "@/entities/avatar/services/avatar.adapter.ts";
import {UploadTaskSnapshot, StorageError} from "firebase/storage";


type Observes<SnapshotType, ErrorType> = {
    onProgress: (snapshot: SnapshotType) => void
    onError: (err: ErrorType) => void
    onSuccess: () => void
}

export function useUploadAvatar() {

    const avatar: AvatarService = useAvatar()

    const execute = (file: File, id: string, observes: Observes<UploadTaskSnapshot, StorageError>) => {
        
        if(!file) {
            return
        }
        
        avatar.saveWithProgressState(file, id, observes)

    }

    return {execute}

}