export type {

    // actions
    ActionAuthInProgress,
    ActionAuthSuccess,
    ActionCreateProfileData,
    ActionNotAuth,
    // state
    StateCreateProfileData,
    StateAuthInProgress,
    StateAuthSuccess,
    StateNotAuth,
    UserCred
} from './authorization.state.ts'

export type {
    AuthenticationActions,
    ActionPhoneNumber,
    ActionVerifyCode,
    
    AuthenticationState,
    StatePhoneNumber,
    StateVerifyCode
} from './authentication.state.ts'


export { AuthorizationSteps } from './authorization.state.ts'
export { AuthenticationSteps } from './authentication.state.ts'

export type AuthorizationError = {
    title: string,
    message: string
}

