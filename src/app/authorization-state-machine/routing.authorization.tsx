import React from "react";
import {AuthorizationSteps, StateAuthSuccess, StateNotAuth, StateWithoutAccountData, StateAuthInProgress} from "@/shared/types";
import {Viewer} from "@/entities/viewer/viewer.model.ts";
import {Loader} from "@/shared/ui/loader.tsx";

type State =
    StateAuthInProgress |
    StateNotAuth |
    StateWithoutAccountData |
    StateAuthSuccess<Viewer>

type createState<T> = (outlet: T) => T


const createAuthInProgress: createState<React.ReactElement> = (outlet) => <Loader />

const createNotAuth: createState<React.ReactElement> = (outlet ) => outlet

const createAuthWithoutAccountData: createState<React.ReactElement> = (outlet) => outlet

const createAuthSuccess: createState<React.ReactElement>  = (outlet) => outlet

export const routingAuthorization = (state: State, outlet: React.ReactElement): React.ReactElement => {
    switch (state.step) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return createAuthInProgress(outlet);
        case AuthorizationSteps.NOT_AUTH:
            return createNotAuth(outlet);
        case AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA:
            return createAuthWithoutAccountData(outlet);
        case AuthorizationSteps.AUTH_SUCCESS:
            return createAuthSuccess(outlet);
        default:
            throw new Error('Action not found')
    }
}