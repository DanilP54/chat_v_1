import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "./get.user.profile"

export const useGetUserProfile = (userId: string) => {
    
    const {data: profile, isPending} = useQuery({
        ...getUserProfile(userId),
        retry: 0,
    })
    
    return {
        profile,
        isPending
    }
} 