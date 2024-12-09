import { faker } from "@faker-js/faker";

export class DataProvider {

  private readonly userPhoneNumber = '+79935169016'
  getUserProfile(options?: { withAvatar: true }) {

    const profile = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }
    
    if (options?.withAvatar) {
      return {
        ...profile,
        avatarUrl: faker.system.filePath(),
      };
    }

    return profile
  }

  getUserPhoneNumber() {
    return this.userPhoneNumber
  }
}

