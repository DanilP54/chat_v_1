import { User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { viewerService } from "@/entities/viewer/interfaces/viewer.services";
import { Viewer } from "@/entities/viewer/viewer.model.ts";

import {
    ActionAuthInProgress,
    ActionAuthSuccess,
    ActionCreateProfileData,
    ActionNotAuth,
    StateCreateProfileData,
    StateAuthInProgress,
    StateAuthSuccess,
    StateNotAuth,
    AuthorizationSteps
} from "@/shared/types";

type AuthorizationActions =
    ActionNotAuth |
    ActionAuthInProgress |
    ActionCreateProfileData |
    ActionAuthSuccess<Viewer>

type AuthorizationState =
    StateAuthInProgress |
    StateNotAuth |
    StateCreateProfileData |
    StateAuthSuccess<Viewer>


const DispatchContext = createContext<React.Dispatch<AuthorizationActions> | undefined>(undefined)


export const useDispatchContext = () => {
    const context = useContext(DispatchContext)

    if (!context) {
        throw new Error('Not Found Actions Provider')
    }

    return context;
}


// AuthStateContext

const AuthContext = createContext<AuthorizationState | undefined>(undefined)

export const useAuthState = (): AuthorizationState => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a Provider')
    }
    return context
}

const INITIAL_STATE: AuthorizationState = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}

const reducer = (state: AuthorizationState, action: AuthorizationActions): AuthorizationState => {
    console.log(action.type)
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
                viewerId: action.payload
            } as StateCreateProfileData;
        case AuthorizationSteps.AUTH_SUCCESS:
            return {
                ...state,
                step: AuthorizationSteps.AUTH_SUCCESS,
                currentViewer: action.payload
            } as StateAuthSuccess<Viewer>
        default:
            throw new Error('Action not found')
    }
}


export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    console.log(state)
    const navigate = useNavigate()

    useEffect(() => {

        if (state.step !== AuthorizationSteps.AUTH_IN_PROGRESS
            && state.step !== AuthorizationSteps.AUTH_SUCCESS) return

        const unsubscribe = authService.onAuthState(async (user: User) => {
            try {
                if (user) {
                    const profileData = await viewerService.getViewerProfileData(user.uid)
                    console.log(profileData)
                    if (profileData) {
                        dispatch({
                            type: AuthorizationSteps.AUTH_SUCCESS,
                            payload: profileData
                        } as ActionAuthSuccess<Viewer>)
                        return navigate('/home')
                    } else {
                        dispatch({
                            type: AuthorizationSteps.AUTH_CREATE_PROFILE_DATA,
                            payload: user.uid,
                        } as ActionCreateProfileData)
                        return navigate('/create-profile')
                    }
                }
                dispatch({
                    type: AuthorizationSteps.NOT_AUTH,
                } as ActionNotAuth)
                return navigate('/sign-in')
            } catch (error) {
                console.error(error)
            }
        })
        return () => unsubscribe()
    }, [state.step])

    return (
        <DispatchContext.Provider value={dispatch}>
            <AuthContext.Provider value={state}>
                {children}
            </AuthContext.Provider>
        </DispatchContext.Provider>
    )
}
