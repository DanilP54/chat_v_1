import { getUserProfileUseCase } from "../_application/get.user.profile.user.case"

export const getProfileAction = ({ userId }: { userId: string }) => {
  return getUserProfileUseCase.exec(userId)
}
