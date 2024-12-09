import { APIRequestContext, Page } from "@playwright/test";
import * as authService from "../../../../auth-api";

export class AuthAPI {
  private readonly page: Page;
  private readonly request: APIRequestContext;

  constructor(page: Page, request: APIRequestContext) {
    this.page = page;
    this.request = request;
  }

  async getSessionInfoFromResponse() {
    try {
      const response = await this.page.waitForResponse(async (response) => {
        if (response.url().includes("sendVerificationCode")) {
          return response.status() === 200;
        }
        return false;
      });

      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearFirestore() {
    return await this.request.delete( `http://localhost:8080/emulator/v1/projects/${process.env.APP_PROJECT_ID}/databases/(default)/documents`)
  }

  async deleteUser() {
    return await this.request.delete(
      `http://localhost:9099/emulator/v1/projects/${process.env.APP_PROJECT_ID}/accounts`,
    );
  }

  async getVerificationCode(sessionInfo: string) {
    try {
    const response = await this.request.get(
      `http://localhost:9099/emulator/v1/projects/${process.env.APP_PROJECT_ID}/verificationCodes`,
    );

    if (!response.ok) {
      throw new Error(`Bad request code: ${response.statusText}`);
    }

    const data = await response.json();

    const result = data.verificationCodes.find(
      (obj) => obj.sessionInfo === sessionInfo,
    );

    if(!result) {
      throw new Error(`Code not found`);
    }

    return result
  } catch (error) {
    console.log(error)
  }

  }
}
