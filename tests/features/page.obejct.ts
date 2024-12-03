import { type Locator, type Page, expect } from "@playwright/test";

const selectors = {
   phoneField: 'input[name="phone"]',
  otpField: 'input[data-testid="otp-container"]',
};

export class TwoFactorAuth {
  private readonly phoneField: Locator;
  private readonly otpField: Locator;

  constructor(readonly page: Page) {
    this.phoneField = page.locator(selectors.phoneField);
    this.otpField = page.getByTestId("otp-container");
  }

  goto() {
    return this.page.goto('/auth')
  }

  async waitForPhoneField() {
    await this.phoneField.waitFor({ state: "attached" });
    await expect(this.phoneField).toBeVisible();
    await expect(this.phoneField).toBeEnabled();
  }

  async waitForOtpField() {
    await this.otpField.waitFor({ state: "attached" });
    await expect(this.otpField).toBeVisible();
    await expect(this.otpField).toBeEnabled();
  }

  async submitPhoneNumber(phoneNumber: string) {
    await this.phoneField.fill(phoneNumber);
    await this.page.getByRole("button", { name: "Отправить" }).click();
  }

  async submitVerifyCode(otp: string) {
    await this.otpField.fill(otp);
    await this.page.getByRole("button", { name: "Подтвердить" }).click();
  }

  async waitForNavigationAndAssertUrl(url: string) {
    await this.page.waitForURL(url);
    expect(this.page.url()).toEqual(url);
  }
}

export class CreateProfilePage {
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly avatarField: Locator;

  constructor(private readonly page: Page) {
    this.firstNameField = page.getByPlaceholder("Введите имя");
    this.lastNameField = page.getByPlaceholder("Введите фамилию");
    this.avatarField = page.getByTestId("avatar-field");
  }

  async assertFirstNameFieldVisible() {
    await expect(this.page.getByPlaceholder("Введите имя")).toBeVisible();
  }

  async uploadAvatar(url: string) {}
  async submit({
    firstName,
    lastName,
    avatar,
  }: {
    firstName: string;
    lastName: string;
    avatar?: string;
  }) {
    if (avatar) {
      console.log("with avatar");
    } else {
      await this.firstNameField.fill(firstName);
      await this.lastNameField.fill(lastName);
      await this.page.getByRole("button", { name: "Отправить" }).click();
    }
  }
}
