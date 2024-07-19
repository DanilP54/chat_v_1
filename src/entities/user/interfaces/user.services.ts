import { UserMap } from "./mapper"
import { UserRepository, userRepoInstance } from "./repository"
import { User } from "@/entities/user/user.model";
import { IUserDTO } from "@/kernel/core/types.ts";

interface UserDTO {

    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | null
}

export class UserService {

    private readonly firebase: UserRepository = userRepoInstance

    async getCurrentUser(userId: string): Promise<User | undefined> {
        const data = await this.firebase.get(userId)
        return data ? UserMap.toDomain(data, userId) : undefined
    }

    async setUserToDB(userId: UniqueId, user: UserDTO) {
        const data = UserMap.toPersistence(user)
        await this.firebase.save(userId, data)
    }

}

export const userService = new UserService()