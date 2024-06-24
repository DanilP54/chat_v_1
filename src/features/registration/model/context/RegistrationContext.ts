import { Dispatch, createContext, useContext } from "react";

type User = {
    avatar: string,
    firstName: string,
    lastName: string,
}

export type Status = 'pending' | 'success' | 'error' | 'idle'

type State = {
    phoneNumber: string,
    status: Status,
    user: User | undefined,
    step: 'step-one' | 'step-two' | 'step-three'
}

export type Action =
    { type: 'NEXT_STEP' } |
    { type: 'SET_PHONE_NUMBER', payload: string } |
    { type: 'SET_USER', payload: User } |
    { type: 'SET_STATUS', payload: Status }


export const INITIAL_STATE: State = {
    phoneNumber: '',
    status: 'idle',
    user: undefined,
    step: 'step-one'
}

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'NEXT_STEP':
            if (state.step === 'step-one') return { ...state, step: 'step-two' }
            if (state.step === 'step-two') return { ...state, step: 'step-three' }
            return state;
        case 'SET_PHONE_NUMBER':
            return { ...state, phoneNumber: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_STATUS':
            return { ...state, status: action.payload }
        default:
            return state;
    }
}

export const RegistrationContext = createContext<{ state: State, dispatch: Dispatch<Action> } | undefined>(undefined)


export const useRegistrationContext = () => {
    const context = useContext(RegistrationContext)

    if (!context) {
        throw new Error('useRegistrationContext must be used within a RegistrationProvider')
    }

    return context
}