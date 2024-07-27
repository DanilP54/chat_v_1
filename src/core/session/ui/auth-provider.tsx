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
import {onExitState} from "../../../entities/session/lib/onExitState.ts";


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


export default function AuthProvider({children}: { children: React.ReactNode }) {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const navigate = useNavigate()


    useEffect(() => {

        const isAuthProgress = state.step !== AuthorizationSteps.AUTH_IN_PROGRESS
        const isAuthSuccess = state.step !== AuthorizationSteps.AUTH_SUCCESS

        if (isAuthProgress && isAuthSuccess) return

        const unsubscribe = authService.onAuthState(async (user: PersistUserDTO) => {

            const result = await onExitState(user, dispatch)

            switch (result) {
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
