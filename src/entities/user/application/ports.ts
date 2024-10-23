import { User } from "@/entities/user/user.model.ts";


export interface UserService {
    findUserByLastName(name: string): Promise<User[]>
    getUserProfileById(userId: string): Promise<User | undefined>
    saveUserProfile(userId: string, data: User): Promise<void>
    // saveAvatarOfViewer(viewerId: string, data: ViewerAvatar): Promise<void>
}