
import { UserProfile } from "../profile.model";


export interface UserProfileService {
    // findUserProfileByLastName(name: string): Promise<User[]>
    getUserProfileById(userId: string): Promise<UserProfile | undefined>
    // saveUserProfile(userId: string, data: User): Promise<void>
    // saveAvatarOfViewer(viewerId: string, data: ViewerAvatar): Promise<void>
}