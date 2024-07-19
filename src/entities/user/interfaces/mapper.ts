import { User } from "../user.model"
import { DocumentData as DocumentDTO } from "firebase/firestore"
import { IPersistUser, IUserDTO } from "@/kernel/core/types.ts";
import { UniqueEntityID } from "@/kernel/core/domain/UniqueEntityID.ts";
import { UserFirstName } from "../value-object/user.firstname";
import { UserLastName } from "../value-object/user.lastname";
import { UserChatCollection } from "../value-object/user.chat.collection";

type IUserForm = {
    firstName: string,
    lastName: string,
    avatar: string | undefined
}

export class UserMap {

    public static toPersistence(dto: IUserForm): IPersistUser {
        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar ?? undefined,
            chats: [],
            blockedUsers: [],
        }
    }

    public static toDomain(dto: DocumentDTO, uid: string): User {
        const userOrError = User.create({
            firstName: UserFirstName.create(dto.firstName).getValue(),
            lastName: UserLastName.create(dto.lastName).getValue(),
            avatar: dto.avatar ?? undefined,
            chatCollection: UserChatCollection.create(dto.chats).getValue(),
            blockedUsers: dto.blocked,
        }, new UniqueEntityID(uid))

        if (!userOrError.isSuccess) {
            throw new Error('Возникла ошибка при мапинге объекта из хранилища в user domain')
        }

        return userOrError.getValue()
    }
}
