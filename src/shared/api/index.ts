import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc
} from "firebase/firestore"
import {db} from "../config/firebase"





export const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot, options?: SnapshotOptions) => {
        return snapshot.data(options) as T
    }
})

const dataPoint = <T>(collectionPath: string, id: string) => {
    return doc(db, collectionPath, id).withConverter(converter<T>())
}

const dbCollec = {
    users: dataPoint
}


export const getOne = async (target: DBCollection, uid: string,) => {

    const documentRef = dbCollec.users<UserResponseDto>('/users', '123')

    return await getDoc(documentRef)
}

export const getMany = async (target: DBCollection, options: object) => {
    const q = query(collection(db, target))
    const querySnapshot = await getDocs(q);

}


export const create = async (target: DBCollection, data: unknown) => {
    return await setDoc(doc(db, target), data)
}


export const update = async (target: DBCollection, id: string, data: unknown) => {
    return await setDoc(doc(db, target, id), data)
}


export const dalete = async (target: DBCollection, id: string) => {
    return await deleteDoc(doc(db, target, id));
}




