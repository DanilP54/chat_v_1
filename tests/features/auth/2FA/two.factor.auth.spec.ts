import { test } from "./fixtures";
import { expect } from "@playwright/test";

test.describe("2FA", () => {
  test("successful registration of a new user", async ({
    twoFactorAuthPage,
    baseURL,
    createProfilePage,
    authApi,
    dataProvider,
    page,
  }) => {
    const phoneNumber = dataProvider.getUserPhoneNumber();
    const { firstName, lastName } = dataProvider.getUserProfile();

    await twoFactorAuthPage.waitForPhoneField();
    await twoFactorAuthPage.submitPhoneNumber(phoneNumber);

    const { sessionInfo } = await authApi.getSessionInfoFromResponse();
    const { code } = await authApi.getVerificationCode(sessionInfo);

    await twoFactorAuthPage.waitForOtpField();
    await twoFactorAuthPage.submitVerifyCode(code);

    await twoFactorAuthPage.waitForNavigationAndAssertUrl(
      `${baseURL}/create-profile`,
    );

    await createProfilePage.assertFirstNameFieldVisible();
    await createProfilePage.submit({
      firstName,
      lastName,
    });

    await page.waitForURL(`${baseURL}/`);

    expect(page.url()).toEqual(`${baseURL}/`);
  });
});
