import { Page } from "@playwright/test";


export class PhoneAuthAPI {

  constructor(private readonly page: Page) {
    this.page = page
  }

  async getFulfilledResponse() {
    const response = await this.page.waitForResponse(async (response) => {
      if (response.url().includes('sendVerificationCode')) {
        const body = await response.json() as {sessionInfo: string}
        return response.status() === 200 && !!body.sessionInfo;
      }
      return false
    })
    return await response.json();
  }
  

  async getVerificationCode(sessionInfo: string) {
    return await this.page.evaluate(async ({sessionInfo, projectId}) => {
      try {
        const response = await fetch(`http://localhost:9099/emulator/v1/projects/${projectId}/verificationCodes`)
  
        if(!response.ok) {
          throw new Error(response.statusText)
        }
  
        const data = await response.json()
        
        return data.verificationCodes.find((item) => sessionInfo === item.sessionInfo)
  
      } catch (error) {
        console.log(error)
      }
    
    }, {sessionInfo, projectId: process.env.APP_PROJECT_ID})
  }

}
