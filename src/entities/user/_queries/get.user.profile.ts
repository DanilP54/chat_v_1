import { useQueryClient } from "@tanstack/react-query"
import { getProfileAction } from "../_actions/get.profile"


const baseQuery = 'profile'

export const getUserProfile = (userId: string) => {
  return {
    queryKey: [baseQuery, userId],
    queryFn: () => getProfileAction({ userId }),
  }
}

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient()

  return (userId: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseQuery, userId]
    })

}
