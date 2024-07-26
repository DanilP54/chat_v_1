import { Viewer } from '@/core/models/viewer/viewer.entity'
import {
    ActionAuthInProgress,
    ActionAuthSuccess,
    ActionCreateProfileData,
    ActionNotAuth,
    StateCreateProfileData,
    StateAuthInProgress,
    StateAuthSuccess,
    StateNotAuth,
    AuthorizationSteps,
} from '@/shared/types'


export { AuthorizationSteps }

export type AuthorizationActions =
    ActionNotAuth |
    ActionAuthInProgress |
    ActionCreateProfileData |
    ActionAuthSuccess<Viewer>

export type AuthorizationState =
    StateAuthInProgress |
    StateNotAuth |
    StateCreateProfileData |
    StateAuthSuccess<Viewer>