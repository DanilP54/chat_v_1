export type User = {
    firstName: UserFirstName; /* change type name */
    lastName: UserLastName;
    avatar: UserAvatar | null;
}

export function createNewUser(user: User): User {
    return user;
}

