import {ChatPreview} from "@/entities/chat-preview";

type Client = {
    id: ClientId;
    name: ClientName;
    email: ClientName;
    avatar: ClientAvatar;
}

export type Profile = Client & {
    chats: ChatPreview[],
    blocked: ClientId[];
    role: "profile";
}
export type User = Client & {
    role: "user";
}



