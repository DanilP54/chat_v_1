// import { UserProfile } from "../profile.ts";
import { ProfileRepository } from "../_application/ports.ts";
import { profileDbClient } from "../_api/profile.db.ts";

export class ProfileRepositoryImpl implements ProfileRepository {
  async getProfileById(userId: string) {
  
    const response = await profileDbClient.getById(userId)

    console.log(response)

  }
}

export const profileRepository = new ProfileRepositoryImpl();

// export function useUserAdapter(): UserService {
//   const userDbApi = new DatabaseAPI(
//     DatabaseCollections.USERS,
//     new UserConverter(),
//   );

//   return {
//     async getUserProfileById(userId): Promise<UserProfile | undefined> {
//       try {
//         const viewerProfile = await userDbApi.getDocById(userId);

//         if (viewerProfile.exists()) {
//           return viewerProfile.data();
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     },

//     async saveUserProfile(userId, data): Promise<void> {
//       try {
//         await userDbApi.updateDocById(userId, data);
//       } catch (e) {
//         console.error(e);
//       }
//     },

//     async findUserByLastName(name: string): Promise<UserProfile[]> {
//       try {
//         const q = query(
//           collection(db, DatabaseCollections.USERS),
//           where(
//             "last_name",
//             "==",
//             `${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}`,
//           ),
//         );

//         const response = await getDocs(q);

//         const users = response.docs.map((doc) => {
//           const data = doc.data() as UserDbModel;
//           return createUserProfile(data, doc.id);
//         });

//         return users;
//       } catch (e) {
//         console.error(e);
//         return [];
//       }
//     },
//   };
// }
