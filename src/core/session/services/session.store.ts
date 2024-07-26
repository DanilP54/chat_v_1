import { createContext } from "react"
import { AuthorizationActions, AuthorizationState, AuthorizationSteps } from "../infra/session/types"
import { Viewer } from "@/core/models/viewer/viewer.entity";

export const DispatchContext = createContext<React.Dispatch<AuthorizationActions> | undefined>(undefined);
export const AuthContext = createContext<AuthorizationState | undefined>(undefined);

export const INITIAL_STATE: AuthorizationState = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
};

export const reducer = (state: AuthorizationState, action: AuthorizationActions): AuthorizationState => {
    switch (action.type) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return { ...state, step: AuthorizationSteps.AUTH_IN_PROGRESS } as StateAuthInProgress;
        case AuthorizationSteps.NOT_AUTH:
            return {
                ...state,
                step: AuthorizationSteps.NOT_AUTH,
            } as StateNotAuth;
        case AuthorizationSteps.AUTH_CREATE_PROFILE_DATA:
            return {
                ...state,
                step: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA,
                userId: action.payload
            } as StateCreateProfileData;
        case AuthorizationSteps.AUTH_SUCCESS:
            return {
                step: AuthorizationSteps.AUTH_SUCCESS,
                currentUser: action.payload
            } as StateAuthSuccess<Viewer>
        default:
            throw new Error('Action not found')
    }
}