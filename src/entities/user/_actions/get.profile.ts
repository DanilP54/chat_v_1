import { getUserProfileUseCase } from "../_application/use-cases/get.user.profile"

export const getProfileAction = ({ userId }: { userId: string }) => {
  return getUserProfileUseCase.exec(userId)
}
