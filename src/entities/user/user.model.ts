import {Entity} from "@/kernel/domain/entity.ts";
import {Chat} from '../AggregateRoot.ts'

interface IUser {
    firstName: string;
    lastName: string;
    avatar: string | undefined;
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









