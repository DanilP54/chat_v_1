import { useUserAdapter } from "../sevices/user.adapter"

export const useGetUserProfileUseCase = () => {

    const { getUserProfileById } = useUserAdapter()


    const execute = async (userId: string) => {
        console.log('call profile')
        const profile = await getUserProfileById(userId)


        return profile
    }


    return { execute }

}