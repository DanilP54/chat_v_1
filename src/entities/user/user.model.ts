import { Entity } from "@/kernel/abstract.entity";

export interface IUser {
    firstName: UFirstName;
    lastName: ULastName;
    avatar: UAvatar;
}

export class User extends Entity<IUser> {

    private constructor(user: IUser, id: string) {
        super(user, id)
    }

    public getUser(): IUser {
        return this.entity
    }
}

