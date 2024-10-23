export enum AuthenticationSteps {
    PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
    VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
}

export type ActionPhoneNumber = { type: AuthenticationSteps.PHONE_NUMBER_ENTRY }
export type ActionVerifyCode = { type: AuthenticationSteps.VERIFY_CODE_ENTRY}

export type StatePhoneNumber = { step: AuthenticationSteps.PHONE_NUMBER_ENTRY}
export type StateVerifyCode = { step: AuthenticationSteps.VERIFY_CODE_ENTRY}

export type AuthenticationActions = ActionPhoneNumber | ActionVerifyCode
export type AuthenticationState = StatePhoneNumber | StateVerifyCode





