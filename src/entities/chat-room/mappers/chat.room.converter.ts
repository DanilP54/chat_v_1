import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "firebase/firestore"
import {ChatRoom, createChatRoom} from "@/entities/chat-room/chat.room.model.ts";
import {ChatsRoomDbModel} from "@/shared/types/firestore.type.ts";


export class ChatRoomConverter implements FirestoreDataConverter<ChatRoom, ChatsRoomDbModel> {
    toFirestore(model: WithFieldValue<ChatRoom>): WithFieldValue<ChatsRoomDbModel> {
        return {
           joined_at: model.joined_at,
           updated_at: model.updated_at,
           chat_members: model.chat_members,
           type: model.type
        }
    }
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ChatRoom {
        const modelId = snapshot.id
        const model = snapshot.data(options) as ChatsRoomDbModel
        return createChatRoom(model, modelId)
    }
}