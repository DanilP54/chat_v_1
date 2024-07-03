import { Entity } from "@/kernel/abstract.entity";
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
    participants: IUser[];
    chatPreview: IChatPrewiew;
    messages: Message[];
    metadata: MetaData
}


export class Chat extends Entity<IChat> {

    constructor(chat: IChat, id: string) {
        super(chat, id)
    }

    public getChat(): IChat {
        return this.entity
    }

    public getMetaData(prop: TypeDate): Date {
        return this.entity.metadata[prop]
    }

    public getRecipients(): IUser[] {
        return this.entity.participants
    }

    public getChatPreview(): IChatPrewiew {
        return this.entity.chatPreview
    }

    public getMessages(): Message[] {
        return this.entity.messages
    }
}