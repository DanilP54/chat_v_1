import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "firebase/firestore"
import { ViewerAvatar, createViewerAvatar } from "../avatar.model"
import { UserAvatarDbModel } from "@/shared/types/firestore.type"

export class AvatarConverter implements FirestoreDataConverter<ViewerAvatar, UserAvatarDbModel> {
    toFirestore(model: WithFieldValue<ViewerAvatar>): WithFieldValue<UserAvatarDbModel> {
        return {
            primary: model.primary,
            url: model.url
        }
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ViewerAvatar {
        const modelId = snapshot.id
        const model = snapshot.data(options) as UserAvatarDbModel
        return createViewerAvatar(model, modelId)
    }
}