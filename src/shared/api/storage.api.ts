import {
    StorageReference,
    FirebaseStorage,
    UploadMetadata,
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable
} from "firebase/storage"
import {storage} from "@/shared/config/firebase.ts";

export class StorageApi {

    private storage = storage

    constructor(
        private basePath: string
    ) {
    }

    async uploadAndGetUrl(additionalPath: string, file: File, metadata?: UploadMetadata) {
        const pathRef = ref(this.storage, this.basePath + additionalPath);
        const uploadResult = await uploadBytes(pathRef, file, metadata)
        return await getDownloadURL(uploadResult.ref)

    }

    resumableUpload(additionalPath: string, file: File, metadata?: UploadMetadata) {
        const pathRef = ref(this.storage, this.basePath + additionalPath)
        return uploadBytesResumable(pathRef, file, metadata)
    }

    async getUrl(ref: StorageReference) {
        return await getDownloadURL(ref)
    }
}
