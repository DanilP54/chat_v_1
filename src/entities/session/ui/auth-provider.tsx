import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import {
    ActionAuthInProgress,
    ActionAuthSuccess,
    ActionCreateProfileData,
    ActionNotAuth,
    AuthorizationSteps,
    StateAuthInProgress,
    StateAuthSuccess,
    StateCreateProfileData,
    StateNotAuth,
} from '@/shared/types'
import {Loader} from "@/shared/ui/loader.tsx";
import {useOnExitAuthState} from "../lib/useOnAuthExitState.ts";
import {Session} from "../session.model.ts";
import {auth} from "@/shared/config/firebase.ts";
import {onAuthStateChanged} from 'firebase/auth'


type AuthorizationActions =
    ActionNotAuth |
    ActionAuthInProgress |
    ActionCreateProfileData |
    ActionAuthSuccess<Session>

type AuthorizationState =
    StateAuthInProgress |
    StateNotAuth |
    StateCreateProfileData |
    StateAuthSuccess<Session>


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
                current_user: action.payload
            } as StateCreateProfileData;
        case AuthorizationSteps.AUTH_SUCCESS:
            return {
                step: AuthorizationSteps.AUTH_SUCCESS,
                current_session: action.payload
            } as StateAuthSuccess<Session>
        default:
            throw new Error('Action not found')
    }
}


export default function AuthProvider({children}: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    
    const getGlobalAuthState = useOnExitAuthState()
    console.dir(state)
    const navigate = useNavigate()

    useEffect(() => {

        const isAuthProgress = state.step !== AuthorizationSteps.AUTH_IN_PROGRESS
        const isAuthSuccess = state.step !== AuthorizationSteps.AUTH_SUCCESS

        if (isAuthProgress && isAuthSuccess) return

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            const currentAuthState = await getGlobalAuthState(user, dispatch)

            switch (currentAuthState) {
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
        })

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
