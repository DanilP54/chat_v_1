
export interface IMessage {
    createdAt: Date;
    senderId: UniqueId;
    text: string;
}

export interface IParticipantInfo {
    avatar: string;
    firstName: string;
    lastName: string;
}

export interface IMetaData {
    createdAt: Date;
    updatedAt: Date;
}

export interface IChatPrewiew {
    participantInfo: IParticipantInfo;
    lastMessage: string;
    isSeen: boolean;
}

export interface IChat {
    participantId: UniqueId,
    participantInfo: IParticipantInfo,
    chatPreview: IChatPrewiew,
    messages: IMessage[],
    metadata: IMetaData,
}

export interface IPersistUser {
    firstName: string,
    lastName: string,
    avatar: string | null,
    chats: UniqueId[],
    blockedUsers: UniqueId[],
}

export interface IUserDTO {
    firstName: string,
    lastName: string,
    avatar: string | undefined;
    chats: IChat[];
    blockedUsers: UniqueId[];
    createdAt: Date,
}

export interface IUser {
    firstName: string,
    lastName: string,
    avatar: string | undefined;
    chatCollection: IChat[];
    blockedUsers: UniqueId[];
    createdAt?: Date,
}
