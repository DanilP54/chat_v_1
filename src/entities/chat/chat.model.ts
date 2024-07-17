import { Entity } from "@/kernel/domain/entity";
import { IUser } from "../user/user.model";

// value object

interface IParticipantInfo {
    avatar: UAvatar;
    firstName: UFirstName;
    lastName: ULastName;
}

interface IChatPrewiew {
    participantInfo: IParticipantInfo;
    lastMessage: string;
    isSeen: boolean;
}

type Message = {
    createdAt: Date;
    senderId: UniqueId;
    text: string;
}

type MetaData = {
    createdAt: Date;
    updatedAt: Date;
}

type TypeDate = 'createdAt' | 'updatedAt'

// model

interface IChat {
    participant: IUser;
    chatPreview: IChatPrewiew;
    messages: Message[];
    metadata: MetaData
}


export class Chat extends Entity<IChat> {

    private constructor(chat: IChat, id: string) {
        super(chat, id)
    }
    static create(chat: IChat, id: UniqueId): Chat {
        return new Chat(chat, id)
    }

    public getMetaData(prop: TypeDate): Date {
        return this.data.metadata[prop]
    }

    public getRecipients(): IUser[] {
        return this.data.participants
    }

    public getChatPreview(): IChatPrewiew {
        return this.data.chatPreview
    }

    public getMessages(): Message[] {
        return this.data.messages
    }
}



