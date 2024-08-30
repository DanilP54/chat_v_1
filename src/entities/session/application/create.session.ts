import { ViewerProfileService } from "@/entities/viewer/application/ports.ts";
import { useViewerProfile } from "@/entities/viewer/services/viewer.profile.adapter.ts";
import { ChatRoomService, useChatRoom } from "@/entities/chat-room/services/chat.room.adapter.ts";
import { SessionModel } from "@/entities/session";
import { Result } from "@/shared/lib/error.handler.ts";
// import { ViewerAvatarList } from "@/entities/avatar/avatar.model.ts";
import { ViewerProfile } from "@/entities/viewer/viewer.model.ts";
import { ChatRoomList } from "@/entities/chat-room/chat.room.model.ts";
// import { StorageService } from "@/entities/avatar/application/ports";
// import { useAvatarStorage } from "@/entities/avatar/services/avatar.adapter";

type UserId = string

export function useCreateSession() {

    const viewerProfile: ViewerProfileService = useViewerProfile()
    const chatRoom: ChatRoomService = useChatRoom()
    // const avatarList: StorageService  = useAvatarStorage()

    const getViewerProfile = async (userId: string): Promise<Result<ViewerProfile>> => {

        const response = await viewerProfile.getViewerProfileById(userId)

        if (!response) {
            return Result.fail<ViewerProfile>(`Couldn't find VIEWER PROFILE by id=${userId}`)
        }

        return Result.ok(response)

    }

    // const getAllAvatarList = async (userId: string): Promise<Result<ViewerAvatarList>> => {
    //
    //     const response = await avatarList.getAllAvatars(userId)
    //
    //     // if(!response) {
    //     //     return Result.fail<ViewerAvatarList>(`Couldn't find AVATAR LIST by viewer id=${userId}`)
    //     // }
    //
    //     return Result.ok(response)
    //
    // }

    const getChatRoomListOfViewer = async (userId: string): Promise<Result<ChatRoomList>> => {

        const response = await chatRoom.getChatListWithPagination(userId)

        // if(!response) {
        //     return Result.fail<ChatRoomList>(`Couldn't find CHAT ROOM LIST by viewer id=${userId}`)
        // }

        return Result.ok(response)
    }

    
    async function execute(userId: UserId): Promise<SessionModel.Session | boolean> {

        const profile = await getViewerProfile(userId)

        if (profile.isFailure) {
            return false
        }

        // const avatarList = await getAllAvatarList(userId)
   
        const chatRoomList = await getChatRoomListOfViewer(userId)

        const viewer: SessionModel.SessionViewer = {
            profile: profile.getValue(),
            chat_room_list: chatRoomList.getValue()
        }

        return SessionModel.createSession(viewer)
    }


    return { execute }
}