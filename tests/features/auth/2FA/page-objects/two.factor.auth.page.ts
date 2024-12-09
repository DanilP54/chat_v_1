import { Locator, Page, expect } from "@playwright/test";



export class TwoFactorAuthPage {
    private readonly phoneField: Locator;
    private readonly otpField: Locator;
  
    constructor(private readonly page: Page) {
      this.phoneField = page.locator('input[name="phone"]');
      this.otpField = page.getByTestId("otp-container");
    }
  
    goto() {
      return this.page.goto('/auth')
    }
  
    async waitForPhoneField() {
      await this.phoneField.waitFor({ state: "attached" });
      await expect(this.phoneField).toBeVisible();
    }
  
    async waitForOtpField() {
      await this.otpField.waitFor({ state: "attached" });
      await expect(this.otpField).toBeVisible();
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