import { useGetUserProfileUseCase } from "@/entities/user-profile/application/useGetUserProfileUseCase"
import { createSession, Session } from "../session.model"
import { nanoid } from 'nanoid'
import { User } from "@/entities/user/user.model"


export function useCreateSessionUseCase() {

    const getUserProfile = useGetUserProfileUseCase()

    async function execute(currentUser: User): Promise<Session | undefined> {

        const { id, phoneNumber } = currentUser

        const userProfile = await getUserProfile.execute(id)

    if (userProfile) {
            const session = createSession(nanoid(), {
                userInfo: {
                    ...userProfile,
                    phoneNumber
                }

            })

            return session

        }

        // if (profile.isFailure) {
        //     return false
        // }


        // const chatRoomList = await getChatRoomListOfViewer(userId)

        // const viewer: SessionModel.SessionViewer = {
        //     profile: profile.getValue(),
        //     chat_room_list: chatRoomList.getValue()
        // }

        // return SessionModel.createSession(viewer)
    }


    return { execute }
}
