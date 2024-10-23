
export interface ViewerProps {
    readonly firstName: string,
    readonly lastName: string,
    readonly avatar: string | null,
    readonly chatCollection: object[],
    readonly blockedUsers: UniqueId[],
    createdAt?: Date,
    isActive?: boolean
}
