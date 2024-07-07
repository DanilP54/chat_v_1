import { User } from "firebase/auth";
import React, { createContext, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { viewerService } from "@/entities/viewer/interfaces/viewer.services";
import { Viewer } from "@/entities/viewer/viewer.model";



type AuthProviderProps = {
    viewer: Viewer | null;
    setIsProcessingAuth: React.Dispatch<SetStateAction<boolean>>;
}

enum Step {
    PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
    VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
    USER_DATA_ENTRY = 'USER_DATA_ENTRY',
}

type StatePhoneNumber = {
    step: Step.PHONE_NUMBER_ENTRY
}

type StateVerifyCode = {
    step: Step.VERIFY_CODE_ENTRY
}

type StateUserData = {
    step: Step.USER_DATA_ENTRY,
    data: string
}

type State = StatePhoneNumber | StateVerifyCode | StateUserData

const INITIAL_STATE: State = {
    step: Step.PHONE_NUMBER_ENTRY,
}

type ActionPhoneNumber = {
    type: Step.PHONE_NUMBER_ENTRY,
}

type ActionVerifyCode = {
    type: Step.VERIFY_CODE_ENTRY
}

type ActionUserData = {
    type: Step.USER_DATA_ENTRY,
    payload: UniqueId
}

type Actions = ActionPhoneNumber | ActionVerifyCode | ActionUserData


const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case Step.PHONE_NUMBER_ENTRY:
            return { step: Step.PHONE_NUMBER_ENTRY } as StatePhoneNumber;
        case Step.VERIFY_CODE_ENTRY:
            return { step: Step.VERIFY_CODE_ENTRY } as StateVerifyCode;
        case Step.USER_DATA_ENTRY:
            return { step: Step.USER_DATA_ENTRY, data: action.payload } as StateUserData;
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
        throw new Error('useAuthState must be used within a CountProvider')
    }
    return context
}

// --------------------

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    // const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)
    // const [isProcessingAuth, setIsProcessingAuth] = useState<boolean>(false)
    // const navigate = useNavigate()

    useEffect(() => {
        // const unsubscribe = authService.onAuthState(async (viewer: User) => {
        //     try {
        //         if (viewer && !isProcessingAuth) {
        //             const docRef = await viewerService.getViewerById(viewer.uid)
        //             if (docRef) {
        //                 setCurrentViewer(docRef)
        //                 navigate('/home')
        //             }
        //         }
        //     } catch (error) {
        //         console.error(error)
        //     }
        // })
        // return () => unsubscribe()
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
