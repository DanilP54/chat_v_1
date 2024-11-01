import { FirestoreCollections } from "@/shared/api/db";
import { profileMap } from "../_mappers/profile.mapper";
import { ProfileRepository } from "../_application/ports";
import { DbClient } from "@/shared/api/db";
import { UserProfile } from "../profile";


export class ProfileRepositoryImpl implements ProfileRepository {

  private readonly path = FirestoreCollections.users;
  private readonly dbClient = new DbClient(profileMap)

  async getById(id: string) {
    const profile = await this.dbClient.findById(this.path, id);

    if (!profile.exists()) {
      throw new Error("Error get Profile");
    }

    return profile.data();
  }

  async getAll() {
    const profileList = await this.dbClient.findMany(this.path);

    profileList.forEach((doc) => {
      const data = doc.data()
    })

  }
  async save(data: UserProfile, id: string) {
    if (id) {
      return await this.dbClient.update(this.path, data, id);
    }
    return await this.dbClient.create(this.path, data, id);
  }
}

export const profileRepository = new ProfileRepositoryImpl();
