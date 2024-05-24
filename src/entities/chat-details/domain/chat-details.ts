import { Message } from "@/entities/messages/domain/messages";

export type ChatDetails = {
    createdAt: CreatedAt;
    messages: Message[];
}


