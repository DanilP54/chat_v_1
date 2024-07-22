import { User } from "../user.model"
import { DocumentData as DocumentDTO } from "firebase/firestore"
import { IPersistUser, IUserDTO } from "@/kernel/core/types.ts";
import { UniqueEntityID } from "@/kernel/core/domain/UniqueEntityID.ts";
import { UserFirstName } from "../value-object/user.firstname";
import { UserLastName } from "../value-object/user.lastname";
import { UserChatCollection } from "../value-object/user.chat.collection";
import { CurrentUser } from "@/shared/types";

type IUserForm = {
    firstName: string,
    lastName: string,
    avatar: string | null
}

export class UserMap {

    static toPersistence(dto: IUserForm): IPersistUser {
        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar,
            chats: [],
            blockedUsers: [],
        }
    }

    static toDomain(dto: DocumentDTO, uid: string): User {
        const userOrError = User.create({
            firstName: UserFirstName.create(dto.firstName).getValue().value,
            lastName: UserLastName.create(dto.lastName).getValue().value,
            avatar: dto.avatar,
            chatCollection: UserChatCollection.create(dto.chats).getValue().value,
            blockedUsers: dto.blockedUsers,
        }, new UniqueEntityID(uid))

        if (!userOrError.isSuccess) {
            throw new Error('Возникла ошибка при мапинге объекта из хранилища в user domain')
        }

        return userOrError.getValue()
    }
}
