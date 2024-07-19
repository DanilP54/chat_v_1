import { UniqueEntityID } from "@/kernel/core/domain/UniqueEntityID";
import { Entity } from "@/kernel/core/domain/entity.ts";
import { Guard } from "@/kernel/core/logic/Guard.ts";
import { Result } from "@/kernel/core/logic/Result.ts";
import { UserChatCollection } from "./value-object/user.chat.collection";
import { UserLastName } from "./value-object/user.lastname";
import { UserFirstName } from "./value-object/user.firstname";

interface UserProps {
    firstName: string,
    lastName: string,
    avatar: string | null,
    chatCollection: object[],
    blockedUsers: UniqueId[],
    createdAt?: Date,
}


export class User extends Entity<UserProps> {
    private constructor(user: UserProps, id: UniqueEntityID) {
        super(user, id)
    }
    static create(data: UserProps, id: UniqueEntityID): Result<User> {

        const dataResult = Guard.againstNullOrUndefinedBulk([
            { argument: data.firstName, argumentName: 'first name' },
            { argument: data.lastName, argumentName: 'last name' },
            { argument: data.chatCollection, argumentName: 'chat collection' },
            { argument: data.blockedUsers, argumentName: 'blocked users' }
        ])

        if (!dataResult.succeeded) {
            return Result.fail<User>(dataResult.message)
        }

        const user = new User({
            ...data,
            createdAt: data.createdAt ? data.createdAt : new Date(),
        }, id)

        return Result.ok<User>(user)
    }
}









