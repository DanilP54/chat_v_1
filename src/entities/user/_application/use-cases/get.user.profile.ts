import { profileRepository } from "../../_repositories/profile.repository";

export class GetUserProfileUseCase {
  async exec(userId: string) {

    const profile = await profileRepository.getById(userId);
    
    if(profile.isFailure) {
      return profile.errorValue()
    }

    return profile.getValue()
  }
}

export const getUserProfileUseCase = new GetUserProfileUseCase();
