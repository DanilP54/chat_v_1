import { faker } from "@faker-js/faker";

export class FakeDataGenerator {
  getUserProfile(options?: { withAvatar: true }) {
    
    if (options?.withAvatar) {
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatarUrl: faker.image.avatar(),
      };
    }

    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
  }

  getPhoneNumber() {
    return '+79935169016'
  }
}
