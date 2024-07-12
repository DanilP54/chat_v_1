import { Entity } from "@/kernel/abstract.entity";
import { Chat } from "../chat/chat.model";

interface IUser {
    firstName: VFirstName;
    lastName: VLastName;
    avatar: VAvatar | undefined;
    chats: Chat[] | null;
    blocked: UniqueId[] | null;
}

export class User extends Entity<IUser> {

    private constructor(user: IUser, id: string) {
        super(user, id)
    }

    static create(object: IUser, id: string): User {
        return new User(object, id)
    }
}







