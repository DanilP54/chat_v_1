import {User} from "firebase/auth";
import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import {authService} from "../services/auth.service";
import {viewerService} from "@/entities/viewer/interfaces/viewer.services";
import {
    ActionAuthInProgress,
    ActionAuthSuccess, ActionAuthWithoutAccountData, ActionNotAuth,
    AuthorizationSteps,
    StateAuthInProgress, StateAuthSuccess,
    StateNotAuth,
    StateWithoutAccountData
} from "@/shared/types";
import {Viewer} from "@/entities/viewer/viewer.model.ts";

export type Actions =
    ActionNotAuth |
    ActionAuthInProgress |
    ActionAuthWithoutAccountData |
    ActionAuthSuccess<Viewer>

export type State =
    StateAuthInProgress |
    StateNotAuth |
    StateWithoutAccountData |
    StateAuthSuccess<Viewer>


const DispatchContext = createContext<React.Dispatch<Actions> | undefined>(undefined)

export const useDispatchContext = () => {
    const context = useContext(DispatchContext)

    if (!context) {
        throw new Error('Not Found Actions Provider')
    }

    return context;
}


// AuthStateContext

const AuthContext = createContext<State | undefined>(undefined)

export const useAuthState = (): State => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a Provider')
    }
    return context
}

const INITIAL_STATE: State = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return {...state, step: AuthorizationSteps.AUTH_IN_PROGRESS} as StateAuthInProgress;
        case AuthorizationSteps.NOT_AUTH:
            return {...state, step: AuthorizationSteps.NOT_AUTH} as StateNotAuth;
        case AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA:
            return {
                ...state,
                step: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA,
                viewerId: action.payload
            } as StateWithoutAccountData;
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


export default function AuthProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    console.log(state)
    const navigate = useNavigate()

    useEffect(() => {
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
                            type: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA,
                            payload: user.uid
                        } as ActionAuthWithoutAccountData)
                        return navigate('/create-profile')
                    }
                }
                dispatch({type: AuthorizationSteps.NOT_AUTH} as ActionNotAuth)
                return navigate('/sign-in')
            } catch (error) {
                console.error(error)
            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <DispatchContext.Provider value={dispatch}>
            <AuthContext.Provider value={state}>
                {children}
            </AuthContext.Provider>
        </DispatchContext.Provider>
    )
}
