import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "firebase/firestore";

import { UserDbModel } from "@/shared/types/firestore.type.ts";
import { createViewerProfile, ViewerProfile } from "../current.user.entity.ts";

export class ViewerConverter implements FirestoreDataConverter<ViewerProfile, UserDbModel> {
    toFirestore(model: WithFieldValue<ViewerProfile>): WithFieldValue<UserDbModel> {
        return {
            first_name: model.first_name,
            last_name: model.last_name,
            phone_number: model.phone_number,
            avatar_url: model.avatars
        }
    }
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ViewerProfile {
        const modelId = snapshot.id
        const model = snapshot.data(options) as UserDbModel
        return createViewerProfile(model, modelId)
    }
}