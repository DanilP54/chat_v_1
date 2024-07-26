import { db } from "@/shared/config/firebase"
import { FirestoreCollections } from "@/shared/types"
import { DocumentData, Firestore, doc, getDoc, setDoc } from "firebase/firestore"


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