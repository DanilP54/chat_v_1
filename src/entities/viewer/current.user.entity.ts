import { UserDbModel } from "@/shared/types/firestore.type.ts";
import { ChatRoom } from "../chat-room/chat.room.model";
import { User } from "@/entities/user/user.model.ts";

type ChatRoomList = {
    chat_list?: ChatRoom[]
}

export type CurrentUser = User & ChatRoomList


export function createCurrentUser(dto: UserDbModel, id: string): CurrentUser {
    return {
        id,
        display_name: `${dto.first_name} ${dto.last_name}`,
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
        avatar_url: dto.avatar ? dto.avatar : null
    }
}


export function createCurrentUserProfile() {
    
}

