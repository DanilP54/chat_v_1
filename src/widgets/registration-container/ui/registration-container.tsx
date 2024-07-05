import {
    PhoneNumber,
    OTPVerification,
    ViewerInfoForm
} from "@/features/registration";
import {useReducer} from "react";
import {ActionCreators, Actions} from "@/shared/types";
import {NEXT_STEP, SET_STATUS, SET_TEMP_USER_CREDENTIAL} from "@/shared/constants/action-types";

type TempUserCredential = {
    userId: UniqueId,
    phone: string | null,
}

export type State = {
    isPending: boolean,
    step: 'step-one' | 'step-two' | 'step-three',
    tempUserCredential: TempUserCredential | null
};

export const INITIAL_STATE: State = {
    isPending: false,
    step: 'step-one',
    tempUserCredential: null,
}

const actions: ActionCreators = {
    nextStep: () => ({type: NEXT_STEP}),
    setStatus: (status) => ({type: SET_STATUS, payload: status}),
    setTempUserCredential: (credential) => ({type: SET_TEMP_USER_CREDENTIAL, payload: credential})
}


export function reducer(state: State, action: Actions): State {
    switch (action.type) {
        case NEXT_STEP:
            if (state.step === 'step-one') return {...state, step: 'step-two'}
            if (state.step === 'step-two') return {...state, step: 'step-three'}
            return state;
        case SET_STATUS:
            return {...state, isPending: action.payload}
        case SET_TEMP_USER_CREDENTIAL:
            return {...state, tempUserCredential: action.payload}
        default:
            throw new Error(`Unhandled action type: ${(action as { type: string }).type}`);
    }
}


export default function RegistrationContainer() {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)


    if (state.step === 'step-one') {
        return (
            <div className="h-full">
                <PhoneNumber
                    isPending={state.isPending}
                    dispatch={dispatch}
                    actions={actions}
                />
            </div>
        )
    }

    if (state.step === 'step-two') {
        return (
            <div className="h-full">
                <OTPVerification
                    dispatch={dispatch}
                    actions={actions}
                    isPending={state.isPending}
                />
            </div>
        )
    }

    if (state.step === 'step-three') {
        return (
            <div className="h-full">
                <ViewerInfoForm
                    dispatch={dispatch}
                    actions={actions}
                    tempUserCredential={state.tempUserCedential}
                />
            </div>
        )
    }
}
