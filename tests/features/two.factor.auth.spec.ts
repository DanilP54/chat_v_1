import { test as base, expect } from "@playwright/test";
import { CreateProfilePage, TwoFactorAuth } from "./page.obejct";
import { PhoneAuthAPI } from "./auth.api";
import { FakeDataGenerator } from "./fake.data.generator";


type TwoFactorAuthFixtures = {
  fakeDataGenerator: FakeDataGenerator;
  twoFactorAuth: TwoFactorAuth;
  createProfilePage: CreateProfilePage;
  phoneAuthApi: PhoneAuthAPI;
};

const test = base.extend<TwoFactorAuthFixtures>({
  fakeDataGenerator: async ({}, use) => {
    await use(new FakeDataGenerator());
  },
  phoneAuthApi: async ({ page }, use) => {
    await use(new PhoneAuthAPI(page))
  },
  twoFactorAuth: async ({ page }, use) => {
    const auth = new TwoFactorAuth(page) 
    await auth.goto();
    await use(auth);
  },
  createProfilePage: async ({ page }, use) => {
    const createProfile = new CreateProfilePage(page);
    await use(createProfile);
  },
});

test.describe("2FA", () => {

  test('check environment variables', async ({ page }) => {
    expect(process.env.BASE_URL).toBeDefined();
    expect(process.env.APP_API_KEY).toBeDefined();
  });
  
  test("new user without profile and without avatar", async ({
    twoFactorAuth,
    createProfilePage,
    phoneAuthApi,
    fakeDataGenerator,
    page,
  }) => {
    const phoneNumber = fakeDataGenerator.getPhoneNumber()
    const { firstName, lastName } = fakeDataGenerator.getUserProfile()
    const CREATE_PROFILE_PAGE_URL = `${process.env.BASE_URL}/create-profile`;
    const CHAT_LIST_PAGE_URL = `${process.env.BASE_URL}/`;

    await twoFactorAuth.waitForPhoneField();
    await twoFactorAuth.submitPhoneNumber(phoneNumber);

    const {sessionInfo} = await phoneAuthApi.getFulfilledResponse()
    const {code} = await phoneAuthApi.getVerificationCode(sessionInfo)
    
    await twoFactorAuth.waitForOtpField();
    await twoFactorAuth.submitVerifyCode(code);

    await twoFactorAuth.waitForNavigationAndAssertUrl(CREATE_PROFILE_PAGE_URL);

    await createProfilePage.assertFirstNameFieldVisible();
    await createProfilePage.submit({
      firstName,
      lastName,
    });

    await page.waitForURL(CHAT_LIST_PAGE_URL);

    expect(page.url()).toEqual(CHAT_LIST_PAGE_URL);
  });
});
