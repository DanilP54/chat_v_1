type ChatId = string



type ChatCreatedAt = Date
type ChatUpdatedAt = Date

type MessageText = string
type MessageIsSeen = string


// Value Object

export type MetaData = {
    created_at: ChatCreatedAt
    updated_at: ChatUpdatedAt
}

export type LastMessage = {
    text: MessageText,
    is_seen: MessageIsSeen
}

// Aggregate

export type ChatRoom = {
    id: ChatId,
    recipient_info: User,
    last_message: LastMessage,
    message_list: Message[],
    meta_data: MetaData,
}


// Domain event: создался чат ----->
// Trigger: Создать чат с пользователем ----->
// Явный Input: id пользователя ------->
// Неявный Input:  ------->
// Output: Созданный чат -------->