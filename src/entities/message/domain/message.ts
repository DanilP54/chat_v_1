type MessageText = string;

export type Message = {
    createdAt: CreatedAt;
    senderId: ViewerId;
    text: MessageText;
    media: string[];
};




