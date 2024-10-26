import { profileRepository } from "../../_repositories/profile.repository";

export class GetUserProfileUseCase {
  async exec(userId: string) {
    const profile = await profileRepository.getProfileById(userId);
    return profile;
  }
}

export const getUserProfileUseCase = new GetUserProfileUseCase();
