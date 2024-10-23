import { useUserProfileAdapter } from "../service/userProfileAdapter"

export const useGetUserProfileUseCase = () => {
    
    const { getUserProfileById } = useUserProfileAdapter()


    const execute = async (userId: string) => {

        const profile = await getUserProfileById(userId)

        return profile
    }


    return { execute }

}