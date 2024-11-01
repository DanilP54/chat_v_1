import { UserProfile } from "../profile";

export interface ProfileRepository {
  getById(userId: string): Promise<UserProfile>;
  getAll(): Promise<UserProfile[]>
  save(data: UserProfile, id: string): Promise<void>
  // create(data: UserProfile, id: string): Promise<void>;
}
