import { UserProfile } from "../profile";

// output

export interface ProfileRepository {
  // findUserByLastName(name: string): Promise<User[]>;
  getUserProfileById(userId: string): Promise<UserProfile | undefined>;
  // saveUserProfile(userId: string, data: User): Promise<void>;
  // saveAvatarOfViewer(viewerId: string, data: ViewerAvatar): Promise<void>
}
