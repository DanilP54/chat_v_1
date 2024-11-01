import { UserDbModel } from "@/shared/types/firestore.type";
import { User } from "./user";

export type ProfileDto = {
  firstname: string,
  lastname: string,
  avatar: string | null
}

export type UserProfile = {
  id: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

export function createUserProfile(dto: ProfileDto, user: User): UserProfile {
  return {
    id: user.id,
    phone_number: user.phone_number,
    first_name: dto.firstname,
    last_name: dto.lastname,
    avatar: dto.avatar
  }
}

export function createUserProfileFromDb(dto: UserDbModel, id: string): UserProfile {
  return {
    id,
    phone_number: dto.phone_number,
    first_name: dto.first_name,
    last_name: dto.last_name,
    avatar: dto.avatar_url
  }
}


