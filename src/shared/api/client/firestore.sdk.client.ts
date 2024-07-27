import { db } from "@/shared/config/firebase"
import { DocumentData, Firestore, doc, getDoc, setDoc } from "firebase/firestore"


type CollectionsType = 'users' | 'chats'

export class FirestoreClient {

    private readonly firestore: Firestore = db


    async getDoc<ResponseType>(id: UniqueId, collection: CollectionsType): Promise<ResponseType | undefined> {
        const response = await getDoc(doc(this.firestore, collection, id))
        return response.data() as ResponseType
    }

    async setDoc<DataType extends DocumentData>(id: UniqueId, collection: CollectionsType, data: DataType) {
        await setDoc(doc(this.firestore, collection, id), data)
    }
}