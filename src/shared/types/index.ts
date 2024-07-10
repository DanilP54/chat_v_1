export type {
    ActionAuthInProgress,
    ActionAuthSuccess,
    ActionAuthWithoutAccountData,
    ActionNotAuth,
    StateAuthInProgress,
    StateAuthSuccess,
    StateNotAuth,
    StateWithoutAccountData,
} from './authorization.state.ts'

export type {
    Actions as AuthenticationActions,
    State as AuthenticationState,
    ActionVerifyCode,
    ActionPhoneNumber,
    StateVerifyCode,
    StatePhoneNumber} from './authentication.state.ts'

export {AuthorizationSteps} from './authorization.state.ts'
export {AuthenticationSteps} from './authentication.state.ts'




