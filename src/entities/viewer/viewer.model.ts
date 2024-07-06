import { Entity } from "@/kernel/abstract.entity";
import { Chat } from "../chat/chat.model";
import { DocumentData as DocumentDto, Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/shared/config/firebase";

// Entity

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

// Dto


interface ViewerDto {
    id: UniqueId,
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | undefined
}

// Mapper

export class ViewerMap {

    public static toPersistence(dto: ViewerDto): Omit<ViewerDto, 'id'> {
        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar
        }
    }

    public static toDomain(dto: DocumentDto, uid: string) {
        return Viewer.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar || undefined,
            blocked: dto.blocked || [],
            chats: dto.chats || []
        }, uid)
    }
}

// Repository

export interface ViewerRepository {
    save(viewer: ViewerDto): Promise<void>
    getViewer(viewerId: UniqueId): Promise<Viewer | undefined>
    // setAvatar(File: File): Promise<void>
    // getAvatar(source: string): Promise<void>
}



export class ViewerRepos implements ViewerRepository {

    private readonly db: Firestore = db
    private readonly collectionName = 'users'
    // constructor(db: Firestore) {
    //     this.db = db
    // }

    async save(viewer: ViewerDto): Promise<void> {
        try {
            const data = ViewerMap.toPersistence(viewer)
            await setDoc(doc(this.db, this.collectionName, viewer.id), data)
        }
        catch (error: unknown) {
            console.log(error)
        }
    }


    async getViewer(viewerId: string): Promise<Viewer | undefined> {
        try {
            const docSnap = await getDoc(doc(this.db, this.collectionName, viewerId))
            if (docSnap.exists()) {
                const data = docSnap.data()
                return ViewerMap.toDomain(data, viewerId)
            } else {
                console.log('Нет данных')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

}

export const viewerRepoInstance  = new ViewerRepos()


export class ViewerService {

    private readonly firebase: ViewerRepository = viewerRepoInstance

    async getViewerById(viewerId: string) {
        const res = await this.firebase.getViewer(viewerId)
        return res
    }

    async setViewerToDB(viewer: ViewerDto) {
        const res = await this.firebase.save(viewer)
        console.log(res)
    }

}

export const viewerService = new ViewerService()

