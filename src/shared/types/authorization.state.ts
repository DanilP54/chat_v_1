export enum AuthorizationSteps {
    AUTH_IN_PROGRESS = 'AUTHORIZATION_IN_PROGRESS',
    NOT_AUTH = 'NOT_AUTHORIZED',
    AUTH_WITHOUT_ACCOUNT_DATA = 'AUTH_WITHOUT_ACCOUNT_DATA',
    AUTH_SUCCESS = 'AUTHORIZATION_SUCCESS'
}

// State

export type StateAuthInProgress = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}

export type StateNotAuth = {
    step: AuthorizationSteps.NOT_AUTH,
}

export type StateWithoutAccountData = {
    step: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA,
    viewerId: UniqueId
}

export type StateAuthSuccess<T extends object> = {
    step: AuthorizationSteps.AUTH_SUCCESS,
    currentViewer: T
}

// Actions

export type ActionAuthInProgress = {
    type: AuthorizationSteps.AUTH_IN_PROGRESS,
}

export type ActionNotAuth = {
    type: AuthorizationSteps.NOT_AUTH
}

export type ActionAuthWithoutAccountData = {
    type: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA
    payload: UniqueId
}

export type ActionAuthSuccess<T extends object> = {
    type: AuthorizationSteps.AUTH_SUCCESS,
    payload: T
}

