
export interface User {
    id: string;
    phoneNumber: string
}

export function createUser(userId: string, phoneNumber: string): User {
    return {
        id: userId,
        phoneNumber: phoneNumber
    }
}