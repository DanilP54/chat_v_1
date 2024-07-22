import { db } from "@/shared/config/firebase"
import { DocumentData, Firestore, doc, getDoc, setDoc } from "firebase/firestore"
import { FirestoreCollections } from "./enum"

export class FirestoreClient {

    private readonly db: Firestore = db

    async get<ResponseType>(id: UniqueId, collection: FirestoreCollections): Promise<ResponseType | undefined> {
        const response = await getDoc(doc(this.db, collection, id))
        return response.data() as ResponseType
    }

    async set<DataType extends DocumentData>(id: UniqueId, collection: FirestoreCollections, data: DataType) {
        await setDoc(doc(this.db, collection, id), data)
    }
}