import { UniqueEntityID } from "@/kernel/core/domain/UniqueEntityID";
import {Entity} from "@/kernel/core/domain/entity.ts";
import {Guard} from "@/kernel/core/logic/Guard.ts";
import {Result} from "@/kernel/core/logic/Result.ts";
import {IUser} from "@/kernel/core/types.ts";



export class User extends Entity<IUser> {
    private constructor(user: IUser, id: UniqueEntityID) {
        super(user, id)
    }

    static create(data: IUser, id: UniqueEntityID): Result<User> {

        const dataResult = Guard.againstNullOrUndefinedBulk([
            {argument: data.firstName, argumentName: 'firstname'},
            {argument: data.lastName, argumentName: 'lastname'},
            {argument: data.chats, argumentName: 'chats'},
            {argument: data.blockedUsers, argumentName: 'blockedUsers'}
        ])
        
        console.log(dataResult)

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









