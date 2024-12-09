import { type Locator, type Page, expect } from "@playwright/test";






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
      console.log('avatar')
    } else {
      await this.firstNameField.fill(firstName);
      await this.lastNameField.fill(lastName);
      await this.page.getByRole("button", { name: "Отправить" }).click();
    }
  }
}