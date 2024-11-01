import { profileRepository } from "../../_repositories/profile.repository";

export class GetUserProfileUseCase {
  async exec(userId: string) {
    const profile = await profileRepository.getById(userId);

    if (!profile) {
      throw new Error("Profile not found in use case");
    }

    return profile;
  }
}

export const getUserProfileUseCase = new GetUserProfileUseCase();
