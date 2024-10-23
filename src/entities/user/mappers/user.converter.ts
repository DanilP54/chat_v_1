import {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "firebase/firestore";
import { UserDbModel } from "@/shared/types/firestore.type.ts";
import { UserProfile, createUserProfile } from "../user.model";


export class UserConverter implements FirestoreDataConverter<UserProfile, UserDbModel> {
    toFirestore(model: WithFieldValue<UserProfile>): WithFieldValue<UserDbModel> {

        console.log(model)

        return {
            first_name: model.first_name,
            last_name: model.last_name,
            phone_number: model.phone_number,
            avatar_url: model.avatar_url
        }
    }
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserProfile {
        const modelId = snapshot.id
        const model = snapshot.data(options) as UserDbModel
        return createUserProfile(model, modelId)
    }
}