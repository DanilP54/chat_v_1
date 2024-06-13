import { Client } from '../../client/index';

type Receiver = {
    name: Client.User["name"];
    avatar: Client.User["avatar"];
}

export type ChatPreview = {
    chatId: string;
    receiver: Receiver;
    lastMessage: string;
    isSeen: boolean;
}




