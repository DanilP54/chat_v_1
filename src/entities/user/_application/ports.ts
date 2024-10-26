import { UserProfile } from "../profile";

// output

export interface ProfileRepository {
  // findUserByLastName(name: string): Promise<User[]>;
  getProfileById(userId: string): Promise<void>;
  // saveUserProfile(userId: string, data: User): Promise<void>;
  // saveAvatarOfViewer(viewerId: string, data: ViewerAvatar): Promise<void>
}
