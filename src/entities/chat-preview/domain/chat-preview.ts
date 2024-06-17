type Receiver = {
    firstName: UserFirstName;
    lastName: UserLastName;
    avatar: UserAvatar | null;
}

export type ChatPreview = {
    chatId: string;
    receiver: Receiver;
    lastMessage: string;
    isSeen: boolean;
}
