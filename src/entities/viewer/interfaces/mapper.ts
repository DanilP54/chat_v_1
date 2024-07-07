import { Viewer } from "../viewer.model"
import { DocumentData as DocumentDto } from "firebase/firestore"


interface ViewerDto {
    id: UniqueId,
    firstName: VFirstName,
    lastName: VLastName,
    avatar: VAvatar | undefined
}


export class ViewerMap {

    public static toPersistence(dto: ViewerDto): Omit<ViewerDto, 'id'> {
        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar
        }
    }

    public static toDomain(dto: DocumentDto, uid: string) {
        return Viewer.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatar: dto.avatar || undefined,
            blocked: dto.blocked || [],
            chats: dto.chats || []
        }, uid)
    }
}