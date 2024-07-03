import { Entity } from "@/kernel/abstract.entity";
import { Chat } from "../chat/chat.model";
import { Firestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/shared/config/firebase";



interface IViewer {
    firstName: VFirstName;
    lastName: VLastName;
    avatar: VAvatar | undefined;
    chats: Chat[] | null;
    blocked: UniqueId[] | null;
}



export class Viewer extends Entity<IViewer> {

    private constructor(viewer: IViewer, id: string) {
        super(viewer, id)
    }

    static create(object: IViewer, uid: string): Viewer {
        return new Viewer(object, uid)
    }
}


interface ViewerDto {
    id: UniqueId,
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | undefined
}


export class ViewerMap {

    public static toPersistence(dto: ViewerDto): Omit<ViewerDto, 'id'> {
        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar
        }
    }

    public static toDomain(dto, uid: string) {
        return Viewer.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: undefined,
            chats: null,
            blocked: null,
        }, uid)
    }
}



interface ViewerRepository {
    save(viewer: ViewerDto): Promise<void>
    getViewer(viewerId: UniqueId): Promise<void>
}



class FirebaseViewerRepo implements ViewerRepository {

    private readonly db: Firestore;

    constructor(db: Firestore) {
        this.db = db
    }

    async save(viewer: ViewerDto): Promise<void> {
        try {
            const data = ViewerMap.toPersistence(viewer)
            const docRef = await setDoc(doc(this.db, 'users', viewer.id), data)
            return docRef
        }
        catch (error: unknown) {
            console.log(error)
        }
    }

    async getViewer(viewerId: string): Promise<void> {
        try {
            const docSnap = await getDoc(doc(this.db, 'users', viewerId))
            if (docSnap.exists()) {
                console.log(docSnap.data())
            } else {
                console.log('Нет данных')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

}

export const request = new FirebaseViewerRepo(db)