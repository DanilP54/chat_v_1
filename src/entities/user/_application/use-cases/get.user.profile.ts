import { profileRepository } from "../../_repositories/profile";

export class GetUserProfileUseCase {
  async exec(userId: string) {
    const profile = await profileRepository.getUserProfileById(userId);
    return profile;
  }
}

export const getUserProfileUseCase = new GetUserProfileUseCase();
