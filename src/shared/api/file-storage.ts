import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase";



type FoldersStorage = "avatars" | "post"


type PathStorage = {
  folder: FoldersStorage;
  userId: string;
};

class FileStorage {
  async uploadImage(file: File | null, path: PathStorage) {
    if(!file) return null
    if(!(file instanceof File)) return null
    const { ref } = await this.upload(file, `${path.folder}/${path.userId}`);
    return await this.getUrl(ref);
  }
  private async upload(file: File, path: string) {
    const pathRef = ref(storage, path);
    return await uploadBytes(pathRef, file);
  }
  private async getUrl(ref: StorageReference) {
    return await getDownloadURL(ref);
  }
}

export const fileStorage = new FileStorage();
