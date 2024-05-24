import { Client } from "@/entities/client"

export type Chat = {
    chatId: UniqueId;
    receiverId: Client.User["id"];
    avatar: Client.User["avatar"];
    name: Client.User["name"]
    lastMessage: string;
    isSeen: boolean;
}




// export type Chat = {
//     chatId: UniqueId;
//     receiverId: ClientId;
//     updateAt: UpdateAt;
//     isSeen: boolean;
//     lastMessage: string;
// }




