import { COLLECTIONS } from "@/shared/api/db";
import { profileMap } from "../_mappers/profile.mapper";
import { ProfileRepository } from "../_application/ports";
import { DbClient } from "@/shared/api/db";
import { UserProfile } from "../profile";
import { safe } from "@/shared/lib/safe";
import { Result } from "@/shared/lib/result";

export class ProfileRepositoryImpl implements ProfileRepository {
  private readonly collection = COLLECTIONS.USERS;
  private readonly dbClient = new DbClient(profileMap);

  async getById(id: string) {
    const result = await safe(this.dbClient.findById(this.collection, id));

    if (!result.success) {
      return Result.fail<UserProfile>(result.error);
    }

    return Result.ok<UserProfile>(result.data.data());
  }

  async getAll() {
    const profileList = await this.dbClient.findMany(this.collection);

    profileList.forEach((doc) => {
      const data = doc.data();
    });
  }
  async save(data: UserProfile, id: string) {
    return await this.dbClient.create(this.collection, data, id);
  }
}

export const profileRepository = new ProfileRepositoryImpl();
