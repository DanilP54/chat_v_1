import { User } from "./user";
import { UserDbModel } from "@/shared/types/firestore.type";

export interface UserProfile extends User {
  first_name: string;
  last_name: string;
  avatar?: string;
}

export function createUserProfile(
  userDto: UserDbModel,
  id: string,
): UserProfile {
  const { first_name, last_name, avatar_url, phone_number } = userDto;

  return {
    id,
    first_name,
    last_name,
    avatar: avatar_url,
    phone_number,
  };
}
