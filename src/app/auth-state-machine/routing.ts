import { createAuthInProgress, createAuthSuccess, createAuthWithoutAccountData, createNotAuth } from "./create.state.fn"

export enum AuthorizationSteps {
    AUTH_IN_PROGRESS = 'AUTHORIZATION_IN_PROGRESS',
    NOT_AUTH = 'NOT_AUTHORIZED',
    AUTH_WITHOUT_ACCOUNT_DATA = 'AUTH_WITHOUT_ACCOUNT_DATA',
    AUTH_SUCCESS = 'AUTHORIZATION_SUCCESS'
}

type StateAuthProgress = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS
}

type StateNotAuth = {
    step: AuthorizationSteps.NOT_AUTH
}

type StateWithoutAccountData = {
    step: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA,
    data: { userId: UniqueId }
}

type StateAuthSuccess = {
    step: AuthorizationSteps.AUTH_SUCCESS
}
type State =
    StateAuthProgress |
    StateNotAuth |
    StateWithoutAccountData |
    StateAuthSuccess


export const routingAuthStateMachine = (state: State, children?: React.ReactNode): React.ReactNode => {
    switch (state.step) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return createAuthInProgress(children);
        case AuthorizationSteps.NOT_AUTH:
            return createNotAuth(children);
        case AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA:
            return createAuthWithoutAccountData(state, children);
        case AuthorizationSteps.AUTH_SUCCESS:
            return createAuthSuccess(children);
        default:
            throw new Error('Action not found')
    }
}