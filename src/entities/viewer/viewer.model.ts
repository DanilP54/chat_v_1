import { Entity } from "@/kernel/abstract.entity";
import { Chat } from "../chat/chat.model";

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







