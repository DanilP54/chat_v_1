import { Result } from "@/entities/logic/Result";
import { UserProfile } from "../profile";

export interface ProfileRepository {
  getById(userId: string): Promise<Result<UserProfile>>;
  getAll(): Promise<UserProfile[]>;
  save(data: UserProfile, id: string): Promise<void>;
  // create(data: UserProfile, id: string): Promise<void>;
}
