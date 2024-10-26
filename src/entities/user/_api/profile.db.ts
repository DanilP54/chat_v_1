import { DbClient } from "@/shared/api/db";
import { FirestoreCollections } from "@/shared/api/enum";
import { ProfileMap } from "../_mappers/profile.mapper";

export class ProfileDbClient extends DbClient {

    private readonly collectionPath = FirestoreCollections.users;
    private readonly converter = new ProfileMap();

    constructor() {
        super()
    };

    async getById(id: string) {
        const profile = await this.get(this.collectionPath, this.converter, id)  
        console.log(profile)
        return profile
    };

    async getAll() {
        const profileList = await this.get(this.collectionPath, this.converter)
        console.log(profileList)
        return profileList
    };
}


export const profileDbClient = new ProfileDbClient();