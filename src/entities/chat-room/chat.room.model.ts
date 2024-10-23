import { ChatsRoomDbModel } from "@/shared/types/firestore.type"

type ChatRoomId = string
type UserId = string
type ChatRoomType = 'private' | 'public'


export type ChatRoom = {
    id: ChatRoomId
    joined_at: string
    updated_at: string
    chat_members: UserId[]
    type: ChatRoomType     
}

export type ChatRoomList = ChatRoom[]

export function createChatRoom(dto: ChatsRoomDbModel, id: ChatRoomId): ChatRoom {
    return {
        id,
        joined_at: dto.joined_at,
        updated_at: dto.updated_at,
        chat_members: dto.chat_members,
        type: dto.type,
    }
}