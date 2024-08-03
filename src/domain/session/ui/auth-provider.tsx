import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "@/entities/user/user.model.ts";
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


import {Loader} from "@/shared/ui/loader.tsx";
import {authService} from "../../../entities/session/services/auth.service.ts";
import {User as PersistUserDTO} from "firebase/auth";
import {onExitAuthState} from "../../../entities/session/lib/onExitState.ts";
import {auth} from "@/shared/config/firebase.ts";
import {getAuthState} from "@/domain/session/adapters/storage/firebase.auth.state.ts";


type AuthorizationActions =
    ActionNotAuth |
    ActionAuthInProgress |
    ActionCreateProfileData |
    ActionAuthSuccess<User>

type AuthorizationState =
    StateAuthInProgress |
    StateNotAuth |
    StateCreateProfileData |
    StateAuthSuccess<User>


const DispatchContext = createContext<React.Dispatch<AuthorizationActions> | undefined>(undefined)


export const useDispatchContext = () => {
    const context = useContext(DispatchContext)

    if (!context) {
        throw new Error('Not Found Actions Provider')
    }

    return context;
}


const AuthContext = createContext<AuthorizationState | undefined>(undefined)

export const useAuthState = (): AuthorizationState => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a Provider')
    }

    return context;
}


const INITIAL_STATE: AuthorizationState = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}


const reducer = (state: AuthorizationState, action: AuthorizationActions): AuthorizationState => {
    switch (action.type) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return {...state, step: AuthorizationSteps.AUTH_IN_PROGRESS} as StateAuthInProgress;
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
            } as StateAuthSuccess<User>
        default:
            throw new Error('Action not found')
    }
}


export default function AuthProvider({children}: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const navigate = useNavigate()


    useEffect(() => {

        const isAuthProgress = state.step !== AuthorizationSteps.AUTH_IN_PROGRESS
        const isAuthSuccess = state.step !== AuthorizationSteps.AUTH_SUCCESS

        if (isAuthProgress && isAuthSuccess) return

        const {unsubscribe, currentUser} = getAuthState()

        const authState = await onExitAuthState(currentUser, dispatch)

        switch (authState) {
            case AuthorizationSteps.NOT_AUTH:
                navigate('/sign-in')
                break;
            case AuthorizationSteps.AUTH_CREATE_PROFILE_DATA:
                navigate('/create-profile')
                break;
            case AuthorizationSteps.AUTH_SUCCESS:
                navigate('/home')
                break;
            default:
                throw new Error('Ошибка состояния перехода')
        }

        return () => unsubscribe()

    }, [state.step])

    return (
        <DispatchContext.Provider value={dispatch}>
            <AuthContext.Provider value={state}>
                {state.step === AuthorizationSteps.AUTH_IN_PROGRESS ? <Loader/> : children}
            </AuthContext.Provider>
        </DispatchContext.Provider>
    )
}
