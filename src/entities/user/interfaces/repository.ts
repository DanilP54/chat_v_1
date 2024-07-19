import { db } from "@/shared/config/firebase"
import { DocumentData as DocumentDto, Firestore, doc, getDoc, setDoc } from "firebase/firestore"

export interface UserRepository {
    save(id: UniqueId, data: Omit<UserDTO, "id">): Promise<void>
    get(userId: UniqueId): Promise<DocumentDto | undefined>
    // setAvatar(File: File): Promise<void>
    // getAvatar(source: string): Promise<void>
}

interface UserDTO {
    id: UniqueId,
    firstName: string,
    lastName: string,
    avatar: string | null
}

export class UserRepos implements UserRepository {

    private readonly db: Firestore = db
    private readonly collectionName = 'users'

    constructor() { }

    async save(id: UniqueId, data: Omit<UserDTO, "id">): Promise<void> {
        try {

            await setDoc(doc(this.db, this.collectionName, id), data)

            // update doc
        }
        catch (error: unknown) {
            console.log(error)
        }
    }


    async get(userId: string): Promise<DocumentDto | undefined> {
        try {
            const accountData = await getDoc(doc(this.db, this.collectionName, userId))
            if (accountData.exists()) {
                return accountData.data()
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export const userRepoInstance = new UserRepos()