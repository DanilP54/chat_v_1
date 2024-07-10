export enum AuthenticationSteps {
    PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
    VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
    PENDING = 'PENDING',
    ERROR = 'ERROR'
}

export type ActionPhoneNumber = { type: AuthenticationSteps.PHONE_NUMBER_ENTRY }
export type ActionVerifyCode = { type: AuthenticationSteps.VERIFY_CODE_ENTRY }
export type ActionPending = {type: AuthenticationSteps.PENDING}
export type ActionError = {type: AuthenticationSteps.ERROR}

export type StatePhoneNumber = { step: AuthenticationSteps.PHONE_NUMBER_ENTRY }
export type StateVerifyCode = { step: AuthenticationSteps.VERIFY_CODE_ENTRY }
export type StatePending = {step: AuthenticationSteps.PENDING}
export type StateError = {step: AuthenticationSteps.ERROR}

export type Actions = ActionPhoneNumber | ActionVerifyCode | ActionPending | ActionError
export type State = StatePhoneNumber | StateVerifyCode | StatePending | StateError





