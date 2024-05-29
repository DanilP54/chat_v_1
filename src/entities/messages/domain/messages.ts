import { Client } from "@/entities/client";

type MessageText = string;

export type Message = {
    createdAt: CreatedAt;
    senderId: Client.Profile["id"];
    text: MessageText;
};


