import {
    DocumentData,
    FirestoreDataConverter,
    WithFieldValue,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    query, where
} from "firebase/firestore"

import {db} from "../config/firebase"


type SubPathesType = {
    path: string,
    id?: string
}


export class DatabaseAPI<EntityType, DBModelType extends DocumentData> {

    private database = db

    constructor(
        private path: string,
        private converter: FirestoreDataConverter<EntityType, DBModelType>
    ) {
    }


    async getDocById(id: string) {
        return await getDoc(doc(this.database, this.path, id)
            .withConverter(this.converter))
    }

    async getAllDocs(constraints?: any) {

        if (constraints) {
            const q = query(collection(this.database, this.path)
                .withConverter(this.converter), where())

            return await getDocs(q)
        }

        return await getDocs(collection(this.database, this.path)
            .withConverter(this.converter))
    }

    async getDocsFromSubCollections<EntityType, DBModelType extends DocumentData>(
        primaryIdDoc: string,
        subPath: string[],
        converter: FirestoreDataConverter<EntityType, DBModelType>) {

        return await getDocs(collection(this.database, this.path, primaryIdDoc, ...subPath)
            .withConverter(converter))
    }

    async setNewDoc(data: WithFieldValue<EntityType>) {
        return await setDoc(doc(this.database, this.path)
            .withConverter(this.converter), data)
    }

    async updateDocById(id: string, data: WithFieldValue<EntityType>) {
        console.log(data)
        return await setDoc(doc(this.database, this.path, id)
             .withConverter(this.converter), data)
    }

    async updateDocInSubCollectionsById<T, D extends DocumentData>(
        data: WithFieldValue<T>,
        primaryIdDoc: string,
        segments: SubPathesType[],
        converter: FirestoreDataConverter<T, D>
    ) {

        const pathSegments = segments.flatMap(obj => {

            if (!obj.id) {
                throw new Error("id is required")
            }

            return [obj.path, obj.id]

        })

        return await setDoc(doc(collection(this.database, this.path, primaryIdDoc, ...pathSegments)).withConverter(converter), data)
    }

    async setNewDocInSubCollections<T, D extends DocumentData>(
        data: WithFieldValue<T>,
        primaryIdDoc: string,
        segments: SubPathesType[],
        converter: FirestoreDataConverter<T, D>
    ) {

        const pathSegments = segments.flatMap(obj => {

            const elements = [obj.path];

            const lastId = segments.at(-1)?.id
            const lastPath = segments.at(-1)?.path

            if (lastId) {
                throw new Error(`When adding a new document, the database automatically assigns an id, so the ${lastId} in ${lastPath} is redundant`)
            }

            if (obj.id !== undefined) {
                elements.push(obj.id)
            }

            return elements

        })

        return await setDoc(doc(collection(this.database, this.path, primaryIdDoc, ...pathSegments)).withConverter(converter), data)
    }

}


