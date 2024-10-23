import {collection, getDocs, limit, orderBy, query, where, cache, doc, onSnapshot} from "firebase/firestore";
import {ChatRoom} from "../chat.room.model";
import {ChatRoomConverter} from "@/entities/chat-room/mappers/chat.room.converter.ts";
import {db} from "@/shared/config/firebase";
import {DatabaseAPI} from "@/shared/api/database.api.ts";
import {DatabaseCollections} from "@/shared/api";


export interface ChatRoomService {
    getChatListWithPagination(chatMemberId: string): Promise<ChatRoom[] | undefined>
}



export function useChatRoom(): ChatRoomService {

    const chatRoomDbApi = new DatabaseAPI(DatabaseCollections.CHATROOMS, new ChatRoomConverter())

    const createBaseQuery = (): Query => {
        return {
            where: {},
            limit: 10,
            orderBy: []
        }
    }

    return {
        async getChatListWithPagination(chatMemberId: string): Promise<ChatRoom[] | undefined> {
            try {
                



                onSnapshot(doc(db, 'chatrooms', chatMemberId), {
                    includeMetadataChanges: true,
                    source: 'cache'
                })

                const result = [] as ChatRoom[]

                const queryOne = createBaseQuery()

                const chatRoomList = collection(db, 'chatrooms')
                    .withConverter(new ChatRoomConverter())

                const q = query(chatRoomList,
                    where('participants', 'array-contains', chatMemberId),
                    orderBy('updatedAt', "desc"),
                    limit(10))

                const response = await getDocs(q)

                response.forEach(doc => {
                    result.push(doc.data())
                })

                return result

            } catch (e) {
                console.error(e)
            }

        }
    }
}