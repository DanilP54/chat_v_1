import React from "react";
import { AuthorizationSteps, StateAuthSuccess, StateNotAuth, StateCreateProfileData, StateAuthInProgress } from "@/shared/types";
import { Viewer } from "@/entities/viewer/user.model";

type State =
    StateAuthInProgress |
    StateNotAuth |
    StateCreateProfileData |
    StateAuthSuccess<Viewer>

type createState<T> = (outlet: T) => T


const createAuthInProgress: createState<React.ReactElement> = (outlet) => outlet
const createNotAuth: createState<React.ReactElement> = (outlet) => outlet
const createAuthWithoutAccountData: createState<React.ReactElement> = (outlet) => outlet
const createAuthSuccess: createState<React.ReactElement> = (outlet) => outlet

export const routingAuthorization = (state: State, outlet: React.ReactElement): React.ReactElement => {
    switch (state.step) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return createAuthInProgress(outlet);
        case AuthorizationSteps.NOT_AUTH:
            return createNotAuth(outlet);
        case AuthorizationSteps.AUTH_CREATE_PROFILE_DATA:
            return createAuthWithoutAccountData(outlet);
        case AuthorizationSteps.AUTH_SUCCESS:
            return createAuthSuccess(outlet);
        default:
            throw new Error('Action not found')
    }
}