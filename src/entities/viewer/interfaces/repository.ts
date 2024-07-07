import { db } from "@/shared/config/firebase"
import { DocumentData as DocumentDto, Firestore, doc, getDoc, setDoc } from "firebase/firestore"

export interface ViewerRepository {
    save(id: UniqueId, data: Omit<ViewerDto, "id">): Promise<void>
    getViewer(viewerId: UniqueId): DocumentDto
    // setAvatar(File: File): Promise<void>
    // getAvatar(source: string): Promise<void>
}

interface ViewerDto {
    id: UniqueId,
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | undefined
}

export class ViewerRepos implements ViewerRepository {

    private readonly db: Firestore = db
    private readonly collectionName = 'users'
    // constructor(db: Firestore) {
    //     this.db = db
    // }

    async save(id: UniqueId, data: Omit<ViewerDto, "id">): Promise<void> {
        try {
            await setDoc(doc(this.db, this.collectionName, id), data)
        }
        catch (error: unknown) {
            console.log(error)
        }
    }


    async getViewer(viewerId: string): DocumentDto {
        try {
            const docSnap = await getDoc(doc(this.db, this.collectionName, viewerId))
            if (docSnap.exists()) {
                return docSnap.data()
            } else {
                console.log('Нет данных')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

}

export const viewerRepoInstance = new ViewerRepos()