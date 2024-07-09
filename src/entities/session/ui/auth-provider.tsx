import { User } from "firebase/auth";
import React, { createContext, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { viewerService } from "@/entities/viewer/interfaces/viewer.services";
import { Viewer } from "@/entities/viewer/viewer.model";
import { Loader } from "@/shared/ui/loader";


// export enum Step {
//     PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
//     VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
//     USER_DATA_ENTRY = 'USER_DATA_ENTRY',
//     PROCESS_AUTHINTIFICATE = 'PROCESS_AUTH_CERTIFICATE',
// }

// export enum AuthenticationSteps {
//     PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
//     VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
//     LOADING = 'LOADNG',
// }

// ---------------------------------------------------------

export enum AuthorizationSteps {
    AUTH_IN_PROGRESS = 'AUTHORIZATION_IN_PROGRESS',
    NOT_AUTH = 'NOT_AUTHORIZED',
    AUTH_WITHOUT_ACCOUNT_DATA = 'AUTH_WITHOUT_ACCOUNT_DATA',
    AUTH_SUCCESS = 'AUTHORIZATION_SUCCESS'
}

// ---------------------------------------------------------

type StateAuthInProgress = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}

type StateNotAuth = {
    step: AuthorizationSteps.NOT_AUTH,
}

type StateWithoutAccountData = {
    step: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA,
    data: { userId: UniqueId }
}

type StateAuthSuccess = {
    step: AuthorizationSteps.AUTH_SUCCESS,
}

type State = StateAuthInProgress | StateNotAuth | StateWithoutAccountData | StateAuthSuccess;




const INITIAL_STATE: State = {
    step: AuthorizationSteps.AUTH_IN_PROGRESS,
}

type ActionAuthInProgress = {
    type: AuthorizationSteps.AUTH_IN_PROGRESS,
}

type ActionNotAuth = {
    type: AuthorizationSteps.NOT_AUTH
}

type ActionAuthWithoutAccoundData = {
    type: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA
    payload: UniqueId
}

type ActionAuthSuccess = {
    type: AuthorizationSteps.AUTH_SUCCESS
}

type Actions = ActionNotAuth | ActionAuthInProgress | ActionAuthWithoutAccoundData | ActionAuthSuccess


const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case AuthorizationSteps.AUTH_IN_PROGRESS:
            return { ...state, step: AuthorizationSteps.AUTH_IN_PROGRESS } as StateAuthInProgress;
        case AuthorizationSteps.NOT_AUTH:
            return { ...state, step: AuthorizationSteps.NOT_AUTH } as StateNotAuth;
        case AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA:
            return { ...state, step: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA, data: { userId: action.payload } } as StateWithoutAccountData;
        case AuthorizationSteps.AUTH_SUCCESS:
            return { ...state, step: AuthorizationSteps.AUTH_SUCCESS } as StateAuthSuccess
        default:
            throw new Error('Action not found')
    }
}

//DispatchContext

const ActionsContext = createContext<React.Dispatch<Actions> | undefined>(undefined)

export const useActionsContext = () => {
    const context = useContext(ActionsContext)

    if (!context) {
        throw new Error('Not Found Actions Provider')
    }

    return context;
}


//StateContext

const AuthContext = createContext<State | undefined>(undefined)

// HOOK

export const useAuthState = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a Provider')
    }
    return context
}

// --------------------

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    console.log(state)
    // const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)
    // const [isProcessingAuth, setIsProcessingAuth] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = authService.onAuthState(async (viewer: User) => {
            try {
                if (viewer) {
                    const docRef = await viewerService.getViewerById(viewer.uid)
                    if (docRef) {
                        console.log(docRef)
                        dispatch({ type: AuthorizationSteps.AUTH_SUCCESS } as ActionAuthSuccess)
                        return navigate('/home')
                    } else {
                        dispatch({ type: AuthorizationSteps.AUTH_WITHOUT_ACCOUNT_DATA, payload: viewer.uid} as ActionAuthWithoutAccoundData)
                        return navigate('/create-profile')
                    }
                }
                dispatch({ type: AuthorizationSteps.NOT_AUTH } as ActionNotAuth)
                return navigate('/signin')
            } catch (error) {
                console.error(error)
            }
        })
        return () => unsubscribe()
    }, [])

    // const value: AuthProviderProps = {
    //     viewer: currentViewer,
    //     setIsProcessingAuth,
    // }

    return (
        <ActionsContext.Provider value={dispatch}>
            <AuthContext.Provider value={state}>
                {children}
            </AuthContext.Provider>
        </ActionsContext.Provider>
    )
}
