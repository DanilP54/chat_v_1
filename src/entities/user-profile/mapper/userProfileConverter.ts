import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "firebase/firestore";
import { createUserProfile } from "../profile.model";
import { UserDbModel } from "@/shared/types/firestore.type.ts";
import { UserProfile } from "../profile.model";
export class userProfileConverter implements FirestoreDataConverter<UserProfile, UserDbModel> {
    toFirestore(model: WithFieldValue<UserProfile>): WithFieldValue<UserDbModel> {
        return {
            first_name: model.firstName,
            last_name: model.lastName,
            phone_number: model.phoneNumber,
            avatar_url: model.avatar
        }
    }
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserProfile {
        const modelId = snapshot.id
        const model = snapshot.data(options) as UserDbModel
        return createUserProfile(model, modelId)
    }
}