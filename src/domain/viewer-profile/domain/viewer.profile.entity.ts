type ViewerId = string

// Aggregate

export type ViewerProfile = {
    readonly owner: ViewerId
    readonly firstName: string
    readonly lastName: string
    readonly avatar: string
    readonly displayName: string
    readonly blockedUsers: UserId[]
}


type Сhats = ChatRoom[];


// Session ---> Viewer
// Viewer ----> Chat
// Chat -----> Message, User as Recipient