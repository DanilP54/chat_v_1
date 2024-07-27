import { createContext } from "react"
import { AuthorizationActions, AuthorizationState, AuthorizationSteps } from "../infra/session/types"
import { Viewer } from "@/core/models/viewer/viewer.entity";


export const DispatchContext = createContext<React.Dispatch<AuthorizationActions> | undefined>(undefined);
export const AuthContext = createContext<AuthorizationState | undefined>(undefined);


import {useContext} from "react";

export const useDispatchContext = () => {
    const context = useContext(DispatchContext)

    if (!context) {
        throw new Error('Not Found Actions Provider')
    }

    return context;
}


export const useAuthState = (): AuthorizationState => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a Provider')
    }

    return context;
}