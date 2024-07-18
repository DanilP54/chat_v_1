import {Chat} from "@/entities/AggregateRoot.ts";
import {AggregateRoot} from "@/kernel/domain/aggregate.root.ts";

export interface IUser {
    firstname: string,
    lastName: string,
    avatar: string,
    chats: IChat[],
    blockedUsers: string[]
}


export class User extends AggregateRoot<IUser>{

    private constructor(user: IUser, id: UniqueId) {
        super(user, id)
    }

    static create(user: IUser, id: string) {
         return new User(user, id)
    }

    public addChat(chat: Chat) {
        this.user.chats.push(chat)
    }

    public getChat(chatId: UniqueId) {
        return this._data.chats.find(chat => chat.id === chatId)
    }
}