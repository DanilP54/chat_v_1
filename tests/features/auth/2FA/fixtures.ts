import { test as base } from "@playwright/test";
import { AuthAPI } from "./api";
import { DataProvider } from "./data";
import { CreateProfilePage, TwoFactorAuthPage } from "./page-objects";

type TwoFactorAuthFixtures = {
  dataProvider: DataProvider;
  twoFactorAuthPage: TwoFactorAuthPage;
  createProfilePage: CreateProfilePage;
  authApi: AuthAPI;
};

export const test = base.extend<TwoFactorAuthFixtures>({
  dataProvider: async ({}, use) => {
    await use(new DataProvider());
  },
  authApi: async ({ page, request }, use) => {
    const authApi = new AuthAPI(page, request);
    await use(authApi);
    await Promise.all([authApi.deleteUser(), authApi.clearFirestore()]) 
  },
  twoFactorAuthPage: async ({ page }, use) => {
    const auth = new TwoFactorAuthPage(page);
    await auth.goto();
    await use(auth);
  },
  createProfilePage: async ({ page }, use) => {
    const createProfile = new CreateProfilePage(page);
    await use(createProfile);
  },
});
