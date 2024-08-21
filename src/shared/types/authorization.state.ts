
export enum AuthorizationSteps {
    AUTH_IN_PROGRESS = 'AUTHORIZATION_IN_PROGRESS',
    NOT_AUTH = 'NOT_AUTHORIZED',
    AUTH_CREATE_PROFILE_DATA = 'AUTH_CREATE_PROFILE_DATA',
    AUTH_SUCCESS = 'AUTHORIZATION_SUCCESS'
}

export type UserCred = {
    user_id: string
    phone_number: string
}
// AuthorizationState

export type StateAuthInProgress = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}

export type StateNotAuth = {
    step: AuthorizationSteps.NOT_AUTH,
}

export type StateCreateProfileData = {
    step: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA,
    current_user: UserCred
}

export type StateAuthSuccess<T extends object> = {
    step: AuthorizationSteps.AUTH_SUCCESS,
    current_session: T
}

// Actions


export type ActionAuthInProgress = {
    type: AuthorizationSteps.AUTH_IN_PROGRESS,
}

export type ActionNotAuth = {
    type: AuthorizationSteps.NOT_AUTH,
}

export type ActionCreateProfileData = {
    type: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA
    payload: UserCred,
}

export type ActionAuthSuccess<T extends object> = {
    type: AuthorizationSteps.AUTH_SUCCESS,
    payload: T
}

