import { db } from "@/shared/config/firebase"
import { DocumentData as DocumentDto, Firestore, doc, getDoc, setDoc } from "firebase/firestore"

export interface ViewerRepository {
    save(id: UniqueId, data: Omit<ViewerDto, "id">): Promise<void>
    get(viewerId: UniqueId): Promise<DocumentDto | undefined>
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


    async get(viewerId: string): Promise<DocumentDto | undefined> {
            try {
                const accountData =  await getDoc(doc(this.db, this.collectionName, viewerId))
                if(accountData.exists()) {
                    return accountData.data()
                } else {
                    return undefined
                }
            } catch (error) {
                console.log(error)
            }
    }

}

export const viewerRepoInstance = new ViewerRepos()