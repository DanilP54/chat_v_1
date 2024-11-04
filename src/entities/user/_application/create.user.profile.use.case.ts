import { fileStorage } from "@/shared/api/file-storage";
import { profileRepository } from "../_repositories/profile.repository";
import { User } from "../user";
import { createUserProfile } from "../profile";

export type ProfileFormDto = {
  firstname: string,
  lastname: string,
  avatar: File | null
}

type CreateProfile = {
  data: ProfileFormDto;
  user: User 
}

class CreateUserProfileUseCase {
  async exec({data, user}: CreateProfile) {

    const {id: userId} = user 

    const avatarUrl = await fileStorage.uploadImage(data.avatar, {
      folder: "avatars",
      userId,
    })
    
    const createdProfile = createUserProfile({
      firstname: data.firstname,
      lastname: data.lastname,
      avatar: avatarUrl
    }, user)

    await profileRepository.save(createdProfile, userId)
  }
}

export const createUserProfileUseCase = new CreateUserProfileUseCase();
