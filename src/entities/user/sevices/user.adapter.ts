
import { UserService } from "../application/ports.ts";
import { DatabaseCollections } from "@/shared/api";
import { DatabaseAPI } from "@/shared/api/database.api";
import { createUserProfile, UserProfile } from "../user.model.ts";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
// import { db } from "@/shared/config/firebase.ts";
import { db } from "@/shared/config/firebase.ts";
import { UserDbModel } from "@/shared/types/firestore.type.ts";
import { UserConverter } from "../mappers/user.converter.ts";

export function useUserAdapter(): UserService {

    const userDbApi = new DatabaseAPI(DatabaseCollections.USERS, new UserConverter())

    return {
        async getUserProfileById(userId): Promise<UserProfile | undefined> {
            try {

                const viewerProfile = await userDbApi.getDocById(userId)

                if (viewerProfile.exists()) {
                    return viewerProfile.data()
                }

            } catch (e) {
                console.error(e)
            }
        },

        async saveUserProfile(userId, data): Promise<void> {
            try {
                await userDbApi.updateDocById(userId, data)
            } catch (e) {
                console.error(e)
            }
        },

        async findUserByLastName(name: string): Promise<UserProfile[]> {
            try {

                const q = query(collection(db, DatabaseCollections.USERS),
                    where('last_name', '==', `${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`),
                )

                const response = await getDocs(q)

                const users = response.docs.map(doc => {
                    const data = doc.data() as UserDbModel
                    return createUserProfile(data, doc.id)
                })


                return users


            } catch (e) {
                console.error(e)
                return []
            }
        }
    }
}
