import { ViewerConverter } from "@/entities/viewer/mappers/viewer.converter"
import { db, storage } from "../config/firebase"
import { Database, DatabaseApi } from "./database.api"


export enum DatabaseCollections {
    USERS = 'users',
    CHATROOMS = 'chatrooms',
    AVATARS = 'avatars',
    MESSAGES = 'messages',
    SESSIONS = 'sessions'
}

export enum BaseStoragePath {
    AVATARS = 'avatars/'
}

// Storage


// DataBase
export const avatarsCollection = new Database(db, DatabaseCollections.AVATARS)




